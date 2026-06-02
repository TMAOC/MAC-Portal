const BILLING_NOTICE_TEXT = [
  "$30/day to add Before School, 7:30–8:15",
  "$30/day to add 4:30 pick-up, 3:15–4:30",
  "$60/day to add 5:30 pick-up, 3:15–5:30",
  "$30/day if already a 4:30 pick-up"
].join("\n");

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const schoolId = env.TC_SCHOOL_ID;
    const token = env.TC_TOKEN;
    const email = getUserEmail(request);
    const classroomIds = getClassroomIds(env);
    const apiBaseUrl = "https://www.transparentclassroom.com/api/v1";

    if (path === "/") return htmlResponse(renderApp());
    if (path === "/api/login") return Response.redirect(url.origin + "/", 302);

    if (path === "/api") {
      return json({
        ok: true,
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        hasGoogleSheetWebhook: Boolean(env.GOOGLE_SHEET_WEBHOOK_URL),
        signedInEmail: email || null,
        classroomIds
      });
    }

    if (!path.startsWith("/api/")) return htmlResponse(renderApp());

    if (!token || !schoolId) {
      return json({ error: "Missing Cloudflare secrets TC_TOKEN or TC_SCHOOL_ID" }, 500);
    }

    if (!env.PARENT_PERMISSIONS) {
      return json({ error: "Missing KV binding: PARENT_PERMISSIONS" }, 500);
    }

    if (!email) {
      return json({ error: "Not signed in through Cloudflare Access" }, 401);
    }

    const allowedChildren = await getAllowedChildren(env, email);
    if (!allowedChildren) {
      return json({ error: "This email does not have permission to view children", email }, 403);
    }

    const tcHeaders = {
      "X-TransparentClassroomToken": token,
      "X-TransparentClassroomSchoolId": schoolId,
      "Accept": "application/json",
      "Content-Type": "application/json"
    };

    if (path === "/api/permission-test") {
      return json({ signedInEmail: email, allowedChildren });
    }

    if (path === "/api/children") {
      const result = await fetchChildren({ apiBaseUrl, schoolId, tcHeaders });
      if (!result.ok) {
        return json(
          { error: "Could not load children from Transparent Classroom", detail: result.detail },
          result.status
        );
      }

      return json(filterChildrenForUser(result.children, allowedChildren).map(sanitizeChild));
    }

    if (path === "/api/announcements-raw") {
      const raw = await fetchAnnouncementsRaw({ schoolId, tcHeaders });
      return json(raw, raw.ok ? 200 : raw.status || 500);
    }

    if (path === "/api/announcements") {
      const childResult = await fetchChildren({ apiBaseUrl, schoolId, tcHeaders });
      let visibleClassroomIds = new Set();
      let visibleClassroomNames = new Set();

      if (childResult.ok) {
        const visibleChildren = filterChildrenForUser(childResult.children, allowedChildren);
        const info = getClassroomInfoFromChildren(visibleChildren);
        visibleClassroomIds = info.ids;
        visibleClassroomNames = info.names;
      }

      const result = await fetchVisibleAnnouncements({
        schoolId,
        tcHeaders,
        visibleClassroomIds,
        visibleClassroomNames
      });

      return json(result, result.ok ? 200 : result.status || 500);
    }

    if (path === "/api/activity") {
      const childId = url.searchParams.get("child_id") || "";
      if (!childId) return json({ error: "Missing child_id" }, 400);
      if (!canAccessChild(childId, allowedChildren)) {
        return json({ error: "No permission for this child" }, 403);
      }

      const dateStart = url.searchParams.get("date_start") || daysAgoDate(90);
      const tcUrl = new URL(apiBaseUrl + "/activity.json");
      tcUrl.searchParams.set("school_id", schoolId);
      tcUrl.searchParams.set("child_id", childId);
      tcUrl.searchParams.set("date_start", dateStart);
      tcUrl.searchParams.set("include", "photos,notes,observations,lessons,attachments,media");
      tcUrl.searchParams.set("photo_size", "large");
      tcUrl.searchParams.set("per_page", "100");

      const response = await fetch(tcUrl.toString(), { headers: tcHeaders });

      return new Response(await response.text(), {
        status: response.status,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (path === "/api/attendance-summary") {
      const childId = url.searchParams.get("child_id") || "";
      if (!childId) return json({ error: "Missing child_id" }, 400);
      if (!canAccessChild(childId, allowedChildren)) {
        return json({ error: "No permission for this child" }, 403);
      }

      const day = url.searchParams.get("day") || todayDate();
      const events = await fetchAttendanceEventsForAllClassrooms({
        schoolId,
        classroomIds,
        day,
        tcHeaders
      });

      return json(summarizeAttendance(events, childId, day));
    }

    if (path === "/api/emergency-program-change") {
      if (request.method !== "POST") return json({ error: "Method not allowed" }, 405);

      if (!env.GOOGLE_SHEET_WEBHOOK_URL) {
        return json({ error: "Missing Cloudflare secret: GOOGLE_SHEET_WEBHOOK_URL" }, 500);
      }

      const body = await readJson(request);
      const childId = String(body.child_id || body.childId || "").trim();

      if (!childId) return json({ error: "Missing child_id" }, 400);
      if (!canAccessChild(childId, allowedChildren)) {
        return json({ error: "No permission for this child" }, 403);
      }

      const required = [
        "studentName",
        "studentClassroom",
        "personFillingOutForm",
        "dateOfRequest",
        "dateOfEmergencyProgramChange",
        "dropOffOrPickUpTime",
        "regularProgramHours"
      ];

      const missingFields = required.filter((field) => !String(body[field] || "").trim());
      if (missingFields.length) {
        return json({ error: "Missing required fields", missingFields }, 400);
      }

      const submission = {
        studentName: String(body.studentName || "").trim(),
        studentClassroom: String(body.studentClassroom || "").trim(),
        personFillingOutForm: String(body.personFillingOutForm || "").trim(),
        dateOfRequest: String(body.dateOfRequest || "").trim(),
        dateOfEmergencyProgramChange: String(body.dateOfEmergencyProgramChange || "").trim(),
        dropOffOrPickUpTime: String(body.dropOffOrPickUpTime || "").trim(),
        regularProgramHours: String(body.regularProgramHours || "").trim(),
        billingNotice: BILLING_NOTICE_TEXT,
        parentEmail: email,
        childId,
        submittedAt: new Date().toISOString()
      };

      const sheetResponse = await fetch(env.GOOGLE_SHEET_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission)
      });

      const text = await sheetResponse.text();
      let sheetData;

      try {
        sheetData = JSON.parse(text);
      } catch (e) {
        sheetData = { rawText: text.slice(0, 1000) };
      }

      return json(
        { ok: sheetResponse.ok, status: sheetResponse.status, data: sheetData },
        sheetResponse.ok ? 200 : sheetResponse.status
      );
    }

    return json({ error: "Route not found" }, 404);
  }
};

