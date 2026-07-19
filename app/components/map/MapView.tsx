// ─────────────────────────────────────────────────────────────────
// app/components/map/MapView.tsx
// ─────────────────────────────────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import maplibregl from "maplibre-gl";
import { DeckGL } from "@deck.gl/react";
import { ScatterplotLayer } from "@deck.gl/layers";
import { HeatmapLayer } from "@deck.gl/aggregation-layers";
import { DataFilterExtension } from "@deck.gl/extensions";

// ── Types ─────────────────────────────────────────────────────────
interface ArsipPoint {
  id_arsip: string;
  judul: string;
  deskripsi: string;
  tahun: number;
  latitude: number;
  longitude: number;
}

const INITIAL_VIEW_STATE = {
  longitude: 118.0149,
  latitude: -2.5489,
  zoom: 4, // Zoomed out to see Indonesia
  pitch: 0,
  bearing: 0,
};

const MAP_STYLE = "https://tiles.openfreemap.org/styles/liberty";

interface MapViewProps {
  points?: ArsipPoint[];
  filterYear?: number;
}

export function MapView({ points = [], filterYear = 2025 }: MapViewProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<maplibregl.Map | null>(null);
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // ── Initialize MapLibre map ──────────────────────────────────────
  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const map = new maplibregl.Map({
      container: mapContainerRef.current,
      style: MAP_STYLE,
      center: [INITIAL_VIEW_STATE.longitude, INITIAL_VIEW_STATE.latitude],
      zoom: INITIAL_VIEW_STATE.zoom,
      pitch: INITIAL_VIEW_STATE.pitch,
      bearing: INITIAL_VIEW_STATE.bearing,
    });

    map.addControl(new maplibregl.NavigationControl(), "top-right");
    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  // ── Deck.gl Layers ─────────────────────────────────────────
  const layers = [
    // Heatmap for visual aggregation
    new HeatmapLayer<ArsipPoint>({
      id: "heatmap-layer",
      data: points,
      getPosition: (d: ArsipPoint) => [d.longitude, d.latitude],
      getWeight: () => 1,
      intensity: 1,
      threshold: 0.03,
      radiusPixels: 60,
      getFilterValue: (d: ArsipPoint) => d.tahun,
      filterRange: [filterYear, filterYear], // exact match for year
      extensions: [new DataFilterExtension({ filterSize: 1 })],
    } as any),
    // Scatterplot for exact hover tooltips
    new ScatterplotLayer<ArsipPoint>({
      id: "scatter-layer",
      data: points,
      pickable: true,
      opacity: 0.8,
      stroked: true,
      filled: true,
      radiusScale: 6,
      radiusMinPixels: 4,
      radiusMaxPixels: 10,
      lineWidthMinPixels: 1,
      getPosition: (d: ArsipPoint) => [d.longitude, d.latitude],
      getFillColor: [255, 140, 0],
      getLineColor: [0, 0, 0],
      getFilterValue: (d: ArsipPoint) => d.tahun,
      filterRange: [filterYear, filterYear],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
    } as any)
  ];

  return (
    <div className="relative h-full w-full">
      <div
        ref={mapContainerRef}
        className="absolute inset-0 h-full w-full"
        aria-label="Interactive geospatial map"
        role="application"
      />

      <DeckGL
        viewState={viewState}
        onViewStateChange={({ viewState: vs }) => setViewState(vs as any)}
        layers={layers}
        style={{ position: "absolute", inset: "0" }}
        controller={true}
        getTooltip={({ object }: any) =>
          object && `${object.judul} (${object.tahun})\n${object.lokasi_teks || 'Tidak ada lokasi'}`
        }
      />
    </div>
  );
}
