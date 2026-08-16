import { Star, ExternalLink } from 'lucide-react'
import { GOOGLE_REVIEWS, REVIEWS_AGGREGATE, formatReviewDate } from '@/content/reviews'
import { SITE } from '@/lib/constants'

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" role="img" aria-label={`${rating} dari 5 bintang`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating ? 'w-4 h-4 fill-amber-400 text-amber-400' : 'w-4 h-4 text-gray-300'
          }
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function WebsiteTestimonials() {
  return (
    <section aria-labelledby="testimonials-heading" className="py-20 lg:py-32 bg-white">
      <div className="container-wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            Apa kata klien
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-6"
          >
            {REVIEWS_AGGREGATE.rating.toFixed(1)} / 5.0 dari {REVIEWS_AGGREGATE.count} ulasan{' '}
            <span className="text-[#6B7280] font-medium">di Google Maps.</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-sm text-[#6B7280]">Rata-rata 5 bintang</span>
            </div>
            <span className="text-[#9CA3AF]" aria-hidden="true">
              ·
            </span>
            <span className="text-sm text-[#6B7280]">
              Sumber: {REVIEWS_AGGREGATE.source} (terverifikasi)
            </span>
            <span className="text-[#9CA3AF]" aria-hidden="true">
              ·
            </span>
            {/*
              Tautan ke listing asli. Ulasan ini sengaja TIDAK ditandai dengan
              schema Review/AggregateRating — lihat catatan di src/lib/seo.ts.
              Menautkan ke sumbernya adalah cara yang benar untuk membuktikannya.
            */}
            <a
              href={SITE.gbpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-sm text-sm font-medium text-[#B45309] underline decoration-amber-200 decoration-2 underline-offset-4 transition-colors hover:text-[#92400E] hover:decoration-amber-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
            >
              Baca semua ulasan di Google
              <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            </a>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {GOOGLE_REVIEWS.map((r) => (
            <li
              key={`${r.author}-${r.date}`}
              className="p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] flex flex-col"
            >
              <StarRating rating={r.rating} />
              <blockquote className="mt-4 text-[#111827] leading-relaxed flex-1">
                <p>&ldquo;{r.text}&rdquo;</p>
              </blockquote>
              <footer className="mt-5 pt-5 border-t border-gray-200">
                <p className="font-semibold text-[#111827] text-sm">{r.author}</p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Ulasan Google · {formatReviewDate(r.date)}
                </p>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Semua ulasan di atas adalah ulasan asli yang dipublikasikan klien di Google Maps.
        </p>
      </div>
    </section>
  )
}
