import { SITE } from '@/lib/constants'

export const dynamic = 'force-static'

export function GET() {
  const u = SITE.url
  const body = `# Noviyanto

> Digital growth partner berbasis di Semarang. Bantu bisnis tumbuh dan dapat leads melalui web development, Google Ads, SEO, digital marketing, Odoo ERP, AI integration, mobile app, dan maintenance website. Founder Folkastudio (50+ proyek digital).

## Profil
- Nama: Noviyanto
- Lokasi: ${SITE.address.city}, ${SITE.address.region}, ${SITE.address.country}
- Alamat: ${SITE.address.full}
- Email: ${SITE.email}
- WhatsApp: +${SITE.waNumber}
- Founder: Folkastudio (https://folkastudio.com)
- Area layanan: Jakarta, Bandung, Semarang, dan kota lainnya secara remote

## Halaman Utama
- [Beranda](${u}/): Web Developer & Digital Marketing Expert. Hero, layanan, industri, dan CTA konsultasi.
- [Layanan](${u}/layanan): Daftar 8 layanan dengan kartu navigasi.
- [Portofolio](${u}/portofolio): 7 klien aktif yang sedang dikelola, plus founder Folkastudio.
- [Tentang](${u}/tentang): Latar belakang, filosofi kerja, pengalaman lintas industri, stack teknologi.
- [Kontak](${u}/kontak): WhatsApp, form konsultasi, email, alamat Semarang.

## Layanan
- [Website Development](${u}/layanan/website): Pembuatan website bisnis dengan Next.js. Mobile-first, SEO-ready, terintegrasi WhatsApp/form/sistem booking. Lead-generation-first design.
- [Google Ads](${u}/layanan/google-ads): Setup, optimasi rutin, tracking konversi. Customer baru bisa masuk minggu pertama.
- [SEO Organik](${u}/layanan/seo): Audit teknis, on-page, local SEO, konten. Traffic organik sebagai aset jangka panjang.
- [Digital Marketing](${u}/layanan/digital-marketing): Strategi terpadu lintas kanal — paid, content, email, analitik.
- [Odoo CRM & ERP](${u}/layanan/odoo): Implementasi Odoo (CRM, Accounting, HR, Inventory, Project, Website). Developer tersertifikasi.
- [AI Integration](${u}/layanan/ai-integration): Otomasi pekerjaan berulang dengan n8n, OpenAI, Anthropic Claude, Make, Python.
- [Aplikasi Mobile](${u}/layanan/mobile-app): React Native cross-platform Android + iOS.
- [Maintenance Website](${u}/layanan/maintenance): Update, backup, monitoring uptime, optimasi performa.

## Industri yang Ditangani
- B2B IT & Teknologi
- Home Service (spa panggilan, jasa bersih, les private)
- Tour & Travel
- Perhiasan & Jewelry
- Firma Hukum & Legal
- Sewa Kantor & Virtual Office
- E-commerce
- Media Lokal

## Klien Aktif
- Truly Home Massage (trulyhomemassage.com): Maintenance, Google Ads, SEO
- Jeda Home Massage (jedahomemassage.com): Maintenance, Google Ads, SEO
- Rockologist (rockologist.id): Maintenance, SEO
- Prioffice (prioffice.com): Maintenance
- Layz Motor (layz-motor.com): Maintenance
- Lapin (lapin.id): Google Ads
- Inisumedang (inisumedang.com): Manage VPS

## Stack Teknologi
Next.js, React, React Native, TypeScript, Tailwind CSS, Odoo, n8n, OpenAI API, Anthropic Claude, Python, Vercel, PostgreSQL

## Kontak
Konsultasi pertama gratis 30 menit. Hubungi via WhatsApp (+${SITE.waNumber}), email (${SITE.email}), atau isi form konsultasi di /kontak.

## Optional
- [Sitemap](${u}/sitemap.xml)
- [Sitemap Index](${u}/sitemap-index.xml)
- [Robots](${u}/robots.txt)
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
