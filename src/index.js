const DEFAULT_ADMIN_EMAILS = ["jennine@tmaoc.com"];

const DEFAULT_CALENDAR_EVENTS = [
  { id: "cal-2026-08-03", date: "2026-08-03", endDate: "2026-08-07", type: "break", title: "Summer Break - No School" },
  { id: "cal-2026-08-10", date: "2026-08-10", endDate: "2026-08-14", type: "break", title: "Summer Break - No School" },
  { id: "cal-2026-08-17", date: "2026-08-17", endDate: "2026-08-18", type: "professional_learning", title: "Professional Learning Days - No School" },
  { id: "cal-2026-08-19", date: "2026-08-19", endDate: "", type: "milestone", title: "First Day of School" },
  { id: "cal-2026-09-07", date: "2026-09-07", endDate: "", type: "holiday", title: "Labor Day - No School" },
  { id: "cal-2026-09-21", date: "2026-09-21", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2026-10-30", date: "2026-10-30", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2026-11-23", date: "2026-11-23", endDate: "2026-11-27", type: "break", title: "Thanksgiving Break - No School" },
  { id: "cal-2026-12-21", date: "2026-12-21", endDate: "2026-12-25", type: "break", title: "Winter Break - No School" },
  { id: "cal-2026-12-28", date: "2026-12-28", endDate: "2027-01-01", type: "break", title: "Winter Break - No School" },
  { id: "cal-2027-01-04", date: "2027-01-04", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2027-01-18", date: "2027-01-18", endDate: "", type: "holiday", title: "Martin Luther King Jr. Day - No School" },
  { id: "cal-2027-02-15", date: "2027-02-15", endDate: "", type: "holiday", title: "Presidents’ Day - No School" },
  { id: "cal-2027-03-12", date: "2027-03-12", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2027-03-29", date: "2027-03-29", endDate: "2027-04-02", type: "break", title: "Spring Break - No School" },
  { id: "cal-2027-04-05", date: "2027-04-05", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2027-05-07", date: "2027-05-07", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2027-05-31", date: "2027-05-31", endDate: "", type: "holiday", title: "Memorial Day - No School" },
  { id: "cal-2027-06-02", date: "2027-06-02", endDate: "", type: "half_day", title: "Early Dismissal / Last Day of School" },
  { id: "cal-2027-06-03", date: "2027-06-03", endDate: "2027-06-04", type: "professional_learning", title: "Professional Learning Days - No School" },
  { id: "cal-2027-06-18", date: "2027-06-18", endDate: "", type: "holiday", title: "Juneteenth Observed - No School" },
  { id: "cal-2027-07-02", date: "2027-07-02", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { id: "cal-2027-07-05", date: "2027-07-05", endDate: "", type: "holiday", title: "Independence Day Observed - No School" },
  { id: "cal-2027-08-02", date: "2027-08-02", endDate: "2027-08-06", type: "break", title: "Summer Break - No School" },
  { id: "cal-2027-08-09", date: "2027-08-09", endDate: "2027-08-13", type: "break", title: "Summer Break - No School" },
  { id: "cal-2027-08-16", date: "2027-08-16", endDate: "2027-08-17", type: "professional_learning", title: "Professional Learning Days - No School" },
  { id: "cal-2027-08-18", date: "2027-08-18", endDate: "", type: "milestone", title: "First Day of School" }
];

const DEFAULT_NEWSLETTER_ARCHIVES = [
  {
    id: "news-2026-05-26",
    date: "2026-05-26",
    title: "MAC News - Week of 5/26/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/1970e57d-adb1-4be2-887d-b9b82eed4eaa"
  },
  {
    id: "news-2026-05-18",
    date: "2026-05-18",
    title: "MAC News - Week of 5/18/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/9a5cc677-905a-41c5-8d54-2fc5be24baa9"
  },
  {
    id: "news-2026-05-11",
    date: "2026-05-11",
    title: "MAC News - Week of 5/11/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8f5636d5-25ac-4887-851e-08a8c2f09605"
  },
  {
    id: "news-2026-05-04",
    date: "2026-05-04",
    title: "MAC News - Week of 5/4/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/92ce53d6-636a-4cc6-8ab9-220175fab6a6"
  },
  {
    id: "news-2026-04-27",
    date: "2026-04-27",
    title: "MAC News - Week of 4/27/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8c596259-8f98-411f-868a-c2c5011ba615"
  },
  {
    id: "news-2026-04-20",
    date: "2026-04-20",
    title: "MAC News - Week of 4/20/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8fecde96-a16f-45ca-be64-1b0fa10fd1ef"
  }
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    const apiBaseUrl = "https://www.transparentclassroom.com/api/v1";
    const schoolId = env.TC_SCHOOL_ID;
    const token = env.TC_TOKEN;
    const userEmail = getUserEmail(request);
    const classroomIds = getClassroomIds(env);

    if (path === "/manifest.json") {
      return jsonResponse(getManifest(url.origin));
    }

    if (path === "/service-worker.js") {
      return new Response(getServiceWorker(), {
        status: 200,
        headers: {
          "Content-Type": "application/javascript; charset=utf-8",
          "Cache-Control": "no-cache"
        }
      });
    }

    if (path === "/api/login") {
      return Response.redirect(url.origin + "/?signed_in=1", 302);
    }

    if (path === "/admin") {
      if (!userEmail) {
        return jsonResponse({ error: "Not signed in through Cloudflare Access" }, 401);
      }

      const isAdmin = await isAdminEmail(env, userEmail);

      if (!isAdmin) {
        return new Response(renderNotAdminHtml(userEmail), {
          status: 403,
          headers: { "Content-Type": "text/html; charset=utf-8" }
        });
      }

      return new Response(renderAdminHtml(userEmail), {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" }
      });
    }

    if (path === "/api") {
      return jsonResponse({
        status: "api running",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        signedInEmail: userEmail || null,
        classroomIds,
        routes: [
          "/api/login",
          "/api/permission-test",
          "/api/children",
          "/api/activity?child_id=CHILD_ID",
          "/api/activity-raw?child_id=CHILD_ID",
          "/api/attendance-summary?child_id=CHILD_ID",
          "/api/attendance-action",
          "/api/announcements",
          "/api/announcements-raw",
          "/api/posts-raw",
          "/api/newsletters",
          "/api/calendar",
          "/admin",
          "/manifest.json",
          "/service-worker.js"
        ]
      });
    }

    if (path === "/api/calendar") {
      const events = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
      return jsonResponse({
        count: events.length,
        events: sortByDate(events)
      });
    }

    if (path === "/api/newsletters") {
      const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);
      return jsonResponse({
        count: newsletters.length,
        newsletters: sortByDate(newsletters)
      });
    }

    if (path.startsWith("/api/admin/")) {
      if (!env.PARENT_PERMISSIONS) {
        return jsonResponse({ error: "Missing KV binding: PARENT_PERMISSIONS" }, 500);
      }

      if (!userEmail) {
        return jsonResponse({ error: "Not signed in through Cloudflare Access" }, 401);
      }

      const isAdmin = await isAdminEmail(env, userEmail);

      if (!isAdmin) {
        return jsonResponse({
          error: "Admin access denied",
          signedInEmail: userEmail
        }, 403);
      }

      if (path === "/api/admin/bootstrap") {
        const admins = await getStoredArray(env, "ADMIN_EMAILS", DEFAULT_ADMIN_EMAILS);
        const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);
        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);

        return jsonResponse({
          ok: true,
          signedInEmail: userEmail,
          admins,
          newsletters: sortByDate(newsletters),
          calendar: sortByDate(calendar)
        });
      }

      if (path === "/api/admin/newsletters/add") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

        const body = await safeJson(request);
        const date = String(body.date || "").trim();
        const title = String(body.title || "").trim();
        const link = String(body.url || body.link || "").trim();

        if (!date || !title || !link) {
          return jsonResponse({ error: "Missing date, title, or URL" }, 400);
        }

        const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);

        newsletters.push({
          id: "news-" + date + "-" + Date.now(),
          date,
          title,
          url: link
        });

        const sorted = sortByDate(newsletters);
        await putStoredArray(env, "NEWSLETTER_ARCHIVES", sorted);

        return jsonResponse({ ok: true, newsletters: sorted });
      }

      if (path === "/api/admin/newsletters/delete") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

        const body = await safeJson(request);
        const id = String(body.id || "").trim();

        if (!id) return jsonResponse({ error: "Missing id" }, 400);

        const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);
        const updated = newsletters.filter(function(item) {
          return String(item.id) !== id;
        });

        await putStoredArray(env, "NEWSLETTER_ARCHIVES", updated);

        return jsonResponse({ ok: true, newsletters: sortByDate(updated) });
      }

      if (path === "/api/admin/calendar/add") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

        const body = await safeJson(request);
        const date = String(body.date || "").trim();
        const endDate = String(body.endDate || "").trim();
        const type = String(body.type || "calendar").trim();
        const title = String(body.title || "").trim();

        if (!date || !title) {
          return jsonResponse({ error: "Missing date or title" }, 400);
        }

        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);

        calendar.push({
          id: "cal-" + date + "-" + Date.now(),
          date,
          endDate,
          type,
          title
        });

        const sorted = sortByDate(calendar);
        await putStoredArray(env, "CALENDAR_EVENTS", sorted);

        return jsonResponse({ ok: true, calendar: sorted });
      }

      if (path === "/api/admin/calendar/delete") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

        const body = await safeJson(request);
        const id = String(body.id || "").trim();

        if (!id) return jsonResponse({ error: "Missing id" }, 400);

        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
        const updated = calendar.filter(function(item) {
          return String(item.id) !== id;
        });

        await putStoredArray(env, "CALENDAR_EVENTS", updated);

        return jsonResponse({ ok: true, calendar: sortByDate(updated) });
      }

      if (path === "/api/admin/admins/add") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);

        const body = await safeJson(request);
        const email = String(body.email || "").toLowerCase().trim();

        if (!email || !email.includes("@")) {
          return jsonResponse({ error: "Missing valid email" }, 400);
        }

        const admins = await getStoredArray(env, "ADMIN_EMAILS", DEFAULT_ADMIN_EMAILS);
        const updated = Array.from(new Set(admins.concat([email])));

        await putStoredArray(env, "ADMIN_EMAILS", updated);

        return jsonResponse({ ok: true, admins: updated });
      }

      return jsonResponse({ error: "Admin route not found" }, 404);
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
        return jsonResponse({ error: "Missing KV binding: PARENT_PERMISSIONS" }, 500);
      }

      const tcHeaders = {
        "X-TransparentClassroomToken": token,
        "X-TransparentClassroomSchoolId": schoolId,
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

      if (path === "/api/permission-test") {
        if (!userEmail) {
          return jsonResponse({ error: "No signed-in email found. Cloudflare Access may not be enabled." }, 401);
        }

        const allowed = await getAllowedChildren(env, userEmail);
        return jsonResponse({ signedInEmail: userEmail, allowedChildren: allowed });
      }

      if (!userEmail) {
        return jsonResponse({ error: "Not signed in through Cloudflare Access" }, 401);
      }

      const allowedChildren = await getAllowedChildren(env, userEmail);

      if (!allowedChildren) {
        return jsonResponse({
          error: "This email does not have permission to view children",
          email: userEmail
        }, 403);
      }

      if (path === "/api/children") {
        const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });

        if (!childrenResult.ok) {
          return jsonResponse(childrenResult.data, childrenResult.status);
        }

        return jsonResponse(filterChildrenForUser(childrenResult.children, allowedChildren));
      }

      if (path === "/api/announcements-raw") {
        const raw = await fetchAnnouncementsRawFromTC({ schoolId, tcHeaders });
        return jsonResponse(raw, raw.ok ? 200 : raw.status || 500);
      }

      if (path === "/api/posts-raw") {
        const rawPosts = await fetchRecentPostsRawFromTC({ schoolId, tcHeaders });
        return jsonResponse(rawPosts, rawPosts.ok ? 200 : rawPosts.status || 500);
      }

      if (path === "/api/announcements") {
        const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });

        let visibleClassroomIds = new Set();
        let visibleClassroomNames = new Set();

        if (childrenResult.ok) {
          const filteredChildren = filterChildrenForUser(childrenResult.children, allowedChildren);
          const classroomInfo = getClassroomInfoFromChildren(filteredChildren);
          visibleClassroomIds = classroomInfo.ids;
          visibleClassroomNames = classroomInfo.names;
        }

        const announcementsResult = await fetchAnnouncementsFromTC({
          schoolId,
          tcHeaders,
          visibleClassroomIds,
          visibleClassroomNames
        });

        return jsonResponse(announcementsResult, announcementsResult.ok ? 200 : announcementsResult.status || 500);
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
            childId
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
            childId
          }, 403);
        }

        const allEvents = await fetchAttendanceEventsForAllClassrooms({
          schoolId,
          classroomIds,
          day,
          tcHeaders
        });

        return jsonResponse(summarizeTodayAttendanceForChild(allEvents, childId, day));
      }

      if (path === "/api/attendance-action") {
        if (request.method !== "POST") {
          return jsonResponse({ error: "Method not allowed" }, 405);
        }

        let body;

        try {
          body = await request.json();
        } catch (e) {
          return jsonResponse({ error: "Invalid JSON body" }, 400);
        }

        const childId = String(body.child_id || body.childId || "").trim();
        const action = String(body.action || "").trim();

        if (!childId) {
          return jsonResponse({ error: "Missing child_id" }, 400);
        }

        if (!["dropoff", "pickup"].includes(action)) {
          return jsonResponse({
            error: "Invalid action. Use dropoff or pickup."
          }, 400);
        }

        if (!canAccessChild(childId, allowedChildren)) {
          return jsonResponse({
            error: "This user does not have permission to update this child",
            email: userEmail,
            childId
          }, 403);
        }

        let classroomId = String(body.classroom_id || body.classroomId || "").trim();

        if (classroomId && !classroomIds.includes(classroomId)) {
          return jsonResponse({
            error: "Invalid classroom_id",
            classroomId
          }, 400);
        }

        if (!classroomId) {
          classroomId = await findClassroomIdForChild({
            schoolId,
            classroomIds,
            childId,
            tcHeaders,
            apiBaseUrl
          });
        }

        if (!classroomId) {
          return jsonResponse({
            error: "Could not determine classroom for this child. Try again after today's attendance has loaded."
          }, 400);
        }

        const result = await sendAttendanceActionToTC({
          schoolId,
          classroomId,
          childId,
          action,
          userEmail,
          tcHeaders
        });

        return jsonResponse(result, result.ok ? 200 : result.status || 500);
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
          "/api/attendance-action",
          "/api/announcements",
          "/api/announcements-raw",
          "/api/posts-raw",
          "/api/newsletters",
          "/api/calendar",
          "/admin",
          "/manifest.json",
          "/service-worker.js"
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

async function safeJson(request) {
  try {
    return await request.json();
  } catch (e) {
    return {};
  }
}

function getUserEmail(request) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  return email ? email.toLowerCase().trim() : null;
}

