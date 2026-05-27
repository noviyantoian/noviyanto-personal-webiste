import type { Metadata } from 'next'
import { SITE } from './constants'

interface GenerateMetadataParams {
  title: string
  description: string
  path: string
  ogImage?: string
  keywords?: string[]
  noIndex?: boolean
}

export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
  noIndex = false,
}: GenerateMetadataParams): Metadata {
  const url = `${SITE.url}${path}`
  const image = ogImage ?? SITE.ogImage

  return {
    title: `${title} | ${SITE.name}`,
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
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
      images: [image],
    },
  }
}

// ── JSON-LD Schemas ──────────────────────────────────────────────
export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Noviyanto',
    jobTitle: 'Digital Growth Partner',
    url: SITE.url,
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Semarang',
      addressRegion: 'Jawa Tengah',
      addressCountry: 'ID',
    },
    areaServed: ['Semarang', 'Kendal', 'Salatiga'],
    knowsAbout: [
      'Web Development',
      'Digital Marketing',
      'SEO',
      'Google Ads',
      'Odoo ERP',
      'AI Integration',
    ],
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
    provider: {
      '@type': 'Person',
      name: 'Noviyanto',
      url: SITE.url,
    },
    areaServed: {
      '@type': 'City',
      name: 'Semarang',
    },
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
