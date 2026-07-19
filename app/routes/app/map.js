import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { MapView } from "~/components/map/MapView";
export const meta = () => [
    { title: "Map — Kronotara" },
];
export default function MapPage() {
    return (_jsxs("div", { className: "relative flex h-full flex-col", children: [_jsx("div", { className: "flex items-center justify-between border-b border-border bg-card px-6 py-3", children: _jsxs("div", { children: [_jsx("h1", { className: "text-lg font-semibold", children: "Heatmap View" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "MapLibre GL + Deck.gl" })] }) }), _jsx("div", { className: "flex-1", children: _jsx(MapView, {}) })] }));
}
