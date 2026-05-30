import type { CollectionConfig } from 'payload'
import { anyone, authenticated, adminOnly } from './access'

const LEAD_TO = process.env.LEAD_EMAIL_TO || process.env.SMTP_USER || ''

/**
 * Inquiries — lead dari form konsultasi. Tersimpan di DB (inbox admin) +
 * memicu email notifikasi. Create publik (form), baca/kelola admin.
 * Anti-spam: honeypot field `website` (ditolak kalau terisi).
 */
export const Inquiries: CollectionConfig = {
  slug: 'inquiries',
  labels: { singular: 'Lead', plural: 'Leads' },
  access: {
    create: anyone,
    read: authenticated,
    update: adminOnly,
    delete: adminOnly,
  },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'whatsapp', 'service', 'status', 'createdAt'],
    description: 'Lead masuk dari form konsultasi website.',
  },
  hooks: {
    afterChange: [
      async ({ doc, operation, req }) => {
        if (operation !== 'create') return
        if (!LEAD_TO) {
          req.payload.logger.warn('Lead baru tapi LEAD_EMAIL_TO/SMTP_USER belum di-set — email dilewati.')
          return
        }
        try {
          await req.payload.sendEmail({
            to: LEAD_TO,
            subject: `🟡 Lead baru dari website: ${doc.name}`,
            html: `
              <h2>Lead baru dari noviyanto.com</h2>
              <table cellpadding="6" style="font-family:sans-serif;font-size:14px">
                <tr><td><b>Nama</b></td><td>${escapeHtml(doc.name)}</td></tr>
                <tr><td><b>WhatsApp</b></td><td>${escapeHtml(doc.whatsapp)}</td></tr>
                <tr><td><b>Layanan</b></td><td>${escapeHtml(doc.service || '-')}</td></tr>
                <tr><td><b>Pesan</b></td><td>${escapeHtml(doc.message || '-')}</td></tr>
                <tr><td><b>Sumber</b></td><td>${escapeHtml(doc.source || '-')}</td></tr>
              </table>
              <p style="font-family:sans-serif;font-size:13px;color:#666">Balas cepat via WhatsApp: <a href="https://wa.me/${onlyDigits(doc.whatsapp)}">buka chat</a></p>
            `,
          })
        } catch (e) {
          // Jangan gagalkan penyimpanan lead kalau email error — lead tetap aman di DB.
          req.payload.logger.error('Gagal kirim email lead: ' + (e instanceof Error ? e.message : String(e)))
        }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nama' },
    { name: 'whatsapp', type: 'text', required: true, label: 'Nomor WhatsApp' },
    {
      name: 'service',
      type: 'select',
      label: 'Layanan yang diminati',
      options: [
        { label: 'Pembuatan Website', value: 'website' },
        { label: 'Google Ads', value: 'google-ads' },
        { label: 'SEO', value: 'seo' },
        { label: 'Digital Marketing', value: 'digital-marketing' },
        { label: 'AI Integration', value: 'ai-integration' },
        { label: 'Aplikasi Mobile', value: 'mobile-app' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Lainnya / belum yakin', value: 'lainnya' },
      ],
    },
    { name: 'message', type: 'textarea', label: 'Cerita kebutuhan' },
    {
      name: 'source',
      type: 'text',
      label: 'Sumber (halaman/CTA)',
      admin: { readOnly: true, position: 'sidebar' },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'new',
      options: [
        { label: 'Baru', value: 'new' },
        { label: 'Sudah dihubungi', value: 'contacted' },
        { label: 'Selesai', value: 'closed' },
      ],
      admin: { position: 'sidebar' },
    },
    // Honeypot — bot mengisi, manusia tidak. Ditolak saat validasi.
    {
      name: 'website',
      type: 'text',
      admin: { hidden: true },
      validate: (val: unknown) => (val ? 'Spam terdeteksi.' : true),
    },
  ],
}

function escapeHtml(s: string): string {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
}
function onlyDigits(s: string): string {
  return String(s).replace(/\D/g, '')
}
