import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Digital Marketing — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Digital Marketing',
    subtitle: 'Strategi digital terpadu — bukan kanal yang berjalan sendiri-sendiri.',
  })
}
