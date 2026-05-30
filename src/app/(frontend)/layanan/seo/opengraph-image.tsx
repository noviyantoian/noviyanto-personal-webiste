import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Jasa SEO — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'SEO Organik',
    subtitle: 'Muncul di halaman pertama Google tanpa terus bayar iklan.',
  })
}
