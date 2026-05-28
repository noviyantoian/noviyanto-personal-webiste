'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { getWaLink, WA_MESSAGES, SITE } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

type WaKey = keyof typeof WA_MESSAGES

interface ServiceHeroProps {
  badge: string
  headline: string
  highlight?: string
  subheadline: string
  ctaWaKey: WaKey
  ctaLabel?: string
  socialProof?: string
}

function renderHeadline(headline: string, highlight?: string) {
  if (!highlight) return headline
  const idx = headline.indexOf(highlight)
  if (idx === -1) return headline
  const before = headline.slice(0, idx)
  const after = headline.slice(idx + highlight.length)
  return (
    <>
      {before}
      <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
        {highlight}
      </span>
      {after}
    </>
  )
}

export default function ServiceHero({
  badge,
  headline,
  highlight,
  subheadline,
  ctaWaKey,
  ctaLabel = 'Konsultasi Gratis via WhatsApp',
  socialProof,
}: ServiceHeroProps) {
  const shouldReduce = useReducedMotion() ?? false

  const motionProps = shouldReduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: '-80px' },
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
      }

  return (
    <section className="relative flex items-center overflow-hidden pt-16 pb-20 lg:pt-24 lg:pb-28">
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 50% 0%, rgba(245,158,11,0.18), rgba(249,115,22,0.06) 35%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.35]"
        aria-hidden="true"
        style={{
          backgroundImage:
            'radial-gradient(rgba(10,10,10,0.08) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          maskImage:
            'radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 75%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 60% 50% at 50% 40%, black 30%, transparent 75%)',
        }}
      />

      <div className="container-wide relative z-10">
        <motion.div {...motionProps} className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-xs sm:text-sm font-medium mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
            {badge}
          </div>

          <h1 className="font-display font-semibold text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl text-balance leading-[1.05] tracking-tight text-[#111827] mb-6">
            {renderHeadline(headline, highlight)}
          </h1>

          <p className="text-base sm:text-lg text-[#6B7280] max-w-2xl mx-auto mb-8 text-pretty leading-relaxed">
            {subheadline}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center items-stretch sm:items-center">
            <a
              href={getWaLink(ctaWaKey)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent('cta_click', { location: 'service_hero', page: ctaWaKey })
              }
              className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
            >
              {ctaLabel}
              <span aria-hidden="true" className="-mr-0.5">→</span>
            </a>
            <a
              href={SITE.calendlyUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackEvent('calendly_open', { location: 'service_hero' })}
              className="inline-flex items-center justify-center gap-2 h-12 sm:h-14 px-7 sm:px-8 bg-white hover:bg-[#F9FAFB] active:bg-[#F3F4F6] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#111827] font-medium text-[15px] sm:text-base tracking-[-0.01em] leading-none rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
            >
              Jadwalkan Meeting
            </a>
          </div>

          <p className="mt-4 text-xs text-[#6B7280] flex items-center justify-center gap-2">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" aria-hidden="true" />
            Respons cepat di hari kerja · Konsultasi pertama gratis
          </p>

          {socialProof ? (
            <p className="mt-6 text-xs sm:text-sm text-[#9CA3AF]">{socialProof}</p>
          ) : null}
        </motion.div>
      </div>
    </section>
  )
}
