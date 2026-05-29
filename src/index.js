export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const apiBaseUrl = "https://www.transparentclassroom.com/api/v1";
    const schoolId = env.TC_SCHOOL_ID;
    const token = env.TC_TOKEN;
    const userEmail = getUserEmail(request);
    const classroomIds = getClassroomIds(env);

    if (path === "/api/login") {
      return Response.redirect(url.origin + "/?signed_in=1", 302);
    }

    if (path === "/api") {
      return jsonResponse({
        status: "api running",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        hasClassroomIds: classroomIds.length > 0,
        signedInEmail: userEmail || null,
        classroomIds: classroomIds,
        routes: [
          "/api/login",
          "/api/permission-test",
          "/api/children",
          "/api/activity?child_id=CHILD_ID",
          "/api/activity-raw?child_id=CHILD_ID",
          "/api/attendance-summary?child_id=CHILD_ID",
          "/api/tc-events-raw?day=YYYY-MM-DD"
        ]
      });
    }

    if (path.startsWith("/api/")) {
      if (!token || !schoolId) {
        return jsonResponse({
          error: "Missing Cloudflare secrets",
          hasToken: Boolean(token),
          hasSchoolId: Boolean(schoolId)
        }, 500);
      }

      if (!env.PARENT_PERMISSIONS) {
        return jsonResponse({
          error: "Missing KV binding: PARENT_PERMISSIONS"
        }, 500);
      }

      if (path === "/api/permission-test") {
        if (!userEmail) {
          return jsonResponse({
            error: "No signed-in email found. Cloudflare Access may not be enabled."
          }, 401);
        }

        const allowed = await getAllowedChildren(env, userEmail);

        return jsonResponse({
          signedInEmail: userEmail,
          allowedChildren: allowed
        });
      }

      if (!userEmail) {
        return jsonResponse({
          error: "Not signed in through Cloudflare Access"
        }, 401);
      }

      const allowedChildren = await getAllowedChildren(env, userEmail);

      if (!allowedChildren) {
        return jsonResponse({
          error: "This email does not have permission to view children",
          email: userEmail
        }, 403);
      }

      const tcHeaders = {
        "X-TransparentClassroomToken": token,
        "X-TransparentClassroomSchoolId": schoolId,
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

      if (path === "/api/children") {
        const tcUrl = new URL(apiBaseUrl + "/children.json");
        tcUrl.searchParams.set("school_id", schoolId);

        const response = await fetch(tcUrl.toString(), {
          method: "GET",
          headers: tcHeaders
        });

        const data = await response.json();

        if (!response.ok) {
          return jsonResponse(data, response.status);
        }

        const children = normalizeChildren(data);
        const filteredChildren = filterChildrenForUser(children, allowedChildren);

        return jsonResponse(filteredChildren);
      }

      if (path === "/api/activity" || path === "/api/activity-raw") {
        const childId = url.searchParams.get("child_id");
        let dateStart = url.searchParams.get("date_start");

        if (!dateStart) {
          const d = new Date();
          d.setDate(d.getDate() - 90);
          dateStart = d.toISOString().split("T")[0];
        }

        if (!childId) {
          return jsonResponse({ error: "Missing child_id" }, 400);
        }

        if (!canAccessChild(childId, allowedChildren)) {
          return jsonResponse({
            error: "This user does not have permission to view this child",
            email: userEmail,
            childId: childId
          }, 403);
        }

        const tcUrl = new URL(apiBaseUrl + "/activity.json");
        tcUrl.searchParams.set("child_id", childId);
        tcUrl.searchParams.set("date_start", dateStart);
        tcUrl.searchParams.set("school_id", schoolId);
        tcUrl.searchParams.set("include", "photos,notes,observations,lessons,attachments,media");
        tcUrl.searchParams.set("with", "photos,attachments,media");
        tcUrl.searchParams.set("photo_size", "large");
        tcUrl.searchParams.set("image_size", "large");
        tcUrl.searchParams.set("per_page", "100");

        const response = await fetch(tcUrl.toString(), {
          method: "GET",
          headers: tcHeaders
        });

        const body = await response.text();

        return new Response(body, {
          status: response.status,
          headers: {
            "Content-Type": "application/json"
          }
        });
      }

      if (path === "/api/tc-events-raw") {
        const day = url.searchParams.get("day") || getTodayDate();

        const allEvents = await fetchAttendanceEventsForAllClassrooms({
          schoolId,
          classroomIds,
          day,
          tcHeaders
        });

        return jsonResponse({
          day,
          classroomIds,
          count: allEvents.length,
          events: allEvents
        });
      }

      if (path === "/api/attendance-summary") {
        const childId = url.searchParams.get("child_id");
        const day = url.searchParams.get("day") || getTodayDate();

        if (!childId) {
          return jsonResponse({ error: "Missing child_id" }, 400);
        }

        if (!canAccessChild(childId, allowedChildren)) {
          return jsonResponse({
            error: "This user does not have permission to view this child",
            email: userEmail,
            childId: childId
          }, 403);
        }

        const allEvents = await fetchAttendanceEventsForAllClassrooms({
          schoolId,
          classroomIds,
          day,
          tcHeaders
        });

        const summary = summarizeAttendanceForChild(allEvents, childId, day);

        return jsonResponse(summary);
      }

      return jsonResponse({
        error: "Route not found",
        availableRoutes: [
          "/api/login",
          "/api/permission-test",
          "/api/children",
          "/api/activity?child_id=CHILD_ID",
          "/api/activity-raw?child_id=CHILD_ID",
          "/api/attendance-summary?child_id=CHILD_ID",
          "/api/tc-events-raw?day=YYYY-MM-DD"
        ]
      }, 404);
    }

    return new Response(renderPortalHtml(), {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8"
      }
    });
  }
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  });
}

