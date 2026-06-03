'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { trackEvent } from '@/lib/analytics'

interface FAQItem {
  question: string
  answer: string
}

interface ServiceFAQProps {
  items: FAQItem[]
  title?: string
}

export default function ServiceFAQ({ items, title = 'Pertanyaan Umum' }: ServiceFAQProps) {
  const [openIdx, setOpenIdx] = useState<number | null>(null)
  const shouldReduce = useReducedMotion() ?? false

  const toggle = (idx: number, question: string) => {
    const next = openIdx === idx ? null : idx
    setOpenIdx(next)
    if (next === idx) {
      trackEvent('faq_expand', { question })
    }
  }

  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-y border-gray-100">
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <div className="text-center mb-10">
            <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
              FAQ
            </span>
            <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
              {title}
            </h2>
          </div>

          <ul className="divide-y divide-gray-200 bg-white border border-gray-200 rounded-2xl px-6">
            {items.map((item, idx) => {
              const isOpen = openIdx === idx
              return (
                <li key={item.question} className="py-4">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(idx, item.question)}
                    className="w-full flex justify-between items-center text-left text-base font-medium text-gray-900 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 rounded-md"
                  >
                    <span className="pr-4">{item.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      aria-hidden="true"
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        key="content"
                        initial={shouldReduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={shouldReduce ? { height: 'auto' } : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="text-base text-[#6B7280] leading-relaxed mt-3">
                          {item.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