function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8" }
  });
}

function htmlResponse(html) {
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" }
  });
}

async function readJson(request) {
  try {
    return await request.json();
  } catch (e) {
    return {};
  }
}

function getUserEmail(request) {
  return String(request.headers.get("cf-access-authenticated-user-email") || "")
    .trim()
    .toLowerCase() || null;
}

function getClassroomIds(env) {
  const raw =
    env.TC_CLASSROOM_IDS ||
    "2386,2412,2413,2415,2387,2388,2389,7737,7738,2410,2411,1313,14759,2414,1312,1577";

  return raw.split(",").map((id) => id.trim()).filter(Boolean);
}

async function getAllowedChildren(env, email) {
  const value = await env.PARENT_PERMISSIONS.get(email.toLowerCase());
  if (!value) return null;
  if (value === "*") return "*";

  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.map(String) : null;
  } catch (e) {
    return value.split(",").map((id) => id.trim()).filter(Boolean);
  }
}

function canAccessChild(childId, allowedChildren) {
  if (allowedChildren === "*") return true;
  return allowedChildren.map(String).includes(String(childId));
}

async function fetchChildren({ apiBaseUrl, schoolId, tcHeaders }) {
  const tcUrl = new URL(apiBaseUrl + "/children.json");
  tcUrl.searchParams.set("school_id", schoolId);

  const response = await fetch(tcUrl.toString(), { headers: tcHeaders });
  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch (e) {
    return {
      ok: false,
      status: response.status,
      detail: text.slice(0, 1000),
      children: []
    };
  }

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      detail: data,
      children: []
    };
  }

  return {
    ok: true,
    status: response.status,
    children: normalizeChildren(data)
  };
}

function normalizeChildren(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.children)) return data.children;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function filterChildrenForUser(children, allowedChildren) {
  if (allowedChildren === "*") return children;

  const allowed = new Set(allowedChildren.map(String));
  return children.filter((child) => allowed.has(String(child.id)));
}

