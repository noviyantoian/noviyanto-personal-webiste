// Sumber kebenaran tunggal untuk seluruh harga yang tampil di situs.
//
// File ini diimpor oleh src/collections/Inquiries.ts yang berjalan di konteks
// Payload/Node — jadi HARUS bebas React dan `next/*`. Data + fungsi murni saja.
//
// Posisi harga (riset pasar Agustus 2026):
//   template instan  Rp 1,5–4jt · semi-custom Rp 5–15jt · agency korporat Rp 200jt+
//   kompetitor lokal Semarang: Lenteraweb 770rb–1,89jt · Gowebbagus 2,5/5,25/7,5jt
//                              WebNesia 2,5/5,5/12,5jt · Visionic tidak publikasi
// Tier entry sengaja di batas atas zona template: terjangkau bagi bisnis
// perintis, tapi tidak pernah menjadi yang termurah di pasar.

import { formatIdr, formatIdrCompact } from '@/lib/utils'

export type PricingFamily = 'website' | 'tour'

/**
 * Bentuk harga menentukan tampilan DAN bentuk Offer di JSON-LD.
 *
 * Union ini dipilih agar tier tanpa harga secara STRUKTURAL tidak bisa
 * membocorkan angka ke structured data — sebuah boolean flag masih
 * membolehkan angka placeholder ditulis untuk tier "hubungi kami".
 */
export type TierPrice =
  | { kind: 'exact'; amount: number } // → Offer.price
  | { kind: 'from'; amount: number } // → priceSpecification.minPrice
  | { kind: 'monthly'; amount: number } // retainer bulanan
  | { kind: 'quote' } // TIDAK pernah diemit ke schema

export interface PricingTier {
  /**
   * Nilai stabil. Untuk family 'tour' nilai ini TERSIMPAN di kolom
   * inquiries.service (enum Postgres) — jangan pernah diubah atau dihapus
   * setelah ada lead masuk.
   */
  slug: string
  family: PricingFamily
  /** Title case; tampilan uppercase diserahkan ke CSS. */
  name: string
  price: TierPrice
  tagline: string
  features: readonly string[]
  popular?: boolean
}

/** Harga untuk halaman layanan yang modelnya retainer/proyek tunggal. */
export interface ServicePricing {
  /** Cocok dengan slug di src/content/services.ts */
  slug: string
  price: TierPrice
  /** Syarat yang membentuk harga, mis. minimum kontrak. */
  note?: string
}

// ── Website ──────────────────────────────────────────────────────
//
// Hosting sengaja TIDAK dibundel. FAQ di /layanan/website menyatakan tier
// gratis Vercel/Netlify cukup untuk mayoritas website bisnis, sementara
// kompetitor membundel hosting lalu menagih perpanjangan Rp 1jt–3,3jt/tahun.
// Kepemilikan penuh klien adalah argumen nilai yang tidak bisa mereka tiru
// tanpa merusak model bisnisnya sendiri.

const WEBSITE_TIERS: readonly PricingTier[] = [
  {
    slug: 'web-landing',
    family: 'website',
    name: 'Landing Konversi',
    price: { kind: 'from', amount: 3_500_000 },
    tagline: 'Satu penawaran, satu tujuan',
    features: [
      'Satu halaman fokus konversi',
      'Copywriting berbasis riset audiens',
      'Form + tombol WhatsApp langsung',
      'SEO on-page dasar',
      'Domain & hosting atas nama Anda',
      'Revisi mayor 2×',
      'Garansi 30 hari',
    ],
  },
  {
    slug: 'web-bisnis',
    family: 'website',
    name: 'Website Bisnis',
    price: { kind: 'from', amount: 7_500_000 },
    tagline: 'Untuk mayoritas bisnis yang serius',
    popular: true,
    features: [
      'Struktur halaman sesuai kebutuhan bisnis',
      'Desain custom, bukan template',
      'SEO on-page lengkap + structured data',
      'Integrasi Google Analytics & Search Console',
      'CMS agar konten bisa Anda kelola sendiri',
      'Blog siap pakai',
      'Domain & hosting atas nama Anda',
      'Revisi mayor 3×',
      'Pendampingan 30 hari setelah live',
    ],
  },
  {
    slug: 'web-leads',
    family: 'website',
    name: 'Mesin Leads',
    price: { kind: 'from', amount: 15_000_000 },
    tagline: 'Website plus mesin pendatang trafik',
    features: [
      'Semua yang ada di Website Bisnis',
      'Riset keyword & arsitektur konten',
      'Setup Google Ads + halaman pendaratan',
      'Optimasi Google Business Profile',
      'Dashboard pelaporan leads',
      'Revisi tidak terbatas selama pengerjaan',
      'Pendampingan 90 hari setelah live',
    ],
  },
  {
    slug: 'web-custom',
    family: 'website',
    name: 'Skala Custom',
    price: { kind: 'quote' },
    tagline: 'Di luar tiga paket di atas',
    features: [
      'Aplikasi web dengan logika bisnis khusus',
      'Integrasi ERP, CRM, atau sistem internal',
      'Multi-bahasa atau multi-cabang',
      'Migrasi dari sistem lama',
      'Lingkup dan biaya disusun setelah diskusi',
    ],
  },
]

// ── Tour & Travel ────────────────────────────────────────────────
// Disalin verbatim dari landing yang sudah live. Slug TERSIMPAN di database —
// jangan diubah. Angka dan fitur sengaja tidak disentuh di fase ini.

