# Scaffold New Page

Buat halaman baru di Next.js App Router untuk noviyanto-website.

## Usage
/new-page [path] [title] [description]

Contoh: `/new-page layanan/konsultasi "Konsultasi Digital" "Halaman layanan konsultasi"`

## Yang Harus Dibuat

1. `src/app/[path]/page.tsx` — halaman utama dengan:
   - `export const metadata: Metadata` lengkap (title, description, OG, canonical)
   - H1 mengandung keyword utama
   - Struktur: Hero → Problem → Solution → Process → FAQ → CTA
   - Structured data JSON-LD (Service schema)

2. Checklist setelah buat:
   - [ ] Metadata lengkap dengan canonical URL
   - [ ] H1 mengandung keyword
   - [ ] CTA button primary (WhatsApp) dan secondary (Calendly)
   - [ ] FAQ section minimum 4 pertanyaan
   - [ ] Bottom CTA section
   - [ ] Tambah ke sitemap.ts
   - [ ] Tambah link di Navbar dan Footer
   - [ ] Test di mobile viewport (375px)
