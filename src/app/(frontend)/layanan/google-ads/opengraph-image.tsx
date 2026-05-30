import { renderOgCard, ogSize, ogContentType } from '@/lib/og-card'

export const size = ogSize
export const contentType = ogContentType
export const alt = 'Jasa Google Ads — Noviyanto'

export default function Image() {
  return renderOgCard({
    eyebrow: 'Layanan',
    title: 'Google Ads',
    subtitle: 'Customer baru bisa masuk minggu pertama. Setiap rupiah terukur hasilnya.',
  })
}
