import type { Metadata } from 'next'
import { Users, HardHat, Layers } from 'lucide-react'

import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceTimeline from '@/components/sections/ServiceTimeline'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/mobile-app'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Pembuatan Aplikasi Mobile — Cross-Platform React Native',
    description:
      'Pembuatan aplikasi mobile cross-platform (Android + iOS) dengan React Native. Untuk customer-facing, internal tim, atau hybrid.',
    path: PATH,
    keywords: ['jasa aplikasi mobile', 'developer React Native', 'app developer Indonesia', 'cross-platform app'],
    hasGeneratedOgImage: true,
  })
}

const jsonLd = [
  serviceSchema({
    name: 'Pembuatan Aplikasi Mobile',
    description:
      'Pembuatan aplikasi mobile cross-platform Android + iOS dengan React Native. Dari discovery sampai submit store.',
    url: URL,
    serviceType: 'Mobile App Development',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Aplikasi Mobile', url: URL },
  ]),
]

const ICON = 'w-5 h-5'

const appTypes = [
  {
    icon: <Users className={ICON} />,
    title: 'Aplikasi Customer-Facing',
    body: 'Booking, pemesanan produk, tracking status pesanan, loyalty points, atau portal self-service untuk customer Anda. Cocok untuk bisnis jasa yang ingin customer akses layanan dengan lebih mudah.',
  },
  {
    icon: <HardHat className={ICON} />,
    title: 'Aplikasi Internal / Tim',
    body: 'Untuk tim lapangan, tenaga sales, atau staf yang perlu akses data operasional dari luar kantor. Checklist pekerjaan, update status, foto bukti kerja, laporan harian.',
  },
  {
    icon: <Layers className={ICON} />,
    title: 'Aplikasi Hybrid',
    body: 'Kombinasi keduanya — customer dan tim sama-sama punya akses, dengan hak yang berbeda.',
  },
]

const processSteps = [
  {
    label: 'Step 1',
    title: 'Discovery & Scoping',
    description: 'Memahami alur kerja yang perlu didukung aplikasi, siapa penggunanya, dan fitur apa yang benar-benar prioritas. Tentukan apa yang masuk versi pertama.',
  },
  {
    label: 'Step 2',
    title: 'Wireframe & UI Design',
    description: 'Sketsa alur dan tampilan sebelum mulai coding. Lebih mudah direvisi di tahap ini daripada setelah dibangun.',
  },
  {
    label: 'Step 3',
    title: 'Development',
    description: 'Proses pembangunan aplikasi. Ada review di tengah jalan untuk memastikan arah tidak melenceng.',
  },
  {
    label: 'Step 4',
    title: 'Testing',
    description: 'Pengujian di berbagai jenis device dan OS sebelum diluncurkan ke publik.',
  },
  {
    label: 'Step 5',
    title: 'Submit ke App Store / Play Store',
    description: 'Termasuk proses pendaftaran developer account (kalau belum punya) dan persiapan materi yang dibutuhkan untuk review.',
  },
  {
    label: 'Step 6',
    title: 'Post-Launch Support',
    description: 'Aplikasi yang sudah live masih butuh perhatian. Bug kecil yang tidak terdeteksi saat testing baru muncul setelah dipakai dalam kondisi nyata.',
  },
]

const faqItems = [
  {
    question: 'Berapa lama pengerjaan?',
    answer:
      'Sangat bergantung kompleksitas fitur. Aplikasi sederhana dengan 3-5 layar utama bisa selesai dalam 6-10 minggu. Aplikasi dengan banyak integrasi dan fitur kompleks bisa 4-6 bulan.',
  },
  {
    question: 'Apakah lebih mahal dari website?',
    answer:
      'Ya, secara umum. Development aplikasi mobile lebih kompleks dan butuh waktu lebih lama. Tapi kalau kebutuhan bisnis Anda mengarah ke sana, ini investasi yang worthwhile.',
  },
  {
    question: 'Bagaimana dengan update setelah aplikasi jadi?',
    answer:
      'Ada dua opsi: saya handle maintenance dan update berkala, atau tim Anda dilatih untuk update konten tertentu. Disesuaikan dengan kebutuhan dan kemampuan teknis tim.',
  },
  {
    question: 'Apakah bisa diintegrasikan dengan sistem yang sudah ada?',
    answer:
      'Bisa, selama sistem yang ada punya API. Bisa dikonfigurasikan dari awal proses development.',
  },
]

export default function MobileAppPage() {
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
          { label: 'Aplikasi Mobile' },
        ]}
      />

      <ServiceHero
        badge="Aplikasi Mobile"
        headline="Aplikasi Mobile yang Dibangun Sesuai Cara Kerja Bisnis Anda"
        highlight="Cara Kerja Bisnis Anda"
        subheadline="Bukan template yang dipaksakan. Aplikasi yang dirancang dari kebutuhan nyata bisnis Anda — untuk customer, untuk tim lapangan, atau untuk keduanya."
        ctaWaKey="mobileApp"
        ctaLabel="Diskusikan Kebutuhan Aplikasi Saya"
        socialProof="React Native — satu kode, jalan di Android dan iOS"
      />

      <ServiceProse
        eyebrow="Kapan Butuh Mobile App"
        headline="Tidak Semua Bisnis Butuh Aplikasi. Tapi Beberapa Sangat Memerlukannya."
        paragraphs={[
          'Website yang dioptimalkan untuk mobile sudah cukup untuk banyak bisnis. Tapi ada kondisi di mana aplikasi mobile lebih masuk akal.',
          'Bisnis Anda punya tim lapangan yang perlu akses data, update status pekerjaan, atau laporan dari lokasi kerja. Anda ingin memberi pengalaman lebih personal kepada customer dengan riwayat transaksi, loyalty program, atau notifikasi push. Ada proses operasional berulang yang jauh lebih efisien lewat aplikasi khusus. Atau Anda punya data yang perlu bisa diakses offline.',
          'Kalau Anda masih tidak yakin apakah bisnis Anda butuh aplikasi, itu bisa jadi bahan diskusi di konsultasi awal.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Jenis Aplikasi"
        headline="Apa yang Bisa Dikerjakan"
        items={appTypes}
        columns={3}
        background="gray"
      />

      <ServiceProse
        eyebrow="Pendekatan Teknis"
        headline="Cross-Platform: Satu Kode, Jalan di Android dan iOS"
        paragraphs={[
          'Aplikasi dibangun dengan pendekatan cross-platform menggunakan React Native, sehingga satu proses development menghasilkan aplikasi yang berjalan di Android dan iOS. Lebih efisien dari sisi biaya dan waktu dibanding membangun dua aplikasi terpisah.',
          'Untuk aplikasi yang butuh integrasi dengan sistem backend yang sudah ada (termasuk Odoo atau API lain), ini bisa dikonfigurasi dari awal proses development.',
        ]}
        chips={['React Native', 'Expo', 'TypeScript', 'REST API', 'GraphQL']}
      />

      <ServiceTimeline
        eyebrow="Proses Kerja"
        headline="Dari Konsultasi Sampai Aplikasi Tayang di Play Store"
        steps={processSteps}
        background="gray"
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Punya Ide Aplikasi tapi Tidak Tahu Harus Mulai dari Mana?"
        body="Ceritakan kebutuhannya. Saya akan bantu evaluasi apakah aplikasi mobile memang solusi yang tepat, atau ada cara yang lebih sederhana dan efisien untuk mencapai tujuan yang sama."
        ctaWaKey="mobileApp"
        ctaLabel="Diskusi via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </main>
  )
}
