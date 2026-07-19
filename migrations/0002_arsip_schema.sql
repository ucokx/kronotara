-- ─────────────────────────────────────────────────────────────────
-- migrations/0002_arsip_schema.sql
-- Cloudflare D1 Migration — Arsip Table & FTS5
-- ─────────────────────────────────────────────────────────────────

-- ── 1. Arsip Table ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS arsip (
  id_arsip      TEXT PRIMARY KEY,
  judul         TEXT NOT NULL,
  deskripsi     TEXT,
  tahun         INTEGER,
  lokasi_teks   TEXT,
  latitude      REAL,
  longitude     REAL,
  intensity     REAL DEFAULT 1.0,
  created_at    TEXT NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%SZ', 'now'))
);

-- Index for time-based and spatial queries
CREATE INDEX IF NOT EXISTS idx_arsip_tahun ON arsip (tahun);
CREATE INDEX IF NOT EXISTS idx_arsip_lat_lng ON arsip (latitude, longitude);

-- ── 2. Full-Text Search (FTS5) Virtual Table ──────────────────────
-- We use FTS5 for ultra-fast text searching on judul and deskripsi.
CREATE VIRTUAL TABLE IF NOT EXISTS arsip_fts USING fts5(
  id_arsip UNINDEXED, 
  judul,
  deskripsi
);

-- ── 3. Triggers for FTS5 Synchronization ──────────────────────────
-- These triggers ensure arsip_fts stays in sync when arsip is modified.

-- AFTER INSERT
CREATE TRIGGER IF NOT EXISTS arsip_ai AFTER INSERT ON arsip BEGIN
  INSERT INTO arsip_fts(id_arsip, judul, deskripsi)
  VALUES (new.id_arsip, new.judul, new.deskripsi);
END;

-- AFTER DELETE
CREATE TRIGGER IF NOT EXISTS arsip_ad AFTER DELETE ON arsip BEGIN
  DELETE FROM arsip_fts WHERE id_arsip = old.id_arsip;
END;

-- AFTER UPDATE
CREATE TRIGGER IF NOT EXISTS arsip_au AFTER UPDATE ON arsip BEGIN
  DELETE FROM arsip_fts WHERE id_arsip = old.id_arsip;
  INSERT INTO arsip_fts(id_arsip, judul, deskripsi)
  VALUES (new.id_arsip, new.judul, new.deskripsi);
END;
