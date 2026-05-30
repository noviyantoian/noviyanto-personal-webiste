import { SITE } from '@/lib/constants'

export const dynamic = 'force-static'

export function GET() {
  const now = new Date().toISOString()
  const sitemaps = ['/sitemap/pages.xml', '/sitemap/services.xml', '/sitemap/blog.xml']

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemaps
  .map(
    (path) => `  <sitemap>
    <loc>${SITE.url}${path}</loc>
    <lastmod>${now}</lastmod>
  </sitemap>`,
  )
  .join('\n')}
</sitemapindex>
`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
