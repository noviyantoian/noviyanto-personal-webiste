import { NextRequest, NextResponse } from 'next/server'
import { pingAllPages, pingIndexNow } from '@/lib/indexnow'
import { SITE } from '@/lib/constants'

export const dynamic = 'force-dynamic'

/**
 * POST /api/indexnow
 * Ping IndexNow untuk semua halaman statis (atau URL spesifik).
 *
 * Body opsional (JSON):
 *   { "paths": ["/layanan/website", "/blog/slug"] }
 * Tanpa body = ping semua halaman statis.
 *
 * Tidak perlu auth — IndexNow hanya terima URL dari domain sendiri,
 * sehingga caller eksternal tidak bisa menyalahgunakan endpoint ini.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
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
