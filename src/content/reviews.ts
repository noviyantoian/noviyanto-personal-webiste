// Ulasan Google asli untuk Noviyanto (provider yang sama untuk semua kota).
// Dipakai di halaman kota (Semarang, Jakarta, Bandung) + JSON-LD review/aggregate.

export interface GoogleReview {
  author: string
  date: string // ISO
  rating: number
  text: string
  /**
   * Jabatan + perusahaan, mis. 'Founder, Rockologist.id'.
   *
   * Ini sinyal kepercayaan terkuat di kartu ulasan — lebih kuat dari foto.
   * Wajah tidak bisa diverifikasi siapa pun; nama + jabatan + perusahaan yang
   * bisa dibuka di browser, bisa. Kosongkan kalau kliennya belum dikonfirmasi
   * — JANGAN dikarang.
   */
  role?: string
  /** Domain klien tanpa protokol, mis. 'rockologist.id'. Jadi tautan verifikasi. */
  site?: string
  /** Path logo di /public kalau tersedia, mis. '/images/clients/rockologist.png'. */
  logo?: string
}

export const GOOGLE_REVIEWS: readonly GoogleReview[] = [
  {
    author: 'Muhammad Arsy Muqorrobin',
    role: 'Founder, Rockologist',
    site: 'rockologist.id',
    // Logo sudah ada di repo dan Rockologist juga tampil di strip klien serta
    // portofolio — ulasan, portofolio, dan logo saling mengonfirmasi.
    logo: '/images/clients/rockologist.png',
    date: '2022-10-04',
    rating: 5,
    text: 'Mas Noviyanto itu ramah, responsif dan sangat menguasai bidangnya. Jika ada hal yang tim dan agensi saya tidak bisa pecahkan, mas Noviyanto selalu berhasil menyelesaikan hal itu dengan cepat dan tepat.',
  },
  {
    author: 'Noprasetya Cahya',
    date: '2023-08-03',
    rating: 5,
    text: 'Sangat terbantu dengan layanan Google Ads dari Noviyanto. Kampanye iklan kami meningkat secara signifikan, dan tingkat konversi juga mengalami peningkatan yang luar biasa. Rekomendasi banget untuk siapa saja yang mencari peningkatan yang nyata dalam kampanye iklan.',
  },
  {
    author: 'Ariadi Arifin',
    role: 'Founder, Sewamobil123',
    site: 'sewamobil123.com',
    date: '2022-10-04',
    rating: 5,
    text: 'Pelayanannya luar biasa, website saya selalu banyak dilihat pengunjung. Hasilnya usaha saya kebanjiran order. Saya pakai jasa SEO dan Google Ads. Mantap recommended 👍👍',
  },
  {
    author: 'done akbar',
    // Konteks yang diberikan hanya "dari Radio Gajahmada Group" — jabatannya
    // tidak disebut, jadi tidak dikarang. Lengkapi kalau sudah dikonfirmasi.
    role: 'Radio Gajahmada Group',
    date: '2022-12-25',
    rating: 5,
    text: 'Pelayanan sangat baik, dan pekerjaan cepat selesai. Rekomendasi untuk jasa web di Semarang nih.',
  },
  {
    author: 'rudy misbah',
    date: '2022-10-04',
    rating: 5,
    text: 'Nah kayak gini ni harusnya, rekomen banget kalau mau buat website. Pelayanan nya bagus banget, kalau pas tanya dijelasin sampai detail, fast respon juga.',
  },
  {
    author: 'Michael Paton',
    // "punya bisnis air bnb" — Airbnb itu platform, bukan nama usahanya, jadi
    // dideskripsikan apa adanya. Ganti begitu nama usahanya diketahui.
    role: 'Pemilik usaha sewa properti harian',
    date: '2023-11-21',
    rating: 5,
    text: 'What a guy. All technical queries, he can help with. If I ever have an issue he has always been able to help.',
  },
  {
    author: 'Sitranger',
    date: '2023-04-21',
    rating: 5,
    text: 'Terima kasih mas ian sudah membantu optimize website kami, recommended vendor web developer dan SEO.',
  },
  {
    author: 'Surya Permana',
    role: 'Owner, Arkamaya Grhatama',
    date: '2022-12-21',
    rating: 5,
    text: 'Dua kali minta tolong mas novi bantu optimasi speed website hasilnya oke, next minta bantuan yg lain lagi ya mas.',
  },
] as const

export const REVIEWS_AGGREGATE = {
  rating: 5.0,
  count: 8,
  source: 'Google Maps',
} as const

export function formatReviewDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
}
