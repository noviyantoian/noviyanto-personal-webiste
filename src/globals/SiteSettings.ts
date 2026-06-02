import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Pengaturan Site',
  admin: {
    description: 'Pengaturan global: OG image, profil sosial, jam operasional, dan koordinat lokasi.',
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
          admin: { placeholder: 'https://www.linkedin.com/in/username' },
        },
      ],
    },
    {
      name: 'businessHours',
      label: 'Jam Operasional',
      type: 'array',
      admin: {
        description:
          'Digunakan di schema.org openingHoursSpecification. Tambah satu baris per blok jam (mis. Senin–Jumat 09:00–18:00).',
      },
      fields: [
        {
          name: 'dayOfWeek',
          label: 'Hari',
          type: 'select',
          hasMany: true,
          required: true,
          options: [
            { label: 'Senin', value: 'Monday' },
            { label: 'Selasa', value: 'Tuesday' },
            { label: 'Rabu', value: 'Wednesday' },
            { label: 'Kamis', value: 'Thursday' },
            { label: 'Jumat', value: 'Friday' },
            { label: 'Sabtu', value: 'Saturday' },
            { label: 'Minggu', value: 'Sunday' },
          ],
        },
        {
          name: 'opens',
          label: 'Jam Buka (HH:MM)',
          type: 'text',
          required: true,
          defaultValue: '09:00',
          admin: { placeholder: '09:00' },
        },
        {
          name: 'closes',
          label: 'Jam Tutup (HH:MM)',
          type: 'text',
          required: true,
          defaultValue: '18:00',
          admin: { placeholder: '18:00' },
        },
      ],
    },
    {
      name: 'geo',
      label: 'Koordinat Lokasi (GeoCoordinates)',
      type: 'group',
      admin: {
        description:
          "Digunakan di schema.org geo. Cari koordinat di maps.google.com → klik kanan → \"What's here?\".",
      },
      fields: [
        {
          name: 'latitude',
          label: 'Latitude',
          type: 'number',
          defaultValue: -7.0618,
          admin: { placeholder: '-7.06180' },
        },
        {
          name: 'longitude',
          label: 'Longitude',
          type: 'number',
          defaultValue: 110.3452,
          admin: { placeholder: '110.34520' },
        },
      ],
    },
  ],
}
