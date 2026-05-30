'use client'

import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

interface ServiceProseProps {
  eyebrow: string
  headline: string
  paragraphs?: (string | ReactNode)[]
  chips?: string[]
  background?: 'white' | 'gray'
  align?: 'center' | 'left'
  children?: ReactNode
}

export default function ServiceProse({
  eyebrow,
  headline,
  paragraphs,
  chips,
  background = 'white',
  align = 'center',
  children,
}: ServiceProseProps) {
  const shouldReduce = useReducedMotion() ?? false
  const bg =
    background === 'gray'
      ? 'bg-gray-50 border-y border-gray-100'
      : 'bg-white'
  const alignClass = align === 'center' ? 'text-center mx-auto' : 'text-left'

  return (
    <section className={`${bg} py-20 lg:py-28`}>
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className={`max-w-3xl ${alignClass}`}
        >
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
            {eyebrow}
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            {headline}
          </h2>

          {paragraphs?.map((p, i) => (
            <p
              key={i}
              className="mt-6 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty first-of-type:mt-6 [&:not(:first-of-type)]:mt-4"
            >
              {p}
            </p>
          ))}

          {chips ? (
            <ul className="mt-8 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <li
                  key={c}
                  className="inline-flex items-center bg-white border border-gray-200 text-[#374151] text-xs font-medium rounded-full px-3 py-1.5"
                >
                  {c}
                </li>
              ))}
            </ul>
          ) : null}

          {children}
        </motion.div>
      </div>
    </section>
  )
}
