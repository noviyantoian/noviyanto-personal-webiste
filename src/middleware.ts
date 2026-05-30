import { NextRequest, NextResponse } from 'next/server'

// Simple in-memory rate limiter — cukup untuk single-process VPS (PM2 fork mode).
// Jika scale ke multi-process, ganti dengan Redis-backed limiter.

interface RateEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateEntry>()

// Bersihkan entry expired setiap 5 menit agar memory tidak tumbuh tak terbatas.
setInterval(() => {
  const now = Date.now()
  for (const [key, entry] of store) {
    if (entry.resetAt < now) store.delete(key)
  }
}, 5 * 60 * 1000)

function rateLimit(
  key: string,
  limit: number,
  windowMs: number,
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || entry.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs })
    return { allowed: true, remaining: limit - 1 }
  }

  entry.count += 1
  const remaining = Math.max(0, limit - entry.count)
  return { allowed: entry.count <= limit, remaining }
}

function getIp(req: NextRequest): string {
  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    'unknown'
  )
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const ip = getIp(req)

  // Rate limit: POST /api/inquiries — 5 req / 60 detik per IP
  if (pathname === '/api/inquiries' && req.method === 'POST') {
    const { allowed, remaining } = rateLimit(`inquiries:${ip}`, 5, 60_000)
    if (!allowed) {
      return NextResponse.json(
        { errors: [{ message: 'Terlalu banyak permintaan. Coba lagi dalam 1 menit.' }] },
        {
          status: 429,
          headers: {
            'Retry-After': '60',
            'X-RateLimit-Remaining': '0',
          },
        },
      )
    }
    const res = NextResponse.next()
    res.headers.set('X-RateLimit-Remaining', String(remaining))
    return res
  }

  // Rate limit: POST /api/users/login — 10 req / 15 menit per IP
  if (pathname === '/api/users/login' && req.method === 'POST') {
    const { allowed } = rateLimit(`login:${ip}`, 10, 15 * 60_000)
    if (!allowed) {
      return NextResponse.json(
        { errors: [{ message: 'Terlalu banyak percobaan login. Coba lagi dalam 15 menit.' }] },
        { status: 429, headers: { 'Retry-After': '900' } },
      )
    }
  }

  // Rate limit: POST /api/users/forgot-password — 3 req / 10 menit per IP
  if (pathname === '/api/users/forgot-password' && req.method === 'POST') {
    const { allowed } = rateLimit(`forgot:${ip}`, 3, 10 * 60_000)
    if (!allowed) {
      return NextResponse.json(
        { errors: [{ message: 'Terlalu banyak permintaan reset. Coba lagi dalam 10 menit.' }] },
        { status: 429, headers: { 'Retry-After': '600' } },
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/api/inquiries',
    '/api/users/login',
    '/api/users/forgot-password',
  ],
}
