'use client'

import { motion, useReducedMotion } from 'framer-motion'

const STACK = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Vercel', 'Netlify']

export default function WebsiteTech() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section className="bg-gray-50 py-20 lg:py-28 border-y border-gray-100">
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
            Teknologi
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            Platform yang Digunakan
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
            Proyek website dibangun dengan <strong className="text-[#111827]">Next.js dan React</strong>,
            di-hosting di <strong className="text-[#111827]">Vercel atau Netlify</strong>. Pilihan ini bukan
            kebetulan — performanya lebih cepat dari WordPress rata-rata, lebih mudah dikelola jangka
            panjang, dan jauh lebih aman dari serangan siber yang umum menyasar CMS.
          </p>
          <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
            Kalau Anda butuh website dengan sistem manajemen konten yang bisa diupdate sendiri,
            itu juga bisa dikonfigurasikan.
          </p>

          <ul className="mt-8 flex flex-wrap justify-center gap-2">
            {STACK.map((t) => (
              <li
                key={t}
                className="inline-flex items-center bg-white border border-gray-200 text-[#374151] text-xs font-medium rounded-full px-3 py-1.5"
              >
                {t}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
