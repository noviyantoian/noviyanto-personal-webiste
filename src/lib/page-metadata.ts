import type { Metadata } from 'next'
import { generateMetadata, type GenerateMetadataParams } from './seo'
import { getSiteSettings, getDefaultOgImage } from './site-settings'

/**
 * Versi async dari generateMetadata yang sadar CMS.
 *
 * Urutan prioritas OG image:
 *   1. params.ogImage  — gambar spesifik halaman (mis. cover artikel blog)
 *   2. CMS defaultOgImage (SiteSettings global) — di-set lewat Payload
 *   3. SITE.ogImage    — fallback statis (di-handle generateMetadata sync)
 *
 * Dipakai di setiap page lewat `export async function generateMetadata()`.
 * Server-only: import getPayload via site-settings — jangan import dari client component.
 */
export async function buildMetadata(params: GenerateMetadataParams): Promise<Metadata> {
  const base = generateMetadata(params)

  // Gambar spesifik halaman menang — tidak perlu query CMS.
  if (params.ogImage) return base

  const settings = await getSiteSettings()
  const cmsOg = getDefaultOgImage(settings)
  if (!cmsOg) return base

  return {
    ...base,
    openGraph: {
      ...base.openGraph,
      images: [{ url: cmsOg.url, width: cmsOg.width, height: cmsOg.height, alt: params.title }],
    },
    twitter: {
      ...base.twitter,
      images: [cmsOg.url],
    },
  }
}
