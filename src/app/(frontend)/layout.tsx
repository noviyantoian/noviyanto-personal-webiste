import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { SITE } from '@/lib/constants'
import { personSchema, webSiteSchema, professionalServiceSchema, safeJsonLd } from '@/lib/seo'
import { GOOGLE_REVIEWS, REVIEWS_AGGREGATE } from '@/content/reviews'
import { getSiteSettings } from '@/lib/site-settings'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import FloatingWA from '@/components/layout/FloatingWA'
import { LeadModalProvider } from '@/components/lead/LeadModalProvider'
import './globals.css'

// ── Fonts ────────────────────────────────────────────────────────
// Download dari fontshare.com lalu letakkan di public/fonts/
// Clash Display: https://www.fontshare.com/fonts/clash-display
// Satoshi: https://www.fontshare.com/fonts/satoshi
// Only preload the weight used in LCP (H1 = Clash Semibold 600).
// Other weights load on-demand (preload: false) to avoid bandwidth contention.
const clashDisplay = localFont({
  src: [
    { path: '../../../public/fonts/ClashDisplay/ClashDisplay-Medium.woff2',   weight: '500', style: 'normal' },
    { path: '../../../public/fonts/ClashDisplay/ClashDisplay-Semibold.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-clash-display',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'Arial', 'sans-serif'],
})

// Satoshi body — only preload Regular (400), other weights lazy.
const satoshi = localFont({
  src: [
    { path: '../../../public/fonts/Satoshi/Satoshi-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../../../public/fonts/Satoshi/Satoshi-Medium.woff2',  weight: '500', style: 'normal' },
  ],
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
  adjustFontFallback: 'Arial',
  fallback: ['system-ui', '-apple-system', 'Arial', 'sans-serif'],
})

// ── Metadata (async — baca OG image default dari CMS) ────────────
export async function generateMetadata(): Promise<Metadata> {
  const settings = await getSiteSettings()
  const ogImage = settings.defaultOgImage?.url ?? SITE.ogImage

  return {
    metadataBase: new URL(SITE.url),
    title: {
      default: `${SITE.name} — ${SITE.tagline} | Web Development & Digital Marketing`,
      template: `%s | ${SITE.name}`,
    },
    description: SITE.description,
    keywords: ['jasa pembuatan website', 'digital marketing', 'google ads', 'SEO', 'web developer Semarang', 'Noviyanto'],
    authors: [{ name: 'Noviyanto', url: SITE.url }],
    creator: 'Noviyanto',
    openGraph: {
      type: 'website',
      locale: 'id_ID',
      url: SITE.url,
      siteName: SITE.name,
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      images: [{ url: ogImage, width: 1200, height: 630, alt: SITE.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${SITE.name} — ${SITE.tagline}`,
      description: SITE.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    alternates: { canonical: SITE.url },
  }
}

export const viewport: Viewport = {
  themeColor: '#F59E0B',
  width: 'device-width',
  initialScale: 1,
}

// ── Root Layout ───────────────────────────────────────────────────
export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings()
  const sameAs = settings.sameAs?.map((s) => s.url).filter(Boolean) ?? ['https://folkastudio.com']

  return (
    <html lang="id" suppressHydrationWarning className={`${clashDisplay.variable} ${satoshi.variable}`}>
      <head>
        {/* Preconnect to analytics origins */}
        <link rel="preconnect" href="https://analytics.folkastudio.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: safeJsonLd([
              webSiteSchema(),
              personSchema({ sameAs }),
              professionalServiceSchema({
                aggregateRating: {
                  ratingValue: REVIEWS_AGGREGATE.rating,
                  reviewCount: REVIEWS_AGGREGATE.count,
                },
                review: GOOGLE_REVIEWS.map((r) => ({
                  author: r.author,
                  date: r.date,
                  rating: r.rating,
                  text: r.text,
                })),
              }),
            ]),
          }}
        />

        {/* Folkastudio Analytics — async (does not block parser) */}
        <script
          async
          src="https://analytics.folkastudio.com/script.js"
          data-website-id="56b56e4b-ad14-4ccf-a1a5-432456025c0f"
        />
        <script
          async
          src="https://analytics.folkastudio.com/recorder.js"
          data-website-id="56b56e4b-ad14-4ccf-a1a5-432456025c0f"
          data-sample-rate="1"
          data-mask-level="moderate"
          data-max-duration="300000"
        />

        {/* Google Consent Mode v2 — default deny, cookieless pings until consent granted */}
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',functionality_storage:'granted',security_storage:'granted',wait_for_update:500});gtag('set','url_passthrough',true);gtag('set','ads_data_redaction',true);`,
          }}
        />

        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-K8V9TVT');`,
          }}
        />

      </head>
      <body>
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-K8V9TVT"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
            title="Google Tag Manager"
          />
        </noscript>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                     focus:bg-white focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-lg
                     focus:font-semibold focus:text-sm focus:shadow-md"
        >
          Langsung ke konten
        </a>
        <LeadModalProvider>
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
          <FloatingWA />
        </LeadModalProvider>
      </body>
    </html>
  )
}
