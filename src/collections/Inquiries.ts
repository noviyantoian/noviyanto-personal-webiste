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
    defaultColumns: ['name', 'company', 'whatsapp', 'service', 'status', 'createdAt'],
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
            subject: `🟡 Lead baru: ${doc.name}${doc.company ? ` (${doc.company})` : ''}`,
            html: `
              <h2 style="font-family:sans-serif;color:#111">Lead baru dari noviyanto.com</h2>
              <table cellpadding="0" cellspacing="0" style="font-family:sans-serif;font-size:14px;border-collapse:collapse;width:100%;max-width:480px">
                <tr><td style="padding:8px 12px;background:#f4f6f7;font-weight:bold;border:1px solid #e5e7eb">Nama</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(doc.name)}</td></tr>
                ${doc.company ? `<tr><td style="padding:8px 12px;background:#f4f6f7;font-weight:bold;border:1px solid #e5e7eb">Perusahaan</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(doc.company)}</td></tr>` : ''}
                <tr><td style="padding:8px 12px;background:#f4f6f7;font-weight:bold;border:1px solid #e5e7eb">WhatsApp</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(doc.whatsapp || '-')}</td></tr>
                <tr><td style="padding:8px 12px;background:#f4f6f7;font-weight:bold;border:1px solid #e5e7eb">Layanan / Paket</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(doc.service || '-')}</td></tr>
                <tr><td style="padding:8px 12px;background:#f4f6f7;font-weight:bold;border:1px solid #e5e7eb">Pesan</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(doc.message || '-')}</td></tr>
                <tr><td style="padding:8px 12px;background:#f4f6f7;font-weight:bold;border:1px solid #e5e7eb">Sumber</td><td style="padding:8px 12px;border:1px solid #e5e7eb">${escapeHtml(doc.source || '-')}</td></tr>
              </table>
              ${doc.whatsapp ? `<p style="font-family:sans-serif;font-size:13px;color:#6b7280;margin-top:16px">👉 <a href="https://wa.me/${onlyDigits(doc.whatsapp)}" style="color:#f59e0b">Buka chat WhatsApp</a></p>` : ''}
            `,
          })
        } catch (e) {
          req.payload.logger.error('Gagal kirim email lead: ' + (e instanceof Error ? e.message : String(e)))
        }
      },
    ],
  },
  fields: [
    { name: 'name', type: 'text', required: true, label: 'Nama' },
    { name: 'company', type: 'text', label: 'Perusahaan / Nama Bisnis', admin: { position: 'sidebar' } },
    { name: 'whatsapp', type: 'text', label: 'Nomor WhatsApp' },
    {
      name: 'service',
      type: 'select',
      label: 'Layanan / Paket yang diminati',
      options: [
        { label: 'Pembuatan Website', value: 'website' },
        { label: 'Google Ads', value: 'google-ads' },
        { label: 'SEO', value: 'seo' },
        { label: 'Digital Marketing', value: 'digital-marketing' },
        { label: 'AI Integration', value: 'ai-integration' },
        { label: 'Aplikasi Mobile', value: 'mobile-app' },
        { label: 'Maintenance', value: 'maintenance' },
        { label: 'Website Tour & Travel — Starter (Rp 3,5jt)', value: 'tour-starter' },
        { label: 'Website Tour & Travel — Professional (Rp 7,5jt)', value: 'tour-professional' },
        { label: 'Website Tour & Travel — Enterprise (Rp 15jt)', value: 'tour-enterprise' },
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
