// Full replacement src/index.js
// Includes all features + FIXED announcements (school-wide only)

const DEFAULT_ADMIN_EMAILS = ["jennine@tmaoc.com"];

const MAC_LOGO_URL = "https://lh3.googleusercontent.com/7wwzlYn_OliJT22N6XMulkSQchslXrHJtN-AHEoO-jkDNkrBm-VrE32yI7pxQ9V88GWyw4WNZB-4KDQR=w1045";

const EMERGENCY_PROGRAM_CHANGE_RECIPIENT = "montessoriacademy@tmaoc.com";

const BILLING_NOTICE_TEXT = [
  "$30/day to add Before School, 7:30\u20138:15",
  "$30/day to add 4:30 pick-up, 3:15\u20134:30",
  "$60/day to add 5:30 pick-up, 3:15\u20135:30",
  "$30/day if already a 4:30 pick-up"
].join("\n");

const ATTENDANCE_REPORT_OPTIONS = {
  sick: { label: "Sick Today", value: "20148", message: "reported sick today" },
  vacation: { label: "Vacation / Out Today", value: "20150", message: "reported out today" },
  late: { label: "Arriving Late", value: "20151", message: "reported arriving late" }
};

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
  { id: "cal-2027-02-15", date: "2027-02-15", endDate: "", type: "holiday", title: "Presidents\' Day - No School" },
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
  { id: "news-2026-05-26", date: "2026-05-26", title: "MAC News - Week of 5/26/26", url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/1970e57d-adb1-4be2-887d-b9b82eed4eaa" },
  { id: "news-2026-05-18", date: "2026-05-18", title: "MAC News - Week of 5/18/26", url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/9a5cc677-905a-41c5-8d54-2fc5be24baa9" },
  { id: "news-2026-05-11", date: "2026-05-11", title: "MAC News - Week of 5/11/26", url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8f5636d5-25ac-4887-851e-08a8c2f09605" },
  { id: "news-2026-05-04", date: "2026-05-04", title: "MAC News - Week of 5/4/26", url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/92ce53d6-636a-4cc6-8ab9-220175fab6a6" },
  { id: "news-2026-04-27", date: "2026-04-27", title: "MAC News - Week of 4/27/26", url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8c596259-8f98-411f-868a-c2c5011ba615" },
  { id: "news-2026-04-20", date: "2026-04-20", title: "MAC News - Week of 4/20/26", url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8fecde96-a16f-45ca-be64-1b0fa10fd1ef" }
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

    if (path === "/manifest.json") return jsonResponse(getManifest(url.origin));

    if (path === "/service-worker.js") {
      return new Response(getServiceWorker(), {
        status: 200,
        headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-cache" }
      });
    }

    if (path === "/api/login") return Response.redirect(url.origin + "/?signed_in=1", 302);

    if (path === "/admin") {
      if (!userEmail) return jsonResponse({ error: "Not signed in through Cloudflare Access" }, 401);
      const isAdmin = await isAdminEmail(env, userEmail);
      if (!isAdmin) return new Response(renderNotAdminHtml(userEmail), { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } });
      return new Response(renderAdminHtml(userEmail), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    if (path === "/api") {
      return jsonResponse({
        status: "api running",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        hasGoogleSheetWebhook: Boolean(env.GOOGLE_SHEET_WEBHOOK_URL),
        signedInEmail: userEmail || null,
        classroomIds,
        routes: ["/api/login","/api/permission-test","/api/children","/api/activity?child_id=CHILD_ID","/api/attendance-summary?child_id=CHILD_ID","/api/attendance-action","/api/attendance-report","/api/emergency-program-change","/api/announcements","/api/announcements-raw","/api/posts-raw","/api/newsletters","/api/calendar","/admin","/manifest.json","/service-worker.js"]
      });
    }

    if (path === "/api/calendar") {
      const events = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
      return jsonResponse({ count: events.length, events: sortCalendarByDate(events) });
    }

    if (path === "/api/newsletters") {
      const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);
      return jsonResponse({ count: newsletters.length, newsletters: sortByDate(newsletters) });
    }

    if (path.startsWith("/api/admin/")) {
      if (!env.PARENT_PERMISSIONS) return jsonResponse({ error: "Missing KV binding: PARENT_PERMISSIONS" }, 500);
      if (!userEmail) return jsonResponse({ error: "Not signed in through Cloudflare Access" }, 401);
      const isAdmin = await isAdminEmail(env, userEmail);
      if (!isAdmin) return jsonResponse({ error: "Admin access denied", signedInEmail: userEmail }, 403);

      if (path === "/api/admin/bootstrap") {
        const admins = await getStoredArray(env, "ADMIN_EMAILS", DEFAULT_ADMIN_EMAILS);
        const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);
        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
        return jsonResponse({ ok: true, signedInEmail: userEmail, admins, newsletters: sortByDate(newsletters), calendar: sortCalendarByDate(calendar) });
      }

      if (path === "/api/admin/newsletters/add") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const date = String(body.date || "").trim();
        const title = String(body.title || "").trim();
        const link = String(body.url || body.link || "").trim();
        if (!date || !title || !link) return jsonResponse({ error: "Missing date, title, or URL" }, 400);
        const newsletters = await getStoredArray(env, "NEWSLETTER_ARCHIVES", DEFAULT_NEWSLETTER_ARCHIVES);
        newsletters.push({ id: "news-" + date + "-" + Date.now(), date, title, url: link });
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
        const updated = newsletters.filter(function(item) { return String(item.id) !== id; });
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
        if (!date || !title) return jsonResponse({ error: "Missing date or title" }, 400);
        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
        calendar.push({ id: "cal-" + date + "-" + Date.now(), date, endDate, type, title });
        const sorted = sortCalendarByDate(calendar);
        await putStoredArray(env, "CALENDAR_EVENTS", sorted);
        return jsonResponse({ ok: true, calendar: sorted });
      }

      if (path === "/api/admin/calendar/delete") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const id = String(body.id || "").trim();
        if (!id) return jsonResponse({ error: "Missing id" }, 400);
        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
        const sorted = sortCalendarByDate(calendar.filter(function(item) { return String(item.id) !== id; }));
        await putStoredArray(env, "CALENDAR_EVENTS", sorted);
        return jsonResponse({ ok: true, calendar: sorted });
      }

      if (path === "/api/admin/admins/add") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const email = String(body.email || "").toLowerCase().trim();
        if (!email || !email.includes("@")) return jsonResponse({ error: "Missing valid email" }, 400);
        const admins = await getStoredArray(env, "ADMIN_EMAILS", DEFAULT_ADMIN_EMAILS);
        const updated = Array.from(new Set(admins.concat([email])));
        await putStoredArray(env, "ADMIN_EMAILS", updated);
        return jsonResponse({ ok: true, admins: updated });
      }

      return jsonResponse({ error: "Admin route not found" }, 404);
    }

    if (path.startsWith("/api/")) {
      if (!token || !schoolId) return jsonResponse({ error: "Missing Cloudflare secrets", hasToken: Boolean(token), hasSchoolId: Boolean(schoolId) }, 500);
      if (!env.PARENT_PERMISSIONS) return jsonResponse({ error: "Missing KV binding: PARENT_PERMISSIONS" }, 500);

      const tcHeaders = {
        "X-TransparentClassroomToken": token,
        "X-TransparentClassroomSchoolId": schoolId,
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

      if (path === "/api/permission-test") {
        if (!userEmail) return jsonResponse({ error: "No signed-in email found." }, 401);
        const allowed = await getAllowedChildren(env, userEmail);
        return jsonResponse({ signedInEmail: userEmail, allowedChildren: allowed });
      }

      if (!userEmail) return jsonResponse({ error: "Not signed in through Cloudflare Access" }, 401);
      const allowedChildren = await getAllowedChildren(env, userEmail);
      if (!allowedChildren) return jsonResponse({ error: "This email does not have permission to view children", email: userEmail }, 403);

      if (path === "/api/children") {
        const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });
        if (!childrenResult.ok) return jsonResponse({ error: "Could not load children from Transparent Classroom" }, childrenResult.status);
        const filteredChildren = filterChildrenForUser(childrenResult.children, allowedChildren);
        return jsonResponse(filteredChildren.map(sanitizeChildForPortal));
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
  const selectedChildId = url.searchParams.get("child_id");
  let visibleClassroomIds = new Set();

  if (selectedChildId) {
    if (!canAccessChild(selectedChildId, allowedChildren)) {
      return jsonResponse({ error: "No permission for this child", childId: selectedChildId }, 403);
    }
    const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });
    if (childrenResult.ok) {
      const child = childrenResult.children.find(function(c) { return String(c.id) === String(selectedChildId); });
      if (child) {
        const ids = [child.classroom_id, child.classroomId, child.current_classroom_id, child.currentClassroomId, child.primary_classroom_id, child.primaryClassroomId];
        ids.forEach(function(id) { if (id) visibleClassroomIds.add(String(id)); });
        if (Array.isArray(child.classroom_ids)) child.classroom_ids.forEach(function(id) { if (id) visibleClassroomIds.add(String(id)); });
      }
    }
  }

  const announcementsResult = await fetchAnnouncementsFromTC({ schoolId, tcHeaders, visibleClassroomIds });
  return jsonResponse(announcementsResult, announcementsResult.ok ? 200 : announcementsResult.status || 500);
}

      if (path === "/api/activity" || path === "/api/activity-raw") {
        const childId = url.searchParams.get("child_id");
        let dateStart = url.searchParams.get("date_start");
        if (!dateStart) { const d = new Date(); d.setDate(d.getDate() - 90); dateStart = d.toISOString().split("T")[0]; }
        if (!childId) return jsonResponse({ error: "Missing child_id" }, 400);
        if (!canAccessChild(childId, allowedChildren)) return jsonResponse({ error: "No permission", email: userEmail, childId }, 403);
        const tcUrl = new URL(apiBaseUrl + "/activity.json");
        tcUrl.searchParams.set("child_id", childId);
        tcUrl.searchParams.set("date_start", dateStart);
        tcUrl.searchParams.set("school_id", schoolId);
        tcUrl.searchParams.set("include", "photos,notes,observations,lessons,attachments,media");
        tcUrl.searchParams.set("with", "photos,attachments,media");
        tcUrl.searchParams.set("photo_size", "large");
        tcUrl.searchParams.set("image_size", "large");
        tcUrl.searchParams.set("per_page", "100");
        const response = await fetch(tcUrl.toString(), { method: "GET", headers: tcHeaders });
        const body = await response.text();
        return new Response(body, { status: response.status, headers: { "Content-Type": "application/json" } });
      }

      if (path === "/api/tc-events-raw") {
        const day = url.searchParams.get("day") || getTodayDate();
        const allEvents = await fetchAttendanceEventsForAllClassrooms({ schoolId, classroomIds, day, tcHeaders });
        return jsonResponse({ day, classroomIds, count: allEvents.length, events: allEvents });
      }

      if (path === "/api/attendance-summary") {
        const childId = url.searchParams.get("child_id");
        const day = url.searchParams.get("day") || getTodayDate();
        if (!childId) return jsonResponse({ error: "Missing child_id" }, 400);
        if (!canAccessChild(childId, allowedChildren)) return jsonResponse({ error: "No permission", email: userEmail, childId }, 403);
        const allEvents = await fetchAttendanceEventsForAllClassrooms({ schoolId, classroomIds, day, tcHeaders });
        return jsonResponse(summarizeTodayAttendanceForChild(allEvents, childId, day));
      }

      if (path === "/api/attendance-action") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const childId = String(body.child_id || body.childId || "").trim();
        const action = String(body.action || "").trim();
        if (!childId) return jsonResponse({ error: "Missing child_id" }, 400);
        if (!["dropoff", "pickup"].includes(action)) return jsonResponse({ error: "Invalid action" }, 400);
        if (!canAccessChild(childId, allowedChildren)) return jsonResponse({ error: "No permission", email: userEmail, childId }, 403);
        let classroomId = String(body.classroom_id || body.classroomId || "").trim();
        if (classroomId && !classroomIds.includes(classroomId)) return jsonResponse({ error: "Invalid classroom_id" }, 400);
        if (!classroomId) classroomId = await findClassroomIdForChild({ schoolId, classroomIds, childId, tcHeaders, apiBaseUrl });
        if (!classroomId) return jsonResponse({ error: "Could not determine classroom for this child." }, 400);
        const result = await sendAttendanceActionToTC({ schoolId, classroomId, childId, action, userEmail, tcHeaders });
        return jsonResponse(result, result.ok ? 200 : result.status || 500);
      }

      if (path === "/api/attendance-report") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const childId = String(body.child_id || body.childId || "").trim();
        const reportType = String(body.reportType || body.type || "").trim();
        if (!childId) return jsonResponse({ error: "Missing child_id" }, 400);
        if (!canAccessChild(childId, allowedChildren)) return jsonResponse({ error: "No permission", email: userEmail, childId }, 403);
        const reportOption = ATTENDANCE_REPORT_OPTIONS[reportType];
        if (!reportOption) return jsonResponse({ error: "Invalid report type" }, 400);
        let classroomId = String(body.classroom_id || body.classroomId || "").trim();
        if (classroomId && !classroomIds.includes(classroomId)) return jsonResponse({ error: "Invalid classroom_id" }, 400);
        if (!classroomId) classroomId = await findClassroomIdForChild({ schoolId, classroomIds, childId, tcHeaders, apiBaseUrl });
        if (!classroomId) return jsonResponse({ error: "Could not determine classroom." }, 400);
        const result = await sendAttendanceReportToTC({ schoolId, classroomId, childId, reportType, reportOption, userEmail, tcHeaders });
        return jsonResponse(result, result.ok ? 200 : result.status || 500);
      }

      if (path === "/api/emergency-program-change") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        if (!env.GOOGLE_SHEET_WEBHOOK_URL) return jsonResponse({ error: "Missing GOOGLE_SHEET_WEBHOOK_URL" }, 500);
        const body = await safeJson(request);
        const childId = String(body.child_id || body.childId || "").trim();
        if (!childId) return jsonResponse({ error: "Missing child_id" }, 400);
        if (!canAccessChild(childId, allowedChildren)) return jsonResponse({ error: "No permission", email: userEmail, childId }, 403);
        const requiredFields = ["studentName","studentClassroom","personRequestingChange","dateOfRequest","dateOfEmergencyProgramChange","dropOffOrPickUpTime","regularProgramHours"];
        const missingFields = requiredFields.filter(function(field) { return !String(body[field] || "").trim(); });
        if (missingFields.length) return jsonResponse({ error: "Missing required fields", missingFields }, 400);
        const submission = {
          studentName: String(body.studentName || "").trim(),
          studentClassroom: String(body.studentClassroom || "").trim(),
          personRequestingChange: String(body.personRequestingChange || "").trim(),
          dateOfRequest: String(body.dateOfRequest || "").trim(),
          dateOfEmergencyProgramChange: String(body.dateOfEmergencyProgramChange || "").trim(),
          dropOffOrPickUpTime: String(body.dropOffOrPickUpTime || "").trim(),
          regularProgramHours: String(body.regularProgramHours || "").trim(),
          billingNotice: BILLING_NOTICE_TEXT,
          parentEmail: userEmail,
          childId: childId,
          submittedAt: new Date().toISOString()
        };
        const sheetResult = await sendEmergencyProgramChangeToGoogleSheet({ webhookUrl: env.GOOGLE_SHEET_WEBHOOK_URL, submission });
        return jsonResponse(sheetResult, sheetResult.ok ? 200 : sheetResult.status || 500);
      }

      return jsonResponse({ error: "Route not found" }, 404);
    }

    return new Response(renderPortalHtml(), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};