function sanitizeChild(child) {
  const classroomIds = [];

  if (Array.isArray(child.classroom_ids)) {
    classroomIds.push(...child.classroom_ids);
  }

  if (Array.isArray(child.classrooms)) {
    child.classrooms.forEach((classroom) => {
      if (classroom && classroom.id) classroomIds.push(classroom.id);
    });
  }

  const classroom = child.classroom || {};

  const classroomId =
    child.classroom_id ||
    child.classroomId ||
    child.current_classroom_id ||
    child.currentClassroomId ||
    child.primary_classroom_id ||
    child.primaryClassroomId ||
    classroom.id ||
    classroomIds[0] ||
    "";

  const classroomName =
    child.classroom_name ||
    child.classroomName ||
    child.current_classroom_name ||
    child.currentClassroomName ||
    child.primary_classroom_name ||
    child.primaryClassroomName ||
    classroom.name ||
    "";

  return {
    id: String(child.id || ""),
    first_name: child.first_name || child.firstName || "",
    last_name: child.last_name || child.lastName || "",
    profile_photo: child.profile_photo || child.profilePhoto || "",
    classroom_id: String(classroomId || ""),
    classroom_ids: classroomIds.map(String),
    classroom_name: String(classroomName || "")
  };
}

function getClassroomInfoFromChildren(children) {
  const ids = new Set();
  const names = new Set();

  children.forEach((child) => {
    const cleanChild = sanitizeChild(child);

    if (cleanChild.classroom_id) ids.add(String(cleanChild.classroom_id));

    cleanChild.classroom_ids.forEach((id) => {
      if (id) ids.add(String(id));
    });

    if (cleanChild.classroom_name) {
      names.add(cleanChild.classroom_name.trim().toLowerCase());
    }

    if (Array.isArray(child.classrooms)) {
      child.classrooms.forEach((classroom) => {
        if (classroom && classroom.id) ids.add(String(classroom.id));
        if (classroom && classroom.name) {
          names.add(String(classroom.name).trim().toLowerCase());
        }
      });
    }
  });

  return { ids, names };
}

async function fetchAnnouncementsRaw({ schoolId, tcHeaders }) {
  const baseUrl = new URL(
    "https://www.transparentclassroom.com/s/" +
      encodeURIComponent(schoolId) +
      "/frontend/announcements.json"
  );

  const pages = [];
  const allItems = [];
  const seen = new Set();

  let next = "";
  let safety = 0;

  while (safety < 8) {
    safety += 1;

    const pageUrl = new URL(baseUrl.toString());

    // Important fix: Transparent Classroom uses "before" for this frontend pagination.
    if (next) pageUrl.searchParams.set("before", next);

    const response = await fetch(pageUrl.toString(), { headers: tcHeaders });
    const text = await response.text();

    let data;
    try {
      data = JSON.parse(text);
    } catch (e) {
      return {
        ok: false,
        status: response.status,
        error: "Could not parse announcements response",
        rawText: text.slice(0, 1000),
        pages,
        allItemsCount: allItems.length
      };
    }

    const items = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
    let uniqueAdded = 0;

    items.forEach((item) => {
      const a = item && item.data ? item.data : item || {};
      const key = String(a.id || "") || JSON.stringify(a).slice(0, 250);

      if (!seen.has(key)) {
        seen.add(key);
        allItems.push(item);
        uniqueAdded += 1;
      }
    });

    pages.push({
      status: response.status,
      requestUrl: pageUrl.toString(),
      dataCount: items.length,
      uniqueAdded,
      pagination: data && data.pagination ? data.pagination : null,
      sample: items.slice(0, 5)
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        pages,
        allItemsCount: allItems.length
      };
    }

    next = data && data.pagination && data.pagination.next ? data.pagination.next : "";
    if (!next || items.length === 0) break;
  }

  return {
    ok: true,
    status: 200,
    pageCount: pages.length,
    allItemsCount: allItems.length,
    pages,
    allItems
  };
}

