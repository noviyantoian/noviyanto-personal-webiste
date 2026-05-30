import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="bg-white border-b border-gray-100">
      <nav
        aria-label="Breadcrumb"
        className="container-wide py-4 text-xs sm:text-sm text-[#6B7280]"
      >
        <ol className="flex items-center gap-1.5 flex-wrap">
          {items.map((item, i) => {
            const isLast = i === items.length - 1
            return (
              <li key={item.label} className="flex items-center gap-1.5">
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-amber-700 transition-colors"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-[#111827] font-medium' : ''}>
                    {item.label}
                  </span>
                )}
                {!isLast ? (
                  <ChevronRight
                    className="w-3.5 h-3.5 text-[#D1D5DB]"
                    aria-hidden="true"
                  />
                ) : null}
              </li>
            )
          })}
        </ol>
      </nav>
    </div>
  )
}
