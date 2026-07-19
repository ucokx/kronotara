// ─────────────────────────────────────────────────────────────────
// app/routes/app/data.tsx
// Route: GET /app/data
//
// Fetches arsip rows from Cloudflare D1 with FTS5 support.
// ─────────────────────────────────────────────────────────────────

import { data, Form, useSubmit, useNavigation } from "react-router";
import type { Route } from "./+types/data";
import { getDB, dbQuery } from "~/lib/db.server";

// ── Types ─────────────────────────────────────────────────────────
export interface ArsipRow {
  id_arsip: string;
  judul: string;
  deskripsi: string;
  tahun: number;
  lokasi_teks: string;
  latitude: number;
  longitude: number;
}

// ── Loader (server) ───────────────────────────────────────────────
export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const q = url.searchParams.get("q") || "";
  const db = getDB(context);

  let arsip: ArsipRow[] = [];

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
    arsip = await dbQuery<ArsipRow>(db, sql, [q]);
  } else {
    // Recent items
    const sql = `
      SELECT id_arsip, judul, deskripsi, tahun, lokasi_teks, latitude, longitude
      FROM arsip
      ORDER BY created_at DESC
      LIMIT 100
    `;
    arsip = await dbQuery<ArsipRow>(db, sql);
  }

  return data({ arsip, q });
}

// ── Meta ──────────────────────────────────────────────────────────
export const meta: Route.MetaFunction = () => [
  { title: "Data Arsip — Kronotara" },
];

// ── Page Component ────────────────────────────────────────────────
export default function DataPage({ loaderData }: Route.ComponentProps) {
  const { arsip, q } = loaderData;
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSearching = navigation.state === "loading";

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Data Arsip</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Jelajahi dan cari metadata arsip (menampilkan hingga 100 baris).
      </p>

      {/* Search Bar */}
      <div className="mt-6">
        <Form 
          id="search-form" 
          role="search"
          onChange={(event) => {
            const isFirstSearch = q === null;
            submit(event.currentTarget, { replace: !isFirstSearch });
          }}
        >
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Cari berdasarkan judul atau deskripsi..."
            className="w-full max-w-md rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          />
          {isSearching && <span className="ml-3 text-sm text-muted-foreground">Mencari...</span>}
        </Form>
      </div>

      {/* Empty state */}
      {arsip.length === 0 && (
        <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center text-muted-foreground">
          {q ? "Tidak ada hasil pencarian yang cocok." : "Belum ada data arsip. Jalankan injeksi data / cron terlebih dahulu."}
        </div>
      )}

      {/* Data table */}
      {arsip.length > 0 && (
        <div className="mt-6 overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-muted">
              <tr>
                {["Tahun", "Judul", "Lokasi", "Lat", "Lng"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left font-medium text-muted-foreground whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {arsip.map((row: ArsipRow, i: number) => (
                <tr
                  key={row.id_arsip}
                  className={i % 2 === 0 ? "bg-card" : "bg-muted/30"}
                >
                  <td className="px-4 py-3 font-semibold text-primary">{row.tahun}</td>
                  <td className="px-4 py-3 font-medium min-w-[300px]">
                    <div className="font-bold">{row.judul}</div>
                    <div className="text-xs text-muted-foreground mt-1 line-clamp-2" title={row.deskripsi}>{row.deskripsi}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{row.lokasi_teks || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.latitude?.toFixed(4) || "-"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.longitude?.toFixed(4) || "-"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
