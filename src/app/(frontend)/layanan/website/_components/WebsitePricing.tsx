'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { Check } from 'lucide-react'
import Button from '@/components/ui/Button'
import { tiersOf, tierPriceLabel, PPN_NOTE, type PricingTier } from '@/content/pricing'
import { packageWaLink } from '@/lib/lead'
import { trackEvent } from '@/lib/analytics'

interface WebsitePricingProps {
  /** Nama kota untuk heading & atribusi CTA. Kosong = halaman layanan umum. */
  city?: string
}

function TierCard({ tier, city, delay }: { tier: PricingTier; city?: string; delay: number }) {
  const shouldReduce = useReducedMotion() ?? false

  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`relative flex flex-col rounded-2xl border bg-white p-6 lg:p-7 ${
        tier.popular ? 'border-[#F59E0B] shadow-lg ring-1 ring-[#F59E0B]/20' : 'border-gray-200'
      }`}
    >
      {tier.popular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1 rounded-full bg-[#F59E0B] px-3 py-1 text-xs font-semibold text-[#111827]">
            Paling Dipilih
          </span>
        </div>
      )}

      <h3 className="font-display text-lg font-semibold uppercase tracking-wide text-[#111827]">
        {tier.name}
      </h3>
      <p className="mt-1 text-sm text-[#6B7280]">{tier.tagline}</p>

      <p className="mt-5 font-display text-2xl font-semibold tracking-tight text-[#111827]">
        {tierPriceLabel(tier.price)}
      </p>

      <ul className="mt-6 flex-1 space-y-3">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm text-[#374151]">
            <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-50 text-amber-600">
              <Check className="h-3 w-3" aria-hidden="true" strokeWidth={3} />
            </span>
            <span className="leading-relaxed">{f}</span>
          </li>
        ))}
      </ul>

      {/*
        Button variant "primary" sudah men-track cta_click otomatis, tapi
        "secondary" TIDAK. onClick eksplisit dipasang di sini agar semua tier
        terukur — melonggarkan guard di Button.tsx akan menggeser semantik
        event di 20+ call site lain.
      */}
      <Button
        href={packageWaLink(tier, city)}
        target="_blank"
        variant={tier.popular ? 'primary' : 'secondary'}
        size="sm"
        className="mt-7 w-full"
        trackLocation={`pricing_${tier.slug}`}
        trackPage={city ? `website_${city.toLowerCase()}` : 'website'}
        onClick={
          tier.popular
            ? undefined
            : () =>
                trackEvent('cta_click', {
                  location: `pricing_${tier.slug}`,
                  page: city ? `website_${city.toLowerCase()}` : 'website',
                })
        }
      >
        {tier.price.kind === 'quote' ? 'Diskusikan Kebutuhan' : `Pilih ${tier.name}`}
      </Button>
    </motion.div>
  )
}

export default function WebsitePricing({ city }: WebsitePricingProps) {
  const shouldReduce = useReducedMotion() ?? false
  const tiers = tiersOf('website')

  return (
    <section id="harga" className="border-y border-gray-100 bg-gray-50 py-20 lg:py-28">
      <div className="container-wide">
        <motion.div
          initial={shouldReduce ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-12 max-w-3xl text-center"
        >
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-700">
            Investasi
          </span>
          <h2 className="mt-4 text-balance font-display text-3xl font-semibold leading-[1.1] tracking-tight text-[#111827] sm:text-4xl lg:text-5xl">
            {city ? `Biaya Pembuatan Website di ${city}` : 'Biaya Pembuatan Website'}
          </h2>
          <p className="mt-5 text-pretty leading-relaxed text-[#6B7280]">
            Angka di bawah adalah titik awal, bukan harga mati — lingkup akhir disusun
            setelah kita bicara. Domain dan hosting didaftarkan atas nama Anda, jadi tidak
            ada biaya perpanjangan tahunan ke saya.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {tiers.map((tier, i) => (
            <TierCard key={tier.slug} tier={tier} city={city} delay={i * 0.08} />
          ))}
        </div>

        <p className="mt-8 text-center text-xs text-[#9CA3AF]">{PPN_NOTE}</p>
      </div>
    </section>
  )
}
