import type { Metadata } from 'next'
import { MessageCircle, Calendar, Mail, MapPin } from 'lucide-react'

import { generateMetadata, breadcrumbSchema, contactPageSchema, faqPageSchema } from '@/lib/seo'
import { SITE, getWaLink } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceFAQ from '@/components/sections/ServiceFAQ'

const PATH = '/kontak'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Kontak — Hubungi Noviyanto',
  description:
    'Hubungi Noviyanto via WhatsApp, Calendly, atau email. Konsultasi pertama gratis, tanpa komitmen. Respons hari kerja dalam beberapa jam.',
  path: PATH,
  keywords: ['kontak Noviyanto', 'konsultasi web developer', 'jadwalkan meeting Noviyanto'],
})

const ICON = 'w-5 h-5'

const faqItems = [
  {
    question: 'Berapa lama respons setelah saya kirim pesan?',
    answer:
      'Hari kerja: biasanya beberapa jam. Akhir pekan atau hari libur: bisa lebih lama. Untuk yang urgent, kirim WhatsApp langsung — paling cepat sampai.',
  },
  {
    question: 'Apakah konsultasi pertama benar-benar gratis?',
    answer:
      'Ya. 30 menit pertama gratis, tidak ada kewajiban lanjut. Tujuannya memastikan saya paham kebutuhan Anda dan Anda paham apa yang saya bisa kerjakan.',
  },
  {
    question: 'Apakah harus di Semarang untuk bekerja sama?',
    answer:
      'Tidak. Saya melayani klien dari Jakarta, Bandung, Semarang, dan kota lainnya. Komunikasi via WhatsApp, Zoom, atau Google Meet sudah cukup untuk mayoritas proyek.',
  },
  {
    question: 'Bagaimana cara mengirim brief atau materi proyek?',
    answer:
      'Setelah diskusi awal, saya akan kirim tautan folder Google Drive atau form khusus. Tidak perlu khawatir mengirim materi sensitif sebelum kita sepakat untuk lanjut.',
  },
]

const jsonLd: object[] = [
  contactPageSchema({
    url: URL,
    name: 'Kontak Noviyanto',
    description:
      'Hubungi Noviyanto via WhatsApp, Calendly, atau email. Konsultasi pertama gratis, tanpa komitmen.',
  }),
  faqPageSchema(faqItems),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Kontak', url: URL },
  ]),
]

export default function KontakPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Kontak' },
        ]}
      />

      <ServiceHero
        badge="Kontak"
        headline="Cara Tercepat: WhatsApp"
        highlight="WhatsApp"
        subheadline="Tidak ada form panjang. Tidak ada kewajiban. Ceritakan kondisi bisnis dan target Anda — saya bantu identifikasi langkah berikutnya."
        ctaWaKey="default"
        ctaLabel="Hubungi via WhatsApp"
        socialProof="Hari kerja: respons biasanya dalam beberapa jam"
      />

      <section className="bg-white py-16 lg:py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
            <a
              href={getWaLink('default')}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors"
                aria-hidden="true"
              >
                <MessageCircle className={ICON} />
              </div>
              <h2 className="font-display font-medium text-lg text-[#111827] tracking-tight">
                WhatsApp
              </h2>
              <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                Cara tercepat dan paling fleksibel. Cocok untuk diskusi singkat, konsultasi, atau pertanyaan teknis.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                Buka WhatsApp →
              </span>
            </a>

            <a
              href={SITE.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors"
                aria-hidden="true"
              >
                <Calendar className={ICON} />
              </div>
              <h2 className="font-display font-medium text-lg text-[#111827] tracking-tight">
                Jadwalkan Meeting
              </h2>
              <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                Slot 30 menit via Zoom atau Google Meet. Cocok untuk diskusi lebih dalam soal kebutuhan proyek.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                Pilih waktu via Calendly →
              </span>
            </a>

            <a
              href={`mailto:${SITE.email}`}
              className="group bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
            >
              <div
                className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:bg-amber-100 transition-colors"
                aria-hidden="true"
              >
                <Mail className={ICON} />
              </div>
              <h2 className="font-display font-medium text-lg text-[#111827] tracking-tight">
                Email
              </h2>
              <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                Untuk brief detail, lampiran, atau diskusi formal. Respons hari kerja.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
                {SITE.email} →
              </span>
            </a>

            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6 lg:p-7">
              <div
                className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4"
                aria-hidden="true"
              >
                <MapPin className={ICON} />
              </div>
              <h2 className="font-display font-medium text-lg text-[#111827] tracking-tight">
                Lokasi
              </h2>
              <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">
                {SITE.address.line}, {SITE.address.district}, {SITE.address.city}, {SITE.address.region}, {SITE.address.country}.
              </p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-xs text-[#9CA3AF]">
                Melayani klien di {SITE.location} dan kota lainnya secara remote
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-50 border-y border-gray-100 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-2xl mx-auto text-center">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
              Persiapan
            </span>
            <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight leading-[1.1] text-balance">
              Yang Berguna Disiapkan Sebelum Diskusi
            </h2>
            <ul className="mt-8 space-y-3 text-left bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              <li className="flex items-start gap-3 text-sm text-[#374151]">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-semibold text-xs">1</span>
                <span className="leading-relaxed">
                  <strong className="text-[#111827]">Konteks bisnis singkat</strong> — apa yang Anda jual, ke siapa, dan situasi saat ini.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#374151]">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-semibold text-xs">2</span>
                <span className="leading-relaxed">
                  <strong className="text-[#111827]">Target yang ingin dicapai</strong> — lebih banyak leads, sistem yang lebih efisien, atau penetrasi pasar baru.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#374151]">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-semibold text-xs">3</span>
                <span className="leading-relaxed">
                  <strong className="text-[#111827]">Estimasi anggaran (opsional)</strong> — tidak wajib, tapi membantu saya merekomendasikan opsi yang realistis.
                </span>
              </li>
              <li className="flex items-start gap-3 text-sm text-[#374151]">
                <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center font-semibold text-xs">4</span>
                <span className="leading-relaxed">
                  <strong className="text-[#111827]">Tenggat waktu (kalau ada)</strong> — kapan Anda butuh ini selesai atau live.
                </span>
              </li>
            </ul>
            <p className="mt-6 text-sm text-[#6B7280]">
              Tidak punya semua di atas? Tetap silakan kontak. Hal-hal ini bisa diidentifikasi bersama saat diskusi.
            </p>
          </div>
        </div>
      </section>

      <ServiceFAQ items={faqItems} title="Pertanyaan Sebelum Menghubungi" />
    </main>
  )
}
