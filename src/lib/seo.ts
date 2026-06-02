import type { Metadata } from 'next'
import { SITE } from './constants'
import type { CityData } from '@/content/cities'
import { GOOGLE_REVIEWS, REVIEWS_AGGREGATE } from '@/content/reviews'

/**
 * Serialisasi JSON-LD aman untuk inline `<script>`. `JSON.stringify` biasa
 * tidak escape `</script>` → konten CMS jahat (mis. title berisi `</script>`)
 * bisa break out. Escape `<`, `>`, `/`.
 */
export function safeJsonLd(data: unknown): string {
  return JSON.stringify(data)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/\//g, '\\u002f')
}

export interface GenerateMetadataParams {
  title: string
  description: string
  path: string
  ogImage?: string
  keywords?: string[]
  noIndex?: boolean
  /**
   * Set true kalau route punya opengraph-image.tsx (generated card).
   * generateMetadata tidak akan emit openGraph/twitter images supaya tidak
   * dobel dengan og:image dari konvensi file Next.
   */
  hasGeneratedOgImage?: boolean
}

export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
  noIndex = false,
  hasGeneratedOgImage = false,
}: GenerateMetadataParams): Metadata {
  const url = `${SITE.url}${path}`
  const image = ogImage ?? SITE.ogImage

  return {
    title,
    description,
    keywords,
    metadataBase: new URL(SITE.url),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url,
      siteName: SITE.name,
      locale: 'id_ID',
      type: 'website',
      ...(hasGeneratedOgImage
        ? {}
        : { images: [{ url: image, width: 1200, height: 630, alt: title }] }),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      ...(hasGeneratedOgImage ? {} : { images: [image] }),
    },
  }
}

// ── JSON-LD Schemas ──────────────────────────────────────────────
export function personSchema(opts?: { sameAs?: string[] }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: 'Noviyanto',
    jobTitle: 'Digital Growth Partner',
    url: SITE.url,
    image: `${SITE.url}/images/noviyanto-profile.webp`,
    sameAs: opts?.sameAs?.length ? opts.sameAs : ['https://folkastudio.com'],
    email: SITE.email,
    telephone: `+${SITE.waNumber}`,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.line,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: 'ID',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -7.0618,
      longitude: 110.3452,
    },
    areaServed: ['Semarang', 'Jakarta', 'Bandung', 'Indonesia'],
    knowsAbout: [
      'Web Development',
      'Digital Marketing',
      'SEO',
      'Google Ads',
      'AI Integration',
    ],
    worksFor: { '@id': `${SITE.url}/#business` },
  }
}

export function serviceSchema(params: {
  name: string
  description: string
  url: string
  serviceType: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: params.name,
    description: params.description,
    url: params.url,
    serviceType: params.serviceType,
    provider: { '@id': `${SITE.url}/#person` },
    areaServed: [
      { '@type': 'City', name: 'Semarang' },
      { '@type': 'City', name: 'Jakarta' },
      { '@type': 'City', name: 'Bandung' },
      { '@type': 'Country', name: 'Indonesia' },
    ],
  }
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  }
}

// ── BlogPosting (artikel blog) ───────────────────────────────────
export function blogPostingSchema(params: {
  title: string
  description: string
  url: string
  image?: string
  datePublished?: string
  dateModified?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: params.title,
    description: params.description,
    url: params.url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': params.url },
    inLanguage: 'id-ID',
    ...(params.image && { image: [params.image] }),
    datePublished: params.datePublished ?? new Date().toISOString(),
    dateModified: params.dateModified ?? params.datePublished ?? new Date().toISOString(),
    author: { '@id': `${SITE.url}/#person` },
    publisher: { '@id': `${SITE.url}/#business` },
  }
}

// ── Blog (CollectionPage untuk /blog) ────────────────────────────
export function blogListSchema(params: {
  url: string
  items: Array<{ name: string; url: string; description?: string; datePublished?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': `${params.url}/#blog`,
    name: `Blog ${SITE.name}`,
    description: 'Artikel seputar web development, digital marketing, SEO, dan pertumbuhan bisnis.',
    url: params.url,
    inLanguage: 'id-ID',
    publisher: { '@id': `${SITE.url}/#business` },
    blogPost: params.items.map((item) => ({
      '@type': 'BlogPosting',
      headline: item.name,
      url: item.url,
      author: { '@id': `${SITE.url}/#person` },
      ...(item.description && { description: item.description }),
      ...(item.datePublished && { datePublished: item.datePublished }),
    })),
  }
}

// ── WebPage (untuk halaman individual) ───────────────────────────
export function webPageSchema(params: {
  url: string
  name: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${params.url}#webpage`,
    name: params.name,
    description: params.description,
    url: params.url,
    isPartOf: { '@id': `${SITE.url}/#website` },
    about: { '@id': `${SITE.url}/#person` },
    inLanguage: 'id-ID',
  }
}

// ── ID Anchors (untuk cross-reference entitas sitewide) ──────────
export const SCHEMA_ID = {
  person: `${SITE.url}/#person`,
  business: `${SITE.url}/#business`,
  website: `${SITE.url}/#website`,
} as const

// ── WebSite (sitewide, di root layout) ───────────────────────────
export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': SCHEMA_ID.website,
    name: SITE.name,
    description: SITE.description,
    url: SITE.url,
    inLanguage: 'id-ID',
    publisher: { '@id': SCHEMA_ID.person },
  }
}

