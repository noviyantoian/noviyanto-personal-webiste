// ── Service ──────────────────────────────────────────────────────
export interface Service {
  slug: string
  title: string
  shortTitle: string
  description: string
  longDescription: string
  icon: string
  highlight?: boolean
  features: string[]
  waMessage: string
  metaTitle: string
  metaDescription: string
}

// ── Portfolio ────────────────────────────────────────────────────
export interface PortfolioItem {
  id: string
  title: string
  client?: string
  industry: string
  services: string[]
  description: string
  result?: string
  image?: string
  url?: string
  featured?: boolean
}

// ── Testimonial ──────────────────────────────────────────────────
export interface Testimonial {
  id: string
  name: string
  role?: string
  industry: string
  quote: string
  avatar?: string
}

// ── FAQ ──────────────────────────────────────────────────────────
export interface FAQItem {
  question: string
  answer: string
}

// ── Blog Post ────────────────────────────────────────────────────
export interface BlogPost {
  slug: string
  title: string
  description: string
  publishedAt: string
  updatedAt?: string
  readingTime: number
  tags: string[]
  featured?: boolean
}

// ── Nav ──────────────────────────────────────────────────────────
export interface NavLink {
  label: string
  href: string
  external?: boolean
}
