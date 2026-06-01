# Laporan Audit SEO — noviyanto.com

**Tanggal:** 2 Juni 2026
**Auditor:** Claude Code (8 subagen paralel)
**Domain:** https://noviyanto.com
**Bisnis:** Noviyanto — Digital Growth Partner, Semarang

---

## Skor SEO Keseluruhan: 61 / 100

| Kategori | Bobot | Skor | Kontribusi |
|---|---|---|---|
| Content Quality | 23% | 49/100 | 11.3 |
| Technical SEO | 22% | 74/100 | 16.3 |
| On-Page / SXO | 20% | 62/100 | 12.4 |
| Schema / Structured Data | 10% | 55/100 | 5.5 |
| Performance (CWV) | 10% | 65/100 | 6.5 |
| AI Search Readiness | 10% | 58/100 | 5.8 |
| Images | 5% | 60/100 | 3.0 |
| **Total** | | | **60.8 → 61** |

**Sub-score tambahan:** Local SEO: 41/100 | GEO/AI: 58/100

---

## Status Perbaikan

### Sprint 1 — CRITICAL (dikerjakan 2 Juni 2026)

- [x] **C1** — `/layanan/odoo` redirect 301 ditambah ke `next.config.ts`; `sitemap.ts` sudah bersih (odoo tidak ada di SERVICE_SLUGS)
- [x] **C2** — `safeJsonLd()` diterapkan di 15 file; tidak ada `JSON.stringify` tersisa di frontend pages
- [ ] **C3** — Blog posts thin content (414–672 kata) — perlu ekspansi konten manual
- [ ] **C4** — Halaman layanan thin content (648–739 kata) — perlu ekspansi konten manual
- [ ] **C5** — Google Business Profile — action offline, tidak bisa dikerjakan dari kode
- [x] **C6** — Nomor telepon `+62 858-7944-8563` ditambah ke Footer (visible on-page, `tel:` link)
- [x] **H9** — `/sitemap.xml` → `/sitemap-index.xml` redirect 301 ditambah ke `next.config.ts`

---

## CRITICAL — Perbaiki Segera

### C1 · `/layanan/odoo` — 404 ada di sitemap + linked dari navbar ✅

- **File:** `src/app/sitemap.ts` baris 10, `src/lib/constants.ts` nav links
- **Masalah:** Route tidak ada, tapi di-submit ke Google. Soft 404 + noindex. Google akan laporkan "Submitted URL not found" di GSC.
- **Fix:** Hapus `'odoo'` dari `SERVICE_SLUGS` di `sitemap.ts` + tambah 301 redirect dari `/layanan/odoo` ke `/layanan` di `next.config.ts`.

```ts
// next.config.ts — tambah ke redirects()
{ source: '/layanan/odoo', destination: '/layanan', permanent: true }
```

---

### C2 · `safeJsonLd()` tidak dipakai di 15+ file — XSS + schema corruption risk

- **File:** Semua `page.tsx` di `/layanan/*`, `/tentang`, `/kontak`, `/portofolio`, `semarang/page.tsx`
- **Masalah:** Semua halaman pakai `JSON.stringify` mentah. Kalau konten CMS mengandung `</script>`, schema rusak dan XSS terbuka. `safeJsonLd()` sudah tersedia di `src/lib/seo.ts`.
- **Fix:** Ganti setiap `JSON.stringify(jsonLd)` → `safeJsonLd(jsonLd)` di semua call-site.

```ts
// SEBELUM
dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}

// SESUDAH
import { safeJsonLd } from '@/lib/seo'
dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
```

**File yang terdampak:**
- `src/app/(frontend)/tentang/page.tsx`
- `src/app/(frontend)/kontak/page.tsx`
- `src/app/(frontend)/kebijakan-privasi/page.tsx`
- `src/app/(frontend)/syarat-ketentuan/page.tsx`
- `src/app/(frontend)/layanan/website/page.tsx`
- `src/app/(frontend)/layanan/google-ads/page.tsx`
- `src/app/(frontend)/layanan/seo/page.tsx`
- `src/app/(frontend)/layanan/digital-marketing/page.tsx`
- `src/app/(frontend)/layanan/mobile-app/page.tsx`
- `src/app/(frontend)/layanan/ai-integration/page.tsx`
- `src/app/(frontend)/layanan/maintenance/page.tsx`
- `src/app/(frontend)/layanan/website/semarang/page.tsx`
- `src/app/(frontend)/layanan/website/_components/CityWebsitePage.tsx`
- `src/app/(frontend)/layanan/page.tsx`
- `src/app/(frontend)/portofolio/page.tsx`

---

### C3 · Blog posts 414–672 kata (minimum 1.500 kata)