function getUserEmail(request) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  return email ? email.toLowerCase().trim() : null;
}

async function getAllowedChildren(env, email) {
  const value = await env.PARENT_PERMISSIONS.get(email.toLowerCase().trim());

  if (!value) return null;
  if (value === "*") return "*";

  try {
    return JSON.parse(value).map(String);
  } catch (e) {
    return null;
  }
}

function normalizeChildren(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.children)) return data.children;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function filterChildrenForUser(children, allowedChildren) {
  if (allowedChildren === "*") return children;

  const allowedSet = new Set(allowedChildren.map(String));

  return children.filter(function(child) {
    return allowedSet.has(String(child.id));
  });
}

function canAccessChild(childId, allowedChildren) {
  if (allowedChildren === "*") return true;
  return allowedChildren.map(String).includes(String(childId));
}

function getClassroomIds(env) {
  const raw = env.TC_CLASSROOM_IDS || "2386,2412,2413,2415,2387,2388,2389,7737,7738,2410,2411,1313,14759,2414,1312,1577";

  return raw
    .split(",")
    .map(function(id) {
      return id.trim();
    })
    .filter(Boolean)
    .filter(function(value, index, array) {
      return array.indexOf(value) === index;
    });
}

function getTodayDate() {
  return new Date().toISOString().split("T")[0];
}

async function fetchAttendanceEventsForAllClassrooms({ schoolId, classroomIds, day, tcHeaders }) {
  const requests = classroomIds.map(async function(classroomId) {
    const tcUrl = new URL(
      "https://www.transparentclassroom.com/s/" +
      encodeURIComponent(schoolId) +
      "/classrooms/" +
      encodeURIComponent(classroomId) +
      "/events.json"
    );

    tcUrl.searchParams.set("day", day);

    try {
      const response = await fetch(tcUrl.toString(), {
        method: "GET",
        headers: tcHeaders
      });

      const text = await response.text();

      if (!response.ok) {
        return [{
          error: true,
          classroom_id: classroomId,
          status: response.status,
          body: text.slice(0, 500)
        }];
      }

      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        return [{
          error: true,
          classroom_id: classroomId,
          status: response.status,
          body: text.slice(0, 500)
        }];
      }

      const events = normalizeEvents(data);

      return events.map(function(event) {
        if (!event.classroom_id && !event.classroomId) {
          event.classroom_id = classroomId;
        }
        return event;
      });
    } catch (e) {
      return [{
        error: true,
        classroom_id: classroomId,
        message: e.message
      }];
    }
  });

  const results = await Promise.all(requests);

  return results.flat();
}

