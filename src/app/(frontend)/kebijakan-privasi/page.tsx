import type { Metadata } from 'next'
import Link from 'next/link'

import { generateMetadata as genMeta, breadcrumbSchema } from '@/lib/seo'
import { SITE, getWaLink } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'

const PATH = '/kebijakan-privasi'
const URL = `${SITE.url}${PATH}`
const LAST_UPDATED = '30 Mei 2026'

export const metadata: Metadata = genMeta({
  title: 'Kebijakan Privasi',
  description:
    'Kebijakan Privasi Noviyanto — bagaimana data yang Anda berikan melalui form konsultasi dan kunjungan situs dikumpulkan, digunakan, dan dilindungi.',
  path: PATH,
  keywords: ['kebijakan privasi Noviyanto', 'privacy policy'],
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Kebijakan Privasi',
    description:
      'Kebijakan Privasi Noviyanto — pengumpulan, penggunaan, dan perlindungan data pengguna.',
    url: URL,
    isPartOf: { '@id': `${SITE.url}/#website` },
  },
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Kebijakan Privasi', url: URL },
  ]),
]

export default function KebijakanPrivasiPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Kebijakan Privasi' }]} />

      <section className="container-wide py-14 lg:py-20">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            Legal
          </span>
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-[#111827] tracking-tight mb-4">
            Kebijakan Privasi
          </h1>
          <p className="text-sm text-[#9CA3AF]">Terakhir diperbarui: {LAST_UPDATED}</p>

          <div className="blog-prose mt-10">
            <p>
              Kebijakan Privasi ini menjelaskan bagaimana Noviyanto (&ldquo;kami&rdquo;)
              mengumpulkan, menggunakan, dan melindungi data Anda ketika mengunjungi{' '}
              <strong>{SITE.url.replace('https://', '')}</strong> atau menghubungi kami melalui form
              konsultasi, WhatsApp, dan email. Dengan menggunakan situs ini, Anda menyetujui praktik
              yang dijelaskan di bawah.
            </p>

            <h2>1. Data yang Kami Kumpulkan</h2>
            <p>
              <strong>Data yang Anda berikan secara langsung.</strong> Ketika Anda mengisi form
              konsultasi atau menghubungi kami, kami dapat mengumpulkan: nama, nomor WhatsApp,
              alamat email, jenis layanan yang diminati, dan deskripsi kebutuhan bisnis Anda.
            </p>
            <p>
              <strong>Data yang dikumpulkan secara otomatis.</strong> Saat Anda menjelajahi situs,
              kami dapat mengumpulkan data teknis seperti alamat IP, jenis perangkat dan browser,
              halaman yang dikunjungi, serta durasi kunjungan melalui cookie dan layanan analitik.
            </p>

            <h2>2. Cara Kami Menggunakan Data</h2>
            <ul>
              <li>Merespons permintaan konsultasi Anda melalui WhatsApp atau email.</li>
              <li>Menyusun penawaran dan rekomendasi layanan yang relevan.</li>
              <li>Menganalisis performa situs dan meningkatkan pengalaman pengguna.</li>
              <li>Memenuhi kewajiban hukum bila diperlukan.</li>
            </ul>

            <h2>3. Dasar Penggunaan dan Persetujuan</h2>
            <p>
              Dengan mengirimkan form atau menghubungi kami, Anda memberikan persetujuan untuk
              dihubungi kembali melalui WhatsApp dan/atau email terkait kebutuhan yang Anda
              sampaikan. Anda dapat menarik persetujuan ini kapan saja dengan menghubungi kami.
            </p>

            <h2>4. Cookie dan Analitik</h2>
            <p>
              Situs ini menggunakan Google Analytics 4 untuk memahami perilaku pengunjung secara
              agregat. Data ini tidak digunakan untuk mengidentifikasi Anda secara pribadi. Anda
              dapat menonaktifkan cookie melalui pengaturan browser Anda, meskipun beberapa bagian
              situs mungkin tidak berfungsi optimal.
            </p>

            <h2>5. Berbagi Data dengan Pihak Ketiga</h2>
            <p>
              Kami <strong>tidak menjual</strong> data pribadi Anda. Kami hanya menggunakan layanan
              pihak ketiga tepercaya yang mendukung operasional situs, antara lain Google Analytics
              (analitik), WhatsApp (komunikasi), penyedia email, serta penyedia hosting. Setiap
              penyedia memiliki kebijakan privasinya sendiri.
            </p>

            <h2>6. Penyimpanan dan Keamanan Data</h2>
            <p>
              Data Anda disimpan selama diperlukan untuk tujuan komunikasi dan pengerjaan proyek,
              atau sesuai kewajiban hukum. Kami menerapkan langkah keamanan yang wajar untuk
              melindungi data, namun tidak ada metode transmisi melalui internet yang 100% aman.
            </p>

            <h2>7. Hak Anda</h2>
            <p>
              Anda berhak meminta akses, koreksi, atau penghapusan data pribadi yang kami simpan.
              Untuk mengajukan permintaan tersebut, hubungi kami melalui{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>.
            </p>

            <h2>8. Tautan ke Situs Pihak Ketiga</h2>
            <p>
              Situs kami dapat memuat tautan ke situs lain. Kami tidak bertanggung jawab atas praktik
              privasi atau konten situs pihak ketiga tersebut.
            </p>

            <h2>9. Privasi Anak</h2>
            <p>
              Layanan kami ditujukan untuk pelaku bisnis dewasa. Kami tidak dengan sengaja
              mengumpulkan data dari anak di bawah umur.
            </p>

            <h2>10. Perubahan Kebijakan</h2>
            <p>
              Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan akan ditandai
              dengan pembaruan tanggal di bagian atas halaman ini.
            </p>

            <h2>11. Hubungi Kami</h2>
            <p>
              Untuk pertanyaan terkait privasi data, hubungi kami melalui email{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> atau{' '}
              <a href={getWaLink('default')} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              . Lihat juga <Link href="/syarat-ketentuan">Syarat &amp; Ketentuan</Link> kami.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
