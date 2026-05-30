import type { Metadata } from 'next'
import { Home, Plane, Briefcase, Search } from 'lucide-react'

import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceChecklist from '@/components/sections/ServiceChecklist'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceTimeline from '@/components/sections/ServiceTimeline'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/google-ads'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Jasa Google Ads — Customer Baru Mulai Masuk Minggu Pertama',
    description:
      'Pengelolaan Google Ads berbasis data: riset keyword, setup, optimasi rutin, tracking konversi WhatsApp/form. Setiap rupiah terukur.',
    path: PATH,
    keywords: [
      'jasa Google Ads',
      'pengelolaan Google Ads',
      'Google Ads Semarang',
      'iklan Google bisnis',
    ],
    hasGeneratedOgImage: true,
  })
}

const jsonLd = [
  serviceSchema({
    name: 'Jasa Pengelolaan Google Ads',
    description:
      'Setup, optimasi, dan monitoring Google Ads untuk bisnis — riset keyword, landing page, tracking konversi.',
    url: URL,
    serviceType: 'Search Engine Advertising',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Google Ads', url: URL },
  ]),
]

const ICON = 'w-5 h-5'

const useCases = [
  {
    icon: <Home className={ICON} />,
    title: 'Home Service dan layanan lokal',
    body: 'Spa panggilan, jasa bersih, les privat. Orang yang search "home spa panggilan Jakarta" itu sudah hampir pasti mau booking. Anda tinggal ada di depan mereka.',
  },
  {
    icon: <Plane className={ICON} />,
    title: 'Tour & Travel',
    body: 'Iklan musiman atau paket spesifik yang perlu cepat menghasilkan inquiry sebelum moment berlalu.',
  },
  {
    icon: <Briefcase className={ICON} />,
    title: 'B2B dan jasa profesional',
    body: 'IT, konsultan, firma hukum. Volume pencarian rendah, nilai per lead tinggi. Strategi berbeda dari bisnis consumer.',
  },
  {
    icon: <Search className={ICON} />,
    title: 'Bisnis yang dicari di Google',
    body: 'Kalau target customer aktif search di Google, Google Ads adalah cara paling langsung untuk masuk ke radar mereka.',
  },
]

const onboardingSteps = [
  {
    label: 'Minggu 1',
    title: 'Konsultasi & Setup',
    description: 'Riset keyword, setup kampanye awal, penulisan iklan.',
  },
  {
    label: 'Minggu 2',
    title: 'Kampanye Tayang',
    description: 'Iklan live. Monitoring intensif di hari-hari pertama.',
  },
  {
    label: 'Minggu 3-4',
    title: 'Optimasi Pertama',
    description: 'Evaluasi data awal, buang keyword yang tidak performa, perkuat yang berhasil.',
  },
  {
    label: 'Bulan 2+',
    title: 'Siklus Optimasi',
    description: 'Optimasi bulanan berdasarkan performa. Laporan dalam bahasa yang mudah dipahami.',
  },
]

const faqItems = [
  {
    question: 'Berapa budget iklan minimum yang disarankan?',
    answer:
      'Bergantung pada industri dan area target. Untuk bisnis lokal, budget Rp 1-2 juta per bulan sudah bisa menghasilkan data yang cukup untuk dioptimalkan. Saya jelaskan estimasi realistisnya saat konsultasi.',
  },
  {
    question: 'Apakah hasilnya bisa langsung terlihat?',
    answer:
      'Klik pertama bisa mulai masuk dalam 1-2 hari setelah kampanye tayang. Untuk optimasi yang baik, biasanya butuh 2-4 minggu untuk mengumpulkan data yang cukup.',
  },
  {
    question: 'Biaya pengelolaan terpisah dari budget iklan?',
    answer:
      'Ya. Budget iklan langsung dibayar ke Google melalui akun Anda. Biaya pengelolaan adalah biaya terpisah untuk setup, monitoring, dan optimasi.',
  },
  {
    question: 'Apakah akun Google Ads di tangan saya atau Noviyanto?',
    answer:
      'Akun di tangan Anda. Saya bekerja sebagai manager di akun milik Anda. Kalau suatu saat Anda ingin kelola sendiri, semua data dan riwayat tetap Anda punya.',
  },
]