function normalizeEvents(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.events)) return data.events;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function summarizeAttendanceForChild(events, childId, day) {
  const childEvents = events.filter(function(event) {
    return String(event.child_id || event.childId || "") === String(childId);
  });

  const attendanceEvents = childEvents
    .filter(function(event) {
      return String(event.event_type || event.eventType || "") === "attendance_state";
    })
    .sort(function(a, b) {
      return new Date(a.time || a.created_at || a.createdAt || 0) - new Date(b.time || b.created_at || b.createdAt || 0);
    });

  const dropoffEvents = childEvents
    .filter(function(event) {
      return String(event.event_type || event.eventType || "").includes("dropoff") ||
             String(event.event_type || event.eventType || "").includes("pickup");
    })
    .sort(function(a, b) {
      return new Date(a.time || a.created_at || a.createdAt || 0) - new Date(b.time || b.created_at || b.createdAt || 0);
    });

  const latestAttendance = attendanceEvents.length ? attendanceEvents[attendanceEvents.length - 1] : null;
  const rawValue = latestAttendance ? String(latestAttendance.value || "") : "";
  const statusInfo = getAttendanceStatus(rawValue);

  const isAbsent = statusInfo.category === "absent";
  const isTardy = statusInfo.category === "tardy";

  return {
    day,
    childId: String(childId),
    status: statusInfo.label,
    statusCategory: statusInfo.category,
    rawValue: rawValue || null,
    attendanceValue: statusInfo.displayValue,
    absenceCount: isAbsent ? 1 : 0,
    tardyCount: isTardy ? 1 : 0,
    attendanceEventsCount: attendanceEvents.length,
    dropoffEventsCount: dropoffEvents.length,
    latestAttendance,
    latestDropoff: dropoffEvents.length ? dropoffEvents[dropoffEvents.length - 1] : null,
    note: statusInfo.confirmed ? "" : "Attendance state found, but this value still needs confirmation."
  };
}

function getAttendanceStatus(value) {
  const map = {
    "20145": {
      label: "Present",
      category: "present",
      displayValue: "P",
      confirmed: true
    },
    "20146": {
      label: "Absent",
      category: "absent",
      displayValue: "A",
      confirmed: true
    },
    "20148": {
      label: "Sick / Sent Home",
      category: "absent",
      displayValue: "S",
      confirmed: false
    },
    "20150": {
      label: "Vacation",
      category: "absent",
      displayValue: "V",
      confirmed: false
    },
    "20151": {
      label: "Tardy",
      category: "tardy",
      displayValue: "T",
      confirmed: true
    },
    "3685": {
      label: "Late Pickup",
      category: "tardy",
      displayValue: "LP",
      confirmed: false
    }
  };

  if (map[value]) return map[value];

  if (!value) {
    return {
      label: "No Record",
      category: "none",
      displayValue: "--",
      confirmed: true
    };
  }

  return {
    label: "Unknown",
    category: "unknown",
    displayValue: value,
    confirmed: false
  };
}

function renderPortalHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAC Parent Portal</title>

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --blue: #10069F;
  --gold: #F7D987;
  --bg: #F5F5FA;
  --card: #ffffff;
  --muted: #6B6BA8;
  --border: #DDE0F5;
  --green: #2E9E6F;
  --red: #D94F3D;
  --amber: #D4830A;
}

body {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  color: #0D0B5C;
  min-height: 100vh;
}

.header {
  background: var(--blue);
  padding: 18px 20px;
}

.school-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  font-weight: 700;
  color: var(--gold);
  white-space: nowrap;
}

.nav {
  background: #0C0580;
  display: flex;
  padding: 0 20px;
  overflow-x: auto;
}

.nav-tab {
  padding: 11px 14px;
  color: rgba(255,255,255,.45);
  font-size: 11px;
  font-weight: 600;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  white-space: nowrap;
  text-transform: uppercase;
}

.nav-tab.active {
  color: var(--gold);
  border-bottom-color: var(--gold);
}

.main {
  padding: 20px;
  max-width: 700px;
  margin: 0 auto;
}

.panel {
  display: none;
}

.panel.active {
  display: block;
}

