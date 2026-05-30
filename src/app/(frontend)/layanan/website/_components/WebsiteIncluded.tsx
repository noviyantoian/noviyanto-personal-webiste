'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check, Plus } from 'lucide-react'

const INCLUDED = [
  'Desain yang mencerminkan identitas bisnis Anda',
  'Konten halaman utama, tentang kami, layanan, kontak',
  'Formulir kontak atau integrasi WhatsApp',
  'Halaman optimasi untuk Google (meta title, deskripsi, sitemap)',
  'Responsif di semua ukuran layar',
  'Hosting dan domain (bila belum punya, bisa dibantu setup)',
]

const OPTIONAL = [
  'Blog / artikel untuk mendukung SEO jangka panjang',
  'Landing page khusus untuk kampanye Google Ads atau media sosial',
  'Halaman portofolio atau galeri proyek',
  'Integrasi sistem booking atau kalender online',
  'Multi-bahasa (Indonesia + Inggris)',
]

interface ListCardProps {
  badge: string
  badgeClass: string
  title: string
  items: string[]
  icon: 'check' | 'plus'
  delay?: number
}

function ListCard({ badge, badgeClass, title, items, icon, delay = 0 }: ListCardProps) {
  const shouldReduce = useReducedMotion() ?? false
  const Icon = icon === 'check' ? Check : Plus

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8"
    >
      <span className={`inline-flex items-center text-xs font-medium rounded-full px-3 py-1 ${badgeClass}`}>
        {badge}
      </span>
      <h3 className="mt-4 text-xl lg:text-2xl font-display font-medium text-[#111827] tracking-tight">
        {title}
      </h3>
      <ul className="mt-6 space-y-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-3 text-sm text-[#374151]">
            <span className={`flex-shrink-0 mt-0.5 w-5 h-5 rounded-full flex items-center justify-center ${
              icon === 'check' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
            }`}>
              <Icon className="w-3 h-3" aria-hidden="true" strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{item}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  )
}

export default function WebsiteIncluded() {
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
            Yang Anda Dapat
          </span>
          <h2 className="mt-4 font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight leading-[1.1] text-balance">
            Yang Termasuk dalam Setiap Proyek Website
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <ListCard
            badge="Termasuk"
            badgeClass="bg-amber-50 border border-amber-200 text-amber-800"
            title="Website selesai dan siap tayang"
            items={INCLUDED}
            icon="check"
          />
          <ListCard
            badge="Opsional"
            badgeClass="bg-gray-50 border border-gray-200 text-gray-600"
            title="Bisa ditambahkan sesuai kebutuhan"
            items={OPTIONAL}
            icon="plus"
            delay={0.1}
          />
        </div>
      </div>
    </section>
  )
}
