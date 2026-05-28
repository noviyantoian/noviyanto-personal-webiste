'use client'

import Link from 'next/link'
import type { ReactNode, MouseEvent } from 'react'
import { cn } from '@/lib/utils'
import { trackEvent } from '@/lib/analytics'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: Variant
  size?: Size
  href?: string
  target?: string
  rel?: string
  type?: 'button' | 'submit' | 'reset'
  className?: string
  ariaLabel?: string
  trackLocation?: string
  trackPage?: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  children: ReactNode
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary:
    'bg-[#F59E0B] text-[#111827] hover:bg-[#D97706] active:bg-[#B45309]',
  secondary:
    'bg-white border border-[#E5E7EB] text-[#111827] hover:bg-[#F9FAFB] hover:border-[#D1D5DB] active:bg-[#F3F4F6]',
  ghost:
    'text-[#374151] hover:bg-[#F3F4F6] active:bg-[#E5E7EB]',
}

const SIZE_STYLES: Record<Size, string> = {
  sm: 'h-10 px-4 text-sm',
  md: 'h-12 px-6 text-[15px]',
  lg: 'h-14 px-7 text-base',
}

const BASE =
  'inline-flex items-center justify-center gap-2 rounded-xl font-medium ' +
  'tracking-[-0.01em] leading-none transition-colors duration-150 ' +
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 focus-visible:ring-offset-white ' +
  'disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap'

export default function Button({
  variant = 'primary',
  size = 'md',
  href,
  target,
  rel,
  type = 'button',
  className,
  ariaLabel,
  trackLocation,
  trackPage,
  onClick,
  children,
}: ButtonProps) {
  const classes = cn(BASE, VARIANT_STYLES[variant], SIZE_STYLES[size], className)

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (variant === 'primary') {
      trackEvent('cta_click', {
        location: trackLocation ?? 'unknown',
        page: trackPage ?? (typeof window !== 'undefined' ? window.location.pathname : ''),
      })
    }
    onClick?.(e)
  }

  if (href) {
    const isExternal =
      href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')
    const computedRel = rel ?? (target === '_blank' ? 'noopener noreferrer' : undefined)

    if (isExternal) {
      return (
        <a
          href={href}
          target={target}
          rel={computedRel}
          aria-label={ariaLabel}
          onClick={handleClick}
          className={classes}
        >
          {children}
        </a>
      )
    }

    return (
      <Link
        href={href}
        target={target}
        rel={computedRel}
        aria-label={ariaLabel}
        onClick={handleClick}
        className={classes}
      >
        {children}
      </Link>
    )
  }

  return (
    <button type={type} aria-label={ariaLabel} onClick={handleClick} className={classes}>
      {children}
    </button>
  )
}