h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
  color: var(--blue);
  margin-bottom: 4px;
}

.sub {
  color: var(--muted);
  font-size: 13px;
  margin-bottom: 20px;
}

.tc-box {
  background: var(--card);
  border: 2px dashed var(--border);
  border-radius: 14px;
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.tc-box h3 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 18px;
  color: var(--blue);
  margin-bottom: 6px;
}

.tc-box p {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 14px;
}

.tc-btn {
  display: block;
  width: 100%;
  max-width: 360px;
  margin: 0 auto;
  padding: 10px;
  background: var(--blue);
  color: var(--gold);
  border: none;
  border-radius: 9px;
  font-weight: 700;
  font-size: 13px;
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
}

.tc-err {
  color: var(--red);
  font-size: 12px;
  margin-top: 8px;
  text-align: center;
  line-height: 1.4;
}

.connected-box {
  background: rgba(16,6,159,.03);
  border: 2px solid rgba(16,6,159,.2);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 20px;
  display: none;
}

.connected-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.tc-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--green);
}

.tc-name {
  font-size: 13px;
  font-weight: 700;
  color: var(--blue);
}

.disc-btn {
  background: none;
  border: 1.5px solid var(--border);
  border-radius: 7px;
  padding: 4px 10px;
  font-size: 11px;
  font-weight: 700;
  color: var(--muted);
  cursor: pointer;
  margin-left: auto;
}

.tc-info {
  font-size: 12px;
  color: var(--muted);
}

.chips {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.chip {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 14px;
  border-radius: 100px;
  border: 2px solid var(--border);
  background: var(--card);
  cursor: pointer;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}

.chip.active {
  border-color: var(--blue);
  background: rgba(16,6,159,.07);
  color: var(--blue);
}

.chip-av {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  color: #fff;
  font-size: 11px;
}

.stats {
  display: grid;
  grid-template-columns: repeat(3,1fr);
  gap: 11px;
  margin-bottom: 20px;
}

.stat {
  background: var(--card);
  border-radius: 13px;
  padding: 15px;
  border: 1px solid var(--border);
}

.stat-lbl {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 5px;
}

.stat-val {
  font-family: 'Cormorant Garamond', serif;
  font-size: 30px;
  font-weight: 700;
  line-height: 1;
}

.green {
  color: var(--green);
}

.red {
  color: var(--red);
}

.amber {
  color: var(--amber);
}

.stat-sub {
  font-size: 11px;
  color: var(--muted);
  margin-top: 2px;
}

.action-card {
  background: var(--blue);
  border-radius: 14px;
  padding: 16px 18px;
  margin-bottom: 20px;
}

.action-card h3 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--gold);
  font-size: 17px;
}

.action-card p {
  color: rgba(247,217,135,.65);
  font-size: 11px;
  margin-top: 2px;
}

.action-btn {
  background: var(--gold);
  border: none;
  border-radius: 100px;
  padding: 9px 18px;
  font-weight: 700;
  font-size: 12px;
  color: var(--blue);
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  width: 100%;
  margin-bottom: 10px;
}

.action-btn.secondary {
  background: #ffffff;
  color: var(--blue);
  border: 1px solid var(--border);
}

.quick-action-note {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 20px;
  color: var(--muted);
  font-size: 12px;
  line-height: 1.4;
  display: none;
}

.act-card {
  background: var(--card);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  margin-bottom: 10px;
}

.act-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 6px;
}

.act-date {
  font-size: 11px;
  color: var(--muted);
}

.act-tag {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 100px;
  text-transform: uppercase;
  background: #D4EDDA;
  color: #155724;
}

.act-title {
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 4px;
}

.act-note {
  font-size: 13px;
  line-height: 1.5;
  color: #0D0B5C;
  white-space: pre-wrap;
}

.activity-photos {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
  margin-top: 10px;
  overflow: hidden;
}

.activity-photo {
  display: block;
  width: 100%;
  height: auto;
  max-height: none;
  object-fit: contain;
  border-radius: 10px;
  margin-top: 10px;
  border: 1px solid var(--border);
  background: #fff;
}

