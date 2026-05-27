# CLAUDE.md — noviyanto-website

## Project Overview

Personal branding website untuk Noviyanto — digital growth partner berbasis di Semarang.
Positioning: bukan vendor website biasa, tapi partner yang bantu bisnis tumbuh dan mendapatkan leads.

**Domain:** noviyanto.com  
**Stack:** Next.js 16 · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion  
**Hosting:** Vercel  
**Goal:** Lead generation machine — setiap halaman dirancang untuk menghasilkan inquiry/kontak

---

## Design System

### Color Palette
```
Background:     #0C0C0C   (near black, main bg)
Surface 1:      #141414   (card bg)
Surface 2:      #1E1E1E   (elevated card, hover)
Surface 3:      #262626   (border, subtle divider)
Text Primary:   #FAFAFA   (headings)
Text Secondary: #A3A3A3   (body, description)
Text Muted:     #525252   (placeholder, disabled)
Accent:         #F59E0B   (amber — primary CTA, highlights)
Accent Warm:    #F97316   (orange — secondary accent, gradients)
Accent Glow:    #FDE68A   (light amber for glow effects)
Success:        #22C55E
Error:          #EF4444
White:          #FFFFFF
```

### Typography
- **Display/Heading**: Plus Jakarta Sans (700, 800) — pakai via next/font
- **Body**: Inter (400, 500, 600) — pakai via next/font
- Scale: 12 / 14 / 16 / 18 / 20 / 24 / 30 / 36 / 48 / 60 / 72px

### Spacing & Radius
- Section padding: `py-20 lg:py-32` (160px desktop, 80px mobile)
- Container max-width: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- Card radius: `rounded-2xl` (16px)
- Button radius: `rounded-xl` (12px)
- Badge radius: `rounded-full`

### Motion
- Framer Motion untuk entrance animations (`fadeUp`, `stagger`)
- Duration pendek: 0.3s — 0.5s
- Easing: `[0.22, 1, 0.36, 1]` (ease out expo)
- Hindari animasi yang menghalangi interaction (no blocking)
- Respect `prefers-reduced-motion`

---

## Project Structure

```
src/
├── app/                        # Next.js App Router
│   ├── layout.tsx              # Root layout (fonts, metadata, analytics)
│   ├── page.tsx                # Homepage
│   ├── layanan/
│   │   ├── layout.tsx          # Shared service page layout
│   │   ├── page.tsx            # Services overview
│   │   ├── website/page.tsx
│   │   ├── google-ads/page.tsx
│   │   ├── seo/page.tsx
│   │   ├── digital-marketing/page.tsx
│   │   ├── odoo/page.tsx
│   │   ├── ai-integration/page.tsx
│   │   ├── mobile-app/page.tsx
│   │   └── maintenance/page.tsx
│   ├── portofolio/page.tsx
│   ├── tentang/page.tsx
│   ├── kontak/page.tsx
│   ├── blog/
│   │   ├── page.tsx            # Blog list
│   │   └── [slug]/page.tsx     # Blog post
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt
│   └── not-found.tsx
│
├── components/
│   ├── ui/                     # Atomic reusable primitives
│   │   ├── Button.tsx          # CTA buttons (primary/secondary/ghost)
│   │   ├── Badge.tsx
│   │   ├── Card.tsx
│   │   ├── Section.tsx         # Wrapper with standard section padding
│   │   └── AnimatedText.tsx    # Text reveal animations
│   ├── sections/               # Page section blocks
│   │   ├── Hero.tsx
│   │   ├── Stats.tsx           # Social proof numbers
│   │   ├── Services.tsx        # Services grid
│   │   ├── Industries.tsx
│   │   ├── WhyNoviyanto.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Portfolio.tsx
│   │   ├── Process.tsx
│   │   ├── FAQ.tsx
│   │   └── CTA.tsx             # Bottom CTA section
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── FloatingWA.tsx      # WhatsApp float button
│   └── seo/
│       ├── StructuredData.tsx  # JSON-LD schemas
│       └── BreadcrumbNav.tsx
│
├── lib/
│   ├── utils.ts                # cn(), formatDate(), etc.
│   ├── seo.ts                  # generateMetadata helpers
│   ├── analytics.ts            # GA4 event tracking helpers
│   └── constants.ts            # Site config, nav links, contacts
│
├── types/
│   └── index.ts                # Shared TypeScript types
│
├── content/
│   ├── services.ts             # Service data (slug, title, desc, etc.)
│   ├── portfolio.ts            # Portfolio data
│   └── testimonials.ts        # Testimonial data
│
└── styles/
    └── globals.css             # Tailwind directives + custom CSS vars
```

---

## Coding Conventions

### TypeScript
- **Selalu** gunakan TypeScript strict mode
- Definisikan interface/type untuk semua props komponen
- Gunakan `type` untuk object shapes, `interface` untuk extensible contracts
- Jangan gunakan `any` — pakai `unknown` + narrowing kalau perlu

### Component Pattern
```tsx
// Pola standar untuk semua komponen
interface ComponentProps {
  className?: string
  children?: React.ReactNode
}

export default function Component({ className, children }: ComponentProps) {
  return (
    <div className={cn('base-classes', className)}>
      {children}
    </div>
  )
}
```

### Import Order
1. React & Next.js
2. External libraries (framer-motion, lucide-react, dll.)
3. Internal components (@/components/...)
4. Internal lib/utils (@/lib/...)
5. Types (@/types/...)
6. Styles

### Naming
- Komponen: PascalCase (`HeroSection`, `ServiceCard`)
- Fungsi/variables: camelCase
- File komponen: PascalCase (`Button.tsx`)
- File utility: camelCase (`seo.ts`)
- CSS class: Tailwind utility classes, hindari custom class kecuali perlu
- Route: kebab-case (`/layanan/google-ads`)