// ── ProfessionalService (entitas bisnis utama, sitewide) ─────────
export function professionalServiceSchema(opts?: {
  aggregateRating?: {
    ratingValue: number
    reviewCount: number
  }
  review?: Array<{
    author: string
    date: string
    rating: number
    text: string
  }>
  businessHours?: Array<{ dayOfWeek: string[]; opens: string; closes: string }>
  geo?: { latitude: number; longitude: number }
}) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': SCHEMA_ID.business,
    name: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    image: `${SITE.url}/images/noviyanto-profile.webp`,
    telephone: `+${SITE.waNumber}`,
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.line,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      postalCode: SITE.address.postalCode,
      addressCountry: 'ID',
    },
    ...(opts?.geo && {
      geo: {
        '@type': 'GeoCoordinates',
        latitude: opts.geo.latitude,
        longitude: opts.geo.longitude,
      },
    }),
    ...(opts?.businessHours?.length && {
      openingHoursSpecification: opts.businessHours.map((h) => ({
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: h.dayOfWeek,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    areaServed: [
      { '@type': 'City', name: 'Semarang' },
      { '@type': 'City', name: 'Jakarta' },
      { '@type': 'City', name: 'Bandung' },
      { '@type': 'Country', name: 'Indonesia' },
    ],
    founder: { '@id': SCHEMA_ID.person },
  }

  return {
    ...base,
    ...(opts?.aggregateRating && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: opts.aggregateRating.ratingValue.toFixed(1),
        reviewCount: opts.aggregateRating.reviewCount,
        bestRating: '5',
        worstRating: '1',
      },
    }),
    ...(opts?.review && {
      review: opts.review.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.author },
        datePublished: r.date,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: r.rating,
          bestRating: 5,
          worstRating: 1,
        },
        reviewBody: r.text,
      })),
    }),
  }
}

// ── AboutPage (untuk /tentang) ───────────────────────────────────
export function aboutPageSchema(params: {
  url: string
  name: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    name: params.name,
    description: params.description,
    url: params.url,
    mainEntity: { '@id': SCHEMA_ID.person },
    isPartOf: { '@id': SCHEMA_ID.website },
  }
}

// ── ContactPage (untuk /kontak) ──────────────────────────────────
export function contactPageSchema(params: {
  url: string
  name: string
  description: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: params.name,
    description: params.description,
    url: params.url,
    mainEntity: { '@id': SCHEMA_ID.business },
    isPartOf: { '@id': SCHEMA_ID.website },
  }
}

// ── CollectionPage + ItemList (untuk /layanan, /portofolio) ─────
export function collectionPageSchema(params: {
  url: string
  name: string
  description: string
  items: Array<{ name: string; url: string; description?: string }>
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: params.name,
    description: params.description,
    url: params.url,
    isPartOf: { '@id': SCHEMA_ID.website },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: params.items.length,
      itemListElement: params.items.map((item, idx) => ({
        '@type': 'ListItem',
        position: idx + 1,
        name: item.name,
        url: item.url,
        ...(item.description && { description: item.description }),
      })),
    },
  }
}

// ── City Website Service (untuk /layanan/website/[kota]) ─────────
export function cityWebsiteServiceSchema(params: { city: CityData; url: string }) {
  const { city, url } = params
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${url}#business`,
    name: `Noviyanto — Jasa Pembuatan Website Profesional di ${city.city}`,
    description: city.meta.description,
    url,
    image: `${SITE.url}/images/noviyanto-profile.webp`,
    telephone: `+${SITE.waNumber}`,
    email: SITE.email,
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.address.line,
      addressLocality: SITE.address.city,
      addressRegion: SITE.address.region,
      addressCountry: 'ID',
    },
    areaServed: [
      { '@type': 'City', name: city.city },
      ...city.local.nearby.map((name) => ({ '@type': 'City', name })),
    ],
    founder: { '@id': SCHEMA_ID.person },
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name: `Jasa Pembuatan Website Profesional di ${city.city}`,
        serviceType: 'Web Development',
        url,
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: REVIEWS_AGGREGATE.rating.toFixed(1),
      reviewCount: REVIEWS_AGGREGATE.count,
      bestRating: '5',
      worstRating: '1',
    },
    review: GOOGLE_REVIEWS.map((r) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: r.author },
      datePublished: r.date,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: r.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: r.text,
    })),
  }
}

// ── FAQPage ──────────────────────────────────────────────────────
export function faqPageSchema(items: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  }
}
