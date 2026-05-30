import type { CollectionConfig } from 'payload'
import { adminOnly } from './access'

const adminOrSelf = ({ req: { user } }: { req: { user: { id: number; role?: string } | null } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return { id: { equals: user.id } }
}

/**
 * Admin users — autentikasi panel Payload.
 * Hardening: lockout brute-force, token pendek, cookie httpOnly+secure,
 * read/update dibatasi admin-atau-diri-sendiri (editor tidak bisa enumerate
 * akun admin), role hanya admin yang boleh set (cegah privilege escalation).
 */
export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    tokenExpiration: 60 * 60 * 2, // 2 jam
    maxLoginAttempts: 5,
    lockTime: 10 * 60 * 1000, // 10 menit
    cookies: {
      // Payload selalu set httpOnly internal — di sini cukup sameSite + secure.
      sameSite: 'Lax',
      secure: process.env.NODE_ENV === 'production',
    },
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'role'],
  },
  access: {
    read: adminOrSelf,
    create: adminOnly,
    update: adminOrSelf,
    delete: adminOnly,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        create: ({ req: { user } }) => user?.role === 'admin',
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}