function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

async function safeJson(request) {
  try { return await request.json(); } catch (e) { return {}; }
}

function getUserEmail(request) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  return email ? email.toLowerCase().trim() : null;
}

async function getStoredArray(env, key, fallback) {
  if (!env.PARENT_PERMISSIONS) return fallback;
  const raw = await env.PARENT_PERMISSIONS.get(key);
  if (!raw) return fallback;
  try { const parsed = JSON.parse(raw); return Array.isArray(parsed) ? parsed : fallback; } catch (e) { return fallback; }
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

function sortCalendarByDate(items) {
  return items.slice().sort(function(a, b) {
    const aTime = new Date(a.date || "").getTime();
    const bTime = new Date(b.date || "").getTime();
    if (isNaN(aTime) && isNaN(bTime)) return 0;
    if (isNaN(aTime)) return 1;
    if (isNaN(bTime)) return -1;
    return aTime - bTime;
  });
}

async function isAdminEmail(env, email) {
  const admins = await getStoredArray(env, "ADMIN_EMAILS", DEFAULT_ADMIN_EMAILS);
  return admins.map(function(item) { return String(item).toLowerCase().trim(); }).includes(String(email).toLowerCase().trim());
}

async function getAllowedChildren(env, email) {
  const value = await env.PARENT_PERMISSIONS.get(email.toLowerCase().trim());
  if (!value) return null;
  if (value === "*") return "*";
  try { return JSON.parse(value).map(String); } catch (e) { return null; }
}

async function fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders }) {
  const tcUrl = new URL(apiBaseUrl + "/children.json");
  tcUrl.searchParams.set("school_id", schoolId);
  const response = await fetch(tcUrl.toString(), { method: "GET", headers: tcHeaders });
  const data = await response.json();
  if (!response.ok) return { ok: false, status: response.status, data, children: [] };
  return { ok: true, status: response.status, data, children: normalizeChildren(data) };
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
  return children.filter(function(child) { return allowedSet.has(String(child.id)); });
}

function sanitizeChildForPortal(child) {
  const classroomIds = Array.isArray(child.classroom_ids)
    ? child.classroom_ids
    : Array.isArray(child.classrooms)
      ? child.classrooms.map(function(c) { return c && c.id; }).filter(Boolean)
      : [];
  const singleClassroomId =
    child.classroom_id || child.classroomId || child.current_classroom_id || child.currentClassroomId ||
    child.primary_classroom_id || child.primaryClassroomId || (child.classroom && child.classroom.id) ||
    classroomIds[0] || "";
  return {
    id: child.id,
    first_name: child.first_name || child.firstName || "",
    last_name: child.last_name || child.lastName || "",
    profile_photo: child.profile_photo || child.profilePhoto || "",
    classroom_id: singleClassroomId,
    classroom_ids: classroomIds
  };
}

function canAccessChild(childId, allowedChildren) {
  if (allowedChildren === "*") return true;
  return allowedChildren.map(String).includes(String(childId));
}

function getClassroomIds(env) {
  const raw = env.TC_CLASSROOM_IDS || "2386,2412,2413,2415,2387,2388,2389,7737,7738,2410,2411,1313,14759,2414,1312,1577";
  return raw.split(",").map(function(id) { return id.trim(); }).filter(Boolean).filter(function(v, i, a) { return a.indexOf(v) === i; });
}

function getTodayDate() { return new Date().toISOString().split("T")[0]; }
function getNowForTC() { return new Date().toISOString(); }
function getBlankSignatureImage() {
  return "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAFgwJ/lO+vWwAAAABJRU5ErkJggg==";
}

async function fetchAnnouncementsRawFromTC({ schoolId, tcHeaders }) {
  const baseUrl = new URL("https://www.transparentclassroom.com/s/" + encodeURIComponent(schoolId) + "/frontend/announcements.json");
  const pages = [];
  const seenIds = new Set();
  let next = "";
  let safety = 0;
  while (safety < 8) {
    safety++;
    const pageUrl = new URL(baseUrl.toString());
    if (next) pageUrl.searchParams.set("page", next);
    const response = await fetch(pageUrl.toString(), { method: "GET", headers: tcHeaders });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (e) {
      return { ok: false, status: response.status, error: "Could not parse announcements response", pages };
    }
    const items = Array.isArray(data.data) ? data.data : Array.isArray(data) ? data : [];
    const uniqueItems = [];
    items.forEach(function(item) {
      const a = item && item.data ? item.data : item || {};
      const id = String(a.id || "");
      if (id && !seenIds.has(id)) { seenIds.add(id); uniqueItems.push(item); }
    });
    pages.push({ status: response.status, requestUrl: pageUrl.toString(), dataCount: items.length, uniqueAdded: uniqueItems.length, pagination: data.pagination || null, sample: uniqueItems });
    if (!response.ok) return { ok: false, status: response.status, pages };
    next = data && data.pagination && data.pagination.next ? data.pagination.next : "";
    if (!next || uniqueItems.length === 0) break;
  }
  return { ok: true, pageCount: pages.length, uniqueCount: seenIds.size, pages };
}