async function fetchVisibleAnnouncements({
  schoolId,
  tcHeaders,
  visibleClassroomIds,
  visibleClassroomNames
}) {
  const raw = await fetchAnnouncementsRaw({ schoolId, tcHeaders });
  if (!raw.ok) return raw;

  const normalized = normalizeAnnouncements(raw.allItems);

  const visible = normalized.filter((announcement) =>
    canSeeAnnouncement(announcement, visibleClassroomIds, visibleClassroomNames, schoolId)
  );

  const seen = new Set();
  const unique = [];

  visible.forEach((item) => {
    const key = [item.id, item.title, item.createdAt].join("|");

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  });

  unique.sort(
    (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
  );

  return {
    ok: true,
    announcementRawCount: raw.allItems.length,
    count: unique.length,
    visibleClassroomIds: Array.from(visibleClassroomIds),
    visibleClassroomNames: Array.from(visibleClassroomNames),
    announcements: unique,
    debug: {
      pageCount: raw.pageCount,
      samples: normalized.slice(0, 10).map((a) => ({
        title: a.title,
        subjectId: a.subjectId,
        subjectType: a.subjectType,
        subjectName: a.subjectName,
        classroomId: a.classroomId
      }))
    }
  };
}

function normalizeAnnouncements(items) {
  return (Array.isArray(items) ? items : []).map((item) => {
    const a = item && item.data ? item.data : item || {};

    const subjectRaw = a.subject || {};
    const subject = subjectRaw.data || subjectRaw;

    const authorRaw = a.author || {};
    const author = authorRaw.data || authorRaw;

    return {
      id: String(a.id || ""),
      title: a.title || a.subject_title || "Announcement",
      body: a.body || a.text || a.message || "",
      createdAt: a.createdAt || a.created_at || a.publishedAt || a.published_at || "",
      authorName: author.name || a.author_name || "",
      subjectId: String(subject.id || subjectRaw.id || ""),
      subjectType: String(subject.type || subjectRaw.type || ""),
      subjectName: String(subject.name || subjectRaw.name || ""),
      classroomId: String(
        a.classroom_id ||
          a.classroomId ||
          subject.classroom_id ||
          subject.classroomId ||
          ""
      )
    };
  });
}

function canSeeAnnouncement(announcement, visibleClassroomIds, visibleClassroomNames, schoolId) {
  const subjectType = String(announcement.subjectType || "").trim().toLowerCase();
  const subjectName = String(announcement.subjectName || "").trim().toLowerCase();
  const subjectId = String(announcement.subjectId || "").trim();
  const classroomId = String(announcement.classroomId || "").trim();

  const wholeSchoolWords = [
    "whole school",
    "wholeschool",
    "whole_school",
    "all school",
    "all_school",
    "school",
    "montessori academy of colorado"
  ];

  if (subjectId && subjectId === String(schoolId)) return true;

  if (wholeSchoolWords.some((word) => subjectType.includes(word) || subjectName.includes(word))) {
    return true;
  }

  if (subjectId && visibleClassroomIds.has(subjectId)) return true;
  if (classroomId && visibleClassroomIds.has(classroomId)) return true;
  if (subjectName && visibleClassroomNames.has(subjectName)) return true;

  if (subjectType.includes("classroom") && subjectName) {
    return Array.from(visibleClassroomNames).some(
      (name) => subjectName.includes(name) || name.includes(subjectName)
    );
  }

  return false;
}

async function fetchAttendanceEventsForAllClassrooms({ schoolId, classroomIds, day, tcHeaders }) {
  const results = await Promise.all(
    classroomIds.map(async (classroomId) => {
      const tcUrl = new URL(
        "https://www.transparentclassroom.com/s/" +
          encodeURIComponent(schoolId) +
          "/classrooms/" +
          encodeURIComponent(classroomId) +
          "/events.json"
      );

      tcUrl.searchParams.set("day", day);

      try {
        const response = await fetch(tcUrl.toString(), { headers: tcHeaders });
        const text = await response.text();

        let data;
        try {
          data = JSON.parse(text);
        } catch (e) {
          return [];
        }

        return normalizeEvents(data).map((event) => ({
          ...event,
          classroom_id: event.classroom_id || event.classroomId || classroomId
        }));
      } catch (e) {
        return [];
      }
    })
  );

  return results.flat();
}

function normalizeEvents(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.events)) return data.events;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function summarizeAttendance(events, childId, day) {
  const childEvents = events.filter(
    (event) => String(event.child_id || event.childId || "") === String(childId)
  );

  const attendanceEvents = childEvents.filter(
    (event) => String(event.event_type || event.eventType || "") === "attendance_state"
  );

  attendanceEvents.sort((a, b) => eventTime(a) - eventTime(b));

  const latest = attendanceEvents[attendanceEvents.length - 1] || null;
  const value = latest ? String(latest.value || "") : "";
  const status = attendanceStatus(value);

  return {
    day,
    childId,
    eventCount: childEvents.length,
    todayAttendanceValue: value || "--",
    todayStatus: status.label,
    statusClass: status.className,
    latestAttendance: latest
  };
}

function eventTime(event) {
  const time = new Date(
    event.datetime ||
      event.created_at ||
      event.createdAt ||
      event.time ||
      event.timestamp ||
      ""
  ).getTime();

  return Number.isNaN(time) ? 0 : time;
}

function attendanceStatus(value) {
  const v = String(value || "").toLowerCase();

  if (v === "p" || v.includes("present")) return { label: "Present", className: "present" };
  if (v === "a" || v.includes("absent")) return { label: "Absent", className: "absent" };
  if (v === "t" || v.includes("tardy") || v.includes("late")) {
    return { label: "Late", className: "late" };
  }

  return { label: value || "Not loaded", className: "unknown" };
}

