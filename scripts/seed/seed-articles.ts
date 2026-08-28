/**
 * Seed artikel blog dari file Markdown + gambar hasil generate.
 *
 * Jalankan:  npx payload run scripts/seed/seed-articles.ts
 *
 * Idempoten: media dicocokkan lewat `filename`, artikel lewat `slug`.
 * Menjalankan ulang akan memperbarui, bukan menduplikasi.
 *
 * Default status draft. Tambahkan `--publish` untuk langsung published
 * (ini akan memicu ping IndexNow di hook afterChange Posts).
 */
import { getPayload } from 'payload'
import config from '@payload-config'
import { readdir, readFile, stat } from 'node:fs/promises'
import path from 'node:path'
import type { Post } from '@/payload-types'
import { formatSlug } from '@/fields/slug.ts'
import { mdToLexical, parseFrontmatter } from './md-to-lexical.mjs'

const HERE = path.dirname(new URL(import.meta.url).pathname)
const ARTICLES_DIR = path.join(HERE, 'articles')
const ASSETS_DIR = path.join(HERE, 'assets')

const PUBLISH = process.argv.includes('--publish')

interface Frontmatter {
  slug: string
  title: string
  excerpt: string
  category: string
  heroImage: string
  heroAlt: string
}

/** Alt & caption gambar inline, diambil dari markdown `![alt](key "caption")`. */
type ImageMeta = Map<string, { alt: string; caption?: string }>

const IMAGE_LINE = /^!\[([^\]]*)\]\(([^\s)]+)(?:\s+"([^"]*)")?\)$/gm

function collectImageMeta(body: string, fm: Frontmatter): ImageMeta {
  const meta: ImageMeta = new Map([[fm.heroImage, { alt: fm.heroAlt }]])
  for (const m of body.matchAll(IMAGE_LINE)) {
    meta.set(m[2], { alt: m[1], caption: m[3] })
  }
  return meta
}

async function main() {
  const payload = await getPayload({ config })

  const files = (await readdir(ARTICLES_DIR)).filter((f) => f.endsWith('.md')).sort()
  if (!files.length) throw new Error(`Tidak ada file .md di ${ARTICLES_DIR}`)

  for (const file of files) {
    const source = await readFile(path.join(ARTICLES_DIR, file), 'utf8')
    const { data, body } = parseFrontmatter(source) as { data: Frontmatter; body: string }
    console.log(`\n── ${data.slug}`)

    // 1. Upload semua gambar yang dipakai artikel ini.
    const imageMeta = collectImageMeta(body, data)
    const mediaIds = new Map<string, number>()

    for (const [key, { alt, caption }] of imageMeta) {
      const filename = `${key}.webp`
      const filePath = path.join(ASSETS_DIR, filename)
      await stat(filePath) // gagal cepat kalau aset belum di-generate

      const existing = await payload.find({
        collection: 'media',
        where: { filename: { equals: filename } },
        limit: 1,
        depth: 0,
      })

      // Pada update, sengaja TIDAK mengirim `filePath`: Payload akan menulis
      // file baru dan menambah suffix (`-1`, `-2`, …) karena file lama masih
      // ada, sehingga `filename` doc berubah dan pencarian di run berikutnya
      // meleset lalu membuat media duplikat. Byte gambar dianggap stabil —
      // kalau ilustrasi diganti, hapus doc medianya dulu lewat admin.
      const fields = { alt, ...(caption ? { caption } : {}) }
      const doc = existing.docs[0]
        ? await payload.update({
            collection: 'media',
            id: existing.docs[0].id,
            data: fields,
          })
        : await payload.create({ collection: 'media', data: fields, filePath })

      mediaIds.set(key, doc.id)
      console.log(`   media  ${existing.docs[0] ? 'update' : 'create'}  ${filename}`)
    }

    // 2. Kategori — cari berdasarkan judul, buat kalau belum ada.
    const foundCategory = await payload.find({
      collection: 'categories',
      where: { title: { equals: data.category } },
      limit: 1,
      depth: 0,
    })
    const category =
      foundCategory.docs[0] ??
      (await payload.create({
        collection: 'categories',
        data: { title: data.category, slug: formatSlug(data.category) },
      }))
    console.log(`   kategori ${foundCategory.docs[0] ? 'pakai' : 'buat '}  ${data.category}`)

    // 3. Artikel.
    const content = mdToLexical(
      body,
      (key: string) => mediaIds.get(key) ?? null
    ) as Post['content']
    const heroId = mediaIds.get(data.heroImage)
    if (!heroId) throw new Error(`heroImage "${data.heroImage}" tidak punya media`)

    const postData = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      heroImage: heroId,
      content,
      categories: [category.id],
      author: 'Noviyanto',
      _status: PUBLISH ? ('published' as const) : ('draft' as const),
    }

    const existingPost = await payload.find({
      collection: 'posts',
      where: { slug: { equals: data.slug } },
      limit: 1,
      depth: 0,
      draft: true,
      overrideAccess: true,
    })

    if (existingPost.docs[0]) {
      await payload.update({
        collection: 'posts',
        id: existingPost.docs[0].id,
        data: postData,
        draft: !PUBLISH,
        overrideAccess: true,
      })
      console.log(`   artikel update  (${postData._status})`)
    } else {
      await payload.create({
        collection: 'posts',
        data: postData,
        draft: !PUBLISH,
        overrideAccess: true,
      })
      console.log(`   artikel create  (${postData._status})`)
    }
  }

  console.log(`\nSelesai. ${files.length} artikel diproses.`)
  process.exit(0)
}

await main()
