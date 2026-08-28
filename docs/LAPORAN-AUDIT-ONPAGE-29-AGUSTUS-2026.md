# Laporan Audit On-Page — noviyanto.com

**Tanggal:** 29 Agustus 2026
**Domain:** https://noviyanto.com
**Cakupan:** 25 halaman dari sitemap (semua merespons 200)
**Metode:** Lighthouse 12.8.2 · Chrome for Testing headless · Slow 4G + CPU 4× · viewport 390 px
**Versi terbaca:** https://claude.ai/code/artifact/03720983-787b-4c66-a965-4f53f973c7a6
**Diperbarui:** 29 Agustus 2026 — setelah T-01, T-02, T-04, T-06 diperbaiki & di-deploy

Pemicu: error dari seochecker pihak ketiga soal alt image, LCP/FCP, render-blocking,
dan warning "Some anchor texts are used more than once".

---

## Status

| Temuan | Status |
|---|---|
| T-01 CSP Google Ads (kritis) | **Selesai** |
| T-02 Anchor text (tinggi) | **Selesai** |
| T-03 Halaman kota (tinggi) | **Sebagian** — 82,4% → 79,7% |
| T-04 Title & description (sedang) | **Selesai** |
| T-05 E-E-A-T (sedang) | Belum — butuh data klien |
| T-06 Kontras (sedang) | **Selesai** |
| T-07 Bundle (sedang) | Belum — prioritas rendah |
| P-01..P-03 Positif palsu | Tidak perlu diperbaiki |
| B-01..B-02 Belum tuntas | Terbuka |

Skor Lighthouse halaman artikel setelah perbaikan:

| Kategori | Sebelum | Sesudah |
|---|---|---|
| Accessibility | 96 | **100** |
| Best Practices | 93 | **100** |
| SEO | 100 | 100 |

Best Practices ikut naik karena perbaikan CSP menghapus error console.

## Ringkasan awal

**Dua dari tiga keluhan checker adalah positif palsu.** Alt image dan render-blocking
terverifikasi bersih. LCP 6,4 s tidak tereproduksi — pengukuran ulang memberi 1,1–2,0 s.

**Satu bug kritis ditemukan yang tidak dilaporkan checker mana pun:** CSP memblokir
conversion tracking Google Ads.

---

## T-01 · KRITIS · CSP memblokir conversion tracking Google Ads

Tag `AW-10927143412` (via GTM `GTM-K8V9TVT`) mengirim event ke
`pagead2.googlesyndication.com/ccm/collect`. Domain itu tidak ada di `connect-src`,
jadi browser menolaknya. Direproduksi di `/kontak`.

```
Refused to connect to 'https://pagead2.googlesyndication.com/ccm/collect
  ?tid=AW-10927143412&en=page_view&dl=https://noviyanto.com/kontak'
because it violates the document's Content Security Policy.

connect-src saat ini (next.config.ts:44):
  'self' google-analytics.com analytics.folkastudio.com googletagmanager.com
```

Dampak: sinyal konversi ke Google Ads tidak lengkap — merusak pelaporan konversi
sekaligus data yang dipakai Smart Bidding.

**Perbaikan:** tambahkan `https://pagead2.googlesyndication.com` dan
`https://googleads.g.doubleclick.net` ke `connect-src` dan `script-src` di
`next.config.ts`.

**HASIL — SELESAI.** Diverifikasi ulang di `/kontak`: nol pelanggaran CSP,
request `ccm/collect` mengembalikan **200**.

---

## T-02 · TINGGI · 14 tautan internal memakai anchor tanpa keyword

Sumber warning "Some anchor texts are used more than once".
`"Pelajari lebih lanjut →"` dipakai 7× di `/` dan 7× di `/layanan`, menunjuk ke
**tujuh URL berbeda**:

```
/layanan/website          /layanan/google-ads
/layanan/seo              /layanan/digital-marketing
/layanan/ai-integration   /layanan/mobile-app
/layanan/maintenance
```

**Perbaikan:** anchor deskriptif per tujuan ("Lihat layanan SEO", dst).

