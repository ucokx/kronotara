// ─────────────────────────────────────────────────────────────────
// app/routes/api/health.ts
// Route: GET /api/health
//
// A simple health check endpoint. No UI — returns JSON only.
// Use this to verify the edge worker is alive and D1 is reachable.
// ─────────────────────────────────────────────────────────────────
import { data } from "react-router";
import { getDB } from "~/lib/db.server";
export async function loader({ context }) {
    let dbStatus = "ok";
    try {
        const db = getDB(context);
        // Lightweight query to verify D1 connectivity
        await db.prepare("SELECT 1").first();
    }
    catch (err) {
        dbStatus = "error";
    }
    return data({
        status: dbStatus === "ok" ? "healthy" : "degraded",
        db: dbStatus,
        timestamp: new Date().toISOString(),
        version: "1.0.0-mvp",
    }, {
        headers: {
            // No caching for health checks
            "Cache-Control": "no-store",
        },
    });
}
