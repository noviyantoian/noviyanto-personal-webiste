/**
 * Peta tautan internal kontekstual antara halaman layanan dan artikel blog.
 *
 * Audit 30 Agustus 2026 menemukan setiap artikel hanya menerima satu tautan
 * internal — dari indeks /blog. Seluruh tautan lain di situs berasal dari
 * nav dan footer, sehingga tidak ada halaman yang diprioritaskan. Peta ini
 * yang memperbaikinya, sekaligus memenuhi .claude/rules/seo.md yang
 * mensyaratkan halaman layanan saling menaut dengan konten pendukungnya.
 *
 * Relasi ditulis sekali di sini lalu dibaca dua arah:
 *   halaman layanan → artikel   (RELATED_ARTICLES)
 *   artikel → halaman layanan   (RELATED_SERVICES)
 */

export interface RelatedLink {
  href: string
  title: string
  blurb: string
}

/** Sumber tunggal judul & ringkasan artikel supaya tidak ditulis ulang per halaman. */
const ARTICLE: Record<string, RelatedLink> = {
  seoOnPage: {
    href: '/blog/seo-on-page-2026-aeo-geo-aio',
    title: 'SEO On-Page 2026: Panduan Lengkap plus AEO, GEO, dan AIO',
    blurb: 'Apa yang berubah sejak mesin pencari mulai menjawab langsung, dan apa yang harus disiapkan.',
  },
  keamanan: {
    href: '/blog/keamanan-website-bisnis-di-era-ai',
    title: 'Keamanan Website Bisnis di Era AI',
    blurb: 'Serangan otomatis makin murah dijalankan. Pertahanannya justru masih yang itu-itu juga.',
  },
  checklist: {
    href: '/blog/checklist-10-poin-apakah-website-bisnis-anda-benar-benar-menghasilkan-leads',
    title: 'Checklist 10 Poin: Apakah Website Anda Benar-Benar Menghasilkan Leads?',
    blurb: 'Sepuluh hal yang bisa Anda cek sendiri sebelum memutuskan perlu perbaikan atau tidak.',
  },
  adsVsSeo: {
    href: '/blog/google-ads-atau-seo-mana-yang-lebih-cocok-untuk-bisnis-anda',
    title: 'Google Ads atau SEO: Mana yang Lebih Cocok untuk Bisnis Anda?',
    blurb: 'Kapan iklan berbayar masuk akal, kapan lebih baik menunggu organik tumbuh.',
  },
  biaya: {
    href: '/blog/berapa-biaya-jasa-pembuatan-website-di-semarang-panduan-harga-paket-2026',
    title: 'Berapa Biaya Jasa Pembuatan Website di Semarang?',
    blurb: 'Rincian yang membentuk harga sebuah website, dan kenapa angkanya bisa jauh berbeda.',
  },
  aplikasiMobile: {
    href: '/blog/kapan-bisnis-butuh-aplikasi-mobile-kapan-cukup-website',
    title: 'Kapan Bisnis Butuh Aplikasi Mobile, Kapan Cukup Website',
    blurb: 'Lima kondisi yang benar-benar menuntut aplikasi, dan biaya perawatan yang jarang dihitung.',
  },
  pelajaran: {
    href: '/blog/5-pelajaran-dari-30-proyek-digital-kenapa-website-saja-tidak-cukup',
    title: '5 Pelajaran dari 30+ Proyek Digital',
    blurb: 'Kenapa website saja jarang cukup untuk membuat inquiry masuk secara konsisten.',
  },
}

const SERVICE: Record<string, RelatedLink> = {
  website: {
    href: '/layanan/website',
    title: 'Jasa Pembuatan Website',
    blurb: 'Website bisnis berbasis Next.js — cepat, SEO-ready, dirancang untuk menghasilkan leads.',
  },
  seo: {
    href: '/layanan/seo',
    title: 'Jasa SEO',
    blurb: 'Audit teknis, riset keyword, dan local SEO untuk tumbuh di pencarian organik.',
  },
  googleAds: {
    href: '/layanan/google-ads',
    title: 'Jasa Google Ads',
    blurb: 'Kampanye berbasis data — anggaran diarahkan ke pencarian yang niatnya membeli.',
  },
  maintenance: {
    href: '/layanan/maintenance',
    title: 'Maintenance Website',
    blurb: 'Update keamanan, backup rutin, dan monitoring uptime supaya website tidak jadi celah.',
  },
  digitalMarketing: {
    href: '/layanan/digital-marketing',
    title: 'Jasa Digital Marketing',
    blurb: 'Website, iklan, SEO, dan media sosial yang dijalankan sebagai satu ekosistem.',
  },
  mobileApp: {
    href: '/layanan/mobile-app',
    title: 'Pembuatan Aplikasi Mobile',
    blurb: 'React Native — satu basis kode untuk Android dan iOS, terhubung ke sistem yang sudah berjalan.',
  },
  semarang: {
    href: '/layanan/website/semarang',
    title: 'Jasa Pembuatan Website Semarang',
    blurb: 'Paket, proses, dan wilayah layanan untuk bisnis di Semarang dan sekitarnya.',
  },
}

/** Artikel pendukung yang ditampilkan di halaman layanan, di-key oleh path halaman. */
export const RELATED_ARTICLES: Record<string, RelatedLink[]> = {
  '/layanan/website': [ARTICLE.checklist, ARTICLE.biaya, ARTICLE.aplikasiMobile],
  '/layanan/seo': [ARTICLE.seoOnPage, ARTICLE.adsVsSeo],
  '/layanan/google-ads': [ARTICLE.adsVsSeo, ARTICLE.pelajaran],
  '/layanan/maintenance': [ARTICLE.keamanan],
  '/layanan/digital-marketing': [ARTICLE.pelajaran, ARTICLE.checklist],
  '/layanan/ai-integration': [ARTICLE.keamanan],
  '/layanan/mobile-app': [ARTICLE.aplikasiMobile, ARTICLE.pelajaran],
  '/layanan/website/semarang': [ARTICLE.biaya, ARTICLE.checklist],
}

/** Layanan relevan yang ditampilkan di bawah artikel, di-key oleh slug artikel. */
export const RELATED_SERVICES: Record<string, RelatedLink[]> = {
  'seo-on-page-2026-aeo-geo-aio': [SERVICE.seo, SERVICE.website],
  'keamanan-website-bisnis-di-era-ai': [SERVICE.maintenance, SERVICE.website],
  'checklist-10-poin-apakah-website-bisnis-anda-benar-benar-menghasilkan-leads': [
    SERVICE.website,
    SERVICE.seo,
  ],
  'google-ads-atau-seo-mana-yang-lebih-cocok-untuk-bisnis-anda': [
    SERVICE.googleAds,
    SERVICE.seo,
  ],
  'berapa-biaya-jasa-pembuatan-website-di-semarang-panduan-harga-paket-2026': [
    SERVICE.semarang,
    SERVICE.website,
  ],
  'kapan-bisnis-butuh-aplikasi-mobile-kapan-cukup-website': [
    SERVICE.mobileApp,
    SERVICE.website,
  ],
  '5-pelajaran-dari-30-proyek-digital-kenapa-website-saja-tidak-cukup': [
    SERVICE.digitalMarketing,
    SERVICE.website,
  ],
}
