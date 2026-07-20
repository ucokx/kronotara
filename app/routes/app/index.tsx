// ─────────────────────────────────────────────────────────────────
// app/routes/app/index.tsx
// Route: GET /app  (Dashboard overview)
// ─────────────────────────────────────────────────────────────────

import type { Route } from "./+types/index";
import { getDB } from "~/lib/db.server";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard — Kronotara" },
];

export async function loader({ context }: Route.LoaderArgs) {
  const db = await getDB(context);
  
  // Fetch real stats
  const totalArsip = await db.prepare("SELECT COUNT(*) as count FROM arsip").first("count") as number;
  const totalLokasi = await db.prepare("SELECT COUNT(DISTINCT lokasi_teks) as count FROM arsip").first("count") as number;
  const rentangTahunData = await db.prepare("SELECT MIN(tahun) as minTahun, MAX(tahun) as maxTahun FROM arsip").first() as any;
  
  const rentangTahun = totalArsip > 0 
    ? `${rentangTahunData.minTahun} - ${rentangTahunData.maxTahun}`
    : "—";

  return {
    totalArsip,
    totalLokasi,
    rentangTahun
  };
}

export default function AppDashboardPage({ loaderData }: Route.ComponentProps) {
  const { totalArsip, totalLokasi, rentangTahun } = loaderData;

  return (
    <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Hero / About Section */}
      <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-8 md:p-12 shadow-2xl border border-white/10">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none"></div>
        
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">Kronotara</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed font-light">
            Sistem Informasi Geografis (SIG) interaktif untuk memetakan, melacak, dan memvisualisasikan persebaran historis data arsip nasional Indonesia dari waktu ke waktu.
          </p>
          <div className="mt-8 flex gap-4">
            <Link to="/app/map" className="px-8 py-3.5 bg-white text-indigo-950 font-bold rounded-full hover:bg-orange-50 hover:scale-105 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)]">
              Buka Peta Heatmap
            </Link>
          </div>
        </div>
      </div>

      {/* Stats cards */}
      <div>
        <h2 className="text-2xl font-bold tracking-tight mb-6">Statistik Database</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {[
            { label: "Total Arsip Terekam", value: totalArsip, icon: "📄" },
            { label: "Total Lokasi Berbeda", value: totalLokasi, icon: "📍" },
            { label: "Rentang Tahun Arsip", value: rentangTahun, icon: "⏳" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="relative overflow-hidden rounded-2xl border border-border bg-card/50 backdrop-blur-xl p-6 shadow-sm hover:shadow-md hover:-translate-y-1 transition duration-300 group"
            >
              <div className="absolute -right-2 -top-2 text-7xl opacity-5 group-hover:opacity-10 group-hover:rotate-12 group-hover:scale-110 transition-all duration-500 pointer-events-none">{stat.icon}</div>
              <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
              <p className="mt-2 text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br from-foreground to-foreground/60">{stat.value}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