function daysAgoDate(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString().split("T")[0];
}

function todayDate() {
  return new Date().toISOString().split("T")[0];
}

function renderApp() {
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>MAC Parent Portal</title>
<style>
:root{--blue:#0f4c81;--gold:#f2b705;--cream:#f6f2e8;--ink:#1f2933;--muted:#6b7280;--border:#e5e7eb;--green:#0f766e;--red:#b91c1c}*{box-sizing:border-box}body{margin:0;background:var(--cream);color:var(--ink);font-family:Arial,Helvetica,sans-serif}.app{max-width:560px;margin:0 auto;background:#fff;min-height:100vh}.top{padding:18px;background:var(--blue);color:#fff}.top h1{margin:0;font-size:22px}.top p{margin:4px 0 0;font-size:13px;opacity:.9}.tabs{position:sticky;top:0;background:#fff;display:flex;overflow-x:auto;border-bottom:1px solid var(--border);z-index:5}.tab{border:0;background:#fff;padding:12px 14px;font-weight:800;color:var(--muted);white-space:nowrap}.tab.active{color:var(--blue);border-bottom:3px solid var(--gold)}.panel{display:none;padding:18px}.panel.active{display:block}.card,.announcement-card,.contact-card{border:1px solid var(--border);border-radius:14px;padding:14px;margin:12px 0;background:#fff}.button{width:100%;border:0;border-radius:12px;background:var(--blue);color:#fff;padding:13px;font-weight:900;margin:8px 0}.button.secondary{background:#334155}.children{display:flex;gap:8px;overflow-x:auto;margin:12px 0}.child-chip{border:1px solid var(--border);background:#fff;border-radius:999px;padding:8px 12px;font-weight:800;white-space:nowrap}.child-chip.active{background:var(--gold);border-color:var(--gold)}.placeholder,.loading{background:#f8fafc;border:1px dashed #cbd5e1;border-radius:14px;padding:16px;text-align:center;color:var(--muted)}.today-card{text-align:center;background:#f8fafc;border:1px solid var(--border);border-radius:18px;padding:18px}.today-value{font-size:34px;font-weight:900;color:var(--blue)}.collapsible-header{width:100%;border:1px solid var(--border);border-radius:14px;background:#fff;padding:14px;display:flex;justify-content:space-between;font-weight:900;color:var(--blue)}.collapsible-body{display:none;border:1px solid var(--border);border-radius:14px;padding:14px;margin-top:8px}.collapsible-body.open{display:block}label{display:block;font-size:12px;font-weight:900;margin:12px 0 5px}input{width:100%;border:1px solid #d1d5db;border-radius:10px;padding:11px}.radio-row{display:flex;gap:8px;margin:8px 0}.radio-row label{flex:1;border:1px solid var(--border);border-radius:10px;padding:10px;margin:0}.radio-row input{width:auto}.note{font-size:13px;margin:10px 0}.success-note{color:var(--green);background:#ecfdf5;border:1px solid #99f6e4;border-radius:12px;padding:10px}.error-note{color:var(--red);background:#fef2f2;border:1px solid #fecaca;border-radius:12px;padding:10px}.announcement-meta{display:flex;justify-content:space-between;color:var(--muted);font-size:12px}.announcement-title{font-weight:900;color:var(--blue);margin-top:6px}.announcement-source{font-size:12px;color:var(--muted);margin:4px 0 8px}.announcement-body{font-size:14px;line-height:1.4;white-space:pre-wrap}.small{font-size:12px;color:var(--muted)}a{color:var(--blue);font-weight:800}
</style>
</head>
<body>
<div class="app">
  <div class="top"><h1>MAC Parent Portal</h1><p>Montessori Academy of Colorado</p></div>

  <div class="tabs">
    <button class="tab active" data-tab="dashboard">Dashboard</button>
    <button class="tab" data-tab="announcements">Classroom Announcements</button>
    <button class="tab" data-tab="activity">Activity</button>
    <button class="tab" data-tab="contact">Contact MAC</button>
  </div>

  <section id="dashboard" class="panel active">
    <h1>Hello 👋</h1>
    <p class="small">Select your child to view today’s information.</p>

    <div id="children" class="children"></div>

    <div class="today-card">
      <div class="small">Today</div>
      <div id="today-value" class="today-value">--</div>
      <div id="today-status" class="small">Loading...</div>
    </div>

    <div id="quick-note" class="note"></div>

    <button class="collapsible-header" onclick="toggleEmergencyProgramChangeForm()">
      <span>Emergency Program Change</span>
      <span id="epc-caret">+</span>
    </button>

    <div id="emergency-submit-note" class="note"></div>

    <div id="emergency-program-change-body" class="collapsible-body">
      <p class="small">Use this form for emergency changes to program hours.</p>

      <label>Student Name</label>
      <input id="epc-student-name" readonly>

      <label>Student Classroom</label>
      <input id="epc-classroom">

      <label>Name of Person Filling Out Form</label>
      <input id="epc-filler">

      <label>Date of Request</label>
      <input id="epc-request-date" type="date">

      <label>Date of Emergency Program Change</label>
      <input id="epc-change-date" type="date">

      <label>Drop-off or Pick-Up Time</label>
      <div class="radio-row">
        <label><input type="radio" name="epc-time" value="Before School"> Before School</label>
        <label><input type="radio" name="epc-time" value="4:30 Pick-Up"> 4:30 Pick-Up</label>
      </div>
      <div class="radio-row">
        <label><input type="radio" name="epc-time" value="5:30 Pick-Up"> 5:30 Pick-Up</label>
      </div>

      <label>Student's Regular Program Hours</label>
      <div class="radio-row">
        <label><input type="radio" name="epc-hours" value="8:15–3:15"> 8:15–3:15</label>
        <label><input type="radio" name="epc-hours" value="8:15–4:30"> 8:15–4:30</label>
      </div>
      <div class="radio-row">
        <label><input type="radio" name="epc-hours" value="8:15–5:30"> 8:15–5:30</label>
      </div>

      <div id="emergency-form-note" class="note" style="display:none"></div>

      <button id="epc-submit" class="button" onclick="submitEmergencyProgramChange()">
        Submit Emergency Program Change
      </button>
    </div>
  </section>

  <section id="announcements" class="panel">
    <h1>Classroom Announcements</h1>
    <p class="small">Announcements for your child’s classroom and whole-school announcements.</p>
    <div id="announcement-list"><div class="loading">Loading announcements...</div></div>
  </section>

  <section id="activity" class="panel">
    <h1>Activity</h1>
    <div id="activity-content"><div class="placeholder">Select a child to load activity.</div></div>
  </section>

  <section id="contact" class="panel">
    <h1>Contact MAC</h1>

    <div class="contact-card">
      <div class="announcement-title">Main Office</div>
      <div class="small">
        <a href="tel:3033228324">303-322-8324</a><br>
        <a href="mailto:office@tmaoc.com">office@tmaoc.com</a>
      </div>
    </div>

    <div class="contact-card">
      <div class="announcement-title">Program Changes</div>
      <div class="small">
        <a href="mailto:programchanges@tmaoc.com">programchanges@tmaoc.com</a>
      </div>
    </div>
  </section>
</div>

<script>
var children = [];
var currentChildId = '';
var announcements = [];
var announcementsLoaded = false;

function workerFetch(url, options) {
  return fetch(url, options || {});
}

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, function(c) {
    return {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    }[c];
  });
}

