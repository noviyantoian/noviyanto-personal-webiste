# Performance Rules — noviyanto-website

## Core Web Vitals Targets
- LCP (Largest Contentful Paint): < 2.5s
- CLS (Cumulative Layout Shift): < 0.1
- INP (Interaction to Next Paint): < 200ms
- Lighthouse Score: 90+ semua kategori

## Images

### Wajib pakai next/image — tidak boleh <img> biasa
```tsx
import Image from 'next/image'

// Above the fold (hero) — pakai priority
<Image src="/hero.jpg" alt="..." width={1200} height={630} priority />

// Below the fold — lazy load default
<Image src="/portfolio.jpg" alt="..." width={800} height={600} />
```

### Hindari CLS dari images
```tsx
// BENAR — selalu set width/height atau fill+relative container
<div className="relative aspect-video">
  <Image src="..." alt="..." fill className="object-cover" />
</div>

// SALAH — tidak ada dimensi, menyebabkan layout shift
<Image src="..." alt="..." />
```

### Format
- Pakai WebP/AVIF via next/image optimization (default)
- Sumber gambar: simpan di /public/images/ dengan nama deskriptif
- Max upload size: 200KB per gambar sebelum dioptimasi Next.js

## Fonts

```tsx
// Di layout.tsx — next/font, jangan CDN/link tag
import { Plus_Jakarta_Sans, Inter } from 'next/font/google'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-body',
  display: 'swap',
})
```

## Code Splitting

```tsx
// Komponen berat di bawah fold — pakai dynamic import
import dynamic from 'next/dynamic'

const TestimonialsSection = dynamic(() => import('@/components/sections/Testimonials'), {
  loading: () => <div className="h-96 animate-pulse bg-surface-1 rounded-2xl" />,
})

const PortfolioGrid = dynamic(() => import('@/components/sections/Portfolio'), {
  loading: () => <div className="h-64 animate-pulse bg-surface-1 rounded-2xl" />,
})
```

## Animasi & Framer Motion

```tsx
// Gunakan AnimatePresence dan variants — jangan inline style
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
}

// WAJIB: Respect prefers-reduced-motion
import { useReducedMotion } from 'framer-motion'

function AnimatedSection({ children }) {
  const shouldReduce = useReducedMotion()
  
  return (
    <motion.div
      initial={shouldReduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  )
}
```

## Server vs Client Components

```tsx
// DEFAULT: Server Component (tidak perlu 'use client')
// Pakai untuk: halaman statis, fetch data, SEO-critical content

// Tambah 'use client' HANYA kalau butuh:
// - useState / useEffect / useRef
// - Event handlers (onClick, onChange)
// - Browser APIs
// - Framer Motion animations

'use client'
import { useState } from 'react'
```

## Bundle Size — Checklist
- [ ] Cek `npm run build` output untuk setiap route
- [ ] Hindari import library besar hanya untuk 1 fungsi (lodash, moment, dll.)
- [ ] Gunakan tree-shakeable imports: `import { motion } from 'framer-motion'`
- [ ] Jangan import seluruh icon pack — import spesifik dari lucide-react

## next.config.ts Optimizations

```ts
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
  },
  compress: true,
  poweredByHeader: false,
  headers: async () => [
    {
      source: '/(.*)',
      headers: [
        { key: 'X-Content-Type-Options', value: 'nosniff' },
        { key: 'X-Frame-Options', value: 'DENY' },
        { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      ],
    },
    {
      source: '/fonts/(.*)',
      headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
    },
  ],
}
```
