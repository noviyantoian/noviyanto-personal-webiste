import Link from 'next/link'

import { cityWebsiteServiceSchema, faqPageSchema, breadcrumbSchema, safeJsonLd } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import type { CityData } from '@/content/cities'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

import WebsiteApproach from './WebsiteApproach'
import WebsiteIncluded from './WebsiteIncluded'
import WebsiteProcess from './WebsiteProcess'
import WebsiteBusinessTypes from './WebsiteBusinessTypes'
import WebsiteTestimonials from './WebsiteTestimonials'
import CityLocal from './CityLocal'
import CityAuthor from './CityAuthor'

interface CityWebsitePageProps {
  city: CityData
}

export default function CityWebsitePage({ city }: CityWebsitePageProps) {
  const url = `${SITE.url}/layanan/website/${city.slug}`

  const jsonLd = [
    cityWebsiteServiceSchema({ city, url }),
    faqPageSchema(city.faq),
    breadcrumbSchema([
      { name: 'Beranda', url: SITE.url },
      { name: 'Layanan', url: `${SITE.url}/layanan` },
      { name: 'Website Development', url: `${SITE.url}/layanan/website` },
      { name: `Jasa Website ${city.city}`, url },
    ]),
  ]

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <nav aria-label="Breadcrumb" className="container-wide pt-6 text-xs text-[#6B7280]">
        <ol className="flex items-center gap-2 flex-wrap">
          <li>
            <Link href="/" className="hover:text-[#111827] transition-colors">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9CA3AF]">
            /
          </li>
          <li>
            <Link href="/layanan" className="hover:text-[#111827] transition-colors">
              Layanan
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9CA3AF]">
            /
          </li>
          <li>
            <Link href="/layanan/website" className="hover:text-[#111827] transition-colors">
              Website Development
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9CA3AF]">
            /
          </li>
          <li className="text-[#111827] font-medium">{city.city}</li>
        </ol>
      </nav>

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

      <WebsiteBusinessTypes />

      <WebsiteApproach />

      <WebsiteIncluded />

      <WebsiteTestimonials />

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
    </main>
  )
}
