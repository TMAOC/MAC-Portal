// Full replacement src/index.js
// MAC Parent Portal - Magic Link Authentication

const DEFAULT_ADMIN_EMAILS = ["jennine@tmaoc.com"];

const MAC_LOGO_URL = "https://lh3.googleusercontent.com/7wwzlYn_OliJT22N6XMulkSQchslXrHJtN-AHEoO-jkDNkrBm-VrE32yI7pxQ9V88GWyw4WNZB-4KDQR=w1045";

const EMERGENCY_PROGRAM_CHANGE_RECIPIENT = "montessoriacademy@tmaoc.com";
const FROM_EMAIL = "montessoriacademy@tmaoc.com";
const SESSION_DURATION_DAYS = 60;

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
  { id: "cal-2027-02-15", date: "2027-02-15", endDate: "", type: "holiday", title: "Presidents' Day - No School" },
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
    const classroomIds = getClassroomIds(env);

    // --- Static assets ---
    if (path === "/manifest.json") return jsonResponse(getManifest(url.origin));
    if (path === "/service-worker.js") {
      return new Response(getServiceWorker(), {
        status: 200,
        headers: { "Content-Type": "application/javascript; charset=utf-8", "Cache-Control": "no-cache" }
      });
    }

    // --- Magic link auth routes (no session required) ---
    if (path === "/api/auth/request") {
      if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
      const body = await safeJson(request);
      const email = String(body.email || "").toLowerCase().trim();
      if (!email || !email.includes("@")) return jsonResponse({ error: "Invalid email" }, 400);
      if (!env.PARENT_PERMISSIONS) return jsonResponse({ error: "Missing KV binding" }, 500);

      const allowed = await env.PARENT_PERMISSIONS.get(email);
      const isAdmin = DEFAULT_ADMIN_EMAILS.map(e => e.toLowerCase()).includes(email);
      if (!allowed && !isAdmin) {
        // Return ok:true so we don't leak which emails are registered
        return jsonResponse({ ok: true });
      }

      const token2 = generateToken();
      const expires = Date.now() + (15 * 60 * 1000); // 15 min
      await env.PARENT_PERMISSIONS.put("magic:" + token2, JSON.stringify({ email, expires }), { expirationTtl: 900 });

      if (env.RESEND_API_KEY) {
        await sendMagicLinkEmail({ apiKey: env.RESEND_API_KEY, to: email, magicLink: url.origin + "/api/auth/verify?token=" + token2 });
      }

      return jsonResponse({ ok: true });
    }

    if (path === "/api/auth/verify") {
      const token2 = url.searchParams.get("token");
      if (!token2) return new Response(renderAuthErrorHtml("Invalid or missing login link."), { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } });

      const raw = await env.PARENT_PERMISSIONS.get("magic:" + token2);
      if (!raw) return new Response(renderAuthErrorHtml("This login link has expired or already been used. Please request a new one."), { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } });

      let data;
      try { data = JSON.parse(raw); } catch (e) { return new Response(renderAuthErrorHtml("Invalid login link."), { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } }); }

      if (Date.now() > data.expires) {
        await env.PARENT_PERMISSIONS.delete("magic:" + token2);
        return new Response(renderAuthErrorHtml("This login link has expired. Please request a new one."), { status: 400, headers: { "Content-Type": "text/html; charset=utf-8" } });
      }

      await env.PARENT_PERMISSIONS.delete("magic:" + token2);

      const sessionToken = generateToken();
      const sessionExpires = Date.now() + (SESSION_DURATION_DAYS * 24 * 60 * 60 * 1000);
      await env.PARENT_PERMISSIONS.put("session:" + sessionToken, JSON.stringify({ email: data.email, expires: sessionExpires }), { expirationTtl: SESSION_DURATION_DAYS * 24 * 60 * 60 });

      const cookieExpires = new Date(sessionExpires).toUTCString();
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/",
          "Set-Cookie": "mac_session=" + sessionToken + "; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=" + cookieExpires
        }
      });
    }

    if (path === "/api/auth/logout") {
      const sessionToken = getSessionToken(request);
      if (sessionToken && env.PARENT_PERMISSIONS) {
        await env.PARENT_PERMISSIONS.delete("session:" + sessionToken);
      }
      return new Response(null, {
        status: 302,
        headers: {
          "Location": "/",
          "Set-Cookie": "mac_session=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT"
        }
      });
    }

    // --- Get user email from session cookie ---
    const userEmail = await getUserEmailFromSession(request, env);

    // --- Admin routes ---
    if (path === "/admin") {
      if (!userEmail) return Response.redirect(url.origin + "/", 302);
      const isAdmin = await isAdminEmail(env, userEmail);
      if (!isAdmin) return new Response(renderNotAdminHtml(userEmail), { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } });
      return new Response(renderAdminHtml(userEmail), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
    }

    // --- API status ---
    if (path === "/api") {
      return jsonResponse({
        status: "api running",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        hasGoogleSheetWebhook: Boolean(env.GOOGLE_SHEET_WEBHOOK_URL),
        hasResendKey: Boolean(env.RESEND_API_KEY),
        signedInEmail: userEmail || null,
        classroomIds,
        routes: ["/api/auth/request","/api/auth/verify","/api/auth/logout","/api/permission-test","/api/children","/api/siblings","/api/activity?child_id=CHILD_ID","/api/attendance-summary?child_id=CHILD_ID","/api/attendance-action","/api/attendance-report","/api/emergency-program-change","/api/contacts-update","/api/announcements","/api/announcements-raw","/api/posts-raw","/api/newsletters","/api/calendar","/admin","/manifest.json","/service-worker.js"]
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
      if (!userEmail) return jsonResponse({ error: "Not signed in" }, 401);
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
        const time = String(body.time || "").trim();
        const location = String(body.location || "").trim();
        if (!date || !title) return jsonResponse({ error: "Missing date or title" }, 400);
        const calendar = await getStoredArray(env, "CALENDAR_EVENTS", DEFAULT_CALENDAR_EVENTS);
        calendar.push({ id: "cal-" + date + "-" + Date.now(), date, endDate, type, title, time, location });
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

      if (path === "/api/admin/parents/import") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const rows = Array.isArray(body.rows) ? body.rows : [];
        const merge = body.merge === true;
        if (!rows.length) return jsonResponse({ error: "No rows provided" }, 400);
        const results = { imported: 0, skipped: 0, errors: [] };
        for (const row of rows) {
          const email = String(row.email || "").toLowerCase().trim();
          const childIds = Array.isArray(row.childIds) ? row.childIds.map(String).filter(Boolean) : [];
          if (!email || !email.includes("@")) { results.errors.push("Invalid email: " + email); results.skipped++; continue; }
          if (!childIds.length) { results.errors.push("No child IDs for: " + email); results.skipped++; continue; }
          if (merge) {
            const existing = await env.PARENT_PERMISSIONS.get(email);
            if (existing && existing !== "*") {
              try {
                const existingIds = JSON.parse(existing).map(String);
                const merged = Array.from(new Set(existingIds.concat(childIds)));
                await env.PARENT_PERMISSIONS.put(email, JSON.stringify(merged));
              } catch (e) {
                await env.PARENT_PERMISSIONS.put(email, JSON.stringify(childIds));
              }
            } else {
              await env.PARENT_PERMISSIONS.put(email, JSON.stringify(childIds));
            }
          } else {
            await env.PARENT_PERMISSIONS.put(email, JSON.stringify(childIds));
          }
          results.imported++;
        }
        return jsonResponse({ ok: true, results });
      }

      if (path === "/api/admin/parents/add-family") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const emails = Array.isArray(body.emails) ? body.emails.map(function(e) { return String(e).toLowerCase().trim(); }).filter(function(e) { return e.includes("@"); }) : [];
        const childIds = Array.isArray(body.childIds) ? body.childIds.map(String).filter(Boolean) : [];
        if (!emails.length) return jsonResponse({ error: "At least one valid email is required" }, 400);
        if (!childIds.length) return jsonResponse({ error: "At least one child ID is required" }, 400);
        const limited = body.limited === true;
        const value = limited ? "limited:" + childIds.join(",") : JSON.stringify(childIds);
        const added = [];
        for (const email of emails) {
          await env.PARENT_PERMISSIONS.put(email, value);
          added.push({ email, childIds, limited });
        }
        return jsonResponse({ ok: true, added });
      }

      if (path === "/api/admin/parents/delete") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const email = String(body.email || "").toLowerCase().trim();
        if (!email || !email.includes("@")) return jsonResponse({ error: "Invalid email" }, 400);
        await env.PARENT_PERMISSIONS.delete(email);
        return jsonResponse({ ok: true, email });
      }

      if (path === "/api/admin/parents/add-child") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        const body = await safeJson(request);
        const email = String(body.email || "").toLowerCase().trim();
        const childId = String(body.childId || "").trim();
        if (!email || !email.includes("@")) return jsonResponse({ error: "Invalid email" }, 400);
        if (!childId) return jsonResponse({ error: "Missing childId" }, 400);
        const existing = await env.PARENT_PERMISSIONS.get(email);
        if (!existing) return jsonResponse({ error: "Parent not found: " + email }, 404);
        if (existing === "*") return jsonResponse({ ok: true, note: "Parent already has full access" });
        try {
          const ids = JSON.parse(existing).map(String);
          if (!ids.includes(childId)) ids.push(childId);
          await env.PARENT_PERMISSIONS.put(email, JSON.stringify(ids));
          return jsonResponse({ ok: true, email, childIds: ids });
        } catch (e) {
          return jsonResponse({ error: "Could not update parent" }, 500);
        }
      }

      if (path === "/api/admin/parents/list") {
        const keys = await env.PARENT_PERMISSIONS.list();
        const parents = [];
        for (const key of keys.keys) {
          if (key.name.startsWith("magic:") || key.name.startsWith("session:")) continue;
          if (key.name === "ADMIN_EMAILS" || key.name === "NEWSLETTER_ARCHIVES" || key.name === "CALENDAR_EVENTS") continue;
          const value = await env.PARENT_PERMISSIONS.get(key.name);
          if (!value) continue;
          let childIds = [];
          if (value === "*") { childIds = ["*"]; }
          else { try { childIds = JSON.parse(value); } catch(e) { continue; } }
          parents.push({ email: key.name, childIds });
        }
        parents.sort(function(a, b) { return a.email.localeCompare(b.email); });
        return jsonResponse({ ok: true, count: parents.length, parents });
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
        if (!userEmail) return jsonResponse({ error: "Not signed in" }, 401);
        const allowed = await getAllowedChildren(env, userEmail);
        return jsonResponse({ signedInEmail: userEmail, allowedChildren: allowed });
      }

      if (!userEmail) return jsonResponse({ error: "Not signed in", code: "NOT_SIGNED_IN" }, 401);
      const allowedChildren = await getAllowedChildren(env, userEmail);
      if (!allowedChildren) return jsonResponse({ error: "This email does not have permission to view children", email: userEmail }, 403);

      if (path === "/api/children") {
        const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });
        if (!childrenResult.ok) return jsonResponse({ error: "Could not load children from Transparent Classroom" }, childrenResult.status);
        const classroomNameMap = await fetchClassroomNameMap({ schoolId, tcHeaders });
        const filteredChildren = filterChildrenForUser(childrenResult.children, allowedChildren);
        const sanitized = filteredChildren.map(function(child) {
          const s = sanitizeChildForPortal(child);
          s.classroom_name = classroomNameMap[String(s.classroom_id)] || "";
          return s;
        });
        const childIds = allowedChildren === "*" ? null : (allowedChildren && allowedChildren.limited ? allowedChildren.ids : allowedChildren);
        return jsonResponse({ children: sanitized, allowedChildIds: childIds, isLimited: !!(allowedChildren && allowedChildren.limited) });
      }

      if (path === "/api/siblings") {
        const childId = url.searchParams.get("child_id");
        if (!childId) return jsonResponse({ siblingIds: null });
        const keys = await env.PARENT_PERMISSIONS.list();
        let siblingIds = null;
        for (const key of keys.keys) {
          if (key.name.startsWith("magic:") || key.name.startsWith("session:")) continue;
          if (key.name === "ADMIN_EMAILS" || key.name === "NEWSLETTER_ARCHIVES" || key.name === "CALENDAR_EVENTS") continue;
          const value = await env.PARENT_PERMISSIONS.get(key.name);
          if (!value || value === "*") continue;
          try {
            const ids = JSON.parse(value).map(String);
            if (ids.includes(String(childId))) { siblingIds = ids; break; }
          } catch (e) { continue; }
        }
        return jsonResponse({ childId, siblingIds });
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
        if (selectedChildId && canAccessChild(selectedChildId, allowedChildren)) {
          // Get all sibling IDs from KV
          let siblingIds = [selectedChildId];
          const kvKeys = await env.PARENT_PERMISSIONS.list();
          for (const key of kvKeys.keys) {
            if (key.name === "ADMIN_EMAILS" || key.name === "NEWSLETTER_ARCHIVES" || key.name === "CALENDAR_EVENTS") continue;
            const value = await env.PARENT_PERMISSIONS.get(key.name);
            if (!value || value === "*") continue;
            try {
              const ids = JSON.parse(value).map(String);
              if (ids.includes(String(selectedChildId))) { siblingIds = ids; break; }
            } catch (e) { continue; }
          }
          // Get classrooms for all siblings
          const childrenResult = await fetchChildrenFromTC({ apiBaseUrl, schoolId, tcHeaders });
          if (childrenResult.ok) {
            siblingIds.forEach(function(cid) {
              const child = childrenResult.children.find(function(c) { return String(c.id) === String(cid); });
              if (child) {
                const ids = [child.classroom_id, child.classroomId, child.current_classroom_id, child.currentClassroomId, child.primary_classroom_id, child.primaryClassroomId];
                ids.forEach(function(id) { if (id) visibleClassroomIds.add(String(id)); });
                if (Array.isArray(child.classroom_ids)) child.classroom_ids.forEach(function(id) { if (id) visibleClassroomIds.add(String(id)); });
              }
            });
          }
        }
        const announcementsResult = await fetchAnnouncementsFromTC({ schoolId, tcHeaders, visibleClassroomIds });
        return jsonResponse(announcementsResult, announcementsResult.ok ? 200 : announcementsResult.status || 500);
      }

      if (allowedChildren && allowedChildren.limited) {
        const limitedAllowed = ["/api/children", "/api/attendance-summary", "/api/attendance-action", "/api/attendance-report", "/api/siblings", "/api/auth/logout"];
        if (!limitedAllowed.includes(path)) return jsonResponse({ error: "Access restricted to sign in/out only." }, 403);
      }

      if (path === "/api/activity" || path === "/api/activity-raw") {
        const childId = url.searchParams.get("child_id");
        let dateStart = url.searchParams.get("date_start");
        if (!dateStart) { const d = new Date(); d.setDate(d.getDate() - 365); dateStart = d.toISOString().split("T")[0]; }
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
        const requiredFields = ["studentName","studentClassroom","personRequestingChange","dateOfEmergencyProgramChange","dropOffOrPickUpTime","regularProgramHours"];
        const missingFields = requiredFields.filter(function(field) { return !String(body[field] || "").trim(); });
        if (missingFields.length) return jsonResponse({ error: "Missing required fields", missingFields }, 400);
        const submission = {
          studentName: String(body.studentName || "").trim(),
          studentClassroom: String(body.studentClassroom || "").trim(),
          personRequestingChange: String(body.personRequestingChange || "").trim(),

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

      if (path === "/api/limited-access-request") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        if (!env.GOOGLE_SHEET_WEBHOOK_URL) return jsonResponse({ error: "Missing GOOGLE_SHEET_WEBHOOK_URL" }, 500);
        const body = await safeJson(request);
        if (!body.name) return jsonResponse({ error: "Missing name" }, 400);
        if (!body.email) return jsonResponse({ error: "Missing email" }, 400);
        const submission = {
          formType: "limited_access_request",
          name: String(body.name || "").trim(),
          email: String(body.email || "").trim(),
          relationship: String(body.relationship || "").trim(),
          studentName: String(body.studentName || "").trim(),
          studentClassroom: String(body.studentClassroom || "").trim(),
          requestedBy: userEmail
        };
        const sheetResult = await sendEmergencyProgramChangeToGoogleSheet({ webhookUrl: env.GOOGLE_SHEET_WEBHOOK_URL, submission });
        return jsonResponse(sheetResult, sheetResult.ok ? 200 : sheetResult.status || 500);
      }

      if (path === "/api/keyfob-request") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        if (!env.GOOGLE_SHEET_WEBHOOK_URL) return jsonResponse({ error: "Missing GOOGLE_SHEET_WEBHOOK_URL" }, 500);
        const body = await safeJson(request);
        if (!body.requesterName) return jsonResponse({ error: "Missing requester name" }, 400);
        if (!body.quantity) return jsonResponse({ error: "Missing quantity" }, 400);
        const submission = {
          formType: "key_fob_replacement",
          requesterName: String(body.requesterName || "").trim(),
          quantity: String(body.quantity || "").trim(),
          studentName: String(body.studentName || "").trim(),
          studentClassroom: String(body.studentClassroom || "").trim(),
          parentEmail: userEmail
        };
        const sheetResult = await sendEmergencyProgramChangeToGoogleSheet({ webhookUrl: env.GOOGLE_SHEET_WEBHOOK_URL, submission });
        return jsonResponse(sheetResult, sheetResult.ok ? 200 : sheetResult.status || 500);
      }

      if (path === "/api/contacts-update") {
        if (request.method !== "POST") return jsonResponse({ error: "Method not allowed" }, 405);
        if (!env.GOOGLE_SHEET_WEBHOOK_URL) return jsonResponse({ error: "Missing GOOGLE_SHEET_WEBHOOK_URL" }, 500);
        const body = await safeJson(request);
        const childId = String(body.child_id || "").trim();
        if (!childId) return jsonResponse({ error: "Missing child_id" }, 400);
        if (!canAccessChild(childId, allowedChildren)) return jsonResponse({ error: "No permission", email: userEmail, childId }, 403);
        const requesterName = String(body.requesterName || "").trim();
        if (!requesterName) return jsonResponse({ error: "Missing requester name" }, 400);
        const submission = {
          formType: "approved_adults_emergency_contacts",
          studentName: String(body.studentName || "").trim(),
          studentClassroom: String(body.studentClassroom || "").trim(),
          requesterName: requesterName,
          pickupName: String(body.pickupName || "").trim(),
          pickupPhone: String(body.pickupPhone || "").trim(),
          pickupRelationship: String(body.pickupRelationship || "").trim(),
          emergencyName: String(body.emergencyName || "").trim(),
          emergencyPhone: String(body.emergencyPhone || "").trim(),
          emergencyRelationship: String(body.emergencyRelationship || "").trim(),
          parentEmail: userEmail,
          childId: childId,
          submittedAt: new Date().toISOString()
        };
        const sheetResult = await sendEmergencyProgramChangeToGoogleSheet({ webhookUrl: env.GOOGLE_SHEET_WEBHOOK_URL, submission });
        return jsonResponse(sheetResult, sheetResult.ok ? 200 : sheetResult.status || 500);
      }

      return jsonResponse({ error: "Route not found" }, 404);
    }

    const isLimited = userEmail ? (await getAllowedChildren(env, userEmail))?.limited === true : false;
    return new Response(renderPortalHtml(userEmail, isLimited), { status: 200, headers: { "Content-Type": "text/html; charset=utf-8" } });
  }
};

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), { status, headers: { "Content-Type": "application/json" } });
}

