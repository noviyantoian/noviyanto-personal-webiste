import Image from 'next/image'

interface ClientLogo {
  name: string
  src: string
  domain: string
  darkBg?: boolean
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Truly Home Massage', src: '/images/clients/navbar/trulyhomemassage.png', domain: 'trulyhomemassage.com' },
  { name: 'Jeda Home Massage', src: '/images/clients/navbar/jedahomemassage.png', domain: 'jedahomemassage.com', darkBg: true },
  { name: 'Rockologist', src: '/images/clients/navbar/rockologist.png', domain: 'rockologist.id' },
  { name: 'Prioffice', src: '/images/clients/navbar/prioffice.png', domain: 'prioffice.com' },
  { name: 'Layz Motor', src: '/images/clients/navbar/layz-motor.png', domain: 'layz-motor.com' },
  { name: 'Lapin', src: '/images/clients/navbar/lapin.png', domain: 'lapin.id' },
  { name: 'Inisumedang', src: '/images/clients/navbar/inisumedang.png', domain: 'inisumedang.com' },
]

export default function ClientLogos() {
  return (
    <section className="bg-white border-y border-[#F3F4F6] py-12 lg:py-14" aria-label="Klien yang dipercaya">
      <div className="container-wide">
        <p className="text-center text-xs sm:text-sm font-medium uppercase tracking-[0.15em] text-[#9CA3AF] mb-8">
          Dipercaya bisnis aktif di berbagai industri
        </p>
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-x-6 gap-y-8 items-center">
          {CLIENT_LOGOS.map((logo) => (
            <li key={logo.name} className="flex justify-center">
              <a
                href={`https://${logo.domain}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Kunjungi ${logo.name}`}
                className={
                  logo.darkBg
                    ? 'group flex h-12 w-full max-w-[130px] items-center justify-center rounded-lg bg-[#1f1f1f] px-3 py-2'
                    : 'group flex h-12 w-full max-w-[130px] items-center justify-center'
                }
              >
                <Image
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  width={130}
                  height={48}
                  className={
                    logo.darkBg
                      ? 'max-h-full max-w-full object-contain transition-all duration-300'
                      : 'max-h-full max-w-full object-contain grayscale opacity-55 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100'
                  }
                />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
