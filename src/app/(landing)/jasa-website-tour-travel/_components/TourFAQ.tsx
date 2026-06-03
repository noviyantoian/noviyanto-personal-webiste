'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Berapa lama proses pembuatan website?',
    answer:
      'Rata-rata 14–21 hari kerja. Paket Starter bisa selesai 7–10 hari. Progress selalu dikomunikasikan secara transparan via WhatsApp.',
  },
  {
    question: 'Apakah saya bisa update konten website sendiri?',
    answer:
      'Ya! Noviyanto menggunakan CMS yang ramah pengguna dan memberikan pelatihan. Update paket, foto, harga, dan blog — tanpa coding.',
  },
  {
    question: 'Bagaimana jika saya tidak puas dengan hasilnya?',
    answer:
      'Ada garansi revisi tidak terbatas (sesuai paket). Noviyanto tidak berhenti sampai Anda 100% puas.',
  },
  {
    question: 'Apakah website bisa muncul di halaman pertama Google?',
    answer:
      'SEO on-page dioptimalkan dari awal. Untuk hasil maksimal, Noviyanto bantu juga setup Google Business Profile dan strategi konten.',
  },
  {
    question: 'Bagaimana sistem pembayaran booking online?',
    answer:
      'Paket Enterprise sudah include payment gateway (Midtrans/Xendit). Paket lain menggunakan konfirmasi transfer bank via WhatsApp.',
  },
  {
    question: 'Ada biaya rutin setelah website jadi?',
    answer:
      'Hosting & domain gratis 1 tahun. Tahun berikutnya Rp 500.000–1.500.000/tahun. Tidak ada biaya tersembunyi.',
  },
  {
    question: 'Bisa dicicil pembayarannya?',
    answer:
      'Bisa. DP 50% di awal, sisanya setelah website selesai dan Anda puas. Enterprise tersedia cicilan 3×.',
  },
]

function FAQItem({ item, index }: { item: FAQItem; index: number }) {
  const [open, setOpen] = useState(false)
  const id = `faq-${index}`

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-[#F9FAFB] transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-inset"
      >
        <span className="font-medium text-[#111827] text-sm sm:text-base">{item.question}</span>
        <ChevronDown
          className={`w-4 h-4 text-[#9CA3AF] flex-shrink-0 transition-transform duration-200 ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id={id} className="px-5 pb-4 bg-white">
          <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">{item.answer}</p>
        </div>
      )}
    </div>
  )
}

export default function TourFAQ() {
  return (
    <section id="faq" className="bg-[#F9FAFB] py-20 lg:py-28">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3">
            Masih Ada Pertanyaan?
          </h2>
          <p className="text-[#6B7280]">Kami jawab semua di sini</p>
        </div>
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, i) => (
            <FAQItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
