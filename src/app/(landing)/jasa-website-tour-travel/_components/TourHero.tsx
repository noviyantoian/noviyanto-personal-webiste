'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Star, Award, ThumbsUp } from 'lucide-react'

interface TourHeroProps {
  onConsult: (pkg?: string) => void
}

export default function TourHero({ onConsult }: TourHeroProps) {
  const shouldReduce = useReducedMotion() ?? false

  const motionProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <section
      id="hero"
      className="relative flex items-center overflow-hidden pt-24 pb-20 lg:pt-32 lg:pb-28"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 65% 50% at 50% 0%, rgba(245,158,11,0.15), rgba(249,115,22,0.05) 40%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.3]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(10,10,10,0.07) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 65% 55% at 50% 40%, black 30%, transparent 75%)',
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <motion.div {...motionProps} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs sm:text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            ✦ Spesialis Website Tour &amp; Travel
          </div>

          <h1 className="font-display font-semibold text-[2.4rem] sm:text-5xl md:text-6xl lg:text-[4rem] text-balance leading-[1.06] tracking-tight text-[#111827] mb-6">
            Website Tour &amp; Travel yang Bikin{' '}
            <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
              Calon Wisatawan
            </span>{' '}
            Langsung Klik &ldquo;Pesan Sekarang&rdquo;
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
            Noviyanto bangun website profesional khusus bisnis tour &amp; travel Anda — lengkap
            dengan sistem booking online, integrasi WhatsApp, desain yang meyakinkan, dan SEO yang
            mendatangkan pelanggan organik dari Google.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 mb-10">
            <button
              type="button"
              onClick={() => onConsult()}
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#111827] font-semibold text-base rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
            >
              📱 Mulai Konsultasi Gratis
            </button>
            <a
              href="#portofolio"
              className="inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-[#E5E7EB] hover:border-[#D97706] hover:bg-[#FFFBEB] text-[#374151] font-medium text-base rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
            >
              Lihat Portofolio
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-[#6B7280]">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-[#F59E0B] fill-[#F59E0B]" aria-hidden="true" />
              50+ Website Terbangun
            </span>
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
              5 Tahun Pengalaman
            </span>
            <span className="flex items-center gap-1.5">
              <ThumbsUp className="w-4 h-4 text-[#F59E0B]" aria-hidden="true" />
              Garansi Kepuasan
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
