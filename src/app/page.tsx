import type { Metadata } from 'next'
import Image from 'next/image'
import { generateMetadata } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import Stats from '@/components/sections/Stats'
import Problem from '@/components/sections/Problem'
import Process from '@/components/sections/Process'
import Services from '@/components/sections/Services'
import Industries from '@/components/sections/Industries'
import WhyNoviyanto from '@/components/sections/WhyNoviyanto'
import CTA from '@/components/sections/CTA'

const HOME_TITLE = 'Noviyanto: Web Developer & Digital Marketing Expert'
const HOME_DESCRIPTION =
  'Noviyanto — digital growth partner untuk bisnis di Semarang. Bukan sekadar bikin website, kami bantu bisnis Anda mendapatkan leads dan tumbuh secara digital.'

const baseMetadata = generateMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: '/',
  keywords: [
    'web developer',
    'digital marketing expert',
    'jasa website Semarang',
    'digital marketing Semarang',
    'web developer Semarang',
    'Google Ads Semarang',
    'SEO Semarang',
  ],
})

export const metadata: Metadata = {
  ...baseMetadata,
  title: { absolute: HOME_TITLE },
  openGraph: { ...baseMetadata.openGraph, title: HOME_TITLE },
  twitter: { ...baseMetadata.twitter, title: HOME_TITLE },
}

const HERO_IMG_SRCSET =
  '/_next/image?url=%2Fimages%2Fnoviyanto-profile.webp&w=384&q=75 384w, ' +
  '/_next/image?url=%2Fimages%2Fnoviyanto-profile.webp&w=640&q=75 640w, ' +
  '/_next/image?url=%2Fimages%2Fnoviyanto-profile.webp&w=750&q=75 750w'

const HERO_IMG_SIZES = '(max-width: 640px) 280px, (max-width: 1024px) 360px, 400px'

export default function HomePage() {
  return (
    <>
      {/* LCP image preload — App Router hoists to <head> */}
      <link
        rel="preload"
        as="image"
        href="/_next/image?url=%2Fimages%2Fnoviyanto-profile.webp&w=384&q=75"
        imageSrcSet={HERO_IMG_SRCSET}
        imageSizes={HERO_IMG_SIZES}
        fetchPriority="high"
      />
      {/* Hero Section */}
      <section className="relative flex items-center justify-center overflow-hidden min-h-[88vh] lg:min-h-screen">
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

        <div className="container-wide relative z-10 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* ── Left: text ───────────────────────────── */}
            <div className="lg:col-span-7 text-center lg:text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs sm:text-sm font-medium mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
                Digital Growth Partner · {SITE.location}
              </div>

              {/* H1 */}
              <h1 className="font-display font-extrabold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-[4.25rem] xl:text-7xl text-balance mb-6 leading-[1.05] tracking-tight text-[#111827]">
                Bisnis Anda Butuh{' '}
                <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
                  Leads
                </span>
                , Bukan Sekadar Website
              </h1>

              {/* Subheadline */}
              <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto lg:mx-0 mb-8 text-pretty leading-relaxed">
                Saya bantu bisnis Anda ditemukan di Google dan diubah jadi customer nyata —
                lewat website, iklan, dan strategi digital yang sudah terbukti.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start items-stretch sm:items-center">
                <a
                  href={`https://wa.me/${SITE.waNumber}?text=${encodeURIComponent('Halo Noviyanto, saya ingin konsultasi tentang kebutuhan digital bisnis saya.')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                  Konsultasi Gratis via WhatsApp
                  <span aria-hidden="true" className="-mr-0.5">→</span>
                </a>
                <a
                  href="/layanan"
                  className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
                >
                  Lihat Layanan
                </a>
              </div>

              <p className="mt-4 text-xs text-[#6B7280] flex items-center justify-center lg:justify-start gap-2">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
                Respons cepat di hari kerja · Konsultasi pertama gratis
              </p>

              {/* Social proof */}
              <p className="mt-6 text-xs sm:text-sm text-[#9CA3AF]">
                Dipercaya <span className="text-[#111827] font-medium">30+ bisnis</span> dari Jakarta, Bandung, Semarang, dan kota lainnya
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

      <Stats />
      <Problem />
      <Process />
      <Services />
      <Industries />
      <WhyNoviyanto />
      {/* Testimonials slot — TBD */}
      <CTA />
    </>
  )
}
