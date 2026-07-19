// ─────────────────────────────────────────────────────────────────
// app/routes.ts
// ─────────────────────────────────────────────────────────────────
// ROUTE REGISTRY — Define all application routes here.
// React Router v7 uses file-based + config-based routing.
//
// HOW TO ADD A NEW ROUTE:
//   1. Create the file under app/routes/
//   2. Add an entry here using route() or layout()
//
// Docs: https://reactrouter.com/start/framework/routing
// ─────────────────────────────────────────────────────────────────

import { type RouteConfig, index, route, layout } from "@react-router/dev/routes";

export default [
  // ── Public routes ───────────────────────────────────────────────
  index("routes/home.tsx"),                         // GET /
  route("about", "routes/about.tsx"),               // GET /about

  // ── Map / Dashboard routes ──────────────────────────────────────
  layout("routes/app-layout.tsx", [
    route("app", "routes/app/index.tsx"),           // GET /app
    route("app/map", "routes/app/map.tsx"),         // GET /app/map
    route("app/data", "routes/app/data.tsx"),       // GET /app/data
  ]),

  // ── API routes (server-only loaders/actions, no UI) ────────────
  route("api/health", "routes/api/health.ts"),      // GET /api/health
  route("api/ingest", "routes/api/ingest.ts"),      // GET /api/ingest
] satisfies RouteConfig;
