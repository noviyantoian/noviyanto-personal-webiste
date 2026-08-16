import { NextRequest, NextResponse } from 'next/server'
import { pingIndexNow, ALL_STATIC_PAGES } from '@/lib/indexnow'
import { getPostsForSitemap } from '@/lib/blog'
import { SITE } from '@/lib/constants'

export const dynamic = 'force-dynamic'

/**
 * POST /api/indexnow
 * Ping IndexNow untuk semua halaman statis (atau URL spesifik).
 *
 * Dilindungi INDEXNOW_SECRET via header x-indexnow-secret atau Bearer token.
 * Tujuan: cegah orang spam endpoint ini → server kita terus fetch api.indexnow.org.
 * (IndexNow KEY itu sendiri memang publik by design — bukan itu yang dilindungi di sini.)
 *
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
    req.headers.get('x-indexnow-secret') ??
    req.headers.get('authorization')?.replace('Bearer ', '')

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
    // Tanpa body = ping SEMUA yang ada di sitemap, bukan hanya halaman statis.
    // Sebelumnya artikel blog terlewat di ping massal: ia hanya di-ping satu per
    // satu lewat hook publish, sehingga perubahan sitewide (footer, NAP, tautan
    // GBP) tidak pernah memberi tahu mesin pencari untuk halaman blog.
    //
    // Query Payload dilakukan DI SINI, bukan di lib/indexnow.ts, untuk
    // menghindari dependensi melingkar dengan collections/Posts.ts.
    const staticUrls = ALL_STATIC_PAGES.map((p) => `${SITE.url}${p}`)
    let blogUrls: string[] = []
    try {
      const posts = await getPostsForSitemap()
      blogUrls = posts.map((p) => `${SITE.url}/blog/${p.slug}`)
    } catch {
      // CMS tidak terjangkau: tetap ping halaman statis daripada gagal total.
    }
    result = await pingIndexNow([...staticUrls, ...blogUrls])
  }

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error ?? 'IndexNow ping failed', status: result.status, urls: result.urls },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true, status: result.status, urls: result.urls })
}
