// TODO: Halaman layanan seo
// Copywriting: ../../../copywriting/seo.md
// Gunakan /new-page command untuk scaffold lengkap

import type { Metadata } from 'next'
import { generateMetadata } from '@/lib/seo'
import { getServiceBySlug } from '@/content/services'

const service = getServiceBySlug('seo')!

export const metadata: Metadata = generateMetadata({
  title: service.metaTitle,
  description: service.metaDescription,
  path: '/layanan/seo',
})

export default function Page() {
  return (
    <main className="container-wide py-20">
      <h1 className="font-display font-extrabold text-4xl lg:text-6xl mb-6">
        {service.title}
      </h1>
      <p className="text-[#A3A3A3] text-lg max-w-2xl">{service.longDescription}</p>
      {/* TODO: Bangun section lengkap dari copywriting */}
    </main>
  )
}
