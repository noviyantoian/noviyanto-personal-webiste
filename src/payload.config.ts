import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { seoPlugin } from '@payloadcms/plugin-seo'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { nodemailerAdapter } from '@payloadcms/email-nodemailer'

import { Users } from './collections/Users.ts'
import { Media } from './collections/Media.ts'
import { Categories } from './collections/Categories.ts'
import { Posts } from './collections/Posts.ts'
import { Inquiries } from './collections/Inquiries.ts'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// Validasi env di startup — cegah JWT lemah / koneksi diam-diam gagal.
const PAYLOAD_SECRET = process.env.PAYLOAD_SECRET
if (!PAYLOAD_SECRET || PAYLOAD_SECRET.length < 32) {
  throw new Error('PAYLOAD_SECRET wajib di-set dan minimal 32 karakter')
}
const DATABASE_URI = process.env.DATABASE_URI
if (!DATABASE_URI) {
  throw new Error('DATABASE_URI wajib di-set')
}

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || ''

// Email adapter — aktif hanya jika SMTP_HOST di-set; selain itu Payload log ke console.
const emailAdapter = process.env.SMTP_HOST
  ? nodemailerAdapter({
      defaultFromAddress:
        process.env.LEAD_EMAIL_FROM || process.env.SMTP_USER || 'noreply@noviyanto.com',
      defaultFromName: 'Noviyanto',
      transportOptions: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: process.env.SMTP_SECURE === 'true',
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      },
    })
  : undefined

export default buildConfig({
  serverURL,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    meta: {
      titleSuffix: ' — Noviyanto Admin',
    },
  },
  collections: [Posts, Inquiries, Categories, Media, Users],
  editor: lexicalEditor(),
  email: emailAdapter,
  secret: PAYLOAD_SECRET,
  db: postgresAdapter({
    pool: { connectionString: DATABASE_URI },
  }),
  sharp,
  // Batas ukuran upload global (busboy) — cegah disk/OOM.
  upload: {
    limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  },
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  // Batasi origin yang boleh akses API/admin — anti CSRF/CORS abuse.
  cors: serverURL ? [serverURL] : [],
  csrf: serverURL ? [serverURL] : [],
  plugins: [
    seoPlugin({
      collections: ['posts'],
      uploadsCollection: 'media',
      tabbedUI: true,
      generateTitle: ({ doc }: { doc?: { title?: string } }) =>
        doc?.title ? `${doc.title} | Noviyanto` : 'Noviyanto',
      generateDescription: ({ doc }: { doc?: { excerpt?: string } }) =>
        doc?.excerpt ?? '',
      generateURL: ({ doc }: { doc?: { slug?: string } }) =>
        `${serverURL}/blog/${doc?.slug ?? ''}`,
    }),
  ],
})
