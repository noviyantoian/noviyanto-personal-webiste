import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/constants'

export const dynamic = 'force-dynamic'

const PRIVATE_PATHS = ['/api/', '/cms-noviyanto-ian/']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
      {
        userAgent: ['facebookexternalhit', 'Twitterbot', 'LinkedInBot', 'WhatsApp'],
        allow: '/',
        disallow: ['/cms-noviyanto-ian/'],
      },
      {
        userAgent: ['AhrefsBot', 'SemrushBot', 'MJ12bot', 'DotBot'],
        allow: '/',
        disallow: PRIVATE_PATHS,
        crawlDelay: 10,
      },
      {
        userAgent: '*',
        allow: '/',
        disallow: PRIVATE_PATHS,
      },
    ],
    sitemap: `${SITE.url}/sitemap-index.xml`,
  }
}
