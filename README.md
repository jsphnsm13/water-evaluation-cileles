# 💧 Monitoring Air Cileles

Website monitoring kualitas air untuk penelitian di Cileles, Jatinangor, Jawa Barat.

> **✅ PROJECT SIAP DIGUNAKAN!**  
> Semua file sudah lengkap dan siap di-push ke GitHub!  
> 📖 **Baca [`DOCS_INDEX.md`](./DOCS_INDEX.md) untuk panduan lengkap**

---

## 📊 Fitur

- **Dashboard Interaktif** - 16 titik monitoring (TA01-TA16) dengan data real-time
- **Peta Lokasi** - Visualisasi interaktif menggunakan Leaflet Maps
- **Visualisasi Data** - Grafik perbandingan pH, TDS, dan EC antar lokasi
- **Indikator Status** - Color-coded status (Hijau = Normal, Biru = Perlu Perhatian, Orange = Perlu Peningkatan)
- **Panduan Edukasi** - Informasi kualitas air yang mudah dipahami masyarakat
- **Responsive Design** - Mobile-friendly untuk akses di mana saja

## 🛠️ Teknologi

- **Frontend:** React 18 + TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS v4
- **Routing:** React Router v6
- **Maps:** Leaflet + React Leaflet
- **Charts:** Recharts
- **Icons:** Lucide React

## 🚀 Cara Menjalankan

### Prasyarat
- Node.js v18 atau lebih baru
- npm atau yarn

### Instalasi

```bash
# Clone repository
git clone https://github.com/USERNAME/monitoring-air-cileles.git
cd monitoring-air-cileles

# Install dependencies
npm install

# Jalankan development server
npm run dev
```

Buka browser dan akses `http://localhost:5173`

### Build untuk Production

```bash
npm run build
```

Output akan ada di folder `dist/`

### Preview Production Build

```bash
npm run preview
```

## 📍 Data Monitoring

Website ini menggunakan data dari **16 titik monitoring** di area Cileles, Jatinangor:

- **Lokasi:** TA01 hingga TA16
- **Parameter:** pH, TDS (Total Dissolved Solids), EC (Electrical Conductivity)
- **Koordinat GPS:** Setiap titik memiliki koordinat geografis untuk visualisasi peta

## 📱 Halaman

1. **Beranda** - Overview dan ringkasan kualitas air
2. **Dashboard** - Data lengkap semua titik monitoring dengan peta dan grafik
3. **Tentang** - Informasi tentang project penelitian
4. **Edukasi** - Panduan memahami parameter kualitas air

## 🎨 Desain

- Style minimalis dan profesional
- Palet warna biru-teal yang soft dan trustworthy
- Typography clean dan readable
- Card-based layout dengan rounded corners
- Government-grade UI yang sustainable

## 🌐 Deployment

Website ini dapat di-deploy ke:

- **Vercel** (Recommended) - [vercel.com](https://vercel.com)
- **Netlify** - [netlify.com](https://netlify.com)
- **GitHub Pages**
- **Cloudflare Pages**

### Deploy ke Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 📧 Kontak

Untuk informasi lebih lanjut tentang project penelitian ini, silakan hubungi tim peneliti.

## 📄 Lisensi

© 2026 SCG - Monitoring Air Cileles

---

Dibuat dengan ❤️ untuk masyarakat Cileles, Jatinangor