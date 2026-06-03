import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { breadcrumbSchema, collectionPageSchema, safeJsonLd } from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE, SERVICE_LINKS } from '@/lib/constants'
import { services } from '@/content/services'
import { SERVICE_ICONS } from '@/lib/icons'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan'
const URL = `${SITE.url}${PATH}`

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Layanan — Web Development, Iklan, SEO, dan AI',
    description:
      'Layanan digital end-to-end: pembuatan website, Google Ads, SEO, digital marketing, AI integration, aplikasi mobile, dan maintenance.',
    path: PATH,
    keywords: [
      'jasa web development',
      'jasa digital marketing',
      'jasa SEO',
      'jasa Google Ads',
    ],
    hasGeneratedOgImage: true,
  })
}

const jsonLd = [
  collectionPageSchema({
    url: URL,
    name: 'Layanan Digital — Noviyanto',
    description:
      'Layanan digital end-to-end: web development, Google Ads, SEO, digital marketing, AI integration, mobile app, dan maintenance.',
    items: SERVICE_LINKS.map((s) => ({
      name: s.label,
      url: `${SITE.url}${s.href}`,
    })),
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: URL },
  ]),
]

const SLUG_TO_PATH = Object.fromEntries(
  SERVICE_LINKS.map((s) => [s.slug, s.href]),
)

export default function LayananPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan' },
        ]}
      />

      <ServiceHero
        badge="Layanan"
        headline="Solusi Digital yang Dirancang dari Tujuan Bisnis Anda"
        highlight="Tujuan Bisnis Anda"
        subheadline="Dari website yang menghasilkan leads sampai sistem otomasi yang menghemat puluhan jam per minggu. Setiap layanan ada tempatnya — saya bantu pilih yang paling masuk akal untuk kondisi Anda."
        ctaWaKey="default"
        ctaLabel="Konsultasi Gratis"
        socialProof="30+ proyek · 7 industri · 3+ tahun pengalaman"
      />

      <section className="bg-white py-20 lg:py-28">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {services.map((s) => {
              const href = SLUG_TO_PATH[s.slug] ?? `/layanan/${s.slug}`
              const Icon = SERVICE_ICONS[s.slug] ?? SERVICE_ICONS.website
              return (
                <article
                  key={s.slug}
                  className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 flex flex-col"
                >
                  <div className="mb-4">
                    <div
                      className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h2 className="font-display font-semibold text-xl text-[#111827] tracking-normal">
                    {s.title}
                  </h2>
                  <p className="mt-2.5 text-base text-[#4B5563] leading-relaxed flex-1">
                    {s.description}
                  </p>

                  <ul className="mt-5 space-y-2 text-base text-[#6B7280]">
                    {s.features.slice(0, 3).map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <span className="text-amber-500 mt-0.5">·</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={href}
                    className="mt-6 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 hover:gap-2 hover:text-amber-600 transition-all self-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-sm"
                  >
                    Pelajari lebih lanjut
                    <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                  </Link>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <ServiceCTA
        headline="Tidak Yakin Layanan Mana yang Anda Butuhkan?"
        body="Itu normal. Banyak kasus, solusi yang paling efektif bukan yang paling mahal. Ceritakan kondisi bisnis Anda, saya bantu pilih yang paling masuk akal."
        ctaWaKey="default"
        ctaLabel="Diskusi via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </main>
  )
}
