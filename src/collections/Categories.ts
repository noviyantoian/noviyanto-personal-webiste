import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug.ts'
import { anyone, authenticated, adminOnly } from './access'

/**
 * Categories — taksonomi blog. Read publik, tulis admin login, hapus admin saja.
 */
export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug'],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    slugField('title'),
    {
      name: 'description',
      type: 'textarea',
      admin: { description: 'Deskripsi singkat kategori (opsional, untuk SEO landing).' },
    },
  ],
}