- **File:** Semua `/blog/[slug]` posts
- **Masalah:** 4 artikel terbit tanggal sama (30 Mei 2026) — sinyal batch-publish. Google QRG Sept 2025 nilai ini sebagai thin content. Konten tidak bisa bersaing dengan panduan kompetitor 2.000–4.000 kata.
- **Fix:** Expand setiap blog post ke minimum 1.500 kata. Tambah: contoh client spesifik, data yang dikutip ke sumbernya, langkah-langkah bernomor, dan internal link ke halaman layanan relevan.

---

### C4 · Halaman layanan 648–739 kata (minimum 800 kata)

- **Masalah:** Di bawah threshold. Kompetitor ranking "jasa SEO Semarang" rata-rata 2.400–2.800 kata.

| Halaman | Word Count | Gap |
|---|---|---|
| `/layanan/seo` | ~648 | -152 dari minimum |
| `/layanan/google-ads` | ~674 | -126 dari minimum |
| `/layanan/website` | ~739 | -61 dari minimum |
| `/tentang` | ~453 | -47 dari minimum |

- **Fix:** Tambah per halaman: satu section "jenis [layanan]", satu case study outcome (bisa anonymized), FAQ dari 4 → 6 pertanyaan berdasarkan PAA di SERP.

---

### C5 · Tidak ada Google Business Profile terkonfirmasi

- **Masalah:** Tidak ada GBP embed, tidak ada Maps link, tidak ada GBP URL di `sameAs`. GBP adalah faktor ranking lokal #1 (Whitespark 2026, skor 193). Tanpa GBP terverifikasi, noviyanto.com tidak bisa masuk local pack "jasa website Semarang".
- **Fix (action offline):**
  1. Buat dan verifikasi GBP listing
  2. Primary category: "Web Designer" atau "Internet Marketing Service"
  3. Secondary categories: "Search Engine Optimization Service", "Advertising Agency"
  4. Upload 10+ foto, isi business description, tambah semua layanan
  5. Setelah verified, tambah GBP URL ke `sameAs` di Payload CMS SiteSettings

---

### C6 · Nomor telepon tidak terlihat on-page (NAP mismatch)

- **Masalah:** `+6285879448563` ada di tiga schema block tapi invisible di setiap halaman. Google cross-reference visible NAP vs schema — mismatch turunkan entity confidence untuk local ranking.
- **Fix:** Tambah nomor telepon/WA terformat di footer dan `/kontak`.

```tsx
// Footer — tambah di samping email
<a href="tel:+6285879448563" className="...">+62 858-7944-8563</a>
```

---

## HIGH — Perbaiki Minggu Ini

### H1 · Homepage title tag tidak mengandung keyword utama

- **Current:** `"Noviyanto: Web Developer & Digital Marketing Expert"`
- **Target:** `"Jasa Website & Digital Marketing Semarang | Noviyanto"` (54 chars)
- **File:** `src/app/(frontend)/page.tsx` metadata

---

### H2 · Google Ads H1 = label, bukan headline

- **Current:** `"Google Ads"` — tidak ada keyword, benefit, lokasi
- **Target:** `"Jasa Google Ads Semarang — Iklan yang Mulai Menghasilkan di Minggu Pertama"`
- **File:** `src/app/(frontend)/layanan/google-ads/page.tsx`

---

### H3 · Duplicate geo pages — 72% konten identik

- **File:** `/layanan/website/jakarta`, `/layanan/website/bandung`
- **Masalah:** 72.3% 5-gram overlap dengan Semarang page. Risiko doorway page penalty.
- **Opsi A (recommended):** Canonical ke `/layanan/website`, kembangkan konten unik 60%+ per kota sebelum re-index.
- **Opsi B:** Tambah `<meta name="robots" content="noindex, follow">` ke Jakarta dan Bandung variants.

---

### H4 · `Person` schema duplikat di `/tentang`

- **File:** `src/app/(frontend)/tentang/page.tsx`
- **Masalah:** Layout sudah emit `personSchema()` sitewide. `/tentang` emit lagi — dua `@id: /#person` di halaman yang sama. Potensial rich results suppression.
- **Fix:** Hapus `personSchema()` dari array di `/tentang/page.tsx`.

---

### H5 · `serviceSchema` provider tidak ter-link ke entity graph

- **File:** `src/lib/seo.ts` baris 119–123
- **Masalah:** Provider inline `Person` tanpa `@id` — terputus dari entity `/#person`. Terdampak semua 8 service pages.

```ts
// SEBELUM
provider: { '@type': 'Person', name: 'Noviyanto', url: 'https://noviyanto.com' }

// SESUDAH
provider: { '@id': SCHEMA_ID.person }
```

