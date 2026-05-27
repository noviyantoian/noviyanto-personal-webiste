'use client'

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void
  }
}

type EventName =
  | 'cta_click'
  | 'whatsapp_click'
  | 'calendly_open'
  | 'form_submit'
  | 'service_view'
  | 'portfolio_click'
  | 'faq_expand'
  | 'scroll_depth'

interface EventParams {
  location?: string
  page?: string
  service?: string
  source?: string
  question?: string
  depth?: number
  [key: string]: string | number | undefined
}

export function trackEvent(name: EventName, params?: EventParams) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('event', name, params)
}

export function trackPageView(url: string) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag('config', process.env.NEXT_PUBLIC_GA_ID ?? '', {
    page_path: url,
  })
}
