import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/root.tsx
// ─────────────────────────────────────────────────────────────────
// The root layout component — wraps all routes.
// Do NOT remove the <Meta>, <Links>, <Scripts>, <ScrollRestoration>
// components — they are required by React Router.
// ─────────────────────────────────────────────────────────────────
import { Links, Meta, Outlet, Scripts, ScrollRestoration, isRouteErrorResponse, } from "react-router";
import stylesheet from "./app.css?url";
// ── SEO & Global Meta ─────────────────────────────────────────────
export const meta = () => [
    { title: "Kronotara — Geospatial Heatmap Platform" },
    {
        name: "description",
        content: "Kronotara is a geospatial heatmap platform built on Cloudflare, MapLibre GL, and Deck.gl.",
    },
];
// ── Link tags (stylesheets, fonts, etc.) ──────────────────────────
export const links = () => [
    // Preconnect to Google Fonts for faster loading
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
    },
    {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap",
    },
    // Main stylesheet
    { rel: "stylesheet", href: stylesheet },
];
// ── Root Layout ───────────────────────────────────────────────────
export function Layout({ children }) {
    return (_jsxs("html", { lang: "en", className: "dark", children: [_jsxs("head", { children: [_jsx("meta", { charSet: "utf-8" }), _jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }), _jsx(Meta, {}), _jsx(Links, {})] }), _jsxs("body", { className: "bg-background text-foreground antialiased", children: [children, _jsx(ScrollRestoration, {}), _jsx(Scripts, {})] })] }));
}
// ── Default export: Renders nested routes via <Outlet> ─────────────
export default function App() {
    return _jsx(Outlet, {});
}
// ── Error Boundary ─────────────────────────────────────────────────
// Catches errors from any route in the app.
export function ErrorBoundary({ error }) {
    let message = "Oops!";
    let details = "An unexpected error occurred.";
    let stack;
    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? "404" : "Error";
        details =
            error.status === 404
                ? "The requested page could not be found."
                : error.statusText || details;
    }
    else if (import.meta.env.DEV && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }
    return (_jsxs("main", { className: "flex min-h-screen flex-col items-center justify-center gap-4 p-8", children: [_jsx("h1", { className: "text-4xl font-bold", children: message }), _jsx("p", { className: "text-muted-foreground", children: details }), stack && (_jsx("pre", { className: "w-full max-w-2xl overflow-auto rounded-lg bg-muted p-4 text-sm", children: _jsx("code", { children: stack }) }))] }));
}
