import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, Clock } from 'lucide-react'
import RichText from '@/components/blog/RichText'
import {
  getPostBySlug,
  getAllPublishedSlugs,
  mediaURL,
  mediaDimensions,
  formatPostDate,
  categoryTitle,
} from '@/lib/blog'
import {
  blogPostingSchema,
  breadcrumbSchema,
  safeJsonLd,
} from '@/lib/seo'
import { buildMetadata } from '@/lib/page-metadata'
import { SITE } from '@/lib/constants'

export const revalidate = 300

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const slugs = await getAllPublishedSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return { title: 'Artikel tidak ditemukan' }

  const ogPath = mediaURL(post.meta?.image ?? post.heroImage, 'og')
  const ogImage = ogPath ? `${SITE.url}${ogPath}` : undefined

  return await buildMetadata({
    title: post.meta?.title ?? post.title,
    description: post.meta?.description ?? post.excerpt,
    path: `/blog/${post.slug}`,
    ogImage,
  })
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const url = `${SITE.url}/blog/${post.slug}`
  const heroSrc = mediaURL(post.heroImage, 'feature')
  const heroDim = mediaDimensions(post.heroImage, 'feature')
  const heroAlt = typeof post.heroImage === 'object' ? post.heroImage.alt : post.title
  const ogPath = mediaURL(post.meta?.image ?? post.heroImage, 'og')
  const category = categoryTitle(post)

  const jsonLd = [
    blogPostingSchema({
      title: post.title,
      description: post.excerpt,
      url,
      image: ogPath ? `${SITE.url}${ogPath}` : undefined,
      datePublished: post.publishedAt ?? post.createdAt,
      dateModified: post.updatedAt,
      authorName: post.author,
    }),
    breadcrumbSchema([
      { name: 'Beranda', url: SITE.url },
      { name: 'Blog', url: `${SITE.url}/blog` },
      { name: post.title, url },
    ]),
  ]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:py-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-amber-700"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
            Semua Artikel
          </Link>
        </nav>

        {/* Header */}
        <header>
          {category && (
            <span className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
              {category}
            </span>
          )}
          <h1 className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-gray-900 lg:text-[2.75rem]">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-gray-500">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-400">
            <span className="font-medium text-gray-600">{post.author}</span>
            <span aria-hidden>·</span>
            <time dateTime={post.publishedAt ?? undefined}>{formatPostDate(post.publishedAt)}</time>
            {post.readingTime ? (
              <>
                <span aria-hidden>·</span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-4 w-4" strokeWidth={1.75} aria-hidden="true" />
                  {post.readingTime} menit baca
                </span>
              </>
            ) : null}
          </div>
        </header>

        {/* Hero image */}
        {heroSrc && (
          <div className="relative mt-10 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              src={heroSrc}
              alt={heroAlt}
              width={heroDim?.width ?? 1600}
              height={heroDim?.height ?? 900}
              priority
              sizes="(max-width: 768px) 100vw, 768px"
              className="h-auto w-full object-cover"
            />
          </div>
        )}

        {/* Body */}
        <div className="mt-12">
          <RichText data={post.content} />
        </div>

        {/* CTA */}
        <aside className="mt-16 rounded-2xl border border-amber-200 bg-amber-50 p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-900">Punya pertanyaan soal bisnis digital Anda?</h2>
          <p className="mt-2 text-gray-600">Diskusikan kebutuhan Anda langsung — gratis, tanpa komitmen.</p>
          <Link
            href="/kontak"
            className="mt-5 inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 font-semibold text-gray-900 transition-colors hover:bg-amber-600"
          >
            Konsultasi Gratis
          </Link>
        </aside>
      </article>
    </>
  )
}
