import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/routes/app-layout.tsx
// Shared layout for all /app/* routes.
// Contains the sidebar + topbar navigation shell.
// ─────────────────────────────────────────────────────────────────
import { Link, NavLink, Outlet } from "react-router";
import { Map, BarChart2, Home, Database } from "lucide-react";
import { cn } from "~/lib/utils";
// ── Navigation items ──────────────────────────────────────────────
const navItems = [
    { to: "/app", label: "Dashboard", icon: Home },
    { to: "/app/map", label: "Map", icon: Map },
    { to: "/app/data", label: "Data", icon: Database },
];
export default function AppLayout() {
    return (_jsxs("div", { className: "flex h-screen overflow-hidden bg-background", children: [_jsxs("aside", { className: "flex w-60 flex-shrink-0 flex-col border-r border-border bg-card", children: [_jsxs("div", { className: "flex h-16 items-center gap-2 border-b border-border px-5", children: [_jsx(BarChart2, { className: "h-5 w-5 text-primary" }), _jsx("span", { className: "font-bold tracking-tight", children: "Kronotara" })] }), _jsx("nav", { className: "flex flex-col gap-1 p-3", children: navItems.map(({ to, label, icon: Icon }) => (_jsxs(NavLink, { to: to, end: to === "/app", className: ({ isActive }) => cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors", isActive
                                ? "bg-primary/10 text-primary"
                                : "text-muted-foreground hover:bg-muted hover:text-foreground"), children: [_jsx(Icon, { className: "h-4 w-4" }), label] }, to))) }), _jsx("div", { className: "mt-auto border-t border-border p-3", children: _jsx(Link, { to: "/", className: "flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground", children: "\u2190 Back to site" }) })] }), _jsx("main", { className: "flex flex-1 flex-col overflow-y-auto", children: _jsx(Outlet, {}) })] }));
}
