# Scaffold New Component

Buat komponen React baru dengan TypeScript.

## Usage
/new-component [nama] [type: ui|section|layout]

Contoh: `/new-component ServiceCard section`

## Template yang Digunakan

```tsx
// components/[type]/[Nama].tsx
'use client' // tambah hanya kalau perlu state/events

import { cn } from '@/lib/utils'

interface [Nama]Props {
  className?: string
  // tambah props lain
}

export default function [Nama]({ className }: [Nama]Props) {
  return (
    <div className={cn('', className)}>
      {/* konten */}
    </div>
  )
}
```

## Checklist
- [ ] Interface props terdefinisi dengan TypeScript
- [ ] `cn()` untuk className merging
- [ ] `'use client'` hanya kalau butuh hooks/events
- [ ] Accessible (aria-label, semantic HTML)
- [ ] Mobile-first Tailwind classes