async function fetchRecentPostsRawFromTC({ schoolId, tcHeaders }) {
  const pages = [];
  let page = 1;
  let safety = 0;
  while (safety < 5) {
    safety++;
    const url = new URL("https://www.transparentclassroom.com/s/" + encodeURIComponent(schoolId) + "/posts/recent.json");
    url.searchParams.set("locale", "en");
    url.searchParams.set("page", String(page));
    const response = await fetch(url.toString(), { method: "GET", headers: tcHeaders });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (e) {
      return { ok: false, status: response.status, error: "Could not parse recent posts response", pages };
    }
    const items = Array.isArray(data) ? data : Array.isArray(data.posts) ? data.posts : Array.isArray(data.data) ? data.data : [];
    pages.push({ status: response.status, requestUrl: url.toString(), dataCount: items.length, items, sample: items.slice(0, 5) });
    if (!response.ok || items.length === 0) break;
    page++;
  }
  return { ok: true, pageCount: pages.length, totalCount: pages.reduce(function(t, p) { return t + (p.dataCount || 0); }, 0), pages };
}

async function fetchAnnouncementsFromTC({ schoolId, tcHeaders, visibleClassroomIds }) {
  visibleClassroomIds = visibleClassroomIds || new Set();
  const rawResult = await fetchAnnouncementsRawFromTC({ schoolId, tcHeaders });
  const allItems = [];
  if (rawResult.ok) {
    rawResult.pages.forEach(function(page) {
      if (page.sample && Array.isArray(page.sample)) {
        page.sample.forEach(function(item) { allItems.push(item); });
      }
    });
  }
  const normalized = normalizeAnnouncements(allItems);
  const visible = normalized.filter(function(a) {
    const type = String(a.subjectType || "").trim().toLowerCase();
    const id = String(a.subjectId || "").trim();
    if (type === "school") return true;
    if (type === "classroom" && visibleClassroomIds.has(id)) return true;
    return false;
  });
  visible.sort(function(a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
  return { ok: true, announcementRawCount: allItems.length, count: visible.length, announcements: visible };
}

function normalizeAnnouncements(data) {
  const rawItems = Array.isArray(data) ? data : Array.isArray(data.data) ? data.data : [];
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
  }).sort(function(a, b) { return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(); });
}

function htmlToPlainText(value) {
  return String(value || "")
    .replace(/<br\s*\/?>/ .source ? /<br\s*\/?>/ : /<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n").replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&").replace(/&nbsp;/g, " ").replace(/&quot;/g, '"').replace(/&#039;/g, "'")
    .replace(/\n{3,}/g, "\n\n").trim();
}

async function fetchAttendanceEventsForAllClassrooms({ schoolId, classroomIds, day, tcHeaders }) {
  const requests = classroomIds.map(async function(classroomId) {
    const tcUrl = new URL("https://www.transparentclassroom.com/s/" + encodeURIComponent(schoolId) + "/classrooms/" + encodeURIComponent(classroomId) + "/events.json");
    tcUrl.searchParams.set("day", day);
    try {
      const response = await fetch(tcUrl.toString(), { method: "GET", headers: tcHeaders });
      const text = await response.text();
      if (!response.ok) return [{ error: true, classroom_id: classroomId, status: response.status }];
      let data;
      try { data = JSON.parse(text); } catch (e) { return [{ error: true, classroom_id: classroomId }]; }
      const events = normalizeEvents(data);
      return events.map(function(event) { if (!event.classroom_id && !event.classroomId) event.classroom_id = classroomId; return event; });
    } catch (e) { return [{ error: true, classroom_id: classroomId, message: e.message }]; }
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
  const childEvents = events.filter(function(e) { return String(e.child_id || e.childId || "") === String(childId); });
  const attendanceEvents = childEvents.filter(function(e) { return String(e.event_type || e.eventType || "") === "attendance_state"; }).sort(function(a, b) { return getEventTime(a) - getEventTime(b); });
  const dropoffEvents = childEvents.filter(function(e) { const t = String(e.event_type || e.eventType || ""); return t.includes("dropoff") || t.includes("pickup"); }).sort(function(a, b) { return getEventTime(a) - getEventTime(b); });
  const latestAttendance = attendanceEvents.length ? attendanceEvents[attendanceEvents.length - 1] : null;
  const rawValue = latestAttendance ? String(latestAttendance.value || "") : "";
  const statusInfo = getAttendanceStatus(rawValue);
  let latestDropoff = null, latestPickup = null;
  dropoffEvents.forEach(function(e) { const t = String(e.event_type || e.eventType || ""); if (t === "dropoff") latestDropoff = e; if (t === "pickup") latestPickup = e; });
  return { day, childId: String(childId), todayStatus: statusInfo.label, todayStatusCategory: statusInfo.category, todayAttendanceValue: statusInfo.displayValue, todayRawValue: rawValue || null, attendanceEventsCount: attendanceEvents.length, dropoffEventsCount: dropoffEvents.length, latestAttendance, latestDropoff, latestPickup, note: statusInfo.confirmed ? "" : "Attendance state needs confirmation." };
}

function getEventTime(event) {
  const raw = event.time || event.created_at || event.createdAt || event.updated_at || event.updatedAt || "";
  const parsed = new Date(raw).getTime();
  return isNaN(parsed) ? 0 : parsed;
}

function getAttendanceStatus(value) {
  const map = {
    "20145": { label: "Present", category: "present", displayValue: "P", confirmed: true },
    "20146": { label: "Absent", category: "absent", displayValue: "A", confirmed: true },
    "20148": { label: "Sick / Sent Home", category: "absent", displayValue: "S", confirmed: true },
    "20150": { label: "Vacation", category: "absent", displayValue: "V", confirmed: true },
    "20151": { label: "Tardy", category: "tardy", displayValue: "T", confirmed: true },
    "3685": { label: "Late Pickup", category: "tardy", displayValue: "LP", confirmed: false }
  };
  if (map[value]) return map[value];
  if (!value) return { label: "No Record Today", category: "none", displayValue: "--", confirmed: true };
  return { label: "Unknown", category: "unknown", displayValue: value, confirmed: false };
}

async function findClassroomIdForChild({ schoolId, classroomIds, childId, tcHeaders, apiBaseUrl }) {
  const today = getTodayDate();
  const todayEvents = await fetchAttendanceEventsForAllClassrooms({ schoolId, classroomIds, day: today, tcHeaders });
  const matchingEvent = todayEvents.find(function(e) { return String(e.child_id || e.childId || "") === String(childId); });
  if (matchingEvent) return String(matchingEvent.classroom_id || matchingEvent.classroomId || "");
  try {
    const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });
    if (!childrenResult.ok) return "";
    const child = childrenResult.children.find(function(item) { return String(item.id) === String(childId); });
    if (!child) return "";
    const possible = child.classroom_id || child.classroomId || child.current_classroom_id || child.currentClassroomId || child.primary_classroom_id || child.primaryClassroomId || (child.classroom && child.classroom.id) || (Array.isArray(child.classroom_ids) && child.classroom_ids[0]) || (Array.isArray(child.classrooms) && child.classrooms[0] && child.classrooms[0].id) || "";
    if (possible && classroomIds.includes(String(possible))) return String(possible);
  } catch (e) { return ""; }
  return "";
}

async function sendAttendanceActionToTC({ schoolId, classroomId, childId, action, userEmail, tcHeaders }) {
  const tcUrl = new URL("https://www.transparentclassroom.com/s/" + encodeURIComponent(schoolId) + "/classrooms/" + encodeURIComponent(classroomId) + "/events.json");
  const payload = { event: [{ event_type: action, child_id: Number(childId), created_by_name: userEmail, text: getBlankSignatureImage(), time: getNowForTC() }] };
  return postToTC(tcUrl.toString(), payload, tcHeaders, { classroomId, childId: String(childId), action });
}

async function sendAttendanceReportToTC({ schoolId, classroomId, childId, reportType, reportOption, userEmail, tcHeaders }) {
  const tcUrl = new URL("https://www.transparentclassroom.com/s/" + encodeURIComponent(schoolId) + "/classrooms/" + encodeURIComponent(classroomId) + "/events.json");
  const payload = { event: [{ event_type: "attendance_state", child_id: Number(childId), value: reportOption.value, created_by_name: userEmail, time: getNowForTC() }] };
  return postToTC(tcUrl.toString(), payload, tcHeaders, { classroomId, childId: String(childId), reportType, reportLabel: reportOption.label });
}

async function postToTC(url, payload, tcHeaders, extra) {
  try {
    const response = await fetch(url, { method: "POST", headers: tcHeaders, body: JSON.stringify(payload) });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = { raw: text.slice(0, 1000) }; }
    return Object.assign({ ok: response.ok, status: response.status, tcResponse: data }, extra || {});
  } catch (e) { return Object.assign({ ok: false, status: 500, error: e.message }, extra || {}); }
}

async function sendEmergencyProgramChangeToGoogleSheet({ webhookUrl, submission }) {
  try {
    const response = await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "text/plain;charset=utf-8" }, body: JSON.stringify(submission) });
    const text = await response.text();
    let data;
    try { data = JSON.parse(text); } catch (e) { data = { raw: text.slice(0, 1000) }; }
    if (!response.ok || data.ok === false) return { ok: false, status: response.status, error: data.error || "Google Sheet webhook failed.", googleResponse: data };
    return { ok: true, status: response.status, googleResponse: data };
  } catch (e) { return { ok: false, status: 500, error: e.message }; }
}

function getManifest(origin) {
  return {
    name: "MAC Parent Portal", short_name: "MAC Portal", start_url: origin + "/", scope: origin + "/",
    display: "standalone", background_color: "#10069F", theme_color: "#10069F",
    description: "Montessori Academy of Colorado Parent Portal",
    icons: [{ src: MAC_LOGO_URL, sizes: "144x144", type: "image/png", purpose: "any" }, { src: MAC_LOGO_URL, sizes: "144x144", type: "image/png", purpose: "maskable" }]
  };
}

function getServiceWorker() {
  return "self.addEventListener(\"install\",function(e){self.skipWaiting()});self.addEventListener(\"activate\",function(e){e.waitUntil(self.clients.claim())});self.addEventListener(\"fetch\",function(e){e.respondWith(fetch(e.request))});";
}

