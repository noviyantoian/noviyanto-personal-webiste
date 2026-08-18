'use client'

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import { SERVICE_OPTIONS, isValidEmail, leadWaLink, type LeadInput } from '@/lib/lead'
import { trackEvent } from '@/lib/analytics'

interface ConsultationFormProps {
  /** Asal CTA/halaman — disimpan ke lead untuk atribusi. */
  source?: string
  /** Layanan terpilih default (mis. dari halaman layanan tertentu). */
  defaultService?: string
  /** Dipanggil saat sukses (mis. menutup modal). */
  onSuccess?: () => void
}

type Status = 'idle' | 'submitting' | 'redirecting' | 'error'

export default function ConsultationForm({
  source = 'unknown',
  defaultService,
  onSuccess,
}: ConsultationFormProps) {
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const fd = new FormData(e.currentTarget)
    // Honeypot — bot mengisi field tersembunyi ini.
    if (fd.get('website')) return

    const lead: LeadInput = {
      name: String(fd.get('name') ?? '').trim(),
      email: String(fd.get('email') ?? '').trim(),
      whatsapp: String(fd.get('whatsapp') ?? '').trim(),
      service: String(fd.get('service') ?? '') || undefined,
      message: String(fd.get('message') ?? '').trim() || undefined,
    }
    if (!lead.name || !lead.email || !lead.whatsapp) {
      setStatus('error')
      setErrorMsg('Nama, email, dan nomor WhatsApp wajib diisi.')
      return
    }
    if (!isValidEmail(lead.email)) {
      setStatus('error')
      setErrorMsg('Format email belum benar. Contoh: nama@domain.com')
      return
    }

    setStatus('submitting')
    setErrorMsg('')

    // Fire-and-forget — API failure tidak blokir redirect ke WA
    fetch('/api/lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...lead, source, website: '' }),
    }).catch(() => {/* ignore — user tetap diarahkan ke WA */})

    trackEvent('form_submit', { service: lead.service ?? '', source })
    setStatus('redirecting')
    onSuccess?.()
    window.location.href = leadWaLink(lead)
  }

  const busy = status === 'submitting' || status === 'redirecting'

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Honeypot — disembunyikan dari manusia */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <div>
        <label htmlFor="lead-name" className="mb-1.5 block text-sm font-medium text-gray-700">
          Nama <span className="text-amber-600">*</span>
        </label>
        <input
          id="lead-name"
          name="name"
          required
          autoComplete="name"
          placeholder="Nama Anda"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label htmlFor="lead-email" className="mb-1.5 block text-sm font-medium text-gray-700">
          Email <span className="text-amber-600">*</span>
        </label>
        <input
          id="lead-email"
          name="email"
          type="email"
          inputMode="email"
          required
          autoComplete="email"
          placeholder="nama@domain.com"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label htmlFor="lead-wa" className="mb-1.5 block text-sm font-medium text-gray-700">
          Nomor WhatsApp <span className="text-amber-600">*</span>
        </label>
        <input
          id="lead-wa"
          name="whatsapp"
          type="tel"
          inputMode="tel"
          required
          autoComplete="tel"
          placeholder="08xxxxxxxxxx"
          className="w-full rounded-xl border border-gray-200 px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        />
      </div>

      <div>
        <label htmlFor="lead-service" className="mb-1.5 block text-sm font-medium text-gray-700">
          Layanan yang diminati
        </label>
        <select
          id="lead-service"
          name="service"
          defaultValue={defaultService ?? ''}
          className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
        >
          <option value="">Pilih layanan (opsional)</option>
          {SERVICE_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="lead-message" className="mb-1.5 block text-sm font-medium text-gray-700">
          Ceritakan kebutuhan Anda
        </label>
        <textarea
          id="lead-message"
          name="message"
          rows={3}
          placeholder="Kondisi bisnis & target Anda secara singkat (opsional)"
          className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3 text-[15px] text-gray-900 outline-none transition-colors focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
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
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3.5 font-semibold text-gray-900 transition-colors hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {busy ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            {status === 'redirecting' ? 'Mengarahkan ke WhatsApp…' : 'Mengirim…'}
          </>
        ) : (
          <>
            <Send className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
            Kirim & Lanjut ke WhatsApp
          </>
        )}
      </button>

      <p className="text-center text-xs text-gray-400">
        Data Anda hanya dipakai untuk menindaklanjuti konsultasi. Setelah kirim, Anda diarahkan ke WhatsApp.
      </p>
    </form>
  )
}
