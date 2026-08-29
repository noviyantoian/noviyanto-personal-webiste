import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Tentang — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Tentang',
    title: 'Noviyanto',
    subtitle: 'Digital growth partner berbasis di Semarang. 3+ tahun, 30+ proyek, 7 industri.',
  })
}
