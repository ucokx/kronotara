# 🗺️ Kronotara 

**Kronotara** (Kronologi Nusantara) adalah sebuah platform pemetaan interaktif dan mesin pencari arsip sejarah tingkat lanjut. Sistem ini memungkinkan pengguna untuk mengeksplorasi arsip-arsip nasional Indonesia secara visual melalui *Heatmap Geospatial* dan melakukan pencarian teks arsip berkecepatan tinggi berkat integrasi SQLite FTS5.

Dibangun dengan arsitektur modern berbasis Edge Computing menggunakan infrastruktur **Cloudflare Pages** dan **Cloudflare D1** (Serverless SQL).

---

## ✨ Fitur Utama

- ⚡ **Full-Text Search (FTS5)**: Pencarian arsip berkecepatan tinggi menggunakan kapabilitas *Full-Text Search* SQLite dengan *trigger* sinkronisasi otomatis.
- 🗺️ **Geospatial Heatmap (Deck.gl)**: Visualisasi ribuan titik koordinat arsip pada peta interaktif yang di-*render* langsung oleh GPU (WebGL) untuk menjamin kinerja 60 FPS.
- 🕒 **Time-Series Slider**: Pemfilteran *heatmap* secara interaktif berdasarkan tahun arsip. Data diperbarui secara instan pada peta.
- 🔄 **Automated Ingestion**: Sistem Cron bawaan untuk secara berkala menelan (*ingest*) data JSON langsung dari portal data.go.id.
- 🎨 **Modern UI**: Antarmuka bersih, responsif, dan elegan yang dibangun menggunakan ekosistem Shadcn UI & Tailwind CSS v4.

---

## 🛠️ Tech Stack

### Framework & Frontend
- **[React Router v7](https://reactrouter.com/)**: Framework full-stack yang modern dan efisien.
- **[Vite](https://vitejs.dev/)**: *Bundler* dan peladen pengembangan yang super cepat.
- **[Tailwind CSS v4](https://tailwindcss.com/)**: Framework CSS *utility-first* untuk *styling* instan.
- **[Radix UI](https://www.radix-ui.com/)**: Komponen aksesibilitas (A11y) primitif sebagai pondasi *design system*.

### Peta & Visualisasi
- **[MapLibre GL JS](https://maplibre.org/)**: *Rendering engine* dasar untuk peta vektor interaktif (OpenFreeMap).
- **[Deck.gl](https://deck.gl/)**: Overlay visualisasi tingkat lanjut (Heatmap & Scatterplot).

### Database & Infrastruktur
- **[Cloudflare Pages](https://pages.cloudflare.com/)**: Platform *hosting* Edge berkinerja tinggi.
- **[Cloudflare D1](https://developers.cloudflare.com/d1/)**: Database relasional (SQLite) tanpa peladen (*serverless*) pada jaringan Edge Cloudflare.

---

## 🚀 Memulai (Local Development)

Ikuti panduan berikut untuk menjalankan proyek ini di mesin lokal Anda.

### 1. Prasyarat
- [Node.js](https://nodejs.org/en/) (Versi >= 20.0.0)
- Akun [Cloudflare](https://dash.cloudflare.com/sign-up) (untuk *deployment* dan konfigurasi D1)

### 2. Instalasi Dependensi
Kloning repositori dan instal semua modul NPM yang dibutuhkan.
```bash
git clone <repository-url> kronotara
cd kronotara
npm install
```

### 3. Konfigurasi Database Lokal (D1)
Proyek ini membutuhkan Cloudflare D1. Di lokal, Wrangler akan membuat tiruan SQLite untuk pengembangan.

Terapkan migrasi database untuk membuat skema tabel `arsip` beserta `arsip_fts`:
```bash
npm run db:migrate:local
```

### 4. Menjalankan Server Lokal (Preview)
Untuk memastikan kapabilitas *bindings* Cloudflare (seperti objek D1) terinjeksi dengan sempurna, gunakan perintah *build* & *preview* Wrangler:

```bash
# Membangun aplikasi
npm run build

# Menjalankan server lokal dengan Wrangler
npm run preview
```
Server dapat diakses di: **http://127.0.0.1:8788**

---

## 📂 Struktur Direktori Utama

```text
kronotara/
├── app/
│   ├── components/      # Komponen React (Peta, UI, dsb)
│   ├── lib/             # Utilitas server (Konektor DB)
│   ├── routes/          # Definisi Rute (UI Pages & API)
│   │   ├── api/         # Endpoint API Server (Ingest, Health)
│   │   └── app/         # Dashboard Pages (Data, Map)
│   ├── app.css          # Global CSS & Tailwind Entry
│   └── routes.ts        # Registri routing (React Router v7)
├── migrations/          # File SQL untuk migrasi database Cloudflare D1
├── public/              # Aset statis (Favicon, Logo)
└── wrangler.toml        # Konfigurasi Cloudflare Pages & D1 Bindings
```

---

## 🌐 Deployment (Cloudflare Pages)

Mempublikasikan proyek ini ke *production* dapat dilakukan dengan satu perintah melalui Wrangler:

1. Pastikan Anda telah mengautentikasi CLI Wrangler:
   ```bash
   npx wrangler login
   ```
2. Buat database D1 jarak jauh (*remote*) dan perbarui `database_id` di file `wrangler.toml`.
3. Terapkan migrasi ke database production:
   ```bash
   npm run db:migrate:remote
   ```
4. Deploy ke Cloudflare Pages:
   ```bash
   npm run deploy
   ```

---
*Didesain dan dikembangkan untuk eksplorasi arsip Indonesia secara presisi.*
