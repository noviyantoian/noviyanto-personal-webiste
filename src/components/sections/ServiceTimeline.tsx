'use client'

import { motion, useReducedMotion } from 'framer-motion'

export interface ServiceTimelineStep {
  label?: string
  title: string
  description: string
}

interface ServiceTimelineProps {
  eyebrow: string
  headline: string
  intro?: string
  steps: ServiceTimelineStep[]
  background?: 'white' | 'gray'
}

export default function ServiceTimeline({
  eyebrow,
  headline,
  intro,
  steps,
  background = 'white',
}: ServiceTimelineProps) {
  const shouldReduce = useReducedMotion() ?? false
  const bg =
    background === 'gray'
      ? 'bg-gray-50 border-y border-gray-100'
      : 'bg-white'

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

        <ol className="relative max-w-3xl mx-auto">
          <div
            aria-hidden="true"
            className="absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-amber-200 via-amber-100 to-transparent"
          />
          {steps.map((step, i) => (
            <motion.li
              key={step.title}
              initial={shouldReduce ? false : { opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
              className="relative pl-14 pb-10 last:pb-0"
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border border-amber-200 text-amber-700 font-display font-medium flex items-center justify-center text-sm shadow-sm"
              >
                {i + 1}
              </span>
              <div className="flex items-baseline gap-3 flex-wrap">
                <h3 className="font-display font-medium text-lg text-[#111827] tracking-tight">
                  {step.title}
                </h3>
                {step.label ? (
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 border border-amber-200 rounded-full px-2 py-0.5">
                    {step.label}
                  </span>
                ) : null}
              </div>
              <p className="mt-2 text-base sm:text-lg text-[#6B7280] leading-relaxed">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
