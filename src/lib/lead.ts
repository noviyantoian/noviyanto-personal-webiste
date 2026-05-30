import { SITE } from './constants'

export interface LeadInput {
  name: string
  whatsapp: string
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

const SERVICE_LABELS: Record<string, string> = Object.fromEntries(
  SERVICE_OPTIONS.map((o) => [o.value, o.label]),
)

/** Bangun link wa.me ke Noviyanto, pesan pre-filled dari data lead. */
export function leadWaLink(lead: LeadInput): string {
  const svc = lead.service
    ? (SERVICE_LABELS[lead.service] ?? lead.service)
    : 'kebutuhan digital bisnis saya'
  const parts = [`Halo Noviyanto, saya ${lead.name}.`, `Saya tertarik dengan ${svc}.`]
  if (lead.message?.trim()) parts.push(lead.message.trim())
  return `https://wa.me/${SITE.waNumber}?text=${encodeURIComponent(parts.join(' '))}`
}
