// ─────────────────────────────────────────────────────────────────
// app/routes/app/map.tsx
// Route: GET /app/map
// ─────────────────────────────────────────────────────────────────

import { useState } from "react";
import { data } from "react-router";
import type { Route } from "./+types/map";
import { getDB, dbQuery } from "~/lib/db.server";
import { MapView } from "~/components/map/MapView";

export async function loader({ context }: Route.LoaderArgs) {
  const db = await getDB(context);
  const sql = `
    SELECT id_arsip, judul, deskripsi, tahun, lokasi_teks, latitude, longitude 
    FROM arsip 
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL
  `;
  const points = await dbQuery<any>(db, sql);
  
  // Find min/max year for slider bounds
  let minYear = 2016;
  let maxYear = new Date().getFullYear();
  if (points.length > 0) {
    minYear = Math.min(...points.map((p: any) => p.tahun));
    maxYear = Math.max(...points.map((p: any) => p.tahun));
  }

  return data({ points, minYear, maxYear });
}

export const meta: Route.MetaFunction = () => [
  { title: "Historical Heatmap — Kronotara" },
];

export default function MapPage({ loaderData }: Route.ComponentProps) {
  const { points, minYear, maxYear } = loaderData;
  const [filterYear, setFilterYear] = useState<number>(maxYear);

  return (
    <div className="relative flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold">Historical Heatmap</h1>
          <p className="text-xs text-muted-foreground">Menampilkan {points.length} titik arsip</p>
        </div>
        
        {/* Time Slider */}
        <div className="flex items-center space-x-4 bg-muted px-4 py-2 rounded-lg border border-border">
          <label className="text-sm font-medium">Tahun:</label>
          <input 
            type="range" 
            min={minYear} 
            max={maxYear} 
            value={filterYear}
            onChange={(e) => setFilterYear(parseInt(e.target.value, 10))}
            className="w-48 accent-primary cursor-pointer"
          />
          <span className="font-bold text-primary w-12 text-center">{filterYear}</span>
        </div>
      </div>

      {/* Map fills remaining height */}
      <div className="flex-1 relative">
        <MapView points={points} filterYear={filterYear} />
      </div>
    </div>
  );
}
