'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import { WA_MESSAGES } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

type WaKey = keyof typeof WA_MESSAGES

interface ServiceCTAProps {
  headline: string
  body: string
  ctaWaKey: WaKey
  ctaLabel?: string
  subText?: string
}

export default function ServiceCTA({
  headline,
  body,
  ctaWaKey,
  ctaLabel = 'Konsultasi Gratis',
  subText,
}: ServiceCTAProps) {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section className="relative overflow-hidden bg-white py-24 lg:py-32">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(245,158,11,0.10), transparent 70%)',
        }}
      />
      <div className="container-wide relative z-10">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-2xl mx-auto text-center"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs font-medium">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            Konsultasi Gratis
          </span>

          <h2 className="mt-6 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            {headline}
          </h2>

          <p className="mt-6 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
            {body}
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/kontak"
              onClick={() =>
                trackEvent('cta_click', { location: 'service_cta_bottom', page: ctaWaKey })
              }
              className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
            >
              {ctaLabel}
              <span aria-hidden="true" className="-mr-0.5">→</span>
            </Link>
          </div>

          <p className="mt-4 text-xs text-[#6B7280] flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            Isi form singkat · lanjut diskusi via WhatsApp · tanpa biaya konsultasi awal
          </p>

          {subText ? <p className="mt-4 text-sm text-[#9CA3AF]">{subText}</p> : null}
        </motion.div>
      </div>
    </section>
  )
}
