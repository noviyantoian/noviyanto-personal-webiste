'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Brain, TrendingUp, MessageCircle, type LucideIcon } from 'lucide-react'
import Section from '@/components/ui/Section'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface Reason {
  icon: LucideIcon
  title: string
  description: string
}

const REASONS: Reason[] = [
  {
    icon: Brain,
    title: 'Pendekatan yang kontekstual',
    description:
      'Setiap rekomendasi dimulai dari kondisi dan tujuan bisnis Anda. Kita cari solusi yang paling pas, bersama.',
  },
  {
    icon: TrendingUp,
    title: 'Fokus pada hasil yang terukur',
    description:
      'Setiap layanan diarahkan ke satu tujuan: bisnis Anda mendapat lebih banyak leads dan customer.',
  },
  {
    icon: MessageCircle,
    title: 'Komunikasi yang jelas',
    description:
      'Tidak ada jargon teknis. Setiap keputusan dijelaskan dengan bahasa yang mudah dipahami.',
  },
]

export default function WhyNoviyanto() {
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
          Yang Membedakan
        </h2>
      </motion.div>

      <motion.div
        variants={shouldReduce ? undefined : staggerContainer}
        initial={shouldReduce ? false : 'initial'}
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {REASONS.map((reason) => {
          const Icon = reason.icon
          return (
            <motion.div
              key={reason.title}
              variants={shouldReduce ? undefined : staggerItem}
              className="bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl p-6 lg:p-8 transition-colors duration-200 hover:border-[#F59E0B]/30"
            >
              <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-600 mb-5" aria-hidden="true">
                <Icon className="w-5 h-5" strokeWidth={2} />
              </div>

              <h3 className="font-display font-bold text-lg text-[#111827] mb-3 tracking-tight">
                {reason.title}
              </h3>

              <p className="text-[#6B7280] text-sm leading-relaxed text-pretty">
                {reason.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </Section>
  )
}
