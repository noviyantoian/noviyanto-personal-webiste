import type { Metadata } from 'next'

import { generateMetadata, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceTimeline from '@/components/sections/ServiceTimeline'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/seo'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Jasa SEO — Muncul di Halaman Pertama Google Tanpa Bayar Iklan',
  description:
    'Jasa SEO berbasis riset keyword nyata. Audit teknis, on-page, local SEO, dan konten yang membangun traffic organik sebagai aset jangka panjang.',
  path: PATH,
  keywords: ['jasa SEO', 'SEO Semarang', 'jasa optimasi Google', 'local SEO', 'audit SEO'],
})

const jsonLd = [
  serviceSchema({
    name: 'Jasa SEO Organik',
    description:
      'Audit, on-page, local SEO, dan strategi konten untuk membangun traffic organik berkelanjutan.',
    url: URL,
    serviceType: 'Search Engine Optimization',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'SEO Organik', url: URL },
  ]),
]

const workItems = [
  {
    title: 'SEO Teknis',
    body: 'Kecepatan loading, struktur URL, sitemap, schema markup, mobile-friendliness. Dasar-dasar yang harus benar sebelum hal lain dikerjakan.',
  },
  {
    title: 'On-page Optimization',
    body: 'Optimasi judul, meta deskripsi, heading, dan konten setiap halaman berdasarkan keyword target.',
  },
  {
    title: 'Konten',
    body: 'Blog, artikel, atau halaman layanan yang menjawab pertanyaan spesifik target customer. Konten berguna, bukan yang sekadar dipenuhi keyword.',
  },
  {
    title: 'Local SEO',
    body: 'Optimasi Google Business Profile, konsistensi NAP di seluruh platform, dan keyword berbasis lokasi untuk bisnis lokal.',
  },
  {
    title: 'Laporan Bulanan',
    body: 'Perkembangan ranking, pertumbuhan traffic organik, dan rekomendasi langkah berikutnya.',
  },
]

const industries = [
  {
    title: 'Bisnis perhiasan',
    body: 'Fokus brand awareness dan product discovery. Visual kuat dan konten storytelling yang membangun keinginan.',
  },
  {
    title: 'Jasa panggilan lokal',
    body: 'Local SEO + keyword berbasis area. Intent komersial tinggi, persaingan jauh lebih rendah dari keyword nasional.',
  },
  {
    title: 'Sewa kantor dan virtual office',
    body: 'Keyword spesifik lokasi + intent komersial. Pencarian volume rendah tapi konversi sangat tinggi.',
  },
  {
    title: 'B2B IT',
    body: 'Keyword teknis dan berbasis solusi. Pendekatan content-led yang membangun otoritas.',
  },
]

const timelineSteps = [
  {
    label: 'Bulan 1-2',
    title: 'Audit & Foundation',
    description: 'Perbaikan teknis, riset keyword, optimasi halaman yang sudah ada.',
  },
  {
    label: 'Bulan 3-4',
    title: 'Konten Terindeks',
    description: 'Konten baru mulai terindeks, ranking bergerak untuk keyword ekor panjang.',
  },
  {
    label: 'Bulan 5-6',
    title: 'Traffic Tumbuh',
    description: 'Traffic organik mulai tumbuh, beberapa keyword masuk halaman 1-2.',
  },
  {
    label: 'Bulan 6-12',
    title: 'Pertumbuhan Stabil',
    description: 'Pertumbuhan stabil, beberapa keyword utama mulai kompetitif.',
  },
]

