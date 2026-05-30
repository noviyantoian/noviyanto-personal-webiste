import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'
import { getPostsForSitemap } from '@/lib/blog'

export const revalidate = 3600 // sitemap di-cache 1 jam, bukan re-query tiap crawl

type SitemapId = 'pages' | 'services' | 'blog'

const SERVICE_SLUGS = [
  'website',
  'google-ads',
  'seo',
  'digital-marketing',
  'ai-integration',
  'mobile-app',
  'maintenance',
] as const

const SITEMAP_ORDER = ['pages', 'services', 'blog'] as const

export async function generateSitemaps(): Promise<{ id: SitemapId }[]> {
  return SITEMAP_ORDER.map((id) => ({ id }))
}

export default async function sitemap({
  id,
}: {
  id: Promise<SitemapId | number> | SitemapId | number
}): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url
  const now = new Date()
  // Next 16: `id` di-pass sebagai Promise. Normalisasi (await + numeric index).
  const resolved = await id
  const key: SitemapId =
    typeof resolved === 'number' ? SITEMAP_ORDER[resolved] ?? 'pages' : resolved

  if (key === 'blog') {
    try {
      const posts = await getPostsForSitemap()
      return posts.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : now,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      }))
    } catch {
      return [{ url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 }]
    }
  }

  if (key === 'services') {
    const serviceUrls = SERVICE_SLUGS.map((slug) => ({
      url: `${base}/layanan/${slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.85,
    }))

    const cityServiceUrls = ['semarang', 'jakarta', 'bandung'].map((kota) => ({
      url: `${base}/layanan/website/${kota}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    }))

    return [...serviceUrls, ...cityServiceUrls]
  }

  return [
    { url: base, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${base}/layanan`, lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${base}/portofolio`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/tentang`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/kontak`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/kebijakan-privasi`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${base}/syarat-ketentuan`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]
}
