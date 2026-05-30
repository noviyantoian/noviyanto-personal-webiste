import { RichText as LexicalRichText } from '@payloadcms/richtext-lexical/react'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { cn } from '@/lib/utils'

interface RichTextProps {
  /** Lexical editor state dari Payload (`post.content`). */
  data: unknown
  className?: string
}

/** Render konten richtext lexical jadi HTML, di-styling via `.blog-prose`. */
export default function RichText({ data, className }: RichTextProps) {
  if (!data) return null
  return (
    <LexicalRichText
      data={data as SerializedEditorState}
      className={cn('blog-prose', className)}
    />
  )
}
