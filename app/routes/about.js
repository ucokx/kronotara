import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/routes/about.tsx
// Route: GET /about
// ─────────────────────────────────────────────────────────────────
import { Link } from "react-router";
export const meta = () => [
    { title: "About — Kronotara" },
    { name: "description", content: "About the Kronotara geospatial platform." },
];
export default function AboutPage() {
    return (_jsxs("main", { className: "mx-auto max-w-2xl px-6 py-20", children: [_jsx(Link, { to: "/", className: "text-sm text-muted-foreground hover:text-foreground", children: "\u2190 Back to Home" }), _jsx("h1", { className: "mt-6 text-4xl font-bold", children: "About Kronotara" }), _jsx("p", { className: "mt-4 text-muted-foreground", children: "Kronotara is an open geospatial heatmap analytics platform built on the Cloudflare edge network. It uses MapLibre GL for basemap rendering and Deck.gl for GPU-accelerated heatmap visualization." }), _jsx("h2", { className: "mt-8 text-xl font-semibold", children: "Tech Stack" }), _jsxs("ul", { className: "mt-3 space-y-2 text-muted-foreground", children: [_jsxs("li", { children: ["\u269B\uFE0F ", _jsx("strong", { className: "text-foreground", children: "React Router v7" }), " \u2014 Full-stack SSR framework (formerly Remix)"] }), _jsxs("li", { children: ["\u2601\uFE0F ", _jsx("strong", { className: "text-foreground", children: "Cloudflare Pages" }), " \u2014 Edge deployment"] }), _jsxs("li", { children: ["\uD83D\uDDC4\uFE0F ", _jsx("strong", { className: "text-foreground", children: "Cloudflare D1" }), " \u2014 Serverless SQLite database"] }), _jsxs("li", { children: ["\uD83D\uDDFA\uFE0F ", _jsx("strong", { className: "text-foreground", children: "MapLibre GL" }), " \u2014 Open-source vector maps"] }), _jsxs("li", { children: ["\uD83D\uDD25 ", _jsx("strong", { className: "text-foreground", children: "Deck.gl" }), " \u2014 GPU-accelerated data layers"] }), _jsxs("li", { children: ["\uD83C\uDFA8 ", _jsx("strong", { className: "text-foreground", children: "Tailwind CSS v4" }), " \u2014 Utility-first styling"] }), _jsxs("li", { children: ["\uD83E\uDDE9 ", _jsx("strong", { className: "text-foreground", children: "shadcn/ui" }), " \u2014 Accessible component primitives"] })] })] }));
}
