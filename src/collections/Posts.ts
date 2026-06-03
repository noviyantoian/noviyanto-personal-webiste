import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug.ts'
import { readingTimeMinutes } from '../lib/payload/readingTime.ts'
import { authenticated, adminOnly, publishedOrAuthenticated } from './access'
import { pingIndexNow, blogUrl } from '../lib/indexnow.ts'

/**
 * Posts — artikel blog. Struktur SEO: judul, slug, excerpt (meta desc),
 * hero image (OG), kategori, author, publishedAt, reading time. Draft/publish
 * via versions. Plugin SEO menambah group `meta` per artikel.
 *
 * Akses: publik baca published saja (termasuk version history). Tulis admin
 * login; hapus admin saja.
 */
export const Posts: CollectionConfig = {
  slug: 'posts',
  labels: { singular: 'Artikel', plural: 'Artikel' },
  versions: {
    drafts: {
      autosave: { interval: 800 },
    },
    maxPerDoc: 25,
  },
  access: {
    read: publishedOrAuthenticated,
    // Version history (draft) tidak boleh diakses publik.
    readVersions: authenticated,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', '_status', 'publishedAt'],
    description: 'Artikel blog noviyanto.com',
    livePreview: {
      url: ({ data }) =>
        `${process.env.NEXT_PUBLIC_SERVER_URL}/blog/${data?.slug ?? ''}`,
    },
  },
  hooks: {
    beforeChange: [
      ({ data }) => {
        // Immutable: kembalikan objek baru, jangan mutasi argumen.
        const next = { ...data }
        if (next.content) {
          next.readingTime = readingTimeMinutes(next.content)
        }
        if (next._status === 'published' && !next.publishedAt) {
          next.publishedAt = new Date().toISOString()
        }
        return next
      },
    ],
    afterChange: [
      async ({ doc, req }) => {
        // Ping IndexNow hanya saat artikel published & punya slug.
        // Non-blocking: kegagalan ping tidak mengganggu simpan artikel.
        if (doc._status !== 'published' || !doc.slug) return
        try {
          const result = await pingIndexNow([blogUrl(doc.slug)])
          if (result.ok) {
            req.payload.logger.info(`IndexNow: ping sukses untuk /blog/${doc.slug}`)
          } else {
            req.payload.logger.warn(`IndexNow: ping gagal (${result.error}) untuk /blog/${doc.slug}`)
          }
        } catch (e) {
          req.payload.logger.error('IndexNow: error tak terduga — ' + (e instanceof Error ? e.message : String(e)))
        }
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      maxLength: 120,
      admin: { description: 'Judul artikel — jadi H1 & dasar slug/meta title.' },
    },
    slugField('title'),
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      maxLength: 200,
      admin: {
        description: 'Ringkasan 1-2 kalimat. Dipakai di kartu list & fallback meta description (≤160 char ideal).',
      },
    },
    {
      name: 'heroImage',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: { description: 'Gambar utama — dipakai di hero, kartu list, & OG image.' },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      admin: { description: 'Isi artikel.' },
    },
    {
      name: 'categories',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'text',
      required: true,
      defaultValue: 'Noviyanto',
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        description: 'Tanggal publish (otomatis terisi saat status published).',
        date: { pickerAppearance: 'dayAndTime' },
      },
    },
    {
      name: 'readingTime',
      type: 'number',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Estimasi menit baca (dihitung otomatis).',
      },
    },
  ],
}
