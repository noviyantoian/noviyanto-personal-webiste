import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Jasa Website — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Website Development',
    subtitle: 'Dirancang untuk mengubah pengunjung jadi prospek yang menghubungi Anda.',
  })
}
