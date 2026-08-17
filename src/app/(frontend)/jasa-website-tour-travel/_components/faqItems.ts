/**
 * Sumber tunggal pertanyaan FAQ halaman tour & travel.
 *
 * Sengaja dipisah dari TourFAQ.tsx: file itu 'use client', dan setiap ekspor
 * dari modul client berubah jadi client reference ketika diimpor Server
 * Component — array-nya tidak lagi bisa di-.map() untuk membangun JSON-LD.
 * Modul netral ini bisa diimpor kedua sisi tanpa masalah.
 */

export interface FAQItem {
  question: string
  answer: string
}

export const FAQ_ITEMS: readonly FAQItem[] = [
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