const TOUR_TIERS: readonly PricingTier[] = [
  {
    slug: 'tour-starter',
    family: 'tour',
    name: 'Starter',
    price: { kind: 'exact', amount: 3_500_000 },
    tagline: 'Travel agent baru go digital',
    features: [
      '5 halaman',
      'Desain mobile-friendly',
      'Form kontak + WA button',
      'SEO on-page dasar',
      'Revisi mayor 1×',
      'Hosting + Domain 1 tahun gratis',
      'Garansi 30 hari',
    ],
  },
  {
    slug: 'tour-professional',
    family: 'tour',
    name: 'Professional',
    price: { kind: 'exact', amount: 7_500_000 },
    tagline: 'Dominasi pasar lokal',
    popular: true,
    features: [
      'Hingga 15 halaman',
      'Desain premium mobile-friendly',
      'Form kontak + WA button',
      'Sistem booking online',
      'Halaman paket tour unlimited',
      'SEO on-page lengkap',
      'Integrasi Google Maps',
      'Blog / konten marketing',
      'Galeri foto & video',
      'Revisi mayor 3×',
      'Hosting + Domain 1 tahun gratis',
      'Pelatihan CMS',
      'Garansi kepuasan penuh',
    ],
  },
  {
    slug: 'tour-enterprise',
    family: 'tour',
    name: 'Enterprise',
    price: { kind: 'exact', amount: 15_000_000 },
    tagline: 'Bisnis tour skala besar',
    features: [
      'Halaman unlimited',
      'Desain enterprise',
      'Sistem booking + payment gateway',
      'Dashboard admin paket tour',
      'SEO + Google Ads setup',
      'Multi bahasa (ID & EN)',
      'Galeri + media management',
      'Revisi tidak terbatas',
      'Hosting premium 1 tahun gratis',
      'Pelatihan CMS',
      'Support teknis 3 bulan',
      'Strategi marketing',
    ],
  },
]

export const PRICING_TIERS: readonly PricingTier[] = [...WEBSITE_TIERS, ...TOUR_TIERS]

// ── Layanan lain (retainer / proyek tunggal) ─────────────────────
//
// ai-integration sengaja 'quote': tidak ada pembanding pasar yang jelas untuk
// layanan ini, dan menebak angka lalu mengemitnya ke structured data adalah
// risiko tanpa imbalan. Ganti ke { kind: 'from', amount } begitu ada angka.

export const SERVICE_PRICING: readonly ServicePricing[] = [
  {
    slug: 'seo',
    price: { kind: 'monthly', amount: 2_500_000 },
    note: 'Minimum kontrak 6 bulan — hasil organik baru terlihat di bulan 6–12',
  },
  {
    slug: 'google-ads',
    price: { kind: 'monthly', amount: 3_000_000 },
    note: 'Biaya pengelolaan, di luar budget iklan yang dibayarkan langsung ke Google',
  },
  {
    slug: 'digital-marketing',
    price: { kind: 'monthly', amount: 5_000_000 },
    note: 'Gabungan kanal — lingkup disusun setelah audit awal',
  },
  {
    slug: 'maintenance',
    price: { kind: 'monthly', amount: 750_000 },
    note: 'Update, backup, monitoring, dan perbaikan minor',
  },
  {
    slug: 'mobile-app',
    price: { kind: 'from', amount: 25_000_000 },
    note: 'Cross-platform, satu basis kode untuk Android & iOS',
  },
  {
    slug: 'ai-integration',
    price: { kind: 'quote' },
    note: 'Biaya bergantung sistem yang diintegrasikan',
  },
]

// ── Selektor ─────────────────────────────────────────────────────

export function tiersOf(family: PricingFamily): readonly PricingTier[] {
  return PRICING_TIERS.filter((t) => t.family === family)
}

export function tierBySlug(slug: string): PricingTier | undefined {
  return PRICING_TIERS.find((t) => t.slug === slug)
}

export function servicePricing(slug: string): ServicePricing | undefined {
  return SERVICE_PRICING.find((s) => s.slug === slug)
}

// ── Formatter ────────────────────────────────────────────────────

/** Angka mentah, atau null untuk tier tanpa harga. */
export function tierAmount(price: TierPrice): number | null {
  return price.kind === 'quote' ? null : price.amount
}

/** Label kartu: `Rp 7.500.000` · `mulai Rp 3.500.000` · `Rp 2.500.000/bulan` · `Diskusikan` */
export function tierPriceLabel(price: TierPrice): string {
  switch (price.kind) {
    case 'exact':
      return formatIdr(price.amount)
    case 'from':
      return `mulai ${formatIdr(price.amount)}`
    case 'monthly':
      return `${formatIdr(price.amount)}/bulan`
    case 'quote':
      return 'Diskusikan'
  }
}

/** Opsi <select> untuk Inquiries.ts & lead.ts — value stabil, label diturunkan. */
export function tierSelectOptions(
  family: PricingFamily,
  prefix = '',
): Array<{ value: string; label: string }> {
  return tiersOf(family).map((t) => {
    const amount = tierAmount(t.price)
    return {
      value: t.slug,
      label: amount === null ? `${prefix}${t.name}` : `${prefix}${t.name} (${formatIdrCompact(amount)})`,
    }
  })
}

/**
 * Batas harga untuk AggregateOffer. Hanya menghitung tier yang harganya
 * benar-benar tampil — tier 'quote' diabaikan. Mengembalikan null kalau tidak
 * ada satu pun harga, sehingga pemanggil tidak mengemit offers sama sekali.
 */
export function priceBoundsOf(
  family: PricingFamily,
): { low: number; high: number; count: number } | null {
  const amounts = tiersOf(family)
    .map((t) => tierAmount(t.price))
    .filter((n): n is number => n !== null)

  if (amounts.length === 0) return null
  return { low: Math.min(...amounts), high: Math.max(...amounts), count: amounts.length }
}

export const PPN_NOTE = 'Semua harga belum termasuk PPN 11%.'
