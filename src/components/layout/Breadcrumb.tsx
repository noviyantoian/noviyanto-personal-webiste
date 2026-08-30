import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

/** Window control ala terminal — murni dekoratif, ditint ke palet amber. */
const WINDOW_DOTS = ['bg-amber-400', 'bg-amber-200', 'bg-gray-200'] as const

/**
 * Breadcrumb bergaya prompt shell (ZSH): jendela terminal mini berisi caret
 * amber, path yang dipisah "/", dan kursor blok yang berkedip di ujungnya.
 *
 * Gugus dekorasi kiri dikunci setinggi satu baris (h-[1.4em], sama dengan
 * line-height .zsh-shell) supaya tetap sejajar baris pertama saat path
 * membungkus di layar sempit.
 */
export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="zsh-bar">
      <nav aria-label="Breadcrumb" className="container-wide py-3 sm:py-4">
        <div className="zsh-shell inline-flex max-w-full items-start gap-2.5 rounded-md py-1.5 pl-2.5 pr-3.5">
          <span
            aria-hidden="true"
            className="flex h-[1.4em] shrink-0 items-center gap-2.5"
          >
            <span className="flex items-center gap-1">
              {WINDOW_DOTS.map((dot) => (
                <span key={dot} className={cn('h-1.5 w-1.5 rounded-full', dot)} />
              ))}
            </span>
            <span className="h-3.5 w-px bg-gray-200" />
            <ChevronRight className="h-3.5 w-3.5 text-amber-500" strokeWidth={3} />
          </span>

          <ol className="flex flex-wrap items-center gap-y-1">
            {items.map((item, i) => {
              const isLast = i === items.length - 1
              return (
                <li key={item.label} className="flex items-center">
                  {item.href && !isLast ? (
                    <Link href={item.href} className="zsh-seg">
                      {item.label}
                    </Link>
                  ) : (
                    <span
                      aria-current={isLast ? 'page' : undefined}
                      className={isLast ? 'font-semibold text-[#111827]' : 'text-[#6B7280]'}
                    >
                      {item.label}
                    </span>
                  )}

                  {isLast ? (
                    <span
                      aria-hidden="true"
                      className="zsh-caret ml-1.5 inline-block h-[1.05em] w-[0.5em] rounded-[1px] bg-amber-500"
                    />
                  ) : (
                    <span aria-hidden="true" className="px-1.5 text-amber-500/55">
                      /
                    </span>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
      </nav>
    </div>
  )
}
