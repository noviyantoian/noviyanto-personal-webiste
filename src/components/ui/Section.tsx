import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface SectionProps {
  id?: string
  className?: string
  children: ReactNode
}

export default function Section({ id, className, children }: SectionProps) {
  return (
    <section id={id} className={cn('relative py-20 lg:py-32', className)}>
      <div className="container-wide">{children}</div>
    </section>
  )
}
