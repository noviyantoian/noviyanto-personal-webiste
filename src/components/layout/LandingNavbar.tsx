'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { SITE, getWaLink } from '@/lib/constants'
import { trackEvent } from '@/lib/analytics'

interface NavLink {
  label: string
  href: string
  external?: boolean
}

interface LandingNavbarProps {
  links: NavLink[]
  ctaLabel?: string
  ctaWaKey?: 'tourTravel' | 'website' | 'default'
}

export default function LandingNavbar({
  links,
  ctaLabel = 'Konsultasi Gratis',
  ctaWaKey = 'tourTravel',
}: LandingNavbarProps) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const anchorIds = links
      .filter((l) => l.href.startsWith('#'))
      .map((l) => l.href.slice(1))

    if (anchorIds.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting)
        if (visible) setActiveSection(visible.target.id)
      },
      { rootMargin: '-30% 0px -60% 0px' },
    )

    anchorIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [links])

  const handleClose = useCallback(() => setOpen(false), [])

  const waHref = getWaLink(ctaWaKey)

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-shadow duration-200 ${
        scrolled ? 'bg-white/95 shadow-sm backdrop-blur-sm' : 'bg-white'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex flex-col leading-none"
          aria-label={`${SITE.name} — kembali ke beranda`}
        >
          <span className="font-display font-semibold text-lg text-[#111827] tracking-tight">
            {SITE.name}
          </span>
          <span className="text-[10px] text-[#9CA3AF] font-medium tracking-wide">
            Web & Digital Marketing
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Landing page navigation" className="hidden md:flex items-center gap-6">
          {links.map((link) => {
            const isActive = link.href.startsWith('#') && activeSection === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className={`text-sm font-medium transition-colors duration-150 ${
                  isActive
                    ? 'text-[#F59E0B]'
                    : 'text-[#6B7280] hover:text-[#111827]'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="hidden md:flex items-center">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('cta_click', { location: 'landing_navbar' })}
            className="inline-flex items-center gap-1.5 h-9 px-4 bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-sm font-medium rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
          >
            {ctaLabel} →
          </a>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={open ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] transition-colors"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-[#E5E7EB] bg-white px-4 py-4 space-y-1">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={handleClose}
              {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="block py-2.5 px-3 text-sm font-medium text-[#374151] hover:bg-[#F9FAFB] rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('cta_click', { location: 'landing_navbar_mobile' })
                handleClose()
              }}
              className="flex items-center justify-center h-10 w-full bg-[#F59E0B] hover:bg-[#D97706] text-[#111827] text-sm font-medium rounded-xl transition-colors"
            >
              {ctaLabel} →
            </a>
          </div>
        </div>
      )}
    </header>
  )
}
