'use client'

import Link from 'next/link'

/**
 * Error boundary blog — kalau Payload/DB gagal, tampilkan fallback rapi
 * (bukan 500 mentah). Dipakai untuk /blog dan /blog/[slug].
 */
export default function BlogError({ reset }: { error: Error; reset: () => void }) {
  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <h1 className="text-3xl font-semibold text-gray-900">Konten sedang tidak tersedia</h1>
      <p className="mt-3 text-gray-500">
        Terjadi kendala saat memuat artikel. Coba muat ulang sebentar lagi.
      </p>
      <div className="mt-8 flex gap-3">
        <button
          onClick={reset}
          className="rounded-xl bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-amber-600"
        >
          Coba lagi
        </button>
        <Link
          href="/"
          className="rounded-xl border border-gray-200 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50"
        >
          Ke Beranda
        </Link>
      </div>
    </section>
  )
}
