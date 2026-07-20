// ─────────────────────────────────────────────────────────────────
// app/components/map/MapView.tsx
// ─────────────────────────────────────────────────────────────────
import { useState } from "react";
import maplibregl from "maplibre-gl";
import Map from "react-map-gl/maplibre";
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
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  // ── Deck.gl Layers ─────────────────────────────────────────
  const layers = [
    // Heatmap for visual aggregation
    new HeatmapLayer<ArsipPoint>({
      id: "heatmap-layer",
      data: points,
      getPosition: (d: ArsipPoint) => [d.longitude, d.latitude],
      getWeight: () => 1,
      intensity: 1.5,
      threshold: 0.05,
      radiusPixels: 45,
      getFilterValue: (d: ArsipPoint) => d.tahun,
      filterRange: [0, filterYear], // all data up to selected year
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
      filterRange: [0, filterYear],
      extensions: [new DataFilterExtension({ filterSize: 1 })],
    } as any)
  ];

  return (
    <div className="relative h-full w-full" aria-label="Interactive geospatial map" role="application">
      <DeckGL
        initialViewState={viewState}
        onViewStateChange={({ viewState: vs }) => setViewState(vs as any)}
        layers={layers}
        controller={true}
        getTooltip={({ object }: any) =>
          object ? `${object.judul} (${object.tahun})\n${object.lokasi_teks || 'Tidak ada lokasi'}` : null
        }
      >
        <Map
          mapLib={maplibregl as any}
          mapStyle={MAP_STYLE}
          reuseMaps
        />
      </DeckGL>
    </div>
  );
}
