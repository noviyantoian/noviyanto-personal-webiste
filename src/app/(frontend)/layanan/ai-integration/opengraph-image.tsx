import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'AI Integration — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'AI Integration',
    subtitle: 'Otomasi tugas berulang agar tim fokus ke hal yang lebih penting.',
  })
}
