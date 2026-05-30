'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Button from '@/components/ui/Button'

export default function CTA() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section className="relative overflow-hidden bg-[#FFFFFF] py-24 lg:py-32">
      {/* Subtle amber radial glow */}
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
          className="max-w-xl mx-auto text-center"
        >
          <h2 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-[#111827] mb-6 text-balance leading-[1.1] tracking-tight">
            Mulai dengan{' '}
            <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
              Satu Percakapan
            </span>
          </h2>

          <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed text-pretty mb-10">
            Ceritakan kondisi bisnis dan target Anda lewat form singkat. Konsultasi pertama gratis,
            tanpa tekanan.
          </p>

          <div className="flex justify-center">
            <Button variant="primary" size="lg" href="/kontak" trackLocation="homepage_cta">
              Konsultasi Gratis
            </Button>
          </div>

          <p className="mt-6 text-sm text-[#9CA3AF]">
            Isi form singkat, lalu lanjut diskusi langsung via WhatsApp.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
