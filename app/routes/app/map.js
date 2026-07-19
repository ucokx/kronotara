import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/routes/app/map.tsx
// Route: GET /app/map
// ─────────────────────────────────────────────────────────────────
import { useState } from "react";
import { data } from "react-router";
import { getDB, dbQuery } from "~/lib/db.server";
import { MapView } from "~/components/map/MapView";
export async function loader({ context }) {
    const db = getDB(context);
    const sql = `
    SELECT id_arsip, judul, deskripsi, tahun, lokasi_teks, latitude, longitude 
    FROM arsip 
    WHERE latitude IS NOT NULL AND longitude IS NOT NULL
  `;
    const points = await dbQuery(db, sql);
    // Find min/max year for slider bounds
    let minYear = 2016;
    let maxYear = new Date().getFullYear();
    if (points.length > 0) {
        minYear = Math.min(...points.map((p) => p.tahun));
        maxYear = Math.max(...points.map((p) => p.tahun));
    }
    return data({ points, minYear, maxYear });
}
export const meta = () => [
    { title: "Historical Heatmap — Kronotara" },
];
export default function MapPage({ loaderData }) {
    const { points, minYear, maxYear } = loaderData;
    const [filterYear, setFilterYear] = useState(maxYear);
    return (_jsxs("div", { className: "relative flex h-full flex-col", children: [_jsxs("div", { className: "flex items-center justify-between border-b border-border bg-card px-6 py-3", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-lg font-semibold", children: "Historical Heatmap" }), _jsxs("p", { className: "text-xs text-muted-foreground", children: ["Menampilkan ", points.length, " titik arsip"] })] }), _jsxs("div", { className: "flex items-center space-x-4 bg-muted px-4 py-2 rounded-lg border border-border", children: [_jsx("label", { className: "text-sm font-medium", children: "Tahun:" }), _jsx("input", { type: "range", min: minYear, max: maxYear, value: filterYear, onChange: (e) => setFilterYear(parseInt(e.target.value, 10)), className: "w-48 accent-primary cursor-pointer" }), _jsx("span", { className: "font-bold text-primary w-12 text-center", children: filterYear })] })] }), _jsx("div", { className: "flex-1 relative", children: _jsx(MapView, { points: points, filterYear: filterYear }) })] }));
}
