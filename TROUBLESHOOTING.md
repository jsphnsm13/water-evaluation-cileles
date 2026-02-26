# 🔧 TROUBLESHOOTING

## Masalah Umum & Solusinya

### ❌ "Git command not found"

**Masalah:** Git belum terinstall

**Solusi:**
- Windows: Download dari https://git-scm.com
- Mac: Install via `xcode-select --install`
- Linux: `sudo apt install git` atau `sudo yum install git`

Atau pakai **GitHub Desktop** aja (lebih mudah)!

---

### ❌ "Permission denied" saat push

**Masalah:** GitHub belum tahu siapa Anda

**Solusi:**
```bash
# Set identity
git config --global user.name "Nama Anda"
git config --global user.email "email@example.com"

# Atau pakai GitHub Desktop (otomatis login)
```

---

### ❌ "Remote origin already exists"

**Masalah:** Repository sudah pernah di-connect

**Solusi:**
```bash
# Remove old remote
git remote remove origin

# Add new remote
git remote add origin https://github.com/USERNAME/REPO.git

# Push
git push -u origin main
```

---

### ❌ "Node modules not found" saat npm run dev

**Masalah:** Dependencies belum diinstall

**Solusi:**
```bash
npm install
```

---

### ❌ Build error di Vercel/Netlify

**Masalah:** Biasanya karena missing dependencies

**Solusi:**
1. Pastikan semua import sudah benar
2. Check `package.json` ada semua dependencies
3. Coba build lokal dulu: `npm run build`
4. Jika error, fix dulu sebelum deploy

---

### ❌ "Cannot find module" error

**Masalah:** Import path salah

**Solusi:**
- Pastikan path import relatif benar
- Contoh: `import { HomePage } from './components/HomePage'`
- Perhatikan huruf besar/kecil (case-sensitive)

---

### ❌ Leaflet map tidak muncul

**Masalah:** Leaflet CSS belum di-load

**Solusi:**
Pastikan di `globals.css` atau `index.html` ada:
```css
@import 'leaflet/dist/leaflet.css';
```

Atau di HTML:
```html
<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
```

---

### ❌ Blank page setelah deploy

**Masalah:** Biasanya routing issue

**Solusi untuk Vercel:**
Buat file `vercel.json`:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Solusi untuk Netlify:**
Buat file `netlify.toml`:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### ❌ "index.html not found"

**Masalah:** File tidak ada atau salah lokasi

**Solusi:**
File `index.html` HARUS di root folder, sejajar dengan `package.json`

```
monitoring-air-cileles/
├── index.html        ← HARUS DI SINI!
├── package.json
└── ...
```

---

### ❌ Vercel deployment stuck

**Masalah:** Build command salah atau timeout

**Solusi:**
1. Check build logs di Vercel dashboard
2. Pastikan build settings:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Coba deploy ulang

---

### ❌ Can't push karena file terlalu besar

**Masalah:** Ada file besar yang tidak seharusnya di-push

**Solusi:**
1. Pastikan `.gitignore` sudah ada
2. Remove cached files:
```bash
git rm -r --cached node_modules
git rm -r --cached dist
git commit -m "Remove large files"
```

---

### ❌ GitHub Desktop tidak detect repository

**Masalah:** Folder belum di-init sebagai git repo

**Solusi:**
```bash
# Di terminal, masuk ke folder project
cd monitoring-air-cileles

# Init git
git init

# Baru bisa detect di GitHub Desktop
```

---

## 📞 Masih Stuck?

1. **Check dokumentasi:**
   - `START_HERE.md` - Panduan pemula
   - `DEPLOYMENT.md` - Panduan deploy lengkap
   - `QUICKSTART.md` - Quick reference

2. **Cek log error:**
   - Terminal: baca pesan error dengan teliti
   - Browser Console: F12 → Console tab
   - Vercel/Netlify Dashboard: Build logs

3. **Search online:**
   - Google: "vercel react router blank page"
   - Stack Overflow
   - GitHub Issues

4. **Coba dari awal:**
   - Delete folder `.git`
   - `git init` lagi
   - Push ulang

---

## ✅ Tips Menghindari Error

1. **Selalu test lokal dulu** sebelum push:
   ```bash
   npm install
   npm run dev
   npm run build
   ```

2. **Commit sering dengan pesan jelas:**
   ```bash
   git commit -m "Fix: navbar responsive issue"
   ```

3. **Backup sebelum major changes:**
   ```bash
   git branch backup
   ```

4. **Read error messages** - biasanya sudah jelas solusinya

5. **Pakai GitHub Desktop** - lebih user-friendly!

---

Semoga membantu! 🚀