**HASIL — SELESAI.** Beranda dan `/layanan` kini punya 7 anchor unik.
Pemindaian ulang: nol anchor sama yang menunjuk URL berbeda. Nol overflow
horizontal di 390 px dan 1440 px.

Catatan: `"Tanya Paket Ini"` 3× per halaman layanan menunjuk ke 3 URL wa.me berbeda —
eksternal, dampak SEO mendekati nol, biarkan.

---

## T-03 · TINGGI · Halaman kota 78% identik

Jakarta vs Bandung, per blok teks: **20 dari 91 blok berbeda**. Perbedaan nyata hanya
substitusi nama kota + daftar kawasan.

| Halaman | Kata |
|---|---|
| /layanan/website/semarang | 1.929 |
| /layanan/website/jakarta | 1.851 |
| /layanan/website/bandung | 1.850 |

**Perbaikan:** beri tiap kota minimal satu blok yang tidak bisa disalin (klien nyata
atau studi kasus lokal). Jangan tambah kota keempat sebelum ini beres.

**HASIL — SEBAGIAN.** Dua FAQ generik yang sudah dijawab di tempat lain diganti
pertanyaan khas kota (Jakarta: harga + revisi remote; Bandung: harga + takeover
website lama). Pergerakannya tipis: **82,4% → 79,7%** (13 → 15 blok berbeda dari
74; pengukuran ini membuang JSON-LD sehingga basisnya beda dari angka 78% di
atas). Enam blok besar yang identik masih mendominasi. Menuntaskannya perlu
bukti lokal nyata per kota — data yang tidak boleh dikarang.

---

## T-04 · SEDANG · Title terpotong & description kepanjangan

| Halaman | Title | Desc |
|---|---|---|
| /blog/keamanan-website-bisnis-di-era-ai | 87 | 180 |
| /blog/seo-on-page-2026-aeo-geo-aio | 68 | 165 |
| /blog/google-ads-atau-seo-mana-yang-lebih-cocok… | 65 | 150 |
| /layanan/website/jakarta | 42 | 223 |
| /layanan/website/bandung | 42 | 223 |
| /blog/5-pelajaran-dari-30-proyek-digital… | 47 | 163 |

Target: title ≤60, description 150–160. Tidak ada title/description duplikat antar halaman.

**HASIL — SELESAI.** keamanan 87→45 / 180→151 · seo-on-page 68→52 / 165→145 ·
google-ads-vs-seo 65→47 · 5-pelajaran 163→142 · kota Jakarta & Bandung 223→159.
H1 artikel sengaja dibiarkan versi panjangnya.

---

## T-05 · SEDANG · Kredensial hanya di structured data

```
/tentang     484 kata terlihat  ·  sinyal kredensial: TIDAK ADA
/portofolio  506 kata terlihat  ·  7 klien, tanpa angka hasil per klien
/kontak      166 kata terlihat  ·  tertipis di seluruh situs
```

Klaim "3+ tahun pengalaman, 7+ industri" hanya ada di JSON-LD, tidak di teks terlihat.

Sudah benar: schema `Person` + `sameAs` (Instagram, LinkedIn); artikel blog menautkan
`author` ke `#person`.

**Perbaikan:** angka hasil per klien di `/portofolio`; kredensial eksplisit di `/tentang`.

---

## T-06 · SEDANG · Kontras teks di bawah ambang WCAG AA

**Koreksi atas versi pertama laporan ini:** semula ditulis masalahnya hanya di
baris meta artikel. Setelah ditelusuri, yang gagal ada **lima kelompok** — tiga
di antaranya di footer global, jadi kena seluruh halaman.

```
                      warna    rasio          target AA 4.5:1
baris meta artikel    #99A1AF  2.60:1  ->  #6B7280  4.83:1
tautan isi artikel    #D97706  3.19:1  ->  #B45309  5.02:1
tagline footer        #F59E0B  2.15:1  ->  #B45309  5.02:1
teks kecil footer     #9CA3AF  2.54:1  ->  #6B7280  4.83:1
```

Token `--color-accent-dark` tidak diubah — dipakai komponen lain dengan ukuran
dan berat font berbeda. Yang di-override hanya `.blog-prose a`.