const faqItems = [
  {
    question: 'Apakah SEO bisa dikombinasikan dengan Google Ads?',
    answer:
      'Sangat disarankan, terutama di awal. Google Ads bisa langsung menghasilkan traffic sementara SEO dibangun. Strategi paling efisien dari sisi waktu dan anggaran.',
  },
  {
    question: 'Apakah saya perlu blog untuk SEO?',
    answer:
      'Tidak harus di awal, tapi sangat membantu jangka panjang. Konten blog yang menjawab pertanyaan spesifik audience adalah cara paling efektif untuk naik ranking.',
  },
  {
    question: 'Apakah hasilnya bisa di-guarantee?',
    answer:
      'Tidak ada yang bisa jamin posisi 1 Google — kalau ada yang menjanjikan itu, hati-hati. Yang saya jamin: proses transparan, taktik sesuai panduan Google, dan laporan jujur.',
  },
  {
    question: 'Berapa lama minimal kontrak?',
    answer:
      'Minimum 3 bulan, karena di bawah itu terlalu pendek untuk melihat dampak. Rekomendasi: minimal 6 bulan untuk hasil yang lebih substansial.',
  },
]

export default function SeoPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([...jsonLd, faqPageSchema(faqItems)]) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
          { label: 'SEO Organik' },
        ]}
      />

      <ServiceHero
        badge="SEO Organik"
        headline="Muncul di Halaman Pertama Google Tanpa Terus Bayar Iklan"
        highlight="Tanpa Terus Bayar Iklan"
        subheadline="SEO yang dikerjakan dengan benar adalah investasi. Semakin lama, hasilnya semakin kuat. Sementara kompetitor masih bayar per klik, bisnis Anda sudah ditemukan secara gratis."
        ctaWaKey="seo"
        ctaLabel="Cek Kondisi SEO Website Saya"
        socialProof="SEO untuk perhiasan, jasa lokal, sewa kantor, dan B2B IT"
      />

      <ServiceProse
        eyebrow="Masalah"
        headline="Website Anda Ada, tapi Google Tidak Tahu"
        paragraphs={[
          'Punya website tapi tidak muncul di Google itu seperti buka toko di gang buntu. Secara teknis ada, tapi tidak ada yang lewat.',
          'SEO bukan sulap. Tidak ada cara untuk muncul di halaman 1 Google besok pagi. Tapi dengan strategi tepat dan konsisten, traffic organik bisa dibangun jadi aset jangka panjang yang terus menghasilkan meski Anda tidak sedang aktif promosi.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Yang Dikerjakan"
        headline="SEO yang Dimulai dari Riset, Bukan Asumsi"
        intro="Sebelum menulis satu kata pun, saya cari tahu: kata kunci apa yang target customer Anda gunakan? Mana yang volume cukup tinggi tapi persaingannya bisa ditembus?"
        items={workItems}
        columns={3}
        background="gray"
      />

      <ServiceProse
        eyebrow="Local SEO"
        headline="Pencarian Berbasis Lokasi Itu Nyata"
        paragraphs={[
          '"Jasa website Jakarta." "Home spa panggilan Bandung." "Sewa kantor virtual Semarang." Ini yang benar-benar diketik orang setiap hari.',
          'Untuk bisnis yang melayani area tertentu, muncul di pencarian berbasis lokasi adalah prioritas utama — dan persaingannya jauh lebih rendah dibanding keyword nasional.',
        ]}
      />

      <ServiceTimeline
        eyebrow="Timeline"
        headline="Kapan Hasilnya Mulai Terlihat?"
        intro="SEO butuh waktu. Ini yang perlu dipahami sejak awal. Hasilnya tidak instan, tapi tahan lama — Google Ads berhenti menghasilkan begitu anggaran habis, SEO tidak."
        steps={timelineSteps}
        background="gray"
      />

      <ServiceCardGrid
        eyebrow="Industri"
        headline="Pengalaman SEO di Berbagai Industri"
        intro="Setiap industri punya dinamika pencarian berbeda. Brand perhiasan butuh pendekatan berbeda dari jasa hukum. Tour & travel punya seasonality yang harus diperhitungkan."
        items={industries}
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Ingin Tahu Kondisi SEO Website Anda Sekarang?"
        body="Saya bisa lakukan audit singkat dan jelaskan apa yang perlu diperbaiki. Gratis, tanpa kewajiban lanjut."
        ctaWaKey="audit"
        ctaLabel="Minta Audit SEO Gratis"
        subText="Kirim URL website Anda via WhatsApp →"
      />
    </main>
  )
}