async function getStoredArray(env, key, fallback) {
  if (!env.PARENT_PERMISSIONS) return fallback;

  const raw = await env.PARENT_PERMISSIONS.get(key);

  if (!raw) return fallback;

  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch (e) {
    return fallback;
  }
}

async function putStoredArray(env, key, value) {
  await env.PARENT_PERMISSIONS.put(key, JSON.stringify(value));
}

function sortByDate(items) {
  return items.slice().sort(function(a, b) {
    const aTime = new Date(a.date || "").getTime();
    const bTime = new Date(b.date || "").getTime();

    if (isNaN(aTime) && isNaN(bTime)) return 0;
    if (isNaN(aTime)) return 1;
    if (isNaN(bTime)) return -1;

    return bTime - aTime;
  });
}

async function isAdminEmail(env, email) {
  const admins = await getStoredArray(env, "ADMIN_EMAILS", DEFAULT_ADMIN_EMAILS);
  return admins.map(function(item) {
    return String(item).toLowerCase().trim();
  }).includes(String(email).toLowerCase().trim());
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

async function fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders }) {
  const tcUrl = new URL(apiBaseUrl + "/children.json");
  tcUrl.searchParams.set("school_id", schoolId);

  const response = await fetch(tcUrl.toString(), {
    method: "GET",
    headers: tcHeaders
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      ok: false,
      status: response.status,
      data,
      children: []
    };
  }

  return {
    ok: true,
    status: response.status,
    data,
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

  const allowedSet = new Set(allowedChildren.map(String));

  return children.filter(function(child) {
    return allowedSet.has(String(child.id));
  });
}

function canAccessChild(childId, allowedChildren) {
  if (allowedChildren === "*") return true;
  return allowedChildren.map(String).includes(String(childId));
}

function getClassroomInfoFromChildren(children) {
  const ids = new Set();
  const names = new Set();

  children.forEach(function(child) {
    const possibleIds = [
      child.classroom_id,
      child.classroomId,
      child.current_classroom_id,
      child.currentClassroomId,
      child.primary_classroom_id,
      child.primaryClassroomId,
      child.classroom && child.classroom.id
    ];

    possibleIds.forEach(function(id) {
      if (id !== undefined && id !== null && String(id).trim()) {
        ids.add(String(id).trim());
      }
    });

    if (Array.isArray(child.classroom_ids)) {
      child.classroom_ids.forEach(function(id) {
        if (id !== undefined && id !== null && String(id).trim()) {
          ids.add(String(id).trim());
        }
      });
    }

    if (Array.isArray(child.classrooms)) {
      child.classrooms.forEach(function(classroom) {
        if (classroom && classroom.id) {
          ids.add(String(classroom.id).trim());
        }

        if (classroom && classroom.name) {
          names.add(String(classroom.name).trim().toLowerCase());
        }
      });
    }

    const possibleNames = [
      child.classroom_name,
      child.classroomName,
      child.current_classroom_name,
      child.currentClassroomName,
      child.primary_classroom_name,
      child.primaryClassroomName,
      child.classroom && child.classroom.name
    ];

    possibleNames.forEach(function(name) {
      if (name && String(name).trim()) {
        names.add(String(name).trim().toLowerCase());
      }
    });
  });

  return { ids, names };
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

function getNowForTC() {
  return new Date().toISOString();
}

function getBlankSignatureImage() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lO+vWwAAAABJRU5ErkJggg==";
}
async function fetchAnnouncementsRawFromTC({ schoolId, tcHeaders }) {
  const baseUrl = new URL(
    "https://www.transparentclassroom.com/s/" +
    encodeURIComponent(schoolId) +
    "/frontend/announcements.json"
  );

  const pages = [];
  const seenIds = new Set();
  let next = "";
  let safety = 0;

  while (safety < 8) {
    safety++;

    const pageUrl = new URL(baseUrl.toString());

    if (next) {
      pageUrl.searchParams.set("page", next);
    }

    const response = await fetch(pageUrl.toString(), {
      method: "GET",
      headers: tcHeaders
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return {
        ok: false,
        status: response.status,
        error: "Could not parse announcements response",
        rawText: text.slice(0, 2000),
        pages
      };
    }

    const items = Array.isArray(data.data)
      ? data.data
      : Array.isArray(data)
        ? data
        : [];

    const uniqueItems = [];

    items.forEach(function(item) {
      const a = item && item.data ? item.data : item || {};
      const id = String(a.id || "");

      if (id && !seenIds.has(id)) {
        seenIds.add(id);
        uniqueItems.push(item);
      }
    });

    pages.push({
      status: response.status,
      requestUrl: pageUrl.toString(),
      dataCount: items.length,
      uniqueAdded: uniqueItems.length,
      pagination: data.pagination || null,
      sample: uniqueItems
    });

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        pages
      };
    }

    next = data && data.pagination && data.pagination.next ? data.pagination.next : "";

    if (!next || uniqueItems.length === 0) {
      break;
    }
  }

  return {
    ok: true,
    pageCount: pages.length,
    uniqueCount: seenIds.size,
    pages
  };
}

