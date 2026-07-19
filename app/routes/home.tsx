// ─────────────────────────────────────────────────────────────────
// app/routes/home.tsx
// Route: GET /
// ─────────────────────────────────────────────────────────────────

import { Link } from "react-router";
import type { Route } from "./+types/home";

export const meta: Route.MetaFunction = () => [
  { title: "Kronotara — Geospatial Heatmap Platform" },
  { name: "description", content: "Explore geospatial heatmaps powered by Cloudflare and MapLibre." },
];

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-20">
      {/* Hero */}
      <div className="flex flex-col items-center gap-4 text-center">
        <span className="rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
          Beta
        </span>
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          Kronot<span className="text-primary">ara</span>
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          Geospatial heatmap analytics platform. Visualize, explore, and understand
          location data at scale — powered by Cloudflare &amp; MapLibre GL.
        </p>
      </div>

      {/* CTA */}
      <div className="flex flex-wrap gap-4">
        <Link
          to="/app/map"
          className="rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Open Map →
        </Link>
        <Link
          to="/about"
          className="rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted"
        >
          Learn More
        </Link>
      </div>

      {/* Feature grid */}
      <div className="mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { icon: "🗺️", title: "MapLibre GL", desc: "Fast, open-source vector maps" },
          { icon: "🔥", title: "Deck.gl Heatmap", desc: "GPU-accelerated data layers" },
          { icon: "⚡", title: "Cloudflare Edge", desc: "D1 + Pages, globally distributed" },
        ].map((f) => (
          <div key={f.title} className="rounded-xl border border-border bg-card p-5">
            <div className="text-2xl">{f.icon}</div>
            <h2 className="mt-2 font-semibold">{f.title}</h2>
            <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
