
import {
  cityWebsiteServiceSchema,
  faqPageSchema,
  breadcrumbSchema,
  pricingOffersSchema,
  safeJsonLd,
} from '@/lib/seo'
import { tiersOf } from '@/content/pricing'
import { SITE } from '@/lib/constants'
import type { CityData } from '@/content/cities'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

import WebsiteApproach from './WebsiteApproach'
import WebsiteIncluded from './WebsiteIncluded'
import WebsiteProcess from './WebsiteProcess'
import WebsiteBusinessTypes from './WebsiteBusinessTypes'
import CityClients from './CityClients'
import ClientReviews from '@/components/sections/ClientReviews'
import WebsitePricing from './WebsitePricing'
import CityLocal from './CityLocal'
import CityAuthor from './CityAuthor'
import Breadcrumb from '@/components/layout/Breadcrumb'

interface CityWebsitePageProps {
  city: CityData
}

export default function CityWebsitePage({ city }: CityWebsitePageProps) {
  const url = `${SITE.url}/layanan/website/${city.slug}`

  const jsonLd = [
    cityWebsiteServiceSchema({
      city,
      url,
      // Halaman ini merender <WebsitePricing />, jadi boleh mengemit offers.
      offers: pricingOffersSchema({ tiers: tiersOf('website'), url }),
    }),
    faqPageSchema(city.faq),
    breadcrumbSchema([
      { name: 'Beranda', url: SITE.url },
      { name: 'Layanan', url: `${SITE.url}/layanan` },
      { name: 'Website Development', url: `${SITE.url}/layanan/website` },
      { name: `Jasa Website ${city.city}`, url },
    ]),
  ]

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
          { label: 'Website Development', href: '/layanan/website' },
          { label: city.city },
        ]}
      />

      <ServiceHero
        badge={city.hero.badge}
        headline={city.hero.headline}
        highlight={city.hero.highlight}
        subheadline={city.hero.subheadline}
        ctaWaKey="website"
        ctaLabel="Konsultasi Gratis via WhatsApp"
        socialProof={city.hero.socialProof}
      />

      <CityLocal local={city.local} />

      <CityAuthor author={city.author} />

      <CityClients city={city.city} />

      <WebsiteBusinessTypes />

      <WebsiteApproach />

      <WebsiteIncluded />

      {/*
        Harga tepat setelah "yang Anda dapat", lalu testimoni menyusul —
        social proof setelah angka mengurangi keraguan. WebsiteIncluded putih,
        WebsitePricing abu, ClientReviews putih: ritme tetap berselang.
      */}
      <WebsitePricing city={city.city} />

      <ClientReviews />

      <WebsiteProcess />

      <ServiceFAQ
        items={city.faq}
        title={`Pertanyaan yang Sering Ditanyakan oleh Klien di ${city.city}`}
      />

      <ServiceCTA
        headline={city.cta.headline}
        body={city.cta.body}
        ctaWaKey="website"
        ctaLabel="Mulai Konsultasi via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </div>
  )
}
