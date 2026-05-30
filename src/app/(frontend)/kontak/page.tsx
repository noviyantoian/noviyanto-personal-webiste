import type { Metadata } from 'next'
import { MessageCircle, Mail, MapPin, Clock, ShieldCheck } from 'lucide-react'

import { breadcrumbSchema, contactPageSchema, faqPageSchema } from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ConsultationForm from '@/components/lead/ConsultationForm'

const PATH = '/kontak'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Konsultasi Gratis — Hubungi Noviyanto',
    description:
      'Isi form konsultasi singkat, ceritakan kebutuhan bisnis Anda, lalu lanjut diskusi langsung via WhatsApp. Konsultasi pertama gratis, tanpa komitmen.',
    path: PATH,
    keywords: ['kontak Noviyanto', 'konsultasi web developer', 'konsultasi digital Semarang'],
  })
}

const faqItems = [
  {
    question: 'Apa yang terjadi setelah saya isi form?',
    answer:
      'Data Anda tersimpan dan langsung masuk ke saya, lalu Anda diarahkan ke WhatsApp dengan pesan yang sudah terisi. Jadi kita bisa langsung lanjut ngobrol tanpa mengetik ulang.',
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
    question: 'Berapa lama respons setelah saya kirim?',
    answer:
      'Hari kerja: biasanya beberapa jam. Akhir pekan atau hari libur bisa lebih lama. Untuk yang urgent, lanjutkan saja chat WhatsApp setelah submit.',
  },
]

const jsonLd: object[] = [
  contactPageSchema({
    url: URL,
    name: 'Kontak Noviyanto',
    description:
      'Form konsultasi gratis: ceritakan kebutuhan bisnis Anda lalu lanjut diskusi via WhatsApp.',
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

      <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Kontak' }]} />

      <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-24">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:gap-16">
          {/* Kiri — pitch + trust + kontak alternatif */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
              Konsultasi Gratis
            </span>
            <h1 className="mt-5 font-display text-4xl font-semibold tracking-tight text-gray-900 lg:text-5xl">
              Ceritakan kebutuhan Anda
            </h1>
            <p className="mt-4 text-lg text-gray-500">
              Isi form singkat di samping. Data Anda langsung masuk ke saya, lalu Anda diarahkan ke
              WhatsApp untuk lanjut diskusi — tanpa perlu mengetik ulang.
            </p>

            <ul className="mt-8 space-y-4">
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <Clock className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">Respons cepat</strong> — hari kerja biasanya
                  dalam beberapa jam.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-sm text-gray-600">
                  <strong className="text-gray-900">Tanpa komitmen</strong> — konsultasi awal gratis,
                  data dipakai hanya untuk menindaklanjuti.
                </span>
              </li>
            </ul>

            {/* Kontak alternatif */}
            <div className="mt-10 space-y-3 border-t border-gray-100 pt-8">
              <a
                href={`mailto:${SITE.email}`}
                className="group flex items-center gap-3 text-sm text-gray-600 transition-colors hover:text-amber-700"
              >
                <Mail className="h-4 w-4 text-amber-600" strokeWidth={1.75} aria-hidden="true" />
                {SITE.email}
              </a>
              <p className="flex items-start gap-3 text-sm text-gray-500">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-600" strokeWidth={1.75} aria-hidden="true" />
                Melayani klien di {SITE.location} dan kota lainnya secara remote.
              </p>
            </div>
          </div>

          {/* Kanan — form */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8">
              <div className="mb-6 flex items-center gap-2 text-amber-700">
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                <span className="text-sm font-semibold">Form Konsultasi</span>
              </div>
              <ConsultationForm source="kontak_page" />
            </div>
          </div>
        </div>
      </section>

      <ServiceFAQ items={faqItems} title="Pertanyaan Sebelum Menghubungi" />
    </main>
  )
}
