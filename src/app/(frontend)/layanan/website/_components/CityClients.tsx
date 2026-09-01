import Image from 'next/image'
import { ExternalLink, MapPin } from 'lucide-react'
import { clientsForCity } from '@/content/clients'

interface CityClientsProps {
  /** Nama kota halaman, mis. "Bandung". Harus sama persis dengan field city klien. */
  city: string
}

/**
 * Bukti klien khusus kota — pembeda utama antar halaman kota.
 *
 * Sebelum ada komponen ini, ketiga halaman kota memakai social proof yang
 * identik, sehingga isinya 79–94% sama dan terbaca sebagai doorway page.
 *
 * Nama kota tiap klien ditampilkan apa adanya: klien Cimahi dan Sumedang
 * muncul di halaman Bandung karena sewilayah, tapi tetap ditulis "Cimahi"
 * dan "Sumedang", bukan diklaim sebagai Bandung.
 */
export default function CityClients({ city }: CityClientsProps) {
  const cityClients = clientsForCity(city)

  // Kota tanpa klien tidak menampilkan apa pun — lebih baik satu section
  // hilang daripada menerbitkan bukti kosong.
  if (cityClients.length === 0) return null

  const nearby = cityClients.filter((c) => c.city !== city).length

  return (
    <section
      aria-labelledby="city-clients-heading"
      className="py-20 lg:py-28 bg-white"
    >
      <div className="container-wide">
        <div className="max-w-3xl mb-10 lg:mb-14">
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            <MapPin className="w-3.5 h-3.5" strokeWidth={1.75} aria-hidden="true" />
            Klien di sekitar {city}
          </span>
          <h2
            id="city-clients-heading"
            className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-5"
          >
            Bisnis yang websitenya saya kelola di {city}
            {nearby > 0 ? ' dan sekitarnya' : ''}
          </h2>
          <p className="text-base sm:text-lg text-[#6B7280] leading-relaxed">
            Bukan logo pinjaman. Ini klien aktif yang situsnya berjalan setiap hari
            {nearby > 0 ? `, termasuk ${nearby} dari kota tetangga` : ''}.
          </p>
        </div>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cityClients.map((client) => (
            <li
              key={client.slug}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-6 transition-colors duration-200 hover:border-amber-300/60 hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gray-200 bg-white">
                  <Image
                    src={client.logo}
                    alt={`Logo ${client.name}`}
                    width={44}
                    height={44}
                    className="h-full w-full object-contain p-1.5"
                  />
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-[#111827] truncate">{client.name}</p>
                  <p className="text-xs text-[#6B7280] truncate">{client.city}</p>
                </div>
              </div>

              <p className="mt-4 text-sm text-[#6B7280] leading-relaxed">
                {client.industry}
              </p>

              <ul className="mt-4 flex flex-wrap gap-1.5">
                {client.services.map((service) => (
                  <li
                    key={service}
                    className="rounded-full border border-gray-200 bg-[#F9FAFB] px-2.5 py-1 text-xs text-[#6B7280]"
                  >
                    {service}
                  </li>
                ))}
              </ul>

              <a
                href={`https://${client.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700 transition-colors hover:text-amber-800"
              >
                {client.domain}
                <ExternalLink className="w-3 h-3" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
