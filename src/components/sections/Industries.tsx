'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  Cpu,
  Home,
  Plane,
  Gem,
  Scale,
  Building2,
  ShoppingBag,
  type LucideIcon,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import { staggerContainer, staggerItem } from '@/lib/animations'

interface Industry {
  name: string
  icon: LucideIcon
  note?: string
}

const INDUSTRIES_LIST: Industry[] = [
  { name: 'B2B IT & Teknologi', icon: Cpu },
  { name: 'Home Service', icon: Home, note: 'Home Spa · Bersih Rumah · Les Private' },
  { name: 'Tour & Travel', icon: Plane },
  { name: 'Perhiasan & Jewelry', icon: Gem },
  { name: 'Firma Hukum & Legal', icon: Scale },
  { name: 'Sewa Kantor & Virtual Office', icon: Building2 },
  { name: 'E-commerce', icon: ShoppingBag },
]

export default function Industries() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <Section>
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center mb-14"
      >
        <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFFBEB] border border-[#FDE68A] text-[#B45309] text-xs font-medium mb-5">
          Pengalaman Multi-Industri
        </span>
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111827] mb-5 text-balance tracking-tight">
          Pengalaman di Lapangan, Bukan Teori
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed text-pretty">
          Setiap industri punya buyer behavior yang berbeda. Saya sudah pernah bekerja langsung di:
        </p>
      </motion.div>

      <motion.ul
        variants={shouldReduce ? undefined : staggerContainer}
        initial={shouldReduce ? false : 'initial'}
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 max-w-6xl mx-auto"
      >
        {INDUSTRIES_LIST.map((industry) => {
          const Icon = industry.icon
          return (
            <motion.li
              key={industry.name}
              variants={shouldReduce ? undefined : staggerItem}
              className="group relative flex flex-col gap-3 p-5 lg:p-6 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] transition-all duration-200 hover:bg-[#FFFFFF] hover:border-[#F59E0B]/40 hover:shadow-[0_8px_24px_-12px_rgba(17,24,39,0.12)]"
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#FFFFFF] border border-[#E5E7EB] text-[#F59E0B] group-hover:bg-[#FFFBEB] group-hover:border-[#FDE68A] transition-colors duration-200">
                <Icon className="w-5 h-5" strokeWidth={2} aria-hidden="true" />
              </div>
              <div>
                <p className="font-display font-semibold text-sm sm:text-base text-[#111827] leading-tight">
                  {industry.name}
                </p>
                {industry.note && (
                  <p className="mt-1 text-xs text-[#9CA3AF] leading-snug">{industry.note}</p>
                )}
              </div>
            </motion.li>
          )
        })}
      </motion.ul>

      {/* Trust strip */}
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-50px' }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-[#6B7280]"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
          <span>Pengalaman langsung di setiap industri</span>
        </div>
        <span className="hidden sm:block w-1 h-1 rounded-full bg-[#E5E7EB]" aria-hidden="true" />
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" aria-hidden="true" />
          <span>3+ tahun menangani buyer behavior berbeda</span>
        </div>
      </motion.div>
    </Section>
  )
}
