import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

type SitemapId = 'pages' | 'services'

const SERVICE_SLUGS = [
  'website',
  'google-ads',
  'seo',
  'digital-marketing',
  'odoo',
  'ai-integration',
  'mobile-app',
  'maintenance',
] as const

export async function generateSitemaps(): Promise<{ id: SitemapId }[]> {
  return [{ id: 'pages' }, { id: 'services' }]
}

export default function sitemap({ id }: { id: SitemapId }): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  if (id === 'services') {
    const serviceUrls = SERVICE_SLUGS.map((slug) => ({
      url: `${base}/layanan/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))

    const cityServiceUrls = [
      {
        url: `${base}/layanan/website/semarang`,
        lastModified: now,
        changeFrequency: 'monthly' as const,
        priority: 0.9,
      },
    ]

    return [...serviceUrls, ...cityServiceUrls]
  }

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/layanan`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/portofolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
  ]
}
