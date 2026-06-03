'use client'

import {
  Smartphone, CalendarCheck, Images, Search, Star,
  MapPin, MessageCircle, Zap, Check, XCircle,
  Plane, TrendingUp,
} from 'lucide-react'
import { SITE } from '@/lib/constants'
import { TourFormModal, useTourForm } from './TourForm'
import TourHero from './TourHero'
import TourFAQ from './TourFAQ'

// ── Stats ──────────────────────────────────────────────────────────

function TourStats() {
  const stats = [
    { value: '50+', label: 'Website Tour & Travel Terbangun' },
    { value: '5+', label: 'Tahun Pengalaman Digital' },
    { value: '98%', label: 'Klien Puas & Repeat Order' },
    { value: '21', label: 'Hari Rata-Rata Selesai' },
  ]
  return (
    <section id="stats" className="bg-[#F9FAFB] py-14 border-y border-[#E5E7EB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-display font-semibold text-3xl sm:text-4xl text-[#F59E0B] mb-1">{s.value}</div>
              <div className="text-sm text-[#6B7280]">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Pain ───────────────────────────────────────────────────────────

function TourPain() {
  const pains = [
    'Calon wisatawan datang ke Instagram atau WhatsApp Anda, tidak menemukan website resmi — mereka ragu lalu pergi ke kompetitor.',
    'Website sudah ada, tapi tampilannya kusam, loadingnya lambat, dan tidak ada sistem booking — calon pelanggan kabur sebelum sempat bertanya.',
    'Rajin posting medsos tiap hari, tapi konversi nyaris nol karena tidak ada landing page yang meyakinkan untuk menutup calon pelanggan.',
    'Terlalu bergantung pada OTA (Traveloka, Tiket.com) yang memotong komisi besar dan tidak membangun brand Anda sendiri.',
  ]
  return (
    <section id="masalah" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight text-balance">
            Kenapa Bisnis Tour &amp; Travel Anda Sulit Berkembang Secara Online?
          </h2>
        </div>
        <div className="space-y-4">
          {pains.map((p, i) => (
            <div key={i} className="flex gap-4 items-start p-5 rounded-xl border-l-4 border-[#EF4444] bg-[#FFF5F5] border border-[#FECACA]">
              <XCircle className="w-5 h-5 text-[#EF4444] flex-shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-[#374151] text-sm sm:text-base leading-relaxed">{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Solution ───────────────────────────────────────────────────────

function TourSolution() {
  return (
    <section id="solusi" className="bg-[#FFFBEB] py-20 lg:py-28 border-y border-[#FDE68A]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-white text-[#B45309] text-sm font-medium mb-6">
          <Plane className="w-4 h-4" aria-hidden="true" />
          Solusi
        </div>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-6 text-balance">
          Saatnya Punya Website Tour &amp; Travel{' '}
          <span className="bg-gradient-to-r from-[#F59E0B] to-[#F97316] bg-clip-text text-transparent">
            yang Benar-Benar Menjual
          </span>
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-4">
          Website bukan sekadar &ldquo;brosur online&rdquo;. Setiap website yang Noviyanto bangun dirancang menggunakan prinsip CRO — setiap elemen, warna, kata, dan posisi tombol ditempatkan secara strategis untuk mengubah pengunjung menjadi pelanggan nyata.
        </p>
        <p className="text-[#9CA3AF] text-sm">
          Bukan template. Bukan copy-paste. Dibangun custom, khusus untuk industri tour &amp; travel, sesuai target pasar dan brand Anda.
        </p>
      </div>
    </section>
  )
}

// ── Features ───────────────────────────────────────────────────────

const FEATURES = [
  { icon: Smartphone, title: 'Desain Premium & 100% Mobile-Friendly', desc: '80% wisatawan browsing dari HP. Website tampil sempurna dan profesional di semua ukuran layar.' },
  { icon: CalendarCheck, title: 'Sistem Booking Online Terintegrasi', desc: 'Form pemesanan otomatis terkirim ke WhatsApp dan email Anda. Tidak ada lagi inquiry yang terlewat.' },
  { icon: Images, title: 'Galeri Foto & Video Tour Menawan', desc: 'Tampilkan keindahan destinasi wisata secara visual yang menggugah — dari Sabang sampai Merauke.' },
  { icon: Search, title: 'SEO Lokal Teroptimasi', desc: 'Muncul di halaman 1 Google saat calon wisatawan cari "paket wisata [kota Anda]". Traffic organik tanpa bayar iklan.' },
  { icon: Star, title: 'Integrasi Ulasan & Testimoni', desc: 'Review nyata dari pelanggan tampil otomatis. Kepercayaan = konversi lebih tinggi.' },
  { icon: MapPin, title: 'Halaman Paket Tour Lengkap', desc: 'Itinerary, harga, inklusi & eksklusi, galeri per paket — tersaji rapi sehingga calon wisatawan langsung yakin memesan.' },
  { icon: MessageCircle, title: 'Tombol WhatsApp & CTA Strategis', desc: 'Ditempatkan di posisi psikologis tepat — pengunjung tahu harus ngapain selanjutnya. CTR WhatsApp naik drastis.' },
  { icon: Zap, title: 'SSL & Loading Super Cepat', desc: 'PageSpeed score 90+, SSL aktif, website aman. Google prioritaskan website cepat — ranking Anda naik.' },
] as const

function TourFeatures() {
  return (
    <section id="fitur" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3 text-balance">
            Semua yang Anda Butuhkan untuk Menang di Dunia Digital Tour &amp; Travel
          </h2>
          <p className="text-[#6B7280]">Bukan sekadar website — ekosistem digital yang mendatangkan booking</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex gap-4 p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#FDE68A] hover:bg-[#FFFBEB] transition-colors duration-200">
              <span className="inline-flex w-11 h-11 items-center justify-center rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] flex-shrink-0">
                <Icon className="w-5 h-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-semibold text-[#111827] text-sm sm:text-base mb-1">{title}</h3>
                <p className="text-[#6B7280] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Process ────────────────────────────────────────────────────────

const STEPS = [
  { num: '01', title: 'Konsultasi Gratis', time: 'Hari 1–2', desc: 'Diskusi kebutuhan bisnis, target pasar, kompetitor, dan referensi desain. 100% gratis tanpa kewajiban.' },
  { num: '02', title: 'Desain & Development', time: 'Hari 3–14', desc: 'Noviyanto mulai rancang dan bangun website custom sesuai brand dan kebutuhan spesifik tour & travel Anda.' },
  { num: '03', title: 'Revisi & Finalisasi', time: 'Hari 15–21', desc: 'Anda review dan beri feedback. Revisi dilakukan sampai Anda 100% puas — tidak ada batas revisi.' },
  { num: '04', title: 'Launch & Training', time: 'Hari 22', desc: 'Website live! Training singkat cara update konten mandiri. Bisnis siap mendatangkan booking online!' },
] as const

function TourProcess() {
  return (
    <section id="proses" className="bg-[#F9FAFB] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3">Proses Mudah, Hasil Profesional</h2>
          <p className="text-[#6B7280]">Dari konsultasi sampai live — Noviyanto dampingi setiap langkahnya</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((step) => (
            <div key={step.num} className="bg-white rounded-2xl border border-[#E5E7EB] p-6">
              <div className="font-display font-semibold text-4xl text-[#F59E0B]/30 mb-3 leading-none">{step.num}</div>
              <div className="inline-block px-2 py-0.5 bg-[#FFFBEB] border border-[#FDE68A] rounded-full text-[#B45309] text-xs font-medium mb-2">{step.time}</div>
              <h3 className="font-semibold text-[#111827] mb-2">{step.title}</h3>
              <p className="text-[#6B7280] text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Portfolio ──────────────────────────────────────────────────────

const PORTFOLIOS = [
  { client: 'Bali Sunrise Tours', result: 'Inquiry organik naik 340% dalam 3 bulan', icon: TrendingUp },
  { client: 'Jelajah Nusantara Travel', result: 'Dari 0 ke 150+ booking/bulan dalam 4 bulan', icon: CalendarCheck },
  { client: 'Raja Ampat Explorer', result: 'Ranking #1 Google "paket wisata Raja Ampat"', icon: Search },
  { client: 'Yogyakarta Heritage Tours', result: 'Konversi WhatsApp naik 5× lipat dalam 2 bulan', icon: MessageCircle },
] as const

function TourPortfolio() {
  return (
    <section id="portofolio" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3">Hasil Nyata untuk Bisnis Tour &amp; Travel Nyata</h2>
          <p className="text-[#6B7280]">Bukan sekadar website cantik — tapi website yang menghasilkan</p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {PORTFOLIOS.map(({ client, result, icon: Icon }) => (
            <div key={client} className="p-6 rounded-2xl border border-[#E5E7EB] hover:border-[#FDE68A] hover:shadow-sm transition-all duration-200">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex w-10 h-10 items-center justify-center rounded-xl bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706]">
                  <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="font-semibold text-[#111827]">{client}</span>
              </div>
              <p className="text-sm text-[#6B7280] leading-relaxed">📈 {result}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <a href="/portofolio" className="inline-flex items-center gap-2 text-[#D97706] font-medium hover:text-[#B45309] transition-colors text-sm">
            Lihat Semua Portofolio →
          </a>
        </div>
      </div>
    </section>
  )
}

// ── Pricing ────────────────────────────────────────────────────────

const PLANS = [
  {
    name: 'STARTER', slug: 'tour-starter', price: 'Rp 3.500.000', tagline: 'Travel agent baru go digital', popular: false,
    features: ['5 halaman', 'Desain mobile-friendly', 'Form kontak + WA button', 'SEO on-page dasar', 'Revisi mayor 1×', 'Hosting + Domain 1 tahun gratis', 'Garansi 30 hari'],
  },
  {
    name: 'PROFESSIONAL', slug: 'tour-professional', price: 'Rp 7.500.000', tagline: 'Dominasi pasar lokal', popular: true,
    features: ['Hingga 15 halaman', 'Desain premium mobile-friendly', 'Form kontak + WA button', 'Sistem booking online', 'Halaman paket tour unlimited', 'SEO on-page lengkap', 'Integrasi Google Maps', 'Blog / konten marketing', 'Galeri foto & video', 'Revisi mayor 3×', 'Hosting + Domain 1 tahun gratis', 'Pelatihan CMS', 'Garansi kepuasan penuh'],
  },
  {
    name: 'ENTERPRISE', slug: 'tour-enterprise', price: 'Rp 15.000.000', tagline: 'Bisnis tour skala besar', popular: false,
    features: ['Halaman unlimited', 'Desain enterprise', 'Sistem booking + payment gateway', 'Dashboard admin paket tour', 'SEO + Google Ads setup', 'Multi bahasa (ID & EN)', 'Galeri + media management', 'Revisi tidak terbatas', 'Hosting premium 1 tahun gratis', 'Pelatihan CMS', 'Support teknis 3 bulan', 'Strategi marketing'],
  },
] as const

function TourPricing({ onConsult }: { onConsult: (pkg: string) => void }) {
  return (
    <section id="harga" className="bg-[#F9FAFB] py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3">Pilih Paket yang Sesuai Skala Bisnis Anda</h2>
          <p className="text-[#6B7280]">Harga transparan — tidak ada biaya tersembunyi</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan) => (
            <div key={plan.name} className={`relative rounded-2xl border p-6 bg-white ${plan.popular ? 'border-[#F59E0B] shadow-lg ring-1 ring-[#F59E0B]/20' : 'border-[#E5E7EB]'}`}>
              {plan.popular && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 bg-[#F59E0B] text-[#111827] text-xs font-semibold rounded-full">★ Paling Populer</span>
                </div>
              )}
              <div className="mb-5">
                <p className="text-xs font-semibold tracking-wider text-[#9CA3AF] uppercase mb-1">{plan.name}</p>
                <p className="font-display font-semibold text-2xl text-[#111827] mb-1">{plan.price}</p>
                <p className="text-xs text-[#9CA3AF]">{plan.tagline}</p>
              </div>
              <ul className="space-y-2 mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-[#374151]">
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                    {f}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => onConsult(plan.slug)}
                className={`flex items-center justify-center h-10 w-full rounded-xl text-sm font-medium transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2 ${plan.popular ? 'bg-[#F59E0B] hover:bg-[#D97706] text-[#111827]' : 'bg-[#F3F4F6] hover:bg-[#E5E7EB] text-[#374151]'}`}
              >
                Konsultasi Paket {plan.name.charAt(0) + plan.name.slice(1).toLowerCase()}
              </button>
            </div>
          ))}
        </div>
        <p className="mt-8 text-center text-xs text-[#9CA3AF]">
          * Semua harga belum termasuk PPN 11%. Butuh fitur custom?{' '}
          <button type="button" onClick={() => onConsult('lainnya')} className="text-[#D97706] hover:underline">
            Hubungi Noviyanto untuk penawaran khusus.
          </button>
        </p>
      </div>
    </section>
  )
}

// ── Testimonials ───────────────────────────────────────────────────

const TESTIMONIALS = [
  { quote: 'Sebelumnya saya cuma andalkan Instagram dan WA. Setelah punya website dari Noviyanto, dalam 2 bulan pertama sudah dapat 40+ inquiry organik dari Google tanpa iklan berbayar. Luar biasa!', name: 'Pak Budi Santoso', role: 'Owner Bali Sunrise Tours' },
  { quote: 'Desainnya bagus, loading cepat, dan yang paling penting langsung banyak yang tanya paket tour. ROI-nya balik dalam 3 bulan! Sekarang saya tidak takut lagi bersaing dengan OTA besar.', name: 'Ibu Ratna Dewi', role: 'Director Nusantara Travel & Tour, Surabaya' },
  { quote: 'Prosesnya mudah, Noviyanto sabar banget dampingi saya yang awam soal website. Selesai tepat waktu, hasilnya melebihi ekspektasi. Highly recommended!', name: 'Mas Adi Kurniawan', role: 'CEO Explore Indonesia Tours, Yogyakarta' },
] as const

function TourTestimonials() {
  return (
    <section id="testimoni" className="bg-white py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="font-display font-semibold text-3xl sm:text-4xl text-[#111827] tracking-tight mb-3">Kata Mereka yang Sudah Merasakannya</h2>
          <div className="flex items-center justify-center gap-1">
            {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />)}
            <span className="ml-2 text-sm text-[#6B7280]">Rata-rata 4.9/5 dari 50+ klien</span>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.name} className="p-6 rounded-2xl border border-[#E5E7EB] bg-[#F9FAFB] flex flex-col gap-4">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-[#F59E0B] text-[#F59E0B]" aria-hidden="true" />)}
              </div>
              <p className="text-[#374151] text-sm leading-relaxed italic flex-1">&ldquo;{t.quote}&rdquo;</p>
              <div>
                <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                <p className="text-[#9CA3AF] text-xs">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Final CTA ──────────────────────────────────────────────────────

function TourCTA({ onConsult }: { onConsult: () => void }) {
  return (
    <section id="cta" className="relative bg-white py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true" style={{ background: 'radial-gradient(ellipse 50% 40% at 50% 50%, rgba(245,158,11,0.10), transparent 70%)' }} />
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#FDE68A] bg-[#FFFBEB] text-[#B45309] text-sm font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B] animate-pulse" />
          Konsultasi Gratis
        </div>
        <h2 className="font-display font-semibold text-3xl sm:text-4xl lg:text-5xl text-[#111827] tracking-tight mb-6 text-balance">
          Siap Transformasi Bisnis Tour &amp; Travel Anda?
        </h2>
        <p className="text-[#6B7280] text-base sm:text-lg leading-relaxed mb-8">
          Bergabunglah dengan 50+ pemilik bisnis tour &amp; travel yang sudah mempercayakan website mereka kepada Noviyanto. Konsultasi pertama GRATIS — tanpa tekanan, tanpa kewajiban apapun.
        </p>
        <div className="mb-8 p-5 rounded-2xl bg-[#FFFBEB] border border-[#FDE68A] text-left">
          <p className="font-semibold text-[#B45309] text-sm mb-3">🎁 BONUS EKSKLUSIF untuk 5 Klien Berikutnya:</p>
          <ul className="space-y-1.5">
            {['Setup Google Business Profile (senilai Rp 500.000) — GRATIS', '1 Artikel SEO Blog siap publish (senilai Rp 300.000) — GRATIS', 'Konsultasi Strategi Digital Marketing 1 Jam (senilai Rp 500.000) — GRATIS'].map((b) => (
              <li key={b} className="flex items-center gap-2 text-sm text-[#374151]">
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" aria-hidden="true" />
                {b}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-[#D97706] font-medium mb-6">🔥 Slot bulan ini hampir penuh. Amankan jadwal konsultasi Anda sekarang!</p>
        <button
          type="button"
          onClick={onConsult}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F59E0B] hover:bg-[#D97706] active:bg-[#B45309] text-[#111827] font-semibold text-base rounded-xl transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F59E0B] focus-visible:ring-offset-2"
        >
          📱 Konsultasi Gratis Sekarang →
        </button>
        <p className="mt-4 text-xs text-[#9CA3AF]">Isi form singkat → disimpan ke sistem → lanjut diskusi via WhatsApp</p>
      </div>
    </section>
  )
}

// ── Footer ─────────────────────────────────────────────────────────

function TourFooter({ onConsult }: { onConsult: () => void }) {
  return (
    <footer id="footer" className="bg-[#F9FAFB] border-t border-[#E5E7EB] py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <p className="font-display font-semibold text-lg text-[#111827] mb-1">Noviyanto</p>
            <p className="text-xs text-[#6B7280] mb-3">Website Developer &amp; Digital Marketing</p>
            <p className="text-sm text-[#6B7280] leading-relaxed">Spesialis membantu bisnis tour &amp; travel Indonesia tumbuh melalui website profesional, SEO, dan integrasi digital.</p>
            <a href="/" className="inline-block mt-3 text-sm text-[#D97706] hover:underline">noviyanto.com</a>
          </div>
          <div>
            <p className="font-semibold text-xs tracking-wider text-[#9CA3AF] uppercase mb-4">HALAMAN INI</p>
            <ul className="space-y-2">
              {[['↑ Kembali ke Atas', '#hero'], ['Fitur', '#fitur'], ['Portofolio', '#portofolio'], ['Harga', '#harga'], ['FAQ', '#faq'], ['Konsultasi Gratis', '#cta']].map(([label, href]) => (
                <li key={href}><a href={href} className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors">{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="font-semibold text-xs tracking-wider text-[#9CA3AF] uppercase mb-4">HUBUNGI NOVIYANTO</p>
            <ul className="space-y-2 mb-6">
              <li><a href={`mailto:${SITE.email}`} className="text-sm text-[#6B7280] hover:text-[#111827]">📧 {SITE.email}</a></li>
              <li>
                <button type="button" onClick={onConsult} className="text-sm text-[#D97706] hover:underline text-left">
                  💬 Konsultasi via WhatsApp →
                </button>
              </li>
              <li><span className="text-sm text-[#6B7280]">📍 Semarang, Jawa Tengah</span></li>
            </ul>
            <p className="font-semibold text-xs tracking-wider text-[#9CA3AF] uppercase mb-3">LAYANAN LAINNYA</p>
            <a href="/layanan" className="text-sm text-[#D97706] hover:underline">→ noviyanto.com/layanan</a>
          </div>
        </div>
        <div className="border-t border-[#E5E7EB] pt-6 text-center text-xs text-[#9CA3AF]">
          © 2026 Noviyanto · Website Developer &amp; Digital Marketing · noviyanto.com
          <br />Halaman ini adalah sub-layanan dari noviyanto.com
        </div>
      </div>
    </footer>
  )
}

// ── Page Body ──────────────────────────────────────────────────────

export default function TourPageBody() {
  const { isOpen, defaultPackage, open, close } = useTourForm()

  return (
    <>
      <TourFormModal isOpen={isOpen} defaultPackage={defaultPackage} onClose={close} />
      <TourHero onConsult={open} />
      <TourStats />
      <TourPain />
      <TourSolution />
      <TourFeatures />
      <TourProcess />
      <TourPortfolio />
      <TourPricing onConsult={open} />
      <TourTestimonials />
      <TourFAQ />
      <TourCTA onConsult={open} />
      <TourFooter onConsult={open} />
    </>
  )
}
