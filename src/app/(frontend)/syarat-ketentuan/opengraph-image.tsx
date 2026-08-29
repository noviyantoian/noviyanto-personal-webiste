import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Syarat & Ketentuan — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Legal',
    title: 'Syarat & Ketentuan',
    subtitle: 'Ketentuan penggunaan situs dan layanan Noviyanto.',
  })
}