async function fetchRecentPostsRawFromTC({ schoolId, tcHeaders }) {
  const pages = [];
  let page = 1;
  let safety = 0;

  while (safety < 5) {
    safety++;

    const url = new URL(
      "https://www.transparentclassroom.com/s/" +
      encodeURIComponent(schoolId) +
      "/posts/recent.json"
    );

    url.searchParams.set("locale", "en");
    url.searchParams.set("page", String(page));

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: tcHeaders
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      return {
        ok: false,
        status: response.status,
        error: "Could not parse recent posts response",
        rawText: text.slice(0, 2000),
        pages
      };
    }

    const items = Array.isArray(data)
      ? data
      : Array.isArray(data.posts)
        ? data.posts
        : Array.isArray(data.data)
          ? data.data
          : [];

    pages.push({
      status: response.status,
      requestUrl: url.toString(),
      dataType: Array.isArray(data) ? "array" : typeof data,
      topLevelKeys: data && typeof data === "object" && !Array.isArray(data) ? Object.keys(data) : [],
      dataCount: items.length,
      items,
      sample: items.slice(0, 5)
    });

    if (!response.ok || items.length === 0) {
      break;
    }

    page++;
  }

  return {
    ok: true,
    pageCount: pages.length,
    totalCount: pages.reduce(function(total, page) {
      return total + (page.dataCount || 0);
    }, 0),
    pages
  };
}

