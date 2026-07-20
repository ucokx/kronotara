import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MapView } from "./MapView";
import React from "react";

// Mock DeckGL because JSDOM doesn't support WebGL
vi.mock("@deck.gl/react", () => ({
  DeckGL: ({ children }: any) => <div data-testid="mock-deckgl">{children}</div>,
}));

// Mock react-map-gl
vi.mock("react-map-gl/maplibre", () => ({
  default: () => <div data-testid="mock-map"></div>,
}));

// Mock @deck.gl/layers and @deck.gl/aggregation-layers just to ensure they don't break during test setup
vi.mock("@deck.gl/layers", () => ({
  ScatterplotLayer: class MockScatterplotLayer {}
}));
vi.mock("@deck.gl/aggregation-layers", () => ({
  HeatmapLayer: class MockHeatmapLayer {}
}));
vi.mock("@deck.gl/extensions", () => ({
  DataFilterExtension: class MockDataFilterExtension {}
}));
vi.mock("maplibre-gl", () => ({
  default: {}
}));

describe("MapView Component", () => {
  const dummyPoints = [
    {
      id_arsip: "test-1",
      judul: "Arsip 2020",
      deskripsi: "Sebuah arsip dari 2020",
      tahun: 2020,
      latitude: -2,
      longitude: 118,
    }
  ];

  it("renders DeckGL and Map overlays properly", () => {
    render(<MapView points={dummyPoints} filterYear={2025} />);
    
    // Check if mocked components are in the document
    expect(screen.getByTestId("mock-deckgl")).toBeInTheDocument();
    expect(screen.getByTestId("mock-map")).toBeInTheDocument();
  });
});
