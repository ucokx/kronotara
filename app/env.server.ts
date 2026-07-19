// ─────────────────────────────────────────────────────────────────
// app/env.server.ts
// ─────────────────────────────────────────────────────────────────
// Centralizes Cloudflare env typing so every loader/action
// can get typed access to env.DB, env.SESSION_KV, etc.
// ─────────────────────────────────────────────────────────────────

export interface Env {
  /** Cloudflare D1 database binding — use env.DB.prepare(...) */
  DB: D1Database;

  /** App environment identifier: "development" | "production" */
  APP_ENV: string;

  /** Secret token to secure the /api/ingest cron endpoint */
  CRON_SECRET: string;

  // Add additional bindings here as your project grows:
  // SESSION_KV: KVNamespace;
  // MY_BUCKET: R2Bucket;
}
