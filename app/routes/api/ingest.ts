import type { Route } from "./+types/ingest";
import { getDB } from "~/lib/db.server";

const DATA_URLS = [
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEYzBiNWVjM2QtY2FhYy00NWI2LTk4MDYtNDI1M2M1M2ExNmEx&filename=c0b5ec3d-caac-45b6-9806-4253c53a16a1.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNENzU1ZDNiNjYtOTg2ZC00N2U1LTg1ZWItYTJlZDA3YTNhZWE2&filename=755d3b66-986d-47e5-85eb-a2ed07a3aea6.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEYTEyYjI0NTgtZDZlMi00MjJhLWE3YjctNzU4OGIyYTFhMzU1&filename=a12b2458-d6e2-422a-a7b7-7588b2a1a355.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNENmY3ODkxOWUtMjIyMi00NWM1LWIyMDYtNmJkMDBmZjMwZDI4&filename=6f78919e-2222-45c5-b206-6bd00ff30d28.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEY2ZiMDVhMzgtMTRiOC00ZjhmLWFiMWItYTY0MGIwY2UwODVl&filename=cfb05a38-14b8-4f8f-ab1b-a640b0ce085e.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEZjZjZjlmYjEtNzE4Ny00Nzc1LThmMTAtMTc4NThlMWZiMGY4&filename=f6cf9fb1-7187-4775-8f10-17858e1fb0f8.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEMmQxMjE0YzktOGQzMy00OWFlLWI2OGMtN2QzMTljMzczNDE3&filename=2d1214c9-8d33-49ae-b68c-7d319c373417.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEMGY4YTYxMzYtNWJhMS00MWEzLWEyOTAtNWY5NTJhMTNkNDQ1&filename=0f8a6136-5ba1-41a3-a290-5f952a13d445.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNENWM4MmVmOWUtZTIwMC00NDhkLWI3ZjUtNGJkZGRlNWIyM2M3&filename=5c82ef9e-e200-448d-b7f5-4bddde5b23c7.json",
  "https://data.go.id/api/dataset/download?url=aHR0cCUzQSUyRiUyRjEwLjQyLjAuMTAlM0E1MDAwJTJGYXBpJTJGMyUyRmFjdGlvbiUyRnBhY2thZ2Vfc2hvdyUzRmlkJTNEMjE0ZTU2YzAtNGNiMy00OTIyLWIzYzYtMGNlMjI2ZWEyYjVh&filename=214e56c0-4cb3-4922-b3c6-0ce226ea2b5a.json"
];

async function geocodeLokasi(lokasi_teks: string) {
  if (!lokasi_teks) return { latitude: null, longitude: null };
  
  // Clean up typical government organization names to improve search hit rate
  let query = lokasi_teks.replace(/Kementerian /i, "").replace(/Badan /i, "").trim();
  
  try {
    const res = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`, {
      headers: {
        "User-Agent": "Kronotara-App/1.0"
      }
    });
    if (!res.ok) return { latitude: null, longitude: null };
    
    const data = (await res.json()) as any;
    if (data && data.length > 0) {
      return {
        latitude: parseFloat(data[0].lat),
        longitude: parseFloat(data[0].lon)
      };
    }
  } catch (e) {
    console.error("Geocoding error:", e);
  }
  return { latitude: null, longitude: null };
}

export async function loader({ request, context }: Route.LoaderArgs) {
  // Extract CRON_SECRET from env
  const env = (context as any).cloudflare?.env;
  const secret = env?.CRON_SECRET || "default_secret_for_local_dev";
  
  const authHeader = request.headers.get("Authorization");
  if (authHeader !== `Bearer ${secret}` && new URL(request.url).searchParams.get("token") !== secret) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDB(context);
  let ingested = 0;
  let errors = [];

  // Clear simulated data before inserting real data
  await db.prepare("DELETE FROM arsip WHERE id_arsip LIKE 'sim-%'").run();

  for (const url of DATA_URLS) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      const data = (await res.json()) as any;
      
      const record = data.result;
      if (!record) continue;

      // Extract details
      const id = record.id;
      const judul = record.title || "Tanpa Judul";
      const deskripsi = record.notes || "";
      
      // Extract year from title, e.g. "Simpul jaringan SIKN & JIKN - Data Tahun 2016"
      const yearMatch = judul.match(/\b(19|20)\d{2}\b/);
      const tahun = yearMatch ? parseInt(yearMatch[0], 10) : new Date(record.metadata_created).getFullYear();
      
      const lokasi_teks = record.organization?.title || "";
      
      // Perform geocoding based on organization/location text
      const { latitude, longitude } = await geocodeLokasi(lokasi_teks);

      // Upsert into D1 using standard SQL
      const sql = `
        INSERT INTO arsip (id_arsip, judul, deskripsi, tahun, lokasi_teks, latitude, longitude)
        VALUES (?, ?, ?, ?, ?, ?, ?)
        ON CONFLICT(id_arsip) DO UPDATE SET
          judul=excluded.judul,
          deskripsi=excluded.deskripsi,
          tahun=excluded.tahun,
          lokasi_teks=excluded.lokasi_teks,
          latitude=excluded.latitude,
          longitude=excluded.longitude
      `;
      
      await db.prepare(sql)
        .bind(id, judul, deskripsi, tahun, lokasi_teks, latitude, longitude)
        .run();
        
      ingested++;
    } catch (err: any) {
      errors.push({ url, error: err.message });
    }
  }

  return Response.json({
    success: true,
    message: `Ingested ${ingested} real records from data.go.id.`,
    errors: errors.length > 0 ? errors : undefined
  });
}
