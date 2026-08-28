import {
  RichText as LexicalRichText,
  type JSXConvertersFunction,
} from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/lib/utils'

interface RichTextProps {
  /** Lexical editor state dari Payload (`post.content`). */
  data: unknown
  className?: string
}

/** Bentuk minimal dokumen Media yang dipakai node upload. */
interface UploadDoc {
  url?: string | null
  alt?: string | null
  caption?: string | null
  width?: number | null
  height?: number | null
  mimeType?: string | null
}

/**
 * Converter upload kustom.
 *
 * Bawaan Payload merender `<picture>` dengan `<source media="(max-width: …)">`
 * per image size. Karena tiap size punya rasio berbeda (thumbnail 4:3, card
 * 16:9), gambar inline jadi ter-crop beda-beda antar breakpoint. Di sini kita
 * pakai file asli saja — rasio konsisten, satu request — dan menambahkan
 * `<figcaption>` dari field `caption` milik Media.
 */
const converters: JSXConvertersFunction = ({ defaultConverters }) => ({
  ...defaultConverters,
  upload: ({ node }) => {
    const doc = node.value as UploadDoc | number | string | null | undefined
    if (!doc || typeof doc !== 'object' || !doc.url) return null
    if (!doc.mimeType?.startsWith('image')) return null

    return (
      <figure className="blog-figure">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={doc.url}
          alt={doc.alt ?? ''}
          width={doc.width ?? undefined}
          height={doc.height ?? undefined}
          loading="lazy"
          decoding="async"
        />
        {doc.caption ? <figcaption>{doc.caption}</figcaption> : null}
      </figure>
    )
  },
})

/** Render konten richtext lexical jadi HTML, di-styling via `.blog-prose`. */
export default function RichText({ data, className }: RichTextProps) {
  if (!data) return null
  return (
    <LexicalRichText
      converters={converters}
      data={data as SerializedEditorState}
      className={cn('blog-prose', className)}
    />
  )
}
