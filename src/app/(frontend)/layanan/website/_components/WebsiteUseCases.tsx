'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Home, Briefcase, Plane, ShoppingBag } from 'lucide-react'
import type { ReactNode } from 'react'

interface UseCase {
  icon: ReactNode
  title: string
  body: string
}

const CASES: UseCase[] = [
  {
    icon: <Home className="w-5 h-5" />,
    title: 'Bisnis jasa dan layanan lokal',
    body: 'Home spa panggilan, jasa bersih, les private, laundry, catering — bisnis yang butuh website sederhana tapi langsung bisa ditemukan calon customer di area terdekat.',
  },
  {
    icon: <Briefcase className="w-5 h-5" />,
    title: 'Bisnis B2B dan profesional',
    body: 'Perusahaan IT, firma hukum, konsultan, agen properti — bisnis yang perlu website terlihat profesional dan credible, bukan sekadar ada.',
  },
  {
    icon: <Plane className="w-5 h-5" />,
    title: 'Tour, travel, dan perhiasan',
    body: 'Bisnis dengan produk visual yang butuh galeri, portofolio paket, dan halaman yang bisa menghasilkan inquiry.',
  },
  {
    icon: <ShoppingBag className="w-5 h-5" />,
    title: 'E-commerce skala kecil hingga menengah',
    body: 'Toko online dengan kebutuhan spesifik yang tidak cocok dipaksakan ke template marketplace.',
  },
]

export default function WebsiteUseCases() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
            Cocok Untuk
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            Jenis Bisnis yang Paling Sering Menggunakan Layanan Ini
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5 max-w-5xl mx-auto">
          {CASES.map((c, i) => (
            <motion.article
              key={c.title}
              initial={shouldReduce ? false : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-7 hover:border-amber-200 hover:shadow-sm transition-all duration-200"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4" aria-hidden="true">
                {c.icon}
              </div>
              <h3 className="font-display font-semibold text-xl text-[#111827] tracking-normal">
                {c.title}
              </h3>
              <p className="mt-2 text-base text-[#4B5563] leading-relaxed">{c.body}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
