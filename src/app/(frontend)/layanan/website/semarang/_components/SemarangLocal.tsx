import { MapPin } from 'lucide-react'

const AREAS = [
  'Simpang Lima',
  'Pleburan',
  'Tembalang',
  'Banyumanik',
  'Candisari',
  'Gajahmungkur',
  'Pedurungan',
  'Ngaliyan',
  'Semarang Tengah',
  'Semarang Barat',
  'Semarang Timur',
  'Semarang Utara',
  'Semarang Selatan',
  'Mijen',
  'Gunungpati',
  'Tugu',
  'Genuk',
] as const

const NEARBY = ['Ungaran', 'Kendal', 'Demak', 'Salatiga', 'Ambarawa'] as const

export default function SemarangLocal() {
  return (
    <section
      aria-labelledby="semarang-local-heading"
      className="py-20 lg:py-32 bg-[#F9FAFB]"
    >
      <div className="container-wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
            Berbasis di Semarang
          </span>
          <h2
            id="semarang-local-heading"
            className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-6"
          >
            Saya tinggal dan berkarya di Semarang.{' '}
            <span className="text-[#6B7280] font-medium">
              Bisnis Anda di kota yang sama — komunikasi lebih cepat, koordinasi
              lebih mudah, paham konteks lokal.
            </span>
          </h2>
          <p className="text-base lg:text-lg text-[#6B7280] leading-relaxed">
            Sejak 2022, saya membangun website untuk pelaku bisnis di Semarang
            dan sekitarnya — dari toko jewelry, kantor hukum, agen properti,
            biro travel, hingga UMKM yang sedang membangun fondasi digitalnya.
            Bekerja langsung dengan saya berarti Anda bicara dengan orang yang
            mengerjakan, bukan dilempar ke tim yang berbeda-beda.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">
              Wilayah layanan di Kota Semarang
            </h3>
            <ul className="flex flex-wrap gap-2">
              {AREAS.map((area) => (
                <li
                  key={area}
                  className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#374151] text-sm"
                >
                  {area}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#6B7280] mt-5 leading-relaxed">
              Bertemu langsung untuk diskusi awal? Bisa diatur di area Simpang
              Lima, Pleburan, atau Tembalang. Untuk pengerjaan, semuanya remote
              sehingga tidak menambah biaya transportasi pada proyek Anda.
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8">
            <h3 className="text-lg font-semibold text-[#111827] mb-4">
              Kota terdekat yang juga ditangani
            </h3>
            <ul className="flex flex-wrap gap-2 mb-5">
              {NEARBY.map((city) => (
                <li
                  key={city}
                  className="px-3 py-1.5 rounded-full bg-[#F3F4F6] text-[#374151] text-sm"
                >
                  {city}
                </li>
              ))}
            </ul>
            <p className="text-sm text-[#6B7280] leading-relaxed">
              Klien dari Ungaran, Kendal, Demak, Salatiga, dan Ambarawa juga
              biasa dikerjakan dengan kunjungan singkat saat dibutuhkan. Untuk
              proyek di luar Jateng, koordinasi penuh secara online.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
