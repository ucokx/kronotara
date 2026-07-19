import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/routes/home.tsx
// Route: GET /
// ─────────────────────────────────────────────────────────────────
import { Link } from "react-router";
export const meta = () => [
    { title: "Kronotara — Geospatial Heatmap Platform" },
    { name: "description", content: "Explore geospatial heatmaps powered by Cloudflare and MapLibre." },
];
export default function HomePage() {
    return (_jsxs("main", { className: "flex min-h-screen flex-col items-center justify-center gap-8 px-6 py-20", children: [_jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [_jsx("span", { className: "rounded-full border border-primary/30 bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary", children: "Beta" }), _jsxs("h1", { className: "text-5xl font-bold tracking-tight md:text-7xl", children: ["Kronot", _jsx("span", { className: "text-primary", children: "ara" })] }), _jsx("p", { className: "max-w-xl text-lg text-muted-foreground", children: "Geospatial heatmap analytics platform. Visualize, explore, and understand location data at scale \u2014 powered by Cloudflare & MapLibre GL." })] }), _jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(Link, { to: "/app/map", className: "rounded-lg bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90", children: "Open Map \u2192" }), _jsx(Link, { to: "/about", className: "rounded-lg border border-border px-6 py-3 font-semibold text-foreground transition-colors hover:bg-muted", children: "Learn More" })] }), _jsx("div", { className: "mt-8 grid max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3", children: [
                    { icon: "🗺️", title: "MapLibre GL", desc: "Fast, open-source vector maps" },
                    { icon: "🔥", title: "Deck.gl Heatmap", desc: "GPU-accelerated data layers" },
                    { icon: "⚡", title: "Cloudflare Edge", desc: "D1 + Pages, globally distributed" },
                ].map((f) => (_jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [_jsx("div", { className: "text-2xl", children: f.icon }), _jsx("h2", { className: "mt-2 font-semibold", children: f.title }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: f.desc })] }, f.title))) })] }));
}