### `cn()` utility
Selalu gunakan `cn()` dari `@/lib/utils` untuk conditional classes:
```tsx
import { cn } from '@/lib/utils'
className={cn('base', condition && 'conditional', className)}
```

---

## SEO Requirements

Setiap halaman WAJIB punya:

### Metadata
```tsx
export const metadata: Metadata = {
  title: 'Keyword Utama | Noviyanto — Deskripsi Singkat',
  description: '150–160 karakter. Natural, mengandung keyword, jelas value-nya.',
  keywords: ['keyword 1', 'keyword 2', 'lokasi'],
  openGraph: {
    title: '...',
    description: '...',
    url: 'https://noviyanto.com/path',
    images: [{ url: '/og/page-name.jpg', width: 1200, height: 630 }],
  },
  alternates: { canonical: 'https://noviyanto.com/path' },
}
```

### Heading Hierarchy
- Satu `<h1>` per halaman — mengandung keyword utama
- `<h2>` untuk section utama
- `<h3>` untuk subsection
- Jangan skip level heading

### Structured Data (JSON-LD)
- Homepage: `Person` + `ProfessionalService`
- Service pages: `Service` + `LocalBusiness`
- Blog: `Article` + `BreadcrumbList`
- Portofolio: `CreativeWork`

### Image
- Selalu gunakan `next/image` dengan `alt` yang deskriptif
- Format WebP/AVIF via next/image optimization
- Lazy loading default, `priority` hanya untuk hero image

### Core Web Vitals Targets
- LCP < 2.5s
- CLS < 0.1
- INP < 200ms
- Lighthouse Score: 90+ semua kategori

---

## CRO (Conversion Rate Optimization)

### Setiap Halaman Layanan Wajib Punya
1. **Hero CTA** — tombol utama above the fold ("Konsultasi Gratis via WhatsApp")
2. **Social proof** — angka, testimoni, atau logo klien
3. **FAQ** — jawab keberatan umum sebelum calon klien ragu
4. **Bottom CTA** — jangan biarkan user scroll habis tanpa diajak action
5. **WhatsApp Float** — aksesibel dari mana saja di halaman

### Prinsip CTA
- Primary CTA: selalu mengarah ke WhatsApp atau Calendly
- Teks CTA harus action + value: "Konsultasi Gratis" bukan hanya "Hubungi"
- Warna: Accent amber (#F59E0B) untuk primary, surface dark untuk secondary
- Ukuran: min 44px height (touch target)

### Lead Capture
- Form kontak: nama, nomor WA, jenis layanan, deskripsi singkat
- Setelah submit: redirect ke WhatsApp dengan pre-filled message
- Tracking: GA4 event untuk setiap klik CTA

---

## Performance Rules

### Images
```tsx
// SELALU pakai next/image
<Image
  src="/images/hero.jpg"
  alt="Deskripsi yang jelas"
  width={800}
  height={600}
  priority // hanya untuk hero/above-the-fold
  className="..."
/>
```

### Fonts
```tsx
// Di layout.tsx — pakai next/font, jangan import dari CDN
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'
```

### Code Splitting
- Gunakan `dynamic()` untuk komponen berat (animasi kompleks, chart, dll.)
- Lazy load section yang di bawah fold

### Bundle
- Jangan import library besar hanya untuk satu fungsi kecil
- Cek bundle size sebelum commit komponen baru

---

## Analytics & Tracking

### GA4 Events yang Wajib Ditrack
```
cta_click          — setiap klik tombol CTA
whatsapp_click     — klik floating WA atau tombol WA
calendly_open      — buka Calendly widget
form_submit        — submit form kontak
service_view       — halaman layanan dilihat (pageview)
portfolio_click    — klik item portofolio
```

### Implementasi
```tsx
// Di lib/analytics.ts
export function trackEvent(name: string, params?: Record<string, string>) {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', name, params)
  }
}
```

---

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_WA_NUMBER=6281234567890
NEXT_PUBLIC_SITE_URL=https://noviyanto.com
NEXT_PUBLIC_CALENDLY_URL=https://calendly.com/noviyanto
```

---

## Git Conventions

### Branch Naming
- `feat/nama-fitur` — fitur baru
- `fix/nama-bug` — bug fix
- `content/nama-halaman` — perubahan konten
- `perf/optimasi` — optimasi performa
- `seo/halaman` — perubahan SEO

### Commit Message
```
feat: tambah halaman layanan google-ads
fix: perbaiki CLS pada hero section mobile
content: update copywriting halaman utama
perf: lazy load portfolio section
seo: tambah structured data service pages
```

---

## Do & Don't

### DO
- Gunakan `cn()` untuk semua conditional className
- Tambah `aria-label` pada semua interactive element tanpa teks jelas
- Test di mobile sebelum push (375px, 390px, 414px)
- Tambah loading skeleton untuk konten yang di-fetch
- Gunakan semantic HTML (`<article>`, `<section>`, `<nav>`, `<main>`)

### DON'T
- Jangan hardcode warna — selalu pakai CSS variable atau Tailwind token
- Jangan taruh client-side logic di Server Component
- Jangan gunakan `<img>` — selalu `next/image`
- Jangan tambah animasi yang bloking tanpa `prefers-reduced-motion` fallback
- Jangan lupa canonical URL di setiap halaman

---

## Kontak & Referensi

- WA: lihat `NEXT_PUBLIC_WA_NUMBER` di env
- Copywriting: `../copywriting/*.md` (folder sibling)
- PRD: `../PRD_Noviyanto_v2.0_Final.docx`
- Design inspiration: Dribbble personal brand + agency lokal Indonesia