.placeholder {
  background: var(--card);
  border: 2px dashed var(--border);
  border-radius: 14px;
  padding: 28px;
  text-align: center;
  color: var(--muted);
}

.loading {
  color: var(--muted);
  font-size: 13px;
  padding: 20px;
  text-align: center;
}

.contact-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 13px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 9px;
}

.contact-av {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.contact-msg {
  background: rgba(16,6,159,.08);
  border: none;
  border-radius: 7px;
  padding: 6px 12px;
  color: var(--blue);
  font-weight: 700;
  font-size: 11px;
  cursor: pointer;
  margin-left: auto;
}

@media (max-width: 520px) {
  .stats {
    grid-template-columns: 1fr;
  }
}
</style>
</head>

<body>

<div class="header">
  <div class="school-name">Montessori Academy of Colorado</div>
</div>

<div class="nav" id="nav">
  <div class="nav-tab active" data-panel="dash">Dashboard</div>
  <div class="nav-tab" data-panel="activity">TC Activity</div>
  <div class="nav-tab" data-panel="events">School Calendar</div>
  <div class="nav-tab" data-panel="contact">Contact</div>
</div>

<div class="main">

  <section class="panel active" id="panel-dash">
    <h1>Good morning 👋</h1>
    <div class="sub">Montessori Academy of Colorado · Parent Portal</div>

    <div id="tc-box" class="tc-box">
      <h3>Parent Portal Sign In</h3>
      <p>Sign in to view your child’s classroom activity.</p>
      <button class="tc-btn" onclick="signInToPortal()">Sign In to Parent Portal</button>
      <div class="tc-err" id="tc-err"></div>
    </div>

    <div id="connected-box" class="connected-box">
      <div class="connected-row">
        <span class="tc-dot"></span>
        <span class="tc-name" id="connected-name">Connected to Transparent Classroom</span>
        <button class="disc-btn" onclick="signOut()">Sign Out</button>
      </div>
      <div class="tc-info" id="connected-info">Connected through MAC Parent Portal</div>
    </div>

    <div id="child-chips" class="chips"></div>

    <div class="stats">
      <div class="stat">
        <div class="stat-lbl">Attendance</div>
        <div class="stat-val green" id="attendance-val">--</div>
        <div class="stat-sub" id="attendance-sub">Today</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Absences</div>
        <div class="stat-val red" id="absence-val">--</div>
        <div class="stat-sub" id="absence-sub">Today</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Tardies</div>
        <div class="stat-val amber" id="tardy-val">--</div>
        <div class="stat-sub" id="tardy-sub">Today</div>
      </div>
    </div>

    <div class="quick-action-note" id="quick-action-note"></div>

    <div class="action-card">
      <h3>Daily Attendance</h3>
      <p>Sign-in and sign-out buttons are visual only until we confirm TC's write endpoint.</p>
    </div>

    <button class="action-btn" onclick="childSignAction('in')">Sign In Child</button>
    <button class="action-btn secondary" onclick="childSignAction('out')">Sign Out Child</button>
  </section>

  <section class="panel" id="panel-activity">
    <h1>Classroom Activity</h1>
    <div class="sub">From Transparent Classroom</div>

    <div id="activity-chips" class="chips"></div>

    <div id="activity-content">
      <div class="placeholder">
        <div style="font-size:28px;margin-bottom:8px">📋</div>
        <div style="font-weight:700;color:var(--blue);margin-bottom:4px">Sign In Required</div>
        <div style="font-size:12px">Sign in on the Dashboard tab to see activity here.</div>
      </div>
    </div>
  </section>

  <section class="panel" id="panel-events">
    <h1>School Calendar</h1>
    <div class="sub">Coming soon</div>
    <div class="placeholder">Calendar events can be added here later.</div>
  </section>

  <section class="panel" id="panel-contact">
    <h1>Contact School</h1>
    <div class="sub">Reach out to staff directly</div>

    <div class="contact-card">
      <div class="contact-av" style="background:var(--blue)">MA</div>
      <div>
        <div style="font-weight:700">Montessori Academy of Colorado</div>
        <div style="font-size:11px;color:var(--muted)">Main Office</div>
      </div>
      <button class="contact-msg">Call</button>
    </div>

    <div class="contact-card">
      <div class="contact-av" style="background:var(--green)">AT</div>
      <div>
        <div style="font-weight:700">Attendance</div>
        <div style="font-size:11px;color:var(--muted)">Absences and tardies</div>
      </div>
      <button class="contact-msg">Email</button>
    </div>
  </section>

</div>

<script>
var tcChildren = [];
var currentChildId = null;

document.getElementById('nav').addEventListener('click', function(e) {
  var tab = e.target.closest('.nav-tab');
  if (!tab) return;

  var panelName = tab.getAttribute('data-panel');
  showPanel(panelName);

  if (panelName === 'activity' && currentChildId) {
    loadActivity(currentChildId);
  }
});

function workerFetch(path) {
  return fetch(path, {
    credentials: 'include'
  });
}

function signInToPortal() {
  window.location.href = '/api/login';
}

function signOut() {
  window.location.href = '/cdn-cgi/access/logout';
}

function childSignAction(direction) {
  var note = document.getElementById('quick-action-note');
  var word = direction === 'in' ? 'sign in' : 'sign out';

  note.style.display = 'block';
  note.innerHTML =
    '<strong>Not connected yet.</strong><br>' +
    'The ' + word + ' button is ready visually, but it is not sending attendance to Transparent Classroom yet. ' +
    'We need to confirm the correct TC write endpoint before enabling this.';
}

function doConnect() {
  var errEl = document.getElementById('tc-err');
  errEl.textContent = 'Connecting...';

  workerFetch('/api/children')
    .then(function(r) {
      if (r.status === 401) {
        throw new Error('Please sign in to continue.');
      }

      if (r.status === 403) {
        throw new Error('This email does not have permission to view children.');
      }

      if (!r.ok) {
        throw new Error('Connection failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      var children = normalizeChildren(data);

      if (!children.length) {
        errEl.textContent = 'Connected, but no children were found for this account.';
        return;
      }

      document.getElementById('tc-box').style.display = 'none';

      var cb = document.getElementById('connected-box');
      cb.style.display = 'block';

      document.getElementById('connected-name').textContent = 'Connected to Transparent Classroom';
      document.getElementById('connected-info').textContent = 'Connected through MAC Parent Portal';

      renderChildren(children);
      errEl.textContent = '';
    })
    .catch(function(e) {
      errEl.innerHTML =
        'Could not connect: ' +
        escapeHtml(e.message) +
        '<br><br>Please click <strong>Sign In to Parent Portal</strong> and try again.';
    });
}

function normalizeChildren(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.children)) return data.children;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function normalizeActivity(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.activity)) return data.activity;
  if (data && Array.isArray(data.activities)) return data.activities;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function renderChildren(children) {
  if (!Array.isArray(children) || !children.length) return;

  tcChildren = children;

  var colors = ['#10069F','#7B1FA2','#D94F3D','#D4830A','#2E9E6F'];
  var dashboardHtml = '';
  var activityHtml = '';

  children.forEach(function(c, i) {
    var firstName = c.first_name || c.firstName || c.name || 'Student';
    var lastName = c.last_name || c.lastName || '';
    var initial = firstName ? firstName.charAt(0) : '?';
    var childId = c.id;

    dashboardHtml +=
      '<div class="chip' + (i === 0 ? ' active' : '') + '" data-id="' + escapeHtml(childId) + '">' +
      '<div class="chip-av" style="background:' + colors[i % colors.length] + '">' +
      escapeHtml(initial) +
      '</div>' +
      ' ' + escapeHtml(firstName) +
      (lastName ? ' ' + escapeHtml(lastName.charAt(0)) + '.' : '') +
      '</div>';

    activityHtml +=
      '<div class="chip' + (i === 0 ? ' active' : '') + '" data-id="' + escapeHtml(childId) + '">' +
      '<div class="chip-av" style="background:' + colors[i % colors.length] + '">' +
      escapeHtml(initial) +
      '</div>' +
      ' ' + escapeHtml(firstName) +
      '</div>';
  });

  document.getElementById('child-chips').innerHTML = dashboardHtml;
  document.getElementById('activity-chips').innerHTML = activityHtml;

  currentChildId = children[0].id;

  setActiveChild(currentChildId);
  loadAttendance(currentChildId);

  document.getElementById('child-chips').onclick = function(e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;

    currentChildId = chip.getAttribute('data-id');

    setActiveChild(currentChildId);
    loadAttendance(currentChildId);
  };

  document.getElementById('activity-chips').onclick = function(e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;

    currentChildId = chip.getAttribute('data-id');

    setActiveChild(currentChildId);
    loadAttendance(currentChildId);
    loadActivity(currentChildId);
  };
}

function setActiveChild(childId) {
  document.querySelectorAll('#child-chips .chip, #activity-chips .chip').forEach(function(chip) {
    if (chip.getAttribute('data-id') === String(childId)) {
      chip.classList.add('active');
    } else {
      chip.classList.remove('active');
    }
  });
}

function showPanel(panelName) {
  document.querySelectorAll('.nav-tab').forEach(function(tab) {
    if (tab.getAttribute('data-panel') === panelName) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }
  });

  document.querySelectorAll('.panel').forEach(function(panel) {
    panel.classList.remove('active');
  });

  document.getElementById('panel-' + panelName).classList.add('active');
}

