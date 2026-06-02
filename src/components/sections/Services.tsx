'use client'

import Link from 'next/link'
import { motion, useReducedMotion } from 'framer-motion'
import {
  Globe,
  TrendingUp,
  Search,
  Target,
  Sparkles,
  Smartphone,
  ShieldCheck,
  type LucideIcon,
} from 'lucide-react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { services } from '@/content/services'
import { staggerContainer, staggerItem } from '@/lib/animations'

const ICON_MAP: Record<string, LucideIcon> = {
  website: Globe,
  'google-ads': TrendingUp,
  seo: Search,
  'digital-marketing': Target,
  'ai-integration': Sparkles,
  'mobile-app': Smartphone,
  maintenance: ShieldCheck,
}

export default function Services() {
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
          Apa yang Bisa Saya Bantu
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed text-pretty">
          Setiap layanan dirancang untuk satu tujuan: bisnis Anda mendapat lebih banyak leads
          dan customer.
        </p>
      </motion.div>

      <motion.div
        variants={shouldReduce ? undefined : staggerContainer}
        initial={shouldReduce ? false : 'initial'}
        whileInView="animate"
        viewport={{ once: true, margin: '-100px' }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {services.map((service) => {
          const Icon = ICON_MAP[service.slug] ?? Globe
          return (
            <motion.div key={service.slug} variants={shouldReduce ? undefined : staggerItem}>
              <Link
                href={`/layanan/${service.slug}`}
                className="group flex flex-col h-full px-6 py-8 rounded-2xl bg-[#F9FAFB] border border-[#E5E7EB] transition-colors duration-200 hover:bg-[#F3F4F6] hover:border-[#F59E0B]/40"
              >
                <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-amber-50 text-amber-600 group-hover:bg-amber-100 transition-colors mb-5" aria-hidden="true">
                  <Icon className="w-5 h-5" strokeWidth={2} />
                </div>

                <h3 className="font-display font-bold text-lg text-[#111827] mb-2 tracking-tight">
                  {service.title}
                </h3>

                <p className="text-[#6B7280] text-sm leading-relaxed text-pretty">
                  {service.description}
                </p>
              </Link>
            </motion.div>
          )
        })}
      </motion.div>

      <div className="mt-14 flex justify-center">
        <Button variant="secondary" href="/layanan">
          Lihat Semua Layanan
        </Button>
      </div>
    </Section>
  )
}
