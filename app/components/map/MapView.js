import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// ─────────────────────────────────────────────────────────────────
// app/components/map/MapView.tsx
// ─────────────────────────────────────────────────────────────────
// Full-screen interactive map component.
//
// STACK:
//   - MapLibre GL  → renders the base vector map (OpenFreeMap tiles)
//   - Deck.gl      → overlays a HeatmapLayer using WebGL
//
// ⚠️  IMPORTANT RULES:
//   1. This is a CLIENT-ONLY component. Never import maplibre-gl or
//      @deck.gl/* in a server file (.server.ts).
//   2. The container div MUST have an explicit height (h-full).
//   3. MapLibre CSS is imported globally in app/app.css.
//   4. Do NOT use React-Leaflet, Google Maps, or Mapbox GL JS.
//
// HOW IT WORKS:
//   1. We use `useRef` to get the container DOM element.
//   2. `useEffect` initializes MapLibre GL after the component mounts
//      (because MapLibre needs a real DOM element).
//   3. DeckGL is initialized as a MapLibre custom layer via
//      MapboxOverlay from @deck.gl/mapbox.
//   4. HeatmapLayer reads `points` data (array of {lat, lng, weight}).
// ─────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { DeckGL } from "@deck.gl/react";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
// ── Map configuration ─────────────────────────────────────────────
// Default center: Indonesia (adjust as needed)
const INITIAL_VIEW_STATE = {
    longitude: 106.827,
    latitude: -6.175,
    zoom: 10,
    pitch: 30,
    bearing: 0,
};
// Free OpenFreeMap tile style (no API key required)
const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";
// ── Sample data (replace with real D1 data via loader) ────────────
const SAMPLE_POINTS = [
    { latitude: -6.175, longitude: 106.827, weight: 100 },
    { latitude: -6.200, longitude: 106.816, weight: 80 },
    { latitude: -6.160, longitude: 106.845, weight: 60 },
    { latitude: -6.190, longitude: 106.830, weight: 90 },
];
export function MapView({ points = SAMPLE_POINTS }) {
    const mapContainerRef = useRef(null);
    const mapRef = useRef(null);
    const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
    // ── Initialize MapLibre map ──────────────────────────────────────
    useEffect(() => {
        if (!mapContainerRef.current || mapRef.current)
            return;
        const map = new maplibregl.Map({
            container: mapContainerRef.current,
            style: MAP_STYLE,
            center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
            zoom: INITIAL_VIEW_STATE.zoom,
            pitch: INITIAL_VIEW_STATE.pitch,
            bearing: INITIAL_VIEW_STATE.bearing,
        });
        // Add navigation controls (zoom in/out, compass)
        map.addControl(new maplibregl.NavigationControl(), "top-right");
        mapRef.current = map;
        // Cleanup on unmount
        return () => {
            map.remove();
            mapRef.current = null;
        };
    }, []);
    // ── Deck.gl HeatmapLayer ─────────────────────────────────────────
    const layers = [
        new HeatmapLayer({
            id: "heatmap-layer",
            data: points,
            // Accessor functions tell Deck.gl how to read lat/lng/weight
            getPosition: (d) => [d.longitude, d.latitude],
            getWeight: (d) => d.weight,
            // Visual config
            intensity: 1,
            threshold: 0.03,
            radiusPixels: 60,
        }),
    ];
    return (
    // Relative container — Deck.gl positions itself absolutely inside
    _jsxs("div", { className: "relative h-full w-full", children: [_jsx("div", { ref: mapContainerRef, className: "absolute inset-0 h-full w-full", "aria-label": "Interactive geospatial map", role: "application" }), _jsx(DeckGL, { viewState: viewState, onViewStateChange: ({ viewState: vs }) => setViewState(vs), layers: layers, style: { position: "absolute", inset: "0" }, 
                // controller={true} enables mouse/touch interaction
                controller: true })] }));
}