function loadAttendance(childId) {
  document.getElementById('attendance-val').textContent = '...';
  document.getElementById('absence-val').textContent = '...';
  document.getElementById('tardy-val').textContent = '...';

  document.getElementById('attendance-sub').textContent = 'Loading today';
  document.getElementById('absence-sub').textContent = 'Loading today';
  document.getElementById('tardy-sub').textContent = 'Loading today';

  workerFetch('/api/attendance-summary?child_id=' + encodeURIComponent(childId))
    .then(function(r) {
      if (!r.ok) {
        throw new Error('Attendance request failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      document.getElementById('attendance-val').textContent = data.attendanceValue || '--';
      document.getElementById('absence-val').textContent = String(data.absenceCount || 0);
      document.getElementById('tardy-val').textContent = String(data.tardyCount || 0);

      document.getElementById('attendance-sub').textContent = data.status || 'Today';
      document.getElementById('absence-sub').textContent = 'Today';
      document.getElementById('tardy-sub').textContent = 'Today';
    })
    .catch(function(e) {
      document.getElementById('attendance-val').textContent = '--';
      document.getElementById('absence-val').textContent = '--';
      document.getElementById('tardy-val').textContent = '--';

      document.getElementById('attendance-sub').textContent = 'Unable to load';
      document.getElementById('absence-sub').textContent = 'Unable to load';
      document.getElementById('tardy-sub').textContent = 'Unable to load';
    });
}

function loadActivity(childId) {
  var content = document.getElementById('activity-content');

  content.innerHTML = '<div class="loading">Loading activity...</div>';

  var d = new Date();
  d.setDate(d.getDate() - 90);
  var ds = d.toISOString().split('T')[0];

  workerFetch('/api/activity?child_id=' + encodeURIComponent(childId) + '&date_start=' + encodeURIComponent(ds))
    .then(function(r) {
      if (r.status === 401) {
        throw new Error('Please sign in to view activity.');
      }

      if (r.status === 403) {
        throw new Error('This account does not have permission to view this child.');
      }

      if (!r.ok) {
        throw new Error('Activity request failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      var items = normalizeActivity(data);

      if (!items.length) {
        content.innerHTML =
          '<div class="placeholder">' +
          '<div style="font-size:13px;color:var(--muted)">No recent activity, notes, or photos were found.</div>' +
          '</div>';
        return;
      }

      var html = '';

      items.slice(0, 40).forEach(function(item) {
        var displayDate = getActivityDate(item);
        var title = getActivityTitle(item);
        var text = getActivityText(item);
        var photos = getActivityPhotos(item);

        html += '<div class="act-card">';

        html +=
          '<div class="act-meta">' +
          '<span class="act-date">' + escapeHtml(displayDate) + '</span>' +
          '<span class="act-tag">' + escapeHtml(getActivityType(item)) + '</span>' +
          '</div>';

        if (title) {
          html += '<div class="act-title">' + escapeHtml(title) + '</div>';
        }

        if (text) {
          html += '<div class="act-note">' + escapeHtml(text) + '</div>';
        } else if (!photos.length) {
          html += '<div class="act-note">No description provided.</div>';
        }

        if (photos.length) {
          html += '<div class="activity-photos">';
          photos.forEach(function(photoUrl) {
            html += '<img class="activity-photo" src="' + escapeHtml(photoUrl) + '" alt="Classroom activity photo">';
          });
          html += '</div>';
        }

        html += '</div>';
      });

      content.innerHTML = html;
    })
    .catch(function(e) {
      content.innerHTML =
        '<div style="color:var(--red);font-size:13px;padding:16px">Error: ' +
        escapeHtml(e.message) +
        '</div>';
    });
}

function getActivityDate(item) {
  var rawDate =
    item.date ||
    item.created_at ||
    item.createdAt ||
    item.observed_on ||
    item.observedOn ||
    item.updated_at ||
    '';

  if (!rawDate) return '';

  var parsedDate = new Date(rawDate);

  if (isNaN(parsedDate.getTime())) {
    return String(rawDate);
  }

  return parsedDate.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

function getActivityTitle(item) {
  return (
    item.title ||
    item.lesson_name ||
    item.lessonName ||
    item.name ||
    item.activity_name ||
    ''
  );
}

function getActivityText(item) {
  return (
    item.text ||
    item.note ||
    item.notes ||
    item.description ||
    item.body ||
    item.comment ||
    item.comments ||
    item.observation ||
    item.observations ||
    item.caption ||
    item.message ||
    ''
  );
}

function getActivityType(item) {
  var type =
    item.type ||
    item.kind ||
    item.category ||
    item.activity_type ||
    item.activityType ||
    '';

  if (!type) {
    if (getActivityPhotos(item).length) return 'Photo';
    if (getActivityText(item)) return 'Note';
    return 'Activity';
  }

  return String(type).replace(/_/g, ' ');
}

function getActivityPhotos(item) {
  var photos = [];

  function addPhoto(value) {
    if (!value) return;

    if (typeof value === 'string') {
      if (value.indexOf('http') === 0) {
        photos.push(value);
      }
      return;
    }

    if (typeof value === 'object') {
      var possibleUrl =
        value.large_photo_url ||
        value.largePhotoUrl ||
        value.original_photo_url ||
        value.originalPhotoUrl ||
        value.full_photo_url ||
        value.fullPhotoUrl ||
        value.large_url ||
        value.largeUrl ||
        value.original_url ||
        value.originalUrl ||
        value.full_url ||
        value.fullUrl ||
        value.photo_url ||
        value.photoUrl ||
        value.image_url ||
        value.imageUrl ||
        value.url ||
        value.medium_url ||
        value.mediumUrl ||
        value.thumbnail_url ||
        value.thumbnailUrl;

      if (possibleUrl) {
        addPhoto(possibleUrl);
      }
    }
  }

  addPhoto(item.large_photo_url);
  addPhoto(item.largePhotoUrl);
  addPhoto(item.original_photo_url);
  addPhoto(item.originalPhotoUrl);
  addPhoto(item.full_photo_url);
  addPhoto(item.fullPhotoUrl);
  addPhoto(item.large_url);
  addPhoto(item.largeUrl);
  addPhoto(item.original_url);
  addPhoto(item.originalUrl);
  addPhoto(item.full_url);
  addPhoto(item.fullUrl);
  addPhoto(item.photo_url);
  addPhoto(item.photoUrl);
  addPhoto(item.image_url);
  addPhoto(item.imageUrl);
  addPhoto(item.url);
  addPhoto(item.photo);
  addPhoto(item.image);

  if (Array.isArray(item.photos)) {
    item.photos.forEach(addPhoto);
  }

  if (Array.isArray(item.images)) {
    item.images.forEach(addPhoto);
  }

  if (Array.isArray(item.attachments)) {
    item.attachments.forEach(addPhoto);
  }

  if (Array.isArray(item.media)) {
    item.media.forEach(addPhoto);
  }

  return Array.from(new Set(photos));
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

if (new URLSearchParams(window.location.search).get('signed_in') === '1') {
  doConnect();
  window.history.replaceState({}, document.title, window.location.pathname);
}
</script>

</body>
</html>`;
}
