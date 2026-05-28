export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/api/login") {
      return Response.redirect(url.origin + "/?signed_in=1", 302);
    }

    if (url.pathname === "/api") {
      return new Response(
        JSON.stringify({
          status: "api running",
          hasToken: Boolean(env.TC_TOKEN),
          hasSchoolId: Boolean(env.TC_SCHOOL_ID),
          hasKVBinding: Boolean(env.PARENT_PERMISSIONS),
          signedInEmail: request.headers.get("cf-access-authenticated-user-email") || null
        }),
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    return new Response(
      `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>MAC Parent Portal</title>
</head>
<body style="font-family: Arial, sans-serif; padding: 40px;">
  <h1>MAC Parent Portal</h1>
  <p>The Worker app is running.</p>
  <p><a href="/api/login">Test Login Redirect</a></p>
  <p><a href="/api">Test API</a></p>
</body>
</html>`,
      {
        headers: {
          "Content-Type": "text/html; charset=utf-8"
        }
      }
    );
  }
};
