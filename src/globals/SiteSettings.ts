import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Site',
  admin: {
    description: 'Pengaturan global: OG image default, profil sosial (sameAs), dan SEO sitewide.',
    group: 'Konfigurasi',
  },
  fields: [
    {
      name: 'defaultOgImage',
      label: 'OG Image Default',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Gambar preview yang tampil saat halaman tidak punya OG image sendiri. Ukuran ideal: 1200×630px.',
      },
    },
    {
      name: 'sameAs',
      label: 'Profil Sosial (sameAs Schema)',
      type: 'array',
      admin: {
        description:
          'URL profil untuk Google Knowledge Graph. Tambahkan LinkedIn, Instagram, Google Business Profile, dll.',
      },
      fields: [
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
          admin: {
            placeholder: 'https://www.linkedin.com/in/username',
          },
        },
      ],
    },
  ],
}
