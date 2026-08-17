'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

import { FAQ_ITEMS, type FAQItem } from './faqItems'

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-[#F9FAFB] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-inset"
      >
        <span className="font-medium text-[#111827] text-sm sm:text-base">{item.question}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {/*
        Panel selalu ada di DOM (disembunyikan lewat grid-rows), bukan
        di-unmount. Dengan begitu jawaban ikut terkirim di HTML server —
        crawler membacanya tanpa harus mengeksekusi JavaScript.
      */}
      <div
        id={id}
        className={`grid bg-white transition-[grid-template-rows] duration-200 ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
        }`}
      >
        <div className="overflow-hidden">
          <p className="px-5 pb-4 text-sm sm:text-base text-[#6B7280] leading-relaxed">
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TourFAQ() {
  return (
    <section id="faq" className="bg-[#F9FAFB] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-[#6B7280]">Kami jawab semua di sini</p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
