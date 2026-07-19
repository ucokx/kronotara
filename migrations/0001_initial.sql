-- ─────────────────────────────────────────────────────────────────
-- migrations/0001_initial.sql
-- Cloudflare D1 Migration — Initial Schema
--
-- HOW TO RUN:
--   Local:  npm run db:migrate:local
--   Remote: npm run db:migrate:remote
--
-- HOW D1 MIGRATIONS WORK:
--   Wrangler tracks which migrations have been applied.
--   Name files sequentially: 0001_..., 0002_..., 0003_...
--   Never edit a migration that has already been applied.
--   Create a new migration file for schema changes instead.
-- ─────────────────────────────────────────────────────────────────

-- Enable WAL mode for better concurrent read performance


-- ── Locations table ───────────────────────────────────────────────
-- Stores geospatial data points for the heatmap.
CREATE TABLE IF NOT EXISTS locations (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  latitude    REAL    NOT NULL,    -- WGS84 decimal degrees, e.g. -6.175
  longitude   REAL    NOT NULL,    -- WGS84 decimal degrees, e.g. 106.827
  intensity   REAL    NOT NULL DEFAULT 1.0,  -- Heatmap weight (0.0 to 100.0)
  metadata    TEXT,                -- Optional JSON blob for extra attributes
  created_at  TEXT    NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Index for spatial queries (bounding box filtering)
CREATE INDEX IF NOT EXISTS idx_locations_lat_lng
  ON locations (latitude, longitude);

-- Index for time-based queries
CREATE INDEX IF NOT EXISTS idx_locations_created_at
  ON locations (created_at DESC);

-- ── Seed data (development only) ──────────────────────────────────
-- Delete these rows before going to production.
INSERT INTO locations (name, latitude, longitude, intensity) VALUES
  ('Jakarta Pusat',   -6.1750,  106.8272, 90.0),
  ('Menteng',         -6.1944,  106.8344, 75.0),
  ('Sudirman',        -6.2088,  106.8231, 85.0),
  ('Blok M',          -6.2441,  106.7988, 70.0),
  ('Kemang',          -6.2600,  106.8134, 55.0),
  ('Senayan',         -6.2183,  106.8011, 65.0),
  ('Kuningan',        -6.2263,  106.8317, 80.0),
  ('Cikini',          -6.1997,  106.8453, 60.0);
