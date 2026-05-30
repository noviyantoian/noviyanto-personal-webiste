import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { SiteSetting, Media } from '@/payload-types'

/**
 * Fetch Payload SiteSettings global via local API.
 * Dibungkus React `cache()` — generateMetadata + RootLayout dalam satu request
 * berbagi hasil yang sama (0 query tambahan).
 */
export const getSiteSettings = cache(async (): Promise<SiteSetting> => {
  try {
    const payload = await getPayload({ config })
    return payload.findGlobal({ slug: 'site-settings', depth: 1 })
  } catch {
    return { id: 0 }
  }
})

/** Ekstrak URL OG image default dari global settings. */
export function getDefaultOgImageUrl(settings: SiteSetting): string | null {
  const img = settings.defaultOgImage
  if (!img || typeof img === 'number') return null
  return (img as Media).url ?? null
}

export interface OgImage {
  url: string
  width?: number
  height?: number
}

/**
 * OG image default dari CMS lengkap dengan dimensi asli media.
 * Dimensi dipakai biar tag og:image:width/height akurat (gambar bisa non-1200x630).
 */
export function getDefaultOgImage(settings: SiteSetting): OgImage | null {
  const img = settings.defaultOgImage
  if (!img || typeof img === 'number') return null
  const media = img as Media
  if (!media.url) return null
  return {
    url: media.url,
    width: media.width ?? undefined,
    height: media.height ?? undefined,
  }
}
