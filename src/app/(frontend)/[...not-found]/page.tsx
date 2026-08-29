import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

// Halaman 404 tidak boleh masuk indeks. Tanpa metadata eksplisit, route ini
// mewarisi title default layout, sehingga setiap URL sampah berpotensi tayang
// di SERP dengan judul yang sama seperti beranda.
export const metadata: Metadata = {
  title: 'Halaman Tidak Ditemukan',
  description: 'Halaman yang Anda cari tidak ada atau sudah dipindahkan.',
  robots: { index: false, follow: true },
}

// Catch-all: semua URL yang tidak match halaman manapun
// ditangani oleh (frontend)/not-found.tsx dengan layout penuh.
export default function CatchAll() {
  notFound()
}
