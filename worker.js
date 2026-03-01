export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // CORS headers
    const corsHeaders = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, PUT, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders });
    }

    // API routes
    if (path.startsWith("/api/users")) {
      const idMatch = path.match(/^\/api\/users\/(\d+)$/);

      // GET /api/users — fetch all users
      if (request.method === "GET" && path === "/api/users") {
        const { results } = await env.DB.prepare(
          "SELECT id, name, email, password, birthday FROM users ORDER BY id"
        ).all();
        return Response.json(results, { headers: corsHeaders });
      }

      // GET /api/users/:id — fetch one user
      if (request.method === "GET" && idMatch) {
        const id = idMatch[1];
        const user = await env.DB.prepare(
          "SELECT id, name, email, password, birthday FROM users WHERE id = ?"
        ).bind(id).first();
        if (!user) return new Response("Not Found", { status: 404, headers: corsHeaders });
        return Response.json(user, { headers: corsHeaders });
      }

      // PUT /api/users/:id — update user
      if (request.method === "PUT" && idMatch) {
        const id = idMatch[1];
        const body = await request.json();
        const { name, email, password, birthday } = body;

        if (!name || !email || !birthday) {
          return new Response("name, email, birthday are required", {
            status: 400,
            headers: corsHeaders,
          });
        }

        const result = await env.DB.prepare(
          "UPDATE users SET name=?, email=?, password=?, birthday=? WHERE id=?"
        ).bind(name, email, password ?? "", birthday, id).run();

        if (result.meta.changes === 0) {
          return new Response("Not Found", { status: 404, headers: corsHeaders });
        }

        const updated = await env.DB.prepare(
          "SELECT id, name, email, password, birthday FROM users WHERE id = ?"
        ).bind(id).first();
        return Response.json(updated, { headers: corsHeaders });
      }

      return new Response("Method Not Allowed", { status: 405, headers: corsHeaders });
    }

    // Fall through to static assets
    return env.ASSETS.fetch(request);
  },
};