function escapeHtml(value) {
  return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
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
:root { --blue:#10069F; --gold:#F7D987; --bg:#F5F5FA; --card:#fff; --muted:#6B6BA8; --border:#DDE0F5; --red:#D94F3D; --green:#2E9E6F; }
body { font-family:'Nunito',sans-serif; background:var(--bg); color:#0D0B5C; min-height:100vh; }
.header { background:var(--blue); color:var(--gold); padding:18px 20px; }
.header h1 { font-family:'Cormorant Garamond',serif; font-size:24px; }
.header p { color:rgba(247,217,135,.75); font-size:12px; margin-top:3px; }
.main { max-width:850px; margin:0 auto; padding:20px; }
.card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:18px; margin-bottom:18px; }
.card h2 { font-family:'Cormorant Garamond',serif; color:var(--blue); margin-bottom:10px; }
.grid { display:grid; grid-template-columns:1fr; gap:10px; }
input, select { width:100%; padding:10px; border:1px solid var(--border); border-radius:8px; font-family:'Nunito',sans-serif; font-size:14px; }
label { font-size:12px; font-weight:700; color:var(--muted); margin-bottom:4px; display:block; }
button { border:none; background:var(--blue); color:var(--gold); padding:10px 14px; border-radius:100px; font-family:'Nunito',sans-serif; font-weight:700; cursor:pointer; }
button.delete { background:#fff; color:var(--red); border:1px solid rgba(217,79,61,.35); }
.item { border:1px solid var(--border); border-radius:12px; padding:12px; margin-bottom:8px; display:flex; gap:12px; justify-content:space-between; align-items:center; }
.item-title { font-weight:700; color:var(--blue); }
.item-meta { font-size:12px; color:var(--muted); margin-top:2px; overflow-wrap:anywhere; }
.notice { display:none; padding:12px; border-radius:10px; margin-bottom:15px; font-size:13px; }
.notice.success { display:block; background:rgba(46,158,111,.08); color:var(--green); border:1px solid rgba(46,158,111,.25); }
.notice.error { display:block; background:rgba(217,79,61,.08); color:var(--red); border:1px solid rgba(217,79,61,.25); }
.links { display:flex; gap:12px; flex-wrap:wrap; margin-top:12px; }
.links a { color:var(--blue); font-weight:700; font-size:13px; }
@media (min-width:700px) { .grid.two { grid-template-columns:1fr 1fr; } .grid.three { grid-template-columns:1fr 1fr 1fr; } }
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
    <p style="font-size:13px;color:var(--muted);line-height:1.5;">Use this page to add or delete Weekly Newsletter links and School Calendar dates.</p>
    <div class="links">
      <a href="/">Back to Parent Portal</a>
      <a href="/api/admin/bootstrap" target="_blank" rel="noopener">View Admin JSON</a>
      <a href="/cdn-cgi/access/logout">Sign Out</a>
    </div>
  </div>
  <div class="card">
    <h2>Add Weekly Newsletter</h2>
    <div class="grid">
      <div><label for="newsletter-title">Title</label><input id="newsletter-title" placeholder="MAC News - Week of 6/1/26"></div>
      <div class="grid two">
        <div><label for="newsletter-date">Date</label><input id="newsletter-date" type="date"></div>
        <div><label for="newsletter-url">Link</label><input id="newsletter-url" placeholder="https://..."></div>
      </div>
      <button onclick="addNewsletter()">Add Newsletter</button>
    </div>
  </div>
  <div class="card">
    <h2>Newsletter Archives</h2>
    <div id="newsletter-admin-list"><p class="item-meta">Loading...</p></div>
  </div>
  <div class="card">
    <h2>Add Calendar Event</h2>
    <div class="grid">
      <div><label for="calendar-title">Title</label><input id="calendar-title" placeholder="Professional Learning Day - No School"></div>
      <div class="grid three">
        <div><label for="calendar-date">Start Date</label><input id="calendar-date" type="date"></div>
        <div><label for="calendar-end-date">End Date, optional</label><input id="calendar-end-date" type="date"></div>
        <div><label for="calendar-type">Type</label>
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
    <div id="calendar-admin-list"><p class="item-meta">Loading...</p></div>
  </div>
  <div class="card">
    <h2>Future Admins</h2>
    <p style="font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;">Add only trusted school staff.</p>
    <div class="grid two">
      <div><label for="admin-email">Admin Email</label><input id="admin-email" placeholder="name@tmaoc.com"></div>
      <div style="display:flex;align-items:end;"><button onclick="addAdmin()">Add Admin</button></div>
    </div>
    <div id="admin-list" style="margin-top:12px;"></div>
  </div>
</div>
<script>
var adminState = { newsletters: [], calendar: [], admins: [] };
function adminFetch(path, options) { return fetch(path, Object.assign({ credentials: 'include' }, options || {})); }
function showNotice(message, type) { var el = document.getElementById('admin-notice'); el.className = 'notice ' + (type || 'success'); el.textContent = message; }
function loadAdmin() {
  adminFetch('/api/admin/bootstrap').then(function(r) { if (!r.ok) throw new Error('Admin bootstrap failed: ' + r.status); return r.json(); })
  .then(function(data) { adminState.newsletters = data.newsletters || []; adminState.calendar = data.calendar || []; adminState.admins = data.admins || []; renderAdminLists(); })
  .catch(function(e) { showNotice(e.message, 'error'); });
}
function addNewsletter() {
  var title = document.getElementById('newsletter-title').value.trim();
  var date = document.getElementById('newsletter-date').value.trim();
  var url = document.getElementById('newsletter-url').value.trim();
  adminFetch('/api/admin/newsletters/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: title, date: date, url: url }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Could not add newsletter.'); return data; }); })
  .then(function(data) { adminState.newsletters = data.newsletters || []; document.getElementById('newsletter-title').value = ''; document.getElementById('newsletter-date').value = ''; document.getElementById('newsletter-url').value = ''; renderAdminLists(); showNotice('Newsletter added.', 'success'); })
  .catch(function(e) { showNotice(e.message, 'error'); });
}
function deleteNewsletter(id) {
  if (!confirm('Delete this newsletter?')) return;
  adminFetch('/api/admin/newsletters/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Could not delete.'); return data; }); })
  .then(function(data) { adminState.newsletters = data.newsletters || []; renderAdminLists(); showNotice('Newsletter deleted.', 'success'); })
  .catch(function(e) { showNotice(e.message, 'error'); });
}
function addCalendarEvent() {
  var title = document.getElementById('calendar-title').value.trim();
  var date = document.getElementById('calendar-date').value.trim();
  var endDate = document.getElementById('calendar-end-date').value.trim();
  var type = document.getElementById('calendar-type').value.trim();
  adminFetch('/api/admin/calendar/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ title: title, date: date, endDate: endDate, type: type }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Could not add.'); return data; }); })
  .then(function(data) { adminState.calendar = data.calendar || []; document.getElementById('calendar-title').value = ''; document.getElementById('calendar-date').value = ''; document.getElementById('calendar-end-date').value = ''; document.getElementById('calendar-type').value = 'calendar'; renderAdminLists(); showNotice('Calendar event added.', 'success'); })
  .catch(function(e) { showNotice(e.message, 'error'); });
}
function deleteCalendarEvent(id) {
  if (!confirm('Delete this calendar event?')) return;
  adminFetch('/api/admin/calendar/delete', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: id }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Could not delete.'); return data; }); })
  .then(function(data) { adminState.calendar = data.calendar || []; renderAdminLists(); showNotice('Calendar event deleted.', 'success'); })
  .catch(function(e) { showNotice(e.message, 'error'); });
}
function addAdmin() {
  var email = document.getElementById('admin-email').value.trim();
  adminFetch('/api/admin/admins/add', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email: email }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Could not add admin.'); return data; }); })
  .then(function(data) { adminState.admins = data.admins || []; document.getElementById('admin-email').value = ''; renderAdminLists(); showNotice('Admin added.', 'success'); })
  .catch(function(e) { showNotice(e.message, 'error'); });
}
function renderAdminLists() { renderNewsletterAdminList(); renderCalendarAdminList(); renderAdminEmailList(); }
function renderNewsletterAdminList() {
  var el = document.getElementById('newsletter-admin-list');
  if (!adminState.newsletters.length) { el.innerHTML = '<p class="item-meta">No newsletters yet.</p>'; return; }
  var html = '';
  adminState.newsletters.forEach(function(item) {
    html += '<div class="item"><div><div class="item-title">' + escapeHtml(item.title || 'Newsletter') + '</div><div class="item-meta">' + escapeHtml(item.date || '') + '</div><div class="item-meta">' + escapeHtml(item.url || '') + '</div></div><button class="delete" onclick="deleteNewsletter(\\'' + escapeJs(item.id) + '\\')">Delete</button></div>';
  });
  el.innerHTML = html;
}
function renderCalendarAdminList() {
  var el = document.getElementById('calendar-admin-list');
  if (!adminState.calendar.length) { el.innerHTML = '<p class="item-meta">No calendar events yet.</p>'; return; }
  var html = '';
  adminState.calendar.forEach(function(item) {
    html += '<div class="item"><div><div class="item-title">' + escapeHtml(item.title || 'Event') + '</div><div class="item-meta">' + escapeHtml(item.date || '') + (item.endDate ? ' - ' + escapeHtml(item.endDate) : '') + ' \u00b7 ' + escapeHtml(item.type || 'calendar') + '</div></div><button class="delete" onclick="deleteCalendarEvent(\\'' + escapeJs(item.id) + '\\')">Delete</button></div>';
  });
  el.innerHTML = html;
}
function renderAdminEmailList() {
  var el = document.getElementById('admin-list');
  if (!adminState.admins.length) { el.innerHTML = '<p class="item-meta">No admins found.</p>'; return; }
  var html = '';
  adminState.admins.forEach(function(email) { html += '<div class="item"><div><div class="item-title">' + escapeHtml(email) + '</div><div class="item-meta">Admin access</div></div></div>'; });
  el.innerHTML = html;
}
function escapeHtml(value) { return String(value || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }
function escapeJs(value) { return String(value || ''); }
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
<link rel="apple-touch-icon" href="${MAC_LOGO_URL}">
<meta name="theme-color" content="#10069F">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MAC Portal">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<style>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;600;700&display=swap');
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --blue:#10069F; --gold:#F7D987; --bg:#F5F5FA; --card:#fff; --muted:#6B6BA8; --border:#DDE0F5; --green:#2E9E6F; --red:#D94F3D; --amber:#D4830A; --purple:#8787C0; --orange:#F79778; --yellow:#FCB63A; }
body { font-family:'Nunito',sans-serif; background:var(--bg); color:#0D0B5C; min-height:100vh; }
.header { background:var(--blue); padding:18px 20px; }
.school-name { font-family:'Cormorant Garamond',serif; font-size:18px; font-weight:700; color:var(--gold); white-space:nowrap; }
.nav { background:#0C0580; display:flex; padding:0 20px; overflow-x:auto; }
.nav-tab { padding:11px 14px; color:rgba(255,255,255,.45); font-size:11px; font-weight:600; cursor:pointer; border-bottom:2px solid transparent; white-space:nowrap; text-transform:uppercase; }
.nav-tab.active { color:var(--gold); border-bottom-color:var(--gold); }
.main { padding:20px; max-width:700px; margin:0 auto; }
.panel { display:none; } .panel.active { display:block; }
h1 { font-family:'Cormorant Garamond',serif; font-size:24px; color:var(--blue); margin-bottom:4px; }
.sub { color:var(--muted); font-size:13px; margin-bottom:20px; }
.tc-box { background:var(--card); border:2px dashed var(--border); border-radius:14px; padding:20px; margin-bottom:20px; text-align:center; }
.tc-box h3 { font-family:'Cormorant Garamond',serif; font-size:18px; color:var(--blue); margin-bottom:6px; }
.tc-box p { font-size:12px; color:var(--muted); margin-bottom:14px; }
.tc-btn { display:block; width:100%; max-width:360px; margin:0 auto; padding:10px; background:var(--blue); color:var(--gold); border:none; border-radius:9px; font-weight:700; font-size:13px; cursor:pointer; font-family:'Nunito',sans-serif; }
.tc-err { color:var(--red); font-size:12px; margin-top:8px; text-align:center; line-height:1.4; }
.connected-box { background:rgba(16,6,159,.03); border:2px solid rgba(16,6,159,.2); border-radius:14px; padding:16px; margin-bottom:20px; display:none; }
.connected-row { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
.tc-dot { width:10px; height:10px; border-radius:50%; background:var(--green); }
.tc-name { font-size:13px; font-weight:700; color:var(--blue); }
.disc-btn { background:none; border:1.5px solid var(--border); border-radius:7px; padding:4px 10px; font-size:11px; font-weight:700; color:var(--muted); cursor:pointer; margin-left:auto; }
.tc-info { font-size:12px; color:var(--muted); }
.chips { display:flex; gap:10px; flex-wrap:wrap; margin-bottom:20px; }
.chip { display:flex; align-items:center; gap:8px; padding:8px 14px; border-radius:100px; border:2px solid var(--border); background:var(--card); cursor:pointer; font-size:13px; font-weight:600; color:var(--muted); }
.chip.active { border-color:var(--blue); background:rgba(16,6,159,.07); color:var(--blue); }
.chip-av { width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:11px; }
.today-card { background:var(--card); border-radius:16px; padding:22px; border:1px solid var(--border); margin-bottom:20px; text-align:center; }
.today-label { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:8px; }
.today-value { font-family:'Cormorant Garamond',serif; font-size:54px; font-weight:700; line-height:1; color:var(--green); }
.today-status { font-size:14px; font-weight:700; color:var(--blue); margin-top:8px; }
.today-sub { font-size:12px; color:var(--muted); margin-top:4px; }
.action-card { background:var(--blue); border-radius:14px; padding:16px 18px; margin-bottom:20px; }
.action-card h3 { font-family:'Cormorant Garamond',serif; color:var(--gold); font-size:17px; }
.action-card p { color:rgba(247,217,135,.65); font-size:11px; margin-top:2px; }
.action-btn { background:var(--gold); border:none; border-radius:100px; padding:10px 18px; font-weight:700; font-size:13px; color:var(--blue); cursor:pointer; font-family:'Nunito',sans-serif; white-space:nowrap; width:100%; margin-bottom:10px; }
.action-btn.secondary { background:#fff; color:var(--blue); border:1px solid var(--border); }
.action-btn:disabled { opacity:.6; cursor:not-allowed; }
.quick-action-note { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:12px; margin-bottom:20px; color:var(--muted); font-size:12px; line-height:1.4; display:none; }
.success-note { border-color:rgba(46,158,111,.35); color:var(--green); }
.error-note { border-color:rgba(217,79,61,.35); color:var(--red); }
.report-card, .form-card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px; margin-bottom:20px; }
.expand-btn { width:100%; background:var(--blue); color:var(--gold); border:none; border-radius:12px; padding:13px 14px; font-family:'Nunito',sans-serif; font-size:14px; font-weight:700; cursor:pointer; display:flex; justify-content:space-between; align-items:center; text-align:left; }
.expand-btn span { font-size:20px; line-height:1; }
.expand-panel { display:none; margin-top:14px; }
.expand-panel.open { display:block; }
.report-options { display:grid; grid-template-columns:1fr; gap:8px; }
.report-btn { background:rgba(16,6,159,.07); color:var(--blue); border:1px solid rgba(16,6,159,.18); border-radius:12px; padding:11px 12px; font-size:13px; font-weight:700; font-family:'Nunito',sans-serif; cursor:pointer; text-align:left; }
.form-grid { display:grid; grid-template-columns:1fr; gap:12px; }
.form-field label, .radio-group-title { display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:5px; }
.form-field input, .form-field select { width:100%; padding:10px; border:1px solid var(--border); border-radius:9px; font-family:'Nunito',sans-serif; font-size:14px; }
.radio-options { display:grid; grid-template-columns:1fr; gap:7px; }
.radio-option { border:1px solid var(--border); border-radius:10px; background:#fff; padding:9px 10px; display:flex; gap:8px; align-items:center; font-size:13px; color:#0D0B5C; }
.radio-option input { width:auto; }
.billing-box { background:rgba(247,217,135,.35); border:1px solid rgba(212,131,10,.22); border-radius:12px; padding:12px; font-size:12px; line-height:1.5; color:#0D0B5C; }
.billing-box strong { color:var(--blue); display:block; margin-bottom:4px; }
.form-submit { width:100%; background:var(--blue); color:var(--gold); border:none; border-radius:100px; padding:11px 14px; font-size:13px; font-weight:700; font-family:'Nunito',sans-serif; cursor:pointer; }
.announcement-card { background:var(--card); border-radius:12px; padding:14px 16px; border:1px solid var(--border); border-left:4px solid var(--blue); margin-bottom:10px; }
.announcement-meta { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px; }
.announcement-date { font-size:11px; color:var(--muted); }
.announcement-tag { font-size:10px; font-weight:700; padding:2px 8px; border-radius:100px; text-transform:uppercase; background:#D4EDDA; color:#155724; }
.announcement-title { font-weight:700; color:var(--blue); margin-bottom:4px; }
.announcement-body { font-size:13px; line-height:1.5; color:#0D0B5C; white-space:pre-wrap; }
.announcement-source { font-size:12px; color:var(--muted); margin-bottom:8px; }
.act-card { background:var(--card); border-radius:12px; padding:14px 16px; border:1px solid var(--border); border-left:4px solid var(--blue); margin-bottom:10px; }
.act-meta { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px; }
.act-date { font-size:11px; color:var(--muted); }
.act-tag { font-size:10px; font-weight:700; padding:2px 8px; border-radius:100px; text-transform:uppercase; background:#D4EDDA; color:#155724; }
.act-title { font-weight:700; color:var(--blue); margin-bottom:4px; }
.act-note { font-size:13px; line-height:1.5; color:#0D0B5C; white-space:pre-wrap; }
.activity-photos { display:grid; grid-template-columns:1fr; gap:12px; margin-top:10px; }
.activity-photo { display:block; width:100%; height:auto; object-fit:contain; border-radius:10px; margin-top:10px; border:1px solid var(--border); background:#fff; }
.placeholder { background:var(--card); border:2px dashed var(--border); border-radius:14px; padding:28px; text-align:center; color:var(--muted); }
.loading { color:var(--muted); font-size:13px; padding:20px; text-align:center; }
.newsletter-card { background:var(--card); border:1px solid var(--border); border-left:4px solid var(--blue); border-radius:12px; padding:13px 15px; display:flex; gap:12px; margin-bottom:10px; align-items:center; }
.newsletter-date-link { min-width:54px; text-align:center; text-decoration:none; background:var(--gold); border-radius:10px; padding:8px 6px; display:block; }
.newsletter-date-link:hover { background:#f3cf67; }
.newsletter-month { font-size:10px; color:var(--muted); text-transform:uppercase; font-weight:700; }
.newsletter-day { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; color:var(--blue); line-height:1; }
.newsletter-info { flex:1; }
.newsletter-title { font-size:14px; font-weight:700; color:var(--blue); }
.newsletter-note { font-size:11px; color:var(--muted); margin-top:3px; }
.calendar-actions { display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:16px; }
.calendar-link { display:block; text-align:center; text-decoration:none; background:var(--blue); color:var(--gold); padding:10px 14px; border-radius:100px; font-weight:700; font-size:13px; }
.calendar-filters { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.calendar-filter { border:1.5px solid var(--border); background:var(--card); color:var(--muted); border-radius:100px; padding:6px 11px; font-size:11px; font-weight:700; cursor:pointer; }
.calendar-filter.active { background:var(--blue); color:var(--gold); border-color:var(--blue); }
.calendar-card { background:var(--card); border:1px solid var(--border); border-left:4px solid var(--blue); border-radius:12px; padding:13px 15px; display:flex; gap:12px; margin-bottom:10px; }
.calendar-card.break { border-left-color:var(--yellow); }
.calendar-card.professional_learning { border-left-color:var(--orange); }
.calendar-card.holiday { border-left-color:var(--purple); }
.calendar-card.half_day { border-left-color:var(--green); }
.calendar-date-box { min-width:48px; text-align:center; }
.calendar-month { font-size:10px; color:var(--muted); text-transform:uppercase; font-weight:700; }
.calendar-day { font-family:'Cormorant Garamond',serif; font-size:26px; font-weight:700; color:var(--blue); line-height:1; }
.calendar-info { flex:1; }
.calendar-title { font-size:14px; font-weight:700; color:var(--blue); }
.calendar-notes { font-size:12px; color:var(--muted); line-height:1.4; margin-top:3px; }
.calendar-tag { display:inline-block; font-size:10px; font-weight:700; text-transform:uppercase; color:var(--muted); margin-top:6px; }
.contact-card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px; margin-bottom:12px; }
.contact-row { display:flex; align-items:center; gap:12px; }
.contact-av { width:42px; height:42px; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:14px; flex-shrink:0; }
.contact-info { flex:1; }
.contact-title { font-weight:700; color:var(--blue); font-size:14px; }
.contact-detail { font-size:12px; color:var(--muted); margin-top:2px; }
.contact-actions { display:grid; grid-template-columns:1fr 1fr; gap:8px; margin-top:12px; }
.contact-action { display:block; text-align:center; text-decoration:none; border-radius:100px; padding:8px 10px; font-size:12px; font-weight:700; }
.contact-action.call { background:var(--blue); color:var(--gold); }
.contact-action.email { background:rgba(16,6,159,.08); color:var(--blue); }
@media (max-width:520px) { .contact-actions { grid-template-columns:1fr; } }
</style>
</head>
<body>
<div class="header"><div class="school-name">Montessori Academy of Colorado</div></div>
<div class="nav" id="nav">
  <div class="nav-tab active" data-panel="dash">Dashboard</div>
  <div class="nav-tab" data-panel="activity">TC Activity</div>
  <div class="nav-tab" data-panel="announcements">Announcements</div>
  <div class="nav-tab" data-panel="newsletters">Newsletter</div>
  <div class="nav-tab" data-panel="events">School Calendar</div>
  <div class="nav-tab" data-panel="contact">Contact</div>
</div>
<div class="main">

  <section class="panel active" id="panel-dash">
    <h1>Good morning 👋</h1>
    <div class="sub">Montessori Academy of Colorado · Parent Portal</div>
    <div id="tc-box" class="tc-box">
      <h3>Parent Portal Sign In</h3>
      <p>Sign in to view your child's classroom activity.</p>
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
    <div class="today-card">
      <div class="today-label">Today's Attendance</div>
      <div class="today-value" id="attendance-val">--</div>
      <div class="today-status" id="attendance-status">Not loaded</div>
      <div class="today-sub" id="attendance-sub">Today</div>
    </div>
    <div class="quick-action-note" id="quick-action-note"></div>
    <div class="action-card">
      <h3>Daily Attendance</h3>
      <p>Use these buttons to sign your selected child in or out.</p>
    </div>
    <button class="action-btn" id="sign-in-btn" onclick="submitAttendanceAction('dropoff')">Sign In Child</button>
    <button class="action-btn secondary" id="sign-out-btn" onclick="submitAttendanceAction('pickup')">Sign Out Child</button>
    <div class="report-card">
      <button class="expand-btn" onclick="toggleSection('absence-report-panel', this)">
        Report Absence or Late Arrival <span>+</span>
      </button>
      <div id="absence-report-panel" class="expand-panel">
        <p style="color:var(--muted);font-size:12px;margin-bottom:12px;">Use this to report that your selected child is sick, out, or arriving late today.</p>
        <div class="report-options">
          <button class="report-btn" onclick="submitAttendanceReport('sick')">Sick Today</button>
          <button class="report-btn" onclick="submitAttendanceReport('vacation')">Vacation / Out Today</button>
          <button class="report-btn" onclick="submitAttendanceReport('late')">Arriving Late</button>
        </div>
      </div>
    </div>
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

  <section class="panel" id="panel-announcements">
    <h1>School Announcements</h1>
    <div class="sub">School-wide messages from MAC</div>
    <div id="announcement-list">
      <div class="placeholder">
        <div style="font-weight:700;color:var(--blue);margin-bottom:4px">Sign In Required</div>
        <div style="font-size:12px">Sign in on the Dashboard tab to see announcements.</div>
      </div>
    </div>
  </section>

  <section class="panel" id="panel-newsletters">
    <h1>Weekly Newsletter</h1>
    <div class="sub">Weekly MAC news, reminders, and upcoming dates.</div>
    <div id="newsletter-list"><div class="loading">Loading newsletters...</div></div>
  </section>

  <section class="panel" id="panel-events">
    <h1>School Calendar</h1>
    <div class="sub">Important dates from the school calendar</div>
    <div class="calendar-actions">
      <a class="calendar-link" href="https://www.montessoriacademyofcolorado.org/about/calendar" target="_blank" rel="noopener">View Full MAC Calendar</a>
    </div>
    <div class="calendar-filters" id="calendar-filters">
      <button class="calendar-filter active" data-filter="all">All</button>
      <button class="calendar-filter" data-filter="break">Breaks</button>
      <button class="calendar-filter" data-filter="professional_learning">PD Days</button>
      <button class="calendar-filter" data-filter="holiday">Holidays</button>
      <button class="calendar-filter" data-filter="half_day">Early Dismissal</button>
      <button class="calendar-filter" data-filter="milestone">First/Last</button>
    </div>
    <div id="calendar-list"><div class="loading">Loading calendar...</div></div>
  </section>

  <section class="panel" id="panel-contact">
    <h1>Contact MAC</h1>
    <div class="sub">Helpful contacts for common parent needs</div>
    <div class="contact-card">
      <div class="contact-row">
        <div class="contact-av" style="background:var(--blue)">MO</div>
        <div class="contact-info">
          <div class="contact-title">Main Office</div>
          <div class="contact-detail">303-623-2609</div>
          <div class="contact-detail">montessoriacademy@tmaoc.com</div>
        </div>
      </div>
      <div class="contact-actions">
        <a class="contact-action call" href="tel:3036232609">Call</a>
        <a class="contact-action email" href="mailto:montessoriacademy@tmaoc.com">Email</a>
      </div>
    </div>
    <div class="form-card">
      <button class="expand-btn" onclick="toggleSection('emergency-program-change-panel', this)">
        Emergency Program Change <span>+</span>
      </button>
      <div id="emergency-program-change-panel" class="expand-panel">
        <p style="color:var(--muted);font-size:12px;line-height:1.4;margin-bottom:12px;">Use this form for same-day or urgent program changes.</p>
        <div class="form-grid">
          <div class="form-field"><label for="epc-student-name">Student's Name</label><input id="epc-student-name" readonly></div>
          <div class="form-field"><label for="epc-classroom">Student's Classroom</label><input id="epc-classroom" placeholder="Classroom name"></div>
          <div class="form-field"><label for="epc-requester">Name of Person Requesting Change</label><input id="epc-requester" placeholder="Your name"></div>
          <div class="form-field"><label for="epc-request-date">Date of Request</label><input id="epc-request-date" type="date"></div>
          <div class="form-field"><label for="epc-change-date">Date of Emergency Program Change</label><input id="epc-change-date" type="date"></div>
          <div>
            <div class="radio-group-title">Drop-off or Pick-Up Time</div>
            <div class="radio-options">
              <label class="radio-option"><input type="radio" name="epc-time" value="4:30 pm"> 4:30 pm</label>
              <label class="radio-option"><input type="radio" name="epc-time" value="5:30 pm"> 5:30 pm</label>
              <label class="radio-option"><input type="radio" name="epc-time" value="7:30 am"> 7:30 am</label>
            </div>
          </div>
          <div>
            <div class="radio-group-title">Student's Regular Program Hours</div>
            <div class="radio-options">
              <label class="radio-option"><input type="radio" name="epc-hours" value="8:15–3:15"> 8:15–3:15</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="8:15–4:30"> 8:15–4:30</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="8:15–5:30"> 8:15–5:30</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="7:30–3:15"> 7:30–3:15</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="7:30–4:30"> 7:30–4:30</label>
            </div>
          </div>
          <div class="billing-box">
            <strong>Billing Notice</strong>
            $30/day to add Before School, 7:30–8:15<br>
            $30/day to add 4:30 pick-up, 3:15–4:30<br>
            $60/day to add 5:30 pick-up, 3:15–5:30<br>
            $30/day if already a 4:30 pick-up
          </div>
          <div class="quick-action-note" id="emergency-form-note"></div>
          <button class="form-submit" id="epc-submit" onclick="submitEmergencyProgramChange()">Submit Emergency Program Change</button>
        </div>
      </div>
    </div>
  </section>

</div>
<script>
var tcChildren = [];
var currentChildId = null;
var calendarEvents = [];
var calendarFilter = 'all';
var calendarLoaded = false;
var newslettersLoaded = false;
var newsletterArchives = [];
var announcementsLoaded = false;
var announcements = [];

document.getElementById('nav').addEventListener('click', function(e) {
  var tab = e.target.closest('.nav-tab');
  if (!tab) return;
  var panelName = tab.getAttribute('data-panel');
  showPanel(panelName);
  if (panelName === 'activity' && currentChildId) loadActivity(currentChildId);
  if (panelName === 'announcements') loadAnnouncements();
  if (panelName === 'newsletters') loadNewsletters();
  if (panelName === 'events') loadCalendar();
  if (panelName === 'contact') populateEmergencyProgramChangeForm();
});

document.getElementById('calendar-filters').addEventListener('click', function(e) {
  var button = e.target.closest('.calendar-filter');
  if (!button) return;
  calendarFilter = button.getAttribute('data-filter');
  document.querySelectorAll('.calendar-filter').forEach(function(item) { item.classList.remove('active'); });
  button.classList.add('active');
  renderCalendar();
});

function toggleSection(sectionId, button) {
  var panel = document.getElementById(sectionId);
  if (!panel) return;
  var isOpen = panel.classList.contains('open');
  panel.classList.toggle('open', !isOpen);
  var icon = button ? button.querySelector('span') : null;
  if (icon) icon.textContent = isOpen ? '+' : '–';
}

function workerFetch(path, options) { return fetch(path, Object.assign({ credentials: 'include' }, options || {})); }
function signInToPortal() { window.location.href = '/api/login'; }
function signOut() { window.location.href = '/cdn-cgi/access/logout'; }

function getCurrentChild() { return tcChildren.find(function(c) { return String(c.id) === String(currentChildId); }) || null; }
function getCurrentChildName() {
  var child = getCurrentChild();
  if (!child) return 'this child';
  var first = child.first_name || child.firstName || child.name || '';
  var last = child.last_name || child.lastName || '';
  return (first + ' ' + last).trim() || 'this child';
}
function getCurrentChildClassroomId() {
  var child = getCurrentChild();
  if (!child) return '';
  return child.classroom_id || child.classroomId || child.current_classroom_id || child.currentClassroomId || child.primary_classroom_id || child.primaryClassroomId || (Array.isArray(child.classroom_ids) && child.classroom_ids[0]) || '';
}

function showActionNote(message, type) {
  var note = document.getElementById('quick-action-note');
  note.style.display = 'block';
  note.classList.remove('success-note'); note.classList.remove('error-note');
  if (type === 'success') note.classList.add('success-note');
  if (type === 'error') note.classList.add('error-note');
  note.innerHTML = message;
}

function showEmergencyFormNote(message, type) {
  var note = document.getElementById('emergency-form-note');
  note.style.display = 'block';
  note.classList.remove('success-note'); note.classList.remove('error-note');
  if (type === 'success') note.classList.add('success-note');
  if (type === 'error') note.classList.add('error-note');
  note.innerHTML = message;
}

function setActionButtonsDisabled(disabled) {
  document.getElementById('sign-in-btn').disabled = disabled;
  document.getElementById('sign-out-btn').disabled = disabled;
}

function submitAttendanceAction(action) {
  if (!currentChildId) { showActionNote('Please select a child first.', 'error'); return; }
  var childName = getCurrentChildName();
  var actionText = action === 'dropoff' ? 'sign in' : 'sign out';
  if (!window.confirm('Are you sure you want to ' + actionText + ' ' + childName + '?')) return;
  setActionButtonsDisabled(true);
  showActionNote('Sending ' + actionText + ' request for ' + escapeHtml(childName) + '...', '');
  var classroomId = getCurrentChildClassroomId();
  workerFetch('/api/attendance-action', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ child_id: currentChildId, classroom_id: classroomId || undefined, action: action }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Request failed.'); return data; }); })
  .then(function() { showActionNote('<strong>Success.</strong><br>' + escapeHtml(childName) + ' was ' + (action === 'dropoff' ? 'signed in' : 'signed out') + '.', 'success'); setTimeout(function() { loadAttendance(currentChildId); }, 1000); })
  .catch(function(e) { showActionNote('<strong>Could not complete request.</strong><br>' + escapeHtml(e.message), 'error'); })
  .finally(function() { setActionButtonsDisabled(false); });
}

function submitAttendanceReport(reportType) {
  if (!currentChildId) { showActionNote('Please select a child first.', 'error'); return; }
  var labels = { sick: 'Sick Today', vacation: 'Vacation / Out Today', late: 'Arriving Late' };
  var childName = getCurrentChildName();
  var label = labels[reportType] || reportType;
  if (!window.confirm('Submit "' + label + '" for ' + childName + '?')) return;
  showActionNote('Submitting attendance report...', '');
  var classroomId = getCurrentChildClassroomId();
  workerFetch('/api/attendance-report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ child_id: currentChildId, classroom_id: classroomId || undefined, reportType: reportType }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Request failed.'); return data; }); })
  .then(function() { showActionNote('<strong>Submitted.</strong><br>' + escapeHtml(childName) + ' has been marked as ' + escapeHtml(label) + '.', 'success'); setTimeout(function() { loadAttendance(currentChildId); }, 1000); })
  .catch(function(e) { showActionNote('<strong>Could not submit report.</strong><br>' + escapeHtml(e.message), 'error'); });
}

function doConnect() {
  var errEl = document.getElementById('tc-err');
  errEl.textContent = 'Connecting...';
  workerFetch('/api/children')
  .then(function(r) {
    if (r.status === 401) throw new Error('Please sign in to continue.');
    if (r.status === 403) throw new Error('This email does not have permission to view children.');
    if (!r.ok) throw new Error('Connection failed. Status: ' + r.status);
    return r.json();
  })
  .then(function(data) {
    var children = normalizeChildren(data);
    if (!children.length) { errEl.textContent = 'Connected, but no children were found for this account.'; return; }
    document.getElementById('tc-box').style.display = 'none';
    document.getElementById('connected-box').style.display = 'block';
    document.getElementById('connected-name').textContent = 'Connected to Transparent Classroom';
    document.getElementById('connected-info').textContent = 'Connected through MAC Parent Portal';
    renderChildren(children);
    errEl.textContent = '';
  })
  .catch(function(e) { errEl.innerHTML = 'Could not connect: ' + escapeHtml(e.message) + '<br><br>Please click <strong>Sign In to Parent Portal</strong> and try again.'; });
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
  var dashboardHtml = '', activityHtml = '';
  children.forEach(function(c, i) {
    var firstName = c.first_name || c.firstName || c.name || 'Student';
    var lastName = c.last_name || c.lastName || '';
    var initial = firstName ? firstName.charAt(0) : '?';
    var childId = c.id;
    dashboardHtml += '<div class="chip' + (i === 0 ? ' active' : '') + '" data-id="' + escapeHtml(childId) + '"><div class="chip-av" style="background:' + colors[i % colors.length] + '">' + escapeHtml(initial) + '</div> ' + escapeHtml(firstName) + (lastName ? ' ' + escapeHtml(lastName.charAt(0)) + '.' : '') + '</div>';
    activityHtml += '<div class="chip' + (i === 0 ? ' active' : '') + '" data-id="' + escapeHtml(childId) + '"><div class="chip-av" style="background:' + colors[i % colors.length] + '">' + escapeHtml(initial) + '</div> ' + escapeHtml(firstName) + '</div>';
  });
  document.getElementById('child-chips').innerHTML = dashboardHtml;
  document.getElementById('activity-chips').innerHTML = activityHtml;
  currentChildId = children[0].id;
  setActiveChild(currentChildId);
  loadAttendance(currentChildId);
  populateEmergencyProgramChangeForm();
  document.getElementById('child-chips').onclick = function(e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    currentChildId = chip.getAttribute('data-id'); setActiveChild(currentChildId); loadAttendance(currentChildId); populateEmergencyProgramChangeForm();
  };
  document.getElementById('activity-chips').onclick = function(e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    currentChildId = chip.getAttribute('data-id'); setActiveChild(currentChildId); loadAttendance(currentChildId); loadActivity(currentChildId); populateEmergencyProgramChangeForm();
  };
}

function setActiveChild(childId) {
  document.querySelectorAll('#child-chips .chip, #activity-chips .chip').forEach(function(chip) {
    if (chip.getAttribute('data-id') === String(childId)) chip.classList.add('active');
    else chip.classList.remove('active');
  });
}

function showPanel(panelName) {
  document.querySelectorAll('.nav-tab').forEach(function(tab) { if (tab.getAttribute('data-panel') === panelName) tab.classList.add('active'); else tab.classList.remove('active'); });
  document.querySelectorAll('.panel').forEach(function(panel) { panel.classList.remove('active'); });
  document.getElementById('panel-' + panelName).classList.add('active');
}

function loadAttendance(childId) {
  document.getElementById('attendance-val').textContent = '...';
  document.getElementById('attendance-status').textContent = 'Loading';
  document.getElementById('attendance-sub').textContent = 'Today';
  workerFetch('/api/attendance-summary?child_id=' + encodeURIComponent(childId))
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) { document.getElementById('attendance-val').textContent = data.todayAttendanceValue || '--'; document.getElementById('attendance-status').textContent = data.todayStatus || 'Today'; document.getElementById('attendance-sub').textContent = data.day || 'Today'; })
  .catch(function() { document.getElementById('attendance-val').textContent = '--'; document.getElementById('attendance-status').textContent = 'Unable to load'; document.getElementById('attendance-sub').textContent = 'Today'; });
}

function populateEmergencyProgramChangeForm() {
  var child = getCurrentChild();
  var studentNameEl = document.getElementById('epc-student-name');
  var classroomEl = document.getElementById('epc-classroom');
  var requestDateEl = document.getElementById('epc-request-date');
  if (!studentNameEl || !classroomEl || !requestDateEl) return;
  studentNameEl.value = child ? getCurrentChildName() : '';
  if (!classroomEl.value) classroomEl.value = '';
  if (!requestDateEl.value) requestDateEl.value = getLocalDateString();
}

function getLocalDateString() {
  var d = new Date();
  return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
}

function getCheckedRadioValue(name) {
  var checked = document.querySelector('input[name="' + name + '"]:checked');
  return checked ? checked.value : '';
}

function submitEmergencyProgramChange() {
  if (!currentChildId) { showEmergencyFormNote('Please select a child first.', 'error'); return; }
  var submitButton = document.getElementById('epc-submit');
  var payload = {
    child_id: currentChildId,
    studentName: document.getElementById('epc-student-name').value.trim(),
    studentClassroom: document.getElementById('epc-classroom').value.trim(),
    personRequestingChange: document.getElementById('epc-requester').value.trim(),
    dateOfRequest: document.getElementById('epc-request-date').value.trim(),
    dateOfEmergencyProgramChange: document.getElementById('epc-change-date').value.trim(),
    dropOffOrPickUpTime: getCheckedRadioValue('epc-time'),
    regularProgramHours: getCheckedRadioValue('epc-hours')
  };
  var required = [['Student Name',payload.studentName],['Student Classroom',payload.studentClassroom],['Person Requesting Change',payload.personRequestingChange],['Date of Request',payload.dateOfRequest],['Date of Change',payload.dateOfEmergencyProgramChange],['Drop-off or Pick-Up Time',payload.dropOffOrPickUpTime],["Student's Regular Program Hours",payload.regularProgramHours]];
  var missing = required.filter(function(item) { return !item[1]; }).map(function(item) { return item[0]; });
  if (missing.length) { showEmergencyFormNote('Please complete: ' + escapeHtml(missing.join(', ')), 'error'); return; }
  if (!window.confirm('Submit Emergency Program Change request for ' + payload.studentName + '?')) return;
  submitButton.disabled = true;
  showEmergencyFormNote('Submitting...', '');
  workerFetch('/api/emergency-program-change', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Submission failed.'); return data; }); })
  .then(function() { showEmergencyFormNote('<strong>Submitted.</strong><br>Your Emergency Program Change request has been sent to MAC.', 'success'); document.getElementById('epc-change-date').value = ''; document.querySelectorAll('input[name="epc-time"], input[name="epc-hours"]').forEach(function(input) { input.checked = false; }); })
  .catch(function(e) { showEmergencyFormNote('<strong>Could not submit.</strong><br>' + escapeHtml(e.message), 'error'); })
  .finally(function() { submitButton.disabled = false; });
}

function loadAnnouncements() {
  if (announcementsLoaded) { renderAnnouncements(); return; }
  document.getElementById('announcement-list').innerHTML = '<div class="loading">Loading announcements...</div>';
  workerFetch('/api/announcements')
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) { announcements = Array.isArray(data.announcements) ? data.announcements : []; announcementsLoaded = true; renderAnnouncements(); })
  .catch(function(e) { document.getElementById('announcement-list').innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">Announcements could not load</div><div style="font-size:12px">' + escapeHtml(e.message) + '</div></div>'; });
}

function renderAnnouncements() {
  var container = document.getElementById('announcement-list');
  if (!announcements.length) { container.innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">No announcements found</div><div style="font-size:12px">School-wide announcements will appear here.</div></div>'; return; }
  var html = '';
  announcements.forEach(function(item) {
    html += '<div class="announcement-card"><div class="announcement-meta"><span class="announcement-date">' + escapeHtml(formatDateTime(item.createdAt)) + '</span><span class="announcement-tag">School</span></div><div class="announcement-title">' + escapeHtml(item.title || 'Announcement') + '</div><div class="announcement-source">' + escapeHtml(item.authorName || '') + '</div><div class="announcement-body">' + sanitizeAnnouncementBody(item.body || '') + '</div></div>';
  });
  container.innerHTML = html;
}

function loadNewsletters() {
  if (newslettersLoaded) { renderNewsletters(); return; }
  document.getElementById('newsletter-list').innerHTML = '<div class="loading">Loading newsletters...</div>';
  workerFetch('/api/newsletters')
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) { newsletterArchives = Array.isArray(data.newsletters) ? data.newsletters : []; newslettersLoaded = true; renderNewsletters(); })
  .catch(function(e) { document.getElementById('newsletter-list').innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">Newsletters could not load</div><div style="font-size:12px">' + escapeHtml(e.message) + '</div></div>'; });
}

function renderNewsletters() {
  var container = document.getElementById('newsletter-list');
  if (!newsletterArchives.length) { container.innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">No newsletters found</div></div>'; return; }
  var html = '';
  newsletterArchives.forEach(function(item, index) {
    var dateInfo = formatNewsletterDate(item.date);
    html += '<div class="newsletter-card"><a class="newsletter-date-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener"><div class="newsletter-month">' + escapeHtml(dateInfo.month) + '</div><div class="newsletter-day">' + escapeHtml(dateInfo.day) + '</div></a><div class="newsletter-info"><div class="newsletter-title">' + escapeHtml(item.title || 'MAC News') + '</div><div class="newsletter-note">' + (index === 0 ? 'Latest newsletter' : 'Newsletter archive') + '</div></div></div>';
  });
  container.innerHTML = html;
}

function formatNewsletterDate(value) {
  var d = parseLocalDate(value);
  if (!d) return { month: '', day: '' };
  return { month: d.toLocaleDateString('en-US', { month: 'short' }), day: String(d.getDate()) };
}

function sanitizeAnnouncementBody(value) {
  var div = document.createElement('div');
  div.innerHTML = String(value || '');
  return escapeHtml(div.textContent || div.innerText || '');
}

function formatDateTime(value) {
  if (!value) return '';
  var d = new Date(value);
  if (isNaN(d.getTime())) return value;
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function loadActivity(childId) {
  var content = document.getElementById('activity-content');
  content.innerHTML = '<div class="loading">Loading activity...</div>';
  var d = new Date(); d.setDate(d.getDate() - 90);
  var ds = d.toISOString().split('T')[0];
  workerFetch('/api/activity?child_id=' + encodeURIComponent(childId) + '&date_start=' + encodeURIComponent(ds))
  .then(function(r) { if (r.status === 401) throw new Error('Please sign in to view activity.'); if (r.status === 403) throw new Error('No permission to view this child.'); if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) {
    var items = normalizeActivity(data);
    if (!items.length) { content.innerHTML = '<div class="placeholder"><div style="font-size:13px;color:var(--muted)">No recent activity found.</div></div>'; return; }
    var html = '';
    items.slice(0, 40).forEach(function(item) {
      var displayDate = getActivityDate(item);
      var title = getActivityTitle(item);
      var text = getActivityText(item);
      var photos = getActivityPhotos(item);
      html += '<div class="act-card"><div class="act-meta"><span class="act-date">' + escapeHtml(displayDate) + '</span><span class="act-tag">' + escapeHtml(getActivityType(item)) + '</span></div>';
      if (title) html += '<div class="act-title">' + escapeHtml(title) + '</div>';
      if (text) html += '<div class="act-note">' + escapeHtml(text) + '</div>';
      else if (!photos.length) html += '<div class="act-note">No description provided.</div>';
      if (photos.length) { html += '<div class="activity-photos">'; photos.forEach(function(photoUrl) { html += '<img class="activity-photo" src="' + escapeHtml(photoUrl) + '" alt="Classroom activity photo">'; }); html += '</div>'; }
      html += '</div>';
    });
    content.innerHTML = html;
  })
  .catch(function(e) { content.innerHTML = '<div style="color:var(--red);font-size:13px;padding:16px">Error: ' + escapeHtml(e.message) + '</div>'; });
}

function loadCalendar() {
  if (calendarLoaded) { renderCalendar(); return; }
  document.getElementById('calendar-list').innerHTML = '<div class="loading">Loading calendar...</div>';
  workerFetch('/api/calendar')
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) { calendarEvents = Array.isArray(data.events) ? data.events : []; calendarLoaded = true; renderCalendar(); })
  .catch(function(e) { document.getElementById('calendar-list').innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">Calendar could not load</div><div style="font-size:12px">' + escapeHtml(e.message) + '</div></div>'; });
}

function renderCalendar() {
  var container = document.getElementById('calendar-list');
  if (!calendarEvents.length) { container.innerHTML = '<div class="placeholder"><div style="font-size:12px">No calendar dates found.</div></div>'; return; }
  var filtered = calendarEvents.filter(function(event) { return calendarFilter === 'all' || event.type === calendarFilter; }).sort(function(a, b) { var aDate = parseLocalDate(a.date); var bDate = parseLocalDate(b.date); if (!aDate && !bDate) return 0; if (!aDate) return 1; if (!bDate) return -1; return aDate.getTime() - bDate.getTime(); });
  if (!filtered.length) { container.innerHTML = '<div class="placeholder"><div style="font-size:12px">No dates found for this filter.</div></div>'; return; }
  var html = '';
  filtered.forEach(function(event) {
    var dateInfo = formatCalendarDate(event.date, event.endDate);
    html += '<div class="calendar-card ' + escapeHtml(event.type || 'calendar') + '"><div class="calendar-date-box"><div class="calendar-month">' + escapeHtml(dateInfo.month) + '</div><div class="calendar-day">' + escapeHtml(dateInfo.day) + '</div></div><div class="calendar-info"><div class="calendar-title">' + escapeHtml(event.title || 'Calendar Date') + '</div><div class="calendar-notes">' + escapeHtml(dateInfo.full) + '</div><span class="calendar-tag">' + escapeHtml(labelCalendarType(event.type)) + '</span></div></div>';
  });
  container.innerHTML = html;
}

function formatCalendarDate(startDate, endDate) {
  var start = parseLocalDate(startDate);
  var end = endDate ? parseLocalDate(endDate) : null;
  if (!start) return { month: '', day: '', full: startDate || '' };
  var month = start.toLocaleDateString('en-US', { month: 'short' });
  var day = String(start.getDate());
  var full = start.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  if (end) full += ' - ' + end.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' });
  return { month: month, day: day, full: full };
}

function parseLocalDate(value) {
  if (!value) return null;
  var parts = String(value).split('-');
  if (parts.length !== 3) return null;
  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function labelCalendarType(type) {
  var labels = { event:'Event', break:'Seasonal Break', professional_learning:'Professional Learning', holiday:'Holiday', half_day:'Early Dismissal', milestone:'First / Last Day', calendar:'Calendar' };
  return labels[type] || type || 'Calendar';
}

function getActivityDate(item) {
  var rawDate = item.date || item.created_at || item.createdAt || item.observed_on || item.observedOn || item.updated_at || '';
  if (!rawDate) return '';
  var parsedDate = new Date(rawDate);
  if (isNaN(parsedDate.getTime())) return String(rawDate);
  return parsedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function getActivityTitle(item) { return item.title || item.lesson_name || item.lessonName || item.name || item.activity_name || ''; }
function getActivityText(item) { return item.text || item.note || item.notes || item.description || item.body || item.comment || item.comments || item.observation || item.observations || item.caption || item.message || ''; }

function getActivityType(item) {
  var type = item.type || item.kind || item.category || item.activity_type || item.activityType || '';
  if (!type) { if (getActivityPhotos(item).length) return 'Photo'; if (getActivityText(item)) return 'Note'; return 'Activity'; }
  return String(type).replace(/_/g, ' ');
}

function getActivityPhotos(item) {
  var bestPhoto = '', bestScore = -1;
  function score(url) { var c = String(url||'').toLowerCase(); if(c.indexOf('original')!==-1)return 600; if(c.indexOf('full')!==-1)return 500; if(c.indexOf('large')!==-1)return 400; if(c.indexOf('medium')!==-1)return 300; if(c.indexOf('small')!==-1)return 200; if(c.indexOf('thumb')!==-1)return 100; return 250; }
  function add(value) {
    if (!value) return;
    if (typeof value === 'string') { if (value.indexOf('http') === 0) { var s = score(value); if (s > bestScore) { bestScore = s; bestPhoto = value; } } return; }
    if (typeof value === 'object') { ['original_photo_url','originalPhotoUrl','full_photo_url','fullPhotoUrl','large_photo_url','largePhotoUrl','original_url','originalUrl','full_url','fullUrl','large_url','largeUrl','photo_url','photoUrl','image_url','imageUrl','url','medium_url','mediumUrl','thumbnail_url','thumbnailUrl'].forEach(function(k){add(value[k]);}); }
  }
  ['original_photo_url','originalPhotoUrl','full_photo_url','fullPhotoUrl','large_photo_url','largePhotoUrl','original_url','originalUrl','full_url','fullUrl','large_url','largeUrl','photo_url','photoUrl','image_url','imageUrl','url','photo','image'].forEach(function(k){add(item[k]);});
  if (Array.isArray(item.photos)) item.photos.forEach(add);
  if (Array.isArray(item.images)) item.images.forEach(add);
  if (Array.isArray(item.attachments)) item.attachments.forEach(add);
  if (Array.isArray(item.media)) item.media.forEach(add);
  return bestPhoto ? [bestPhoto] : [];
}

function escapeHtml(value) { return String(value||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

if ('serviceWorker' in navigator) { navigator.serviceWorker.register('/service-worker.js').catch(function(){}); }
doConnect();
if (new URLSearchParams(window.location.search).get('signed_in') === '1') { window.history.replaceState({}, document.title, window.location.pathname); }
</script>
</body>
</html>`;
}
