import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Layanan Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Solusi Digital Lengkap',
    subtitle: 'Web, Google Ads, SEO, marketing, & AI — satu partner untuk pertumbuhan bisnis Anda.',
  })
}
