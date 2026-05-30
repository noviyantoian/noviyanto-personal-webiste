'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

const POINTS = [
  'Kecepatan loading — Google sangat memperhatikan ini',
  'Struktur konten yang mendukung SEO sejak hari pertama',
  'Call-to-action yang natural, bukan terasa memaksa',
  'Tampilan di mobile yang sama baiknya dengan desktop',
  'Integrasi dengan WhatsApp, form, atau sistem booking',
]

export default function WebsiteApproach() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-y border-gray-100">
      <div className="container-wide">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-5"
          >
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
              Pendekatan
            </span>
            <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#111827] tracking-tight leading-[1.1] text-balance">
              Website Dibuat Berdasarkan Tujuan Bisnis, Bukan Preferensi Visual
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-base sm:text-lg text-[#4B5563] leading-relaxed text-pretty">
              Sebelum mulai desain, ada pertanyaan yang lebih penting: siapa yang
              akan mengunjungi website ini? Dari mana mereka datang? Apa yang ingin
              mereka temukan? Dan apa yang ingin Anda minta mereka lakukan?
            </p>
            <p className="mt-4 text-base sm:text-lg text-[#4B5563] leading-relaxed text-pretty">
              Dari jawaban itu, struktur halaman, konten, dan desain dirancang.
              Bukan sebaliknya.
            </p>

            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              <p className="text-sm font-semibold text-[#111827] mb-4">
                Yang diperhatikan dari awal:
              </p>
              <ul className="space-y-3">
                {POINTS.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={shouldReduce ? false : { opacity: 0, x: -8 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className="flex items-start gap-3 text-sm text-[#374151]"
                  >
                    <span className="flex-shrink-0 mt-0.5 w-5 h-5 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
                      <Check className="w-3 h-3" aria-hidden="true" strokeWidth={3} />
                    </span>
                    <span className="leading-relaxed">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
