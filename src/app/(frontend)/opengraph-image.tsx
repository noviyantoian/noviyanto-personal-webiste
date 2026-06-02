import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Noviyanto — Jasa Website & Digital Marketing Profesional'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Digital Growth Partner',
    title: 'Noviyanto',
    subtitle: 'Jasa website & digital marketing untuk bisnis yang ingin tumbuh dan dapat lebih banyak leads.',
  })
}
