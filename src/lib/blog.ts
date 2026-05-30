import { cache } from 'react'
import { getPayload } from 'payload'
import config from '@payload-config'
import type { Category, Media, Post } from '@/payload-types'

/**
 * Data-access layer blog — local API Payload (in-process, no HTTP).
 * Query dibatasi `published` untuk publik. Dibungkus React `cache()` agar
 * pemanggilan ganda dalam satu request (mis. generateMetadata + page) cuma
 * sekali hit DB.
 */

/** Subset field Post untuk kartu list (tanpa `content` — field terbesar). */
export type PostCardData = Pick<
  Post,
  'id' | 'title' | 'slug' | 'excerpt' | 'heroImage' | 'categories' | 'publishedAt' | 'readingTime'
>

export const getPublishedPosts = cache(async (limit = 100): Promise<PostCardData[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    sort: '-publishedAt',
    depth: 1,
    limit,
    // List tidak butuh `content` (field terbesar) — proyeksikan field kartu saja.
    select: {
      title: true,
      slug: true,
      excerpt: true,
      heroImage: true,
      categories: true,
      publishedAt: true,
      readingTime: true,
    },
  })
  return docs
})

export const getPostBySlug = cache(async (slug: string): Promise<Post | null> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: {
      and: [{ slug: { equals: slug } }, { _status: { equals: 'published' } }],
    },
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
})

export const getAllPublishedSlugs = cache(async (): Promise<string[]> => {
  const payload = await getPayload({ config })
  const { docs } = await payload.find({
    collection: 'posts',
    where: { _status: { equals: 'published' } },
    depth: 0,
    limit: 5000,
    pagination: false,
    select: { slug: true },
  })
  return docs.map((d) => d.slug).filter(Boolean)
})

/** Lean query khusus sitemap: cuma slug + updatedAt, depth 0. */
export const getPostsForSitemap = cache(
  async (): Promise<Array<{ slug: string; updatedAt: string }>> => {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'posts',
      where: { _status: { equals: 'published' } },
      depth: 0,
      limit: 5000,
      pagination: false,
      select: { slug: true, updatedAt: true },
    })
    return docs.map((d) => ({ slug: d.slug, updatedAt: d.updatedAt }))
  },
)

/** Judul kategori pertama (relasi populated). Null kalau belum ada/ID saja. */
export function categoryTitle(post: Pick<Post, 'categories'>): string | null {
  const cat = post.categories?.[0]
  if (cat && typeof cat === 'object' && 'title' in cat) return (cat as Category).title
  return null
}

type MediaSize = 'thumbnail' | 'card' | 'og' | 'feature'

/** Buang origin → path relatif, biar next/image treat same-origin (dev & prod). */
function toRelative(url?: string | null): string | null {
  if (!url) return null
  if (url.startsWith('/')) return url
  try {
    const u = new URL(url)
    return u.pathname + u.search
  } catch {
    return url
  }
}

/** Ambil URL gambar dari field upload (populated). Optional pilih ukuran. */
export function mediaURL(
  img: number | Media | null | undefined,
  size?: MediaSize,
): string | null {
  if (!img || typeof img === 'number') return null
  if (size && img.sizes?.[size]?.url) return toRelative(img.sizes[size]!.url)
  return toRelative(img.url)
}

/** Dimensi gambar (untuk next/image, cegah CLS). */
export function mediaDimensions(
  img: number | Media | null | undefined,
  size?: MediaSize,
): { width: number; height: number } | null {
  if (!img || typeof img === 'number') return null
  if (size && img.sizes?.[size]?.width && img.sizes[size]?.height) {
    return { width: img.sizes[size]!.width!, height: img.sizes[size]!.height! }
  }
  if (img.width && img.height) return { width: img.width, height: img.height }
  return null
}

const dateFormatter = new Intl.DateTimeFormat('id-ID', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

/** Format tanggal Indonesia: "5 Juni 2026". */
export function formatPostDate(date?: string | null): string {
  if (!date) return ''
  return dateFormatter.format(new Date(date))
}
