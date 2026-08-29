import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Kontak — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Kontak',
    title: 'Konsultasi Gratis',
    subtitle: 'Ceritakan kebutuhan bisnis Anda. 30 menit pertama gratis, tanpa kewajiban.',
  })
}
