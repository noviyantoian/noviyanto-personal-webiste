# SEO Check

Lakukan audit SEO untuk halaman yang disebutkan.

## Usage
/seo-check [path]

Contoh: `/seo-check src/app/layanan/google-ads/page.tsx`

## Checklist Audit

### Metadata
- [ ] `title` — mengandung keyword utama, max 60 karakter
- [ ] `description` — 150-160 karakter, natural, ada keyword
- [ ] `openGraph.title` dan `description` ada
- [ ] `openGraph.images` ada (1200×630)
- [ ] `alternates.canonical` ada dan benar
- [ ] `robots` tidak `noindex`

### Konten
- [ ] Ada tepat 1 `<h1>` yang mengandung keyword utama
- [ ] `<h2>` dan `<h3>` terstruktur logis, tidak skip level
- [ ] Semua `<Image>` punya `alt` yang deskriptif (bukan "image" atau "foto")
- [ ] Internal link ke halaman layanan terkait
- [ ] Tidak ada broken link

### Structured Data
- [ ] JSON-LD schema ada dan valid
- [ ] Untuk service page: `Service` schema
- [ ] Untuk blog: `Article` schema

### Performance (SEO impact)
- [ ] Hero image pakai `priority` prop
- [ ] Tidak ada render-blocking resource
- [ ] Font pakai `next/font` (bukan CDN)

### Output
Berikan ringkasan: apa yang sudah benar, apa yang perlu diperbaiki, dan saran perbaikan spesifik.
