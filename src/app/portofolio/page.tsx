import type { Metadata } from 'next'
import Image from 'next/image'
import { ExternalLink } from 'lucide-react'

import { generateMetadata, breadcrumbSchema, collectionPageSchema } from '@/lib/seo'
import { SITE, INDUSTRIES } from '@/lib/constants'
import { INDUSTRY_ICONS } from '@/lib/icons'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/portofolio'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Portofolio — Klien Aktif di Berbagai Industri',
  description:
    'Klien aktif Noviyanto: Truly Home Massage, Jeda Home Massage, Layz Motor, Rockologist, Prioffice, Inisumedang. Web maintenance, Google Ads, SEO, VPS.',
  path: PATH,
  keywords: ['portofolio Noviyanto', 'klien Noviyanto', 'case study web maintenance', 'digital marketing client'],
})

function buildJsonLd(items: { name: string; url: string; description?: string }[]) {
  return [
    collectionPageSchema({
      url: URL,
      name: 'Portofolio Klien Aktif Noviyanto',
      description:
        'Daftar klien aktif Noviyanto di berbagai industri — home service, jewelry, virtual office, otomotif, media. Bukan demo, bukan testimoni satu kali.',
      items,
    }),
    breadcrumbSchema([
      { name: 'Beranda', url: SITE.url },
      { name: 'Portofolio', url: URL },
    ]),
  ]
}

interface Client {
  slug: string
  name: string
  domain: string
  industry: string
  logo: string
  logoBg: 'white' | 'black' | 'amber'
  wallLogo: string
  wallLogoDarkBg?: boolean
  services: string[]
  summary: string
  highlight: string
}

const clients: Client[] = [
  {
    slug: 'trulyhomemassage',
    name: 'Truly Home Massage',
    domain: 'trulyhomemassage.com',
    industry: 'Home Service · Spa Panggilan',
    logo: '/images/clients/trulyhomemassage.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/trulyhomemassage.png',
    services: ['Maintenance Website', 'Google Ads', 'SEO'],
    summary:
      'Brand spa panggilan profesional. Pengelolaan maintenance, kampanye Google Ads, dan SEO untuk menjaga aliran booking lewat WhatsApp.',
    highlight: 'Lead generation lokal + brand visibility jangka panjang',
  },
  {
    slug: 'jedahomemassage',
    name: 'Jeda Home Massage',
    domain: 'jedahomemassage.com',
    industry: 'Home Service · Spa Panggilan',
    logo: '/images/clients/jedahomemassage.jpg',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/jedahomemassage.png',
    wallLogoDarkBg: true,
    services: ['Maintenance Website', 'Google Ads', 'SEO'],
    summary:
      'Spa panggilan dengan positioning premium. Maintenance website + Google Ads dan SEO untuk menangkap pencarian intent tinggi di area target.',
    highlight: 'Funnel paid + organik yang saling menutupi celah',
  },
  {
    slug: 'rockologist',
    name: 'Rockologist',
    domain: 'rockologist.id',
    industry: 'Perhiasan & Batu Mulia',
    logo: '/images/clients/rockologist.png',
    logoBg: 'black',
    wallLogo: '/images/clients/navbar/rockologist.png',
    services: ['Maintenance Website', 'SEO'],
    summary:
      'Brand batu mulia dan jewelry artisan. Maintenance rutin + SEO organik untuk membangun otoritas brand di pencarian produk dan koleksi.',
    highlight: 'Product discovery via pencarian organik',
  },
  {
    slug: 'prioffice',
    name: 'Prioffice',
    domain: 'prioffice.com',
    industry: 'Sewa Kantor & Virtual Office',
    logo: '/images/clients/prioffice.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/prioffice.png',
    services: ['Maintenance Website'],
    summary:
      'Penyedia sewa kantor dan virtual office. Maintenance website untuk menjaga uptime, performa, dan halaman selalu siap menerima inquiry.',
    highlight: 'Website selalu online untuk bisnis berbasis booking',
  },
  {
    slug: 'layz-motor',
    name: 'Layz Motor',
    domain: 'layz-motor.com',
    industry: 'Otomotif · Motor',
    logo: '/images/clients/layz-motor.jpg',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/layz-motor.png',
    services: ['Maintenance Website'],
    summary:
      'Bisnis motor — showroom dan layanan. Maintenance website rutin untuk menjaga keamanan, kecepatan, dan update konten produk.',
    highlight: 'Maintenance jangka panjang dengan respons cepat',
  },
  {
    slug: 'lapin',
    name: 'Lapin',
    domain: 'lapin.id',
    industry: 'Brand Lokal',
    logo: '/images/clients/lapin.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/lapin.png',
    services: ['Google Ads'],
    summary:
      'Pengelolaan kampanye Google Ads untuk Lapin. Setup, optimasi keyword, dan tracking konversi untuk mendorong inquiry yang relevan.',
    highlight: 'Paid search yang menargetkan intent komersial',
  },
  {
    slug: 'inisumedang',
    name: 'Inisumedang',
    domain: 'inisumedang.com',
    industry: 'Media Lokal · Berita Daerah',
    logo: '/images/clients/inisumedang.jpg',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/inisumedang.png',
    services: ['Manage VPS'],
    summary:
      'Portal berita daerah Sumedang. Pengelolaan VPS — keamanan server, performa, dan ketersediaan untuk traffic harian yang konsisten.',
    highlight: 'Infrastruktur VPS yang stabil untuk traffic media',
  },
]

