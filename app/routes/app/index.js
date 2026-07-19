import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
export const meta = () => [
    { title: "Dashboard — Kronotara" },
];
export default function AppDashboardPage() {
    return (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold", children: "Dashboard" }), _jsx("p", { className: "mt-1 text-sm text-muted-foreground", children: "Overview of your geospatial data." }), _jsx("div", { className: "mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
                    { label: "Total Locations", value: "—" },
                    { label: "Heatmap Points", value: "—" },
                    { label: "Last Updated", value: "—" },
                ].map((stat) => (_jsxs("div", { className: "rounded-xl border border-border bg-card p-5", children: [_jsx("p", { className: "text-sm text-muted-foreground", children: stat.label }), _jsx("p", { className: "mt-1 text-3xl font-bold", children: stat.value })] }, stat.label))) }), _jsxs("p", { className: "mt-8 text-sm text-muted-foreground", children: ["Navigate to ", _jsx("strong", { children: "Map" }), " to view the heatmap or", " ", _jsx("strong", { children: "Data" }), " to manage your dataset."] })] }));
}
