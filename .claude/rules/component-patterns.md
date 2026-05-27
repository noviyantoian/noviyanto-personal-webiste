# Component Patterns — noviyanto-website

## Design Tokens

Gunakan CSS variables yang sudah didefinisikan di globals.css:
```css
--color-bg:          #0C0C0C
--color-surface-1:   #141414
--color-surface-2:   #1E1E1E
--color-border:      #262626
--color-text:        #FAFAFA
--color-text-muted:  #A3A3A3
--color-accent:      #F59E0B
--color-accent-warm: #F97316
```

Dalam Tailwind, pakai class yang sudah dikonfigurasi:
`bg-bg`, `bg-surface-1`, `bg-surface-2`, `border-border`,
`text-primary`, `text-muted`, `text-accent`

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
// Pola card standar
<div className="bg-surface-1 border border-border rounded-2xl p-6 lg:p-8
                hover:bg-surface-2 hover:border-accent/30
                transition-colors duration-200">
  {/* konten */}
</div>
```

## Gradient Patterns

```tsx
// Accent glow di background — dipakai di hero, CTA section
<div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />

// Text gradient
<span className="bg-gradient-to-r from-accent to-accent-warm bg-clip-text text-transparent">
  kata kunci penting
</span>

// Border gradient card
<div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-accent/40 to-transparent">
  <div className="bg-surface-1 rounded-2xl p-6">
    {/* konten */}
  </div>
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
// H1: besar (text-5xl lg:text-7xl), font-display, font-extrabold
// Subheadline: text-lg lg:text-xl, text-muted
// CTA group: primary (amber) + secondary (ghost)
// Badge di atas H1: "Digital Growth Partner" dengan accent border
// Background: glow effect + subtle grid pattern
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
