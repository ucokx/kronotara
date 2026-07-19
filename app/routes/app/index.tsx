// ─────────────────────────────────────────────────────────────────
// app/routes/app/index.tsx
// Route: GET /app  (Dashboard overview)
// ─────────────────────────────────────────────────────────────────

import type { Route } from "./+types/index";

export const meta: Route.MetaFunction = () => [
  { title: "Dashboard — Kronotara" },
];

export default function AppDashboardPage() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Overview of your geospatial data.
      </p>

      {/* Stats cards */}
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {[
          { label: "Total Locations", value: "—" },
          { label: "Heatmap Points", value: "—" },
          { label: "Last Updated",   value: "—" },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-5"
          >
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 text-sm text-muted-foreground">
        Navigate to <strong>Map</strong> to view the heatmap or{" "}
        <strong>Data</strong> to manage your dataset.
      </p>
    </div>
  );
}
