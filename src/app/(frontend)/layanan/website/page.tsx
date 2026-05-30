import type { Metadata } from 'next'
import Link from 'next/link'

import { generateMetadata, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

import WebsiteProblem from './_components/WebsiteProblem'
import WebsiteApproach from './_components/WebsiteApproach'
import WebsiteIncluded from './_components/WebsiteIncluded'
import WebsiteTech from './_components/WebsiteTech'
import WebsiteUseCases from './_components/WebsiteUseCases'
import WebsiteProcess from './_components/WebsiteProcess'

const PATH = '/layanan/website'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Jasa Pembuatan Website — Website yang Bekerja Keras untuk Bisnis Anda',
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
})

const faqItems = [
  {
    question: 'Berapa lama pengerjaan?',
    answer:
      'Rata-rata 3-4 minggu untuk website standar. Bisa lebih cepat kalau konten dan materi sudah disiapkan dari awal.',
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
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Website Development', url: URL },
  ]),
]

export default function WebsiteServicePage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([...jsonLd, faqPageSchema(faqItems)]) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="container-wide pt-6 text-xs text-[#6B7280]"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[#111827] transition-colors">
              Beranda
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9CA3AF]">/</li>
          <li>
            <Link href="/layanan" className="hover:text-[#111827] transition-colors">
              Layanan
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9CA3AF]">/</li>
          <li className="text-[#111827] font-medium">Website Development</li>
        </ol>
      </nav>

      <ServiceHero
        badge="Website Development"
        headline="Website yang Bekerja Keras untuk Bisnis Anda"
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

      <WebsiteProcess />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Siap Punya Website yang Benar-benar Berguna?"
        body="Hubungi saya sekarang untuk konsultasi gratis. Ceritakan bisnis Anda dan apa yang ingin Anda capai dari website baru Anda."
        ctaWaKey="website"
        ctaLabel="Mulai Konsultasi via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </main>
  )
}
