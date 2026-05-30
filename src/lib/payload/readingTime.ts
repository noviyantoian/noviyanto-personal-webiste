/** Node lexical minimal — cuma yang dibutuhkan untuk hitung kata. */
interface LexicalNode {
  text?: string
  children?: LexicalNode[]
}

interface LexicalContent {
  root?: LexicalNode
}

/** Traverse rich text lexical, kumpulkan semua teks, hitung jumlah kata. */
export function countWords(content?: LexicalContent | null): number {
  if (!content?.root) return 0

  let text = ''
  const walk = (node: LexicalNode): void => {
    if (typeof node.text === 'string') text += ` ${node.text}`
    node.children?.forEach(walk)
  }
  walk(content.root)

  return text.trim().split(/\s+/).filter(Boolean).length
}

/** Estimasi waktu baca (menit). Default 200 kata/menit, minimal 1. */
export function readingTimeMinutes(content?: LexicalContent | null, wpm = 200): number {
  const words = countWords(content)
  return Math.max(1, Math.ceil(words / wpm))
}
