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
