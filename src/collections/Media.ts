import type { CollectionConfig } from 'payload'
import { anyone, authenticated, adminOnly } from './access'

/**
 * Media — upload gambar blog (hero, inline, OG).
 * Read publik, tulis admin login, hapus admin saja.
 * MIME allowlist eksplisit (TANPA svg — cegah stored XSS) + batas ukuran file.
 */
export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: anyone,
    create: authenticated,
    update: authenticated,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'alt',
  },
  upload: {
    mimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/gif'],
    focalPoint: true,
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 432, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
      { name: 'feature', width: 1600, height: 900, position: 'centre' },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Deskripsi gambar untuk screen reader & SEO.' },
    },
    {
      name: 'caption',
      type: 'text',
      admin: { description: 'Keterangan opsional di bawah gambar.' },
    },
  ],
}
