import { Star } from 'lucide-react'

interface Review {
  author: string
  date: string
  rating: number
  text: string
}

const REVIEWS: Review[] = [
  {
    author: 'Muhammad Arsy Muqorrobin',
    date: '2022-10-04',
    rating: 5,
    text: 'Mas Noviyanto itu ramah, responsif dan sangat menguasai bidangnya. Jika ada hal yang tim dan agensi saya tidak bisa pecahkan, mas Noviyanto selalu berhasil menyelesaikan hal itu dengan cepat dan tepat.',
  },
  {
    author: 'Noprasetya Cahya',
    date: '2023-08-03',
    rating: 5,
    text: 'Sangat terbantu dengan layanan Google Ads dari Noviyanto. Kampanye iklan kami meningkat secara signifikan, dan tingkat konversi juga mengalami peningkatan yang luar biasa. Rekomendasi banget untuk siapa saja yang mencari peningkatan yang nyata dalam kampanye iklan.',
  },
  {
    author: 'Ariadi Arifin',
    date: '2022-10-04',
    rating: 5,
    text: 'Pelayanannya luar biasa, website saya selalu banyak dilihat pengunjung. Hasilnya usaha saya kebanjiran order. Saya pakai jasa SEO dan Google Ads. Mantap recommended 👍👍',
  },
  {
    author: 'done akbar',
    date: '2022-12-25',
    rating: 5,
    text: 'Pelayanan sangat baik, dan pekerjaan cepat selesai. Rekomendasi untuk jasa web di Semarang nih.',
  },
  {
    author: 'rudy misbah',
    date: '2022-10-04',
    rating: 5,
    text: 'Nah kayak gini ni harusnya, rekomen banget kalau mau buat website. Pelayanan nya bagus banget, kalau pas tanya dijelasin sampai detail, fast respon juga.',
  },
  {
    author: 'Michael Paton',
    date: '2023-11-21',
    rating: 5,
    text: 'What a guy. All technical queries, he can help with. If I ever have an issue he has always been able to help.',
  },
  {
    author: 'Sitranger',
    date: '2023-04-21',
    rating: 5,
    text: 'Terima kasih mas ian sudah membantu optimize website kami, recommended vendor web developer dan SEO.',
  },
  {
    author: 'Surya Permana',
    date: '2022-12-21',
    rating: 5,
    text: 'Dua kali minta tolong mas novi bantu optimasi speed website hasilnya oke, next minta bantuan yg lain lagi ya mas.',
  },
]

const AGGREGATE = {
  rating: 5.0,
  count: 14,
  source: 'Google Maps',
} as const

function formatDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'long',
  })
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div
      className="flex gap-0.5"
      role="img"
      aria-label={`${rating} dari 5 bintang`}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={
            i < rating
              ? 'w-4 h-4 fill-amber-400 text-amber-400'
              : 'w-4 h-4 text-gray-300'
          }
          aria-hidden="true"
        />
      ))}
    </div>
  )
}

export default function SemarangTestimonials() {
  return (
    <section
      aria-labelledby="testimonials-heading"
      className="py-20 lg:py-32 bg-white"
    >
      <div className="container-wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            Apa kata klien
          </span>
          <h2
            id="testimonials-heading"
            className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-6"
          >
            {AGGREGATE.rating.toFixed(1)} / 5.0 dari {AGGREGATE.count} ulasan{' '}
            <span className="text-[#6B7280] font-medium">
              di Google Maps.
            </span>
          </h2>
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <StarRating rating={5} />
              <span className="text-sm text-[#6B7280]">
                Rata-rata 5 bintang
              </span>
            </div>
            <span className="text-[#9CA3AF]" aria-hidden="true">
              ·
            </span>
            <span className="text-sm text-[#6B7280]">
              Sumber: {AGGREGATE.source} (terverifikasi)
            </span>
          </div>
        </div>

        <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
          {REVIEWS.map((r) => (
            <li
              key={`${r.author}-${r.date}`}
              className="p-6 rounded-2xl border border-gray-200 bg-[#F9FAFB] flex flex-col"
            >
              <StarRating rating={r.rating} />
              <blockquote className="mt-4 text-[#111827] leading-relaxed flex-1">
                <p>&ldquo;{r.text}&rdquo;</p>
              </blockquote>
              <footer className="mt-5 pt-5 border-t border-gray-200">
                <p className="font-semibold text-[#111827] text-sm">
                  {r.author}
                </p>
                <p className="text-xs text-[#6B7280] mt-0.5">
                  Ulasan Google · {formatDate(r.date)}
                </p>
              </footer>
            </li>
          ))}
        </ul>

        <p className="mt-8 text-center text-sm text-[#6B7280]">
          Semua ulasan di atas adalah ulasan asli yang dipublikasikan klien di
          Google Maps.
        </p>
      </div>
    </section>
  )
}

export const TESTIMONIAL_REVIEWS = REVIEWS
export const TESTIMONIAL_AGGREGATE = AGGREGATE