async function safeJson(request) {
  try { return await request.json(); } catch (e) { return {}; }
}

function getSessionToken(request) {
  const cookie = request.headers.get("Cookie") || "";
  const match = cookie.match(/mac_session=([^;]+)/);
  return match ? match[1] : null;
}

async function getUserEmailFromSession(request, env) {
  const sessionToken = getSessionToken(request);
  if (!sessionToken || !env.PARENT_PERMISSIONS) return null;
  const raw = await env.PARENT_PERMISSIONS.get("session:" + sessionToken);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw);
    if (Date.now() > data.expires) {
      await env.PARENT_PERMISSIONS.delete("session:" + sessionToken);
      return null;
    }
    return data.email ? data.email.toLowerCase().trim() : null;
  } catch (e) { return null; }
}

function generateToken() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let token = "";
  for (let i = 0; i < 64; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

async function sendMagicLinkEmail({ apiKey, to, magicLink }) {
  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { "Authorization": "Bearer " + apiKey, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: "MAC Parent Portal <" + FROM_EMAIL + ">",
        to: [to],
        subject: "Your MAC Parent Portal Login Link",
        html: `
          <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px;">
            <img src="${MAC_LOGO_URL}" alt="MAC Logo" style="width:60px;height:60px;border-radius:50%;margin-bottom:16px;">
            <h2 style="color:#10069F;font-family:Georgia,serif;">Montessori Academy of Colorado</h2>
            <p style="color:#333;line-height:1.6;">Click the button below to sign in to the MAC Parent Portal. This link expires in 15 minutes and can only be used once.</p>
            <a href="${magicLink}" style="display:inline-block;background:#10069F;color:#F7D987;padding:14px 28px;border-radius:100px;text-decoration:none;font-weight:bold;font-size:16px;margin:16px 0;">Sign In to MAC Portal</a>
            <p style="color:#666;font-size:12px;margin-top:24px;">If you did not request this email, you can safely ignore it.</p>
            <p style="color:#666;font-size:12px;">Or copy this link: ${magicLink}</p>
          </div>
        `
      })
    });
    return response.ok;
  } catch (e) { return false; }
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
  const isAdmin = await isAdminEmail(env, email);
  if (isAdmin) return "*";
  const value = await env.PARENT_PERMISSIONS.get(email.toLowerCase().trim());
  if (!value) return null;
  if (value === "*") return "*";
  if (value.startsWith("limited:")) {
    const ids = value.slice(8).split(",").map(s => s.trim()).filter(Boolean);
    return { limited: true, ids };
  }
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

async function fetchClassroomNameMap({ schoolId, tcHeaders }) {
  try {
    const tcUrl = new URL("https://www.transparentclassroom.com/api/v1/classrooms.json");
    tcUrl.searchParams.set("school_id", schoolId);
    const response = await fetch(tcUrl.toString(), { method: "GET", headers: tcHeaders });
    const data = await response.json();
    const map = {};
    const items = Array.isArray(data) ? data : Array.isArray(data.classrooms) ? data.classrooms : [];
    items.forEach(function(c) { if (c && c.id) map[String(c.id)] = c.name || ""; });
    return map;
  } catch (e) { return {}; }
}

function normalizeChildren(data) {
  if (Array.isArray(data)) return data;
  if (data && Array.isArray(data.children)) return data.children;
  if (data && Array.isArray(data.data)) return data.data;
  return [];
}

function filterChildrenForUser(children, allowedChildren) {
  if (allowedChildren === "*") return children;
  const ids = allowedChildren && allowedChildren.limited ? allowedChildren.ids : (Array.isArray(allowedChildren) ? allowedChildren : []);
  const allowedSet = new Set(ids.map(String));
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
  const classroomName = child.classroom_name || child.classroomName || (child.classroom && child.classroom.name) || "";
  return {
    id: child.id,
    first_name: child.first_name || child.firstName || "",
    last_name: child.last_name || child.lastName || "",
    profile_photo: child.profile_photo || child.profilePhoto || "",
    classroom_id: singleClassroomId,
    classroom_ids: classroomIds,
    classroom_name: classroomName
  };
}

