export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;
    const baseUrl = "https://www.transparentclassroom.com/api/v1";

    const jsonHeaders = {
      "Content-Type": "application/json"
    };

    if (path === "/api/login") {
      return Response.redirect(url.origin + "/?signed_in=1", 302);
    }

    if (path === "/cdn-cgi/access/logout") {
      return new Response("Logging out...", { status: 200 });
    }

    const token = env.TC_TOKEN;
    const schoolId = env.TC_SCHOOL_ID;
    const userEmail = getUserEmail(request);

    if (path === "/api") {
      return jsonResponse({
        status: "api running",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        signedInEmail: userEmail || null,
        routes: [
          "/api/login",
          "/api/permission-test",
          "/api/children",
          "/api/activity?child_id=CHILD_ID",
          "/api/activity-raw?child_id=CHILD_ID"
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
        "Content-Type": "application/json"
      };

      if (path === "/api/children") {
        const tcUrl = new URL(baseUrl + "/children.json");
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
        const dateStart = url.searchParams.get("date_start") || "";

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

        const tcUrl = new URL(baseUrl + "/activity.json");
        tcUrl.searchParams.set("child_id", childId);
        tcUrl.searchParams.set("date_start", dateStart);
        tcUrl.searchParams.set("school_id", schoolId);
        tcUrl.searchParams.set("include", "photos,notes,observations,lessons");
        tcUrl.searchParams.set("with", "photos");
        tcUrl.searchParams.set("per_page", "100");

        const response = await fetch(tcUrl.toString(), {
          method: "GET",
          headers: tcHeaders
        });

        const body = await response.text();

        return new Response(body, {
          status: response.status,
          headers: jsonHeaders
        });
      }

      return jsonResponse({
        error: "Route not found",
        availableRoutes: [
          "/api/login",
          "/api/permission-test",
          "/api/children",
          "/api/activity?child_id=CHILD_ID",
          "/api/activity-raw?child_id=CHILD_ID"
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
  --card: #fff;
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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
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

.event-list {
  display: flex;
  flex-direction: column;
  gap: 9px;
  margin-bottom: 20px;
}

.event-card {
  background: var(--card);
  border-radius: 12px;
  padding: 13px 15px;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
}

.event-card.social {
  border-left-color: #D4AE3A;
}

.event-card.sport {
  border-left-color: var(--green);
}

.event-card.holiday {
  border-left-color: var(--red);
}

.event-card.parent {
  border-left-color: #7B1FA2;
}

.ev-date-box {
  min-width: 40px;
  text-align: center;
}

.ev-day {
  font-family: 'Cormorant Garamond', serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
  color: var(--blue);
}

.ev-mon {
  font-size: 9px;
  text-transform: uppercase;
  color: var(--muted);
}

.ev-info {
  flex: 1;
}

.ev-name {
  font-size: 13px;
  font-weight: 700;
}

.ev-detail {
  font-size: 11px;
  color: var(--muted);
  margin-top: 1px;
}

.ev-tag {
  padding: 3px 8px;
  border-radius: 100px;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
}

.ev-academic {
  background: #E8EDFF;
  color: #10069F;
}

.ev-social {
  background: #FFF3CD;
  color: #856404;
}

.ev-sport {
  background: #D4EDDA;
  color: #155724;
}

.ev-holiday {
  background: #F8D7DA;
  color: #721C24;
}

.ev-parent {
  background: #EDE7F6;
  color: #4527A0;
}

.filters {
  display: flex;
  gap: 7px;
  margin-bottom: 14px;
  flex-wrap: wrap;
}

.filter {
  padding: 5px 11px;
  border-radius: 100px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
  border: 1.5px solid var(--border);
  background: var(--card);
  color: var(--muted);
}

.filter.active {
  background: var(--blue);
  color: var(--gold);
  border-color: var(--blue);
}

.events-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 14px;
}

.events-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  font-weight: 700;
  color: var(--blue);
}

.ev-nav button {
  background: none;
  border: 1.5px solid var(--border);
  border-radius: 8px;
  width: 30px;
  height: 30px;
  cursor: pointer;
  color: var(--muted);
  font-size: 13px;
  margin-left: 4px;
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

  .action-card {
    align-items: flex-start;
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
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
        <div class="stat-val green">--</div>
        <div class="stat-sub">Coming soon</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Absences</div>
        <div class="stat-val red">--</div>
        <div class="stat-sub">Coming soon</div>
      </div>
      <div class="stat">
        <div class="stat-lbl">Tardies</div>
        <div class="stat-val amber">--</div>
        <div class="stat-sub">Coming soon</div>
      </div>
    </div>

    <div class="action-card">
      <div>
        <h3>Report an Absence</h3>
        <p>Notify the school before 8:00 AM</p>
      </div>
      <button class="action-btn">Report Now</button>
    </div>
  </section>

  <section class="panel" id="panel-activity">
    <h1>Classroom Activity</h1>
    <div class="sub">From Transparent Classroom</div>

    <div id="activity-chips" class="chips"></div>

    <div id="activity-content">
      <div class="placeholder" id="activity-placeholder">
        <div style="font-size:28px;margin-bottom:8px">📋</div>
        <div style="font-weight:700;color:var(--blue);margin-bottom:4px">Sign In Required</div>
        <div style="font-size:12px">Sign in on the Dashboard tab to see activity here.</div>
      </div>
    </div>
  </section>

  <section class="panel" id="panel-events">
    <div class="events-header">
      <div class="events-title" id="events-title">May 2026</div>
      <div class="ev-nav">
        <button onclick="evNav(-1)">‹</button>
        <button onclick="evNav(1)">›</button>
      </div>
    </div>

    <div class="filters" id="event-filters"></div>
    <div class="event-list" id="event-list"></div>
  </section>

  <section class="panel" id="panel-contact">
    <h1>Contact School</h1>
    <div class="sub">Reach out to staff directly</div>

    <div class="contact-card">
      <div class="contact-av" style="background:var(--blue)">MA</div>
      <div>
        <div class="ev-name">Montessori Academy of Colorado</div>
        <div class="ev-detail">Main Office</div>
      </div>
      <button class="contact-msg">Call</button>
    </div>

    <div class="contact-card">
      <div class="contact-av" style="background:var(--green)">AT</div>
      <div>
        <div class="ev-name">Attendance</div>
        <div class="ev-detail">Absences and tardies</div>
      </div>
      <button class="contact-msg">Email</button>
    </div>
  </section>

</div>

<script>
var tcChildren = [];
var currentChildId = null;

var evOffset = 0;
var activeFilter = 'all';

var MN = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December'
];

var TC = {
  academic: 'ev-academic',
  social: 'ev-social',
  sport: 'ev-sport',
  holiday: 'ev-holiday',
  parent: 'ev-parent'
};

var TL = {
  academic: 'Academic',
  social: 'Social',
  sport: 'Sports',
  holiday: 'Holiday',
  parent: 'Parent Event'
};

var CC = {
  academic: '',
  social: 'social',
  sport: 'sport',
  holiday: 'holiday',
  parent: 'parent'
};

var events = [
  {date:'2026-05-02',name:'Spring Art Show',type:'social',time:'6:00 PM',loc:'Main Hall'},
  {date:'2026-05-07',name:'Kindergarten Orientation',type:'academic',time:'9:00 AM',loc:'Room 101'},
  {date:'2026-05-12',name:'Field Day',type:'sport',time:'All Day',loc:'Athletic Field'},
  {date:'2026-05-15',name:'Parent-Teacher Conferences',type:'parent',time:'3:00-7:00 PM',loc:'Classrooms'},
  {date:'2026-05-19',name:'Science Fair',type:'academic',time:'10:00 AM',loc:'Gymnasium'},
  {date:'2026-05-23',name:'Montessori Open House',type:'parent',time:'1:00 PM',loc:'Campus-wide'},
  {date:'2026-05-26',name:'Memorial Day - No School',type:'holiday',time:'All Day',loc:''},
  {date:'2026-05-29',name:'Graduation Ceremony',type:'academic',time:'2:00 PM',loc:'Auditorium'},
  {date:'2026-06-04',name:'End-of-Year Picnic',type:'social',time:'11:00 AM',loc:'School Grounds'},
  {date:'2026-06-05',name:'Last Day of School',type:'academic',time:'All Day',loc:''},
  {date:'2026-04-15',name:'Spring Break Begins',type:'holiday',time:'All Day',loc:''},
  {date:'2026-04-22',name:'Classes Resume',type:'academic',time:'8:00 AM',loc:''}
];

document.getElementById('nav').addEventListener('click', function(e) {
  var tab = e.target.closest('.nav-tab');
  if (!tab) return;

  var panelName = tab.getAttribute('data-panel');

  showPanel(panelName);

  if (panelName === 'activity' && currentChildId) {
    loadActivity(currentChildId);
  }

  if (panelName === 'events') {
    renderEvents();
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

  document.getElementById('child-chips').onclick = function(e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;

    currentChildId = chip.getAttribute('data-id');

    setActiveChild(currentChildId);
    showPanel('activity');
    loadActivity(currentChildId);
  };

  document.getElementById('activity-chips').onclick = function(e) {
    var chip = e.target.closest('.chip');
    if (!chip) return;

    currentChildId = chip.getAttribute('data-id');

    setActiveChild(currentChildId);
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
        value.url ||
        value.image_url ||
        value.imageUrl ||
        value.photo_url ||
        value.photoUrl ||
        value.thumbnail_url ||
        value.thumbnailUrl ||
        value.large_url ||
        value.largeUrl ||
        value.medium_url ||
        value.mediumUrl;

      if (possibleUrl) {
        addPhoto(possibleUrl);
      }
    }
  }

  addPhoto(item.photo);
  addPhoto(item.image);
  addPhoto(item.image_url);
  addPhoto(item.imageUrl);
  addPhoto(item.photo_url);
  addPhoto(item.photoUrl);
  addPhoto(item.thumbnail_url);
  addPhoto(item.thumbnailUrl);

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

function evNav(dir) {
  evOffset += dir;
  renderEvents();
}

function renderEvents() {
  var d = new Date(2026, 4 + evOffset, 1);
  var yr = d.getFullYear();
  var mo = d.getMonth();

  document.getElementById('events-title').textContent = MN[mo] + ' ' + yr;

  var types = ['all','academic','social','sport','holiday','parent'];

  var labels = {
    all: 'All',
    academic: 'Academic',
    social: 'Social',
    sport: 'Sports',
    holiday: 'Holidays',
    parent: 'Parent Events'
  };

  var fh = '';

  types.forEach(function(t) {
    fh += '<span class="filter' + (activeFilter === t ? ' active' : '') + '" data-f="' + t + '">' +
      labels[t] +
      '</span>';
  });

  document.getElementById('event-filters').innerHTML = fh;

  document.getElementById('event-filters').onclick = function(e) {
    var f = e.target.getAttribute('data-f');
    if (!f) return;

    activeFilter = f;
    renderEvents();
  };

  var filtered = events.filter(function(ev) {
    var ed = new Date(ev.date);
    var sameMonth = ed.getFullYear() === yr && ed.getMonth() === mo;
    var sameType = activeFilter === 'all' || ev.type === activeFilter;

    return sameMonth && sameType;
  });

  filtered.sort(function(a,b) {
    return new Date(a.date) - new Date(b.date);
  });

  var html = '';

  if (!filtered.length) {
    html =
      '<div class="placeholder">' +
      '<div style="font-size:13px;color:var(--muted)">No events found for this month.</div>' +
      '</div>';
  } else {
    filtered.forEach(function(ev) {
      var ed = new Date(ev.date);
      var day = ed.getDate();

      var mon = ed.toLocaleDateString('en-US', {
        month: 'short'
      });

      html += '<div class="event-card ' + (CC[ev.type] || '') + '">' +
        '<div class="ev-date-box">' +
        '<div class="ev-day">' + day + '</div>' +
        '<div class="ev-mon">' + mon + '</div>' +
        '</div>' +
        '<div class="ev-info">' +
        '<div class="ev-name">' + escapeHtml(ev.name) + '</div>' +
        '<div class="ev-detail">' + escapeHtml(ev.time) + (ev.loc ? ' · ' + escapeHtml(ev.loc) : '') + '</div>' +
        '</div>' +
        '<span class="ev-tag ' + TC[ev.type] + '">' + TL[ev.type] + '</span>' +
        '</div>';
    });
  }

  document.getElementById('event-list').innerHTML = html;
}

if (new URLSearchParams(window.location.search).get('signed_in') === '1') {
  doConnect();
  window.history.replaceState({}, document.title, window.location.pathname);
}

renderEvents();
</script>

</body>
</html>`;
}
