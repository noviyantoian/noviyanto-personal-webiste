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

// Static lastmod dates — Google mengabaikan dynamic new Date() per request.
// Update manual saat halaman mengalami perubahan konten signifikan.
const LAST_MODIFIED = {
  home:       new Date('2026-06-02'),
  layanan:    new Date('2026-06-02'),
  services:   new Date('2026-06-02'),
  semarang:   new Date('2026-06-02'),
  portofolio: new Date('2026-05-30'),
  blog:       new Date('2026-06-01'),
  tentang:    new Date('2026-06-02'),
  kontak:     new Date('2026-05-30'),
  legal:      new Date('2026-05-01'),
} as const

export default async function sitemap({
  id,
}: {
  id: Promise<SitemapId | number> | SitemapId | number
}): Promise<MetadataRoute.Sitemap> {
  const base = SITE.url
  // Next 16: `id` di-pass sebagai Promise. Normalisasi (await + numeric index).
  const resolved = await id
  const key: SitemapId =
    typeof resolved === 'number' ? SITEMAP_ORDER[resolved] ?? 'pages' : resolved

  if (key === 'blog') {
    try {
      const posts = await getPostsForSitemap()
      return posts.map((post) => ({
        url: `${base}/blog/${post.slug}`,
        lastModified: post.updatedAt ? new Date(post.updatedAt) : LAST_MODIFIED.blog,
      }))
    } catch {
      return [{ url: `${base}/blog`, lastModified: LAST_MODIFIED.blog }]
    }
  }

  if (key === 'services') {
    const serviceUrls = SERVICE_SLUGS.map((slug) => ({
      url: `${base}/layanan/${slug}`,
      lastModified: LAST_MODIFIED.services,
    }))

    // Jakarta dan Bandung noindex — tidak di-submit ke sitemap
    return [
      ...serviceUrls,
      { url: `${base}/layanan/website/semarang`, lastModified: LAST_MODIFIED.semarang },
    ]
  }

  return [
    { url: base,                        lastModified: LAST_MODIFIED.home },
    { url: `${base}/layanan`,           lastModified: LAST_MODIFIED.layanan },
    { url: `${base}/portofolio`,        lastModified: LAST_MODIFIED.portofolio },
    { url: `${base}/blog`,              lastModified: LAST_MODIFIED.blog },
    { url: `${base}/tentang`,           lastModified: LAST_MODIFIED.tentang },
    { url: `${base}/kontak`,            lastModified: LAST_MODIFIED.kontak },
    { url: `${base}/kebijakan-privasi`, lastModified: LAST_MODIFIED.legal },
    { url: `${base}/syarat-ketentuan`,  lastModified: LAST_MODIFIED.legal },
  ]
}
