import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/routes/app/data.tsx
// Route: GET /app/data
//
// Fetches location rows from Cloudflare D1 and displays them
// in a table. This is a server-rendered route.
// ─────────────────────────────────────────────────────────────────
import { data } from "react-router";
import { getDB, dbQuery } from "~/lib/db.server";
import { formatDate } from "~/lib/utils";
// ── Loader (server) ───────────────────────────────────────────────
// Runs on the server/edge. Fetches data from D1 before rendering.
export async function loader({ context }) {
    const db = getDB(context);
    const locations = await dbQuery(db, "SELECT id, name, latitude, longitude, intensity, created_at FROM locations ORDER BY created_at DESC LIMIT 100");
    return data({ locations });
}
// ── Meta ──────────────────────────────────────────────────────────
export const meta = () => [
    { title: "Data — Kronotara" },
];
// ── Page Component ────────────────────────────────────────────────
export default function DataPage({ loaderData }) {
    const { locations } = loaderData;
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Location Data" }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Showing up to 100 most recent entries from D1." }), locations.length === 0 && (_jsx("div", { className: "mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground", children: "No data yet. Run the D1 migration then insert some rows." })), locations.length > 0 && (_jsx("div", { className: "mt-6 overflow-x-auto rounded-xl border border-border", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "border-b border-border bg-muted", children: _jsx("tr", { children: ["ID", "Name", "Lat", "Lng", "Intensity", "Created"].map((h) => (_jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground", children: h }, h))) }) }), _jsx("tbody", { children: locations.map((row, i) => (_jsxs("tr", { className: i % 2 === 0 ? "bg-card" : "bg-muted/30", children: [_jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.id }), _jsx("td", { className: "px-4 py-3 font-medium", children: row.name }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.latitude.toFixed(6) }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.longitude.toFixed(6) }), _jsx("td", { className: "px-4 py-3", children: _jsx("span", { className: "rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary", children: row.intensity }) }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: formatDate(row.created_at) })] }, row.id))) })] }) }))] }));
}
