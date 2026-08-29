import { SITE } from '@/lib/constants'
import { getPublishedPosts } from '@/lib/blog'

// Dulu 'force-static'. Sekarang harus revalidate: section Blog dibangkitkan
// dari Payload, jadi artikel baru wajib bisa masuk tanpa deploy ulang.
// Sejam sama dengan sitemap — dua berkas ini sebaiknya tidak saling mendahului.
export const revalidate = 3600

/** Ringkas excerpt agar satu artikel tetap satu baris yang enak dibaca mesin. */
function oneLine(text: string, max = 160): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  return flat.length <= max ? flat : `${flat.slice(0, max - 1).trimEnd()}…`
}

/**
 * Daftar artikel untuk section Blog.
 *
 * Kalau database tidak bisa dihubungi, kembalikan string kosong dan biarkan
 * section-nya absen — llms.txt tetap tersaji utuh. Menjatuhkan seluruh berkas
 * hanya karena blog gagal di-query adalah kerugian yang jauh lebih besar.
 */
async function blogSection(u: string): Promise<string> {
  try {
    const posts = await getPublishedPosts(50)
    if (posts.length === 0) return ''

    const lines = posts
      .map((p) => `- [${p.title}](${u}/blog/${p.slug}): ${oneLine(p.excerpt)}`)
      .join('\n')

    return `\n## Blog\n- [Indeks Blog](${u}/blog): Semua artikel tentang website, SEO, Google Ads, dan pertumbuhan bisnis digital.\n${lines}\n`
  } catch {
    return ''
  }
}

export async function GET(): Promise<Response> {
  const u = SITE.url
  const blog = await blogSection(u)

  const body = `# Noviyanto
license: RSL-1.0

> Digital growth partner berbasis di Semarang. Bantu bisnis tumbuh dan dapat leads melalui web development, Google Ads, SEO, digital marketing, AI integration, mobile app, dan maintenance website. Founder Folkastudio — 50+ proyek digital untuk 30+ bisnis.

## Profil
- Nama: Noviyanto
- Lokasi: ${SITE.address.city}, ${SITE.address.region}, ${SITE.address.country}
- Alamat: ${SITE.address.full} ${SITE.address.postalCode}
- ${SITE.legal.nibLabel}: ${SITE.legal.nib} (diterbitkan oleh ${SITE.legal.issuer}, dapat diverifikasi di ${SITE.legal.verifyUrl})
- Email: ${SITE.email}
- WhatsApp: +${SITE.waNumber}
- Founder: Folkastudio (https://folkastudio.com)
- Area layanan: Jakarta, Bandung, Semarang, dan kota lainnya secara remote

## Halaman Utama
- [Beranda](${u}/): Web Developer & Digital Marketing Expert. Hero, layanan, industri, dan CTA konsultasi.
- [Layanan](${u}/layanan): Daftar 7 layanan dengan kartu navigasi.
- [Portofolio](${u}/portofolio): 9 klien aktif yang sedang dikelola, plus founder Folkastudio.
- [Tentang](${u}/tentang): Latar belakang, filosofi kerja, pengalaman lintas industri, stack teknologi.
- [Kontak](${u}/kontak): WhatsApp, form konsultasi, email, alamat Semarang.

## Layanan
- [Website Development](${u}/layanan/website): Pembuatan website bisnis dengan Next.js. Mobile-first, SEO-ready, terintegrasi WhatsApp/form/sistem booking. Lead-generation-first design.
- [Google Ads](${u}/layanan/google-ads): Setup, optimasi rutin, tracking konversi. Customer baru bisa masuk minggu pertama.
- [SEO Organik](${u}/layanan/seo): Audit teknis, on-page, local SEO, konten. Traffic organik sebagai aset jangka panjang.
- [Digital Marketing](${u}/layanan/digital-marketing): Strategi terpadu lintas kanal — paid, content, email, analitik.
- [AI Integration](${u}/layanan/ai-integration): Otomasi pekerjaan berulang dengan n8n, OpenAI, Anthropic Claude, Make, Python.
- [Aplikasi Mobile](${u}/layanan/mobile-app): React Native cross-platform Android + iOS.
- [Maintenance Website](${u}/layanan/maintenance): Update, backup, monitoring uptime, optimasi performa.

## Halaman Industri
- [Website Tour & Travel](${u}/jasa-website-tour-travel): Website khusus bisnis tour & travel — sistem booking online, halaman paket tour, galeri destinasi, SEO lokal, integrasi WhatsApp.

## Halaman Kota
- [Jasa Website Semarang](${u}/layanan/website/semarang)
- [Jasa Website Jakarta](${u}/layanan/website/jakarta)
- [Jasa Website Bandung](${u}/layanan/website/bandung)

## Industri yang Ditangani
- B2B IT & Teknologi
- Home Service (spa panggilan, jasa bersih, les privat)
- Tour & Travel
- Perhiasan & Batu Mulia
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
- Folclean (folclean.com): Maintenance, SEO, Google Ads, Manage VPS
- Wallblock (wallblock.co.id): Maintenance, SEO, Google Ads, Manage VPS
- Inisumedang (inisumedang.com): Manage VPS

## Stack Teknologi
Next.js, React, React Native, TypeScript, Tailwind CSS, n8n, OpenAI API, Anthropic Claude, Python, Vercel, PostgreSQL
${blog}
## Kontak
Konsultasi pertama gratis 30 menit. Hubungi via WhatsApp (+${SITE.waNumber}), email (${SITE.email}), atau isi form konsultasi di /kontak.

## Optional
- [Sitemap Index](${u}/sitemap-index.xml)
- [Sitemap Halaman](${u}/sitemap/pages.xml)
- [Sitemap Layanan](${u}/sitemap/services.xml)
- [Sitemap Blog](${u}/sitemap/blog.xml)
- [Robots](${u}/robots.txt)
`

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
