import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Jasa Website Bandung — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Jasa Website',
    title: 'Website Bandung',
    subtitle: 'Website bisnis yang mendatangkan klien di Bandung.',
  })
}
