import Link from 'next/link'
import { Award, Briefcase, MapPin, ShieldCheck } from 'lucide-react'

const CREDENTIALS = [
  {
    icon: Briefcase,
    label: '3+ tahun fokus web development & digital growth',
  },
  {
    icon: Award,
    label: '30+ proyek website bisnis & landing page terkirim',
  },
  {
    icon: MapPin,
    label: 'Berbasis di Kota Semarang, melayani Jateng & nasional',
  },
  {
    icon: ShieldCheck,
    label: 'Kontrak jelas, komunikasi langsung, tanpa perantara',
  },
] as const

export default function SemarangAuthor() {
  return (
    <section
      aria-labelledby="author-heading"
      className="py-20 lg:py-32 bg-white"
    >
      <div className="container-wide">
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 lg:gap-16 items-start">
          <div>
            <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
              Siapa yang mengerjakan website Anda
            </span>
            <h2
              id="author-heading"
              className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-6"
            >
              Halo, saya Noviyanto.
            </h2>
            <div className="space-y-4 text-base lg:text-lg text-[#6B7280] leading-relaxed">
              <p>
                Saya membangun website untuk bisnis yang serius ingin tumbuh —
                bukan sekadar punya alamat online. Latar belakang saya adalah
                web development dan digital marketing, jadi setiap halaman yang
                saya buat dirancang dengan satu pertanyaan utama: bagaimana
                halaman ini bisa mengubah pengunjung jadi calon klien?
              </p>
              <p>
                Saya bekerja sebagai individu profesional, bukan agency. Artinya
                tidak ada salesperson, tidak ada project manager perantara, dan
                tidak ada tim freelance yang berganti-ganti di belakang layar.
                Anda berkomunikasi langsung dengan orang yang menulis kode,
                menyusun copy, dan mengatur strategi SEO halaman Anda.
              </p>
              <p>
                Bagi saya, reputasi lebih penting daripada volume. Setiap proyek
                yang saya ambil adalah proyek yang saya yakin bisa saya bawa ke
                hasil yang nyata.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/tentang"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[#111827] font-medium hover:bg-[#F9FAFB] transition-colors text-sm"
              >
                Pelajari latar belakang lengkap →
              </Link>
              <Link
                href="/portofolio"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-gray-200 text-[#111827] font-medium hover:bg-[#F9FAFB] transition-colors text-sm"
              >
                Lihat portofolio
              </Link>
            </div>
          </div>

          <ul className="space-y-4">
            {CREDENTIALS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-start gap-4 p-5 rounded-2xl border border-gray-200 bg-[#F9FAFB]"
              >
                <span
                  className="flex-shrink-0 w-10 h-10 rounded-xl bg-white border border-gray-200 flex items-center justify-center text-amber-600"
                  aria-hidden="true"
                >
                  <Icon className="w-5 h-5" />
                </span>
                <p className="text-[#111827] font-medium leading-snug pt-1.5">
                  {label}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
