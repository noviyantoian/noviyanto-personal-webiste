'use client'

import { motion, useReducedMotion } from 'framer-motion'

export default function WebsiteProblem() {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <span className="text-xs font-semibold text-amber-700 uppercase tracking-[0.2em]">
            Masalah
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            Banyak Website Terlihat Bagus tapi Tidak Menghasilkan Apa-apa
          </h2>
          <p className="mt-6 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
            Ini bukan soal desain jelek atau konten kurang. Mayoritas website bisnis
            gagal menghasilkan leads karena dibangun tanpa memikirkan satu hal:{' '}
            <em>apa yang ingin dilakukan pengunjung setelah mereka sampai di sini?</em>
          </p>
          <p className="mt-4 text-base sm:text-lg text-[#6B7280] leading-relaxed text-pretty">
            Kalau halaman Anda tidak punya alur jelas — dari pengunjung datang sampai
            mereka menghubungi Anda — maka sebagus apapun desainnya, hasilnya akan
            sama saja.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
