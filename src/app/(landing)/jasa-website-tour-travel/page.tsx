import type { Metadata } from 'next'
import { SITE } from '@/lib/constants'
import { serviceSchema, breadcrumbSchema, faqPageSchema, safeJsonLd } from '@/lib/seo'
import LandingNavbar from '@/components/layout/LandingNavbar'
import TourPageBody from './_components/TourPageBody'

const PATH = '/jasa-website-tour-travel'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = {
  title: 'Jasa Website Tour & Travel Profesional — Noviyanto',
  description:
    'Jasa pembuatan website tour & travel dengan sistem booking, SEO, dan integrasi WhatsApp. Harga transparan, garansi kepuasan. Konsultasi gratis!',
  alternates: { canonical: URL },
  keywords: [
    'jasa website tour travel',
    'website bisnis travel',
    'website agen wisata',
    'website booking tour',
    'jasa website tour travel Semarang',
  ],
  openGraph: {
    title: 'Jasa Website Tour & Travel Profesional — Noviyanto',
    description:
      'Website tour & travel dengan sistem booking, SEO, dan integrasi WhatsApp. Konsultasi gratis!',
    url: URL,
    siteName: SITE.name,
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Jasa Website Tour & Travel Profesional — Noviyanto',
    description: 'Website tour & travel dengan sistem booking, SEO, dan integrasi WhatsApp.',
  },
  robots: { index: true, follow: true },
}

const NAV_LINKS = [
  { label: 'Fitur', href: '#fitur' },
  { label: 'Portofolio', href: '#portofolio' },
  { label: 'Harga', href: '#harga' },
  { label: 'FAQ', href: '#faq' },
  { label: '← Layanan Lain', href: '/layanan' },
]

const jsonLd = [
  serviceSchema({
    name: 'Jasa Website Tour & Travel Profesional',
    description:
      'Pembuatan website bisnis tour & travel — sistem booking online, SEO, integrasi WhatsApp, desain premium.',
    url: URL,
    serviceType: 'Web Development',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Jasa Website Tour & Travel', url: URL },
  ]),
  faqPageSchema([
    { question: 'Berapa lama proses pembuatan website?', answer: 'Rata-rata 14–21 hari kerja.' },
    { question: 'Apakah website bisa muncul di halaman pertama Google?', answer: 'SEO on-page dioptimalkan dari awal.' },
    { question: 'Ada biaya rutin setelah website jadi?', answer: 'Hosting & domain gratis 1 tahun.' },
  ]),
]

export default function JasaWebsiteTourTravelPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <LandingNavbar links={NAV_LINKS} ctaLabel="Konsultasi Gratis →" ctaWaKey="tourTravel" />
      <TourPageBody />
    </>
  )
}
