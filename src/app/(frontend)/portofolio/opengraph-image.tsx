import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Portofolio — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Portofolio',
    title: 'Klien Aktif',
    subtitle: 'Website, iklan, dan infrastruktur yang berjalan tiap hari untuk bisnis nyata.',
  })
}
