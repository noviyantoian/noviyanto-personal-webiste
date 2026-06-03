'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { X, Loader2, Send } from 'lucide-react'
import { TOUR_PACKAGE_OPTIONS, leadWaLink, type LeadInput } from '@/lib/lead'
import { trackEvent } from '@/lib/analytics'

type Status = 'idle' | 'submitting' | 'redirecting' | 'error'

interface TourFormProps {
  defaultPackage?: string
  onClose: () => void
}

function TourFormInner({ defaultPackage, onClose }: TourFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const firstInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    firstInputRef.current?.focus()
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    if (fd.get('website')) return // honeypot

    const lead: LeadInput = {
      name: String(fd.get('name') ?? '').trim(),
      company: String(fd.get('company') ?? '').trim() || undefined,
      whatsapp: String(fd.get('whatsapp') ?? '').trim() || undefined,
      service: String(fd.get('service') ?? '') || undefined,
      message: String(fd.get('message') ?? '').trim() || undefined,
    }

    if (!lead.name) {
      setStatus('error')
      setErrorMsg('Nama wajib diisi.')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...lead, source: 'tour-travel-landing', website: '' }),
      })
      if (!res.ok) throw new Error(`HTTP ${res.status}`)

      trackEvent('form_submit', { service: lead.service ?? '', source: 'tour-travel-landing' })
      setStatus('redirecting')
      onClose()
      window.open(leadWaLink(lead), '_blank', 'noopener,noreferrer')
    } catch {
      setStatus('error')
      setErrorMsg('Gagal mengirim. Coba lagi atau hubungi WhatsApp langsung.')
    }
  }

  const busy = status === 'submitting' || status === 'redirecting'

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="tour-name" className="mb-1.5 block text-sm font-medium text-[#374151]">
          Nama <span className="text-[#F59E0B]">*</span>
        </label>
        <input
          ref={firstInputRef}
          id="tour-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Nama Anda"
          className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#F59E0B] focus:ring-2 focus:ring-[#FDE68A]"
        />
      </div>

      <div>
        <label htmlFor="tour-company" className="mb-1.5 block text-sm font-medium text-[#374151]">
          Nama Bisnis / Perusahaan
        </label>
        <input
          id="tour-company"
          name="company"
          autoComplete="organization"
          placeholder="Misal: Bali Sunrise Tours (opsional)"
          className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#F59E0B] focus:ring-2 focus:ring-[#FDE68A]"
        />
      </div>

      <div>
        <label htmlFor="tour-wa" className="mb-1.5 block text-sm font-medium text-[#374151]">
          Nomor WhatsApp
        </label>
        <input
          id="tour-wa"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="08xxxxxxxxxx (opsional)"
          className="w-full rounded-xl border border-[#E5E7EB] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#F59E0B] focus:ring-2 focus:ring-[#FDE68A]"
        />
      </div>

      <div>
        <label htmlFor="tour-service" className="mb-1.5 block text-sm font-medium text-[#374151]">
          Tertarik paket apa?
        </label>
        <select
          id="tour-service"
          name="service"
          defaultValue={defaultPackage ?? ''}
          className="w-full rounded-xl border border-[#E5E7EB] bg-white px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#F59E0B] focus:ring-2 focus:ring-[#FDE68A]"
        >
          <option value="">Pilih paket (opsional)</option>
          {TOUR_PACKAGE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="tour-message" className="mb-1.5 block text-sm font-medium text-[#374151]">
          Ceritakan kebutuhan Anda
        </label>
        <textarea
          id="tour-message"
          name="message"
          rows={3}
          placeholder="Misal: butuh website untuk 20 paket tour, target pasar wisatawan mancanegara (opsional)"
          className="w-full resize-none rounded-xl border border-[#E5E7EB] px-4 py-3 text-[15px] text-[#111827] outline-none transition-colors focus:border-[#F59E0B] focus:ring-2 focus:ring-[#FDE68A]"
        />
      </div>

      {status === 'error' && (
        <p role="alert" className="text-sm text-red-600">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={busy}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#F59E0B] px-6 py-3.5 font-semibold text-[#111827] transition-colors hover:bg-[#D97706] disabled:cursor-not-allowed disabled:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {status === 'redirecting' ? 'Membuka WhatsApp…' : 'Mengirim…'}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Kirim & Lanjut ke WhatsApp
          </>
        )}
      </button>

      <p className="text-center text-xs text-[#9CA3AF]">
        Data hanya untuk menindaklanjuti konsultasi. Setelah kirim, Anda diarahkan ke WhatsApp.
      </p>
    </form>
  )
}

// ── Modal wrapper ──────────────────────────────────────────────────

interface TourFormModalProps {
  isOpen: boolean
  defaultPackage?: string
  onClose: () => void
}

export function TourFormModal({ isOpen, defaultPackage, onClose }: TourFormModalProps) {
  const handleClose = useCallback(() => onClose(), [onClose])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, handleClose])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Form konsultasi website tour & travel"
    >
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div className="relative w-full max-w-md max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl">
        <div className="flex items-start justify-between p-6 pb-4 border-b border-[#E5E7EB]">
          <div>
            <p className="text-xs font-medium text-[#F59E0B] uppercase tracking-wider mb-1">
              Konsultasi Gratis
            </p>
            <h2 className="font-display font-semibold text-xl text-[#111827]">
              Website Tour &amp; Travel
            </h2>
            <p className="text-sm text-[#6B7280] mt-1">
              Isi form singkat — lanjut diskusi via WhatsApp
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Tutup form"
            className="ml-4 flex-shrink-0 inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#9CA3AF] hover:bg-[#F3F4F6] hover:text-[#374151] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B]"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
        <div className="p-6">
          <TourFormInner defaultPackage={defaultPackage} onClose={handleClose} />
        </div>
      </div>
    </div>
  )
}

// ── Hook untuk manage modal state ──────────────────────────────────

export function useTourForm() {
  const [isOpen, setIsOpen] = useState(false)
  const [defaultPackage, setDefaultPackage] = useState<string | undefined>()

  const open = useCallback((pkg?: string) => {
    setDefaultPackage(pkg)
    setIsOpen(true)
    trackEvent('cta_click', { location: 'tour_form_open', service: pkg ?? '' })
  }, [])

  const close = useCallback(() => setIsOpen(false), [])

  return { isOpen, defaultPackage, open, close }
}
