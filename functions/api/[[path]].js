export async function onRequest(context) {
  const { request, env } = context;

  const headers = {
    "Access-Control-Allow-Origin": new URL(request.url).origin,
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "*",
    "Access-Control-Allow-Credentials": "true",
    "Content-Type": "application/json"
  };

  if (request.method === "OPTIONS") {
    return new Response(null, { headers });
  }

  const url = new URL(request.url);
  const path = url.pathname.replace(/^\/api/, "") || "/";
  const baseUrl = "https://www.transparentclassroom.com/api/v1";

  const token = env.TC_TOKEN;
  const schoolId = env.TC_SCHOOL_ID;
  const userEmail = getUserEmail(request);

  if (!token || !schoolId) {
    return new Response(
      JSON.stringify({
        error: "Missing Cloudflare secrets",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId)
      }),
      { status: 500, headers }
    );
  }

  if (!env.PARENT_PERMISSIONS) {
    return new Response(
      JSON.stringify({
        error: "Missing KV binding: PARENT_PERMISSIONS"
      }),
      { status: 500, headers }
    );
  }

  const tcHeaders = {
    "X-TransparentClassroomToken": token,
    "X-TransparentClassroomSchoolId": schoolId,
    "Content-Type": "application/json"
  };

  if (path === "/" || path === "") {
    return new Response(
      JSON.stringify({
        status: "running",
        hasToken: Boolean(token),
        hasSchoolId: Boolean(schoolId),
        hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
        signedInEmail: userEmail || null,
        routes: [
          "/api/login",
          "/api/children",
          "/api/activity?child_id=CHILD_ID",
          "/api/activity-raw?child_id=CHILD_ID",
          "/api/permission-test"
        ]
      }),
      { headers }
    );
  }

  if (path === "/login") {
    return Response.redirect(url.origin + "/?signed_in=1", 302);
  }

  if (path === "/permission-test") {
    if (!userEmail) {
      return new Response(
        JSON.stringify({
          error: "No signed-in email found. Cloudflare Access may not be enabled."
        }),
        { status: 401, headers }
      );
    }

    const allowed = await getAllowedChildren(env, userEmail);

    return new Response(
      JSON.stringify({
        signedInEmail: userEmail,
        allowedChildren: allowed
      }),
      { headers }
    );
  }

  if (!userEmail) {
    return new Response(
      JSON.stringify({
        error: "Not signed in through Cloudflare Access"
      }),
      { status: 401, headers }
    );
  }

  const allowedChildren = await getAllowedChildren(env, userEmail);

  if (!allowedChildren) {
    return new Response(
      JSON.stringify({
        error: "This email does not have permission to view children",
        email: userEmail
      }),
      { status: 403, headers }
    );
  }

  if (path === "/children") {
    const tcUrl = new URL(baseUrl + "/children.json");
    tcUrl.searchParams.set("school_id", schoolId);

    const response = await fetch(tcUrl.toString(), {
      method: "GET",
      headers: tcHeaders
    });

    const data = await response.json();

    if (!response.ok) {
      return new Response(JSON.stringify(data), {
        status: response.status,
        headers
      });
    }

    const children = normalizeChildren(data);
    const filteredChildren = filterChildrenForUser(children, allowedChildren);

    return new Response(JSON.stringify(filteredChildren), {
      status: 200,
      headers
    });
  }

  if (path === "/activity") {
    const childId = url.searchParams.get("child_id");
    const dateStart = url.searchParams.get("date_start") || "";

    if (!childId) {
      return new Response(
        JSON.stringify({ error: "Missing child_id" }),
        { status: 400, headers }
      );
    }

    if (!canAccessChild(childId, allowedChildren)) {
      return new Response(
        JSON.stringify({
          error: "This user does not have permission to view this child",
          email: userEmail,
          childId: childId
        }),
        { status: 403, headers }
      );
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
      headers
    });
  }

  if (path === "/activity-raw") {
    const childId = url.searchParams.get("child_id");
    const dateStart = url.searchParams.get("date_start") || "";

    if (!childId) {
      return new Response(
        JSON.stringify({ error: "Missing child_id" }),
        { status: 400, headers }
      );
    }

    if (!canAccessChild(childId, allowedChildren)) {
      return new Response(
        JSON.stringify({
          error: "This user does not have permission to view this child",
          email: userEmail,
          childId: childId
        }),
        { status: 403, headers }
      );
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
      headers
    });
  }

  return new Response(
    JSON.stringify({
      error: "Route not found",
      availableRoutes: [
        "/api/login",
        "/api/children",
        "/api/activity?child_id=CHILD_ID",
        "/api/activity-raw?child_id=CHILD_ID",
        "/api/permission-test"
      ]
    }),
    { status: 404, headers }
  );
}

function getUserEmail(request) {
  const email = request.headers.get("cf-access-authenticated-user-email");
  return email ? email.toLowerCase().trim() : null;
}

async function getAllowedChildren(env, email) {
  const value = await env.PARENT_PERMISSIONS.get(email.toLowerCase().trim());

  if (!value) {
    return null;
  }

  if (value === "*") {
    return "*";
  }

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
  if (allowedChildren === "*") {
    return children;
  }

  const allowedSet = new Set(allowedChildren.map(String));

  return children.filter(function(child) {
    return allowedSet.has(String(child.id));
  });
}

function canAccessChild(childId, allowedChildren) {
  if (allowedChildren === "*") {
    return true;
  }

  return allowedChildren.map(String).includes(String(childId));
}
