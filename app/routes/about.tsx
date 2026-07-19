// ─────────────────────────────────────────────────────────────────
// app/routes/about.tsx
// Route: GET /about
// ─────────────────────────────────────────────────────────────────

import { Link } from "react-router";
import type { Route } from "./+types/about";

export const meta: Route.MetaFunction = () => [
  { title: "About — Kronotara" },
  { name: "description", content: "About the Kronotara geospatial platform." },
];

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-2xl px-6 py-20">
      <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to Home
      </Link>
      <h1 className="mt-6 text-4xl font-bold">About Kronotara</h1>
      <p className="mt-4 text-muted-foreground">
        Kronotara is an open geospatial heatmap analytics platform built on the
        Cloudflare edge network. It uses MapLibre GL for basemap rendering and
        Deck.gl for GPU-accelerated heatmap visualization.
      </p>
      <h2 className="mt-8 text-xl font-semibold">Tech Stack</h2>
      <ul className="mt-3 space-y-2 text-muted-foreground">
        <li>⚛️ <strong className="text-foreground">React Router v7</strong> — Full-stack SSR framework (formerly Remix)</li>
        <li>☁️ <strong className="text-foreground">Cloudflare Pages</strong> — Edge deployment</li>
        <li>🗄️ <strong className="text-foreground">Cloudflare D1</strong> — Serverless SQLite database</li>
        <li>🗺️ <strong className="text-foreground">MapLibre GL</strong> — Open-source vector maps</li>
        <li>🔥 <strong className="text-foreground">Deck.gl</strong> — GPU-accelerated data layers</li>
        <li>🎨 <strong className="text-foreground">Tailwind CSS v4</strong> — Utility-first styling</li>
        <li>🧩 <strong className="text-foreground">shadcn/ui</strong> — Accessible component primitives</li>
      </ul>
    </main>
  );
}
