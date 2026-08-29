import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Kebijakan Privasi — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Legal',
    title: 'Kebijakan Privasi',
    subtitle: 'Bagaimana data Anda dikumpulkan, dipakai, dan dilindungi.',
  })
}
