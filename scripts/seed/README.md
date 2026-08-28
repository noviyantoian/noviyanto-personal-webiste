# Seed artikel blog

Pipeline dari Markdown + ilustrasi hasil generate → koleksi `posts` & `media` Payload.

```
prompts.tsv       daftar prompt ilustrasi (key <TAB> subject)
gen-images.sh     generate PNG lewat codex CLI      → raw/*.png   (gitignored)
prepare-images.mjs normalisasi + WebP 1536x1024     → assets/*.webp
articles/*.md     isi artikel + frontmatter
md-to-lexical.mjs converter Markdown → Lexical
seed-articles.ts  upload media + upsert artikel ke Payload
```

## Alur

```bash
# 1. (opsional) generate ulang ilustrasi — butuh codex CLI ter-login
./scripts/seed/gen-images.sh

# 2. normalisasi PNG → WebP siap upload
npm run seed:images

# 3. masukkan ke CMS (butuh DATABASE_URI aktif)
npm run seed:articles                 # status draft
SEED_PUBLISH=1 npm run seed:articles  # langsung published
```

## Catatan

- **Idempoten.** Media dicocokkan lewat `filename`, artikel lewat `slug`.
  Menjalankan ulang memperbarui, tidak menduplikasi.
- **`SEED_PUBLISH=1` memicu ping IndexNow** ke Bing/Yandex lewat hook
  `afterChange` di koleksi Posts. Jangan set saat uji coba di database throwaway.
- Konfigurasi lewat env var, bukan flag CLI: `payload run` membuang seluruh argv
  sebelum mengeksekusi script, sehingga `process.argv.includes('--publish')`
  selalu false.
- **Hero image diberi padding vertikal** oleh `prepare-images.mjs`: Payload
  memotong hero jadi `og` 1200x630 dan `feature` 1600x900 dengan cover-crop,
  jadi isi ilustrasi harus muat di area tengah 1536x806 supaya tidak terpotong.
- **Gambar inline dirender `<figure>` + `<figcaption>`** oleh converter kustom
  di `src/components/blog/RichText.tsx`, memakai file asli (bukan `<picture>`
  bawaan Payload yang memilih size dengan rasio berbeda-beda per breakpoint).
  Caption diambil dari field `caption` milik Media.

## Sintaks Markdown yang didukung

`## ### ####` heading · `- ` bullet · `1. ` numbered · `> ` quote · `---` hr ·
`**tebal**` · `*miring*` · `` `kode` `` · `[teks](url)` ·
`![alt](key-gambar "caption")` → node upload, `key-gambar` merujuk
`assets/<key>.webp`.

Frontmatter wajib: `slug`, `title`, `excerpt`, `category`, `heroImage`, `heroAlt`.
