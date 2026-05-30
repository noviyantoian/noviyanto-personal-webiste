# Component Patterns — noviyanto-website

## Design Tokens

Gunakan CSS variables yang sudah didefinisikan di globals.css:
```css
--color-bg:           #FFFFFF
--color-surface-1:    #F9FAFB
--color-surface-2:    #F3F4F6
--color-border:       #E5E7EB
--color-text:         #111827
--color-text-muted:   #6B7280
--color-text-subtle:  #9CA3AF
--color-accent:       #F59E0B
--color-accent-warm:  #F97316
--color-accent-dark:  #D97706
```

Dalam Tailwind, pakai class yang sesuai:
`bg-white`, `bg-gray-50`, `bg-gray-100`, `border-gray-200`,
`text-gray-900`, `text-gray-500`, `text-amber-500`

Mode: **LIGHT ONLY**. Tidak ada dark mode. Jangan tambahkan class `dark:` apapun.

## Button Component

```tsx
// components/ui/Button.tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  onClick?: () => void
  className?: string
  children: React.ReactNode
}

// Variants:
// primary: bg-accent text-black font-semibold — main CTA
// secondary: border border-border text-primary hover:bg-surface-2
// ghost: text-muted hover:text-primary
```

## Section Component

```tsx
// components/ui/Section.tsx — wrapper standar semua section
interface SectionProps {
  id?: string
  className?: string
  children: React.ReactNode
}

// Selalu pakai Section wrapper agar padding konsisten
// py-20 lg:py-32 + container max-w-7xl
```

## Card Component

```tsx
// Pola card standar — light mode
<div className="bg-white border border-gray-200 rounded-2xl p-6 lg:p-8
                hover:bg-gray-50 hover:border-amber-300/60 hover:shadow-sm
                transition-colors duration-200">
  {/* konten */}
</div>
```

## Gradient Patterns

```tsx
// Accent glow di background — sangat subtle untuk light mode
<div className="absolute inset-0 bg-gradient-radial from-amber-400/6 via-transparent to-transparent" />

// Text gradient — untuk kata kunci di headline
<span className="bg-gradient-to-r from-amber-500 to-orange-500 bg-clip-text text-transparent">
  kata kunci penting
</span>

// Highlight card — border amber tipis dengan bg kuning sangat muda
<div className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
  {/* konten */}
</div>
```

## Animation Variants (Framer Motion)

```tsx
// lib/animations.ts — import dari sini, jangan define inline

export const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
}

export const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
}

export const staggerItem = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

// Pakai whileInView + viewport once:true untuk scroll-triggered
<motion.div
  variants={fadeUp}
  initial="initial"
  whileInView="animate"
  viewport={{ once: true, margin: '-50px' }}
>
```

## Navbar Pattern

```tsx
// Sticky navbar dengan blur background saat scroll
// Mobile: hamburger menu dengan slide-in drawer
// Desktop: horizontal links + CTA button kanan

// Active link: text-accent (amber)
// CTA di navbar: Button variant="primary" size="sm"
```

## Service Card Pattern

```tsx
// Dipakai di homepage services section dan halaman /layanan
interface ServiceCardProps {
  icon: LucideIcon
  title: string
  description: string
  slug: string
  highlight?: boolean // untuk Odoo card — differentiator utama
}
```

## FAQ Pattern

```tsx
// Accordion — satu pertanyaan buka tutup
// Pakai Framer Motion AnimateHeight untuk smooth expand
// Max 6 FAQ per halaman
// Pertanyaan selalu ditulis dari sudut pandang calon klien
```

## Hero Pattern — Homepage

```tsx
// Layout: centered text + subtle background glow
// H1: besar (text-5xl lg:text-7xl), font-display, font-extrabold, text-gray-900
// Subheadline: text-lg lg:text-xl, text-gray-500
// CTA group: primary (amber bg) + secondary (border gray-200)
// Badge di atas H1: "Digital Growth Partner" — bg-amber-50 border border-amber-200 text-amber-700
// Background: white dengan radial gradient amber sangat subtle + dot grid pattern tipis
```

## Floating WhatsApp Button

```tsx
// Posisi: fixed bottom-6 right-6
// Size: 56px × 56px, rounded-full
// Color: bg-[#25D366] (WA green)
// Icon: WhatsApp SVG atau MessageCircle dari lucide
// Animasi: pulse subtle untuk menarik perhatian
// Tooltip: "Chat via WhatsApp" on hover (desktop)
// Z-index: z-50
```

## Accessibility Checklist per Komponen

- [ ] Semua button punya accessible label
- [ ] Semua Image punya alt text yang deskriptif
- [ ] Focus ring visible (`focus-visible:ring-2 focus-visible:ring-accent`)
- [ ] Color contrast ratio min 4.5:1 untuk body text
- [ ] Interactive elements min 44px touch target
- [ ] Skip to main content link di atas navbar
- [ ] ARIA roles untuk nav, main, footer