**HASIL — SELESAI.** Audit `color-contrast` lolos penuh, Accessibility 96 → 100.

---

## T-07 · SEDANG · Cadangan performa

```
JavaScript tidak terpakai      266 KiB
JavaScript legacy (polyfill)    24 KiB
Penyampaian gambar              32 KiB
Ukuran gambar tidak pas         28 KiB
```

Prioritas rendah — kerjakan setelah T-01..T-05.

---

## Positif palsu — JANGAN diperbaiki

### P-01 · Alt image

Nol gambar tanpa atribut `alt` di 25 halaman. 12 gambar `alt=""` semuanya logo klien di
`ClientReviews.tsx` yang membawa `aria-hidden="true"` — nama klien sudah ada di teks
sebelahnya. Lighthouse `image-alt` score = 1, kategori SEO 100/100.

Mengisi alt di situ membuat screen reader membaca nama klien dua kali.

### P-02 · Render-blocking

Satu resource: `/_next/static/chunks/0ioof8kaungkg.css`, 13,3 KB, ~228 ms.
Estimasi penghematan Lighthouse: **0 ms**.

### P-03 · "HTTP/1.1" & "redirect 830 ms"

Artefak Lighthouse headless. Verifikasi curl:

```
$ curl -sI https://noviyanto.com/…      → HTTP/2 200
http://noviyanto.com/…                  → 1 redirect → https (HTTP/2)
https://www.noviyanto.com/…             → 1 redirect → https (HTTP/2)
```

Konsekuensi: run Lighthouse yang sama menghasilkan LCP 6,4 s — angka itu tidak bisa
dipercaya begitu saja.

---

## Pengukuran performa

Ambang: LCP < 2,5 s · FCP < 1,8 s · CLS < 0,1

| Halaman | FCP | LCP | TTFB | CLS | Elemen LCP |
|---|---|---|---|---|---|
| / | 1.964 ms | 1.964 ms | 1.089 ms | 0,001 | H1 teks |
| /blog/keamanan-website-bisnis-di-era-ai | 1.148 ms | 1.148 ms | 261 ms | 0 | IMG hero |
| /blog | 1.088 ms | 1.088 ms | 344 ms | 0 | IMG kartu |
| /portofolio | 1.136 ms | 1.136 ms | 321 ms | 0 | H1 teks |
| /layanan/website | 1.168 ms | tidak terbit | 337 ms | 0 | — |
| /layanan/website/semarang | 1.472 ms | tidak terbit | 625 ms | 0 | — |

---

## Belum tuntas

### B-01 · Dua halaman layanan tidak memancarkan entry LCP

`/layanan/website` dan `/layanan/website/semarang` konsisten tanpa kandidat LCP di
beberapa run, padahal FCP normal. Diperiksa dan negatif: semua elemen di atas fold
`opacity: 1`, warna solid, tidak ada `visibility: hidden`. Dugaan terkuat artefak
headless — belum terbukti.

### B-02 · Semua angka adalah data lab

PSI API kehabisan kuota harian, data CrUX tidak terambil. **Cek laporan Core Web Vitals
di Google Search Console** untuk data lapangan yang sebenarnya menentukan.

---

## Sisa pekerjaan

1. **T-05** — angka hasil nyata per klien di `/portofolio`, kredensial eksplisit di
   `/tentang`. Pekerjaan konten, bukan teknis, dan paling menentukan. Butuh data.
2. **T-03** — perlu satu klien/studi kasus nyata di Jakarta dan Bandung.
   Alternatifnya memangkas blok generik dari halaman kota, tapi itu menipiskan
   halaman yang sedang terindeks dari ~1.850 jadi ~1.400 kata — diputuskan bersama.
3. **T-07** — 266 KiB JS tidak terpakai. Prioritas paling rendah.

## Catatan proses

Build di server harus jalan **setelah** konten CMS di-seed. Halaman blog memakai
ISR dengan `revalidate`, jadi build yang mendahului seed menghasilkan prerender
lama — meta artikel dan sitemap sempat tidak ikut berubah. Urutan yang benar:
`pull -> build -> seed -> build`.