async function fetchAnnouncementsFromTC({ schoolId, tcHeaders, visibleClassroomIds, visibleClassroomNames }) {
  const rawAnnouncementsResult = await fetchAnnouncementsRawFromTC({
    schoolId,
    tcHeaders
  });

  const rawPostsResult = await fetchRecentPostsRawFromTC({
    schoolId,
    tcHeaders
  });

  const allAnnouncementItems = [];

  if (rawAnnouncementsResult.ok) {
    rawAnnouncementsResult.pages.forEach(function(page) {
      if (page.sample && Array.isArray(page.sample)) {
        page.sample.forEach(function(item) {
          allAnnouncementItems.push(item);
        });
      }
    });
  }

  const normalizedAnnouncements = normalizeAnnouncements(allAnnouncementItems);

  const visibleAnnouncements = normalizedAnnouncements.filter(function(announcement) {
    return canSeeAnnouncement(announcement, visibleClassroomIds, visibleClassroomNames, schoolId);
  });

  const recentPosts = rawPostsResult.ok
    ? normalizeRecentPostsAsAnnouncements(rawPostsResult.pages)
    : [];

  const visibleRecentPosts = recentPosts.filter(function(post) {
    return canSeeRecentPost(post, visibleClassroomIds);
  });

  const combined = visibleAnnouncements.concat(visibleRecentPosts);

  const unique = [];
  const seen = new Set();

  combined.forEach(function(item) {
    const key = String(item.source || "") + "-" + String(item.id || "") + "-" + String(item.title || "");

    if (!seen.has(key)) {
      seen.add(key);
      unique.push(item);
    }
  });

  unique.sort(function(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return {
    ok: true,
    announcementRawCount: allAnnouncementItems.length,
    recentPostRawCount: recentPosts.length,
    count: unique.length,
    visibleClassroomIds: Array.from(visibleClassroomIds),
    visibleClassroomNames: Array.from(visibleClassroomNames),
    announcements: unique
  };
}

function normalizeAnnouncements(data) {
  const rawItems = Array.isArray(data)
    ? data
    : Array.isArray(data.data)
      ? data.data
      : [];

  return rawItems.map(function(item) {
    const a = item && item.data ? item.data : item || {};
    const subjectRaw = a.subject || {};
    const subject = subjectRaw.data || subjectRaw;
    const authorRaw = a.author || {};
    const author = authorRaw.data || authorRaw;

    return {
      id: a.id || "",
      source: "announcement",
      title: a.title || a.subject_title || "Announcement",
      body: a.body || a.text || a.message || "",
      createdAt: a.createdAt || a.created_at || a.publishedAt || a.published_at || "",
      read: Boolean(a.read),
      readCount: a.readCount || a.read_count || 0,
      authorName: author.name || a.author_name || "",
      subjectId: subject.id || subjectRaw.id || "",
      subjectType: subject.type || subjectRaw.type || "",
      subjectName: subject.name || subjectRaw.name || "",
      classroomId: subject.type === "Classroom" ? subject.id || "" : "",
      private: false,
      attachments: Array.isArray(a.attachments) ? a.attachments : [],
      photoUrl: ""
    };
  }).sort(function(a, b) {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

function normalizeRecentPostsAsAnnouncements(pages) {
  const items = [];

  pages.forEach(function(page) {
    const sourceItems = Array.isArray(page.items)
      ? page.items
      : Array.isArray(page.sample)
        ? page.sample
        : [];

    sourceItems.forEach(function(post) {
      items.push(post);
    });
  });

  return items.map(function(post) {
    const plainText = htmlToPlainText(post.html || post.normalized_text || "");
    const title = makePostTitle(plainText);

    return {
      id: post.id || "",
      source: "recent_post",
      title: title || "Recent Update",
      body: plainText,
      createdAt: post.created_at || post.date || "",
      authorName: htmlToPlainText(post.author || ""),
      subjectId: post.classroom_id || "",
      subjectType: post.classroom_id ? "Classroom" : "Whole School",
      subjectName: post.classroom_id ? "Classroom Update" : "Whole School",
      classroomId: post.classroom_id || "",
      private: post.private === true,
      attachments: [],
      photoUrl: post.large_photo_url || post.medium_photo_url || post.photo_url || ""
    };
  });
}

function canSeeAnnouncement(announcement, visibleClassroomIds, visibleClassroomNames, schoolId) {
  const subjectType = String(announcement.subjectType || "").trim().toLowerCase();
  const subjectName = String(announcement.subjectName || "").trim().toLowerCase();
  const subjectId = String(announcement.subjectId || "").trim();

  const wholeSchoolTypes = [
    "whole school",
    "wholeschool",
    "whole_school",
    "school",
    "all school",
    "all_school"
  ];

  if (wholeSchoolTypes.includes(subjectType)) return true;
  if (subjectId === String(schoolId)) return true;
  if (subjectName.includes("whole school")) return true;
  if (subjectName.includes("montessori academy of colorado") && subjectId === String(schoolId)) return true;

  if (subjectType === "classroom" || subjectType.includes("classroom")) {
    if (visibleClassroomIds.has(subjectId)) return true;
    if (visibleClassroomNames.has(subjectName)) return true;
  }

  return false;
}

function canSeeRecentPost(post, visibleClassroomIds) {
  if (post.private === true) {
    return false;
  }

  const body = String(post.body || "").toLowerCase();
  const title = String(post.title || "").toLowerCase();
  const classroomId = String(post.classroomId || "").trim();

  if (title.includes("tornado") || body.includes("tornado")) return true;
  if (title.includes("drill") || body.includes("drill")) return true;
  if (title.includes("whole school") || body.includes("whole school")) return true;

  if (!classroomId) return true;

  return visibleClassroomIds.has(classroomId);
}

function makePostTitle(text) {
  const clean = String(text || "").replace(/\s+/g, " ").trim();

  if (!clean) return "Recent Update";

  if (clean.toLowerCase().includes("tornado")) {
    return "Tornado Drill Practice";
  }

  if (clean.toLowerCase().includes("drill")) {
    return "Drill Practice";
  }

  if (clean.length <= 70) return clean;

  return clean.slice(0, 70).trim() + "...";
}

function htmlToPlainText(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
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

function summarizeTodayAttendanceForChild(events, childId, day) {
  const childEvents = events.filter(function(event) {
    return String(event.child_id || event.childId || "") === String(childId);
  });

  const attendanceEvents = childEvents
    .filter(function(event) {
      return String(event.event_type || event.eventType || "") === "attendance_state";
    })
    .sort(function(a, b) {
      return getEventTime(a) - getEventTime(b);
    });

  const dropoffEvents = childEvents
    .filter(function(event) {
      const type = String(event.event_type || event.eventType || "");
      return type.includes("dropoff") || type.includes("pickup");
    })
    .sort(function(a, b) {
      return getEventTime(a) - getEventTime(b);
    });

  const latestAttendance = attendanceEvents.length ? attendanceEvents[attendanceEvents.length - 1] : null;
  const rawValue = latestAttendance ? String(latestAttendance.value || "") : "";
  const statusInfo = getAttendanceStatus(rawValue);

  let latestDropoff = null;
  let latestPickup = null;

  dropoffEvents.forEach(function(event) {
    const type = String(event.event_type || event.eventType || "");

    if (type === "dropoff") latestDropoff = event;
    if (type === "pickup") latestPickup = event;
  });

  return {
    day,
    childId: String(childId),
    todayStatus: statusInfo.label,
    todayStatusCategory: statusInfo.category,
    todayAttendanceValue: statusInfo.displayValue,
    todayRawValue: rawValue || null,
    attendanceEventsCount: attendanceEvents.length,
    dropoffEventsCount: dropoffEvents.length,
    latestAttendance,
    latestDropoff,
    latestPickup,
    note: statusInfo.confirmed ? "" : "Attendance state found, but this value still needs confirmation."
  };
}

function getEventTime(event) {
  const raw =
    event.time ||
    event.created_at ||
    event.createdAt ||
    event.updated_at ||
    event.updatedAt ||
    "";

  const parsed = new Date(raw).getTime();

  return isNaN(parsed) ? 0 : parsed;
}

function getAttendanceStatus(value) {
  const map = {
    "20145": { label: "Present", category: "present", displayValue: "P", confirmed: true },
    "20146": { label: "Absent", category: "absent", displayValue: "A", confirmed: true },
    "20148": { label: "Sick / Sent Home", category: "absent", displayValue: "S", confirmed: false },
    "20150": { label: "Vacation", category: "absent", displayValue: "V", confirmed: false },
    "20151": { label: "Tardy", category: "tardy", displayValue: "T", confirmed: true },
    "3685": { label: "Late Pickup", category: "tardy", displayValue: "LP", confirmed: false }
  };

  if (map[value]) return map[value];

  if (!value) {
    return {
      label: "No Record Today",
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

async function findClassroomIdForChild({ schoolId, classroomIds, childId, tcHeaders, apiBaseUrl }) {
  const today = getTodayDate();

  const todayEvents = await fetchAttendanceEventsForAllClassrooms({
    schoolId,
    classroomIds,
    day: today,
    tcHeaders
  });

  const matchingEvent = todayEvents.find(function(event) {
    return String(event.child_id || event.childId || "") === String(childId);
  });

  if (matchingEvent) {
    return String(matchingEvent.classroom_id || matchingEvent.classroomId || "");
  }

  try {
    const childrenResult = await fetchChildrenFromTC({
      apiBaseUrl,
      schoolId,
      tcHeaders
    });

    if (!childrenResult.ok) return "";

    const child = childrenResult.children.find(function(item) {
      return String(item.id) === String(childId);
    });

    if (!child) return "";

    const possible =
      child.classroom_id ||
      child.classroomId ||
      child.current_classroom_id ||
      child.currentClassroomId ||
      child.primary_classroom_id ||
      child.primaryClassroomId ||
      (child.classroom && child.classroom.id) ||
      (Array.isArray(child.classrooms) && child.classrooms[0] && child.classrooms[0].id) ||
      (Array.isArray(child.classroom_ids) && child.classroom_ids[0]) ||
      "";

    if (possible && classroomIds.includes(String(possible))) {
      return String(possible);
    }
  } catch (e) {
    return "";
  }

  return "";
}

async function sendAttendanceActionToTC({ schoolId, classroomId, childId, action, userEmail, tcHeaders }) {
  const tcUrl = new URL(
    "https://www.transparentclassroom.com/s/" +
    encodeURIComponent(schoolId) +
    "/classrooms/" +
    encodeURIComponent(classroomId) +
    "/events.json"
  );

  const payload = {
    event: [
      {
        event_type: action,
        child_id: Number(childId),
        created_by_name: userEmail,
        text: getBlankSignatureImage(),
        time: getNowForTC()
      }
    ]
  };

  try {
    const response = await fetch(tcUrl.toString(), {
      method: "POST",
      headers: tcHeaders,
      body: JSON.stringify(payload)
    });

    const text = await response.text();

    let data;

    try {
      data = JSON.parse(text);
    } catch (e) {
      data = {
        raw: text.slice(0, 1000)
      };
    }

    return {
      ok: response.ok,
      status: response.status,
      classroomId,
      childId: String(childId),
      action,
      tcResponse: data
    };
  } catch (e) {
    return {
      ok: false,
      status: 500,
      error: e.message,
      classroomId,
      childId: String(childId),
      action
    };
  }
}
function getManifest(origin) {
  return {
    name: "MAC Parent Portal",
    short_name: "MAC Portal",
    start_url: origin + "/",
    scope: origin + "/",
    display: "standalone",
    background_color: "#10069F",
    theme_color: "#10069F",
    description: "Montessori Academy of Colorado Parent Portal",
    icons: [
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='192' height='192'%3E%3Crect width='192' height='192' fill='%2310069F'/%3E%3Ctext x='96' y='112' font-size='56' text-anchor='middle' fill='%23F7D987' font-family='Arial'%3EMAC%3C/text%3E%3C/svg%3E",
        sizes: "192x192",
        type: "image/svg+xml"
      },
      {
        src: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='512' height='512'%3E%3Crect width='512' height='512' fill='%2310069F'/%3E%3Ctext x='256' y='296' font-size='140' text-anchor='middle' fill='%23F7D987' font-family='Arial'%3EMAC%3C/text%3E%3C/svg%3E",
        sizes: "512x512",
        type: "image/svg+xml"
      }
    ]
  };
}

function getServiceWorker() {
  return `
self.addEventListener("install", function(event) {
  self.skipWaiting();
});

self.addEventListener("activate", function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", function(event) {
  event.respondWith(fetch(event.request));
});
`;
}

function escapeHtml(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderNotAdminHtml(email) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Admin Access Denied</title>
<style>
body { font-family: Arial, sans-serif; background: #F5F5FA; color: #10069F; padding: 30px; }
.card { background: #fff; border-radius: 14px; padding: 24px; max-width: 560px; margin: 0 auto; border: 1px solid #DDE0F5; }
h1 { margin-bottom: 8px; }
p { color: #555; line-height: 1.5; }
a { color: #10069F; font-weight: bold; }
</style>
</head>
<body>
<div class="card">
  <h1>Admin Access Denied</h1>
  <p>You are signed in as <strong>${escapeHtml(email)}</strong>, but this account is not listed as an admin.</p>
  <p>Sign out and sign back in with <strong>jennine@tmaoc.com</strong>.</p>
  <p><a href="/cdn-cgi/access/logout">Sign out</a></p>
</div>
</body>
</html>`;
}

function renderAdminHtml(email) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAC Portal Admin</title>
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue: #10069F;
  --gold: #F7D987;
  --bg: #F5F5FA;
  --card: #ffffff;
  --muted: #6B6BA8;
  --border: #DDE0F5;
  --red: #D94F3D;
  --green: #2E9E6F;
}

body {
  font-family: 'Nunito', sans-serif;
  background: var(--bg);
  color: #0D0B5C;
  min-height: 100vh;
}

.header {
  background: var(--blue);
  color: var(--gold);
  padding: 18px 20px;
}

.header h1 {
  font-family: 'Cormorant Garamond', serif;
  font-size: 24px;
}

.header p {
  color: rgba(247,217,135,.75);
  font-size: 12px;
  margin-top: 3px;
}

.main {
  max-width: 850px;
  margin: 0 auto;
  padding: 20px;
}

.card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 18px;
  margin-bottom: 18px;
}

.card h2 {
  font-family: 'Cormorant Garamond', serif;
  color: var(--blue);
  margin-bottom: 10px;
}

.grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
}

input, select {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border);
  border-radius: 8px;
  font-family: 'Nunito', sans-serif;
  font-size: 14px;
}

label {
  font-size: 12px;
  font-weight: 700;
  color: var(--muted);
  margin-bottom: 4px;
  display: block;
}

button {
  border: none;
  background: var(--blue);
  color: var(--gold);
  padding: 10px 14px;
  border-radius: 100px;
  font-family: 'Nunito', sans-serif;
  font-weight: 700;
  cursor: pointer;
}

button.delete {
  background: #fff;
  color: var(--red);
  border: 1px solid rgba(217,79,61,.35);
}

.item {
  border: 1px solid var(--border);
  border-radius: 12px;
  padding: 12px;
  margin-bottom: 8px;
  display: flex;
  gap: 12px;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-weight: 700;
  color: var(--blue);
}

.item-meta {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.notice {
  display: none;
  padding: 12px;
  border-radius: 10px;
  margin-bottom: 15px;
  font-size: 13px;
}

.notice.success {
  display: block;
  background: rgba(46,158,111,.08);
  color: var(--green);
  border: 1px solid rgba(46,158,111,.25);
}

.notice.error {
  display: block;
  background: rgba(217,79,61,.08);
  color: var(--red);
  border: 1px solid rgba(217,79,61,.25);
}

.links {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  margin-top: 12px;
}

.links a {
  color: var(--blue);
  font-weight: 700;
  font-size: 13px;
}

@media (min-width: 700px) {
  .grid.two { grid-template-columns: 1fr 1fr; }
  .grid.three { grid-template-columns: 1fr 1fr 1fr; }
}
</style>
</head>
<body>
<div class="header">
  <h1>MAC Portal Admin</h1>
  <p>Signed in as ${escapeHtml(email)}</p>
</div>

<div class="main">
  <div id="admin-notice" class="notice"></div>

  <div class="card">
    <h2>Admin Tools</h2>
    <p style="font-size:13px;color:var(--muted);line-height:1.5;">
      Use this page to add or delete Weekly Newsletter links and School Calendar dates.
    </p>
    <div class="links">
      <a href="/">Back to Parent Portal</a>
      <a href="/api/admin/bootstrap" target="_blank" rel="noopener">View Admin JSON</a>
      <a href="/cdn-cgi/access/logout">Sign Out</a>
    </div>
  </div>

  <div class="card">
    <h2>Add Weekly Newsletter</h2>
    <div class="grid">
      <div>
        <label for="newsletter-title">Title</label>
        <input id="newsletter-title" placeholder="MAC News - Week of 6/1/26">
      </div>
      <div class="grid two">
        <div>
          <label for="newsletter-date">Date</label>
          <input id="newsletter-date" type="date">
        </div>
        <div>
          <label for="newsletter-url">Link</label>
          <input id="newsletter-url" placeholder="https://...">
        </div>
      </div>
      <button onclick="addNewsletter()">Add Newsletter</button>
    </div>
  </div>

  <div class="card">
    <h2>Newsletter Archives</h2>
    <div id="newsletter-admin-list">
      <p class="item-meta">Loading...</p>
    </div>
  </div>

  <div class="card">
    <h2>Add Calendar Event</h2>
    <div class="grid">
      <div>
        <label for="calendar-title">Title</label>
        <input id="calendar-title" placeholder="Professional Learning Day - No School">
      </div>
      <div class="grid three">
        <div>
          <label for="calendar-date">Start Date</label>
          <input id="calendar-date" type="date">
        </div>
        <div>
          <label for="calendar-end-date">End Date, optional</label>
          <input id="calendar-end-date" type="date">
        </div>
        <div>
          <label for="calendar-type">Type</label>
          <select id="calendar-type">
            <option value="calendar">Calendar</option>
            <option value="event">Event</option>
            <option value="break">Break</option>
            <option value="professional_learning">Professional Learning</option>
            <option value="holiday">Holiday</option>
            <option value="half_day">Early Dismissal</option>
            <option value="milestone">First / Last Day</option>
          </select>
        </div>
      </div>
      <button onclick="addCalendarEvent()">Add Calendar Event</button>
    </div>
  </div>

  <div class="card">
    <h2>Calendar Dates</h2>
    <div id="calendar-admin-list">
      <p class="item-meta">Loading...</p>
    </div>
  </div>

  <div class="card">
    <h2>Future Admins</h2>
    <p style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;">
      This tool is ready for additional admins later. Add only trusted school staff.
    </p>
    <div class="grid two">
      <div>
        <label for="admin-email">Admin Email</label>
        <input id="admin-email" placeholder="name@tmaoc.com">
      </div>
      <div style="display:flex;align-items:end;">
        <button onclick="addAdmin()">Add Admin</button>
      </div>
    </div>
    <div id="admin-list" style="margin-top:12px;"></div>
  </div>
</div>

<script>
var adminState = {
  newsletters: [],
  calendar: [],
  admins: []
};

function adminFetch(path, options) {
  return fetch(path, Object.assign({
    credentials: 'include'
  }, options || {}));
}

function showNotice(message, type) {
  var el = document.getElementById('admin-notice');
  el.className = 'notice ' + (type || 'success');
  el.textContent = message;
}

function loadAdmin() {
  adminFetch('/api/admin/bootstrap')
    .then(function(r) {
      if (!r.ok) throw new Error('Admin bootstrap failed: ' + r.status);
      return r.json();
    })
    .then(function(data) {
      adminState.newsletters = data.newsletters || [];
      adminState.calendar = data.calendar || [];
      adminState.admins = data.admins || [];
      renderAdminLists();
    })
    .catch(function(e) {
      showNotice(e.message, 'error');
    });
}

function addNewsletter() {
  var title = document.getElementById('newsletter-title').value.trim();
  var date = document.getElementById('newsletter-date').value.trim();
  var url = document.getElementById('newsletter-url').value.trim();

  adminFetch('/api/admin/newsletters/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: title, date: date, url: url })
  })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok || !data.ok) throw new Error(data.error || 'Could not add newsletter.');
        return data;
      });
    })
    .then(function(data) {
      adminState.newsletters = data.newsletters || [];
      document.getElementById('newsletter-title').value = '';
      document.getElementById('newsletter-date').value = '';
      document.getElementById('newsletter-url').value = '';
      renderAdminLists();
      showNotice('Newsletter added.', 'success');
    })
    .catch(function(e) {
      showNotice(e.message, 'error');
    });
}

function deleteNewsletter(id) {
  if (!confirm('Delete this newsletter?')) return;

  adminFetch('/api/admin/newsletters/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok || !data.ok) throw new Error(data.error || 'Could not delete newsletter.');
        return data;
      });
    })
    .then(function(data) {
      adminState.newsletters = data.newsletters || [];
      renderAdminLists();
      showNotice('Newsletter deleted.', 'success');
    })
    .catch(function(e) {
      showNotice(e.message, 'error');
    });
}

function addCalendarEvent() {
  var title = document.getElementById('calendar-title').value.trim();
  var date = document.getElementById('calendar-date').value.trim();
  var endDate = document.getElementById('calendar-end-date').value.trim();
  var type = document.getElementById('calendar-type').value.trim();

  adminFetch('/api/admin/calendar/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: title,
      date: date,
      endDate: endDate,
      type: type
    })
  })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok || !data.ok) throw new Error(data.error || 'Could not add calendar event.');
        return data;
      });
    })
    .then(function(data) {
      adminState.calendar = data.calendar || [];
      document.getElementById('calendar-title').value = '';
      document.getElementById('calendar-date').value = '';
      document.getElementById('calendar-end-date').value = '';
      document.getElementById('calendar-type').value = 'calendar';
      renderAdminLists();
      showNotice('Calendar event added.', 'success');
    })
    .catch(function(e) {
      showNotice(e.message, 'error');
    });
}

function deleteCalendarEvent(id) {
  if (!confirm('Delete this calendar event?')) return;

  adminFetch('/api/admin/calendar/delete', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: id })
  })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok || !data.ok) throw new Error(data.error || 'Could not delete calendar event.');
        return data;
      });
    })
    .then(function(data) {
      adminState.calendar = data.calendar || [];
      renderAdminLists();
      showNotice('Calendar event deleted.', 'success');
    })
    .catch(function(e) {
      showNotice(e.message, 'error');
    });
}

function addAdmin() {
  var email = document.getElementById('admin-email').value.trim();

  adminFetch('/api/admin/admins/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok || !data.ok) throw new Error(data.error || 'Could not add admin.');
        return data;
      });
    })
    .then(function(data) {
      adminState.admins = data.admins || [];
      document.getElementById('admin-email').value = '';
      renderAdminLists();
      showNotice('Admin added.', 'success');
    })
    .catch(function(e) {
      showNotice(e.message, 'error');
    });
}

function renderAdminLists() {
  renderNewsletterAdminList();
  renderCalendarAdminList();
  renderAdminEmailList();
}

function renderNewsletterAdminList() {
  var el = document.getElementById('newsletter-admin-list');

  if (!adminState.newsletters.length) {
    el.innerHTML = '<p class="item-meta">No newsletters yet.</p>';
    return;
  }

  var html = '';

  adminState.newsletters.forEach(function(item) {
    html +=
      '<div class="item">' +
        '<div>' +
          '<div class="item-title">' + escapeHtml(item.title || 'Newsletter') + '</div>' +
          '<div class="item-meta">' + escapeHtml(item.date || '') + '</div>' +
          '<div class="item-meta">' + escapeHtml(item.url || '') + '</div>' +
        '</div>' +
        '<button class="delete" onclick="deleteNewsletter(\\'' + escapeJs(item.id) + '\\')">Delete</button>' +
      '</div>';
  });

  el.innerHTML = html;
}

function renderCalendarAdminList() {
  var el = document.getElementById('calendar-admin-list');

  if (!adminState.calendar.length) {
    el.innerHTML = '<p class="item-meta">No calendar events yet.</p>';
    return;
  }

  var html = '';

  adminState.calendar.forEach(function(item) {
    html +=
      '<div class="item">' +
        '<div>' +
          '<div class="item-title">' + escapeHtml(item.title || 'Calendar Event') + '</div>' +
          '<div class="item-meta">' +
            escapeHtml(item.date || '') +
            (item.endDate ? ' - ' + escapeHtml(item.endDate) : '') +
            ' · ' +
            escapeHtml(item.type || 'calendar') +
          '</div>' +
        '</div>' +
        '<button class="delete" onclick="deleteCalendarEvent(\\'' + escapeJs(item.id) + '\\')">Delete</button>' +
      '</div>';
  });

  el.innerHTML = html;
}

function renderAdminEmailList() {
  var el = document.getElementById('admin-list');

  if (!adminState.admins.length) {
    el.innerHTML = '<p class="item-meta">No admins found.</p>';
    return;
  }

  var html = '';

  adminState.admins.forEach(function(email) {
    html +=
      '<div class="item">' +
        '<div>' +
          '<div class="item-title">' + escapeHtml(email) + '</div>' +
          '<div class="item-meta">Admin access</div>' +
        '</div>' +
      '</div>';
  });

  el.innerHTML = html;
}

function escapeJs(value) {
  return String(value || '').replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

loadAdmin();
</script>
</body>
</html>`;
}

function renderPortalHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAC Parent Portal</title>
<link rel="manifest" href="/manifest.json">
<meta name="theme-color" content="#10069F">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MAC Portal">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">

<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;600;700&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

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
  --purple: #8787C0;
  --orange: #F79778;
  --yellow: #FCB63A;
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

.panel { display: none; }
.panel.active { display: block; }

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

.today-card {
  background: var(--card);
  border-radius: 16px;
  padding: 22px;
  border: 1px solid var(--border);
  margin-bottom: 20px;
  text-align: center;
}

.today-label {
  font-size: 11px;
  color: var(--muted);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  margin-bottom: 8px;
}

.today-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 54px;
  font-weight: 700;
  line-height: 1;
  color: var(--green);
}

.today-status {
  font-size: 14px;
  font-weight: 700;
  color: var(--blue);
  margin-top: 8px;
}

.today-sub {
  font-size: 12px;
  color: var(--muted);
  margin-top: 4px;
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
  padding: 10px 18px;
  font-weight: 700;
  font-size: 13px;
  color: var(--blue);
  cursor: pointer;
  font-family: 'Nunito', sans-serif;
  white-space: nowrap;
  width: 100%;
  margin-bottom: 10px;
}

.action-btn.secondary {
  background: #ffffff;
