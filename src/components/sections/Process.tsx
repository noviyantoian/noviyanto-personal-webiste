'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Section from '@/components/ui/Section'
import { staggerContainer, staggerItem } from '@/lib/animations'

const STEPS = [
  {
    number: '01',
    title: 'Konsultasi',
    description: 'Ceritakan bisnis dan target Anda. Gratis, tanpa komitmen.',
  },
  {
    number: '02',
    title: 'Strategi',
    description:
      'Saya rancang solusi yang sesuai anggaran dan tujuan bisnis Anda — bukan paket standar.',
  },
  {
    number: '03',
    title: 'Eksekusi',
    description:
      'Website dibuat, iklan dijalankan, traffic dibangun. Anda fokus ke bisnis, saya urus digitalnya.',
  },
] as const

export default function Process() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <Section>
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center mb-16"
      >
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111827] mb-6 text-balance tracking-tight">
          Bukan Vendor.{' '}
          <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
            Partner.
          </span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed text-pretty">
          Kebanyakan vendor selesaikan pekerjaan lalu pergi. Saya tidak seperti itu.
        </p>
      </motion.div>

      <motion.div
        variants={shouldReduce ? undefined : staggerContainer}
        initial={shouldReduce ? false : 'initial'}
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto"
      >
        {STEPS.map((step) => (
          <motion.div
            key={step.number}
            variants={shouldReduce ? undefined : staggerItem}
            className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-8 transition-colors duration-200 hover:border-[#F59E0B]/30"
          >
            <div className="font-display font-extrabold text-5xl lg:text-6xl text-[#F59E0B] mb-5 leading-none">
              {step.number}
            </div>
            <h3 className="font-display font-bold text-xl text-[#111827] mb-3 tracking-normal">{step.title}</h3>
            <p className="text-[#6B7280] leading-relaxed text-pretty">{step.description}</p>
          </motion.div>
        ))}
      </motion.div>
    </Section>
  )
}
