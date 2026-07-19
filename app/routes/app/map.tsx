// ─────────────────────────────────────────────────────────────────
// app/routes/app/map.tsx
// Route: GET /app/map
// ─────────────────────────────────────────────────────────────────
// This route renders the full-screen map with a Deck.gl heatmap.
//
// HOW THE MAP WORKS:
//   1. MapLibre GL renders the base vector map (tiles from OpenFreeMap).
//   2. Deck.gl overlays a HeatmapLayer on top using WebGL.
//   3. Data is loaded from the /api/locations loader (server → D1).
//
// ⚠️  RULES:
//   - Do NOT use React-Leaflet or Google Maps.
//   - Do NOT render the map on the server (use client-only component).
//   - The map container MUST have an explicit height (h-full).
// ─────────────────────────────────────────────────────────────────

import type { Route } from "./+types/map";
import { MapView } from "~/components/map/MapView";

export const meta: Route.MetaFunction = () => [
  { title: "Map — Kronotara" },
];

export default function MapPage() {
  return (
    <div className="relative flex h-full flex-col">
      {/* Page header */}
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
        <div>
          <h1 className="text-lg font-semibold">Heatmap View</h1>
          <p className="text-xs text-muted-foreground">MapLibre GL + Deck.gl</p>
        </div>
      </div>

      {/* Map fills remaining height */}
      <div className="flex-1">
        <MapView />
      </div>
    </div>
  );
}
