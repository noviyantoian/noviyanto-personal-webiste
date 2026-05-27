import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url
  const now = new Date()

  const services = [
    'website',
    'google-ads',
    'seo',
    'digital-marketing',
    'odoo',
    'ai-integration',
    'mobile-app',
    'maintenance',
  ]

  return [
    { url: base,                    lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${base}/layanan`,       lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/portofolio`,    lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${base}/tentang`,       lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/kontak`,        lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`,          lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    ...services.map((slug) => ({
      url: `${base}/layanan/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    })),
  ]
}
