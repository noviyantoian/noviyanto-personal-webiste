import type { Metadata } from 'next'
import Link from 'next/link'

import { generateMetadata as genMeta, breadcrumbSchema } from '@/lib/seo'
import { SITE, getWaLink } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'

const PATH = '/syarat-ketentuan'
const URL = `${SITE.url}${PATH}`
const LAST_UPDATED = '30 Mei 2026'

export const metadata: Metadata = genMeta({
  title: 'Syarat & Ketentuan',
  description:
    'Syarat & Ketentuan penggunaan situs dan layanan Noviyanto — lingkup layanan, kontrak proyek, pembayaran, kekayaan intelektual, dan batasan tanggung jawab.',
  path: PATH,
  keywords: ['syarat dan ketentuan Noviyanto', 'terms and conditions'],
})

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: 'Syarat & Ketentuan',
    description: 'Syarat & Ketentuan penggunaan situs dan layanan Noviyanto.',
    url: URL,
    isPartOf: { '@id': `${SITE.url}/#website` },
  },
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Syarat & Ketentuan', url: URL },
  ]),
]

export default function SyaratKetentuanPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Syarat & Ketentuan' }]} />

      <section className="container-wide py-14 lg:py-20">
        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            Legal
          </span>
          <h1 className="font-display font-semibold text-4xl lg:text-5xl text-[#111827] tracking-tight mb-4">
            Syarat &amp; Ketentuan
          </h1>
          <p className="text-sm text-[#9CA3AF]">Terakhir diperbarui: {LAST_UPDATED}</p>

          <div className="blog-prose mt-10">
            <p>
              Syarat &amp; Ketentuan ini mengatur penggunaan situs{' '}
              <strong>{SITE.url.replace('https://', '')}</strong> dan layanan yang ditawarkan oleh
              Noviyanto. Dengan mengakses situs atau menggunakan layanan kami, Anda dianggap
              menyetujui ketentuan berikut.
            </p>

            <h2>1. Penerimaan Syarat</h2>
            <p>
              Jika Anda tidak menyetujui sebagian atau seluruh ketentuan ini, mohon untuk tidak
              menggunakan situs maupun layanan kami.
            </p>

            <h2>2. Tentang Layanan</h2>
            <p>
              Situs ini menyajikan informasi mengenai layanan digital — pembuatan website, Google
              Ads, SEO, digital marketing, integrasi AI, aplikasi mobile, dan maintenance. Informasi
              di situs bersifat umum dan bukan merupakan penawaran yang mengikat. Setiap kerja sama
              proyek diatur melalui kontrak terpisah yang disepakati kedua belah pihak.
            </p>

            <h2>3. Penggunaan Situs</h2>
            <ul>
              <li>Anda setuju menggunakan situs ini hanya untuk tujuan yang sah.</li>
              <li>
                Dilarang melakukan upaya peretasan, penyalinan massal (scraping) tanpa izin, atau
                tindakan yang dapat mengganggu operasional situs.
              </li>
              <li>Dilarang menyalahgunakan jalur kontak untuk spam atau penipuan.</li>
            </ul>

            <h2>4. Kekayaan Intelektual</h2>
            <p>
              Seluruh konten di situs ini — teks, desain, logo, dan elemen visual — adalah milik
              Noviyanto, kecuali dinyatakan lain. Anda tidak diperbolehkan menyalin atau
              mendistribusikan ulang tanpa izin tertulis.
            </p>

            <h2>5. Lingkup Pekerjaan dan Kontrak Proyek</h2>
            <p>
              Lingkup pekerjaan, timeline, jumlah revisi, deliverables, dan biaya untuk setiap proyek
              diatur dalam kontrak kerja tertulis yang terpisah dari Syarat &amp; Ketentuan ini.
              Estimasi atau gambaran di situs bukan harga final dan dapat berubah sesuai kompleksitas
              kebutuhan.
            </p>

            <h2>6. Pembayaran</h2>
            <p>
              Ketentuan pembayaran diatur dalam kontrak proyek, umumnya dibagi menjadi beberapa tahap
              (uang muka, midpoint, dan pelunasan saat go-live). Detail metode dan jadwal pembayaran
              disampaikan secara transparan sebelum proyek dimulai.
            </p>

            <h2>7. Tanggung Jawab Konten Klien</h2>
            <p>
              Anda bertanggung jawab dan menjamin bahwa materi yang Anda berikan (teks, gambar, logo,
              data) tidak melanggar hak pihak lain. Kami tidak bertanggung jawab atas pelanggaran hak
              cipta yang timbul dari materi yang Anda serahkan.
            </p>

            <h2>8. Batasan Tanggung Jawab</h2>
            <p>
              Situs dan layanan disediakan sebagaimana adanya. Untuk layanan seperti SEO dan Google
              Ads, hasil dipengaruhi banyak faktor eksternal sehingga kami tidak menjamin peringkat
              atau angka tertentu. Sejauh diizinkan hukum, kami tidak bertanggung jawab atas kerugian
              tidak langsung yang timbul dari penggunaan situs maupun layanan.
            </p>

            <h2>9. Tautan dan Layanan Pihak Ketiga</h2>
            <p>
              Situs dapat memuat tautan atau mengintegrasikan layanan pihak ketiga. Penggunaan
              layanan tersebut tunduk pada syarat dan kebijakan masing-masing penyedia.
            </p>

            <h2>10. Perubahan Syarat</h2>
            <p>
              Kami dapat memperbarui Syarat &amp; Ketentuan ini sewaktu-waktu. Versi terbaru berlaku
              sejak dipublikasikan di halaman ini dengan tanggal pembaruan yang tercantum di atas.
            </p>

            <h2>11. Hukum yang Berlaku</h2>
            <p>
              Syarat &amp; Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap perselisihan
              akan diupayakan diselesaikan secara musyawarah terlebih dahulu.
            </p>

            <h2>12. Hubungi Kami</h2>
            <p>
              Untuk pertanyaan terkait ketentuan ini, hubungi kami melalui email{' '}
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a> atau{' '}
              <a href={getWaLink('default')} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
              . Lihat juga <Link href="/kebijakan-privasi">Kebijakan Privasi</Link> kami.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
