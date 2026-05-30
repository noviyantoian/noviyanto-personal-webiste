'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import Button from '@/components/ui/Button'
import { cn } from '@/lib/utils'
import { NAV_LINKS, SITE } from '@/lib/constants'

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname === href || pathname.startsWith(href + '/')

  return (
    <header
      className={cn(
        'sticky top-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-[#FFFFFF]/90 backdrop-blur-md border-b border-[#E5E7EB]/50'
          : 'bg-transparent border-b border-transparent',
      )}
    >
      <nav aria-label="Navigasi utama" className="container-wide flex h-16 items-center justify-between lg:h-20">
        <Link
          href="/"
          aria-label={`${SITE.name} — beranda`}
          className="font-[family-name:var(--font-plus-jakarta)] text-xl font-bold tracking-tight text-[#111827] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
        >
          {SITE.name}
          <span className="text-[#F59E0B]">.</span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]',
                  isActive(link.href)
                    ? 'text-[#F59E0B]'
                    : 'text-[#6B7280] hover:text-[#111827]',
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden lg:block">
          <Button
            variant="primary"
            size="sm"
            href="/kontak"
            trackLocation="navbar"
          >
            Konsultasi
          </Button>
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={mobileOpen}
          aria-controls="mobile-menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg text-[#111827] hover:bg-[#F3F4F6] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      <div
        id="mobile-menu"
        className={cn(
          'lg:hidden overflow-hidden transition-all duration-300 ease-out bg-[#FFFFFF]/95 backdrop-blur-md border-b border-[#E5E7EB]/50',
          mobileOpen ? 'max-h-[80vh] opacity-100' : 'max-h-0 opacity-0',
        )}
      >
        <div className="container-wide flex flex-col gap-1 py-4">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                'block rounded-xl px-4 py-3 text-base font-medium transition-colors',
                isActive(link.href)
                  ? 'bg-[#F3F4F6] text-[#F59E0B]'
                  : 'text-[#111827] hover:bg-[#F9FAFB]',
              )}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-3">
            <Button
              variant="primary"
              size="md"
              href="/kontak"
              trackLocation="navbar_mobile"
              className="w-full"
              onClick={() => setMobileOpen(false)}
            >
              Konsultasi Gratis
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
