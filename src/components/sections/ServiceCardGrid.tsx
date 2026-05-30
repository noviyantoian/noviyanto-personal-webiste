'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export interface ServiceCardItem {
  icon?: ReactNode
  title: string
  body: string
}

interface ServiceCardGridProps {
  eyebrow: string
  headline: string
  intro?: string
  items: ServiceCardItem[]
  columns?: 2 | 3
  background?: 'white' | 'gray'
}

export default function ServiceCardGrid({
  eyebrow,
  headline,
  intro,
  items,
  columns = 2,
  background = 'white',
}: ServiceCardGridProps) {
  const shouldReduce = useReducedMotion() ?? false
  const bg =
    background === 'gray'
      ? 'bg-gray-50 border-y border-gray-100'
      : 'bg-white'
  const gridCols =
    columns === 3
      ? 'md:grid-cols-2 lg:grid-cols-3'
      : 'md:grid-cols-2'

  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            {headline}
          </h2>
          {intro ? (
            <p className="mt-6 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
              {intro}
            </p>
          ) : null}
        </motion.div>

        <div className={`grid grid-cols-1 ${gridCols} gap-4 lg:gap-5 max-w-5xl mx-auto`}>
          {items.map((c, i) => (
            <motion.article
              key={c.title}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
            >
              {c.icon ? (
                <div
                  className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4"
                  aria-hidden="true"
                >
                  {c.icon}
                </div>
              ) : null}
              <h3 className="font-display font-medium text-lg text-[#111827] tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-sm text-[#6B7280] leading-relaxed">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
