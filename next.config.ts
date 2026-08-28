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
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://analytics.folkastudio.com https://www.google-analytics.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: blob: https:",
              "font-src 'self' data:",
              // pagead2 + doubleclick: endpoint conversion tracking Google Ads (AW-...).
              // Tanpa keduanya, tag GTM gagal kirim event dan konversi tidak tercatat.
              "connect-src 'self' https://www.google-analytics.com https://analytics.folkastudio.com https://www.googletagmanager.com https://pagead2.googlesyndication.com https://googleads.g.doubleclick.net",
              // google.com/maps diizinkan khusus untuk embed peta lokasi GBP
              // di halaman kontak. Dipersempit ke host itu saja, bukan https:.
              "frame-src 'self' https://www.google.com https://maps.google.com",
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
        // Cache static assets aggressively (by extension)
        source: '/(.*)\\.(jpg|jpeg|png|gif|webp|avif|svg|ico|woff|woff2)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/images/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
        ],
      },
      {
        source: '/fonts/(.*)',
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

      // ---------------------------------------------------------------------
      // Warisan WordPress → Next.js (migrasi Mei 2026)
      //
      // Domain ini berjalan di WordPress sejak 2018. Saat migrasi, URL lama
      // tidak dipetakan sehingga seluruh otoritas & histori peringkatnya putus
      // di 404. Audit 2026-08-15 memverifikasi 12 URL berikut masih terindeks
      // Google namun mengembalikan 404 tanpa satu pun 301.
      //
      // Catatan: URL lama berakhiran garis miring (mis. /about/) melewati
      // normalisasi 308 Next.js lebih dulu, lalu kena 301 di sini. Rantai dua
      // hop ini normal dan tetap meneruskan sinyal ke tujuan.
      // ---------------------------------------------------------------------

      // Terverifikasi 404 — prioritas utama, URL exact-match keyword komersial
      { source: '/jasa-pembuatan-website-semarang', destination: '/layanan/website/semarang', permanent: true },

      // Terverifikasi 404 — halaman layanan & profil
      { source: '/web-development', destination: '/layanan/website', permanent: true },
      { source: '/beranda', destination: '/', permanent: true },
      { source: '/homepage-2', destination: '/', permanent: true },
      { source: '/about', destination: '/tentang', permanent: true },
      { source: '/privacy-policy', destination: '/kebijakan-privasi', permanent: true },
      { source: '/my-links', destination: '/kontak', permanent: true },

      // Artikel lama yang diproduksi ulang — arahkan ke versi barunya, bukan ke
      // /blog, supaya otoritas URL lama mendarat di konten yang setara.
      {
        source: '/pentingnya-keamanan-website',
        destination: '/blog/keamanan-website-bisnis-di-era-ai',
        permanent: true,
      },
      {
        source: '/belajar-seo-onpage-untuk-pemula-seperti-saya',
        destination: '/blog/seo-on-page-2026-aeo-geo-aio',
        permanent: true,
      },

      // Terverifikasi 404 — artikel blog lama (konten tidak dimigrasi)
      { source: '/why-dark-mode-websites-are-so-popular', destination: '/blog', permanent: true },
      { source: '/the-ultimate-guide-to-user-on-boarding', destination: '/blog', permanent: true },
      { source: '/how-to-improve-your-b2c-web-design', destination: '/blog', permanent: true },

      // Terverifikasi 404 — custom post type "testimonial" milik tema WordPress.
      // Pola :slug menangkap testimonial-1 s/d -N sekaligus.
      { source: '/testimonial/:slug', destination: '/portofolio', permanent: true },

      // Terverifikasi 404 — sisa struktur multibahasa WPML/Polylang.
      // Entri spesifik didahulukan; sisanya ditangkap pola /en/:path*.
      { source: '/en/category/web-development-en', destination: '/layanan/website', permanent: true },
      { source: '/en/:path*', destination: '/', permanent: true },

      // Preventif — taksonomi & arsip bawaan WordPress. Belum diverifikasi satu
      // per satu, tapi tidak ada route aktif memakai prefix ini, jadi aman:
      // mencegah sisa URL terindeks jatuh ke 404 alih-alih halaman relevan.
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/tag/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*', destination: '/tentang', permanent: true },
    ]
  },
}

export default withPayload(nextConfig)
