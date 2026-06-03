import Image from 'next/image'

interface ClientLogo {
  name: string
  src: string
  darkBg?: boolean
}

const CLIENT_LOGOS: ClientLogo[] = [
  { name: 'Truly Home Massage', src: '/images/clients/navbar/trulyhomemassage.png' },
  { name: 'Jeda Home Massage', src: '/images/clients/navbar/jedahomemassage.png', darkBg: true },
  { name: 'Rockologist', src: '/images/clients/navbar/rockologist.png' },
  { name: 'Prioffice', src: '/images/clients/navbar/prioffice.png' },
  { name: 'Layz Motor', src: '/images/clients/navbar/layz-motor.png' },
  { name: 'Lapin', src: '/images/clients/navbar/lapin.png' },
  { name: 'Inisumedang', src: '/images/clients/navbar/inisumedang.png' },
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
              <div
                className={
                  logo.darkBg
                    ? 'flex h-12 w-full max-w-[130px] items-center justify-center rounded-lg bg-[#1f1f1f] px-3 py-2'
                    : 'flex h-12 w-full max-w-[130px] items-center justify-center'
                }
              >
                <Image
                  src={logo.src}
                  alt={`Logo ${logo.name}`}
                  width={130}
                  height={48}
                  className={
                    logo.darkBg
                      ? 'max-h-full max-w-full object-contain'
                      : 'max-h-full max-w-full object-contain grayscale opacity-60'
                  }
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
