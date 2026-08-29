import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Blog — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Blog',
    title: 'Wawasan Digital',
    subtitle: 'Tips praktis soal website, SEO, Google Ads, dan otomasi dari pengalaman lapangan.',
  })
}
