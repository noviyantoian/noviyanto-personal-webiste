// Data halaman kota untuk /layanan/website/[kota].
// Noviyanto berbasis di Semarang; Jakarta & Bandung dilayani remote-first
// dengan kunjungan terjadwal saat dibutuhkan. Copy mencerminkan itu — jujur,
// tidak mengklaim "tinggal di sini".

export interface CityFaqItem {
  question: string
  answer: string
}

export interface CityData {
  slug: string
  city: string // "Jakarta"
  region: string // "DKI Jakarta"
  meta: {
    title: string
    description: string
    keywords: string[]
  }
  hero: {
    badge: string
    headline: string
    highlight: string
    subheadline: string
    socialProof: string
  }
  local: {
    eyebrow: string
    headline: string
    headlineMuted: string
    intro: string
    areasTitle: string
    areas: readonly string[]
    meetupNote: string
    nearbyTitle: string
    nearby: readonly string[]
    nearbyNote: string
  }
  author: {
    credentialLocation: string // mis. "Berbasis di Semarang, melayani Jakarta online & kunjungan terjadwal"
    locationChip: string // mis. "Semarang · Melayani Jakarta"
  }
  faq: CityFaqItem[]
  cta: {
    headline: string
    body: string
  }
}

const JAKARTA: CityData = {
  slug: 'jakarta',
  city: 'Jakarta',
  region: 'DKI Jakarta',
  meta: {
    title: 'Jasa Pembuatan Website Jakarta — Website Bisnis yang Mendatangkan Klien',
    description:
      'Jasa pembuatan website profesional di Jakarta oleh Noviyanto. Website cepat, SEO-ready, dan dirancang untuk mengubah pengunjung jadi calon klien. Dikerjakan langsung tanpa perantara, koordinasi online & kunjungan terjadwal.',
    keywords: [
      'jasa pembuatan website Jakarta',
      'jasa website Jakarta',
      'web developer Jakarta',
      'jasa bikin website Jakarta',
      'pembuatan website profesional Jakarta',
      'jasa landing page Jakarta',
    ],
  },
  hero: {
    badge: 'Jasa Pembuatan Website · Jakarta',
    headline: 'Jasa Pembuatan Website Profesional di Jakarta',
    highlight: 'Website Profesional',
    subheadline:
      'Website bisnis yang bukan sekadar tampil bagus, tapi benar-benar mendatangkan calon klien. Dikerjakan langsung oleh Noviyanto — web developer & digital growth partner yang melayani bisnis di Jakarta secara online dengan koordinasi yang rapi.',
    socialProof: 'Dipercaya oleh bisnis di Jakarta, Semarang, Bandung, dan kota lainnya',
  },
  local: {
    eyebrow: 'Melayani Jakarta',
    headline:
      'Bisnis Anda di Jakarta, dikerjakan langsung oleh satu orang yang bertanggung jawab penuh.',
    headlineMuted:
      'Koordinasi online yang efisien, tanpa biaya overhead agency — komunikasi tetap cepat dan jelas.',
    intro:
      'Sejak 2022, saya membangun website untuk pelaku bisnis di berbagai kota — termasuk Jakarta — dari kantor hukum, agen properti, brand jewelry, biro travel, hingga perusahaan B2B IT. Bekerja langsung dengan saya berarti Anda bicara dengan orang yang mengerjakan, bukan dilempar ke tim yang berganti-ganti.',
    areasTitle: 'Wilayah Jakarta yang biasa dilayani',
    areas: [
      'Sudirman',
      'Thamrin',
      'Kuningan',
      'SCBD',
      'Menteng',
      'Senayan',
      'Kemang',
      'Pondok Indah',
      'Kebayoran',
      'TB Simatupang',
      'Kelapa Gading',
      'PIK',
      'Cilandak',
      'Tebet',
      'Pluit',
    ],
    meetupNote:
      'Butuh bertemu langsung untuk diskusi awal? Bisa diatur kunjungan terjadwal di area Jakarta Pusat atau Jakarta Selatan. Untuk pengerjaan, semuanya online sehingga tidak menambah biaya pada proyek Anda.',
    nearbyTitle: 'Wilayah Jabodetabek yang juga ditangani',
    nearby: ['Tangerang', 'BSD', 'Serpong', 'Bekasi', 'Depok', 'Bogor'],
    nearbyNote:
      'Klien dari Tangerang, BSD, Bekasi, Depok, dan Bogor juga biasa dikerjakan dengan koordinasi online penuh dan kunjungan saat benar-benar dibutuhkan.',
  },
  author: {
    credentialLocation: 'Berbasis di Semarang, melayani Jakarta secara online & nasional',
    locationChip: 'Semarang · Melayani Jakarta',
  },
  faq: [
    {
      question: 'Saya di Jakarta, sedangkan Anda di Semarang. Apakah koordinasinya lancar?',
      answer:
        'Lancar. Sebagian besar proyek website memang dikerjakan secara online — meeting via Google Meet/Zoom, update progres berkala, dan komunikasi langsung via WhatsApp. Banyak klien Jakarta saya tangani tanpa pernah ada kendala koordinasi. Jika perlu bertemu langsung untuk diskusi penting, saya bisa atur kunjungan terjadwal ke Jakarta.',
    },
    {
      question: 'Berapa lama proses pembuatan website?',
      answer:
        'Rata-rata 3–4 minggu untuk website bisnis standar, termasuk konsultasi, desain, development, dan revisi. Jika konten dan materi sudah siap dari awal, prosesnya bisa lebih cepat. Untuk proyek kompleks (multi-bahasa, integrasi sistem, e-commerce), waktu disesuaikan dan disampaikan transparan di awal.',
    },
    {
      question: 'Apakah website saya akan muncul di pencarian Google Jakarta?',
      answer:
        'Setiap halaman saya bangun dengan struktur SEO yang benar — heading hierarchy, metadata, schema markup, internal linking, dan optimasi kecepatan. Untuk pencarian lokal Jakarta, saya bantu setup dan optimasi Google Business Profile. Posisi di hasil pencarian tetap memerlukan waktu dan konten yang konsisten.',
    },
    {
      question: 'Apakah Anda mengerjakan sendiri atau punya tim?',
      answer:
        'Saya bekerja sebagai individu profesional. Sebagian besar pekerjaan — strategi, copywriting, desain, development, dan setup SEO — saya kerjakan sendiri. Untuk kebutuhan khusus seperti motion design atau fotografi produk, saya bekerja dengan kolaborator terpercaya yang transparan saya sampaikan di awal.',
    },
    {
      question: 'Bagaimana proses pembayaran dan kontraknya?',
      answer:
        'Selalu ada kontrak kerja tertulis sebelum proyek mulai — berisi lingkup, timeline, deliverables, jumlah revisi, dan biaya. Pembayaran biasanya dibagi menjadi 2–3 tahap (DP, midpoint, dan pelunasan saat go-live). Tidak ada biaya tersembunyi.',
    },
    {
      question: 'Apakah hosting, domain, dan maintenance ikut diurus?',
      answer:
        'Saya bantu setup hosting dan domain — akun selalu atas nama Anda, bukan atas nama saya, supaya kepemilikan tetap di tangan Anda. Ada juga paket maintenance opsional untuk update konten, monitoring, backup, dan keamanan. Tidak wajib; jika ingin maintain sendiri, saya berikan dokumentasi yang jelas saat handover.',
    },
  ],
  cta: {
    headline: 'Siap Punya Website yang Membantu Bisnis Anda Tumbuh di Jakarta?',
    body: 'Ceritakan bisnis Anda, target pasar Anda, dan apa yang ingin Anda capai dari website baru. Saya akan jawab langsung, tanpa template balasan dan tanpa sales call yang membuang waktu.',
  },
}

