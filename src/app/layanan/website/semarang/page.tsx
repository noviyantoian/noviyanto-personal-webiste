import type { Metadata } from 'next'
import Link from 'next/link'

import { generateMetadata, breadcrumbSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

import WebsiteApproach from '../_components/WebsiteApproach'
import WebsiteIncluded from '../_components/WebsiteIncluded'
import WebsiteProcess from '../_components/WebsiteProcess'

import SemarangLocal from './_components/SemarangLocal'
import SemarangAuthor from './_components/SemarangAuthor'
import SemarangBusinessTypes from './_components/SemarangBusinessTypes'
import SemarangTestimonials, {
  TESTIMONIAL_REVIEWS,
  TESTIMONIAL_AGGREGATE,
} from './_components/SemarangTestimonials'

const PATH = '/layanan/website/semarang'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title:
    'Jasa Pembuatan Website Semarang — Website Bisnis yang Mendatangkan Klien',
  description:
    'Jasa pembuatan website profesional di Semarang oleh Noviyanto. Website cepat, SEO-ready, dan dirancang untuk mengubah pengunjung jadi calon klien. Konsultasi langsung tanpa perantara.',
  path: PATH,
  keywords: [
    'jasa pembuatan website Semarang',
    'jasa website Semarang',
    'web developer Semarang',
    'jasa bikin website Semarang',
    'pembuatan website profesional Semarang',
    'jasa landing page Semarang',
  ],
})

const faqItems = [
  {
    question:
      'Saya di Semarang. Apakah bisa bertemu langsung untuk diskusi proyek?',
    answer:
      'Bisa. Untuk diskusi awal, saya biasa mengatur pertemuan singkat di area Simpang Lima, Pleburan, atau Tembalang. Bertemu langsung sering membantu menyamakan visi sebelum proyek dimulai. Setelah itu, pengerjaan dilanjutkan secara remote agar lebih efisien.',
  },
  {
    question: 'Berapa lama proses pembuatan website?',
    answer:
      'Rata-rata 3–4 minggu untuk website bisnis standar di Semarang, termasuk konsultasi, desain, development, dan revisi. Jika konten dan materi sudah siap dari awal, prosesnya bisa lebih cepat. Untuk proyek yang lebih kompleks (multi-bahasa, integrasi sistem, e-commerce), waktu akan disesuaikan dan disampaikan transparan di awal.',
  },
  {
    question:
      'Apakah website saya nantinya akan muncul di pencarian Google Semarang?',
    answer:
      'Setiap halaman saya bangun dengan struktur SEO yang benar — heading hierarchy, metadata, schema markup, internal linking, dan optimasi kecepatan. Untuk muncul di pencarian lokal Semarang, saya bantu setup Google Business Profile dan optimasi local SEO sebagai bagian dari paket. Posisi di hasil pencarian tetap memerlukan waktu dan kontribusi konten yang konsisten.',
  },
  {
    question: 'Apakah Anda mengerjakan sendiri atau punya tim?',
    answer:
      'Saya bekerja sebagai individu profesional. Sebagian besar pekerjaan — strategi, copywriting, desain, development, dan setup SEO — saya kerjakan sendiri. Untuk kebutuhan khusus seperti motion design atau fotografi produk, saya bekerja dengan kolaborator terpercaya yang transparan saya sampaikan di awal.',
  },
  {
    question: 'Saya sudah punya website lama. Bisa diperbaiki saja?',
    answer:
      'Bisa. Saya akan mengaudit kondisi website Anda terlebih dahulu — performa, struktur kode, SEO, dan UX. Dari audit itu kita tentukan bersama: dioptimasi (lebih hemat) atau dibangun ulang (lebih clean untuk jangka panjang). Tidak ada keharusan langsung memilih opsi yang lebih besar.',
  },
  {
    question: 'Bagaimana proses pembayaran dan kontraknya?',
    answer:
      'Selalu ada kontrak kerja tertulis sebelum proyek mulai — berisi lingkup, timeline, deliverables, jumlah revisi, dan biaya. Pembayaran biasanya dibagi menjadi 2–3 tahap (DP, midpoint, dan pelunasan saat go-live). Tidak ada biaya tersembunyi.',
  },
  {
    question: 'Apakah hosting dan domain ikut diurus?',
    answer:
      'Saya bantu setup hosting dan domain. Untuk mayoritas website bisnis di Semarang, hosting modern seperti Vercel sudah cukup dan cepat. Akun hosting dan domain selalu atas nama Anda — bukan atas nama saya — supaya kepemilikan tetap di tangan Anda.',
  },
  {
    question: 'Setelah website jadi, apakah ada layanan maintenance?',
    answer:
      'Ada paket maintenance opsional untuk update konten, monitoring performa, backup, dan keamanan. Tidak wajib diambil — jika Anda ingin maintain sendiri, saya akan memberikan dokumentasi yang jelas saat handover.',
  },
] as const

const businessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${URL}#business`,
  name: 'Noviyanto — Jasa Pembuatan Website Profesional di Semarang',
  description:
    'Jasa pembuatan website bisnis di Kota Semarang oleh Noviyanto. Website cepat, SEO-ready, mobile-first, dirancang untuk konversi.',
  url: URL,
  image: `${SITE.url}/images/noviyanto-profile.webp`,
  telephone: `+${SITE.waNumber}`,
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.address.line,
    addressLocality: SITE.address.city,
    addressRegion: SITE.address.region,
    addressCountry: 'ID',
  },
  areaServed: [
    { '@type': 'City', name: 'Semarang' },
    { '@type': 'City', name: 'Ungaran' },
    { '@type': 'City', name: 'Kendal' },
    { '@type': 'City', name: 'Demak' },
    { '@type': 'City', name: 'Salatiga' },
  ],
  founder: {
    '@type': 'Person',
    name: 'Noviyanto',
    jobTitle: 'Web Developer & Digital Growth Partner',
    image: `${SITE.url}/images/noviyanto-profile.webp`,
  },
  makesOffer: {
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: 'Jasa Pembuatan Website Profesional di Semarang',
      serviceType: 'Web Development',
      url: URL,
    },
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: TESTIMONIAL_AGGREGATE.rating.toFixed(1),
    reviewCount: TESTIMONIAL_AGGREGATE.count,
    bestRating: '5',
    worstRating: '1',
  },
  review: TESTIMONIAL_REVIEWS.map((r) => ({
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
    itemReviewed: { '@id': `${URL}#business` },
  })),
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqItems.map((item) => ({
    '@type': 'Question',
    name: item.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.answer,
    },
  })),
}

const jsonLd = [
  businessSchema,
  faqSchema,
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Website Development', url: `${SITE.url}/layanan/website` },
    { name: 'Jasa Website Semarang', url: URL },
  ]),
]

export default function SemarangWebsitePage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        aria-label="Breadcrumb"
        className="container-wide pt-6 text-xs text-[#6B7280]"
      >
        <ol className="flex items-center gap-2 flex-wrap">
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
          <li>
            <Link
              href="/layanan/website"
              className="hover:text-[#111827] transition-colors"
            >
              Website Development
            </Link>
          </li>
          <li aria-hidden="true" className="text-[#9CA3AF]">/</li>
          <li className="text-[#111827] font-medium">Semarang</li>
        </ol>
      </nav>

      <ServiceHero
        badge="Jasa Pembuatan Website · Kota Semarang"
        headline="Jasa Pembuatan Website Profesional di Semarang"
        highlight="Website Profesional"
        subheadline="Website bisnis yang bukan sekadar tampil bagus, tapi benar-benar mendatangkan calon klien. Dikerjakan langsung oleh Noviyanto — web developer & digital growth partner yang berbasis di Kota Semarang."
        ctaWaKey="website"
        ctaLabel="Konsultasi Gratis via WhatsApp"
        socialProof="Dipercaya oleh bisnis di Semarang, Jakarta, Bandung, dan kota lainnya"
      />

      <SemarangLocal />

      <SemarangAuthor />

      <SemarangBusinessTypes />

      <WebsiteApproach />

      <WebsiteIncluded />

      <SemarangTestimonials />

      <WebsiteProcess />

      <ServiceFAQ
        items={[...faqItems]}
        title="Pertanyaan yang Sering Ditanyakan oleh Klien di Semarang"
      />

      <ServiceCTA
        headline="Siap Punya Website yang Membantu Bisnis Anda Tumbuh di Semarang?"
        body="Ceritakan bisnis Anda, target pasar Anda, dan apa yang ingin Anda capai dari website baru. Saya akan jawab langsung, tanpa template balasan dan tanpa sales call yang membuang waktu."
        ctaWaKey="website"
        ctaLabel="Mulai Konsultasi via WhatsApp"
        subText="Atau jadwalkan meeting 30 menit →"
      />
    </main>
  )
}
