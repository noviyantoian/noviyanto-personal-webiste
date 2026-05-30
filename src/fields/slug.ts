import type { Field } from 'payload'

/** Ubah string jadi slug URL-safe: transliterasi diakritik, lowercase, spasi→dash. */
export function formatSlug(val: string): string {
  return val
    .normalize('NFD') // pisah huruf + diakritik (é → e + ´)
    .replace(/[̀-ͯ]/g, '') // buang diakritik
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+|-+$/g, '') // trim dash di ujung
    .toLowerCase()
}

/**
 * Field slug reusable. Auto-generate dari field sumber (default `title`)
 * saat slug kosong; tetap bisa di-override manual. Unique + indexed.
 */
export function slugField(from = 'title'): Field {
  return {
    name: 'slug',
    type: 'text',
    index: true,
    unique: true,
    required: true,
    admin: {
      position: 'sidebar',
      description: 'URL slug. Dibuat otomatis dari judul kalau dikosongkan.',
    },
    hooks: {
      beforeValidate: [
        ({ value, data }) => {
          if (typeof value === 'string' && value.length > 0) {
            return formatSlug(value)
          }
          const source = data?.[from]
          return typeof source === 'string' ? formatSlug(source) : value
        },
      ],
    },
  }
}
