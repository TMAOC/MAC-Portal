const CALENDAR_EVENTS = [
  { date: "2026-08-03", endDate: "2026-08-07", type: "break", title: "Summer Break - No School" },
  { date: "2026-08-10", endDate: "2026-08-14", type: "break", title: "Summer Break - No School" },
  { date: "2026-08-17", endDate: "2026-08-18", type: "professional_learning", title: "Professional Learning Days - No School" },
  { date: "2026-08-19", endDate: "", type: "milestone", title: "First Day of School" },
  { date: "2026-09-07", endDate: "", type: "holiday", title: "Labor Day - No School" },
  { date: "2026-09-21", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2026-10-30", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2026-11-23", endDate: "2026-11-27", type: "break", title: "Thanksgiving Break - No School" },
  { date: "2026-12-21", endDate: "2026-12-25", type: "break", title: "Winter Break - No School" },
  { date: "2026-12-28", endDate: "2027-01-01", type: "break", title: "Winter Break - No School" },
  { date: "2027-01-04", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2027-01-18", endDate: "", type: "holiday", title: "Martin Luther King Jr. Day - No School" },
  { date: "2027-02-15", endDate: "", type: "holiday", title: "Presidents’ Day - No School" },
  { date: "2027-03-12", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2027-03-29", endDate: "2027-04-02", type: "break", title: "Spring Break - No School" },
  { date: "2027-04-05", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2027-05-07", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2027-05-31", endDate: "", type: "holiday", title: "Memorial Day - No School" },
  { date: "2027-06-02", endDate: "", type: "half_day", title: "12 p.m. Dismissal / Last Day of School" },
  { date: "2027-06-03", endDate: "2027-06-04", type: "professional_learning", title: "Professional Learning Days - No School" },
  { date: "2027-06-18", endDate: "", type: "holiday", title: "Juneteenth Observed - No School" },
  { date: "2027-07-02", endDate: "", type: "professional_learning", title: "Professional Learning Day - No School" },
  { date: "2027-07-05", endDate: "", type: "holiday", title: "Independence Day Observed - No School" },
  { date: "2027-08-02", endDate: "2027-08-06", type: "break", title: "Summer Break - No School" },
  { date: "2027-08-09", endDate: "2027-08-13", type: "break", title: "Summer Break - No School" },
  { date: "2027-08-16", endDate: "2027-08-17", type: "professional_learning", title: "Professional Learning Days - No School" },
  { date: "2027-08-18", endDate: "", type: "milestone", title: "First Day of School" }
];

const NEWSLETTER_ARCHIVES = [
  {
    date: "2026-05-26",
    title: "MAC News - Week of 5/26/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/1970e57d-adb1-4be2-887d-b9b82eed4eaa"
  },
  {
    date: "2026-05-18",
    title: "MAC News - Week of 5/18/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/9a5cc677-905a-41c5-8d54-2fc5be24baa9"
  },
  {
    date: "2026-05-11",
    title: "MAC News - Week of 5/11/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8f5636d5-25ac-4887-851e-08a8c2f09605"
  },
  {
    date: "2026-05-04",
    title: "MAC News - Week of 5/4/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/92ce53d6-636a-4cc6-8ab9-220175fab6a6"
  },
  {
    date: "2026-04-27",
    title: "MAC News - Week of 4/27/26",
    url: "https://www.montessoriacademyofcolorado.org/fs/comms-manager/view/8c596259-8f98-411f-868a-c2c5011ba615"
  },
  {
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
          "/api/tc-events-raw?day=YYYY-MM-DD",
          "/api/calendar"
        ]
      });
    }

    if (path === "/api/calendar") {
      return jsonResponse({
        count: CALENDAR_EVENTS.length,
        events: CALENDAR_EVENTS
      });
    }

    if (path === "/api/newsletters") {
      return jsonResponse({
        count: NEWSLETTER_ARCHIVES.length,
        newsletters: NEWSLETTER_ARCHIVES
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

      const tcHeaders = {
        "X-TransparentClassroomToken": token,
        "X-TransparentClassroomSchoolId": schoolId,
        "Content-Type": "application/json",
        "Accept": "application/json"
      };

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

      if (path === "/api/children") {
        const childrenResult = await fetchChildrenFromTC({
          apiBaseUrl,
          schoolId,
          tcHeaders
        });

        if (!childrenResult.ok) {
          return jsonResponse(childrenResult.data, childrenResult.status);
        }

        return jsonResponse(filterChildrenForUser(childrenResult.children, allowedChildren));
      }

      if (path === "/api/announcements-raw") {
        const raw = await fetchAnnouncementsRawFromTC({
          schoolId,
          tcHeaders
        });

        return jsonResponse(raw, raw.ok ? 200 : raw.status || 500);
      }

      if (path === "/api/posts-raw") {
        const rawPosts = await fetchRecentPostsRawFromTC({
          schoolId,
          tcHeaders
        });

        return jsonResponse(rawPosts, rawPosts.ok ? 200 : rawPosts.status || 500);
      }

      if (path === "/api/announcements") {
        const childrenResult = await fetchChildrenFromTC({
          apiBaseUrl,
          schoolId,
          tcHeaders
        });

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
          "/api/tc-events-raw?day=YYYY-MM-DD",
          "/api/calendar"
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
    debugAnnouncementSamples: normalizedAnnouncements.slice(0, 20).map(function(a) {
      return {
        title: a.title,
        subjectId: a.subjectId,
        subjectType: a.subjectType,
        subjectName: a.subjectName
      };
    }),
    debugRecentPostSamples: recentPosts.slice(0, 30).map(function(p) {
      return {
        title: p.title,
        classroomId: p.classroomId,
        private: p.private,
        source: p.source
      };
    }),
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

function renderPortalHtml() {
  return `<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>MAC Parent Portal</title>

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
  color: var(--blue);
  border: 1px solid var(--border);
}

.action-btn:disabled {
  opacity: .6;
  cursor: not-allowed;
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

.success-note {
  border-color: rgba(46,158,111,.35);
  color: var(--green);
}

.error-note {
  border-color: rgba(217,79,61,.35);
  color: var(--red);
}

.act-card,
.announcement-card {
  background: var(--card);
  border-radius: 12px;
  padding: 14px 16px;
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  margin-bottom: 10px;
}

.act-meta,
.announcement-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  margin-bottom: 6px;
}

.act-date,
.announcement-date {
  font-size: 11px;
  color: var(--muted);
}

.act-tag,
.announcement-tag {
  font-size: 10px;
  font-weight: 700;
  padding: 2px 8px;
  border-radius: 100px;
  text-transform: uppercase;
  background: #D4EDDA;
  color: #155724;
}

.act-title,
.announcement-title {
  font-weight: 700;
  color: var(--blue);
  margin-bottom: 4px;
}

.act-note,
.announcement-body {
  font-size: 13px;
  line-height: 1.5;
  color: #0D0B5C;
  white-space: pre-wrap;
}

.announcement-source {
  font-size: 12px;
  color: var(--muted);
  margin-bottom: 8px;
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

.newsletter-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 12px;
  padding: 13px 15px;
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
  align-items: center;
}

.newsletter-date-link {
  min-width: 54px;
  text-align: center;
  text-decoration: none;
  background: rgba(16,6,159,.07);
  border-radius: 10px;
  padding: 8px 6px;
  display: block;
}

.newsletter-date-link:hover {
  background: rgba(16,6,159,.14);
}

.newsletter-month {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  font-weight: 700;
}

.newsletter-day {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--blue);
  line-height: 1;
}

.newsletter-info {
  flex: 1;
}

.newsletter-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--blue);
}

.newsletter-note {
  font-size: 11px;
  color: var(--muted);
  margin-top: 3px;
}

.calendar-actions {
  display: grid;
  grid-template-columns: 1fr;
  gap: 10px;
  margin-bottom: 16px;
}

.calendar-link {
  display: block;
  text-align: center;
  text-decoration: none;
  background: var(--blue);
  color: var(--gold);
  padding: 10px 14px;
  border-radius: 100px;
  font-weight: 700;
  font-size: 13px;
}

.calendar-filters {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}

.calendar-filter {
  border: 1.5px solid var(--border);
  background: var(--card);
  color: var(--muted);
  border-radius: 100px;
  padding: 6px 11px;
  font-size: 11px;
  font-weight: 700;
  cursor: pointer;
}

.calendar-filter.active {
  background: var(--blue);
  color: var(--gold);
  border-color: var(--blue);
}

.calendar-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-left: 4px solid var(--blue);
  border-radius: 12px;
  padding: 13px 15px;
  display: flex;
  gap: 12px;
  margin-bottom: 10px;
}

.calendar-card.break { border-left-color: var(--yellow); }
.calendar-card.professional_learning { border-left-color: var(--orange); }
.calendar-card.holiday { border-left-color: var(--purple); }
.calendar-card.half_day { border-left-color: var(--green); }
.calendar-card.milestone { border-left-color: var(--blue); }

.calendar-date-box {
  min-width: 48px;
  text-align: center;
}

.calendar-month {
  font-size: 10px;
  color: var(--muted);
  text-transform: uppercase;
  font-weight: 700;
}

.calendar-day {
  font-family: 'Cormorant Garamond', serif;
  font-size: 26px;
  font-weight: 700;
  color: var(--blue);
  line-height: 1;
}

.calendar-info {
  flex: 1;
}

.calendar-title {
  font-size: 14px;
  font-weight: 700;
  color: var(--blue);
}

.calendar-notes {
  font-size: 12px;
  color: var(--muted);
  line-height: 1.4;
  margin-top: 3px;
}

.calendar-tag {
  display: inline-block;
  font-size: 10px;
  font-weight: 700;
  text-transform: uppercase;
  color: var(--muted);
  margin-top: 6px;
}

.contact-card {
  background: var(--card);
  border: 1px solid var(--border);
  border-radius: 14px;
  padding: 16px;
  margin-bottom: 12px;
}

.contact-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.contact-av {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: 700;
  font-size: 14px;
  flex-shrink: 0;
}

.contact-info {
  flex: 1;
}

.contact-title {
  font-weight: 700;
  color: var(--blue);
  font-size: 14px;
}

.contact-detail {
  font-size: 12px;
  color: var(--muted);
  margin-top: 2px;
}

.contact-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-top: 12px;
}

.contact-action {
  display: block;
  text-align: center;
  text-decoration: none;
  border-radius: 100px;
  padding: 8px 10px;
  font-size: 12px;
  font-weight: 700;
}

.contact-action.call {
  background: var(--blue);
  color: var(--gold);
}

.contact-action.email {
  background: rgba(16,6,159,.08);
  color: var(--blue);
}

@media (max-width: 520px) {
  .contact-actions {
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
  <div class="nav-tab" data-panel="announcements">Classroom Announcements</div>
  <div class="nav-tab" data-panel="newsletters">Weekly Newsletter</div>
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

    <div class="today-card">
      <div class="today-label">Today’s Attendance</div>
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
    <h1>Classroom Announcements</h1>
    <div class="sub">Messages sent to your child’s classroom or the whole school</div>

    <div id="announcement-list">
      <div class="placeholder">
        <div style="font-weight:700;color:var(--blue);margin-bottom:4px">Sign In Required</div>
        <div style="font-size:12px">Sign in on the Dashboard tab to see classroom announcements.</div>
      </div>
    </div>
  </section>

  <section class="panel" id="panel-newsletters">
    <h1>Weekly Newsletter</h1>
    <div class="sub">Weekly MAC news, reminders, and upcoming dates.</div>

    <div id="newsletter-list">
      <div class="loading">Loading newsletters...</div>
    </div>
  </section>

  <section class="panel" id="panel-events">
    <h1>School Calendar</h1>
    <div class="sub">Important dates from the 2026–2027 at-a-glance calendar</div>

    <div class="calendar-actions">
      <a class="calendar-link" href="https://www.montessoriacademyofcolorado.org/about/calendar" target="_blank" rel="noopener">View Full MAC Calendar</a>
    </div>

    <div class="calendar-filters" id="calendar-filters">
      <button class="calendar-filter active" data-filter="all">All</button>
      <button class="calendar-filter" data-filter="break">Breaks</button>
      <button class="calendar-filter" data-filter="professional_learning">PD Days</button>
      <button class="calendar-filter" data-filter="holiday">Holidays</button>
      <button class="calendar-filter" data-filter="half_day">12 p.m.</button>
      <button class="calendar-filter" data-filter="milestone">First/Last</button>
    </div>

    <div id="calendar-list">
      <div class="loading">Loading calendar...</div>
    </div>
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

    <div class="contact-card">
      <div class="contact-row">
        <div class="contact-av" style="background:var(--green)">AD</div>
        <div class="contact-info">
          <div class="contact-title">Admissions</div>
          <div class="contact-detail">303-623-2609 ext. 2</div>
          <div class="contact-detail">admissions@tmaoc.com</div>
        </div>
      </div>
      <div class="contact-actions">
        <a class="contact-action call" href="tel:3036232609,2">Call</a>
        <a class="contact-action email" href="mailto:admissions@tmaoc.com">Email</a>
      </div>
    </div>

    <div class="contact-card">
      <div class="contact-row">
        <div class="contact-av" style="background:var(--amber)">PC</div>
        <div class="contact-info">
          <div class="contact-title">Program Changes</div>
          <div class="contact-detail">303-623-2609</div>
          <div class="contact-detail">montessoriacademy@tmaoc.com</div>
        </div>
      </div>
      <div class="contact-actions">
        <a class="contact-action call" href="tel:3036232609">Call</a>
        <a class="contact-action email" href="mailto:montessoriacademy@tmaoc.com">Email</a>
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

  if (panelName === 'activity' && currentChildId) {
    loadActivity(currentChildId);
  }

  if (panelName === 'announcements') {
    loadAnnouncements();
  }

  if (panelName === 'newsletters') {
    loadNewsletters();
  }

  if (panelName === 'events') {
    loadCalendar();
  }
});

document.getElementById('calendar-filters').addEventListener('click', function(e) {
  var button = e.target.closest('.calendar-filter');
  if (!button) return;

  calendarFilter = button.getAttribute('data-filter');

  document.querySelectorAll('.calendar-filter').forEach(function(item) {
    item.classList.remove('active');
  });

  button.classList.add('active');

  renderCalendar();
});

function workerFetch(path, options) {
  return fetch(path, Object.assign({
    credentials: 'include'
  }, options || {}));
}

function signInToPortal() {
  window.location.href = '/api/login';
}

function signOut() {
  window.location.href = '/cdn-cgi/access/logout';
}

function getCurrentChildName() {
  var child = tcChildren.find(function(c) {
    return String(c.id) === String(currentChildId);
  });

  if (!child) return 'this child';

  return child.first_name || child.firstName || child.name || 'this child';
}

function getCurrentChildClassroomId() {
  var child = tcChildren.find(function(c) {
    return String(c.id) === String(currentChildId);
  });

  if (!child) return '';

  return (
    child.classroom_id ||
    child.classroomId ||
    child.current_classroom_id ||
    child.currentClassroomId ||
    child.primary_classroom_id ||
    child.primaryClassroomId ||
    (child.classroom && child.classroom.id) ||
    (Array.isArray(child.classrooms) && child.classrooms[0] && child.classrooms[0].id) ||
    ''
  );
}

function showActionNote(message, type) {
  var note = document.getElementById('quick-action-note');
  note.style.display = 'block';
  note.classList.remove('success-note');
  note.classList.remove('error-note');

  if (type === 'success') note.classList.add('success-note');
  if (type === 'error') note.classList.add('error-note');

  note.innerHTML = message;
}

function setActionButtonsDisabled(disabled) {
  document.getElementById('sign-in-btn').disabled = disabled;
  document.getElementById('sign-out-btn').disabled = disabled;
}

function submitAttendanceAction(action) {
  if (!currentChildId) {
    showActionNote('Please select a child first.', 'error');
    return;
  }

  var childName = getCurrentChildName();
  var actionText = action === 'dropoff' ? 'sign in' : 'sign out';

  var ok = window.confirm('Are you sure you want to ' + actionText + ' ' + childName + '?');

  if (!ok) return;

  setActionButtonsDisabled(true);
  showActionNote('Sending ' + actionText + ' request for ' + escapeHtml(childName) + '...', '');

  var classroomId = getCurrentChildClassroomId();

  workerFetch('/api/attendance-action', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      child_id: currentChildId,
      classroom_id: classroomId || undefined,
      action: action
    })
  })
    .then(function(r) {
      return r.json().then(function(data) {
        if (!r.ok || !data.ok) {
          throw new Error(data.error || data.tcResponse && JSON.stringify(data.tcResponse) || 'Request failed.');
        }

        return data;
      });
    })
    .then(function(data) {
      showActionNote(
        '<strong>Success.</strong><br>' +
        escapeHtml(childName) +
        ' was ' +
        (action === 'dropoff' ? 'signed in' : 'signed out') +
        '.',
        'success'
      );

      setTimeout(function() {
        loadAttendance(currentChildId);
      }, 1000);
    })
    .catch(function(e) {
      showActionNote(
        '<strong>Could not complete request.</strong><br>' +
        escapeHtml(e.message),
        'error'
      );
    })
    .finally(function() {
      setActionButtonsDisabled(false);
    });
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
      document.getElementById('connected-box').style.display = 'block';

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
  document.getElementById('attendance-status').textContent = 'Loading';
  document.getElementById('attendance-sub').textContent = 'Today';

  workerFetch('/api/attendance-summary?child_id=' + encodeURIComponent(childId))
    .then(function(r) {
      if (!r.ok) {
        throw new Error('Attendance request failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      document.getElementById('attendance-val').textContent = data.todayAttendanceValue || '--';
      document.getElementById('attendance-status').textContent = data.todayStatus || 'Today';
      document.getElementById('attendance-sub').textContent = data.day || 'Today';
    })
    .catch(function(e) {
      document.getElementById('attendance-val').textContent = '--';
      document.getElementById('attendance-status').textContent = 'Unable to load';
      document.getElementById('attendance-sub').textContent = 'Today';
    });
}

function loadAnnouncements() {
  if (announcementsLoaded) {
    renderAnnouncements();
    return;
  }

  document.getElementById('announcement-list').innerHTML = '<div class="loading">Loading announcements...</div>';

  workerFetch('/api/announcements')
    .then(function(r) {
      if (!r.ok) {
        throw new Error('Announcements request failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      announcements = Array.isArray(data.announcements) ? data.announcements : [];
      announcementsLoaded = true;
      renderAnnouncements();
    })
    .catch(function(e) {
      document.getElementById('announcement-list').innerHTML =
        '<div class="placeholder">' +
        '<div style="font-weight:700;color:var(--blue);margin-bottom:4px">Announcements could not load</div>' +
        '<div style="font-size:12px">' + escapeHtml(e.message) + '</div>' +
        '</div>';
    });
}

function renderAnnouncements() {
  var container = document.getElementById('announcement-list');

  if (!announcements.length) {
    container.innerHTML =
      '<div class="placeholder">' +
      '<div style="font-weight:700;color:var(--blue);margin-bottom:4px">No classroom announcements found</div>' +
      '<div style="font-size:12px">Announcements sent to your child’s classroom or the whole school will appear here.</div>' +
      '</div>';
    return;
  }

  var html = '';

  announcements.forEach(function(item) {
    html +=
      '<div class="announcement-card">' +
        '<div class="announcement-meta">' +
          '<span class="announcement-date">' + escapeHtml(formatDateTime(item.createdAt)) + '</span>' +
          '<span class="announcement-tag">' + escapeHtml(item.subjectType || 'Announcement') + '</span>' +
        '</div>' +
        '<div class="announcement-title">' + escapeHtml(item.title || 'Announcement') + '</div>' +
        '<div class="announcement-source">' +
          escapeHtml(item.subjectName || '') +
          (item.authorName ? ' · ' + escapeHtml(item.authorName) : '') +
        '</div>' +
        '<div class="announcement-body">' + sanitizeAnnouncementBody(item.body || '') + '</div>' +
        (item.photoUrl ? '<img class="activity-photo" src="' + escapeHtml(item.photoUrl) + '" alt="Announcement photo">' : '') +
      '</div>';
  });

  container.innerHTML = html;
}

function loadNewsletters() {
  if (newslettersLoaded) {
    renderNewsletters();
    return;
  }

  document.getElementById('newsletter-list').innerHTML = '<div class="loading">Loading newsletters...</div>';

  workerFetch('/api/newsletters')
    .then(function(r) {
      if (!r.ok) {
        throw new Error('Newsletter request failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      newsletterArchives = Array.isArray(data.newsletters) ? data.newsletters : [];
      newslettersLoaded = true;
      renderNewsletters();
    })
    .catch(function(e) {
      document.getElementById('newsletter-list').innerHTML =
        '<div class="placeholder">' +
        '<div style="font-weight:700;color:var(--blue);margin-bottom:4px">Newsletters could not load</div>' +
        '<div style="font-size:12px">' + escapeHtml(e.message) + '</div>' +
        '</div>';
    });
}

function renderNewsletters() {
  var container = document.getElementById('newsletter-list');

  if (!newsletterArchives.length) {
    container.innerHTML =
      '<div class="placeholder">' +
      '<div style="font-weight:700;color:var(--blue);margin-bottom:4px">No newsletters found</div>' +
      '<div style="font-size:12px">Weekly newsletters will appear here.</div>' +
      '</div>';
    return;
  }

  var html = '';

  newsletterArchives.forEach(function(item, index) {
    var dateInfo = formatNewsletterDate(item.date);

    html +=
      '<div class="newsletter-card">' +
        '<a class="newsletter-date-link" href="' + escapeHtml(item.url) + '" target="_blank" rel="noopener">' +
          '<div class="newsletter-month">' + escapeHtml(dateInfo.month) + '</div>' +
          '<div class="newsletter-day">' + escapeHtml(dateInfo.day) + '</div>' +
        '</a>' +
        '<div class="newsletter-info">' +
          '<div class="newsletter-title">' + escapeHtml(item.title || 'MAC News') + '</div>' +
          '<div class="newsletter-note">' + (index === 0 ? 'Latest newsletter' : 'Newsletter archive') + '</div>' +
        '</div>' +
      '</div>';
  });

  container.innerHTML = html;
}

function formatNewsletterDate(value) {
  var d = parseLocalDate(value);

  if (!d) {
    return {
      month: '',
      day: ''
    };
  }

  return {
    month: d.toLocaleDateString('en-US', { month: 'short' }),
    day: String(d.getDate())
  };
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

  return d.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
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

function loadCalendar() {
  if (calendarLoaded) {
    renderCalendar();
    return;
  }

  document.getElementById('calendar-list').innerHTML = '<div class="loading">Loading calendar...</div>';

  workerFetch('/api/calendar')
    .then(function(r) {
      if (!r.ok) {
        throw new Error('Calendar request failed. Status: ' + r.status);
      }

      return r.json();
    })
    .then(function(data) {
      calendarEvents = Array.isArray(data.events) ? data.events : [];
      calendarLoaded = true;
      renderCalendar();
    })
    .catch(function(e) {
      document.getElementById('calendar-list').innerHTML =
        '<div class="placeholder">' +
        '<div style="font-weight:700;color:var(--blue);margin-bottom:4px">Calendar could not load</div>' +
        '<div style="font-size:12px">' + escapeHtml(e.message) + '</div>' +
        '</div>';
    });
}

function renderCalendar() {
  var container = document.getElementById('calendar-list');

  if (!calendarEvents.length) {
    container.innerHTML =
      '<div class="placeholder">' +
      '<div style="font-weight:700;color:var(--blue);margin-bottom:4px">No calendar dates found</div>' +
      '<div style="font-size:12px">Use the full MAC calendar link above.</div>' +
      '</div>';
    return;
  }

  var filtered = calendarEvents.filter(function(event) {
    return calendarFilter === 'all' || event.type === calendarFilter;
  });

  if (!filtered.length) {
    container.innerHTML =
      '<div class="placeholder">' +
      '<div style="font-size:12px">No dates found for this filter.</div>' +
      '</div>';
    return;
  }

  var html = '';

  filtered.forEach(function(event) {
    var dateInfo = formatCalendarDate(event.date, event.endDate);

    html +=
      '<div class="calendar-card ' + escapeHtml(event.type || 'calendar') + '">' +
        '<div class="calendar-date-box">' +
          '<div class="calendar-month">' + escapeHtml(dateInfo.month) + '</div>' +
          '<div class="calendar-day">' + escapeHtml(dateInfo.day) + '</div>' +
        '</div>' +
        '<div class="calendar-info">' +
          '<div class="calendar-title">' + escapeHtml(event.title || 'Calendar Date') + '</div>' +
          '<div class="calendar-notes">' + escapeHtml(dateInfo.full) + '</div>' +
          '<span class="calendar-tag">' + escapeHtml(labelCalendarType(event.type)) + '</span>' +
        '</div>' +
      '</div>';
  });

  container.innerHTML = html;
}

function formatCalendarDate(startDate, endDate) {
  var start = parseLocalDate(startDate);
  var end = endDate ? parseLocalDate(endDate) : null;

  if (!start) {
    return {
      month: '',
      day: '',
      full: startDate || ''
    };
  }

  var month = start.toLocaleDateString('en-US', {
    month: 'short'
  });

  var day = String(start.getDate());

  var full = start.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  if (end) {
    full += ' - ' + end.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  }

  return {
    month,
    day,
    full
  };
}

function parseLocalDate(value) {
  if (!value) return null;

  var parts = String(value).split('-');

  if (parts.length !== 3) return null;

  return new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
}

function labelCalendarType(type) {
  var labels = {
    break: 'Seasonal Break',
    professional_learning: 'Professional Learning',
    holiday: 'Holiday',
    half_day: '12 p.m. Dismissal',
    milestone: 'First / Last Day',
    calendar: 'Calendar'
  };

  return labels[type] || type || 'Calendar';
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
