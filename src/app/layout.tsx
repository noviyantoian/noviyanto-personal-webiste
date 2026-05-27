import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
import { SITE, GA_ID } from '@/lib/constants'
import { personSchema } from '@/lib/seo'
import './globals.css'

// ── Fonts ────────────────────────────────────────────────────────
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-plus-jakarta',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
})

// ── Metadata ─────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline} | Web Development & Digital Marketing Semarang`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  keywords: [
    'jasa website Semarang',
    'digital marketing Semarang',
    'jasa Google Ads Semarang',
    'SEO Semarang',
    'Odoo developer Semarang',
    'web developer Semarang',
    'digital growth partner',
  ],
  authors: [{ name: 'Noviyanto', url: SITE.url }],
  creator: 'Noviyanto',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: SITE.url,
    siteName: SITE.name,
    title: `${SITE.name} — Web Development & Digital Marketing Semarang`,
    description: SITE.description,
    images: [{ url: SITE.ogImage, width: 1200, height: 630, alt: SITE.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — Web Development & Digital Marketing Semarang`,
    description: SITE.description,
    images: [SITE.ogImage],
  },
  robots: { index: true, follow: true },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_VERIFICATION,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0C0C0C',
}

// ── Root Layout ──────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="id"
      className={`${plusJakarta.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema()) }}
        />
        {GA_ID && (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${GA_ID}', { page_path: window.location.pathname });
                `,
              }}
            />
          </>
        )}
      </head>
      <body className="bg-[#0C0C0C] text-[#FAFAFA] antialiased">
        {/* Skip to main content — aksesibilitas */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                     focus:bg-[#F59E0B] focus:text-black focus:px-4 focus:py-2 focus:rounded-lg
                     focus:font-semibold focus:text-sm"
        >
          Langsung ke konten utama
        </a>

        <main id="main-content">
          {children}
        </main>
      </body>
    </html>
  )
}
