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
  { to: "/app",      label: "Dashboard", icon: Home },
  { to: "/app/map",  label: "Map",       icon: Map },
  { to: "/app/data", label: "Data",      icon: Database },
];

export default function AppLayout() {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Sidebar ────────────────────────────────────────────── */}
      <aside className="flex w-60 flex-shrink-0 flex-col border-r border-border bg-card">
        {/* Logo */}
        <div className="flex h-16 items-center gap-2 border-b border-border px-5">
          <BarChart2 className="h-5 w-5 text-primary" />
          <span className="font-bold tracking-tight">Kronotara</span>
        </div>

        {/* Nav links */}
        <nav className="flex flex-col gap-1 p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={to === "/app"}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )
              }
            >
              <Icon className="h-4 w-4" />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: back to home */}
        <div className="mt-auto border-t border-border p-3">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
          >
            ← Back to site
          </Link>
        </div>
      </aside>

      {/* ── Main content area ──────────────────────────────────── */}
      <main className="flex flex-1 flex-col overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