---

### H6 · Review velocity mati — terakhir November 2023

- **Masalah:** 8 review, 5.0/5.0, tapi tidak ada yang masuk 2,5 tahun. Sterling Sky 18-day rule: ranking cliff sudah terjadi. Kompetitor: resolusiweb.com 48 reviews; codeinspira 100+ klien.
- **Fix:** Kirim follow-up ke 30+ klien existing dengan direct Google review link. Target 3–5 review baru dalam 30 hari.

---

### H7 · OG image homepage 800×800 px (bukan 1200×630)

- **Masalah:** `og:image` homepage = profile photo square 800×800. `summary_large_image` butuh minimum 1200×628. Service pages sudah generate OG benar — homepage jadi outlier.
- **Fix:** Generate branded OG card 1200×630 untuk homepage (ikuti pattern service pages).

---

### H8 · Tidak ada pricing context di halaman layanan

- **Masalah:** 7 dari 10 kompetitor "jasa website Semarang" tampilkan harga. Pengunjung butuh price anchor sebelum kontak.
- **Fix:** Tambah satu kalimat pricing context per halaman layanan:

```tsx
<p>Investasi mulai Rp X–Y juta — tergantung kebutuhan Anda. Konsultasi pertama gratis.</p>
```

---

### H9 · `/sitemap.xml` returns 404

- **Masalah:** Actual sitemap ada di `/sitemap-index.xml`. Banyak tool dan crawler probe `/sitemap.xml` secara default. Bing Webmaster Tools tidak akan discover sitemap.
- **Fix:**

```ts
// next.config.ts — tambah ke redirects()
{ source: '/sitemap.xml', destination: '/sitemap-index.xml', permanent: true }
```

---

### H10 · Duplikat security headers dari Next.js + nginx

- **Masalah:** `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, dan `Strict-Transport-Security` di-set dua kali. HSTS instance kedua tidak punya `preload` flag — nilai yang lebih lemah yang aktif.
- **Fix:** Hapus security headers dari nginx config — biarkan `next.config.ts` jadi single source of truth.

---

## MEDIUM — Perbaiki Bulan Ini

| # | Finding | File | Fix |
|---|---|---|---|
| M1 | Sitemap `lastmod` = `new Date()` per request — Google abaikan | `src/app/sitemap.ts` | Pakai static dates atau CMS `updatedAt` |
| M2 | `priority` + `changeFreq` di sitemap — Google abaikan sejak 2023 | `src/app/sitemap.ts` | Hapus kedua field ini |
| M3 | Semarang page `businessSchema` orphan `@id` bukan `/#business` | `semarang/page.tsx:91` | Pakai `SCHEMA_ID.business` |
| M4 | Footer render `<h2>Footer</h2>` — heading orphan semua halaman | `Footer.tsx` | Hapus heading, pakai `<footer>` semantic |
| M5 | Blog post breadcrumb schema 3 level tapi UI 1 level | `blog/[slug]/page.tsx` | Turunkan schema ke 2 level matching UI |
| M6 | `/tentang` 453 kata — terlalu tipis untuk E-E-A-T | `tentang/page.tsx` | Expand ke 700+ kata: timeline, tools, history |
| M7 | `BlogPosting.datePublished` bisa `undefined` kalau CMS null | `src/lib/seo.ts:165` | Fallback ke `new Date().toISOString()` |
| M8 | Tidak ada outbound link ke sumber otoritatif | Semua halaman | Tambah 2–3 link per halaman ke Google Search Central, dll. |
| M9 | Caching tidak cover `/og/` dan `/images/` | `next.config.ts` | Tambah header rule untuk kedua path |
| M10 | `X-XSS-Protection` deprecated header masih ada di nginx | nginx config | Hapus — CSP adalah mekanisme yang benar |
| M11 | Tidak ada `openingHoursSpecification` di schema | `src/lib/seo.ts` | Tambah Senin–Jumat 09:00–18:00 |
| M12 | Tidak ada `geo` coordinates di schema | `src/lib/seo.ts` | Tambah `GeoCoordinates` lat/lng Mijen (~-7.06180, 110.34520) |
| M13 | `serviceSchema.areaServed` hardcode Semarang saja | `src/lib/seo.ts` | Expand ke array multi-kota untuk layanan nasional |
| M14 | `postalCode` tidak ada di `PostalAddress` | `src/lib/constants.ts` | Tambah `postalCode: '50215'` (Kec. Mijen) |
| M15 | `BlogPosting` author inline redundant (inline + `@id`) | `src/lib/seo.ts` | Sederhanakan ke `author: { '@id': SCHEMA_ID.person }` |

