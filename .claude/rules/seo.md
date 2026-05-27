# SEO Rules — noviyanto-website

## Metadata Wajib Setiap Halaman

```tsx
import type { Metadata } from 'next'
import { generateMetadata as genMeta } from '@/lib/seo'

export const metadata: Metadata = {
  title: '[Keyword Utama] | Noviyanto — [Value Prop Singkat]',
  description: '[150-160 karakter: natural, mengandung keyword, jelas manfaatnya]',
  openGraph: {
    title: '...',
    description: '...',
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/[path]`,
    siteName: 'Noviyanto',
    images: [{ url: '/og/[page].jpg', width: 1200, height: 630, alt: '...' }],
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: '...',
    description: '...',
    images: ['/og/[page].jpg'],
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_SITE_URL}/[path]`,
  },
  robots: {
    index: true,
    follow: true,
  },
}
```

## Keyword Priority per Halaman

| Halaman | Primary Keyword | Secondary | Local |
|---------|----------------|-----------|-------|
| Home | jasa website Semarang | digital marketing Semarang | Semarang, Kendal, Salatiga |
| Website Dev | jasa pembuatan website Semarang | website bisnis profesional | - |
| Google Ads | jasa Google Ads Semarang | Google Ads UMKM | - |
| SEO | jasa SEO Semarang | optimasi website Google | - |
| Odoo | Odoo developer Semarang | implementasi Odoo Indonesia | - |
| AI Integration | integrasi AI bisnis | otomasi bisnis AI | - |
| Portofolio | portofolio web developer Semarang | - | - |

## Heading Structure

```tsx
// BENAR — 1 h1 per halaman, mengandung keyword
<h1>Jasa Pembuatan Website Profesional di Semarang</h1>
<h2>Kenapa Website Anda Belum Menghasilkan?</h2>
<h3>Masalah yang Sering Terjadi</h3>

// SALAH
<h1>Hero</h1>  // tidak ada keyword
<h3>Judul</h3> // skip h2
<h1>Judul Kedua</h1> // dua h1
```

## Structured Data JSON-LD

### Homepage
```tsx
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Noviyanto",
  "jobTitle": "Digital Growth Partner",
  "url": "https://noviyanto.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Semarang",
    "addressRegion": "Jawa Tengah",
    "addressCountry": "ID"
  },
  "areaServed": ["Semarang", "Kendal", "Salatiga"],
  "knowsAbout": ["Web Development", "Digital Marketing", "SEO", "Google Ads", "Odoo", "AI Integration"]
}
```

### Service Pages
```tsx
const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "[Nama Layanan]",
  "provider": {
    "@type": "Person",
    "name": "Noviyanto",
    "url": "https://noviyanto.com"
  },
  "areaServed": "Semarang, Jawa Tengah, Indonesia",
  "description": "[Deskripsi layanan]",
  "url": "https://noviyanto.com/layanan/[slug]"
}
```

## Image SEO

```tsx
// BENAR
<Image
  src="/images/jasa-website-semarang.jpg"
  alt="Noviyanto mengerjakan desain website untuk klien bisnis di Semarang"
  title="Jasa Pembuatan Website Profesional Semarang"
  width={800}
  height={600}
/>

// SALAH
<Image src="/img/hero1.jpg" alt="gambar" width={800} height={600} />
```

## URL Structure

- Gunakan kebab-case: `/layanan/google-ads` bukan `/layanan/GoogleAds`
- Sertakan keyword di URL kalau memungkinkan
- Hindari parameter query untuk halaman utama
- Canonical selalu https dan tanpa trailing slash

## Internal Linking

- Setiap halaman layanan harus link ke 2-3 layanan terkait
- Homepage harus link ke semua halaman layanan utama
- Blog post harus link ke halaman layanan yang relevan
- Gunakan anchor text yang deskriptif, bukan "klik di sini"

## sitemap.ts

```tsx
// src/app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL!
  const services = ['website', 'google-ads', 'seo', 'digital-marketing', 'odoo', 'ai-integration', 'mobile-app', 'maintenance']
  
  return [
    { url: baseUrl, lastModified: new Date(), priority: 1.0 },
    { url: `${baseUrl}/layanan`, lastModified: new Date(), priority: 0.9 },
    ...services.map(s => ({ url: `${baseUrl}/layanan/${s}`, lastModified: new Date(), priority: 0.8 })),
    { url: `${baseUrl}/portofolio`, lastModified: new Date(), priority: 0.7 },
    { url: `${baseUrl}/tentang`, lastModified: new Date(), priority: 0.6 },
    { url: `${baseUrl}/kontak`, lastModified: new Date(), priority: 0.7 },
  ]
}
```
