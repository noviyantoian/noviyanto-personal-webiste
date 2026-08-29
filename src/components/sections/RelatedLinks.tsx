import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

import { cn } from '@/lib/utils'
import type { RelatedLink } from '@/content/related'

interface RelatedLinksProps {
  eyebrow: string
  headline: string
  items: RelatedLink[]
  background?: 'white' | 'gray'
  className?: string
}

/**
 * Blok tautan internal kontekstual — dipakai dua arah: artikel pendukung di
 * halaman layanan, dan layanan relevan di bawah artikel.
 *
 * Judul tautan sengaja dipakai apa adanya sebagai anchor text supaya
 * deskriptif, bukan "klik di sini" (.claude/rules/seo.md).
 *
 * Server Component — tidak ada state maupun animasi, jadi tidak perlu
 * 'use client' dan tidak menambah bundle JS.
 */
export default function RelatedLinks({
  eyebrow,
  headline,
  items,
  background = 'gray',
  className,
}: RelatedLinksProps) {
  if (items.length === 0) return null

  return (
    <section
      aria-labelledby="related-links-heading"
      className={cn(
        background === 'gray' ? 'bg-gray-50 border-y border-gray-100' : 'bg-white',
        'py-16 lg:py-20',
        className,
      )}
    >
      <div className="container-wide">
        <div className="mx-auto max-w-3xl">
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
            {eyebrow}
          </span>
          <h2
            id="related-links-heading"
            className="mt-4 font-display text-2xl font-semibold tracking-tight text-gray-900 sm:text-3xl"
          >
            {headline}
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-amber-300 hover:bg-amber-50/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                >
                  <span className="flex items-start gap-2 font-display text-base font-semibold leading-snug text-gray-900 transition-colors group-hover:text-amber-800">
                    {item.title}
                    <ArrowUpRight
                      className="mt-0.5 h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-amber-600"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </span>
                  <span className="mt-2 text-sm leading-relaxed text-gray-500">{item.blurb}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
