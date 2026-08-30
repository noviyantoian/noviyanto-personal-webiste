import type { Metadata } from 'next'

import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchema,
  pricingOffersSchema,
  safeJsonLd,
} from '@/lib/seo'
import { tiersOf } from '@/content/pricing'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'
import ClientReviews from '@/components/sections/ClientReviews'
import RelatedLinks from '@/components/sections/RelatedLinks'
import { RELATED_ARTICLES } from '@/content/related'

import WebsiteProblem from './_components/WebsiteProblem'
import WebsiteApproach from './_components/WebsiteApproach'
import WebsiteIncluded from './_components/WebsiteIncluded'
import WebsiteTech from './_components/WebsiteTech'
import WebsiteUseCases from './_components/WebsiteUseCases'
import WebsitePricing from './_components/WebsitePricing'
import WebsiteProcess from './_components/WebsiteProcess'
import Breadcrumb from '@/components/layout/Breadcrumb'

const PATH = '/layanan/website'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    // Dipendekkan: versi lama ~782px vs ambang potong ~600px SERP desktop.
    title: 'Jasa Pembuatan Website Profesional',
    description:
      'Jasa pembuatan website bisnis dan landing page yang dirancang untuk mengubah pengunjung jadi prospek. Next.js, mobile-first, SEO-ready.',
    path: PATH,
    keywords: [
      'jasa pembuatan website',
      'website bisnis',
      'website landing page',
      'jasa website Semarang',
      'web developer Indonesia',
    ],
    hasGeneratedOgImage: true,
  })
}

const faqItems = [
  {
    question: 'Berapa lama pengerjaan?',
    answer:
      'Rata-rata 3–4 minggu untuk website standar. Bisa lebih cepat kalau konten dan materi sudah disiapkan dari awal.',
  },
  {
    question: 'Apakah saya bisa update konten sendiri setelah jadi?',
    answer:
      'Tergantung kebutuhan. Kalau Anda ingin bisa update sendiri, ini bisa dikonfigurasikan dari awal.',
  },
  {
    question: 'Saya punya website lama. Bisa diperbaiki saja?',
    answer:
      'Bisa. Saya lihat dulu kondisinya, lalu kita tentukan apakah lebih efisien dioptimalkan atau dibangun ulang.',
  },
  {
    question: 'Apakah termasuk hosting?',
    answer:
      'Untuk hosting Vercel/Netlify tier gratis sudah cukup untuk mayoritas website bisnis. Kalau butuh server sendiri, saya bantu setup dan jelaskan biayanya.',
  },
]

const jsonLd = [
  serviceSchema({
    name: 'Jasa Pembuatan Website Profesional',
    description:
      'Pembuatan website bisnis dan landing page berbasis Next.js — mobile-first, SEO-ready, dirancang untuk menghasilkan leads.',
    url: URL,
    serviceType: 'Web Development',
    // Halaman ini merender <WebsitePricing />, jadi boleh mengemit offers.
    // Halaman yang tidak menampilkan harga TIDAK boleh mengoper ini.
    offers: pricingOffersSchema({ tiers: tiersOf('website'), url: URL }),
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Website Development', url: URL },
  ]),
]

export default function WebsiteServicePage() {
  return (
    <div className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd([...jsonLd, faqPageSchema(faqItems)]) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
          { label: 'Website Development' },
        ]}
      />

      <ServiceHero
        badge="Website Development"
        headline="Jasa Pembuatan Website yang Bekerja Keras untuk Bisnis Anda"
        highlight="Bekerja Keras"
        subheadline="Bukan soal tampilan semata. Website yang benar-benar berguna itu mengubah pengunjung jadi orang yang menghubungi Anda, bukan sekadar membaca lalu pergi."
        ctaWaKey="website"
        ctaLabel="Diskusikan Kebutuhan Website Saya"
        socialProof="Dipercaya 30+ bisnis dari Jakarta, Bandung, Semarang, dan kota lainnya"
      />

      <WebsiteProblem />

      <WebsiteApproach />

      <WebsiteIncluded />

      <WebsiteTech />

      <WebsiteUseCases />

      {/*
        Disisipkan di sini, bukan setelah WebsiteIncluded: latar section sudah
        berselang-seling (Included putih → Tech abu → UseCases putih), jadi blok
        abu setelah Included akan menempel ke Tech dan membuat dua garis border-y
        beradu. Posisi ini memecah rentetan putih UseCases → Process.
      */}
      <WebsitePricing />

      <WebsiteProcess />

      <ClientReviews />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <RelatedLinks
        eyebrow="Bacaan Terkait"
        headline="Pelajari Dulu Sebelum Memutuskan"
        items={RELATED_ARTICLES['/layanan/website']}
      />

      <ServiceCTA
        headline="Siap Punya Website yang Benar-benar Berguna?"
        body="Hubungi saya sekarang untuk konsultasi gratis. Ceritakan bisnis Anda dan apa yang ingin Anda capai dari website baru Anda."
        ctaWaKey="website"
        ctaLabel="Mulai Konsultasi via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </div>
  )
}
