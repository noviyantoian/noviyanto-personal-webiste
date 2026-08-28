/**
 * Converter Markdown (subset) -> Lexical editor state milik Payload.
 *
 * Subset yang didukung sengaja dibatasi pada apa yang dipakai artikel blog:
 *   ## / ### / ####      heading
 *   - item               bullet list
 *   1. item              numbered list
 *   > kutipan            blockquote
 *   ---                  horizontal rule
 *   ![alt](key "cap")    gambar (node upload)
 *   paragraf biasa       dengan **bold**, *italic*, `code`, [teks](url)
 *
 * Tidak ada dependency eksternal — output-nya JSON murni.
 */

const TEXT_BOLD = 1
const TEXT_ITALIC = 2
const TEXT_CODE = 16

const textNode = (text, format = 0) => ({
  type: 'text',
  version: 1,
  detail: 0,
  format,
  mode: 'normal',
  style: '',
  text,
})

const linkNode = (children, url) => ({
  type: 'link',
  version: 3,
  fields: {
    linkType: 'custom',
    newTab: url.startsWith('http'),
    url,
  },
  format: '',
  indent: 0,
  direction: 'ltr',
  children,
})

const elementNode = (type, children, extra = {}) => ({
  type,
  version: 1,
  format: '',
  indent: 0,
  direction: 'ltr',
  children,
  ...extra,
})

const uploadNode = (mediaId) => ({
  type: 'upload',
  version: 3,
  relationTo: 'media',
  value: mediaId,
  fields: null,
  format: '',
})

/** Regex satu-lintasan untuk seluruh penanda inline. */
const INLINE = /(\[[^\]]+\]\([^)]+\))|(\*\*[^*]+\*\*)|(`[^`]+`)|(\*[^*]+\*)/g

/** Ubah satu baris teks jadi deretan text/link node. */
export function parseInline(raw) {
  const nodes = []
  let last = 0
  for (const m of raw.matchAll(INLINE)) {
    if (m.index > last) nodes.push(textNode(raw.slice(last, m.index)))
    const token = m[0]
    if (token.startsWith('[')) {
      const cut = token.indexOf('](')
      nodes.push(linkNode([textNode(token.slice(1, cut))], token.slice(cut + 2, -1)))
    } else if (token.startsWith('**')) {
      nodes.push(textNode(token.slice(2, -2), TEXT_BOLD))
    } else if (token.startsWith('`')) {
      nodes.push(textNode(token.slice(1, -1), TEXT_CODE))
    } else {
      nodes.push(textNode(token.slice(1, -1), TEXT_ITALIC))
    }
    last = m.index + token.length
  }
  if (last < raw.length) nodes.push(textNode(raw.slice(last)))
  return nodes.length ? nodes : [textNode('')]
}

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/
const HEADING_LINE = /^(#{2,4})\s+(.*)$/
const BULLET_LINE = /^[-*]\s+(.*)$/
const ORDERED_LINE = /^\d+\.\s+(.*)$/

const listNode = (items, ordered) =>
  elementNode('list', items.map((item, i) =>
    elementNode('listitem', parseInline(item), { value: i + 1 })
  ), {
    listType: ordered ? 'number' : 'bullet',
    tag: ordered ? 'ol' : 'ul',
    start: 1,
  })

/**
 * @param {string} markdown  isi artikel (tanpa frontmatter)
 * @param {(key: string) => (number|string|null)} resolveMedia  key gambar -> id Media
 * @returns {{root: object}} lexical editor state
 */
export function mdToLexical(markdown, resolveMedia) {
  const lines = markdown.replace(/\r\n/g, '\n').split('\n')
  const children = []

  let paragraph = []
  let list = null // { items: string[], ordered: boolean }

  const flushParagraph = () => {
    if (!paragraph.length) return
    children.push(
      elementNode('paragraph', parseInline(paragraph.join(' ')), {
        textFormat: 0,
        textStyle: '',
      })
    )
    paragraph = []
  }
  const flushList = () => {
    if (!list) return
    children.push(listNode(list.items, list.ordered))
    list = null
  }
  const flushAll = () => {
    flushParagraph()
    flushList()
  }

  for (const rawLine of lines) {
    const line = rawLine.trim()

    if (!line) {
      flushAll()
      continue
    }

    const image = line.match(IMAGE_LINE)
    if (image) {
      flushAll()
      const id = resolveMedia(image[2])
      if (id == null) throw new Error(`Gambar tidak ditemukan untuk key: ${image[2]}`)
      children.push(uploadNode(id))
      continue
    }

    const heading = line.match(HEADING_LINE)
    if (heading) {
      flushAll()
      children.push(
        elementNode('heading', parseInline(heading[2]), { tag: `h${heading[1].length}` })
      )
      continue
    }

    if (line === '---') {
      flushAll()
      children.push({ type: 'horizontalrule', version: 1 })
      continue
    }

    if (line.startsWith('> ')) {
      flushAll()
      children.push(elementNode('quote', parseInline(line.slice(2))))
      continue
    }

    const bullet = line.match(BULLET_LINE)
    if (bullet) {
      flushParagraph()
      if (list && !list.ordered) list.items.push(bullet[1])
      else {
        flushList()
        list = { items: [bullet[1]], ordered: false }
      }
      continue
    }

    const ordered = line.match(ORDERED_LINE)
    if (ordered) {
      flushParagraph()
      if (list && list.ordered) list.items.push(ordered[1])
      else {
        flushList()
        list = { items: [ordered[1]], ordered: true }
      }
      continue
    }

    flushList()
    paragraph.push(line)
  }
  flushAll()

  return {
    root: {
      type: 'root',
      version: 1,
      format: '',
      indent: 0,
      direction: 'ltr',
      children,
    },
  }
}

/** Pisahkan frontmatter YAML sederhana (key: value) dari body. */
export function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) throw new Error('Frontmatter tidak ditemukan')
  const data = {}
  for (const line of match[1].split('\n')) {
    const idx = line.indexOf(':')
    if (idx === -1) continue
    const key = line.slice(0, idx).trim()
    let value = line.slice(idx + 1).trim()
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1)
    }
    data[key] = value
  }
  return { data, body: match[2] }
}