function init() {
  document.querySelectorAll('.tab').forEach(function(btn) {
    btn.addEventListener('click', function() {
      showTab(btn.getAttribute('data-tab'));
    });
  });

  loadChildren();
}

function showTab(tab) {
  document.querySelectorAll('.tab').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-tab') === tab);
  });

  document.querySelectorAll('.panel').forEach(function(panel) {
    panel.classList.toggle('active', panel.id === tab);
  });

  if (tab === 'announcements') loadAnnouncements();
  if (tab === 'activity' && currentChildId) loadActivity(currentChildId);
}

function loadChildren() {
  workerFetch('/api/children')
    .then(function(response) {
      if (!response.ok) throw new Error('Children request failed: ' + response.status);
      return response.json();
    })
    .then(function(data) {
      children = Array.isArray(data) ? data : [];
      renderChildren();
      if (children[0]) selectChild(children[0].id);
    })
    .catch(function(error) {
      document.getElementById('children').innerHTML =
        '<div class="placeholder">Could not load children: ' + escapeHtml(error.message) + '</div>';
    });
}

function renderChildren() {
  var el = document.getElementById('children');

  if (!children.length) {
    el.innerHTML = '<div class="placeholder">No children found for this account.</div>';
    return;
  }

  el.innerHTML = children.map(function(child) {
    var name = ((child.first_name || '') + ' ' + (child.last_name || '')).trim() || child.id;

    return '<button class="child-chip" data-child="' + escapeHtml(child.id) + '" onclick="selectChild(\\'' + escapeHtml(child.id) + '\\')">' +
      escapeHtml(name) +
      '</button>';
  }).join('');
}

