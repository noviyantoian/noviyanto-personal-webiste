import type { Metadata } from 'next'

import { generateMetadata, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/digital-marketing'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Jasa Digital Marketing — Strategi yang Menyatukan Semua Kanal',
  description:
    'Digital marketing terpadu: strategi, content, paid ads, email marketing, dan analitik. Website, iklan, SEO, dan media sosial yang bekerja bersama.',
  path: PATH,
  keywords: [
    'jasa digital marketing',
    'agensi digital marketing',
    'strategi digital marketing',
    'paid ads',
    'content strategy',
  ],
})

const jsonLd = [
  serviceSchema({
    name: 'Jasa Digital Marketing Terpadu',
    description:
      'Strategi digital marketing full-funnel: paid, content, email, dan analitik yang menyatukan semua kanal.',
    url: URL,
    serviceType: 'Digital Marketing',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Digital Marketing', url: URL },
  ]),
]

const scope = [
  {
    title: 'Strategi dan Perencanaan',
    body: 'Identifikasi target audience, analisis kompetitor, menentukan mix kanal yang tepat, dan menetapkan KPI realistis.',
  },
  {
    title: 'Content Strategy',
    body: 'Rencana konten konsisten dan relevan di platform terpilih. Bukan posting rutin tanpa arah, tapi konten yang punya tujuan di setiap tahap buyer journey.',
  },
  {
    title: 'Paid Advertising',
    body: 'Google Ads, Meta Ads (Facebook/Instagram), atau platform lain. Setup, monitoring, dan optimasi berbasis data.',
  },
  {
    title: 'Email Marketing',
    body: 'Untuk bisnis yang sudah punya database customer atau lead — salah satu kanal dengan ROI tertinggi tapi paling sering diabaikan.',
  },
  {
    title: 'Analitik dan Laporan',
    body: 'Semua dikaitkan ke angka. Traffic, leads, konversi, dan cost per acquisition dilaporkan berkala dalam format mudah dipahami.',
  },
]

const industries = [
  {
    title: 'Home Service',
    body: 'Fokus local awareness dan konversi cepat. Yang butuh layanan panggilan biasanya butuh sekarang, bukan minggu depan. Kecepatan respons dan kemudahan booking jadi kunci.',
  },
  {
    title: 'Tour & Travel',
    body: 'Ada seasonality yang harus diperhitungkan. Konten inspirasi di awal, lanjut promosi spesifik mendekati momen ramai. Kombinasi organik dan paid yang berubah sesuai musim.',
  },
  {
    title: 'Perhiasan',
    body: 'Brand storytelling lebih dominan. Visual kuat, konten behind-the-scenes, dan pendekatan yang membangun hubungan jangka panjang dengan calon pembeli.',
  },
  {
    title: 'B2B IT dan Profesional',
    body: 'Siklus penjualan lebih panjang. Strategi content-led yang membangun kepercayaan lebih dulu sebelum menawarkan produk.',
  },
  {
    title: 'Sewa Kantor dan Virtual Office',
    body: 'Intent pencarian sangat spesifik dan berbasis lokasi. Fokus SEO lokal dan Google Ads dengan keyword yang sangat tertarget.',
  },
]

const faqItems = [
  {
    question: 'Apakah saya perlu semua kanal sekaligus?',
    answer:
      'Tidak. Lebih baik satu kanal dikerjakan dengan baik daripada lima kanal setengah-setengah. Kita tentukan prioritas berdasarkan kondisi bisnis dan anggaran Anda.',
  },
  {
    question: 'Siapa yang buat konten?',
    answer:
      'Tergantung kesepakatan. Saya bisa handle strategi dan pengelolaan, sementara konten visual (foto, video) dari sisi Anda. Atau saya bisa koordinasikan dengan kreator konten yang sudah pernah bekerja sama.',
  },
  {
    question: 'Bagaimana cara mengukur keberhasilan?',
    answer:
      'Dari awal kita sepakati KPI yang jelas: berapa leads per bulan yang jadi target, berapa cost per lead yang masuk akal untuk bisnis Anda, dan metrik lain yang relevan.',
  },
]

export default function DigitalMarketingPage() {
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
          { label: 'Digital Marketing' },
        ]}
      />

      <ServiceHero
        badge="Digital Marketing"
        headline="Strategi Digital yang Menyatukan Semua Kanal, Bukan yang Jalan Sendiri-sendiri"
        highlight="Menyatukan Semua Kanal"
        subheadline="Website, iklan, SEO, dan media sosial yang bekerja secara terpadu menghasilkan lebih dari yang dikerjakan terpisah. Saya bantu Anda merancang dan menjalankan ekosistem digital yang saling mendukung."
        ctaWaKey="digitalMarketing"
        ctaLabel="Konsultasi Strategi Digital Saya"
        socialProof="Pengalaman lintas industri: home service, tour & travel, perhiasan, B2B IT"
      />

      <ServiceProse
        eyebrow="Masalah"
        headline="Sudah Coba Banyak Hal, tapi Tidak Ada yang Terasa Berhasil Penuh"
        paragraphs={[
          'Banyak pemilik bisnis sudah mencoba iklan di Instagram. Sudah punya website. Kadang posting di Facebook. Tapi semua berjalan terpisah tanpa strategi yang menyatukan.',
          'Hasilnya: effort banyak, tapi tidak ada yang bisa diukur dengan jelas. Tidak tahu mana yang menghasilkan customer, mana yang membuang waktu.',
          'Digital marketing yang efektif bukan soal ada di mana-mana. Soal ada di tempat yang tepat, dengan pesan yang tepat, untuk orang yang tepat.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Cakupan Layanan"
        headline="Mulai dari Strategi, Bukan dari Tools"
        intro="Sebelum memutuskan 'pakai Instagram atau TikTok', ada pertanyaan lebih mendasar: di mana target customer Anda menghabiskan waktu? Apa yang mereka cari? Dan di titik mana mereka siap dihubungi?"
        items={scope}
        columns={3}
        background="gray"
      />

      <ServiceProse
        eyebrow="Bukan untuk Semua Bisnis"
        headline="Jujur Soal Kapan Ini Cocok untuk Anda"
        paragraphs={[
          'Digital marketing full-funnel paling efektif untuk bisnis yang sudah punya produk atau jasa terbukti, punya kapasitas menangani leads (tim sales, WhatsApp responsif, proses follow-up), dan siap komitmen minimal 3-6 bulan.',
          'Kalau bisnis Anda masih di tahap awal, mungkin dimulai dari satu kanal saja lebih masuk akal. Saya akan merekomendasikan yang paling realistis untuk kondisi Anda saat ini.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Industri"
        headline="Pengalaman Lintas Industri"
        intro="Setiap industri punya nuansa berbeda dalam cara pendekatan digitalnya."
        items={industries}
        columns={3}
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Tidak Tahu Harus Mulai dari Mana?"
        body="Itu wajar. Digital marketing punya banyak pilihan dan mudah terasa overwhelming. Ceritakan kondisi bisnis Anda sekarang, saya akan bantu identifikasi langkah pertama yang paling logis."
        ctaWaKey="digitalMarketing"
        ctaLabel="Mulai Diskusi via WhatsApp"
        subText="Konsultasi gratis, tidak ada kewajiban apapun →"
      />
    </main>
  )
}
