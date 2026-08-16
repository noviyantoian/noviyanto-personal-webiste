import { SITE } from './constants'
import { tierPriceLabel, type PricingTier } from '@/content/pricing'

export interface LeadInput {
  name: string
  whatsapp?: string
  company?: string
  service?: string
  message?: string
}

export const SERVICE_OPTIONS = [
  { value: 'website', label: 'Pembuatan Website' },
  { value: 'google-ads', label: 'Google Ads' },
  { value: 'seo', label: 'SEO' },
  { value: 'digital-marketing', label: 'Digital Marketing' },
  { value: 'ai-integration', label: 'AI Integration' },
  { value: 'mobile-app', label: 'Aplikasi Mobile' },
  { value: 'maintenance', label: 'Maintenance' },
  { value: 'lainnya', label: 'Lainnya / belum yakin' },
] as const

export const TOUR_PACKAGE_OPTIONS = [
  { value: 'tour-starter', label: 'Paket Starter — Rp 3.500.000' },
  { value: 'tour-professional', label: 'Paket Professional — Rp 7.500.000' },
  { value: 'tour-enterprise', label: 'Paket Enterprise — Rp 15.000.000' },
  { value: 'lainnya', label: 'Belum yakin / diskusikan dulu' },
] as const

const ALL_SERVICE_LABELS: Record<string, string> = {
  ...Object.fromEntries(SERVICE_OPTIONS.map((o) => [o.value, o.label])),
  ...Object.fromEntries(TOUR_PACKAGE_OPTIONS.map((o) => [o.value, o.label])),
}

/**
 * Link wa.me dari kartu harga — membawa nama tier dan harganya sekaligus.
 *
 * Ditaruh di sini, bukan di constants.ts: `getWaLink` hanya menerima key
 * statis dari WA_MESSAGES sehingga tidak bisa membawa tier, dan constants.ts
 * adalah tabel copy statis yang tidak boleh mengimpor dari content/.
 */
export function packageWaLink(tier: PricingTier, city?: string): string {
  // Tier tanpa harga tidak membawa kurung — "paket Skala Custom (Diskusikan)"
  // terbaca janggal; yang diinginkan justru ajakan berdiskusi.
  const price = tier.price.kind === 'quote' ? '' : ` (${tierPriceLabel(tier.price)})`
  const msg =
    `Halo Noviyanto, saya tertarik dengan paket ${tier.name}${price} ` +
    `untuk pembuatan website${city ? ` di ${city}` : ''}. Boleh konsultasi?`
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(msg)}`
}

/** Bangun link wa.me ke Noviyanto, pesan pre-filled dari data lead. */
export function leadWaLink(lead: LeadInput): string {
  const svc = lead.service
    ? (ALL_SERVICE_LABELS[lead.service] ?? lead.service)
    : 'kebutuhan digital bisnis saya'
  const parts = [
    `Halo Noviyanto, saya ${lead.name}${lead.company ? ` dari ${lead.company}` : ''}.`,
    `Saya tertarik dengan ${svc}.`,
  ]
  if (lead.message?.trim()) parts.push(lead.message.trim())
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(parts.join(' '))}`
}
