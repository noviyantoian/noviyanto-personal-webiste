import type { Access } from 'payload'

/** Akses publik penuh (read gambar, dll). */
export const anyone: Access = () => true

/** Hanya user login (editor/admin). */
export const authenticated: Access = ({ req: { user } }) => Boolean(user)

/** Hanya admin — untuk operasi destruktif / sensitif. */
export const adminOnly: Access = ({ req: { user } }) => user?.role === 'admin'

/** Publik lihat published saja; user login lihat semua (termasuk draft). */
export const publishedOrAuthenticated: Access = ({ req: { user } }) => {
  if (user) return true
  return { _status: { equals: 'published' } }
}
