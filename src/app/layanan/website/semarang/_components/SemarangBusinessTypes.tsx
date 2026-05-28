import Image from 'next/image'

const BUSINESS_TYPES = [
  {
    icon: '🏠',
    name: 'Home Service & Massage',
    desc: 'Jasa panggilan, terapis, perawatan di rumah — booking & WhatsApp lead capture.',
  },
  {
    icon: '🏢',
    name: 'Sewa Kantor & Virtual Office',
    desc: 'Coworking, serviced office, virtual office — listing ruang & form inquiry.',
  },
  {
    icon: '✈️',
    name: 'Tour, Travel & Rental',
    desc: 'Paket wisata, car rental, agen travel — itinerary, harga, booking lead.',
  },
  {
    icon: '⚖️',
    name: 'Firma Hukum & Konsultan',
    desc: 'Kantor pengacara, notaris, konsultan profesional — otoritas + lead form.',
  },
  {
    icon: '💎',
    name: 'Perhiasan & Jewelry',
    desc: 'Toko emas, jewelry brand — katalog produk, brand storytelling, e-commerce.',
  },
  {
    icon: '🛒',
    name: 'E-commerce & Retail',
    desc: 'Toko online, brand D2C, marketplace seller — funnel produk ke checkout.',
  },
  {
    icon: '💻',
    name: 'B2B IT & SaaS',
    desc: 'Software house, IT services, agency — landing page B2B yang convert.',
  },
  {
    icon: '🛵',
    name: 'Automotive & Workshop',
    desc: 'Bengkel, dealer, modifikasi — katalog layanan, lokasi, jadwal service.',
  },
] as const

const CLIENT_LOGOS = [
  { src: '/images/clients/folkastudio.png', alt: 'Logo Folkastudio' },
  { src: '/images/clients/prioffice.png', alt: 'Logo Prioffice' },
  { src: '/images/clients/rockologist.png', alt: 'Logo Rockologist' },
  { src: '/images/clients/jedahomemassage.jpg', alt: 'Logo Jeda Home Massage' },
  { src: '/images/clients/trulyhomemassage.png', alt: 'Logo Truly Home Massage' },
  { src: '/images/clients/lapin.png', alt: 'Logo Lapin' },
  { src: '/images/clients/inisumedang.jpg', alt: 'Logo Ini Sumedang' },
  { src: '/images/clients/layz-motor.jpg', alt: 'Logo Layz Motor' },
] as const

export default function SemarangBusinessTypes() {
  return (
    <section
      aria-labelledby="business-types-heading"
      className="py-20 lg:py-32 bg-[#F9FAFB]"
    >
      <div className="container-wide">
        <div className="max-w-3xl mb-12 lg:mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium mb-5">
            Industri yang sering dibantu
          </span>
          <h2
            id="business-types-heading"
            className="text-3xl lg:text-5xl font-bold text-[#111827] tracking-tight mb-5"
          >
            Bisnis seperti apa yang biasa saya kerjakan?
          </h2>
          <p className="text-base lg:text-lg text-[#6B7280] leading-relaxed">
            Saya tidak mengerjakan semua jenis bisnis. Daftar di bawah adalah
            industri yang sudah berulang kali saya bantu — sehingga saya paham
            cara pengunjung mereka berperilaku, apa yang membuat mereka
            menghubungi, dan struktur halaman yang biasanya bekerja paling
            baik.
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {BUSINESS_TYPES.map((b) => (
            <li
              key={b.name}
              className="p-5 lg:p-6 rounded-2xl border border-gray-200 bg-white hover:border-amber-300 hover:shadow-sm transition-all"
            >
              <span
                className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-amber-50 border border-amber-200 text-xl mb-4"
                aria-hidden="true"
              >
                {b.icon}
              </span>
              <h3 className="text-base font-semibold text-[#111827] mb-1.5">
                {b.name}
              </h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">{b.desc}</p>
            </li>
          ))}
        </ul>

        <div className="mt-16 lg:mt-24">
          <div className="text-center mb-8">
            <p className="text-xs uppercase tracking-widest text-[#9CA3AF] font-medium mb-2">
              Sebagian klien yang dipercayakan
            </p>
            <h3 className="text-xl lg:text-2xl font-semibold text-[#111827]">
              Brand & bisnis yang sudah bekerja bersama
            </h3>
          </div>

          <ul className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:gap-6 items-center">
            {CLIENT_LOGOS.map((logo) => (
              <li
                key={logo.src}
                className="flex items-center justify-center h-20 lg:h-24 px-4 rounded-xl bg-white border border-gray-200"
              >
                <div className="relative w-full h-full">
                  <Image
                    src={logo.src}
                    alt={logo.alt}
                    fill
                    sizes="(min-width: 1024px) 200px, 150px"
                    className="object-contain p-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all"
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
