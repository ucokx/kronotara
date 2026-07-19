import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/routes/app/data.tsx
// Route: GET /app/data
//
// Fetches arsip rows from Cloudflare D1 with FTS5 support.
// ─────────────────────────────────────────────────────────────────
import { data, Form, useSubmit, useNavigation } from "react-router";
import { getDB, dbQuery } from "~/lib/db.server";
// ── Loader (server) ───────────────────────────────────────────────
export async function loader({ request, context }) {
    const url = new URL(request.url);
    const q = url.searchParams.get("q") || "";
    const db = getDB(context);
    let arsip = [];
    if (q) {
        // FTS5 query
        const sql = `
      SELECT a.id_arsip, a.judul, a.deskripsi, a.tahun, a.lokasi_teks, a.latitude, a.longitude
      FROM arsip a
      JOIN arsip_fts f ON a.id_arsip = f.id_arsip
      WHERE arsip_fts MATCH ?
      ORDER BY rank
      LIMIT 100
    `;
        arsip = await dbQuery(db, sql, [q]);
    }
    else {
        // Recent items
        const sql = `
      SELECT id_arsip, judul, deskripsi, tahun, lokasi_teks, latitude, longitude
      FROM arsip
      ORDER BY created_at DESC
      LIMIT 100
    `;
        arsip = await dbQuery(db, sql);
    }
    return data({ arsip, q });
}
// ── Meta ──────────────────────────────────────────────────────────
export const meta = () => [
    { title: "Data Arsip — Kronotara" },
];
// ── Page Component ────────────────────────────────────────────────
export default function DataPage({ loaderData }) {
    const { arsip, q } = loaderData;
    const submit = useSubmit();
    const navigation = useNavigation();
    const isSearching = navigation.state === "loading";
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Data Arsip" }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Jelajahi dan cari metadata arsip (menampilkan hingga 100 baris)." }), _jsx("div", { className: "mt-6", children: _jsxs(Form, { id: "search-form", role: "search", onChange: (event) => {
                        const isFirstSearch = q === null;
                        submit(event.currentTarget, { replace: !isFirstSearch });
                    }, children: [_jsx("input", { type: "search", name: "q", defaultValue: q, placeholder: "Cari berdasarkan judul atau deskripsi...", className: "w-full max-w-md rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" }), isSearching && _jsx("span", { className: "ml-3 text-sm text-muted-foreground", children: "Mencari..." })] }) }), arsip.length === 0 && (_jsx("div", { className: "mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground", children: q ? "Tidak ada hasil pencarian yang cocok." : "Belum ada data arsip. Jalankan injeksi data / cron terlebih dahulu." })), arsip.length > 0 && (_jsx("div", { className: "mt-6 overflow-x-auto rounded-xl border border-border", children: _jsxs("table", { className: "w-full text-sm", children: [_jsx("thead", { className: "border-b border-border bg-muted", children: _jsx("tr", { children: ["Tahun", "Judul", "Lokasi", "Lat", "Lng"].map((h) => (_jsx("th", { className: "px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap", children: h }, h))) }) }), _jsx("tbody", { children: arsip.map((row, i) => (_jsxs("tr", { className: i % 2 === 0 ? "bg-card" : "bg-muted/30", children: [_jsx("td", { className: "px-4 py-3 font-semibold text-primary", children: row.tahun }), _jsxs("td", { className: "px-4 py-3 font-medium min-w-[300px]", children: [_jsx("div", { className: "font-bold", children: row.judul }), _jsx("div", { className: "text-xs text-muted-foreground mt-1 line-clamp-2", title: row.deskripsi, children: row.deskripsi })] }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.lokasi_teks || "-" }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.latitude?.toFixed(4) || "-" }), _jsx("td", { className: "px-4 py-3 text-muted-foreground", children: row.longitude?.toFixed(4) || "-" })] }, row.id_arsip))) })] }) }))] }));
}
