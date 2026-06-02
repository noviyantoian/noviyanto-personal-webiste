import type { NextConfig } from 'next'
import path from 'node:path'
import { withPayload } from '@payloadcms/next/withPayload'

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
    remotePatterns: [],
  },

  // Compression
  compress: true,

  // Remove X-Powered-By header
  poweredByHeader: false,

  // Security & cache headers
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options',      value: 'nosniff' },
          { key: 'X-Frame-Options',              value: 'SAMEORIGIN' },
          { key: 'Referrer-Policy',              value: 'strict-origin-when-cross-origin' },
          { key: 'Permissions-Policy',           value: 'camera=(), microphone=(), geolocation=()' },
          { key: 'Strict-Transport-Security',    value: 'max-age=31536000; includeSubDomains; preload' },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              // unsafe-inline/eval diperlukan GTM + Payload admin (dynamic import)
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://analytics.folkastudio.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://www.google-analytics.com https://analytics.folkastudio.com https://www.googletagmanager.com",
              "frame-src 'self'",
              "frame-ancestors 'self'",
              "worker-src 'self' blob:",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join('; '),
          },
        ],
      },
      {
        // Cache static assets aggressively
        source: '/(.*)\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
    ]
  },

  async redirects() {
    return [
      // H9: /sitemap.xml conventional path → actual sitemap index
      { source: '/sitemap.xml', destination: '/sitemap-index.xml', permanent: true },
    ]
  },
}

export default withPayload(nextConfig)
