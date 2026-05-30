import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center container-wide text-center">
      <div>
        <p className="text-[#F59E0B] font-semibold text-sm mb-4">404</p>
        <h1 className="font-display font-extrabold text-4xl lg:text-5xl mb-4">
          Halaman tidak ditemukan
        </h1>
        <p className="text-[#6B7280] mb-8">
          Halaman yang Anda cari tidak ada atau sudah dipindahkan.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="px-6 py-3 bg-[#F59E0B] hover:bg-[#D97706] text-black font-semibold rounded-xl transition-colors"
          >
            Kembali ke Beranda
          </Link>
          <Link
            href="/kontak"
            className="px-6 py-3 border border-[#E5E7EB] hover:border-[#F59E0B]/40 rounded-xl transition-colors"
          >
            Konsultasi
          </Link>
        </div>
      </div>
    </main>
  )
}
