'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { X } from 'lucide-react'
import ConsultationForm from './ConsultationForm'

interface LeadModalContext {
  open: (source?: string) => void
}

const Ctx = createContext<LeadModalContext>({ open: () => {} })

/** Hook untuk membuka modal konsultasi dari mana saja (mis. FloatingWA). */
export const useLeadModal = () => useContext(Ctx)

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [source, setSource] = useState('floating')

  const open = useCallback((s?: string) => {
    setSource(s ?? 'floating')
    setIsOpen(true)
  }, [])
  const close = useCallback(() => setIsOpen(false), [])

  return (
    <Ctx.Provider value={{ open }}>
      {children}
      {isOpen && <LeadModal source={source} onClose={close} />}
    </Ctx.Provider>
  )
}

function LeadModal({ source, onClose }: { source: string; onClose: () => void }) {
  // Tutup dengan Esc + kunci scroll body selama modal terbuka.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="lead-modal-title"
      className="fixed inset-0 z-[100] flex items-end justify-center bg-gray-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-t-3xl bg-white p-6 shadow-xl sm:rounded-3xl sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup"
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
          Konsultasi Gratis
        </span>
        <h2
          id="lead-modal-title"
          className="mt-3 font-display text-xl font-semibold text-gray-900"
        >
          Ceritakan kebutuhan Anda
        </h2>
        <p className="mt-1.5 mb-5 text-sm text-gray-500">
          Isi sebentar, lalu kita lanjut ngobrol langsung di WhatsApp.
        </p>

        <ConsultationForm source={source} onSuccess={onClose} />
      </div>
    </div>
  )
}