---

## LOW — Backlog

- `llms.txt` tidak ada deklarasi RSL-1.0 license → tambah `license: RSL-1.0` di header
- Tidak ada `speakable` property → tambah untuk AI Overview candidacy
- `robots.txt` pakai `Host:` directive non-standard (Yandex only) → hapus
- `/blog` listing page 282 kata → tambah editorial intro
- IndexNow protocol tidak diimplementasi → buat key file + Payload webhook
- Tidak ada YouTube `sameAs` → faktor korelasi AI citation tertinggi (~0.737)
- `Blog` schema `blogPost` stubs tidak ada `datePublished` + `author`
- `WebPage` schema tidak ada di homepage
- `preconnect` google-analytics.com tidak ada fallback `dns-prefetch`
- Konflik font source: CLAUDE.md (`next/font/local`) vs `performance.md` (`next/font/google`) → rekonsiliasi

---

## Temuan Terbaik (Yang Sudah Benar)

- SSR penuh via Next.js App Router — AI crawler tidak perlu execute JS
- `llms.txt` terstruktur sangat baik sebagai briefing dokumen untuk LLM
- HTTPS enforced + www→non-www 301 + trailing slash 308 konsisten
- FAQPage schema ada di service pages
- BreadcrumbList di semua service pages
- Canonical tags self-referencing di semua halaman terindex
- Sitemap index dengan 3 sub-sitemap terstruktur
- Blog post `lastmod` dari CMS `updatedAt` — implementasi benar
- JS bundles load dengan `async` — tidak ada render-blocking scripts
- `lang="id"` + `locale: 'id_ID'` di OG — benar
- OG images sudah di-generate per service page (commit terbaru)

---

## Roadmap Prioritas

### Sprint 1 — Minggu Ini (Quick Wins + Security)

1. Hapus `'odoo'` dari `SERVICE_SLUGS` + tambah 301 redirect
2. Ganti semua `JSON.stringify` → `safeJsonLd()` di 15+ file
3. Fix homepage title → include "Semarang" + keyword utama
4. Fix Google Ads H1 dari label ke headline dengan keyword
5. Tambah `/sitemap.xml` → `/sitemap-index.xml` redirect
6. Tambah nomor telepon visible di footer + `/kontak`
7. Generate branded OG card 1200×630 untuk homepage

### Sprint 2 — Bulan Ini (Content + Schema)

8. Expand blog posts ke 1.500+ kata masing-masing
9. Expand `/layanan/seo`, `/layanan/google-ads`, `/layanan/website` ke 800+ kata
10. Fix `serviceSchema` provider → `{ '@id': SCHEMA_ID.person }`
11. Hapus `personSchema()` duplikat dari `/tentang`
12. Tambah pricing context di semua halaman layanan
13. Solicit 3–5 review baru dari klien existing
14. Fix sitemap: hapus `priority`/`changeFreq`, fix `lastmod` ke static dates
15. Tambah `geo`, `openingHoursSpecification`, `postalCode` ke schema

### Sprint 3 — Kuartal Ini (Authority + Expansion)

16. Buat `/layanan/google-ads/semarang` + `/layanan/seo/semarang` pages
17. Diferensiasi konten Jakarta + Bandung pages (atau noindex)
18. Setup dan verifikasi Google Business Profile
19. Implementasi nonce-based CSP untuk public routes
20. Setup YouTube presence + tambah ke `sameAs`
21. Expand `/tentang` ke 700+ kata dengan timeline + tools + credentials

---

## Referensi Sub-Audit

| Subagen | Skor | Temuan Utama |
|---|---|---|
| Technical SEO | 74/100 | C1 odoo 404, H3 geo page duplicate, HSTS conflict |
| Content / E-E-A-T | 49/100 | C3 blog thin content, C4 service page thin content |
| Schema | 55/100 | C2 safeJsonLd, H4 duplicate Person, H5 provider @id broken |
| Sitemap | 70/100 | C1 odoo in sitemap, H1 lastmod static, /sitemap.xml 404 |
| Performance | 65/100 | Font source conflict, dynamic imports unconfirmed, /og/ cache gap |
| GEO / AI Search | 58/100 | FAQPage missing 6/7 service pages, no speakable, no YouTube sameAs |
| Local SEO | 41/100 | No GBP confirmed, phone invisible, no geo coordinates, review velocity dead |
| SXO | 62/100 | Page-type mismatch vs SERP, no pricing context, Google Ads H1 |

---

*Laporan dibuat otomatis oleh Claude Code — 8 subagen paralel pada 2 Juni 2026.*
*Verifikasi manual direkomendasikan sebelum implementasi perubahan schema dan redirect.*
