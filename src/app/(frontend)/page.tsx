import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'
import { webPageSchema, safeJsonLd } from '@/lib/seo'
import ClientLogos from '@/components/sections/ClientLogos'
import Stats from '@/components/sections/Stats'
import Problem from '@/components/sections/Problem'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import WhyNoviyanto from '@/components/sections/WhyNoviyanto'
import CTA from '@/components/sections/CTA'
import WebsiteTestimonials from '@/app/(frontend)/layanan/website/_components/WebsiteTestimonials'

// Title beranda sengaja LEBIH LUAS dari /layanan/website/semarang.
// Halaman itu yang memegang exact match "Jasa Pembuatan Website Semarang";
// kalau beranda memakai frasa sama, keduanya berebut kueri yang sama.
//
// Tanpa suffix "| Noviyanto": untuk halaman utama Google menambahkan sendiri
// prefix nama situs dari og:site_name ("Noviyanto: ..."), jadi menaruh brand
// di ekor hanya memakan jatah lebar dua kali. Diukur ~491px dari ambang potong
// ~600px SERP desktop, sudah termasuk prefix Google — sisa ruang ~109px.
const HOME_TITLE = 'Jasa Website & Digital Marketing Semarang'
const HOME_DESCRIPTION =
  'Jasa pembuatan website & digital marketing di Semarang. Bukan sekadar bikin website — Noviyanto bantu bisnis Anda ditemukan di Google dan mendapatkan leads.'

export async function generateMetadata(): Promise<Metadata> {
  const base = await buildMetadata({
    title: HOME_TITLE,
    description: HOME_DESCRIPTION,
    path: '/',
    hasGeneratedOgImage: true,
    keywords: [
      'jasa website',
      'digital marketing',
      'jasa website Semarang',
      'digital marketing Semarang',
      'web developer Semarang',
      'Google Ads Semarang',
      'SEO Semarang',
    ],
  })
  return {
    ...base,
    title: { absolute: HOME_TITLE },
    openGraph: { ...base.openGraph, title: HOME_TITLE },
    twitter: { ...base.twitter, title: HOME_TITLE },
  }
}

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: safeJsonLd(
            webPageSchema({
              url: SITE.url,
              name: HOME_TITLE,
              description: HOME_DESCRIPTION,
            })
          ),
        }}
      />
      {/*
        Preload gambar hero ditangani otomatis oleh <Image priority> di bawah.
        Preload manual dihapus 2026-08-15: kandidat 384w-nya tidak terdaftar di
        `deviceSizes`/`imageSizes` pada next.config.ts, sehingga request-nya
        mengembalikan HTTP 400 dan slot prioritas tinggi untuk LCP terbuang.
      */}
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[78vh] lg:min-h-[82vh]">
        {/* Soft amber glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background:
              'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(245,158,11,0.18), rgba(249,115,22,0.06) 35%, transparent 70%)',
          }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.35]"
          aria-hidden="true"
          style={{
            backgroundImage: 'radial-gradient(rgba(10,10,10,0.08) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
            maskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 50% at 50% 50%, black 30%, transparent 75%)',
          }}
        />

        <div className="container-wide relative z-10 py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* ── Left: text ───────────────────────────── */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs sm:text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Digital Growth Partner · Berbasis di {SITE.baseCity}
              </div>

              {/* H1 — menyebut lokasi agar beranda ikut menargetkan kueri lokal */}
              <h1 className="font-display font-extrabold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl text-balance mb-6 leading-[1.05] tracking-tight text-[#111827]">
                Bisnis Semarang Butuh{' '}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                  Leads
                </span>
                , Bukan Sekadar Website
              </h1>

              {/* Subheadline — menyebut layanan + kota, lalu memperluas ke kota lain */}
              <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto lg:mx-0 mb-8 text-pretty leading-relaxed">
                Jasa pembuatan website dan digital marketing di Semarang — juga melayani
                Jakarta, Bandung, dan kota lain secara remote. Saya bantu bisnis Anda
                ditemukan di Google dan diubah jadi customer nyata.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-stretch sm:items-center">
                <Link
                  href="/kontak"
                  className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                  Konsultasi Gratis
                  <span aria-hidden="true" className="-mr-0.5">→</span>
                </Link>
                <Link
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                  Lihat Layanan
                </Link>
              </div>

              <p className="mt-4 text-xs text-[#6B7280] flex items-center justify-center lg:justify-start gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                Respons cepat di hari kerja · Konsultasi pertama gratis
              </p>

              {/*
                Tautan kontekstual ke halaman kota utama. Sebelumnya halaman ini
                hanya dijangkau dari footer, sehingga bobot tautan internalnya
                jauh lebih kecil daripada relevansinya terhadap kueri target.
              */}
              <p className="mt-5 text-sm">
                <Link
                  href="/layanan/website/semarang"
                  className="inline-flex items-center gap-1.5 rounded-sm font-medium text-[#B45309] underline decoration-[#FDE68A] decoration-2 underline-offset-4 transition-colors hover:text-[#92400E] hover:decoration-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                  Lihat detail jasa pembuatan website di Semarang
                  <span aria-hidden="true">→</span>
                </Link>
              </p>

              {/* Social proof */}
              <p className="mt-6 text-xs sm:text-sm text-[#9CA3AF]">
                Dipercaya <span className="text-[#111827] font-medium">30+ bisnis</span> dari Semarang, Jakarta, Bandung, dan kota lainnya
              </p>
            </div>

            {/* ── Right: profile photo ─────────────────── */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <div className="relative w-full max-w-[280px] sm:max-w-[360px] lg:max-w-[400px] aspect-[3/4]">
                {/* Soft glow */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-6 rounded-[3rem] blur-3xl opacity-40 bg-gradient-to-br from-[#F59E0B]/30 via-[#F97316]/10 to-transparent"
                />

                {/* Photo frame */}
                <div className="relative h-full w-full rounded-2xl overflow-hidden bg-[#F9FAFB] ring-1 ring-[#E5E7EB]">
                  <Image
                    src="/images/noviyanto-profile.webp"
                    alt="Noviyanto — Digital Growth Partner"
                    fill
                    priority
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px"
                    className="object-cover grayscale contrast-[1.05] transition-[filter] duration-500 ease-out hover:grayscale-0"
                  />

                  {/* Bottom gradient overlay */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />

                  {/* Identity strip */}
                  <div className="absolute inset-x-5 bottom-5 flex items-center justify-between gap-3 text-white">
                    <div>
                      <p className="font-display font-bold text-base leading-tight">Noviyanto</p>
                      <p className="text-xs text-white/70">Digital Growth Partner</p>
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-wider px-2 py-1 rounded-full bg-[#22C55E] text-white">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ClientLogos />
      <Stats />
      <Problem />
      <Process />
      <Services />
      <Industries />
      <WhyNoviyanto />
      <WebsiteTestimonials />
      <CTA />
    </>
  )
}
