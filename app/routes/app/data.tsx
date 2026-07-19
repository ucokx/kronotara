// ─────────────────────────────────────────────────────────────────
// app/routes/app/data.tsx
// Route: GET /app/data
//
// Fetches location rows from Cloudflare D1 and displays them
// in a table. This is a server-rendered route.
// ─────────────────────────────────────────────────────────────────

import { data } from "react-router";
import type { Route } from "./+types/data";
import { getDB, dbQuery } from "~/lib/db.server";
import { formatDate } from "~/lib/utils";

// ── Types ─────────────────────────────────────────────────────────
interface LocationRow {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  intensity: number;
  created_at: string;
}

// ── Loader (server) ───────────────────────────────────────────────
// Runs on the server/edge. Fetches data from D1 before rendering.
export async function loader({ context }: Route.LoaderArgs) {
  const db = getDB(context);
  const locations = await dbQuery<LocationRow>(
    db,
    "SELECT id, name, latitude, longitude, intensity, created_at FROM locations ORDER BY created_at DESC LIMIT 100"
  );
  return data({ locations });
}

// ── Meta ──────────────────────────────────────────────────────────
export const meta: Route.MetaFunction = () => [
  { title: "Data — Kronotara" },
];

// ── Page Component ────────────────────────────────────────────────
export default function DataPage({ loaderData }: Route.ComponentProps) {
  const { locations } = loaderData;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Location Data</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Showing up to 100 most recent entries from D1.
      </p>

      {/* Empty state */}
      {locations.length === 0 && (
        <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          No data yet. Run the D1 migration then insert some rows.
        </div>
      )}

      {/* Data table */}
      {locations.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                {["ID", "Name", "Lat", "Lng", "Intensity", "Created"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {locations.map((row: LocationRow, i: number) => (
                <tr
                  key={row.id}
                  className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}
                >
                  <td className="px-4 py-3 text-muted-foreground">{row.id}</td>
                  <td className="px-4 py-3 font-medium">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.latitude.toFixed(6)}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.longitude.toFixed(6)}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                      {row.intensity}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(row.created_at)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
