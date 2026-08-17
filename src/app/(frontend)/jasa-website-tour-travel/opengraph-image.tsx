import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

// Tanpa ini Next menandai route ini dynamic (ƒ) — kartu OG-nya lalu dirender
// ulang tiap request, sementara route og lain di situs ini prerender statis.
export const dynamic = 'force-static'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Jasa Website Tour & Travel — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Website Tour & Travel',
    subtitle: 'Sistem booking online, SEO lokal, dan integrasi WhatsApp dalam satu website.',
  })
}
