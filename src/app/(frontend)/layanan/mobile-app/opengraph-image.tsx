import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Aplikasi Mobile — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Aplikasi Mobile',
    subtitle: 'Solusi custom untuk customer-facing atau tim lapangan Anda.',
  })
}
