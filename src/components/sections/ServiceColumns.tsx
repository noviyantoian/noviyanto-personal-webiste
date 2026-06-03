'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Plus, X } from 'lucide-react'
import type { ReactNode } from 'react'

type IconKind = 'check' | 'plus' | 'x'

export interface ServiceColumnDef {
  badge: string
  badgeTone: 'amber' | 'gray' | 'red'
  title: string
  items: string[]
  icon: IconKind
}

interface ServiceColumnsProps {
  eyebrow: string
  headline: string
  intro?: string
  columns: ServiceColumnDef[]
  background?: 'white' | 'gray'
}

const TONE_CLASS: Record<ServiceColumnDef['badgeTone'], string> = {
  amber: 'bg-amber-50 border border-amber-200 text-amber-800',
  gray: 'bg-gray-50 border border-gray-200 text-gray-600',
  red: 'bg-red-50 border border-red-200 text-red-700',
}

const ICON_BG: Record<IconKind, string> = {
  check: 'bg-amber-50 text-amber-600',
  plus: 'bg-gray-100 text-gray-500',
  x: 'bg-red-50 text-red-500',
}

function renderIcon(kind: IconKind): ReactNode {
  if (kind === 'check') return <Check className="w-3 h-3" aria-hidden="true" strokeWidth={3} />
  if (kind === 'plus') return <Plus className="w-3 h-3" aria-hidden="true" strokeWidth={3} />
  return <X className="w-3 h-3" aria-hidden="true" strokeWidth={3} />
}

export default function ServiceColumns({
  eyebrow,
  headline,
  intro,
  columns,
  background = 'white',
}: ServiceColumnsProps) {
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

        <div
          className={`grid grid-cols-1 ${columns.length >= 2 ? 'md:grid-cols-2' : ''} gap-6 max-w-5xl mx-auto`}
        >
          {columns.map((col, ci) => (
            <motion.div
              key={col.title}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.55, delay: ci * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8"
            >
              <span
                className={`inline-flex items-center text-xs font-medium rounded-full px-3 py-1 ${TONE_CLASS[col.badgeTone]}`}
              >
                {col.badge}
              </span>
              <h3 className="mt-4 text-xl lg:text-2xl font-display font-semibold text-[#111827] tracking-normal">
                {col.title}
              </h3>
              <ul className="mt-6 space-y-3">
                {col.items.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-base text-[#374151]">
                    <span
                      className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${ICON_BG[col.icon]}`}
                    >
                      {renderIcon(col.icon)}
                    </span>
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
