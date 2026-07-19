✅ Tidak blank putih.

✅ Tidak ada error Console.

✅ Tidak ada asset 404.

✅ Tidak ada JavaScript Error.

✅ Semua tombol bekerja.

✅ Copy Hasil bekerja.

✅ Semua perhitungan sesuai Rumus Mikuans.

Apabila website masih blank atau tidak tampil dengan benar, Agent WAJIB mencari penyebab dan memperbaiki konfigurasi project (Vite, base path untuk GitHub Pages, asset path, router, maupun workflow deployment), kemudian melakukan commit dan deploy ulang hingga website live berjalan normal.

Pekerjaan dianggap selesai hanya setelah website live berjalan dengan normal dan memenuhi checklist fungsionalitas, bukan hanya karena proses build sukses.

---

Catatan singkat

Website ini adalah alat bantu operasional untuk Mikuans Melting Stores.

Prioritas:

- Kecepatan.
- Akurasi perhitungan.
- Kemudahan penggunaan.
- Tampilan profesional.
- Kode bersih, mudah dipelihara, dan siap dikembangkan.

Langkah diagnosa dan perbaikan cepat

1) Quick local checks (WSL):

```bash
cd /mnt/d/Alfian/mikuans
npm install
npm run dev
# atau untuk build
npm run build
```

2) Debugging singkat saat halaman blank:
- Buka DevTools Console → pastikan tidak ada error runtime.
- Network tab → cari asset 404 atau request gagal.
- Periksa index.html dan entry point bundle.
- Periksa `vite.config.js` dan nilai `base` jika deploy ke subpath.

3) Vite + GitHub Pages checklist:
- Jika deploy ke `https://<user>.github.io/<repo>/` pastikan `vite.config.js` berisi `base: '/<repo>/'`.
- Pastikan path asset relatif (gunakan `new URL('./asset.png', import.meta.url).href` jika perlu).
- Jika memakai React Router (history mode), gunakan `HashRouter` untuk GitHub Pages atau atur rewrite pada host.

4) Router / SPA issues:
- Jika rute direct-load 404, gunakan `HashRouter` atau konfigurasi server rewrites.

5) Build & deploy workflow (GitHub Actions) — ringkasan langkah:
- Pastikan action menjalankan `npm ci && npm run build`.
- Ambil `dist/` output dan publish ke `gh-pages` branch atau host yang digunakan.

6) Troubleshooting assets dan environment:
- Pastikan `public/` dan path statis tersertakan dalam build.
- Cek variabel environment (`VITE_` prefix) jika dipakai pada runtime.

7) Verifikasi pasca-deploy:
- Buka `https://<host>/` dan periksa checklist di atas.
- Jalankan smoke test: interaksi tombol penting, copy hasil, kalkulasi formulir.

Instruksi penggunaan `codex` CLI (catatan agen)

- Saya akan menggunakan `codex` yang terpasang di WSL untuk mengeksekusi langkah otomatis jika Anda memberi izin atau menjalankan perintah lokal untuk saya. Contoh pemeriksaan versi (jalankan di WSL):

```bash
codex --version
# atau
which codex
```

- Saya TIDAK akan menyimpan kredensial atau token yang Anda kirim di chat. Untuk operasi yang membutuhkan PAT/GPG/sudo, jalankan perintah di WSL secara lokal atau set environment variable di mesin Anda.

Contoh perintah yang dapat dijalankan lewat `codex` (jika tersedia dan sesuai):

```bash
# contoh hipotetis — sesuaikan dengan kemampuan `codex` pada mesin Anda
codex run "npm ci && npm run build"
codex run "git add . && git commit -m 'fix: deploy' && git push"
```

Catatan akhir

- Agent wajib memperbaiki root cause (misconfig Vite/base/paths/router) bukan sekadar patching asset.
- Setelah perbaikan, commit perubahan, update workflow yang perlu, dan lakukan deploy ulang sampai website live dan checklist terpenuhi.
- Jika Anda ingin, saya bisa membuat `skill.md` dan `codex-cli-agent.md` untuk panduan internal penggunaan `codex` CLI sebagai agen — konfirmasi saja dan saya buatkan.

--
Update by agent: periksa dan jalankan perintah di WSL atau izinkan saya memeriksa `codex` bila Anda mengizinkan eksekusi lokal.