// Ulasan Google asli untuk Noviyanto (provider yang sama untuk semua kota).
// Dipakai di halaman kota (Semarang, Jakarta, Bandung) + JSON-LD review/aggregate.

export interface GoogleReview {
  author: string
  date: string // ISO
  rating: number
  text: string
}

export const GOOGLE_REVIEWS: readonly GoogleReview[] = [
  {
    author: 'Muhammad Arsy Muqorrobin',
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
    date: '2022-10-04',
    rating: 5,
    text: 'Pelayanannya luar biasa, website saya selalu banyak dilihat pengunjung. Hasilnya usaha saya kebanjiran order. Saya pakai jasa SEO dan Google Ads. Mantap recommended 👍👍',
  },
  {
    author: 'done akbar',
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
    date: '2022-12-21',
    rating: 5,
    text: 'Dua kali minta tolong mas novi bantu optimasi speed website hasilnya oke, next minta bantuan yg lain lagi ya mas.',
  },
] as const

export const REVIEWS_AGGREGATE = {
  rating: 5.0,
  count: 14,
  source: 'Google Maps',
} as const

export function formatReviewDate(iso: string): string {
  const d = new Date(iso)
  return d.toLocaleDateString('id-ID', { year: 'numeric', month: 'long' })
}
