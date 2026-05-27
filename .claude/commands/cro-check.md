# CRO Check

Audit halaman dari perspektif konversi — apakah halaman ini optimal untuk menghasilkan leads?

## Usage
/cro-check [path]

Contoh: `/cro-check src/app/layanan/website/page.tsx`

## Checklist Audit

### Above the Fold
- [ ] H1 jelas: siapa, apa yang ditawarkan, apa hasilnya
- [ ] Ada primary CTA (amber) di hero — mengarah ke WhatsApp
- [ ] Ada minimal 1 trust signal (angka / testimoni / logo klien)

### Konten & Persuasi
- [ ] Pain points calon klien disebutkan secara spesifik
- [ ] Ada bukti sosial (testimoni, angka, case study)
- [ ] FAQ menjawab keberatan utama (harga, timeline, garansi)
- [ ] Proses kerja dijelaskan (kurangi anxietas)

### CTA
- [ ] Primary CTA ada di hero, tengah, dan bawah halaman
- [ ] WhatsApp float button ada
- [ ] Teks CTA action-oriented (bukan "Hubungi Kami")
- [ ] Pre-filled WhatsApp message relevan dengan halaman

### Mobile
- [ ] Tombol CTA min 48px height
- [ ] Font body min 16px
- [ ] Tidak ada elemen yang terpotong di mobile 375px

### Analytics
- [ ] `trackEvent('cta_click')` terpasang di semua CTA button
- [ ] `trackEvent('whatsapp_click')` di floating button

### Output
Berikan skor 1-10 dan daftar prioritas perbaikan.
