import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'

interface SiteSettingsData {
  defaultOgImage?: { url?: string | null } | null
  sameAs?: Array<{ url: string; id?: string }> | null
}

/**
 * Fetch Payload SiteSettings global via local API.
 * Dibungkus React `cache()` — generateMetadata + RootLayout dalam satu request
 * berbagi hasil yang sama (0 query tambahan).
 */
export const getSiteSettings = cache(async (): Promise<SiteSettingsData> => {
  try {
    const payload = await getPayload({ config })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const settings = await (payload as any).findGlobal({ slug: 'site-settings', depth: 1 })
    return settings as SiteSettingsData
  } catch {
    return {}
  }
})
