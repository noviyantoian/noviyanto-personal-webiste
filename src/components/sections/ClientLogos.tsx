import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

interface ClientLogo {
  name: string
  src: string
  /** Logo terang — butuh chip gelap supaya tetap terbaca di sel putih. */
  darkBg?: boolean
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Truly Home Massage', src: '/images/clients/navbar/trulyhomemassage.png' },
  { name: 'Jeda Home Massage', src: '/images/clients/navbar/jedahomemassage.png', darkBg: true },
  { name: 'Rockologist', src: '/images/clients/navbar/rockologist.png' },
  { name: 'Prioffice', src: '/images/clients/navbar/prioffice.png' },
  { name: 'Layz Motor', src: '/images/clients/navbar/layz-motor.png' },
  { name: 'Lapin', src: '/images/clients/navbar/lapin.png' },
  { name: 'Folclean', src: '/images/clients/navbar/folclean.png' },
  { name: 'Wallblock', src: '/images/clients/navbar/wallblock.png' },
  { name: 'Inisumedang', src: '/images/clients/navbar/inisumedang.png' },
]

// Sel diberi garis kanan + bawah, kontainer diberi garis atas + kiri.
// Hasilnya kisi penuh tanpa garis dobel di tepi.
const CELL =
  'group relative flex h-20 lg:h-24 items-center justify-center border-r border-b border-gray-200 px-4 transition-colors duration-200'

export default function ClientLogos() {
  return (
    <section className="bg-white border-y border-[#F3F4F6] py-12 lg:py-14" aria-label="Klien yang dipercaya">
      <div className="container-wide">
        <p className="text-center text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-[#9CA3AF] mb-8">
          Dipercaya bisnis aktif di berbagai industri
        </p>

        {/* 10 sel (9 klien + 1 ajakan) supaya kisi selalu genap:
            2 kolom di mobile, 5 kolom sejak md — dua-duanya membagi 10 dengan rapi. */}
        <ul className="grid grid-cols-2 md:grid-cols-5 border-t border-l border-gray-200">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className={`${CELL} hover:bg-gray-50`}>
              <div
                className={
                  logo.darkBg
                    ? 'flex h-11 w-full max-w-[132px] items-center justify-center rounded-lg bg-[#1f1f1f] px-3 py-2'
                    : 'flex h-11 w-full max-w-[132px] items-center justify-center'
                }
              >
                <Image
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  width={132}
                  height={44}
                  sizes="(min-width: 768px) 132px, 40vw"
                  className={
                    logo.darkBg
                      ? 'max-h-full max-w-full object-contain opacity-70 transition duration-300 group-hover:opacity-100'
                      : 'max-h-full max-w-full object-contain grayscale opacity-55 transition duration-300 group-hover:grayscale-0 group-hover:opacity-100'
                  }
                />
              </div>
            </li>
          ))}

          <li className={`${CELL} hover:bg-amber-50/60`}>
            <Link
              href="/kontak"
              className="flex items-center gap-1.5 text-sm font-medium text-[#9CA3AF] transition-colors group-hover:text-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2 rounded-md px-2 py-1"
            >
              Bisnis Anda berikutnya
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
