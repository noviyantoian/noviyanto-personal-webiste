'use client'

import { motion, useReducedMotion } from 'framer-motion'
import Section from '@/components/ui/Section'

export default function Problem() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <Section className="bg-[#F9FAFB]">
      <motion.div
        initial={shouldReduce ? false : { opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-100px' }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#111827] mb-8 text-balance tracking-tight">
          Kenapa Website Anda Tidak Menghasilkan?
        </h2>

        <div className="space-y-6 text-[#6B7280] text-base sm:text-lg leading-relaxed text-pretty">
          <p>
            Sudah punya website, tapi tidak ada inquiry yang masuk. Sudah coba iklan, tapi
            hasilnya tidak sepadan.
          </p>
          <p>
            Masalahnya bukan di alatnya, tapi di strateginya.
            <span className="text-[#111827] font-medium"> Dan itu yang bisa kita benahi bersama.</span>
          </p>
        </div>
      </motion.div>
    </Section>
  )
}
