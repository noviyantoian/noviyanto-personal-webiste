import type { Metadata } from 'next'
import Image from 'next/image'
import { Target, MessageSquare, ShieldCheck } from 'lucide-react'

import { generateMetadata, breadcrumbSchema, personSchema, aboutPageSchema } from '@/lib/seo'
import { SITE, INDUSTRIES } from '@/lib/constants'
import { INDUSTRY_ICONS } from '@/lib/icons'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/tentang'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Tentang Noviyanto — Digital Growth Partner',
  description:
    'Noviyanto — digital growth partner berbasis di Semarang. Lebih dari 3 tahun bantu bisnis di 7+ industri tumbuh secara digital, dari Jakarta sampai Semarang.',
  path: PATH,
  keywords: ['Noviyanto', 'tentang Noviyanto', 'digital growth partner', 'web developer Semarang'],
})

const jsonLd = [
  personSchema(),
  aboutPageSchema({
    url: URL,
    name: 'Tentang Noviyanto — Digital Growth Partner',
    description:
      'Noviyanto — digital growth partner berbasis di Semarang. Web developer & digital marketing expert dengan 3+ tahun pengalaman di 7+ industri.',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Tentang', url: URL },
  ]),
]

const ICON = 'w-5 h-5'

const values = [
  {
    icon: <Target className={ICON} />,
    title: 'Paham bisnis, bukan hanya teknis',
    body: 'Saya rekomendasikan solusi yang cocok untuk kondisi bisnis Anda, bukan yang paling mahal atau paling populer.',
  },
  {
    icon: <MessageSquare className={ICON} />,
    title: 'Komunikasi yang jelas',
    body: 'Tidak ada jargon teknis. Setiap keputusan dijelaskan dengan bahasa yang mudah dipahami.',
  },
  {
    icon: <ShieldCheck className={ICON} />,
    title: 'Fokus pada hasil yang terukur',
    body: 'Setiap layanan diarahkan ke satu tujuan: bisnis Anda mendapat lebih banyak leads dan customer.',
  },
]

export default function TentangPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Tentang' },
        ]}
      />

      <section className="relative bg-white pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(245,158,11,0.16), transparent 70%)',
          }}
        />
        <div className="container-wide relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Digital Growth Partner
              </span>

              <h1 className="font-display font-semibold text-4xl sm:text-5xl lg:text-6xl text-[#111827] leading-[1.05] tracking-tight text-balance mb-6">
                Saya{' '}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                  Noviyanto
                </span>
                .
              </h1>

              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty mb-4">
                Berbasis di Semarang. Lebih dari 3 tahun terakhir saya bantu bisnis tumbuh
                secara digital — dari yang baru mulai sampai yang sudah punya tim dan butuh
                sistem lebih solid.
              </p>
              <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
                Fokus saya bukan bikin website yang terlihat bagus, tapi membangun ekosistem
                digital yang benar-benar menghasilkan leads dan customer. Setiap proyek
                dimulai dari pertanyaan yang sama: apa tujuan bisnis Anda?
              </p>
              <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
                Selain layanan personal di sini, saya juga{' '}
                <strong className="text-[#111827]">founder dari{' '}
                  <a
                    href="https://folkastudio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline decoration-amber-400 decoration-2 underline-offset-4 hover:text-amber-700 transition-colors"
                  >
                    Folkastudio
                  </a>
                </strong>{' '}
                — studio digital yang sudah dipercaya 50+ bisnis untuk proyek website dan
                aplikasi yang butuh kapasitas tim lebih besar.
              </p>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[340px] sm:max-w-[400px] aspect-[3/4]">
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[3rem] blur-3xl opacity-40 bg-gradient-to-br from-[#F59E0B]/30 via-[#F97316]/10 to-transparent"
                />
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#F9FAFB] ring-1 ring-[#E5E7EB]">
                  <Image
                    src="/images/noviyanto-profile.webp"
                    alt="Noviyanto — Digital Growth Partner"
                    fill
                    priority
                    sizes="(max-width: 1024px) 80vw, 400px"
                    className="object-cover grayscale contrast-[1.05]"
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />
                  <div className="absolute inset-x-5 bottom-5 text-white">
                    <p className="font-display font-medium text-base leading-tight">Noviyanto</p>
                    <p className="text-xs text-white/70">Semarang · Melayani Indonesia</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ServiceProse
        eyebrow="Filosofi Kerja"
        headline="Bukan Vendor. Partner."
        background="gray"
        paragraphs={[
          'Kebanyakan vendor selesaikan pekerjaan lalu pergi. Saya tidak seperti itu. Setiap proyek adalah hubungan jangka panjang — saya ada di sana saat website live, saat iklan butuh optimasi, dan saat sistem perlu disesuaikan dengan kondisi baru.',
          'Kalau menurut saya kebutuhan Anda lebih cocok diselesaikan dengan cara yang lebih sederhana — atau lebih hemat — saya akan bilang. Tidak ada gunanya menjual layanan yang tidak Anda butuhkan.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Yang Membedakan"
        headline="Tiga Hal yang Saya Pegang"
        items={values}
        columns={3}
      />

      <ServiceProse
        eyebrow="Pengalaman"
        headline="3+ Tahun, 30+ Proyek, 7 Industri"
        background="gray"
        paragraphs={[
          'Setiap industri punya buyer behavior yang berbeda. Pendekatan untuk firma hukum tidak sama dengan brand perhiasan. Strategi untuk B2B IT tidak bisa dipakai untuk tour & travel.',
          'Saya sudah pernah bekerja di:',
        ]}
      >
        <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
          {INDUSTRIES.map((i) => {
            const Icon = INDUSTRY_ICONS[i.name]
            return (
              <li
                key={i.name}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-4 py-3"
              >
                <span
                  className="flex-shrink-0 w-8 h-8 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center"
                  aria-hidden="true"
                >
                  {Icon ? <Icon className="w-4 h-4" /> : null}
                </span>
                <span className="text-sm text-[#374151] font-medium">{i.name}</span>
              </li>
            )
          })}
        </ul>
      </ServiceProse>

      <ServiceProse
        eyebrow="Stack"
        headline="Teknologi yang Saya Pakai"
        paragraphs={[
          'Saya tidak terikat pada satu platform. Pilihan stack disesuaikan dengan kebutuhan dan kondisi bisnis Anda — bukan yang paling trendy, tapi yang paling tepat.',
        ]}
        chips={[
          'Next.js',
          'React',
          'React Native',
          'TypeScript',
          'Tailwind CSS',
          'Odoo',
          'n8n',
          'OpenAI',
          'Anthropic Claude',
          'Python',
          'Vercel',
          'PostgreSQL',
        ]}
      />

      <ServiceCTA
        headline="Mau Diskusi Kondisi Bisnis Anda?"
        body="Konsultasi pertama gratis. Ceritakan target Anda, saya bantu identifikasi langkah yang paling masuk akal — meski itu artinya rekomendasi bukan layanan saya."
        ctaWaKey="default"
        ctaLabel="Hubungi via WhatsApp"
        subText="Atau jadwalkan 30 menit via Calendly →"
      />
    </main>
  )
}