function selectChild(id) {
  currentChildId = String(id);

  document.querySelectorAll('.child-chip').forEach(function(btn) {
    btn.classList.toggle('active', btn.getAttribute('data-child') === currentChildId);
  });

  loadAttendance();
  populateEmergencyProgramChangeForm();

  if (document.getElementById('activity').classList.contains('active')) {
    loadActivity(currentChildId);
  }
}

function getCurrentChild() {
  return children.find(function(child) {
    return String(child.id) === String(currentChildId);
  }) || null;
}

function getCurrentChildName() {
  var child = getCurrentChild();
  return child ? ((child.first_name || '') + ' ' + (child.last_name || '')).trim() : '';
}

function loadAttendance() {
  if (!currentChildId) return;

  document.getElementById('today-status').textContent = 'Loading...';

  workerFetch('/api/attendance-summary?child_id=' + encodeURIComponent(currentChildId))
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      document.getElementById('today-value').textContent = data.todayAttendanceValue || '--';
      document.getElementById('today-status').textContent = data.todayStatus || 'Not loaded';
    })
    .catch(function() {
      document.getElementById('today-status').textContent = 'Could not load attendance';
    });
}

function toggleEmergencyProgramChangeForm() {
  var body = document.getElementById('emergency-program-change-body');
  var open = body.classList.toggle('open');

  document.getElementById('epc-caret').textContent = open ? '–' : '+';

  if (open) populateEmergencyProgramChangeForm();
}

function collapseEmergencyProgramChangeForm() {
  document.getElementById('emergency-program-change-body').classList.remove('open');
  document.getElementById('epc-caret').textContent = '+';
}

function populateEmergencyProgramChangeForm() {
  var child = getCurrentChild();
  var student = document.getElementById('epc-student-name');
  var classroom = document.getElementById('epc-classroom');
  var requestDate = document.getElementById('epc-request-date');

  if (!student || !classroom || !requestDate) return;

  student.value = child ? getCurrentChildName() : '';

  if (child && !classroom.value) {
    classroom.value = child.classroom_name || child.classroom_id || '';
  }

  if (!requestDate.value) requestDate.value = localDate();
}

function localDate() {
  var d = new Date();
  return d.getFullYear() + '-' +
    String(d.getMonth() + 1).padStart(2, '0') + '-' +
    String(d.getDate()).padStart(2, '0');
}

function checkedRadio(name) {
  var el = document.querySelector('input[name="' + name + '"]:checked');
  return el ? el.value : '';
}

function submitEmergencyProgramChange() {
  if (!currentChildId) {
    showEmergencyFormNote('Please select a child first.', 'error');
    return;
  }

  var button = document.getElementById('epc-submit');

  var payload = {
    child_id: currentChildId,
    studentName: document.getElementById('epc-student-name').value.trim(),
    studentClassroom: document.getElementById('epc-classroom').value.trim(),
    personFillingOutForm: document.getElementById('epc-filler').value.trim(),
    dateOfRequest: document.getElementById('epc-request-date').value.trim(),
    dateOfEmergencyProgramChange: document.getElementById('epc-change-date').value.trim(),
    dropOffOrPickUpTime: checkedRadio('epc-time'),
    regularProgramHours: checkedRadio('epc-hours')
  };

  var required = [
    ['Student Name', payload.studentName],
    ['Student Classroom', payload.studentClassroom],
    ['Name of Person Filling Out Form', payload.personFillingOutForm],
    ['Date of Request', payload.dateOfRequest],
    ['Date of Emergency Program Change', payload.dateOfEmergencyProgramChange],
    ['Drop-off or Pick-Up Time', payload.dropOffOrPickUpTime],
    ["Student's Regular Program Hours", payload.regularProgramHours]
  ];

  var missing = required
    .filter(function(item) { return !item[1]; })
    .map(function(item) { return item[0]; });

  if (missing.length) {
    showEmergencyFormNote('Please complete: ' + escapeHtml(missing.join(', ')), 'error');
    return;
  }

  button.disabled = true;
  showEmergencyFormNote('Submitting Emergency Program Change request...', '');

  workerFetch('/api/emergency-program-change', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  })
    .then(function(response) {
      return response.json().then(function(data) {
        if (!response.ok || !data.ok) {
          throw new Error(data.error || 'Submission failed.');
        }

        return data;
      });
    })
    .then(function() {
      document.getElementById('epc-filler').value = '';
      document.getElementById('epc-change-date').value = '';

      document.querySelectorAll('input[name="epc-time"],input[name="epc-hours"]').forEach(function(input) {
        input.checked = false;
      });

      showEmergencyFormNote('', 'clear');
      collapseEmergencyProgramChangeForm();

      showEmergencySubmitNote(
        '<strong>Submitted.</strong><br>Your Emergency Program Change request has been submitted.',
        'success'
      );
    })
    .catch(function(error) {
      showEmergencyFormNote(
        '<strong>Could not submit request.</strong><br>' + escapeHtml(error.message),
        'error'
      );
    })
    .finally(function() {
      button.disabled = false;
    });
}

