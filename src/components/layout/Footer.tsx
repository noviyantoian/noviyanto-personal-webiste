import Link from 'next/link'
import { SITE, SERVICE_LINKS, AREA_LINKS, LEGAL_LINKS } from '@/lib/constants'

const COMPANY_LINKS = [
  { label: 'Tentang', href: '/tentang' },
  { label: 'Portofolio', href: '/portofolio' },
  { label: 'Blog', href: '/blog' },
  { label: 'Kontak', href: '/kontak' },
] as const

const linkClass =
  'rounded-sm text-sm text-[#6B7280] transition-colors hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]'

const headingClass = 'text-sm font-semibold uppercase tracking-wider text-[#111827]'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#FFFFFF]" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>

      <div className="container-wide py-16 lg:py-20">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-12 lg:gap-8">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-4">
            <Link
              href="/"
              aria-label={`${SITE.name} — beranda`}
              className="inline-block font-[family-name:var(--font-clash-display)] text-2xl font-bold tracking-tight text-[#111827]"
            >
              {SITE.name}
              <span className="text-[#F59E0B]">.</span>
            </Link>
            <p className="mt-2 text-sm font-medium text-[#F59E0B]">{SITE.tagline}</p>
            <p className="mt-1 text-sm text-[#6B7280]">{SITE.location}</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[#6B7280]">
              Bukan sekadar bikin website — kami bantu bisnis Anda tumbuh dan mendapatkan leads.
            </p>
          </div>

          {/* Layanan */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Layanan</h3>
            <ul className="mt-4 space-y-3">
              {SERVICE_LINKS.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className={linkClass}>
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Area Layanan */}
          <div className="lg:col-span-2">
            <h3 className={headingClass}>Area Layanan</h3>
            <ul className="mt-4 space-y-3">
              {AREA_LINKS.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className={linkClass}>
                    {a.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Perusahaan */}
          <div className="lg:col-span-3">
            <h3 className={headingClass}>Perusahaan</h3>
            <ul className="mt-4 space-y-3">
              {COMPANY_LINKS.map((c) => (
                <li key={c.href}>
                  <Link href={c.href} className={linkClass}>
                    {c.label}
                  </Link>
                </li>
              ))}
              <li>
                <a href={`mailto:${SITE.email}`} className={linkClass}>
                  {SITE.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-[#E5E7EB] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-[#9CA3AF]">
            © {year} {SITE.name}. Hak cipta dilindungi.
          </p>
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {LEGAL_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="rounded-sm text-xs text-[#9CA3AF] transition-colors hover:text-[#F59E0B] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
