# CRO Rules — noviyanto-website

## Prinsip Utama
Setiap halaman punya satu tujuan utama: membuat calon klien menghubungi Noviyanto.
Semua elemen dirancang untuk mendukung tujuan itu.

## Checklist Per Halaman

### Above the Fold (tanpa scroll)
- [ ] H1 yang jelas — apa yang ditawarkan, untuk siapa, apa hasilnya
- [ ] Subheadline yang memperkuat H1 dengan konteks atau social proof
- [ ] Primary CTA button (amber) — "Konsultasi Gratis via WhatsApp"
- [ ] Minimal 1 trust signal (angka, logo klien, atau kalimat social proof)

### Di Tengah Halaman
- [ ] FAQ section — jawab 4-6 keberatan paling umum
- [ ] Bukti nyata (testimonial, case study, atau portofolio relevan)
- [ ] Penjelasan proses kerja — kurangi anxietas "seperti apa kerjasamanya"

### Di Bawah Halaman
- [ ] Bottom CTA section — headline baru + tombol WA + sub-text Calendly
- [ ] Jangan biarkan user sampai footer tanpa ada ajakan action

### Seluruh Halaman
- [ ] WhatsApp floating button — visible di semua scroll position
- [ ] Navbar punya CTA button "Konsultasi" di kanan atas

## CTA Pattern

### Primary CTA (amber)
```tsx
<Button variant="primary" href={`https://wa.me/${WA_NUMBER}?text=${encodedMessage}`}>
  Konsultasi Gratis via WhatsApp
</Button>
```

### Secondary CTA (outline/ghost)
```tsx
<Button variant="secondary" href={CALENDLY_URL} target="_blank">
  Jadwalkan Meeting →
</Button>
```

### Teks CTA yang Terbukti Bekerja
- "Konsultasi Gratis via WhatsApp" (primary)
- "Jadwalkan Meeting 30 Menit" (secondary)
- "Minta Audit Website Gratis" (untuk halaman SEO & maintenance)
- "Diskusikan Kebutuhan Saya" (generic)

### Yang Harus Dihindari
- "Klik di sini"
- "Submit"
- "Hubungi kami" (terlalu generik, tidak ada urgency)
- Tombol berwarna abu-abu atau low-contrast

## WhatsApp Pre-filled Messages

Setiap CTA button wajib ada pre-filled message yang relevan dengan konteks halamannya:

```ts
// lib/constants.ts
export const WA_MESSAGES = {
  home: 'Halo Noviyanto, saya ingin konsultasi tentang kebutuhan digital bisnis saya.',
  website: 'Halo, saya tertarik dengan layanan pembuatan website. Boleh konsultasi?',
  googleAds: 'Halo, saya ingin tahu lebih lanjut tentang layanan Google Ads.',
  seo: 'Halo, saya ingin konsultasi audit SEO untuk website saya.',
  odoo: 'Halo, saya tertarik dengan implementasi Odoo untuk bisnis saya.',
  aiIntegration: 'Halo, saya ingin diskusi tentang otomasi AI untuk bisnis saya.',
  maintenance: 'Halo, saya ingin tahu paket maintenance website yang tersedia.',
}
```

## Formulir Kontak

```tsx
// Field yang dibutuhkan — tidak lebih dari ini
interface ContactForm {
  nama: string           // required
  nomorWA: string        // required — jadi jalur komunikasi utama
  layanan: string        // dropdown service list
  cerita: string         // textarea — "Ceritakan kebutuhan Anda" (optional)
}

// Setelah submit: redirect ke WA dengan data pre-filled
// Bukan tunggu email — respons harus cepat
```

## Social Proof Patterns

### Angka (Stats Section)
```tsx
const stats = [
  { value: '30+', label: 'Proyek Selesai' },
  { value: '7', label: 'Industri Ditangani' },
  { value: '3+', label: 'Tahun Pengalaman' },
]
// Tampilkan di homepage dan halaman layanan utama
```

### Testimoni
- Tampilkan nama depan + industri (bukan nama lengkap kalau klien tidak mau)
- Quote harus spesifik — bukan "bagus banget" tapi "website kami dapat 15 inquiry baru bulan pertama"
- Avatar/foto opsional tapi menambah kepercayaan

### Trust Badge
- Logo industri/tools yang digunakan (Google Ads, Meta, Next.js, Odoo)
- Sertifikat atau afiliasi kalau ada

## Page Speed & CRO Kaitannya

- Setiap 1 detik loading time = turunkan konversi ~7%
- LCP harus < 2.5s — hero section harus instant
- Jangan ada pop-up yang muncul sebelum user sempat baca konten

## Mobile CRO

- Tombol CTA min height 48px (bukan 32px)
- Font body min 16px di mobile (cegah zoom otomatis iOS)
- Jarak antar tap target min 8px
- Form mobile: keyboard type sesuai (`tel` untuk nomor WA, `email` untuk email)
- Floating WA button: posisi bottom-right, tidak overlap konten penting

## Analytics Events yang Wajib Ditrack

```ts
// Setiap event ini harus di-fire dengan benar
trackEvent('cta_click', { location: 'hero', page: '/layanan/website' })
trackEvent('whatsapp_click', { source: 'floating_button' })
trackEvent('calendly_open')
trackEvent('form_submit', { service: 'google-ads' })
trackEvent('faq_expand', { question: 'berapa_budget_minimum' })
```
