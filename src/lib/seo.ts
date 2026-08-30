import type { Metadata } from 'next'
import { SITE } from './constants'
import type { PricingTier, TierPrice } from '@/content/pricing'
import type { CityData } from '@/content/cities'

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
  /**
   * Metadata Open Graph khusus artikel. Kalau diisi, og:type jadi 'article'
   * dan tanggal terbit/ubah plus penulis ikut diemit — sinyal yang dibaca
   * Google Discover dan pratinjau sosial, dan tidak berlaku untuk halaman biasa.
   */
  article?: {
    publishedTime?: string
    modifiedTime?: string
    authors?: string[]
  }
}

export function generateMetadata({
  title,
  description,
  path,
  ogImage,
  keywords,
  noIndex = false,
  hasGeneratedOgImage = false,
  article,
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
      ...(article
        ? {
            type: 'article' as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: article.authors,
          }
        : { type: 'website' as const }),
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
/*
  Person = identitas orangnya saja. NAP (telepon, email, alamat, geo) dan
  areaServed SENGAJA tidak ada di sini — semuanya hanya hidup di
  ProfessionalService.

  Sebelumnya kedua node membawa NAP yang identik dan `url` yang sama-sama
  menunjuk beranda, sehingga Google harus menebak entitas mana yang diwakili
  halaman itu — dan tebakan semacam itu bisa berubah antar-crawl. Sekarang
  pembagiannya tegas: orangnya berlabuh di /tentang, bisnisnya di beranda, dan
  keduanya tetap terikat lewat pasangan worksFor/founder.
*/
export function personSchema(opts?: { sameAs?: string[] }) {
  const aboutUrl = `${SITE.url}/tentang`

  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${SITE.url}/#person`,
    name: 'Noviyanto',
    jobTitle: 'Digital Growth Partner',
    url: aboutUrl,
    mainEntityOfPage: aboutUrl,
    image: `${SITE.url}/images/noviyanto-profile.webp`,
    /*
      Fallback TIDAK boleh berisi folkastudio.com. `sameAs` adalah klaim "URL
      ini profil resmi lain dari entitas yang sama", sedangkan Folkastudio
      adalah brand terpisah yang kebetulan berbagi alamat operasional —
      menyamakan keduanya justru mengaburkan entitas mana yang harus muncul
      untuk kueri "Noviyanto". Kalau CMS kosong, jatuh ke Google Business
      Profile: satu-satunya profil yang kepemilikannya sudah terverifikasi.
    */
    sameAs: opts?.sameAs?.length ? opts.sameAs : [SITE.gbpUrl],
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

// ── Offer ────────────────────────────────────────────────────────
//
// Service TIDAK punya rich result harga di Google Search. Nilai markup ini
// untuk kejelasan entitas dan grounding jawaban AI — dan itu justru alasan
// kuat menolak angka karangan: tidak ada upside dari menebak.
//
// Aturan yang ditegakkan di sini:
//   - 'exact'   → Offer.price (klaim harga transaksi pasti)
//   - 'from'    → priceSpecification.minPrice. JANGAN pernah menaruh angka
//                 "mulai dari" di Offer.price — itu menegaskan harga pasti
//                 yang tidak ditawarkan.
//   - 'monthly' → minPrice + unitText, bukan harga sekali bayar
//   - 'quote'   → tidak diemit sama sekali
//
// priceValidUntil sengaja DIKOSONGKAN, bukan dihardcode: tanggal kedaluwarsa
// yang terlewat memicu peringatan "offer no longer valid" dan tidak akan ada
// yang ingat memperbaruinya.
//
// Pemanggil WAJIB hanya mengoper tier yang benar-benar dirender di halaman itu
// — lowPrice harus sama dengan angka terkecil yang terlihat pengunjung.
// Karena itu parameternya opt-in per halaman, bukan dibakar ke serviceSchema.
export function pricingOffersSchema(params: {
  tiers: readonly PricingTier[]
  url: string
}): Record<string, unknown> | null {
  // Type predicate, bukan predikat biasa: tanpa ini TypeScript tidak
  // mempersempit union sehingga varian 'quote' masih terbawa ke dalam map.
  const priced = params.tiers.filter(
    (t): t is PricingTier & { price: Exclude<TierPrice, { kind: 'quote' }> } =>
      t.price.kind !== 'quote',
  )
  if (priced.length === 0) return null

  const amounts = priced.map((t) => t.price.amount)
  const anchor = `${params.url}#harga`

  return {
    '@type': 'AggregateOffer',
    priceCurrency: 'IDR',
    lowPrice: Math.min(...amounts),
    highPrice: Math.max(...amounts),
    offerCount: priced.length,
    offers: priced.map((t) => {
      const base = { '@type': 'Offer', name: t.name, priceCurrency: 'IDR', url: anchor }
      if (t.price.kind === 'exact') {
        return { ...base, price: t.price.amount }
      }
      return {
        ...base,
        priceSpecification: {
          '@type': 'PriceSpecification',
          priceCurrency: 'IDR',
          minPrice: t.price.amount,
          ...(t.price.kind === 'monthly' && { unitText: 'per bulan' }),
        },
      }
    }),
  }
}

export function serviceSchema(params: {
  name: string
  description: string
  url: string
  serviceType: string
  /** Hanya diisi kalau halaman benar-benar menampilkan harga. */
  offers?: Record<string, unknown> | null
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
    ...(params.offers && { offers: params.offers }),
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
//
// TIDAK menerima aggregateRating / review — dan jangan ditambahkan kembali.
//
// Google menonaktifkan fitur bintang untuk LocalBusiness/Organization yang
// menandai ulasan tentang dirinya sendiri di situsnya sendiri ("self-serving"),
// dan melarang menandai ulasan pihak ketiga (termasuk Google Business Profile)
// sebagai konten situs. Markup semacam ini tidak pernah menghasilkan bintang,
// tapi membuka risiko manual action.
//
// Ulasan Google tetap DITAMPILKAN sebagai konten biasa lewat komponen
// WebsiteTestimonials — itu boleh, dan tetap berguna untuk konversi & E-E-A-T.
// Bintang bisnis ini muncul di local pack / Google Maps, bukan dari markup.
export function professionalServiceSchema(opts?: {
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
    /*
      Tautan ke listing Google Business Profile. Keduanya sengaja diemit:
      `sameAs` menyatakan "ini profil resmi entitas yang sama", `hasMap`
      menyatakan "ini halaman petanya". Pasangan ini yang mengikat situs ke
      listing Maps beserta ulasannya — sinyal entitas yang sebelumnya hanya ada
      sebagai tautan biasa di footer, tidak pernah masuk markup.
    */
    sameAs: [SITE.gbpUrl],
    hasMap: SITE.gbpUrl,
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
    /*
      NIB ditandai sebagai identifier, bukan taxID: taxID untuk NPWP, sedangkan
      NIB adalah nomor registrasi usaha. PropertyValue dipakai supaya nama
      skemanya eksplisit — parser yang tidak mengenal "NIB" tetap bisa membaca
      bahwa ini nomor registrasi resmi dan siapa penerbitnya.
    */
    legalName: SITE.name,
    identifier: {
      '@type': 'PropertyValue',
      propertyID: 'NIB',
      name: SITE.legal.nibLabel,
      value: SITE.legal.nib,
      description: `Diterbitkan oleh ${SITE.legal.issuer}`,
    },
    founder: { '@id': SCHEMA_ID.person },
  }

  return base
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
export function cityWebsiteServiceSchema(params: {
  city: CityData
  url: string
  /** Hanya diisi kalau halaman benar-benar menampilkan harga. */
  offers?: Record<string, unknown> | null
}) {
  const { city, url, offers } = params
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
        // AggregateOffer ditaruh di dalam itemOffered, BUKAN di level atas
        // makesOffer — dua asersi harga untuk entitas yang sama membingungkan
        // parser. Diisi hanya kalau halaman benar-benar merender harga.
        ...(offers && { offers }),
      },
    },
    // aggregateRating & review SENGAJA tidak disertakan — lihat catatan di
    // professionalServiceSchema. Ulasannya asli, tapi menandainya di sini
    // tetap tergolong self-serving dan tidak pernah eligible untuk bintang.
  }
}

// ── FAQPage ──────────────────────────────────────────────────────
export function faqPageSchema(items: ReadonlyArray<{ question: string; answer: string }>) {
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