const LOGO_BG: Record<Client['logoBg'], string> = {
  white: 'bg-white',
  black: 'bg-gray-900',
  amber: 'bg-amber-50',
}

export default function PortofolioPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildJsonLd(
              clients.map((c) => ({
                name: c.name,
                url: `https://${c.domain}`,
                description: c.summary,
              })),
            ),
          ),
        }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Portofolio' },
        ]}
      />

      <ServiceHero
        badge="Portofolio"
        headline="Klien Aktif yang Sedang Saya Kelola"
        highlight="Sedang Saya Kelola"
        subheadline="Bukan demo cantik. Website, kampanye iklan, dan infrastruktur yang berjalan setiap hari untuk bisnis nyata di berbagai industri."
        ctaWaKey="portfolio"
        ctaLabel="Bicarakan Proyek Saya"
        socialProof={`${clients.length} klien aktif · ${INDUSTRIES.length}+ industri`}
      />

      <section className="bg-gray-50 border-y border-gray-100 py-16 lg:py-20">
        <div className="container-wide">
          <div className="max-w-5xl mx-auto bg-white border border-gray-200 rounded-2xl p-6 lg:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-center">
              <div className="md:col-span-3 flex justify-center md:justify-start">
                <div className="relative w-32 h-32 rounded-2xl overflow-hidden flex items-center justify-center">
                  <Image
                    src="/images/clients/folkastudio.svg"
                    alt="Logo Folkastudio"
                    width={128}
                    height={128}
                    className="w-full h-full"
                  />
                </div>
              </div>

              <div className="md:col-span-9">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                  Founder
                </span>
                <h2 className="mt-4 font-display font-semibold text-2xl sm:text-3xl lg:text-4xl text-[#111827] tracking-tight leading-[1.1] text-balance">
                  Folkastudio — Studio Digital yang Saya Dirikan
                </h2>
                <p className="mt-4 text-sm sm:text-base text-[#6B7280] leading-relaxed text-pretty">
                  Saya adalah founder <strong className="text-[#111827]">Folkastudio</strong> —
                  studio digital yang sudah dipercaya 50+ bisnis untuk proyek website dan aplikasi.
                  Layanan personal di sini berjalan beriringan dengan Folkastudio untuk proyek
                  yang butuh kapasitas tim lebih besar.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href="https://folkastudio.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:text-amber-800 transition-colors"
                  >
                    Kunjungi folkastudio.com
                    <ExternalLink className="w-3 h-3" aria-hidden="true" />
                  </a>
                  <span className="text-xs text-[#9CA3AF]">50+ proyek · Website &amp; Aplikasi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-5xl mx-auto">
            {clients.map((c) => (
              <article
                key={c.slug}
                className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
              >
                <div className="flex items-start gap-4">
                  <div
                    className={`flex-shrink-0 w-16 h-16 rounded-xl ${LOGO_BG[c.logoBg]} border border-gray-200 overflow-hidden flex items-center justify-center`}
                  >
                    <Image
                      src={c.logo}
                      alt={`Logo ${c.name}`}
                      width={64}
                      height={64}
                      className="object-contain w-full h-full p-2"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h2 className="font-display font-medium text-lg text-[#111827] tracking-tight truncate">
                      {c.name}
                    </h2>
                    <a
                      href={`https://${c.domain}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-0.5 inline-flex items-center gap-1 text-xs text-[#6B7280] hover:text-amber-700 transition-colors"
                    >
                      {c.domain}
                      <ExternalLink className="w-3 h-3" aria-hidden="true" />
                    </a>
                    <p className="mt-1 text-xs text-[#9CA3AF]">{c.industry}</p>
                  </div>
                </div>

                <p className="mt-5 text-sm text-[#6B7280] leading-relaxed">
                  {c.summary}
                </p>

                <p className="mt-4 text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  {c.highlight}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {c.services.map((s) => (
                    <span
                      key={s}
                      className="inline-flex items-center bg-gray-50 border border-gray-200 text-[#374151] text-xs rounded-md px-2 py-0.5"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceProse
        eyebrow="Logo Wall"
        headline="Dipercaya Klien Aktif"
        background="gray"
        paragraphs={[
          'Setiap logo di bawah adalah klien yang sedang berjalan — bukan testimonial satu kali, bukan demo. Hubungan kerja jangka panjang yang terus berlangsung setiap bulan.',
        ]}
      >
        <ul className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-10 items-center">
          {clients.map((c) => (
            <li key={c.slug} className="flex justify-center">
              <a
                href={`https://${c.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Kunjungi ${c.name}`}
                className={
                  c.wallLogoDarkBg
                    ? 'group block w-full h-14 lg:h-16 max-w-[160px] rounded-lg bg-[#1f1f1f] flex items-center justify-center px-3 py-2'
                    : 'group block w-full h-14 lg:h-16 max-w-[160px] flex items-center justify-center'
                }
              >
                <Image
                  src={c.wallLogo}
                  alt={`Logo ${c.name}`}
                  width={160}
                  height={64}
                  className={
                    c.wallLogoDarkBg
                      ? 'object-contain max-h-full max-w-full transition-all duration-300'
                      : 'object-contain max-h-full max-w-full grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300'
                  }
                />
              </a>
            </li>
          ))}
        </ul>
      </ServiceProse>

      <ServiceCardGrid
        eyebrow="Cakupan"
        headline="Industri yang Pernah Ditangani"
        items={INDUSTRIES.map((i) => {
          const Icon = INDUSTRY_ICONS[i.name]
          return {
            icon: Icon ? <Icon className="w-5 h-5" /> : null,
            title: i.name,
            body: 'Pendekatan disesuaikan dengan buyer behavior dan dinamika pencarian industri ini.',
          }
        })}
        columns={3}
      />

      <ServiceCTA
        headline="Punya Proyek yang Mirip?"
        body="Ceritakan kondisi bisnis Anda. Saya bisa share referensi konkret yang relevan saat diskusi langsung."
        ctaWaKey="portfolio"
        ctaLabel="Diskusi via WhatsApp"
        subText="Atau jadwalkan 30 menit via Calendly →"
      />
    </main>
  )
}