function canAccessChild(childId, allowedChildren) {
  if (allowedChildren === "*") return true;
  if (!allowedChildren) return false;
  if (Array.isArray(allowedChildren)) return allowedChildren.map(String).includes(String(childId));
  if (allowedChildren.limited) return allowedChildren.ids.includes(String(childId));
  return false;
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
  while (safety < 20) {
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
  const VERSION = "v202607081931";
  return `
var CACHE_NAME = "mac-portal-` + VERSION + `";
self.addEventListener("install", function(e) {
  self.skipWaiting();
});
self.addEventListener("activate", function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.filter(function(k) { return k !== CACHE_NAME; }).map(function(k) { return caches.delete(k); }));
    }).then(function() { return self.clients.claim(); })
  );
});
self.addEventListener("fetch", function(e) {
  if (e.request.method !== "GET") return;
  e.respondWith(fetch(e.request, { cache: "no-store" }));
});
`;
}

function escapeHtml(value) {
  return String(value || "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;");
}

function renderAuthErrorHtml(message) {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAC Parent Portal - Login Error</title>
<style>
body { font-family: Arial, sans-serif; background: #F5F5FA; color: #10069F; padding: 30px; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
.card { background: #fff; border-radius: 14px; padding: 32px; max-width: 440px; width: 100%; border: 1px solid #DDE0F5; text-align: center; }
img { width: 60px; height: 60px; border-radius: 50%; margin-bottom: 16px; }
h2 { font-family: Georgia, serif; color: #10069F; margin-bottom: 12px; }
p { color: #555; line-height: 1.6; margin-bottom: 20px; }
a { display: inline-block; background: #10069F; color: #F7D987; padding: 12px 24px; border-radius: 100px; text-decoration: none; font-weight: bold; }
</style>
</head>
<body>
<div class="card">
  <img src="${MAC_LOGO_URL}" alt="MAC Logo">
  <h2>Login Error</h2>
  <p>${escapeHtml(message)}</p>
  <a href="/">Back to Sign In</a>
</div>
</body>
</html>`;
}
function renderNotAdminHtml(email) {
  return "<!DOCTYPE html><html><head><meta charset=\"UTF-8\"><title>Admin Access Denied</title></head><body style=\"font-family:Arial,sans-serif;padding:30px;\"><h1 style=\"color:#10069F\">Admin Access Denied</h1><p>You are signed in as <strong>" + escapeHtml(email) + "</strong> but this account is not listed as an admin.</p><p><a href=\"/api/auth/logout\">Sign out</a></p></body></html>";
}

function getAdminJs() {
  return document.getElementById ? "" : "";
}

function renderAdminHtml(email) {
  var logoUrl = MAC_LOGO_URL;
  var adminEmail = escapeHtml(email);
  var style = "\n@import url(https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;600;700&display=swap);\n* { box-sizing:border-box; margin:0; padding:0; }\n:root { --blue:#10069F; --gold:#F7D987; --bg:#F5F5FA; --card:#fff; --muted:#6B6BA8; --border:#DDE0F5; --green:#2E9E6F; --red:#D94F3D; --amber:#D4830A; }\nbody { font-family:Nunito,sans-serif; background:var(--bg); color:#0D0B5C; min-height:100vh; }\n.header { background:var(--blue); padding:18px 20px; display:flex; align-items:center; gap:12px; }\n.header h1 { font-family:Cormorant Garamond,serif; font-size:24px; color:var(--gold); }\n.header a { margin-left:auto; color:rgba(247,217,135,.7); font-size:12px; text-decoration:none; }\n.main { padding:20px; max-width:800px; margin:0 auto; }\n.notice { padding:12px 16px; border-radius:10px; margin-bottom:16px; font-size:13px; font-weight:700; display:none; }\n.notice.success { background:rgba(46,158,111,.1); color:var(--green); display:block; }\n.notice.error { background:rgba(217,79,61,.1); color:var(--red); display:block; }\n.card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:20px; margin-bottom:16px; }\n.card h2 { font-family:Cormorant Garamond,serif; color:var(--blue); margin-bottom:10px; }\n.grid { display:grid; grid-template-columns:1fr; gap:10px; }\n.grid.two { grid-template-columns:1fr 1fr; }\nlabel { display:block; font-size:12px; font-weight:700; color:var(--muted); margin-bottom:4px; }\ninput, select, textarea { width:100%; padding:10px; border:1px solid var(--border); border-radius:8px; font-family:Nunito,sans-serif; font-size:14px; }\ninput::placeholder, textarea::placeholder { color:#C0C2D8; font-size:12px; }\nbutton { border:none; background:var(--blue); color:var(--gold); padding:10px 14px; border-radius:100px; font-family:Nunito,sans-serif; font-weight:700; cursor:pointer; font-size:13px; }\n@media(max-width:600px) { .grid.two { grid-template-columns:1fr; } }\n";
  var js = '\nvar adminState = { newsletters: [], calendar: [], admins: [] };\n\nfunction adminFetch(path, options) {\n  return fetch(path, Object.assign({ credentials: \'include\' }, options || {}));\n}\n\nfunction showNotice(message, type) {\n  var el = document.getElementById(\'admin-notice\');\n  el.className = \'notice \' + (type || \'success\');\n  el.textContent = message;\n}\n\nfunction loadAdmin() {\n  adminFetch(\'/api/admin/bootstrap\')\n  .then(function(r) { if (!r.ok) throw new Error(\'Bootstrap failed: \' + r.status); return r.json(); })\n  .then(function(data) {\n    adminState.newsletters = data.newsletters || [];\n    adminState.calendar = data.calendar || [];\n    adminState.admins = data.admins || [];\n    renderAdminLists();\n  })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction addNewsletter() {\n  var title = document.getElementById(\'newsletter-title\').value.trim();\n  var date = document.getElementById(\'newsletter-date\').value.trim();\n  var url = document.getElementById(\'newsletter-url\').value.trim();\n  if (!title || !date || !url) { showNotice(\'Please fill in all newsletter fields.\', \'error\'); return; }\n  adminFetch(\'/api/admin/newsletters/add\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ title: title, date: date, url: url }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) {\n    adminState.newsletters = d.newsletters || [];\n    document.getElementById(\'newsletter-title\').value = \'\';\n    document.getElementById(\'newsletter-date\').value = \'\';\n    document.getElementById(\'newsletter-url\').value = \'\';\n    renderAdminLists();\n    showNotice(\'Newsletter added.\', \'success\');\n  })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction deleteNewsletter(id) {\n  if (!confirm(\'Delete this newsletter?\')) return;\n  adminFetch(\'/api/admin/newsletters/delete\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ id: id }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) { adminState.newsletters = d.newsletters || []; renderAdminLists(); showNotice(\'Newsletter deleted.\', \'success\'); })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction addCalendarEvent() {\n  var title = document.getElementById(\'calendar-title\').value.trim();\n  var date = document.getElementById(\'calendar-date\').value.trim();\n  var endDate = document.getElementById(\'calendar-end-date\').value.trim();\n  var time = document.getElementById(\'calendar-time\').value.trim();\n  var location = document.getElementById(\'calendar-location\').value.trim();\n  var type = document.getElementById(\'calendar-type\').value.trim();\n  if (!title || !date || !type) { showNotice(\'Please fill in title, date, and type.\', \'error\'); return; }\n  adminFetch(\'/api/admin/calendar/add\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ title: title, date: date, endDate: endDate, time: time, location: location, type: type }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) {\n    adminState.calendar = d.calendar || [];\n    document.getElementById(\'calendar-title\').value = \'\';\n    document.getElementById(\'calendar-date\').value = \'\';\n    document.getElementById(\'calendar-end-date\').value = \'\';\n    document.getElementById(\'calendar-time\').value = \'\';\n    document.getElementById(\'calendar-location\').value = \'\';\n    document.getElementById(\'calendar-type\').value = \'\';\n    renderAdminLists();\n    showNotice(\'Calendar event added.\', \'success\');\n  })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction deleteCalendarEvent(id) {\n  if (!confirm(\'Delete this calendar event?\')) return;\n  adminFetch(\'/api/admin/calendar/delete\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ id: id }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) { adminState.calendar = d.calendar || []; renderAdminLists(); showNotice(\'Calendar event deleted.\', \'success\'); })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction openEditModal(id) {\n  var event = adminState.calendar.find(function(e) { return String(e.id) === String(id); });\n  if (!event) { showNotice(\'Event not found.\', \'error\'); return; }\n  document.getElementById(\'edit-event-id\').value = event.id;\n  document.getElementById(\'edit-title\').value = event.title || \'\';\n  document.getElementById(\'edit-date\').value = event.date || \'\';\n  document.getElementById(\'edit-end-date\').value = event.endDate || \'\';\n  document.getElementById(\'edit-time\').value = event.time || \'\';\n  document.getElementById(\'edit-location\').value = event.location || \'\';\n  document.getElementById(\'edit-type\').value = event.type || \'event\';\n  document.getElementById(\'edit-modal\').style.display = \'flex\';\n}\n\nfunction closeEditModal() {\n  document.getElementById(\'edit-modal\').style.display = \'none\';\n}\n\nfunction saveEditCalendarEvent() {\n  var id = document.getElementById(\'edit-event-id\').value;\n  var title = document.getElementById(\'edit-title\').value.trim();\n  var date = document.getElementById(\'edit-date\').value.trim();\n  var endDate = document.getElementById(\'edit-end-date\').value.trim();\n  var time = document.getElementById(\'edit-time\').value.trim();\n  var location = document.getElementById(\'edit-location\').value.trim();\n  var type = document.getElementById(\'edit-type\').value.trim();\n  if (!title || !date) { showNotice(\'Title and date are required.\', \'error\'); return; }\n  adminFetch(\'/api/admin/calendar/delete\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ id: id }) })\n  .then(function(r) { return r.json(); })\n  .then(function() {\n    return adminFetch(\'/api/admin/calendar/add\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ title: title, date: date, endDate: endDate, time: time, location: location, type: type }) });\n  })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) {\n    adminState.calendar = d.calendar || [];\n    renderAdminLists();\n    closeEditModal();\n    showNotice(\'Calendar event updated.\', \'success\');\n  })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction addAdmin() {\n  var email = document.getElementById(\'admin-email\').value.trim();\n  if (!email || !email.includes(\'@\')) { showNotice(\'Please enter a valid email.\', \'error\'); return; }\n  adminFetch(\'/api/admin/admins/add\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ email: email }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) { adminState.admins = d.admins || []; document.getElementById(\'admin-email\').value = \'\'; renderAdminLists(); showNotice(\'Admin added.\', \'success\'); })\n  .catch(function(e) { showNotice(e.message, \'error\'); });\n}\n\nfunction renderAdminLists() { renderNewsletterAdminList(); renderCalendarAdminList(); renderAdminEmailList(); }\n\nfunction renderNewsletterAdminList() {\n  var el = document.getElementById(\'newsletter-admin-list\');\n  if (!el) return;\n  if (!adminState.newsletters.length) { el.innerHTML = \'<p style="color:#6B6BA8;font-size:13px;">No newsletters yet.</p>\'; return; }\n  var showAll = el.dataset.showAll === \'true\';\n  var items = showAll ? adminState.newsletters : adminState.newsletters.slice(0, 5);\n  var html = \'\';\n  items.forEach(function(item) {\n    html += \'<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #DDE0F5;gap:10px;">\';\n    html += \'<div><div style="font-weight:700;color:#0D0B5C;">\' + escapeHtml(item.title || \'Newsletter\') + \'</div>\';\n    html += \'<div style="font-size:12px;color:#6B6BA8;">\' + escapeHtml(item.date || \'\') + \'</div>\';\n    html += \'<div style="font-size:12px;color:#6B6BA8;word-break:break-all;">\' + escapeHtml(item.url || \'\') + \'</div></div>\';\n    html += \'<button onclick="deleteNewsletter(this.dataset.id)" data-id="\' + escapeHtml(item.id) + \'" style="border:none;background:#D94F3D;color:#fff;padding:6px 12px;border-radius:100px;font-family:Nunito,sans-serif;font-weight:700;cursor:pointer;font-size:12px;white-space:nowrap;">Delete</button>\';\n    html += \'</div>\';\n  });\n  if (!showAll && adminState.newsletters.length > 5) {\n    html += \'<button onclick="var el=document.getElementById(\\\\\\"newsletter-admin-list\\\\\\");el.dataset.showAll=\\\\\\\'true\\\\\\\';renderNewsletterAdminList();" style="margin-top:10px;background:none;border:1px solid #DDE0F5;border-radius:100px;padding:6px 16px;color:#6B6BA8;font-family:Nunito,sans-serif;font-size:12px;cursor:pointer;">Show all \' + adminState.newsletters.length + \' newsletters</button>\';\n  } else if (showAll && adminState.newsletters.length > 5) {\n    html += \'<button onclick="var el=document.getElementById(\\\\\\"newsletter-admin-list\\\\\\");el.dataset.showAll=\\\\\\\'false\\\\\\\';renderNewsletterAdminList();" style="margin-top:10px;background:none;border:1px solid #DDE0F5;border-radius:100px;padding:6px 16px;color:#6B6BA8;font-family:Nunito,sans-serif;font-size:12px;cursor:pointer;">Show less</button>\';\n  }\n  el.innerHTML = html;\n}\n\nfunction renderCalendarAdminList() {\n  var el = document.getElementById(\'calendar-admin-list\');\n  if (!el) return;\n  if (!adminState.calendar.length) { el.innerHTML = \'<p style="color:#6B6BA8;font-size:13px;">No calendar events yet.</p>\'; return; }\n  var showAll = el.dataset.showAll === \'true\';\n  var items = showAll ? adminState.calendar : adminState.calendar.slice(0, 8);\n  var html = \'\';\n  items.forEach(function(item) {\n    html += \'<div style="display:flex;align-items:center;justify-content:space-between;padding:10px 0;border-bottom:1px solid #DDE0F5;gap:10px;">\';\n    html += \'<div><div style="font-weight:700;color:#0D0B5C;">\' + escapeHtml(item.title || \'Event\') + \'</div>\';\n    html += \'<div style="font-size:12px;color:#6B6BA8;">\' + escapeHtml(item.date || \'\') + (item.endDate ? \' - \' + escapeHtml(item.endDate) : \'\') + \' &middot; \' + escapeHtml(item.type || \'\') + (item.time ? \' &middot; \' + escapeHtml(item.time) : \'\') + (item.location ? \' &middot; \' + escapeHtml(item.location) : \'\') + \'</div></div>\';\n    html += \'<div style="display:flex;gap:6px;">\';\n    html += \'<button onclick="openEditModal(this.dataset.id)" data-id="\' + escapeHtml(item.id) + \'" style="border:none;background:#6B6BA8;color:#fff;padding:6px 12px;border-radius:100px;font-family:Nunito,sans-serif;font-weight:700;cursor:pointer;font-size:12px;white-space:nowrap;">Edit</button>\';\n    html += \'<button onclick="deleteCalendarEvent(this.dataset.id)" data-id="\' + escapeHtml(item.id) + \'" style="border:none;background:#D94F3D;color:#fff;padding:6px 12px;border-radius:100px;font-family:Nunito,sans-serif;font-weight:700;cursor:pointer;font-size:12px;white-space:nowrap;">Delete</button>\';\n    html += \'</div></div>\';\n  });\n  if (!showAll && adminState.calendar.length > 8) {\n    html += \'<button onclick="var el=document.getElementById(\\\\\\"calendar-admin-list\\\\\\");el.dataset.showAll=\\\\\\\'true\\\\\\\';renderCalendarAdminList();" style="margin-top:10px;background:none;border:1px solid #DDE0F5;border-radius:100px;padding:6px 16px;color:#6B6BA8;font-family:Nunito,sans-serif;font-size:12px;cursor:pointer;">Show all \' + adminState.calendar.length + \' events</button>\';\n  } else if (showAll && adminState.calendar.length > 8) {\n    html += \'<button onclick="var el=document.getElementById(\\\\\\"calendar-admin-list\\\\\\");el.dataset.showAll=\\\\\\\'false\\\\\\\';renderCalendarAdminList();" style="margin-top:10px;background:none;border:1px solid #DDE0F5;border-radius:100px;padding:6px 16px;color:#6B6BA8;font-family:Nunito,sans-serif;font-size:12px;cursor:pointer;">Show less</button>\';\n  }\n  el.innerHTML = html;\n}\n\nfunction renderAdminEmailList() {\n  var el = document.getElementById(\'admin-list\');\n  if (!el) return;\n  if (!adminState.admins.length) { el.innerHTML = \'<p style="color:#6B6BA8;font-size:13px;">No admins found.</p>\'; return; }\n  var html = \'\';\n  adminState.admins.forEach(function(email) {\n    html += \'<div style="display:flex;align-items:center;padding:10px 0;border-bottom:1px solid #DDE0F5;"><div style="font-weight:700;color:#0D0B5C;">\' + escapeHtml(email) + \'</div></div>\';\n  });\n  el.innerHTML = html;\n}\n\nfunction bulkImportParents() {\n  var raw = document.getElementById(\'bulk-csv\').value.trim();\n  var merge = document.getElementById(\'bulk-merge\').checked;\n  var resultsEl = document.getElementById(\'bulk-import-results\');\n  resultsEl.textContent = \'\';\n  if (!raw) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Please paste CSV data first.</span>\'; return; }\n  var rows = [];\n  var parseErrors = [];\n  raw.split(\'\\n\').forEach(function(line, i) {\n    line = line.trim();\n    if (!line) return;\n    var parts = line.split(\',\').map(function(p) { return p.trim(); });\n    var email = parts[0];\n    var childIds = parts.slice(1).filter(function(id) { return id.length > 0; });\n    if (!email || !email.includes(\'@\')) { parseErrors.push(\'Line \' + (i + 1) + \': invalid email\'); return; }\n    if (!childIds.length) { parseErrors.push(\'Line \' + (i + 1) + \': no child IDs for \' + email); return; }\n    rows.push({ email: email, childIds: childIds });\n  });\n  if (parseErrors.length) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Errors:<br>\' + parseErrors.map(escapeHtml).join(\'<br>\') + \'</span>\'; return; }\n  if (!rows.length) { resultsEl.innerHTML = \'<span style="color:#D94F3D">No valid rows found.</span>\'; return; }\n  var modeText = merge ? \'merge into\' : \'overwrite\';\n  if (!confirm(\'Import \' + rows.length + \' parent records (\' + modeText + \' existing)?\')) return;\n  resultsEl.innerHTML = \'Importing \' + rows.length + \' parents...\';\n  adminFetch(\'/api/admin/parents/import\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ rows: rows, merge: merge }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Import failed\'); return d; }); })\n  .then(function(d) {\n    var r = d.results;\n    var html = \'<span style="color:#2E9E6F">&#10003; Imported \' + r.imported + \' parents\' + (merge ? \' (merged)\' : \'\') + \'.</span>\';\n    if (r.skipped) html += \'<br><span style="color:#D4830A">\' + r.skipped + \' rows skipped.</span>\';\n    if (r.errors && r.errors.length) html += \'<br><span style="color:#D94F3D">\' + r.errors.map(escapeHtml).join(\'<br>\') + \'</span>\';\n    resultsEl.innerHTML = html;\n    document.getElementById(\'bulk-csv\').value = \'\';\n  })\n  .catch(function(e) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Import failed: \' + escapeHtml(e.message) + \'</span>\'; });\n}\n\nfunction addNewParent() {\n  var email1 = document.getElementById(\'new-parent-email1\').value.trim().toLowerCase();\n  var email2 = document.getElementById(\'new-parent-email2\').value.trim().toLowerCase();
  var email3 = document.getElementById(\'new-parent-email3\').value.trim().toLowerCase();\n  var childId1 = document.getElementById(\'new-child-id1\').value.trim();\n  var childId2 = document.getElementById(\'new-child-id2\').value.trim();\n  var childId3 = document.getElementById(\'new-child-id3\').value.trim();
  var childId4 = document.getElementById(\'new-child-id4\').value.trim();\n  var resultsEl = document.getElementById(\'new-parent-results\');\n  resultsEl.textContent = \'\';\n  if (!email1 || !email1.includes(\'@\')) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Please enter a valid email for Parent 1.</span>\'; return; }\n  if (email2 && !email2.includes(\'@\')) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Parent 2 email is not valid.</span>\'; return; }\n  if (!childId1) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Please enter at least one child ID.</span>\'; return; }\n  var childIds = [childId1, childId2, childId3, childId4].filter(function(id) { return id.length > 0; });\n  var emails = [email1, email2, email3].filter(function(e) { return e.length > 0; });\n  var isLimited = document.getElementById(\'new-parent-limited\').checked;\n  if (!confirm(\'Add family with \' + emails.length + \' parent(s) and \' + childIds.length + \' child(ren)?\')) return;\n  resultsEl.innerHTML = \'Adding family...\';\n  adminFetch(\'/api/admin/parents/add-family\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ emails: emails, childIds: childIds, limited: isLimited }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) {\n    var html = \'<span style="color:#2E9E6F">&#10003; Family added!</span><br>\';\n    d.added.forEach(function(item) { html += \'<span style="color:#6B6BA8;font-size:12px;">\' + escapeHtml(item.email) + \' - children: \' + escapeHtml(item.childIds.join(\', \')) + \'</span><br>\'; });\n    resultsEl.innerHTML = html;\n    document.getElementById(\'new-parent-email1\').value = \'\';\n    document.getElementById(\'new-parent-email2\').value = \'\';;
    document.getElementById(\'new-parent-email3\').value = \'\'  \n    document.getElementById(\'new-child-id1\').value = \'\';\n    document.getElementById(\'new-child-id2\').value = \'\';\n    document.getElementById(\'new-child-id3\').value = \'\';;
    document.getElementById(\'new-child-id4\').value = \'\' \n    document.getElementById(\'new-parent-limited\').checked = false;\n  })\n  .catch(function(e) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Error: \' + escapeHtml(e.message) + \'</span>\'; });\n}\n\nfunction addChildToParent() {\n  var email = document.getElementById(\'add-child-email\').value.trim();\n  var childId = document.getElementById(\'add-child-id\').value.trim();\n  var resultsEl = document.getElementById(\'add-child-results\');\n  resultsEl.textContent = \'\';\n  if (!email || !email.includes(\'@\')) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Please enter a valid email.</span>\'; return; }\n  if (!childId) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Please enter a child ID.</span>\'; return; }\n  adminFetch(\'/api/admin/parents/add-child\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ email: email, childId: childId }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function(d) {\n    resultsEl.innerHTML = \'<span style="color:#2E9E6F">&#10003; Child \' + escapeHtml(childId) + \' added to \' + escapeHtml(email) + \'. All children: \' + escapeHtml((d.childIds || []).join(\', \')) + \'</span>\';\n    document.getElementById(\'add-child-email\').value = \'\';\n    document.getElementById(\'add-child-id\').value = \'\';\n  })\n  .catch(function(e) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Error: \' + escapeHtml(e.message) + \'</span>\'; });\n}\n\nfunction deleteParent() {\n  var email = document.getElementById(\'delete-parent-email\').value.trim();\n  var resultsEl = document.getElementById(\'delete-parent-results\');\n  resultsEl.textContent = \'\';\n  if (!email || !email.includes(\'@\')) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Please enter a valid email.</span>\'; return; }\n  if (!confirm(\'Delete \' + email + \'? They will no longer be able to sign in.\')) return;\n  adminFetch(\'/api/admin/parents/delete\', { method: \'POST\', headers: { \'Content-Type\': \'application/json\' }, body: JSON.stringify({ email: email }) })\n  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || \'Failed\'); return d; }); })\n  .then(function() {\n    resultsEl.innerHTML = \'<span style="color:#2E9E6F">&#10003; \' + escapeHtml(email) + \' has been removed.</span>\';\n    document.getElementById(\'delete-parent-email\').value = \'\';\n  })\n  .catch(function(e) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Error: \' + escapeHtml(e.message) + \'</span>\'; });\n}\n\nfunction loadParentList() {\n  var resultsEl = document.getElementById(\'parent-list-results\');\n  resultsEl.innerHTML = \'Loading...\';\n  adminFetch(\'/api/admin/parents/list\')\n  .then(function(r) { return r.json(); })\n  .then(function(d) {\n    if (!d.parents || !d.parents.length) { resultsEl.innerHTML = \'No parents found.\'; return; }\n    var html = \'<strong>\' + d.count + \' parents registered:</strong><br><br>\';\n    d.parents.forEach(function(p) {\n      var pills = (p.childIds || []).map(function(id) { return \'<span style="background:#EEF0FA;color:#10069F;font-size:10px;font-weight:700;padding:2px 7px;border-radius:100px;margin-right:3px;display:inline-block;">\' + escapeHtml(id) + \'</span>\'; }).join(\'\'); html += \'<div style="padding:6px 0;border-bottom:1px solid #DDE0F5;display:flex;align-items:center;justify-content:space-between;gap:8px;"><span style="font-weight:700;font-size:12px;color:#0D0B5C;flex-shrink:0;">\' + escapeHtml(p.email) + \'</span><span style="flex-shrink:0;">\' + pills + \'</span></div>\';\n    });\n    resultsEl.innerHTML = html;\n  })\n  .catch(function(e) { resultsEl.innerHTML = \'<span style="color:#D94F3D">Error: \' + escapeHtml(e.message) + \'</span>\'; });\n}\n\nfunction escapeHtml(value) {\n  return String(value || \'\').replace(/&/g, \'&amp;\').replace(/</g, \'&lt;\').replace(/>/g, \'&gt;\');\n}\n\nloadAdmin();\n';

  return [
    "<!DOCTYPE html>",
    "<html>",
    "<head>",
    "<meta charset=\"UTF-8\">",
    "<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">",
    "<title>MAC Portal Admin</title>",
    "<style>" + style + "</style>",
    "</head>",
    "<body>",
    "<div class=\"header\">",
    "  <img src=\"" + logoUrl + "\" alt=\"MAC\" style=\"width:36px;height:36px;border-radius:50%;background:#fff;padding:2px;\">",
    "  <h1>MAC Portal Admin</h1>",
    "  <a href=\"/api/auth/logout\">Sign Out</a>",
    "</div>",
    "<div class=\"main\">",
    "  <div class=\"notice\" id=\"admin-notice\"></div>",
    "  <p style=\"font-size:13px;color:var(--muted);margin-bottom:16px;\">Signed in as " + adminEmail + "</p>",

    "  <div class=\"card\">",
    "    <h2>Add Newsletter</h2>",
    "    <div class=\"grid two\">",
    "      <div><label for=\"newsletter-title\">Title</label><input id=\"newsletter-title\" placeholder=\"MAC News - Week of ...\"></div>",
    "      <div><label for=\"newsletter-date\">Date</label><input id=\"newsletter-date\" type=\"date\"></div>",
    "    </div>",
    "    <div style=\"margin-top:10px;\"><label for=\"newsletter-url\">URL</label><input id=\"newsletter-url\" placeholder=\"https://...\"></div>",
    "    <button style=\"margin-top:10px;\" onclick=\"addNewsletter()\">Add Newsletter</button>",
    "    <div id=\"newsletter-admin-list\" style=\"margin-top:12px;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>Add Calendar Event</h2>",
    "    <div class=\"grid two\">",
    "      <div><label for=\"calendar-title\">Title</label><input id=\"calendar-title\" placeholder=\"Event name\"></div>",
    "      <div></div>",
    "      <div><label for=\"calendar-date\">Start Date</label><input id=\"calendar-date\" type=\"date\"></div>",
    "      <div><label for=\"calendar-end-date\">End Date, optional</label><input id=\"calendar-end-date\" type=\"date\"></div>",
    "      <div><label for=\"calendar-time\">Time, optional</label><input id=\"calendar-time\" placeholder=\"e.g. 6:00-8:00 PM\"></div>",
    "      <div><label for=\"calendar-location\">Location, optional</label><input id=\"calendar-location\" placeholder=\"e.g. MAC Gym\"></div>",
    "    </div>",
    "    <div style=\"margin-top:10px;\"><label for=\"calendar-type\">Type</label>",
    "      <select id=\"calendar-type\">",
    "        <option value=\"\" disabled selected>Select One</option>",
    "        <option value=\"event\">Event</option>",
    "        <option value=\"break\">Seasonal Break</option>",
    "        <option value=\"professional_learning\">Professional Learning</option>",
    "        <option value=\"holiday\">Holiday</option>",
    "        <option value=\"half_day\">Early Dismissal</option>",
    "        <option value=\"milestone\">First / Last Day</option>",
    "      </select>",
    "    </div>",
    "    <button style=\"margin-top:10px;\" onclick=\"addCalendarEvent()\">Add Calendar Event</button>",
    "    <div id=\"calendar-admin-list\" style=\"margin-top:12px;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>Bulk Import Parents</h2>",
    "    <p style=\"font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;\">One row per parent. First column is email, remaining columns are child IDs.</p>",
    "    <div class=\"grid\">",
    "      <div><label for=\"bulk-csv\">CSV data (email, child_id1, child_id2, ...)</label><textarea id=\"bulk-csv\" style=\"height:120px;resize:vertical;\" placeholder=\"jenny@email.com,12345\"></textarea></div>",
    "      <div style=\"display:flex;align-items:center;gap:10px;\"><input type=\"checkbox\" id=\"bulk-merge\" style=\"width:auto;\"><label for=\"bulk-merge\" style=\"font-size:13px;color:#0D0B5C;font-weight:600;margin:0;\">Merge mode - add to existing children instead of replacing</label></div>",
    "      <button onclick=\"bulkImportParents()\">Import Parents</button>",
    "    </div>",
    "    <div id=\"bulk-import-results\" style=\"margin-top:12px;font-size:13px;line-height:1.6;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>Add New Parent / Family</h2>",
    "    <p style=\"font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;\">Add a new family with up to 2 parent emails and up to 3 children. OR add an authorized pick up for the Limited Access version of the app.</p>",
    "    <div class=\"grid two\">",
    "      <div><label for=\"new-parent-email1\">Parent 1 Email</label><input id=\"new-parent-email1\" type=\"email\" placeholder=\"parent1@email.com\"></div>",
    "      <div><label for=\"new-parent-email2\">Parent 2 Email (optional)</label><input id=\"new-parent-email2\" type=\"email\" placeholder=\"parent2@email.com\"></div>",
    "      <div><label for=\"new-parent-email3\">Parent 3 / Additional Contact (optional)</label><input id=\"new-parent-email3\" type=\"email\" placeholder=\"contact@email.com\"></div>",
    "      <div><label for=\"new-child-id1\">Child ID 1</label><input id=\"new-child-id1\" placeholder=\"123456\"></div>",
    "      <div><label for=\"new-child-id2\">Child ID 2 (optional)</label><input id=\"new-child-id2\" placeholder=\"789012\"></div>",
    "      <div><label for=\"new-child-id3\">Child ID 3 (optional)</label><input id=\"new-child-id3\" placeholder=\"345678\"></div>",
    "      <div><label for=\"new-child-id4\">Child ID 4 (optional)</label><input id=\"new-child-id4\" placeholder=\"901234\"></div>",
    "      <div></div>",
    "    </div>",
    "    <div style=\"display:flex;align-items:center;justify-content:space-between;gap:12px;margin-top:12px;\">",
    "      <div style=\"display:flex;align-items:center;gap:10px;\"><input type=\"checkbox\" id=\"new-parent-limited\" style=\"width:auto;\"><label for=\"new-parent-limited\" style=\"font-size:13px;color:#0D0B5C;font-weight:600;margin:0;cursor:pointer;\">Limited Access (Sign In/Out Only)</label></div>",
    "      <button onclick=\"addNewParent()\">Add Family</button>",
    "    </div>",
    "    <div id=\"new-parent-results\" style=\"margin-top:12px;font-size:13px;line-height:1.6;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>Add Child to Existing Parent</h2>",
    "    <p style=\"font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;\">Add a sibling to a parent who is already registered.</p>",
    "    <div class=\"grid two\">",
    "      <div><label for=\"add-child-email\">Parent Email</label><input id=\"add-child-email\" placeholder=\"parent@email.com\"></div>",
    "      <div><label for=\"add-child-id\">Child ID to Add</label><input id=\"add-child-id\" placeholder=\"123456\"></div>",
    "    </div>",
    "    <button style=\"margin-top:10px;\" onclick=\"addChildToParent()\">Add Child</button>",
    "    <div id=\"add-child-results\" style=\"margin-top:12px;font-size:13px;line-height:1.6;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>Delete Parent</h2>",
    "    <p style=\"font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;\">Remove a parent access entirely.</p>",
    "    <div class=\"grid two\">",
    "      <div><label for=\"delete-parent-email\">Parent Email</label><input id=\"delete-parent-email\" placeholder=\"parent@email.com\"></div>",
    "      <div style=\"display:flex;align-items:end;\"><button onclick=\"deleteParent()\" style=\"background:#D94F3D;\">Delete Parent</button></div>",
    "    </div>",
    "    <div id=\"delete-parent-results\" style=\"margin-top:12px;font-size:13px;line-height:1.6;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>View All Parents</h2>",
    "    <p style=\"font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;\">See all registered parent emails and their child IDs.</p>",
    "    <button onclick=\"loadParentList()\">Load Parent List</button>",
    "    <div id=\"parent-list-results\" style=\"margin-top:12px;font-size:13px;line-height:1.6;max-height:300px;overflow-y:auto;\"></div>",
    "  </div>",

    "  <div class=\"card\">",
    "    <h2>Future Admins</h2>",
    "    <p style=\"font-size:13px;color:var(--muted);line-height:1.5;margin-bottom:12px;\">Add only trusted school staff.</p>",
    "    <div class=\"grid two\">",
    "      <div><label for=\"admin-email\">Admin Email</label><input id=\"admin-email\" placeholder=\"name@tmaoc.com\"></div>",
    "      <div style=\"display:flex;align-items:end;\"><button onclick=\"addAdmin()\">Add Admin</button></div>",
    "    </div>",
    "    <div id=\"admin-list\" style=\"margin-top:12px;\"></div>",
    "  </div>",

    "  <div id=\"edit-modal\" style=\"display:none;position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,.5);z-index:1000;align-items:center;justify-content:center;\">",
    "    <div style=\"background:#fff;border-radius:14px;padding:24px;max-width:500px;width:90%;max-height:90vh;overflow-y:auto;\">",
    "      <h2 style=\"font-family:Georgia,serif;color:#10069F;margin-bottom:16px;\">Edit Calendar Event</h2>",
    "      <input type=\"hidden\" id=\"edit-event-id\">",
    "      <div style=\"display:grid;gap:10px;\">",
    "        <div><label for=\"edit-title\">Title</label><input id=\"edit-title\"></div>",
    "        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">",
    "          <div><label for=\"edit-date\">Start Date</label><input id=\"edit-date\" type=\"date\"></div>",
    "          <div><label for=\"edit-end-date\">End Date</label><input id=\"edit-end-date\" type=\"date\"></div>",
    "        </div>",
    "        <div style=\"display:grid;grid-template-columns:1fr 1fr;gap:10px;\">",
    "          <div><label for=\"edit-time\">Time</label><input id=\"edit-time\" placeholder=\"e.g. 6:00-8:00 PM\"></div>",
    "          <div><label for=\"edit-location\">Location</label><input id=\"edit-location\" placeholder=\"e.g. MAC Gym\"></div>",
    "        </div>",
    "        <div><label for=\"edit-type\">Type</label><select id=\"edit-type\">",
    "          <option value=\"event\">Event</option>",
    "          <option value=\"break\">Seasonal Break</option>",
    "          <option value=\"professional_learning\">Professional Learning</option>",
    "          <option value=\"holiday\">Holiday</option>",
    "          <option value=\"half_day\">Early Dismissal</option>",
    "          <option value=\"milestone\">First / Last Day</option>",
    "        </select></div>",
    "        <div style=\"display:flex;gap:10px;margin-top:6px;\">",
    "          <button onclick=\"saveEditCalendarEvent()\" style=\"flex:1;\">Save Changes</button>",
    "          <button onclick=\"closeEditModal()\" style=\"flex:1;background:#6B6BA8;\">Cancel</button>",
    "        </div>",
    "      </div>",
    "    </div>",
    "  </div>",

    "</div>",
    "<script>",
    js,
    "</script>",
    "</body>",
    "</html>"
  ].join("\n");
}
function renderPortalHtml(userEmail, isLimited) {
  const isSignedIn = Boolean(userEmail);
  return `<!DOCTYPE html>
<html data-limited="${isLimited ? '1' : '0'}">
<head>
<meta charset="UTF-8">
<meta name="app-version" content="202607081931">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAC Parent Portal</title>
<link rel="manifest" href="/manifest.json">
<link rel="apple-touch-icon" href="${MAC_LOGO_URL}">
<meta name="theme-color" content="#10069F">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="MAC Portal">
<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
<style>
@import url(https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600;700&family=Nunito:wght@400;600;700&display=swap);
* { box-sizing: border-box; margin: 0; padding: 0; }
:root { --blue:#10069F; --gold:#F7D987; --bg:#F5F5FA; --card:#fff; --muted:#6B6BA8; --border:#DDE0F5; --green:#2E9E6F; --red:#D94F3D; --amber:#D4830A; --purple:#8787C0; --orange:#F79778; --yellow:#FCB63A; }
body { font-family:Nunito,sans-serif; background:var(--bg); color:#0D0B5C; min-height:100vh; }
.header { background:var(--blue); padding:18px 20px; display:flex; align-items:center; gap:12px; }
.school-name { font-family:Cormorant Garamond,serif; font-size:18px; font-weight:700; color:var(--gold); white-space:nowrap; }
.bottom-nav { position:fixed; bottom:0; left:0; right:0; background:#fff; border-top:1px solid var(--border); display:grid; grid-template-columns:repeat(3,1fr); z-index:100; padding:4px 6px env(safe-area-inset-bottom); gap:2px; }
.nav-item { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:3px; padding:6px 6px 8px; cursor:pointer; border:none; background:#ECEDF8; position:relative; border-bottom:1px solid var(--border); margin:4px 3px; border-radius:10px; }

.nav-item svg { width:20px; height:20px; stroke:#6B6BA8; stroke-width:2; fill:none; stroke-linecap:round; stroke-linejoin:round; transition:stroke .15s; }
.nav-item span { font-size:10px; color:#6B6BA8; font-weight:600; font-family:Nunito,sans-serif; }
.nav-item.active svg { stroke:var(--gold); }
.nav-item.active span { color:#fff; font-weight:700; }
.nav-item.active { background:#10069F; border-radius:10px; }
.nav-item.active .nav-dot { background:var(--gold); }
.nav-dot { position:absolute; bottom:4px; left:50%; transform:translateX(-50%); width:4px; height:4px; border-radius:50%; background:var(--blue); display:none; }
.nav-item.active .nav-dot { display:block; }
.nav-badge { position:absolute; top:5px; right:calc(50% - 16px); width:8px; height:8px; background:var(--red); border-radius:50%; border:1.5px solid #fff; display:none; }
.nav-badge.show { display:block; }
.main { padding:12px 16px; padding-bottom:130px; max-width:700px; margin:0 auto; }

.panel { display:none; } .panel.active { display:block; }
h1 { font-family:Cormorant Garamond,serif; font-size:24px; color:var(--blue); margin-bottom:4px; }
.sub { color:var(--muted); font-size:16px; margin-bottom:20px; }
.login-card { background:var(--card); border-radius:16px; padding:32px 24px; border:1px solid var(--border); text-align:center; max-width:420px; margin:40px auto; }
.login-card img { width:64px; height:64px; border-radius:50%; margin-bottom:16px; }
.login-card h2 { font-family:Cormorant Garamond,serif; color:var(--blue); font-size:26px; margin-bottom:8px; }
.login-card p { color:var(--muted); font-size:13px; line-height:1.5; margin-bottom:20px; }
.login-input { width:100%; padding:12px 14px; border:1.5px solid var(--border); border-radius:10px; font-family:Nunito,sans-serif; font-size:15px; margin-bottom:12px; outline:none; }
.login-input:focus { border-color:var(--blue); }
.login-btn { width:100%; background:var(--blue); color:var(--gold); border:none; border-radius:100px; padding:13px; font-family:Nunito,sans-serif; font-size:15px; font-weight:700; cursor:pointer; }
.login-btn:disabled { opacity:.6; cursor:not-allowed; }
.login-note { font-size:12px; color:var(--muted); margin-top:12px; line-height:1.5; }
.login-success { background:rgba(46,158,111,.08); border:1px solid rgba(46,158,111,.25); border-radius:10px; padding:14px; color:var(--green); font-size:13px; line-height:1.5; margin-top:12px; display:none; }
.login-error { background:rgba(217,79,61,.08); border:1px solid rgba(217,79,61,.25); border-radius:10px; padding:14px; color:var(--red); font-size:13px; line-height:1.5; margin-top:12px; display:none; }
.connected-box { background:rgba(16,6,159,.03); border:2px solid rgba(16,6,159,.2); border-radius:14px; padding:16px; margin-bottom:20px; }
.connected-row { display:flex; align-items:center; gap:8px; margin-bottom:4px; }
.tc-dot { width:10px; height:10px; border-radius:50%; background:var(--green); }
.tc-name { font-size:13px; font-weight:700; color:var(--blue); }
.disc-btn { background:none; border:1.5px solid var(--border); border-radius:7px; padding:4px 10px; font-size:11px; font-weight:700; color:var(--muted); cursor:pointer; margin-left:auto; }
.tc-info { font-size:13px; color:var(--muted); }
.chips { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:10px; }
.chip { display:flex; align-items:center; gap:6px; padding:5px 12px; border-radius:100px; border:2px solid var(--border); background:var(--card); cursor:pointer; font-size:12px; font-weight:600; color:var(--muted); }
.chip.active { border-color:var(--blue); background:rgba(16,6,159,.07); color:var(--blue); }
.chip-av { width:26px; height:26px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-weight:700; color:#fff; font-size:11px; }
.today-card { background:var(--card); border-radius:16px; padding:8px 22px; border:1px solid var(--border); margin-bottom:8px; text-align:center; }
.signin-status { margin-top:4px; font-size:11px; font-weight:700; padding:2px 10px; border-radius:100px; display:inline-block; }
.signin-status.in { background:#E8F5EF; color:#2E9E6F; }
.signin-status.out { background:#FEF0EE; color:#D94F3D; }
.today-label { font-size:11px; color:var(--muted); text-transform:uppercase; letter-spacing:1px; font-weight:700; margin-bottom:4px; }
.today-value { font-family:Cormorant Garamond,serif; font-size:34px; font-weight:700; line-height:1; color:var(--green); }
.today-status { font-size:14px; font-weight:700; color:var(--blue); margin-top:4px; }
.today-sub { font-size:12px; color:var(--muted); margin-top:4px; }
.action-card { background:#fff; border:2px solid var(--blue); border-radius:14px; padding:10px 18px; margin-bottom:10px; }
.action-card h3 { font-family:Cormorant Garamond,serif; color:var(--blue); font-size:17px; }
.action-card p { color:var(--muted); font-size:11px; margin-top:2px; }
.action-btn { background:var(--gold); border:none; border-radius:100px; padding:7px 18px; font-weight:700; font-size:13px; color:var(--blue); cursor:pointer; font-family:Nunito,sans-serif; white-space:nowrap; width:100%; margin-bottom:8px; }
.action-btn.secondary { background:#606CFF; color:#fff; border:none; }
.action-btn:disabled { opacity:.6; cursor:not-allowed; }
.quick-action-note { background:var(--card); border:1px solid var(--border); border-radius:12px; padding:12px; margin-bottom:20px; color:var(--muted); font-size:13px; line-height:1.4; display:none; }
.success-note { border-color:rgba(46,158,111,.35); color:var(--green); }
.error-note { border-color:rgba(217,79,61,.35); color:var(--red); }
.report-card, .form-card { background:var(--card); border:1px solid var(--border); border-radius:14px; padding:16px; margin-bottom:20px; }
.expand-btn { width:100%; background:var(--blue); color:var(--gold); border:none; border-radius:12px; padding:13px 14px; font-family:Nunito,sans-serif; font-size:14px; font-weight:700; cursor:pointer; display:flex; justify-content:space-between; align-items:center; text-align:left; }
.expand-btn span { font-size:20px; line-height:1; }
.expand-panel { display:none; margin-top:14px; }
.expand-panel.open { display:block; }
.report-options { display:grid; grid-template-columns:1fr; gap:8px; }
.report-btn { background:rgba(16,6,159,.07); color:var(--blue); border:1px solid rgba(16,6,159,.18); border-radius:12px; padding:11px 12px; font-size:13px; font-weight:700; font-family:Nunito,sans-serif; cursor:pointer; text-align:left; }
.form-grid { display:grid; grid-template-columns:1fr; gap:12px; }
.form-field label, .radio-group-title { display:block; font-size:14px; font-weight:700; color:var(--muted); margin-bottom:5px; }
.form-field input, .form-field select { width:100%; padding:8px; border:1px solid var(--border); border-radius:9px; font-family:Nunito,sans-serif; font-size:15px; box-sizing:border-box; }
.form-field select { background:#fff; }
.radio-options { display:grid; grid-template-columns:1fr; gap:7px; }
.radio-option { border:1px solid var(--border); border-radius:10px; background:#fff; padding:7px 10px; display:flex; gap:8px; align-items:center; font-size:15px; color:#0D0B5C; }
.radio-option input { width:auto; }
.billing-box { background:rgba(247,217,135,.35); border:1px solid rgba(212,131,10,.22); border-radius:12px; padding:12px; font-size:13px; line-height:1.5; color:#0D0B5C; }
.billing-box strong { color:var(--blue); display:block; margin-bottom:4px; }
.form-submit { width:100%; background:var(--blue); color:var(--gold); border:none; border-radius:100px; padding:11px 14px; font-size:15px; font-weight:700; font-family:Nunito,sans-serif; cursor:pointer; }
.announcement-card { background:var(--card); border-radius:12px; padding:14px 16px; border:1px solid var(--border); border-left:4px solid var(--blue); margin-bottom:10px; }
.announcement-meta { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px; }
.announcement-date { font-size:12px; color:var(--muted); }
.announcement-tag { font-size:10px; font-weight:700; padding:2px 8px; border-radius:100px; text-transform:uppercase; background:#D4EDDA; color:#155724; }
.announcement-title { font-size:17px; font-weight:700; color:var(--blue); margin-bottom:4px; }
.announcement-body { font-size:16px; line-height:1.6; color:#0D0B5C; white-space:pre-wrap; }
.announcement-source { font-size:13px; color:var(--muted); margin-bottom:8px; }
.act-card { background:var(--card); border-radius:12px; padding:14px 16px; border:1px solid var(--border); border-left:4px solid var(--blue); margin-bottom:10px; }
.act-meta { display:flex; align-items:center; justify-content:space-between; gap:8px; margin-bottom:6px; }
.act-date { font-size:12px; color:var(--muted); }
.act-tag { font-size:10px; font-weight:700; padding:2px 8px; border-radius:100px; text-transform:uppercase; background:#D4EDDA; color:#155724; }
.act-title { font-weight:700; color:var(--blue); margin-bottom:4px; }
.act-note { font-size:13px; line-height:1.5; color:#0D0B5C; white-space:pre-wrap; }
.activity-photos { display:grid; grid-template-columns:1fr; gap:12px; margin-top:10px; }
.activity-photo { display:block; width:100%; height:auto; object-fit:contain; border-radius:10px; margin-top:10px; border:1px solid var(--border); background:#fff; }
.placeholder { background:var(--card); border:2px dashed var(--border); border-radius:14px; padding:28px; text-align:center; color:var(--muted); }
.loading { color:var(--muted); font-size:13px; padding:20px; text-align:center; }
.newsletter-card { background:var(--card); border:1px solid var(--border); border-left:4px solid var(--blue); border-radius:12px; padding:13px 15px; display:flex; gap:12px; margin-bottom:10px; align-items:center; }
.newsletter-date-link { min-width:54px; text-align:center; text-decoration:none; font-size:13px; background:var(--gold); border-radius:10px; padding:8px 6px; display:block; }
.newsletter-date-link:hover { background:#f3cf67; }
.newsletter-month { font-size:10px; color:var(--muted); text-transform:uppercase; font-weight:700; }
.newsletter-day { font-family:Cormorant Garamond,serif; font-size:26px; font-weight:700; color:var(--blue); line-height:1; }
.newsletter-info { flex:1; }
.newsletter-title { font-size:17px; font-weight:700; color:var(--blue); }
.newsletter-note { font-size:11px; color:var(--muted); margin-top:3px; }
.calendar-actions { display:grid; grid-template-columns:1fr; gap:10px; margin-bottom:16px; }
.calendar-link { display:block; text-align:center; text-decoration:none; background:var(--blue); color:var(--gold); padding:10px 14px; border-radius:100px; font-weight:700; font-size:13px; }
.calendar-filters { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:14px; }
.calendar-filter { border:1.5px solid var(--border); background:var(--card); color:var(--muted); border-radius:100px; padding:6px 11px; font-size:11px; font-weight:700; cursor:pointer; }
.calendar-filter.active { background:var(--blue); color:var(--gold); border-color:var(--blue); }
.calendar-card { background:var(--card); border:1px solid var(--border); border-left:4px solid var(--blue); border-radius:12px; padding:13px 15px; display:flex; gap:12px; margin-bottom:10px; }
.calendar-card.event { border-left-color:#5634F1; }
.calendar-card.break { border-left-color:var(--yellow); }
.calendar-card.professional_learning { border-left-color:var(--orange); }
.calendar-card.holiday { border-left-color:var(--purple); }
.calendar-card.half_day { border-left-color:var(--green); }
.calendar-date-box { min-width:48px; text-align:center; }
.calendar-month { font-size:10px; color:var(--muted); text-transform:uppercase; font-weight:700; }
.calendar-day { font-family:Cormorant Garamond,serif; font-size:26px; font-weight:700; color:var(--blue); line-height:1; }
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
<style id="limited-style"></style>
</head>
<body>
<div class="header">
  <img src="${MAC_LOGO_URL}" alt="MAC Logo" style="width:42px;height:42px;border-radius:50%;background:#fff;padding:2px;flex-shrink:0;">
  <div class="school-name">Montessori Academy of Colorado</div>
  ${isSignedIn ? '<button onclick="refreshData()" style="margin-left:auto;background:rgba(247,217,135,.15);border:1px solid rgba(247,217,135,.35);border-radius:100px;padding:6px 12px;color:var(--gold);font-family:\'Nunito\',sans-serif;font-size:11px;font-weight:700;cursor:pointer;">&#8635; Refresh</button>' : ''}
</div>

${isSignedIn ? `
<div class="bottom-nav" id="nav">
  <button class="nav-item active" data-panel="dash" onclick="showPanel('dash')">
    <svg viewBox="0 0 24 24"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <span>Dashboard</span>
    <div class="nav-dot"></div>
  </button>
  <button class="nav-item" data-panel="activity" onclick="showPanel('activity');if(currentChildId)loadActivity(currentChildId);clearBadge('activity')">
    <svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
    <span>Photos</span>
    <div class="nav-badge" id="badge-activity"></div>
    <div class="nav-dot"></div>
  </button>
  <button class="nav-item" data-panel="announcements" onclick="showPanel('announcements');loadAnnouncements()">
    <svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
    <span>Announcements</span>
    <div class="nav-badge" id="badge-announcements"></div>
    <div class="nav-dot"></div>
  </button>
  <button class="nav-item" data-panel="newsletters" onclick="showPanel('newsletters');loadNewsletters()">
    <svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
    <span>Newsletter</span>
    <div class="nav-badge" id="badge-newsletters"></div>
    <div class="nav-dot"></div>
  </button>
  <button class="nav-item" data-panel="events" onclick="showPanel('events');loadCalendar()">
    <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    <span>Calendar</span>
    <div class="nav-badge" id="badge-events"></div>
    <div class="nav-dot"></div>
  </button>
  <button class="nav-item" data-panel="contact" onclick="showPanel('contact');if(!contactFormsPopulated){populateEmergencyProgramChangeForm();populateContactsForm();contactFormsPopulated=true;}">
    <svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.42 2 2 0 0 1 3.6 1.26h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9a16 16 0 0 0 6 6l1.06-.92a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
    <span>Resources</span>
    <div class="nav-dot"></div>
  </button>
</div>
` : ''}

<div class="main">

${!isSignedIn ? `
  <div class="login-card">
    <img src="${MAC_LOGO_URL}" alt="MAC Logo">
    <h2>MAC Parent Portal</h2>
    <p>Enter your email address to receive a secure sign-in link.</p>
    <input class="login-input" type="email" id="login-email" placeholder="your@email.com" autocomplete="email">
    <button class="login-btn" id="login-btn" onclick="requestMagicLink()">Send Sign-In Link</button>
    <div class="login-success" id="login-success">
      &#10003; Check your email! We sent a sign-in link to <strong id="login-email-sent"></strong>.<br><br>Click the link in the email to sign in. It expires in 15 minutes.
    </div>
    <div class="login-error" id="login-error"></div>
    <p class="login-note">Only registered MAC families can sign in. Contact <a href="mailto:montessoriacademy@tmaoc.com">montessoriacademy@tmaoc.com</a> if you need help.</p>
  </div>
` : `
  <section class="panel active" id="panel-dash">
    <h1>Hello &#128075;</h1>
    <div class="sub">Montessori Academy of Colorado &middot; Parent Portal</div>
    <div class="connected-box">
      <div class="connected-row">
        <span class="tc-dot"></span>
        <span class="tc-name">Signed in as ${escapeHtml(userEmail)}</span>
        <button class="disc-btn" onclick="signOut()">Sign Out</button>
      </div>
      <div class="tc-info">Connected to Transparent Classroom through MAC Parent Portal.</div>
    </div>
    <div id="child-chips" class="chips"><div class="loading">Loading...</div></div>
    <div class="today-card">
      <div class="today-label">Today's Attendance</div>
      <div class="today-value" id="attendance-val">--</div>
      <div class="today-status" id="attendance-status">Not loaded</div>
      <div class="today-sub" id="attendance-sub">Today</div>
      <div class="signin-status" id="signin-status"></div>
    </div>
    <div class="quick-action-note" id="quick-action-note"></div>
    <div class="action-card">
      <h3>Daily Attendance</h3>
      <p>Use these buttons to sign your selected child in or out.</p>
    </div>
    <button class="action-btn" id="sign-in-btn" onclick="submitAttendanceAction('dropoff')">Sign In Child</button>
    <button class="action-btn secondary" id="sign-out-btn" onclick="submitAttendanceAction('pickup')">Sign Out Child</button>
    <button class="action-btn" style="background:#FEF0EE;color:#D94F3D;margin-top:4px;" onclick="reportSickAbsence()">Report Sick Absence</button>

  </section>

  <section class="panel" id="panel-activity">
    <h1>Classroom Activity</h1>
    <div class="sub">Photos are from Transparent Classroom. Press and hold a photo to save it to your phone.</div>
    <div id="activity-chips" class="chips"></div>
    <div id="activity-content">
      <div class="placeholder">
        <div style="font-size:28px;margin-bottom:8px">&#128203;</div>
        <div style="font-weight:700;color:var(--blue);margin-bottom:4px">Select a child above</div>
        <div style="font-size:12px">Then switch to this tab to see their activity.</div>
      </div>
    </div>
  </section>

  <section class="panel" id="panel-announcements">
    <h1>School Announcements</h1>
    <div class="sub">School-wide and classroom specific messages from MAC.</div>
    <div id="announcement-list"><div class="loading">Loading...</div></div>
  </section>

  <section class="panel" id="panel-newsletters">
    <h1>Weekly Newsletter</h1>
    <div class="sub">Weekly MAC News email archive.</div>
    <div id="newsletter-list"><div class="loading">Loading newsletters...</div></div>
  </section>

  <section class="panel" id="panel-events">
    <h1>School Calendar</h1>
    <div class="sub">Important dates from the school calendar. Please refresh for the most accurate information. You may also filter dates by type below.</div>
    <div class="calendar-actions">
      <a class="calendar-link" href="https://www.montessoriacademyofcolorado.org/about/calendar" target="_blank" rel="noopener">View Full MAC Calendar</a>
    </div>
    <div class="calendar-filters" id="calendar-filters">
      <button class="calendar-filter active" data-filter="all">All</button>
      <button class="calendar-filter" data-filter="school_closed">School Closed</button>
      <button class="calendar-filter" data-filter="event">Events</button>
      <button class="calendar-filter" data-filter="break">Breaks</button>
      <button class="calendar-filter" data-filter="professional_learning">PD Days</button>
      <button class="calendar-filter" data-filter="holiday">Holidays</button>
      <button class="calendar-filter" data-filter="half_day">Early Dismissal</button>
      <button class="calendar-filter" data-filter="milestone">First/Last</button>
    </div>
    <div style="margin-bottom:12px;">
      <label style="font-size:12px;color:var(--muted);font-weight:600;cursor:pointer;">
        <input type="checkbox" id="show-past-events" onchange="renderCalendar()" style="margin-right:5px;">
        Show past events
      </label>
    </div>
    <div id="calendar-list"><div class="loading">Loading calendar...</div></div>
  </section>

  <section class="panel" id="panel-contact">
    <h1>Resources</h1>
    <div class="sub">Helpful contacts and frequently requested forms.</div>
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
    <div style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">Quick Links</div>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:16px;">
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:10px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;text-align:center;" onclick="window.open('https://docs.google.com/forms/d/e/1FAIpQLScZgqKg2O2eSrt8xmeCSZgV8KFxjGYW8E2KKdkEo-QLvBXxRw/viewform','_blank')">
        <div style="width:34px;height:34px;background:#FEF0EE;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🤒</div>
        <div style="font-size:12px;font-weight:700;color:#D94F3D;line-height:1.3;">Report Student Illness</div>
      </div>
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:10px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;text-align:center;" onclick="window.open('https://montessoriacademyofcolorado.fsenrollment.com/users/sign_in','_blank')">
        <div style="width:34px;height:34px;background:#EEF0FA;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🔗</div>
        <div style="font-size:12px;font-weight:700;color:#10069F;line-height:1.3;">FinalSite Enrollment Portal</div>
      </div>
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:10px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;opacity:0.6;">
        <div style="width:34px;height:34px;background:#EEF0FA;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🏫</div>
        <div style="font-size:12px;font-weight:700;color:#10069F;line-height:1.3;">Magnus</div>
        <div style="font-size:10px;color:var(--muted);font-weight:700;background:#EEF0FA;padding:2px 8px;border-radius:100px;">Coming Soon</div>
      </div>
      <div style="background:var(--card);border:1.5px solid var(--border);border-radius:14px;padding:10px 8px;display:flex;flex-direction:column;align-items:center;gap:6px;cursor:pointer;text-align:center;" onclick="window.open('https://sideline.bsnsports.com/schools/colorado/denver/montessori-academy-of-colorado','_blank')">
        <div style="width:34px;height:34px;background:#E8F5EF;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:16px;">🛍️</div>
        <div style="font-size:12px;font-weight:700;color:#2E9E6F;line-height:1.3;">School Store</div>
      </div>
    </div>

    <div style="font-size:11px;font-weight:700;color:var(--muted);letter-spacing:1px;text-transform:uppercase;margin-bottom:10px;">Forms</div>
    <div style="background:var(--card);border:1.5px solid var(--border);border-radius:14px;overflow:hidden;margin-bottom:20px;">

    <div class="form-card" style="border-radius:0;border:none;border-bottom:1px solid var(--border);margin-bottom:0;">
      <button id="epc-expand-btn" class="expand-btn" onclick="toggleSection('emergency-program-change-panel', this)" style="padding:10px 14px;background:#10069F;color:#fff;">
        <span style="display:flex;align-items:center;gap:10px;"><span style="width:28px;height:28px;background:rgba(255,255,255,.15);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">📋</span><span><span style="display:block;font-size:14px;font-weight:700;color:#fff;">Emergency Program Change</span><span style="display:block;font-size:11px;color:rgba(247,217,135,.8);margin-top:2px;font-weight:400;">One-time program change request</span></span></span> <span class="toggle-icon" style="color:#F7D987;">+</span>
      </button>
      <div id="emergency-program-change-panel" class="expand-panel">
        <p style="color:var(--muted);font-size:12px;line-height:1.4;margin-bottom:12px;">Use this form for same-day or urgent program changes. When possible, please provide at least 24 hours notice. If this change applies to all siblings, please check the box at the bottom before submitting. By submitting the form you are agreeing to the billing notice below. The total amount will be added to your ledger.</p>
        <div class="form-grid">
          <div class="form-field"><label for="epc-student-select">Student's Name</label><select id="epc-student-select"></select></div>
          <div class="form-field"><label for="epc-classroom">Student's Classroom</label><input id="epc-classroom" placeholder="Classroom name" readonly></div>
          <div class="form-field"><label for="epc-requester">Name of Person Requesting Change</label><input id="epc-requester" placeholder="Your name"></div>
          <div class="form-field"><label for="epc-change-date">Date of Emergency Program Change</label><input id="epc-change-date" type="date" style="width:100%;box-sizing:border-box;"></div>
          <div>
            <div class="radio-group-title">Student's Regular Program Hours</div>
            <div class="radio-options">
              <label class="radio-option"><input type="radio" name="epc-hours" value="8:15-3:15"> 8:15-3:15</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="8:15-4:30"> 8:15-4:30</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="8:15-5:30"> 8:15-5:30</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="7:30-3:15"> 7:30-3:15</label>
              <label class="radio-option"><input type="radio" name="epc-hours" value="7:30-4:30"> 7:30-4:30</label>
            </div>
          </div>
          <div>
            <div class="radio-group-title">Select One-Time Program Change</div>
            <div class="radio-options">
              <label class="radio-option"><input type="radio" name="epc-time" value="Pick up at 4:30 pm"> Pick up at 4:30 pm</label>
              <label class="radio-option"><input type="radio" name="epc-time" value="Pick up at 5:30 pm"> Pick up at 5:30 pm</label>
              <label class="radio-option"><input type="radio" name="epc-time" value="Drop off at 7:30 am"> Drop off at 7:30 am</label>
            </div>
          </div>
          <div class="billing-box">
            <strong>Billing Notice</strong>
            $30/day to add Before School, 7:30-8:15<br>
            $30/day to add 4:30 pick-up, 3:15-4:30<br>
            $60/day to add 5:30 pick-up, 3:15-5:30<br>
            $30/day if already a 4:30 pick-up
          </div>
          <div class="quick-action-note" id="emergency-form-note"></div>
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:13px;color:#0D0B5C;font-weight:600;cursor:pointer;">
            <input type="checkbox" id="epc-apply-siblings"> Apply to all siblings
          </label>
          <button class="form-submit" id="epc-submit" onclick="submitEmergencyProgramChange()">Submit Emergency Program Change</button>
        </div>
      </div>
    </div>
    <div class="form-card" style="border-radius:0;border:none;border-bottom:1px solid var(--border);margin-bottom:0;">
      <button id="contacts-expand-btn" class="expand-btn" onclick="toggleSection('contacts-form-panel', this)" style="padding:10px 14px;background:#10069F;color:#fff;">
        <span style="display:flex;align-items:center;gap:10px;"><span style="width:28px;height:28px;background:rgba(255,255,255,.15);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">👥</span><span><span style="display:block;font-size:14px;font-weight:700;color:#fff;">Add Approved Adults &amp; Contacts</span><span style="display:block;font-size:11px;color:rgba(247,217,135,.8);margin-top:2px;font-weight:400;">Pickup &amp; emergency contacts</span></span></span> <span class="toggle-icon" style="color:#F7D987;">+</span>
      </button>
      <div id="contacts-form-panel" class="expand-panel">
        <p style="color:var(--muted);font-size:12px;line-height:1.4;margin-bottom:12px;">Use this form to add or update people approved to pick up your child, and emergency contacts. If this applies to all siblings, please check the box at the bottom before submitting. MAC will update Transparent Classroom on your behalf.</p>
        <div class="form-grid">
          <div class="form-field"><label for="contacts-student-select">Student's Name</label><select id="contacts-student-select"></select></div>
          <div class="form-field"><label for="contacts-classroom">Student's Classroom</label><input id="contacts-classroom" readonly></div>
          <div class="form-field"><label for="contacts-requester">Your Name (Parent/Guardian)</label><input id="contacts-requester" placeholder="Your name"></div>
          <div style="border-top:1px solid var(--border);padding-top:12px;margin-top:4px;">
            <div style="font-weight:700;color:var(--blue);font-size:14px;margin-bottom:8px;">New Approved Pickup</div>
          </div>
          <div class="form-field"><label for="pickup-name">Full Name</label><input id="pickup-name" placeholder="Full name"></div>
          <div class="form-field"><label for="pickup-phone">Phone Number</label><input id="pickup-phone" type="tel" placeholder="(303) 555-0100"></div>
          <div class="form-field"><label for="pickup-relationship">Relationship to Child</label><input id="pickup-relationship" placeholder="e.g. Grandparent, Babysitter"></div>
          <div style="border-top:1px solid var(--border);padding-top:12px;margin-top:4px;">
            <div style="font-weight:700;color:var(--blue);font-size:14px;margin-bottom:8px;">New Emergency Contact</div>
          </div>
          <div class="form-field"><label for="emergency-name">Full Name</label><input id="emergency-name" placeholder="Full name"></div>
          <div class="form-field"><label for="emergency-phone">Phone Number</label><input id="emergency-phone" type="tel" placeholder="(303) 555-0100"></div>
          <div class="form-field"><label for="emergency-relationship">Relationship to Child</label><input id="emergency-relationship" placeholder="e.g. Aunt, Family Friend"></div>
          <div class="quick-action-note" id="contacts-form-note"></div>
          <label style="display:flex;align-items:center;gap:8px;margin-bottom:12px;font-size:13px;color:#0D0B5C;font-weight:600;cursor:pointer;">
            <input type="checkbox" id="contacts-apply-siblings"> Apply to all siblings
          </label>
          <button class="form-submit" id="contacts-submit" onclick="submitContactsUpdate()">Submit Update</button>
        </div>
      </div>
    </div>

    <div class="form-card" style="border-radius:0;border:none;border-bottom:1px solid rgba(255,255,255,.1);margin-bottom:0;">
      <button class="expand-btn" onclick="toggleSection('keyfob-panel', this)" style="padding:10px 14px;background:#10069F;color:#fff;">
        <span style="display:flex;align-items:center;gap:10px;"><span style="width:28px;height:28px;background:rgba(255,255,255,.15);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">🔑</span><span><span style="display:block;font-size:14px;font-weight:700;color:#fff;">Key Fob Replacement</span><span style="display:block;font-size:11px;color:rgba(247,217,135,.8);margin-top:2px;font-weight:400;">$20 replacement fee per fob</span></span></span> <span class="toggle-icon" style="color:#F7D987;">+</span>
      </button>
      <div id="keyfob-panel" class="expand-panel">
        <p style="color:var(--muted);font-size:13px;margin-bottom:14px;line-height:1.6;">Each family receives key fobs upon enrollment. If you need to request an additional key fob, a <strong>$20 replacement fee</strong> will be added to your ledger.<br><br>Your new key fob will be available for pickup at the front desk in a labeled envelope once it's ready.</p>
        <div class="form-field"><label>Name of Person Requesting</label><input id="keyfob-requester" placeholder="Your full name"></div>
        <div class="form-field"><label>Number of Additional Key Fobs Requested</label>
          <select id="keyfob-quantity">
            <option value="">Select quantity</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        <button class="form-submit" onclick="submitKeyFobRequest()">Submit Request</button>
      </div>
    </div>

    <div class="form-card" style="border-radius:0;border:none;margin-bottom:0;">
      <button class="expand-btn" onclick="toggleSection('limited-access-panel', this)" style="padding:10px 14px;background:#10069F;color:#fff;">
        <span style="display:flex;align-items:center;gap:10px;"><span style="width:28px;height:28px;background:rgba(255,255,255,.15);border-radius:6px;display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;">📲</span><span><span style="display:block;font-size:14px;font-weight:700;color:#fff;">Request Limited Access App</span><span style="display:block;font-size:11px;color:rgba(247,217,135,.8);margin-top:2px;font-weight:400;">For regular non-parent/guardian pickups</span></span></span> <span class="toggle-icon" style="color:#F7D987;">+</span>
      </button>
      <div id="limited-access-panel" class="expand-panel">
        <p style="color:var(--muted);font-size:13px;margin-bottom:14px;line-height:1.6;">Complete this form to request that an authorized pick up can access a version of the app that only shows sign in and sign out options, no other student data.</p>
        <div class="form-field"><label>Full Name of Person to Authorize</label><input id="limited-name" placeholder="Full name"></div>
        <div class="form-field"><label>Email Address</label><input id="limited-email" type="email" placeholder="email@example.com"></div>
        <div class="form-field"><label>Relationship to Child</label><input id="limited-relationship" placeholder="e.g. Nanny, Grandparent, Au Pair"></div>
        <button class="form-submit" onclick="submitLimitedAccessRequest()">Submit Request</button>
      </div>
    </div>

    </div>

  </section>
`}

</div>

<script>
${!isSignedIn ? `
function requestMagicLink() {
  var email = document.getElementById('login-email').value.trim();
  var btn = document.getElementById('login-btn');
  var successEl = document.getElementById('login-success');
  var errorEl = document.getElementById('login-error');
  var emailSentEl = document.getElementById('login-email-sent');
  successEl.style.display = 'none';
  errorEl.style.display = 'none';
  if (!email || !email.includes('@')) {
    errorEl.style.display = 'block';
    errorEl.textContent = 'Please enter a valid email address.';
    return;
  }
  btn.disabled = true;
  btn.textContent = 'Sending...';
  fetch('/api/auth/request', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
  })
  .then(function(r) { return r.json(); })
  .then(function(data) {
    btn.disabled = false;
    btn.textContent = 'Send Sign-In Link';
    if (data.ok === false) {
      errorEl.style.display = 'block';
      errorEl.textContent = data.error || 'This email is not registered.';
    } else {
      successEl.style.display = 'block';
      emailSentEl.textContent = email;
    }
  })
  .catch(function(e) {
    btn.disabled = false;
    btn.textContent = 'Send Sign-In Link';
    errorEl.style.display = 'block';
    errorEl.textContent = 'Something went wrong. Please try again.';
  });
}
document.getElementById('login-email').addEventListener('keydown', function(e) {
  if (e.key === 'Enter') requestMagicLink();
});
` : `
var IS_LIMITED_ACCESS = document.documentElement.getAttribute('data-limited') === '1';
var tcChildren = [];
var currentChildId = null;
var calendarEvents = [];
var calendarFilter = 'all';
var calendarLoaded = false;
var newslettersLoaded = false;
var announcementsLoaded = false;
var contactFormsPopulated = false;
var announcementsLoading = false;
var cachedSiblingIds = null;
var tcActivityItems = [];
var newsletterArchives = [];
var announcements = [];

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
  var icon = button ? button.querySelector('.toggle-icon') : null;
  if (icon) icon.textContent = isOpen ? '+' : '-';
}

function workerFetch(path, options) { return fetch(path, Object.assign({ credentials: 'include' }, options || {})); }
function signOut() { window.location.href = '/api/auth/logout'; }
function refreshData() {
  calendarLoaded = false;
  newslettersLoaded = false;
  announcementsLoaded = false;
  announcementsLoading = false;
  cachedSiblingIds = null;
  contactFormsPopulated = false;
  loadCalendar();
  loadNewsletters();
  loadAnnouncements();
}

function getLastVisit() {
  try { return parseInt(localStorage.getItem('mac_last_visit') || '0'); } catch(e) { return 0; }
}
function saveLastVisit() {
  try { localStorage.setItem('mac_last_visit', String(Date.now())); } catch(e) {}
}
function clearBadge(panelName) {
  var badge = document.getElementById('badge-' + panelName);
  if (badge) badge.classList.remove('show');
  if (panelName === 'announcements' || panelName === 'newsletters' || panelName === 'events') {
    saveLastVisit();
  }

}
function checkBadges() {
  var lastVisit = getLastVisit();
  if (!lastVisit) { saveLastVisit(); return; }

  // Announcements badge
  if (announcements.length) {
    var hasNew = announcements.some(function(a) { return new Date(a.createdAt).getTime() > lastVisit; });
    var badge = document.getElementById('badge-announcements');
    if (badge && hasNew) badge.classList.add('show');
  }

  // Newsletter badge - check by added timestamp in id or fallback to date
  if (newsletterArchives.length) {
    var hasNewNewsletter = newsletterArchives.some(function(n) {
      var id = String(n.id || '');
      var parts = id.split('-');
      if (parts.length >= 4) {
        var ts = parseInt(parts[parts.length - 1]);
        if (!isNaN(ts) && ts > lastVisit) return true;
      }
      var d = parseLocalDate(n.date);
      return d && d.getTime() > lastVisit;
    });
    var newsletterBadge = document.getElementById('badge-newsletters');
    if (newsletterBadge && hasNewNewsletter) newsletterBadge.classList.add('show');
  }

  // Calendar badge
  if (calendarEvents.length) {
    var hasNewEvent = calendarEvents.some(function(ev) {
      var id = String(ev.id || '');
      var parts = id.split('-');
      if (parts.length >= 4) {
        var ts = parseInt(parts[parts.length - 1]);
        return !isNaN(ts) && ts > lastVisit;
      }
      return false;
    });
    var calBadge = document.getElementById('badge-events');
    if (calBadge && hasNewEvent) calBadge.classList.add('show');
  }

  // Photos badge - check activity items by created_at
  if (tcActivityItems && tcActivityItems.length) {
    var hasNewPhoto = tcActivityItems.some(function(item) {
      return item.created_at && new Date(item.created_at).getTime() > lastVisit;
    });
    var actBadge = document.getElementById('badge-activity');
    if (actBadge && hasNewPhoto) actBadge.classList.add('show');
  }
}

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
function showContactsFormNote(message, type) {
  var note = document.getElementById('contacts-form-note');
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
  .then(function() {
    showActionNote('<strong>Success.</strong><br>' + escapeHtml(childName) + ' was ' + (action === 'dropoff' ? 'signed in' : 'signed out') + '.', 'success');
    var statusEl = document.getElementById('signin-status');
    var today = getLocalDateString();
    try {
      localStorage.setItem('mac_signin_' + currentChildId, JSON.stringify({ action: action, date: today, ts: Date.now() }));
    } catch(e) {}
    if (action === 'dropoff') {
      document.getElementById('attendance-val').textContent = 'P';
      document.getElementById('attendance-status').textContent = 'Present';
      if (statusEl) { statusEl.textContent = 'Currently Signed In'; statusEl.className = 'signin-status in'; }
    } else {
      document.getElementById('attendance-val').textContent = 'P';
      document.getElementById('attendance-status').textContent = 'Present';
      if (statusEl) { statusEl.textContent = 'Currently Signed Out'; statusEl.className = 'signin-status out'; }
    }
  })
  .catch(function(e) { showActionNote('<strong>Could not complete request.</strong><br>' + escapeHtml(e.message), 'error'); })
  .finally(function() { setActionButtonsDisabled(false); });
}

function reportSickAbsence() {
  if (!currentChildId) { showActionNote('Please select a child first.', 'error'); return; }
  var childName = getCurrentChildName();
  if (!window.confirm('Mark ' + childName + ' as sick today and open the illness report form?')) return;
  showActionNote('Submitting sick report...', '');
  var classroomId = getCurrentChildClassroomId();
  workerFetch('/api/attendance-report', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ child_id: currentChildId, classroom_id: classroomId || undefined, reportType: 'sick' }) })
  .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Request failed.'); return data; }); })
  .then(function() {
    showActionNote('<strong>Submitted.</strong><br>' + escapeHtml(childName) + ' has been marked as Sick Today.', 'success');
    document.getElementById('attendance-val').textContent = 'S';
    document.getElementById('attendance-status').textContent = 'Sick / Sent Home';
    var statusEl = document.getElementById('signin-status');
    if (statusEl) { statusEl.textContent = 'Reported Sick'; statusEl.className = 'signin-status out'; }
    try { localStorage.setItem('mac_signin_' + currentChildId, JSON.stringify({ action: 'sick', date: getLocalDateString(), ts: Date.now() })); } catch(e) {}
    window.open('https://docs.google.com/forms/d/e/1FAIpQLScZgqKg2O2eSrt8xmeCSZgV8KFxjGYW8E2KKdkEo-QLvBXxRw/viewform', '_blank');
  })
  .catch(function(e) { showActionNote('<strong>Could not submit report.</strong><br>' + escapeHtml(e.message), 'error'); });
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
  workerFetch('/api/children')
  .then(function(r) {
    if (r.status === 401) { window.location.href = '/'; return; }
    if (!r.ok) throw new Error('Connection failed. Status: ' + r.status);
    return r.json();
  })
  .then(function(data) {
    if (!data) return;
    var children = normalizeChildren(data);
    if (!children.length) { document.getElementById('child-chips').innerHTML = '<div style="color:var(--muted);font-size:13px;">No children found for this account.</div>'; return; }
    renderChildren(children);
  })
  .catch(function(e) { document.getElementById('child-chips').innerHTML = '<div style="color:var(--red);font-size:13px;">Could not load children: ' + escapeHtml(e.message) + '</div>'; });
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
  if (!IS_LIMITED_ACCESS) {
    loadNewsletters();
    loadCalendar();
  }
  if (IS_LIMITED_ACCESS) {
    var nav = document.getElementById('nav');
    if (nav) nav.style.display = 'none';
    document.querySelectorAll('.main').forEach(function(el) { el.style.paddingBottom = '20px'; });
    var limitedNote = document.createElement('div');
    limitedNote.style.cssText = 'background:#EEF0FA;border-radius:12px;padding:12px 14px;margin-bottom:14px;font-size:13px;color:#10069F;font-weight:600;text-align:center;';
    limitedNote.textContent = 'Sign In / Sign Out Access Only';
    var dashContent = document.getElementById('panel-dash');
    if (dashContent) dashContent.insertBefore(limitedNote, dashContent.firstChild);
  }
  loadAnnouncements();
  document.getElementById('child-chips').onclick = function(e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    currentChildId = chip.getAttribute('data-id'); setActiveChild(currentChildId); loadAttendance(currentChildId);
    announcementsLoaded = false; announcementsLoading = false; loadAnnouncements();
    contactFormsPopulated = false;
  };
  document.getElementById('activity-chips').onclick = function(e) {
    var chip = e.target.closest('.chip'); if (!chip) return;
    currentChildId = chip.getAttribute('data-id'); setActiveChild(currentChildId); loadAttendance(currentChildId); loadActivity(currentChildId);
  };
}

function setActiveChild(childId) {
  document.querySelectorAll('#child-chips .chip, #activity-chips .chip').forEach(function(chip) {
    if (chip.getAttribute('data-id') === String(childId)) chip.classList.add('active');
    else chip.classList.remove('active');
  });
}

function showPanel(panelName) {
  document.querySelectorAll('.nav-item[data-panel]').forEach(function(item) {
    if (item.getAttribute('data-panel') === panelName) item.classList.add('active');
    else item.classList.remove('active');
  });
  document.querySelectorAll('.panel').forEach(function(panel) { panel.classList.remove('active'); });
  var panelEl = document.getElementById('panel-' + panelName);
  if (panelEl) panelEl.classList.add('active');
  clearBadge(panelName);
}

function loadAttendance(childId) {
  document.getElementById('attendance-val').textContent = '...';
  document.getElementById('attendance-status').textContent = 'Loading';
  document.getElementById('attendance-sub').textContent = 'Today';
  workerFetch('/api/attendance-summary?child_id=' + encodeURIComponent(childId))
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) {
    var rawDay = data.day || '';
    if (rawDay && rawDay.includes('-')) {
      var dp = rawDay.split('-');
      rawDay = dp[1] + '/' + dp[2] + '/' + dp[0];
    }
    document.getElementById('attendance-sub').textContent = rawDay || 'Today';
    var statusEl = document.getElementById('signin-status');
    var lastDropoff = data.latestDropoff ? new Date(data.latestDropoff.time || data.latestDropoff.created_at || 0).getTime() : 0;
    var lastPickup = data.latestPickup ? new Date(data.latestPickup.time || data.latestPickup.created_at || 0).getTime() : 0;
    var tcKnowsStatus = lastDropoff > 0 || lastPickup > 0;

    // Check localStorage for today's sign in/out
    var today = getLocalDateString();
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem('mac_signin_' + childId) || 'null'); } catch(e) {}
    var hasSavedToday = saved && saved.date === today;

    if (tcKnowsStatus) {
      // TC has real data - use it
      if (lastDropoff > 0 && lastDropoff > lastPickup) {
        document.getElementById('attendance-val').textContent = 'P';
        document.getElementById('attendance-status').textContent = 'Present';
        if (statusEl) { statusEl.textContent = 'Currently Signed In'; statusEl.className = 'signin-status in'; }
      } else if (lastPickup > 0) {
        document.getElementById('attendance-val').textContent = 'P';
        document.getElementById('attendance-status').textContent = 'Present';
        if (statusEl) { statusEl.textContent = 'Currently Signed Out'; statusEl.className = 'signin-status out'; }
      }
    } else if (hasSavedToday) {
      // TC doesn't reflect it yet, use saved local state
      document.getElementById('attendance-val').textContent = 'P';
      document.getElementById('attendance-status').textContent = 'Present';
      if (statusEl) {
        if (saved.action === 'dropoff') { statusEl.textContent = 'Currently Signed In'; statusEl.className = 'signin-status in'; }
        else { statusEl.textContent = 'Currently Signed Out'; statusEl.className = 'signin-status out'; }
      }
    } else {
      // No local state and TC has nothing
      document.getElementById('attendance-val').textContent = data.todayAttendanceValue || '--';
      document.getElementById('attendance-status').textContent = data.todayStatus || 'Today';
      if (statusEl) {
        if (data.todayAttendanceValue && data.todayAttendanceValue !== '--') {
          statusEl.textContent = data.todayStatus || '';
          statusEl.className = 'signin-status out';
        } else {
          statusEl.textContent = 'Not Yet Signed In';
          statusEl.className = 'signin-status out';
        }
      }
    }
  })
  .catch(function() { document.getElementById('attendance-val').textContent = '--'; document.getElementById('attendance-status').textContent = 'Unable to load'; document.getElementById('attendance-sub').textContent = 'Today'; });
}

function loadSiblingsForChild(childId, callback) {
  workerFetch('/api/siblings?child_id=' + encodeURIComponent(childId))
  .then(function(r) { return r.json(); })
  .then(function(data) { callback(data.siblingIds); })
  .catch(function() { callback(null); });
}

function populateEmergencyProgramChangeForm() {
  var selectEl = document.getElementById('epc-student-select');
  var classroomEl = document.getElementById('epc-classroom');
  if (!selectEl || !classroomEl) return;
  selectEl.innerHTML = '<option>Loading...</option>';
  var savedCurrentId = currentChildId;
  loadSiblingsForChild(currentChildId, function(siblingIds) {
    selectEl.innerHTML = '';
    var childrenToShow = siblingIds && siblingIds.length
      ? tcChildren.filter(function(c) { return siblingIds.map(String).includes(String(c.id)); })
      : [tcChildren.find(function(c) { return String(c.id) === String(savedCurrentId); })].filter(Boolean);
    childrenToShow.forEach(function(c) {
      var name = ((c.first_name || '') + ' ' + (c.last_name || '')).trim();
      var option = document.createElement('option');
      option.value = c.id;
      option.textContent = name;
      if (String(c.id) === String(savedCurrentId)) option.selected = true;
      selectEl.appendChild(option);
    });
    var selectedChild = tcChildren.find(function(c) { return String(c.id) === String(selectEl.value); });
    classroomEl.value = selectedChild ? (selectedChild.classroom_name || '') : '';
    selectEl.onchange = function() {
      var child = tcChildren.find(function(c) { return String(c.id) === String(selectEl.value); });
      classroomEl.value = child ? (child.classroom_name || '') : '';
    };
  });
  // date of request removed
  document.getElementById('epc-change-date').value = '';
  document.querySelectorAll('input[name="epc-time"], input[name="epc-hours"]').forEach(function(input) { input.checked = false; });
  var note = document.getElementById('emergency-form-note');
  if (note) { note.style.display = 'none'; note.className = 'quick-action-note'; }
}

function submitLimitedAccessRequest() {
  var name = document.getElementById('limited-name').value.trim();
  var email = document.getElementById('limited-email').value.trim();
  var relationship = document.getElementById('limited-relationship').value.trim();
  var childName = getCurrentChildName();
  var classroom = getCurrentChild() ? (getCurrentChild().classroom_name || '') : '';
  if (!name) { alert('Please enter the full name.'); return; }
  if (!email || !email.includes('@')) { alert('Please enter a valid email address.'); return; }
  if (!relationship) { alert('Please enter their relationship to the child.'); return; }
  var submitBtn = document.querySelector('#limited-access-panel .form-submit');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }
  workerFetch('/api/limited-access-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    name: name,
    email: email,
    relationship: relationship,
    studentName: childName,
    studentClassroom: classroom
  })})
  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || 'Failed'); return d; }); })
  .then(function() {
    document.getElementById('limited-name').value = '';
    document.getElementById('limited-email').value = '';
    document.getElementById('limited-relationship').value = '';
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Request'; }
    alert('Request submitted! The school will be in touch with ' + name + ' once access is set up.');
    setTimeout(function() {
      var panel = document.getElementById('limited-access-panel');
      var btn = panel ? panel.previousElementSibling : null;
      if (panel) panel.classList.remove('open');
      if (btn) { var icon = btn.querySelector('.toggle-icon'); if (icon) icon.textContent = '+'; }
    }, 500);
  })
  .catch(function(e) {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Request'; }
    alert('Could not submit: ' + e.message);
  });
}

function submitKeyFobRequest() {
  var requester = document.getElementById('keyfob-requester').value.trim();
  var quantity = document.getElementById('keyfob-quantity').value;
  var childName = getCurrentChildName();
  var classroom = getCurrentChild() ? (getCurrentChild().classroom_name || '') : '';
  if (!requester) { alert('Please enter your name.'); return; }
  if (!quantity) { alert('Please select a quantity.'); return; }
  if (!window.confirm('Request ' + quantity + ' key fob(s) for $' + (parseInt(quantity) * 20) + '? This will be added to your ledger.')) return;
  var submitBtn = document.querySelector('#keyfob-panel .form-submit');
  if (submitBtn) { submitBtn.disabled = true; submitBtn.textContent = 'Submitting...'; }
  workerFetch('/api/keyfob-request', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({
    requesterName: requester,
    quantity: quantity,
    studentName: childName,
    studentClassroom: classroom
  })})
  .then(function(r) { return r.json().then(function(d) { if (!r.ok || !d.ok) throw new Error(d.error || 'Failed'); return d; }); })
  .then(function() {
    document.getElementById('keyfob-requester').value = '';
    document.getElementById('keyfob-quantity').value = '';
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Request'; }
    alert('Request submitted! Your key fob will be ready at the front desk.');
  })
  .catch(function(e) {
    if (submitBtn) { submitBtn.disabled = false; submitBtn.textContent = 'Submit Request'; }
    alert('Could not submit: ' + e.message);
  });
}

function populateContactsForm() {
  var selectEl = document.getElementById('contacts-student-select');
  if (!selectEl) return;
  selectEl.innerHTML = '<option>Loading...</option>';
  var savedCurrentId = currentChildId;
  loadSiblingsForChild(currentChildId, function(siblingIds) {
    selectEl.innerHTML = '';
    var childrenToShow = siblingIds && siblingIds.length
      ? tcChildren.filter(function(c) { return siblingIds.map(String).includes(String(c.id)); })
      : [tcChildren.find(function(c) { return String(c.id) === String(savedCurrentId); })].filter(Boolean);
    childrenToShow.forEach(function(c) {
      var name = ((c.first_name || '') + ' ' + (c.last_name || '')).trim();
      var option = document.createElement('option');
      option.value = c.id;
      option.textContent = name;
      if (String(c.id) === String(savedCurrentId)) option.selected = true;
      selectEl.appendChild(option);
    });
    var selectedChild = tcChildren.find(function(c) { return String(c.id) === String(selectEl.value); });
    var classroomEl = document.getElementById('contacts-classroom');
    if (classroomEl) classroomEl.value = selectedChild ? (selectedChild.classroom_name || '') : '';
    selectEl.onchange = function() {
      var child = tcChildren.find(function(c) { return String(c.id) === String(selectEl.value); });
      if (classroomEl) classroomEl.value = child ? (child.classroom_name || '') : '';
    };
  });
  document.getElementById('contacts-requester').value = '';
  document.getElementById('pickup-name').value = '';
  document.getElementById('pickup-phone').value = '';
  document.getElementById('pickup-relationship').value = '';
  document.getElementById('emergency-name').value = '';
  document.getElementById('emergency-phone').value = '';
  document.getElementById('emergency-relationship').value = '';
  var note = document.getElementById('contacts-form-note');
  if (note) { note.style.display = 'none'; note.className = 'quick-action-note'; }
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
  var submitButton = document.getElementById('epc-submit');
  var selectedEpcChildId = document.getElementById('epc-student-select').value;
  var selectedEpcChild = tcChildren.find(function(c) { return String(c.id) === String(selectedEpcChildId); });
  var selectedEpcName = selectedEpcChild ? ((selectedEpcChild.first_name || '') + ' ' + (selectedEpcChild.last_name || '')).trim() : '';
  if (!selectedEpcChildId || selectedEpcChildId === 'Loading...') { showEmergencyFormNote('Please select a child first.', 'error'); return; }
  var payload = {
    child_id: selectedEpcChildId,
    studentName: selectedEpcName,
    studentClassroom: document.getElementById('epc-classroom').value.trim(),
    personRequestingChange: document.getElementById('epc-requester').value.trim(),
    dateOfEmergencyProgramChange: document.getElementById('epc-change-date').value.trim(),
    dropOffOrPickUpTime: getCheckedRadioValue('epc-time'),
    regularProgramHours: getCheckedRadioValue('epc-hours')
  };
  var required = [['Student Name',payload.studentName],['Student Classroom',payload.studentClassroom],['Person Requesting Change',payload.personRequestingChange],['Date of Change',payload.dateOfEmergencyProgramChange],['One-Time Program Change',payload.dropOffOrPickUpTime],["Student's Regular Program Hours",payload.regularProgramHours]];
  var missing = required.filter(function(item) { return !item[1]; }).map(function(item) { return item[0]; });
  if (missing.length) { showEmergencyFormNote('Please complete: ' + escapeHtml(missing.join(', ')), 'error'); return; }
  var feeMsg = '';
  if (payload.dropOffOrPickUpTime === 'Drop off at 7:30 am') feeMsg = '$30/day fee for Before School (7:30-8:15)';
  else if (payload.dropOffOrPickUpTime === 'Pick up at 4:30 pm') feeMsg = '$30/day fee for 4:30 pick-up (3:15-4:30)';
  else if (payload.dropOffOrPickUpTime === 'Pick up at 5:30 pm') feeMsg = '$60/day fee for 5:30 pick-up (3:15-5:30)';
  var confirmMsg = 'Submit Emergency Program Change for ' + payload.studentName + '?';
  if (feeMsg) confirmMsg += ' Billing: ' + feeMsg + '. This amount will be added to your ledger.';
  var applyToSiblings = document.getElementById('epc-apply-siblings').checked;
  if (applyToSiblings) confirmMsg += ' This will also apply to all siblings.';
  if (!window.confirm(confirmMsg)) return;
  submitButton.disabled = true;
  showEmergencyFormNote('Submitting...', '');

  function submitEpcForChild(childId, childName, classroom) {
    var p = Object.assign({}, payload, { child_id: childId, studentName: childName, studentClassroom: classroom });
    return workerFetch('/api/emergency-program-change', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
    .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Submission failed.'); return data; }); });
  }

  function onEpcSuccess(count) {
    var msg = count > 1 ? '<strong>Submitted for ' + count + ' students.</strong><br>Your Emergency Program Change request has been sent to MAC.' : '<strong>Submitted.</strong><br>Your Emergency Program Change request has been sent to MAC.';
    showEmergencyFormNote(msg, 'success');
    submitButton.disabled = false;
    document.getElementById('epc-apply-siblings').checked = false;
    setTimeout(function() {
      var panel = document.getElementById('emergency-program-change-panel');
      var btn = document.getElementById('epc-expand-btn');
      if (panel) panel.classList.remove('open');
      if (btn) { var icon = btn.querySelector('.toggle-icon'); if (icon) icon.textContent = '+'; }
      populateEmergencyProgramChangeForm();
    }, 2000);
  }

  if (applyToSiblings) {
    loadSiblingsForChild(selectedEpcChildId, function(siblingIds) {
      var childrenToSubmit = siblingIds && siblingIds.length
        ? tcChildren.filter(function(c) { return siblingIds.map(String).includes(String(c.id)); })
        : [selectedEpcChild];
      Promise.all(childrenToSubmit.map(function(c) {
        return submitEpcForChild(c.id, ((c.first_name || '') + ' ' + (c.last_name || '')).trim(), c.classroom_name || '');
      }))
      .then(function() { onEpcSuccess(childrenToSubmit.length); })
      .catch(function(e) { showEmergencyFormNote('<strong>Could not submit.</strong><br>' + escapeHtml(e.message), 'error'); submitButton.disabled = false; });
    });
  } else {
    submitEpcForChild(selectedEpcChildId, selectedEpcName, payload.studentClassroom)
    .then(function() { onEpcSuccess(1); })
    .catch(function(e) { showEmergencyFormNote('<strong>Could not submit.</strong><br>' + escapeHtml(e.message), 'error'); })
    .finally(function() { submitButton.disabled = false; });
  }
}

function submitContactsUpdate() {
  var selectedContactsChildId = document.getElementById('contacts-student-select').value;
  var selectedContactsChild = tcChildren.find(function(c) { return String(c.id) === String(selectedContactsChildId); });
  var selectedContactsName = selectedContactsChild ? ((selectedContactsChild.first_name || '') + ' ' + (selectedContactsChild.last_name || '')).trim() : '';
  if (!selectedContactsChildId || selectedContactsChildId === 'Loading...') { showContactsFormNote('Please select a child first.', 'error'); return; }
  var submitButton = document.getElementById('contacts-submit');
  var contactsClassroom = document.getElementById('contacts-classroom');
  var payload = {
    formType: 'approved_adults_emergency_contacts',
    child_id: selectedContactsChildId,
    studentName: selectedContactsName,
    studentClassroom: contactsClassroom ? contactsClassroom.value.trim() : '',
    requesterName: document.getElementById('contacts-requester').value.trim(),
    pickupName: document.getElementById('pickup-name').value.trim(),
    pickupPhone: document.getElementById('pickup-phone').value.trim(),
    pickupRelationship: document.getElementById('pickup-relationship').value.trim(),
    emergencyName: document.getElementById('emergency-name').value.trim(),
    emergencyPhone: document.getElementById('emergency-phone').value.trim(),
    emergencyRelationship: document.getElementById('emergency-relationship').value.trim()
  };
  if (!payload.requesterName) { showContactsFormNote('Please enter your name.', 'error'); return; }
  var hasPickup = payload.pickupName || payload.pickupPhone;
  var hasEmergency = payload.emergencyName || payload.emergencyPhone;
  if (!hasPickup && !hasEmergency) { showContactsFormNote('Please fill in at least one approved adult or emergency contact.', 'error'); return; }
  var applyToSiblings = document.getElementById('contacts-apply-siblings').checked;
  var confirmMsg = 'Submit this update for ' + selectedContactsName + '?';
  if (applyToSiblings) confirmMsg += ' This will also apply to all siblings.';
  if (!window.confirm(confirmMsg)) return;
  submitButton.disabled = true;
  showContactsFormNote('Submitting...', '');

  function submitForChild(childId, childName, classroom) {
    var p = Object.assign({}, payload, { child_id: childId, studentName: childName, studentClassroom: classroom });
    return workerFetch('/api/contacts-update', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(p) })
    .then(function(r) { return r.json().then(function(data) { if (!r.ok || !data.ok) throw new Error(data.error || 'Submission failed.'); return data; }); });
  }

  var submitPromise;
  if (applyToSiblings) {
    loadSiblingsForChild(selectedContactsChildId, function(siblingIds) {
      var childrenToSubmit = siblingIds && siblingIds.length
        ? tcChildren.filter(function(c) { return siblingIds.map(String).includes(String(c.id)); })
        : [selectedContactsChild];
      var promises = childrenToSubmit.map(function(c) {
        var name = ((c.first_name || '') + ' ' + (c.last_name || '')).trim();
        var classroom = c.classroom_name || '';
        return submitForChild(c.id, name, classroom);
      });
      Promise.all(promises)
      .then(function() {
        showContactsFormNote('<strong>Submitted for ' + childrenToSubmit.length + ' student(s).</strong><br>MAC will update Transparent Classroom with this information.', 'success');
        submitButton.disabled = false;
        document.getElementById('contacts-apply-siblings').checked = false;
        setTimeout(function() {
          var panel = document.getElementById('contacts-form-panel');
          var btn = document.getElementById('contacts-expand-btn');
          if (panel) panel.classList.remove('open');
          if (btn) { var icon = btn.querySelector('.toggle-icon'); if (icon) icon.textContent = '+'; }
          populateContactsForm();
        }, 2000);
      })
      .catch(function(e) { showContactsFormNote('<strong>Could not submit.</strong><br>' + escapeHtml(e.message), 'error'); submitButton.disabled = false; });
    });
  } else {
    submitForChild(selectedContactsChildId, selectedContactsName, contactsClassroom ? contactsClassroom.value.trim() : '')
    .then(function() {
      showContactsFormNote('<strong>Submitted.</strong><br>MAC will update Transparent Classroom with this information.', 'success');
      setTimeout(function() {
        var panel = document.getElementById('contacts-form-panel');
        var btn = document.getElementById('contacts-expand-btn');
        if (panel) panel.classList.remove('open');
        if (btn) { var icon = btn.querySelector('.toggle-icon'); if (icon) icon.textContent = '+'; }
        populateContactsForm();
      }, 2000);
    })
    .catch(function(e) { showContactsFormNote('<strong>Could not submit.</strong><br>' + escapeHtml(e.message), 'error'); })
    .finally(function() { submitButton.disabled = false; });
  }
}

function loadAnnouncements() {
  if (announcementsLoading) { return; }
  if (!currentChildId) { return; }
  announcementsLoading = true;
  document.getElementById('announcement-list').innerHTML = '<div class="loading">Loading announcements...</div>';
  workerFetch('/api/announcements?child_id=' + encodeURIComponent(currentChildId))
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) {
    announcements = Array.isArray(data.announcements) ? data.announcements : [];
    announcementsLoaded = true;
    announcementsLoading = false;
    renderAnnouncements();
    checkBadges();
  })
  .catch(function(e) {
    announcementsLoading = false;
    document.getElementById('announcement-list').innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">Announcements could not load</div><div style="font-size:12px">' + escapeHtml(e.message) + '</div></div>';
  });
}

function renderAnnouncements() {
  var container = document.getElementById('announcement-list');
  if (!announcements.length) { container.innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">No announcements found</div><div style="font-size:12px">School-wide and classroom specific messages from MAC.</div></div>'; return; }
  var html = '';
  announcements.forEach(function(item) {
    var tag = item.subjectType === 'Classroom' ? (item.subjectName || 'Classroom') : 'School';
    html += '<div class="announcement-card"><div class="announcement-meta"><span class="announcement-date">' + escapeHtml(formatDateTime(item.createdAt)) + '</span><span class="announcement-tag">' + escapeHtml(tag) + '</span></div><div class="announcement-title">' + escapeHtml(item.title || 'Announcement') + '</div><div class="announcement-source">' + escapeHtml(item.authorName || '') + '</div><div class="announcement-body">' + sanitizeAnnouncementBody(item.body || '') + '</div></div>';
  });
  container.innerHTML = html;
  checkBadges();
}

function loadNewsletters() {
  if (newslettersLoaded) { renderNewsletters(); return; }
  document.getElementById('newsletter-list').innerHTML = '<div class="loading">Loading newsletters...</div>';
  workerFetch('/api/newsletters')
  .then(function(r) { if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) { newsletterArchives = Array.isArray(data.newsletters) ? data.newsletters : []; newslettersLoaded = true; renderNewsletters(); })
  .catch(function(e) { document.getElementById('newsletter-list').innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">Newsletters could not load</div><div style="font-size:12px">' + escapeHtml(e.message) + '</div></div>'; });
}

var newsletterShowAll = false;

function renderNewsletters() {
  var container = document.getElementById('newsletter-list');
  if (!newsletterArchives.length) { container.innerHTML = '<div class="placeholder"><div style="font-weight:700;color:var(--blue);margin-bottom:4px">No newsletters found</div></div>'; return; }
  var limit = newsletterShowAll ? newsletterArchives.length : 5;
  var visible = newsletterArchives.slice(0, limit);
  var html = '';
  visible.forEach(function(item, index) {
    var dateInfo = formatNewsletterDate(item.date);
    html += '<div class="newsletter-card"><a class="newsletter-date-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener"><div class="newsletter-month">' + escapeHtml(dateInfo.month) + '</div><div class="newsletter-day">' + escapeHtml(dateInfo.day) + '</div></a><div class="newsletter-info"><div class="newsletter-title">' + escapeHtml(item.title || 'MAC News') + '</div><div class="newsletter-note">' + (index === 0 ? 'Latest newsletter' : 'Newsletter archive') + '</div></div></div>';
  });
  if (!newsletterShowAll && newsletterArchives.length > 5) {
    html += '<button onclick="newsletterShowAll=true;renderNewsletters()" style="width:100%;margin-top:12px;background:none;border:1.5px solid var(--blue);border-radius:100px;padding:10px;color:var(--blue);font-weight:700;font-size:14px;font-family:Nunito,sans-serif;cursor:pointer;">Show all ' + newsletterArchives.length + ' newsletters</button>';
  } else if (newsletterShowAll && newsletterArchives.length > 5) {
    html += '<button onclick="newsletterShowAll=false;renderNewsletters()" style="width:100%;margin-top:12px;background:none;border:1.5px solid var(--border);border-radius:100px;padding:10px;color:var(--muted);font-weight:700;font-size:14px;font-family:Nunito,sans-serif;cursor:pointer;">Show less</button>';
  }
  container.innerHTML = html;
  checkBadges();
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
  var d = new Date(); d.setDate(d.getDate() - 365);
  var ds = d.toISOString().split('T')[0];
  workerFetch('/api/activity?child_id=' + encodeURIComponent(childId) + '&date_start=' + encodeURIComponent(ds))
  .then(function(r) { if (r.status === 401) throw new Error('Please sign in to view activity.'); if (r.status === 403) throw new Error('No permission to view this child.'); if (!r.ok) throw new Error('Status: ' + r.status); return r.json(); })
  .then(function(data) {
    var items = normalizeActivity(data);
    tcActivityItems = items;
    checkBadges();
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
  var showPast = document.getElementById('show-past-events') && document.getElementById('show-past-events').checked;
  var today = new Date(); today.setHours(0,0,0,0);
  var closedTypes = ['break', 'professional_learning', 'holiday'];
  var filtered = calendarEvents.filter(function(event) {
    if (calendarFilter === 'school_closed') {
      if (closedTypes.indexOf(event.type) === -1 && event.type !== 'school_closed') return false;
    } else if (calendarFilter !== 'all' && event.type !== calendarFilter) return false;
    if (!showPast) {
      var endDate = event.endDate ? parseLocalDate(event.endDate) : parseLocalDate(event.date);
      if (endDate) { endDate.setHours(23,59,59,999); if (endDate < today) return false; }
    }
    return true;
  }).sort(function(a, b) { var aDate = parseLocalDate(a.date); var bDate = parseLocalDate(b.date); if (!aDate && !bDate) return 0; if (!aDate) return 1; if (!bDate) return -1; return aDate.getTime() - bDate.getTime(); });
  if (!filtered.length) { container.innerHTML = '<div class="placeholder"><div style="font-size:12px">' + (showPast ? 'No dates found for this filter.' : 'No upcoming events. Check "Show past events" to see past dates.') + '</div></div>'; return; }
  var html = '';
  filtered.forEach(function(event) {
    var dateInfo = formatCalendarDate(event.date, event.endDate);
    html += '<div class="calendar-card ' + escapeHtml(event.type || 'calendar') + '"><div class="calendar-date-box"><div class="calendar-month">' + escapeHtml(dateInfo.month) + '</div><div class="calendar-day">' + escapeHtml(dateInfo.day) + '</div></div><div class="calendar-info"><div class="calendar-title">' + escapeHtml(event.title || 'Calendar Date') + '</div><div class="calendar-notes">' + escapeHtml(dateInfo.full) + '</div>' + (event.time ? '<div class="calendar-notes">&#9200; ' + escapeHtml(event.time) + '</div>' : '') + (event.location ? '<div class="calendar-notes">&#128205; ' + escapeHtml(event.location) + '</div>' : '') + '<span class="calendar-tag">' + escapeHtml(labelCalendarType(event.type)) + '</span></div></div>';
  });
  container.innerHTML = html;
  checkBadges();
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
function getActivityTitle(item) {
  var title = item.title || item.lesson_name || item.lessonName || item.name || item.activity_name || '';
  if (!title && item.html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = item.html;
    var lessonLink = tmp.querySelector('.lesson-link');
    if (lessonLink) title = lessonLink.textContent.trim();
  }
  return title;
}
function getActivityText(item) {
  var text = item.text || item.note || item.notes || item.description || item.body || item.comment || item.comments || item.observation || item.observations || item.caption || item.message || '';
  if (!text && item.normalized_text && item.html) {
    var tmp = document.createElement('div');
    tmp.innerHTML = item.html;
    tmp.querySelectorAll('.child-link').forEach(function(el) { el.remove(); });
    text = tmp.textContent.trim();
  }
  return text;
}
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

window.addEventListener('pageshow', function(e) {
  if (e.persisted) { window.location.reload(); }
});

doConnect();
`}

function escapeHtml(value) { return String(value||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#039;'); }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    registrations.forEach(function(reg) { reg.unregister(); });
  });
  navigator.serviceWorker.register('/service-worker.js').then(function(reg) {
    reg.update();
  }).catch(function(){});
}
</script>
</body>
</html>`;
}
