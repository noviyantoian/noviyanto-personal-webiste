import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Maintenance Website — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Maintenance Website',
    subtitle: 'Website selalu online, aman, dan performa terjaga.',
  })
}
