// ── Site Config ─────────────────────────────────────────────────
export const SITE = {
  name: 'Noviyanto',
  tagline: 'Digital Growth Partner',
  description:
    'Bukan sekadar bikin website — Noviyanto bantu bisnis Anda tumbuh dan mendapatkan leads melalui web development, digital marketing, dan AI integration.',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noviyanto.com',
  location: 'Jakarta · Bandung · Semarang',
  email: 'info@noviyanto.com',
  waNumber: process.env.NEXT_PUBLIC_WA_NUMBER ?? '6285879448563',
  ogImage: '/og/default.jpg',
  address: {
    line: 'Dk. Kaligetas, Kelurahan Jatibarang',
    district: 'Kecamatan Mijen',
    city: 'Kota Semarang',
    region: 'Jawa Tengah',
    country: 'Indonesia',
    postalCode: '50215',
    full: 'Dk. Kaligetas, Kelurahan Jatibarang, Kecamatan Mijen, Kota Semarang, Jawa Tengah, Indonesia',
  },
} as const

// ── WhatsApp Messages ────────────────────────────────────────────
export const WA_MESSAGES = {
  default: 'Halo Noviyanto, saya ingin konsultasi tentang kebutuhan digital bisnis saya.',
  website: 'Halo, saya tertarik dengan layanan pembuatan website. Boleh konsultasi?',
  googleAds: 'Halo, saya ingin tahu lebih lanjut tentang layanan Google Ads.',
  seo: 'Halo, saya ingin konsultasi audit SEO untuk website saya.',
  digitalMarketing: 'Halo, saya ingin diskusi strategi digital marketing untuk bisnis saya.',
  aiIntegration: 'Halo, saya ingin diskusi tentang otomasi AI untuk bisnis saya.',
  mobileApp: 'Halo, saya ingin konsultasi pembuatan aplikasi mobile.',
  maintenance: 'Halo, saya ingin tahu paket maintenance website yang tersedia.',
  portfolio: 'Halo, saya lihat portofolio Anda dan tertarik untuk diskusi.',
  audit: 'Halo, saya ingin minta audit website gratis.',
} as const

export function getWaLink(message: keyof typeof WA_MESSAGES = 'default') {
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(WA_MESSAGES[message])}`
}

// ── Navigation ───────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: 'Layanan', href: '/layanan' },
  { label: 'Portofolio', href: '/portofolio' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/kontak' },
] as const

export const SERVICE_LINKS = [
  { label: 'Website Development', href: '/layanan/website', slug: 'website' },
  { label: 'Google Ads', href: '/layanan/google-ads', slug: 'google-ads' },
  { label: 'SEO Organik', href: '/layanan/seo', slug: 'seo' },
  { label: 'Digital Marketing', href: '/layanan/digital-marketing', slug: 'digital-marketing' },
  { label: 'AI Integration', href: '/layanan/ai-integration', slug: 'ai-integration' },
  { label: 'Aplikasi Mobile', href: '/layanan/mobile-app', slug: 'mobile-app' },
  { label: 'Maintenance', href: '/layanan/maintenance', slug: 'maintenance' },
] as const

// Area layanan — halaman jasa website per kota
export const AREA_LINKS = [
  { label: 'Jasa Website Jakarta', href: '/layanan/website/jakarta' },
  { label: 'Jasa Website Bandung', href: '/layanan/website/bandung' },
  { label: 'Jasa Website Semarang', href: '/layanan/website/semarang' },
] as const

// Halaman legal — ditautkan di footer
export const LEGAL_LINKS = [
  { label: 'Kebijakan Privasi', href: '/kebijakan-privasi' },
  { label: 'Syarat & Ketentuan', href: '/syarat-ketentuan' },
] as const

// ── Stats ────────────────────────────────────────────────────────
export const STATS = [
  { value: '30+', label: 'Proyek Selesai' },
  { value: '7',   label: 'Industri Ditangani' },
  { value: '3+',  label: 'Tahun Pengalaman' },
  { value: 'Jakarta · Bandung · Semarang', label: 'Area Jangkauan' },
] as const

// ── Industries ───────────────────────────────────────────────────
export const INDUSTRIES = [
  { name: 'B2B IT & Teknologi',             icon: '💻' },
  { name: 'Home Service',                  icon: '🏠' },
  { name: 'Tour & Travel',                   icon: '✈️' },
  { name: 'Perhiasan & Jewelry',             icon: '💎' },
  { name: 'Firma Hukum & Legal',             icon: '⚖️' },
  { name: 'Sewa Kantor & Virtual Office',    icon: '🏢' },
  { name: 'E-commerce',                      icon: '🛒' },
] as const

// ── GA4 ─────────────────────────────────────────────────────────
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ''