export default function GoogleAdsPage() {
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
          { label: 'Google Ads' },
        ]}
      />

      <ServiceHero
        badge="Google Ads"
        headline="Customer Baru Bisa Mulai Masuk Minggu Pertama"
        highlight="Minggu Pertama"
        subheadline="Google Ads yang dikelola dengan benar bukan soal bayar mahal. Soal pasang iklan di depan orang yang sedang aktif mencari bisnis seperti milik Anda, di saat yang tepat."
        ctaWaKey="googleAds"
        ctaLabel="Konsultasikan Kebutuhan Iklan Saya"
        socialProof="Dipercaya 30+ bisnis dari Jakarta, Bandung, Semarang, dan kota lainnya"
      />

      <ServiceProse
        eyebrow="Masalah"
        headline="Google Ads Tidak Selalu Berhasil — dan Ini Alasannya"
        paragraphs={[
          'Google Ads terlihat sederhana dari luar. Buat akun, masukkan kata kunci, isi budget, klik tayang. Tapi banyak pemilik bisnis yang sudah mencoba dan hasilnya mengecewakan. Budget habis, klik banyak, tapi tidak ada yang menghubungi.',
          'Yang sering terjadi: kata kunci terlalu luas, landing page tidak mendukung konversi, bid tidak dioptimalkan, dan tidak ada tracking yang benar. Itu yang saya perbaiki.',
        ]}
      />

      <ServiceChecklist
        eyebrow="Pendekatan"
        headline="Google Ads yang Dimulai dari Pertanyaan yang Benar"
        paragraphs={[
          'Sebelum setup kampanye, ada yang perlu dipahami: siapa customer paling potensial Anda? Mereka search apa di Google? Kata apa yang dipakai saat serius mau beli, bukan iseng cari informasi?',
          'Dari situ baru keyword dipilih, iklan ditulis, dan landing page dirancang sesuai intent pencarian mereka.',
        ]}
        bulletTitle="Yang masuk dalam pengelolaan:"
        bullets={[
          'Riset keyword berdasarkan industri dan lokasi bisnis Anda',
          'Setup kampanye dengan struktur yang rapi (lebih mudah dioptimalkan)',
          'Penulisan iklan yang relevan dan menarik klik dari audience yang tepat',
          'Landing page (kalau belum ada atau perlu diperbaiki)',
          'Setup konversi tracking — biar kita tahu persis mana yang menghasilkan',
          'Optimasi rutin: sesuaikan bid, buang keyword yang membuang anggaran',
          'Laporan bulanan dalam bahasa yang mudah dipahami',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Cocok Untuk"
        headline="Bisnis yang Paling Cepat Merasakan Hasilnya"
        items={useCases}
      />

      <ServiceProse
        eyebrow="Tracking & Transparansi"
        headline="Anda Tahu Persis Uang Anda ke Mana"
        background="gray"
        paragraphs={[
          'Satu hal yang sering diabaikan dalam pengelolaan Google Ads: apakah kita benar-benar tahu iklan mana yang menghasilkan customer dan mana yang tidak?',
          'Saya setup tracking dari awal sehingga setiap klik yang berujung ke WhatsApp, form, atau telepon bisa terdeteksi. Keputusan optimasi dibuat berdasarkan angka nyata, bukan asumsi.',
          'Laporan bulanan dikirim dalam format yang mudah dibaca, bukan spreadsheet penuh angka yang membingungkan.',
        ]}
      />

      <ServiceTimeline
        eyebrow="Proses Onboarding"
        headline="Bagaimana Cara Mulainya"
        steps={onboardingSteps}
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Berapa Leads yang Bisa Saya Harapkan?"
        body="Pertanyaan yang wajar. Saya tidak bisa menjanjikan angka pasti karena banyak variabel, tapi bisa berikan estimasi realistis berdasarkan kondisi bisnis dan anggaran Anda. Hubungi saya untuk diskusi 30 menit, gratis."
        ctaWaKey="googleAds"
        ctaLabel="Tanya via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </main>
  )
}
