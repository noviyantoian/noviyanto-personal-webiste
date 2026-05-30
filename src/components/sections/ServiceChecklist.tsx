'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'

interface ServiceChecklistProps {
  eyebrow: string
  headline: string
  paragraphs?: string[]
  bulletTitle?: string
  bullets: string[]
  background?: 'white' | 'gray'
}

export default function ServiceChecklist({
  eyebrow,
  headline,
  paragraphs,
  bulletTitle,
  bullets,
  background = 'gray',
}: ServiceChecklistProps) {
  const shouldReduce = useReducedMotion() ?? false
  const bg =
    background === 'gray'
      ? 'bg-gray-50 border-y border-gray-100'
      : 'bg-white'

  return (
    <section className={`${bg} py-20 lg:py-28`}>
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
              {eyebrow}
            </span>
            <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-[2.75rem] text-[#111827] tracking-tight leading-[1.1] text-balance">
              {headline}
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7"
          >
            {paragraphs?.map((p, i) => (
              <p
                key={i}
                className={`text-base sm:text-lg text-[#4B5563] leading-relaxed text-pretty ${i === 0 ? '' : 'mt-4'}`}
              >
                {p}
              </p>
            ))}

            <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
              {bulletTitle ? (
                <p className="text-sm font-semibold text-[#111827] mb-4">{bulletTitle}</p>
              ) : null}
              <ul className="space-y-3">
                {bullets.map((point, i) => (
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
