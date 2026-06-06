import { NextRequest, NextResponse } from 'next/server'
import { pingAllPages, pingIndexNow } from '@/lib/indexnow'
import { SITE } from '@/lib/constants'

export const dynamic = 'force-dynamic'

/**
 * POST /api/indexnow
 * Ping IndexNow untuk semua halaman statis (atau URL spesifik).
 *
 * Dilindungi INDEXNOW_SECRET env var.
 * Contoh: curl -X POST https://noviyanto.com/api/indexnow \
 *   -H "x-indexnow-secret: <secret>"
 *
 * Body opsional (JSON):
 *   { "paths": ["/layanan/website", "/blog/slug"] }
 * Tanpa body = ping semua halaman statis.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
  const secret = process.env.INDEXNOW_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'INDEXNOW_SECRET not configured' }, { status: 500 })
  }

  const reqSecret =
    req.headers.get('x-indexnow-secret') ?? req.headers.get('authorization')?.replace('Bearer ', '')

  if (reqSecret !== secret) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  let body: { paths?: string[] } | null = null

  try {
    body = await req.json().catch(() => null)
  } catch {
    // body optional
  }

  let result
  if (body?.paths && Array.isArray(body.paths) && body.paths.length > 0) {
    const urls = body.paths.map((p) => `${SITE.url}${p}`)
    result = await pingIndexNow(urls)
  } else {
    result = await pingAllPages()
  }

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'IndexNow ping failed', status: result.status, urls: result.urls },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true, status: result.status, urls: result.urls })
}
