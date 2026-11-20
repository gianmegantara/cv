# cv-web

Web CV satu halaman. Data terpisah dari tampilan.

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output ke dist/
npm run preview   # cek hasil build
```

## Edit isi CV

Ada dua bahasa: `data/profile.id.json` (Indonesia) dan `data/profile.en.json` (Inggris).

- `profile` — nama, title, kontak, link, bahasa
- `skills` — kelompok keahlian
- `experience` — pengalaman kerja
- `projects` — kartu proyek (`featured: true` tampil besar)
- `education`, `publication`

Nilai yang diawali `_review` tidak dirender (khususnya link kosong).

## PDF

Klik **Unduh PDF** di halaman, atau:

```bash
chromium --headless --no-pdf-header-footer --print-to-pdf=cv.pdf http://localhost:4173/
```

Layout print sudah diatur ke 2 halaman A4.
