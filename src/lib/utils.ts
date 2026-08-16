import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

// ── Class merging ────────────────────────────────────────────────
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// ── String helpers ───────────────────────────────────────────────
export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength).trim() + '…'
}

// ── Date helpers ─────────────────────────────────────────────────
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('id-ID', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(date))
}

// ── Currency helpers ─────────────────────────────────────────────
//
// Sengaja TIDAK memakai `style: 'currency', currency: 'IDR'`.
// ICU modern menyisipkan U+00A0 (non-breaking space) antara "Rp" dan angka,
// sementara versi Node lama tidak menyisipkan spasi sama sekali ("Rp4.500.000").
// Hasilnya string yang berbeda antara mesin build dan runtime, plus karakter
// tak terlihat yang menyulitkan grep. Format angkanya saja, prefiks manual.

/** `Rp 4.500.000` */
export function formatIdr(amount: number): string {
  return `Rp ${new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 }).format(amount)}`
}

/**
 * Bentuk ringkas untuk opsi <select> dan badge: `Rp 4,5 jt`.
 *
 * Sengaja TIDAK memakai `notation: 'compact'` — output locale id-ID berubah
 * antar versi ICU (`jt` vs `M`). Aritmetika manual di bawah stabil.
 */
export function formatIdrCompact(amount: number): string {
  if (amount < 1_000_000) return formatIdr(amount)
  const juta = amount / 1_000_000
  const n = Number.isInteger(juta) ? String(juta) : juta.toFixed(1).replace('.', ',')
  return `Rp ${n} jt`
}

// ── URL helpers ──────────────────────────────────────────────────
export function absoluteUrl(path: string): string {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://noviyanto.com'
  return `${base}${path.startsWith('/') ? path : `/${path}`}`
}