function showEmergencyFormNote(message, type) {
  var el = document.getElementById('emergency-form-note');

  if (type === 'clear') {
    el.style.display = 'none';
    el.innerHTML = '';
    el.className = 'note';
    return;
  }

  el.style.display = 'block';
  el.className = 'note ' + (type === 'success' ? 'success-note' : type === 'error' ? 'error-note' : '');
  el.innerHTML = message;
}

function showEmergencySubmitNote(message, type) {
  var el = document.getElementById('emergency-submit-note');
  el.className = 'note ' + (type === 'success' ? 'success-note' : type === 'error' ? 'error-note' : '');
  el.innerHTML = message;
}

function loadAnnouncements() {
  if (announcementsLoaded) {
    renderAnnouncements();
    return;
  }

  document.getElementById('announcement-list').innerHTML =
    '<div class="loading">Loading announcements...</div>';

  workerFetch('/api/announcements')
    .then(function(response) {
      if (!response.ok) throw new Error('Announcements request failed: ' + response.status);
      return response.json();
    })
    .then(function(data) {
      announcements = Array.isArray(data.announcements) ? data.announcements : [];
      announcementsLoaded = true;
      renderAnnouncements();
    })
    .catch(function(error) {
      document.getElementById('announcement-list').innerHTML =
        '<div class="placeholder">Announcements could not load: ' + escapeHtml(error.message) + '</div>';
    });
}

function renderAnnouncements() {
  var el = document.getElementById('announcement-list');

  if (!announcements.length) {
    el.innerHTML =
      '<div class="placeholder"><strong>No classroom announcements found</strong><br>Announcements sent to your child’s classroom or the whole school will appear here.</div>';
    return;
  }

  el.innerHTML = announcements.map(function(item) {
    return '<div class="announcement-card">' +
      '<div class="announcement-meta"><span>' + escapeHtml(formatDate(item.createdAt)) + '</span><span>' + escapeHtml(item.subjectType || 'Announcement') + '</span></div>' +
      '<div class="announcement-title">' + escapeHtml(item.title || 'Announcement') + '</div>' +
      '<div class="announcement-source">' + escapeHtml(item.subjectName || '') + (item.authorName ? ' · ' + escapeHtml(item.authorName) : '') + '</div>' +
      '<div class="announcement-body">' + sanitizeText(item.body || '') + '</div>' +
      '</div>';
  }).join('');
}

function sanitizeText(html) {
  var div = document.createElement('div');
  div.innerHTML = String(html || '');
  return escapeHtml(div.textContent || div.innerText || '');
}

function formatDate(value) {
  if (!value) return '';

  var d = new Date(value);
  if (isNaN(d.getTime())) return value;

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function loadActivity(childId) {
  var el = document.getElementById('activity-content');
  el.innerHTML = '<div class="loading">Loading activity...</div>';

  workerFetch('/api/activity?child_id=' + encodeURIComponent(childId))
    .then(function(response) {
      if (!response.ok) throw new Error('Activity request failed: ' + response.status);
      return response.json();
    })
    .then(function(data) {
      var items = Array.isArray(data)
        ? data
        : Array.isArray(data.data)
          ? data.data
          : Array.isArray(data.activity)
            ? data.activity
            : [];

      if (!items.length) {
        el.innerHTML = '<div class="placeholder">No recent classroom activity found.</div>';
        return;
      }

      el.innerHTML = items.slice(0, 30).map(renderActivityItem).join('');
    })
    .catch(function(error) {
      el.innerHTML =
        '<div class="placeholder">Could not load activity: ' + escapeHtml(error.message) + '</div>';
    });
}

function renderActivityItem(item) {
  var a = item && item.data ? item.data : item || {};
  var title = a.title || a.name || 'Classroom Activity';
  var body = a.body || a.text || a.note || a.description || a.caption || '';

  return '<div class="announcement-card">' +
    '<div class="announcement-meta">' + escapeHtml(formatDate(a.createdAt || a.created_at || a.date || '')) + '</div>' +
    '<div class="announcement-title">' + escapeHtml(title) + '</div>' +
    '<div class="announcement-body">' + sanitizeText(body) + '</div>' +
    '</div>';
}

init();
</script>
</body>
</html>`;
}
