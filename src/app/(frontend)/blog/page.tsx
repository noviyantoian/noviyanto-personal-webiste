import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight, Clock } from 'lucide-react'
import { getPublishedPosts, mediaURL, formatPostDate, categoryTitle, type PostCardData } from '@/lib/blog'
import { blogListSchema, breadcrumbSchema, safeJsonLd } from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'

export const revalidate = 300 // ISR — blog di-cache, DB jarang kepukul

export async function generateMetadata(): Promise<Metadata> {
  return buildMetadata({
    title: 'Blog & Wawasan Digital',
    description:
      'Artikel praktis seputar web development, SEO, Google Ads, dan strategi pertumbuhan bisnis dari Noviyanto — digital growth partner.',
    path: '/blog',
    keywords: ['blog digital marketing', 'tips SEO', 'web development', 'Noviyanto'],
  })
}

function PostCard({ post, featured = false }: { post: PostCardData; featured?: boolean }) {
  const img = mediaURL(post.heroImage, featured ? 'feature' : 'card')
  const category = categoryTitle(post)

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white
                 transition-all duration-200 hover:border-amber-300/70 hover:shadow-sm"
    >
      <div className={`relative w-full overflow-hidden bg-gray-100 ${featured ? 'aspect-[16/9]' : 'aspect-[16/10]'}`}>
        {img && (
          <Image
            src={img}
            alt={typeof post.heroImage === 'object' ? post.heroImage.alt : post.title}
            fill
            priority={featured}
            sizes={featured ? '(max-width: 1024px) 100vw, 66vw' : '(max-width: 768px) 100vw, 33vw'}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        )}
        {category && (
          <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-amber-700 shadow-sm backdrop-blur">
            {category}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h2
          className={`font-display font-semibold leading-snug text-gray-900 transition-colors group-hover:text-amber-700
                      ${featured ? 'text-2xl lg:text-3xl' : 'text-lg'}`}
        >
          {post.title}
        </h2>
        <p className={`mt-3 flex-1 text-gray-500 ${featured ? 'text-base' : 'text-sm'} line-clamp-3`}>
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3 text-xs text-gray-400">
          <span>{formatPostDate(post.publishedAt)}</span>
          {post.readingTime ? (
            <>
              <span aria-hidden>·</span>
              <span className="inline-flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden="true" />
                {post.readingTime} mnt baca
              </span>
            </>
          ) : null}
          <ArrowUpRight
            className="ml-auto h-4 w-4 text-gray-300 transition-colors group-hover:text-amber-600"
            strokeWidth={1.75}
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  )
}

export default async function BlogPage() {
  const posts = await getPublishedPosts()
  const url = `${SITE.url}/blog`

  const jsonLd = [
    blogListSchema({
      url,
      items: posts.map((p) => ({
        name: p.title,
        url: `${SITE.url}/blog/${p.slug}`,
        description: p.excerpt,
      })),
    }),
    breadcrumbSchema([
      { name: 'Beranda', url: SITE.url },
      { name: 'Blog', url },
    ]),
  ]

  const [featured, ...rest] = posts

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        {/* Header */}
        <header className="max-w-2xl">
          <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-sm font-semibold text-amber-700">
            Blog
          </span>
          <h1 className="mt-5 text-4xl font-semibold tracking-tight text-gray-900 lg:text-5xl">
            Wawasan untuk bisnis yang ingin <span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">bertumbuh</span>
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            Tips praktis seputar website, SEO, Google Ads, dan otomasi — dari pengalaman menangani
            puluhan bisnis lintas industri.
          </p>
        </header>

        {/* Posts */}
        {posts.length === 0 ? (
          <div className="mt-16 rounded-2xl border border-dashed border-gray-200 bg-gray-50 p-16 text-center">
            <p className="text-gray-500">Belum ada artikel. Nantikan tulisan pertama segera.</p>
          </div>
        ) : (
          <div className="mt-14 space-y-10">
            {featured && (
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <PostCard post={featured} featured />
                </div>
                {rest[0] && (
                  <div className="lg:col-span-1">
                    <PostCard post={rest[0]} />
                  </div>
                )}
              </div>
            )}
            {rest.length > 1 && (
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                {rest.slice(1).map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </>
  )
}
