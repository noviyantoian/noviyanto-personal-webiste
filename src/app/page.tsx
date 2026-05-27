import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { SITE } from '@/lib/constants'

export const metadata: Metadata = generateMetadata({
  title: 'Web Development & Digital Marketing Semarang',
  description:
    'Noviyanto — digital growth partner untuk bisnis di Semarang. Bukan sekadar bikin website, kami bantu bisnis Anda mendapatkan leads dan tumbuh secara digital.',
  path: '/',
  keywords: [
    'jasa website Semarang',
    'digital marketing Semarang',
    'web developer Semarang',
    'Google Ads Semarang',
    'SEO Semarang',
  ],
})

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 50% -10%, rgba(245,158,11,0.12), transparent 70%)',
          }}
        />

        <div className="container-wide relative z-10 text-center py-32">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#F59E0B]/30 bg-[#F59E0B]/5 text-[#F59E0B] text-sm font-medium mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            Digital Growth Partner · {SITE.location}
          </div>

          {/* H1 */}
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl xl:text-8xl text-balance mb-6 leading-[1.05]">
            Bisnis Anda Perlu{' '}
            <span
              className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent"
            >
              Lebih dari
            </span>
            <br />
            Sekadar Website
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-[#A3A3A3] max-w-2xl mx-auto mb-10 text-pretty">
            Website yang bagus tidak otomatis menghasilkan customer. Saya bantu bisnis Anda
            mendapatkan leads nyata dari Google — lewat strategi digital yang sudah terbukti
            di 7 industri berbeda.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href={`https://wa.me/${SITE.waNumber}?text=${encodeURIComponent('Halo Noviyanto, saya ingin konsultasi tentang kebutuhan digital bisnis saya.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706]
                         text-black font-semibold rounded-xl transition-colors duration-200
                         text-base min-w-[220px] justify-center"
            >
              Konsultasi Gratis via WhatsApp
            </a>
            <a
              href={SITE.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 border border-[#262626]
                         hover:border-[#F59E0B]/40 hover:bg-[#141414] text-[#FAFAFA]
                         rounded-xl transition-colors duration-200 text-base"
            >
              Jadwalkan Meeting 30 Menit →
            </a>
          </div>

          {/* Social proof */}
          <p className="mt-8 text-sm text-[#525252]">
            Sudah membantu 30+ bisnis di Semarang, Kendal, dan Salatiga tumbuh secara digital
          </p>
        </div>
      </section>

      {/* TODO: Stats, Services, Industries, WhyNoviyanto, Testimonials, CTA sections */}
      {/* Sections akan dibangun sebagai komponen terpisah */}
    </>
  )
}
