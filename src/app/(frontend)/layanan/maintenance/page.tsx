import type { Metadata } from 'next'

import { serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceColumns from '@/components/sections/ServiceColumns'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/maintenance'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Maintenance Website — Update, Backup, Monitoring, Optimasi',
    description:
      'Layanan maintenance website: update CMS/plugin, backup rutin, monitoring uptime, optimasi performa, dan update konten kecil.',
    path: PATH,
    keywords: ['maintenance website', 'perawatan website', 'jasa update website', 'website monitoring'],
    hasGeneratedOgImage: true,
  })
}

const jsonLd = [
  serviceSchema({
    name: 'Maintenance Website',
    description:
      'Layanan maintenance website: update, backup, monitoring uptime, optimasi performa, dan update konten kecil bulanan.',
    url: URL,
    serviceType: 'Website Maintenance',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Maintenance', url: URL },
  ]),
]

const coverage = [
  {
    title: 'Update & Keamanan',
    body: 'Update CMS, plugin, dan dependency berkala. Monitoring keamanan dan tindakan cepat kalau ada indikasi masalah.',
  },
  {
    title: 'Backup Rutin',
    body: 'Backup otomatis harian atau mingguan. Kalau terjadi sesuatu yang tidak diinginkan, website bisa dipulihkan dengan cepat.',
  },
  {
    title: 'Monitoring Uptime',
    body: 'Notifikasi otomatis kalau website down. Anda tidak perlu tahu dulu dari customer yang komplain.',
  },
  {
    title: 'Optimasi Performa',
    body: 'Pengecekan berkala kecepatan loading, kompresi gambar, dan cleanup yang menjaga performa tetap baik.',
  },
  {
    title: 'Update Konten Kecil',
    body: 'Perubahan teks, update foto, tambah informasi produk atau layanan baru. Update kecil yang tidak butuh redesign.',
  },
  {
    title: 'Laporan Bulanan',
    body: 'Ringkasan kondisi website: uptime, kecepatan, update yang sudah dilakukan, dan hal yang perlu diperhatikan ke depan.',
  },
]

const targetAudience = [
  {
    title: 'Pemilik bisnis sibuk',
    body: 'Tidak punya waktu atau kemampuan teknis untuk merawat website sendiri. Anda fokus ke bisnis, urusan teknis saya yang pegang.',
  },
  {
    title: 'Website yang sudah selesai',
    body: 'Dan perlu dijaga kondisinya jangka panjang. Mencegah jauh lebih murah dari memperbaiki.',
  },
  {
    title: 'Website yang sudah bermasalah',
    body: 'Lambat, tampilannya berantakan, atau pernah kena hack — dan ingin memastikan ini tidak terulang.',
  },
  {
    title: 'E-commerce',
    body: 'Sangat bergantung pada website untuk transaksi dan tidak bisa tolerir downtime atau masalah teknis.',
  },
]

const faqItems = [
  {
    question: 'Apakah harus pakai website yang dibangun oleh Noviyanto?',
    answer:
      'Tidak harus. Saya bisa take over maintenance website yang sebelumnya dibuat orang lain, setelah audit singkat untuk pahami kondisi awalnya.',
  },
  {
    question: 'Apa yang terjadi kalau ada masalah mendadak di luar jam kerja?',
    answer:
      'Tergantung paket yang dipilih. Untuk masalah kritis (website down), ada jalur respons prioritas. Detail disesuaikan saat penandatanganan kontrak.',
  },
  {
    question: 'Berapa lama kontrak minimal?',
    answer:
      'Minimum 3 bulan. Perawatan website perlu konsistensi — tidak ada manfaatnya kalau hanya 1 bulan lalu berhenti.',
  },
  {
    question: 'Bagaimana kalau saya mau update konten sendiri?',
    answer:
      'Bisa. Saya bisa setup sistem sehingga Anda atau tim bisa update konten tertentu sendiri tanpa perlu bantuan teknis setiap kali.',
  },
]

export default function MaintenancePage() {
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
          { label: 'Maintenance' },
        ]}
      />

      <ServiceHero
        badge="Maintenance"
        headline="Website Anda Selalu Online, Aman, dan Performa Terjaga"
        highlight="Online, Aman, dan Performa Terjaga"
        subheadline="Website yang tidak dirawat itu seperti toko yang pintunya tidak pernah dibersihkan dan lampunya mulai redup. Calon customer tetap lihat, tapi kesan yang tertinggal bukan yang Anda inginkan."
        ctaWaKey="maintenance"
        ctaLabel="Konsultasi Paket Maintenance"
        socialProof="Untuk website lama atau baru — bisa take over dari developer sebelumnya"
      />

      <ServiceProse
        eyebrow="Masalah"
        headline="Apa yang Terjadi pada Website yang Tidak Dirawat"
        paragraphs={[
          'Website bukan sesuatu yang bisa dibuat sekali lalu dibiarkan selamanya. Ada beberapa hal yang terjadi kalau tidak ada yang merawatnya.',
          'Plugin dan sistem keamanan ketinggalan update — celah paling umum yang dieksploitasi peretas. Performa menurun: cache menumpuk, gambar tidak dioptimalkan, script mulai konflik. Konten jadi usang dan membuat calon customer merasa bisnis Anda tidak aktif. Hosting bermasalah, pembayaran terlewat, domain expired — semua bisa membuat website down tanpa Anda sadari.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Yang Dicakup"
        headline="Yang Termasuk dalam Layanan Maintenance"
        items={coverage}
        columns={3}
        background="gray"
      />

      <ServiceColumns
        eyebrow="Cakupan"
        headline="Perlu Diketahui dari Awal"
        intro="Maintenance berbeda dari development baru. Kalau ada kebutuhan halaman baru, fitur baru, atau perubahan desain yang signifikan — itu dikerjakan sebagai proyek terpisah di luar paket maintenance. Bukan berarti tidak bisa dikerjakan, hanya perlu didiskusikan dulu."
        columns={[
          {
            badge: 'Termasuk',
            badgeTone: 'amber',
            title: 'Dalam paket maintenance',
            icon: 'check',
            items: [
              'Update CMS, plugin, dependency',
              'Backup otomatis harian/mingguan',
              'Monitoring uptime dan keamanan',
              'Optimasi performa berkala',
              'Update konten kecil (teks, foto)',
              'Laporan bulanan kondisi website',
            ],
          },
          {
            badge: 'Tidak Termasuk',
            badgeTone: 'red',
            title: 'Dikerjakan sebagai proyek terpisah',
            icon: 'x',
            items: [
              'Halaman baru atau section baru',
              'Fitur baru yang butuh development',
              'Redesign halaman yang signifikan',
              'Migrasi platform atau hosting baru',
              'Pembuatan konten panjang',
            ],
          },
        ]}
      />

      <ServiceCardGrid
        eyebrow="Cocok Untuk"
        headline="Siapa yang Paling Butuh Layanan Ini"
        items={targetAudience}
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Website Anda Sudah Terakhir Dicek Kapan?"
        body="Kalau jawabannya 'tidak ingat' — itu sudah cukup alasan untuk menghubungi saya. Saya bisa lakukan audit singkat: keamanan, performa, dan hal-hal yang perlu segera diperbaiki."
        ctaWaKey="audit"
        ctaLabel="Minta Audit Website Gratis"
        subText="Kirim URL website Anda via WhatsApp →"
      />
    </main>
  )
}
