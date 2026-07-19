// ─────────────────────────────────────────────────────────────────
// app/lib/db.server.ts
// ─────────────────────────────────────────────────────────────────
// Database access layer for Cloudflare D1.
//
// ⚠️  RULES:
//   - ONLY import this file in .server.ts files or route loaders/actions.
//   - NEVER import this on the client (browser) side.
//   - Do NOT use Prisma, TypeORM, or any Node.js DB driver.
//   - Use env.DB (D1Database) directly.
//
// HOW D1 WORKS:
//   env.DB is the D1Database instance injected by Cloudflare.
//   Use the prepare → bind → (run | first | all) pattern.
//
// EXAMPLE USAGE IN A LOADER:
//   import { getDB } from "~/lib/db.server";
//   export async function loader({ context }: Route.LoaderArgs) {
//     const db = getDB(context);
//     const rows = await db.prepare("SELECT * FROM locations").all();
//     return json(rows.results);
//   }
// ─────────────────────────────────────────────────────────────────
/**
 * getDB — Extract the D1Database binding from the Cloudflare context.
 *
 * @param context - The React Router load context (injected by Cloudflare adapter)
 * @returns D1Database instance
 * @throws Error if DB binding is missing (check wrangler.toml)
 */
export function getDB(context) {
    const env = context.cloudflare.env;
    if (!env.DB) {
        throw new Error("[db.server] DB binding not found. " +
            "Check wrangler.toml — ensure [[d1_databases]] is configured and database_id is set.");
    }
    return env.DB;
}
// ── Query Helpers ─────────────────────────────────────────────────
/**
 * dbQuery — Run a parameterized SELECT query.
 *
 * @param db     - D1Database from getDB()
 * @param sql    - SQL string with ? placeholders
 * @param params - Bound parameters (replaces ? in order)
 * @returns Array of result rows typed as T
 *
 * @example
 * const rows = await dbQuery<Location>(db, "SELECT * FROM locations WHERE id = ?", [id]);
 */
export async function dbQuery(db, sql, params = []) {
    const stmt = db.prepare(sql).bind(...params);
    const result = await stmt.all();
    return result.results;
}
/**
 * dbFirst — Run a query and return only the first result.
 *
 * @param db     - D1Database from getDB()
 * @param sql    - SQL string with ? placeholders
 * @param params - Bound parameters
 * @returns First result row or null if not found
 */
export async function dbFirst(db, sql, params = []) {
    return db.prepare(sql).bind(...params).first();
}
/**
 * dbRun — Run an INSERT / UPDATE / DELETE statement.
 *
 * @param db     - D1Database from getDB()
 * @param sql    - SQL string with ? placeholders
 * @param params - Bound parameters
 * @returns D1Result with meta (changes, last_row_id)
 */
export async function dbRun(db, sql, params = []) {
    return db.prepare(sql).bind(...params).run();
}