const BANDUNG: CityData = {
  slug: 'bandung',
  city: 'Bandung',
  region: 'Jawa Barat',
  meta: {
    title: 'Jasa Pembuatan Website Bandung — Website Bisnis yang Mendatangkan Klien',
    description:
      'Jasa pembuatan website profesional di Bandung oleh Noviyanto. Website cepat, SEO-ready, dan dirancang untuk mengubah pengunjung jadi calon klien. Dikerjakan langsung tanpa perantara, koordinasi online & kunjungan terjadwal.',
    keywords: [
      'jasa pembuatan website Bandung',
      'jasa website Bandung',
      'web developer Bandung',
      'jasa bikin website Bandung',
      'pembuatan website profesional Bandung',
      'jasa landing page Bandung',
    ],
  },
  hero: {
    badge: 'Jasa Pembuatan Website · Bandung',
    headline: 'Jasa Pembuatan Website Profesional di Bandung',
    highlight: 'Website Profesional',
    subheadline:
      'Website bisnis yang bukan sekadar tampil bagus, tapi benar-benar mendatangkan calon klien. Dikerjakan langsung oleh Noviyanto — web developer & digital growth partner yang melayani bisnis di Bandung secara online dengan koordinasi yang rapi.',
    socialProof: 'Dipercaya oleh bisnis di Bandung, Semarang, Jakarta, dan kota lainnya',
  },
  local: {
    eyebrow: 'Melayani Bandung',
    headline:
      'Bisnis Anda di Bandung, dikerjakan langsung oleh satu orang yang bertanggung jawab penuh.',
    headlineMuted:
      'Koordinasi online yang efisien, tanpa biaya overhead agency — komunikasi tetap cepat dan jelas.',
    intro:
      'Sejak 2022, saya membangun website untuk pelaku bisnis di berbagai kota — termasuk Bandung — dari brand fashion lokal, kafe & kuliner, kampus & lembaga, hingga perusahaan kreatif dan B2B. Bekerja langsung dengan saya berarti Anda bicara dengan orang yang mengerjakan, bukan dilempar ke tim yang berganti-ganti.',
    areasTitle: 'Wilayah Bandung yang biasa dilayani',
    areas: [
      'Dago',
      'Riau (Martadinata)',
      'Setiabudi',
      'Pasteur',
      'Dipatiukur',
      'Cihampelas',
      'Braga',
      'Lengkong',
      'Buah Batu',
      'Antapani',
      'Sukajadi',
      'Gegerkalong',
      'Kopo',
      'Cibaduyut',
    ],
    meetupNote:
      'Butuh bertemu langsung untuk diskusi awal? Bisa diatur kunjungan terjadwal di area Dago, Riau, atau Setiabudi. Untuk pengerjaan, semuanya online sehingga tidak menambah biaya pada proyek Anda.',
    nearbyTitle: 'Wilayah Bandung Raya yang juga ditangani',
    nearby: ['Cimahi', 'Padalarang', 'Soreang', 'Lembang', 'Jatinangor', 'Sumedang'],
    nearbyNote:
      'Klien dari Cimahi, Padalarang, Soreang, Lembang, dan Jatinangor juga biasa dikerjakan dengan koordinasi online penuh dan kunjungan saat benar-benar dibutuhkan.',
  },
  author: {
    credentialLocation: 'Berbasis di Semarang, melayani Bandung secara online & nasional',
    locationChip: 'Semarang · Melayani Bandung',
  },
  faq: [
    {
      question: 'Saya di Bandung, sedangkan Anda di Semarang. Apakah koordinasinya lancar?',
      answer:
        'Lancar. Sebagian besar proyek website memang dikerjakan secara online — meeting via Google Meet/Zoom, update progres berkala, dan komunikasi langsung via WhatsApp. Banyak klien luar kota saya tangani tanpa kendala koordinasi. Jika perlu bertemu langsung untuk diskusi penting, saya bisa atur kunjungan terjadwal ke Bandung.',
    },
    {
      question: 'Berapa lama proses pembuatan website?',
      answer:
        'Rata-rata 3–4 minggu untuk website bisnis standar, termasuk konsultasi, desain, development, dan revisi. Jika konten dan materi sudah siap dari awal, prosesnya bisa lebih cepat. Untuk proyek kompleks (multi-bahasa, integrasi sistem, e-commerce), waktu disesuaikan dan disampaikan transparan di awal.',
    },
    {
      question: 'Apakah website saya akan muncul di pencarian Google Bandung?',
      answer:
        'Setiap halaman saya bangun dengan struktur SEO yang benar — heading hierarchy, metadata, schema markup, internal linking, dan optimasi kecepatan. Untuk pencarian lokal Bandung, saya bantu setup dan optimasi Google Business Profile. Posisi di hasil pencarian tetap memerlukan waktu dan konten yang konsisten.',
    },
    {
      question: 'Apakah Anda mengerjakan sendiri atau punya tim?',
      answer:
        'Saya bekerja sebagai individu profesional. Sebagian besar pekerjaan — strategi, copywriting, desain, development, dan setup SEO — saya kerjakan sendiri. Untuk kebutuhan khusus seperti motion design atau fotografi produk, saya bekerja dengan kolaborator terpercaya yang transparan saya sampaikan di awal.',
    },
    {
      question: 'Bagaimana proses pembayaran dan kontraknya?',
      answer:
        'Selalu ada kontrak kerja tertulis sebelum proyek mulai — berisi lingkup, timeline, deliverables, jumlah revisi, dan biaya. Pembayaran biasanya dibagi menjadi 2–3 tahap (DP, midpoint, dan pelunasan saat go-live). Tidak ada biaya tersembunyi.',
    },
    {
      question: 'Apakah hosting, domain, dan maintenance ikut diurus?',
      answer:
        'Saya bantu setup hosting dan domain — akun selalu atas nama Anda, bukan atas nama saya, supaya kepemilikan tetap di tangan Anda. Ada juga paket maintenance opsional untuk update konten, monitoring, backup, dan keamanan. Tidak wajib; jika ingin maintain sendiri, saya berikan dokumentasi yang jelas saat handover.',
    },
  ],
  cta: {
    headline: 'Siap Punya Website yang Membantu Bisnis Anda Tumbuh di Bandung?',
    body: 'Ceritakan bisnis Anda, target pasar Anda, dan apa yang ingin Anda capai dari website baru. Saya akan jawab langsung, tanpa template balasan dan tanpa sales call yang membuang waktu.',
  },
}

export const CITIES = {
  jakarta: JAKARTA,
  bandung: BANDUNG,
} as const

export type CitySlug = keyof typeof CITIES
