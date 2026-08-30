import type { Metadata } from 'next'

import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchema,
  pricingOffersSchema,
  webPageSchema,
  safeJsonLd,
} from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { tiersOf } from '@/content/pricing'
import { SITE } from '@/lib/constants'

import TourPageBody from './_components/TourPageBody'
import { FAQ_ITEMS } from './_components/faqItems'
import Breadcrumb from '@/components/layout/Breadcrumb'

const PATH = '/jasa-website-tour-travel'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    // Tanpa "— Noviyanto": template layout sudah menambahkan " | Noviyanto",
    // sehingga versi lama menampilkan brand dua kali dan hanya menyisakan
    // 22px dari ambang potong ~600px SERP desktop.
    title: 'Jasa Website Tour & Travel Profesional',
    description:
      'Jasa pembuatan website tour & travel dengan sistem booking, SEO, dan integrasi WhatsApp. Harga transparan, garansi kepuasan. Konsultasi gratis!',
    path: PATH,
    keywords: [
      'jasa website tour travel',
      'website bisnis travel',
      'website agen wisata',
      'website booking tour',
      'jasa website tour travel Semarang',
    ],
    hasGeneratedOgImage: true,
  })
}

const jsonLd = [
  webPageSchema({
    name: 'Jasa Website Tour & Travel Profesional',
    description:
      'Pembuatan website bisnis tour & travel — sistem booking online, SEO, integrasi WhatsApp, desain premium.',
    url: URL,
  }),
  serviceSchema({
    name: 'Jasa Website Tour & Travel Profesional',
    description:
      'Pembuatan website bisnis tour & travel — sistem booking online, SEO, integrasi WhatsApp, desain premium.',
    url: URL,
    serviceType: 'Web Development',
    // Halaman ini merender section harga, jadi boleh mengemit offers.
    offers: pricingOffersSchema({ tiers: tiersOf('tour'), url: URL }),
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Website Tour & Travel', url: URL },
  ]),
  // Sumber pertanyaan sama persis dengan yang dirender <TourFAQ />, supaya
  // structured data tidak pernah menjanjikan konten yang tidak terlihat.
  faqPageSchema(FAQ_ITEMS),
]

export default function JasaWebsiteTourTravelPage() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
          { label: 'Website Tour & Travel' },
        ]}
      />

      <TourPageBody />
    </div>
  )
}
