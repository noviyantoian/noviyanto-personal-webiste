import type { Service } from '@/types'

export const services: Service[] = [
  {
    slug: 'website',
    title: 'Website Development',
    shortTitle: 'Website',
    description: 'Dirancang untuk mengubah pengunjung jadi prospek yang menghubungi Anda.',
    longDescription:
      'Website yang dirancang dari tujuan bisnis — mengubah pengunjung jadi prospek yang menghubungi Anda.',
    icon: '🌐',
    features: [
      'Next.js / React — cepat dan SEO-friendly',
      'Desain mobile-first yang responsif',
      'Optimasi konversi di setiap halaman',
      'Integrasi WhatsApp, form, dan sistem booking',
      'Setup SEO on-page dari hari pertama',
    ],
    waMessage: 'website',
    metaTitle: 'Jasa Pembuatan Website Profesional Semarang',
    metaDescription:
      'Jasa pembuatan website bisnis di Semarang yang tidak hanya bagus, tapi menghasilkan leads. Next.js, SEO-ready, mobile-first.',
  },
  {
    slug: 'google-ads',
    title: 'Google Ads',
    shortTitle: 'Google Ads',
    description: 'Customer baru bisa masuk dalam minggu pertama. Setiap rupiah terukur hasilnya.',
    longDescription:
      'Kampanye Google Ads yang dikelola berdasarkan data — setiap rupiah anggaran diarahkan ke keyword dan audience yang paling berpotensi konversi.',
    icon: '📈',
    features: [
      'Riset keyword berbasis industri dan lokasi',
      'Setup kampanye dengan struktur yang bersih',
      'Landing page optimization untuk konversi',
      'Tracking konversi akurat (WA, form, telpon)',
      'Laporan bulanan yang mudah dipahami',
    ],
    waMessage: 'googleAds',
    metaTitle: 'Jasa Google Ads Semarang — Kelola Iklan yang Benar-benar Menghasilkan',
    metaDescription:
      'Jasa pengelolaan Google Ads di Semarang. Setup kampanye, optimasi rutin, tracking konversi. Customer baru bisa masuk minggu pertama.',
  },
  {
    slug: 'seo',
    title: 'SEO Organik',
    shortTitle: 'SEO',
    description: 'Muncul di halaman pertama Google tanpa terus bayar iklan.',
    longDescription:
      'Strategi SEO berbasis riset keyword nyata — dari optimasi teknis, on-page, sampai konten yang menjawab pertanyaan target customer Anda.',
    icon: '🔍',
    features: [
      'Audit teknis dan perbaikan on-page',
      'Riset keyword per industri dan lokasi',
      'Local SEO dan optimasi Google Business Profile',
      'Strategi konten jangka panjang',
      'Laporan ranking dan traffic bulanan',
    ],
    waMessage: 'seo',
    metaTitle: 'Jasa SEO Semarang — Organik, Terukur, Jangka Panjang',
    metaDescription:
      'Jasa SEO di Semarang untuk bisnis lokal dan nasional. Audit teknis, riset keyword, local SEO, dan konten strategy.',
  },
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing',
    shortTitle: 'Digital Marketing',
    description: 'Strategi digital terpadu — bukan kanal yang berjalan sendiri-sendiri.',
    longDescription:
      'Ekosistem digital yang menyatukan website, iklan, SEO, dan media sosial dengan satu tujuan: leads masuk secara konsisten.',
    icon: '🎯',
    features: [
      'Audit dan perencanaan strategi digital',
      'Pengelolaan Meta Ads (Facebook/Instagram)',
      'Content strategy untuk media sosial',
      'Email marketing dan nurturing',
      'Analitik terpadu dan laporan ROI',
    ],
    waMessage: 'digitalMarketing',
    metaTitle: 'Jasa Digital Marketing Semarang — Strategi Terpadu untuk Bisnis Anda',
    metaDescription:
      'Jasa digital marketing di Semarang. Dari strategi, eksekusi, sampai laporan. Website, SEO, Google Ads, Meta Ads dalam satu ekosistem.',
  },
  /* ODOO - sementara dinonaktifkan
  {
    slug: 'odoo',
    title: 'Sistem CRM & ERP',
    shortTitle: 'Odoo',
    description: 'Kelola leads, tim, dan operasional dalam satu sistem terintegrasi.',
    longDescription:
      'Implementasi Odoo yang benar-benar dipakai tim Anda — dari CRM, HR, accounting, sampai operasional, semua dalam satu platform.',
    icon: '⚙️',
    highlight: true,
    features: [
      'Implementasi CRM untuk pipeline sales',
      'Kustomisasi modul sesuai alur bisnis',
      'Migrasi data dari sistem lama',
      'Training tim hingga mandiri',
      'Support post-implementasi',
    ],
    waMessage: 'odoo',
    metaTitle: 'Odoo Developer Semarang — Implementasi CRM & ERP untuk Bisnis',
    metaDescription:
      'Odoo developer di Semarang. Implementasi, kustomisasi, dan training Odoo CRM, ERP, HR, dan Accounting untuk UMKM hingga enterprise.',
  },
  */
  {
    slug: 'ai-integration',
    title: 'AI Integration',
    shortTitle: 'AI',
    description: 'Otomasi tugas berulang agar tim fokus ke hal yang lebih penting.',
    longDescription:
      'Integrasi AI dan otomasi bisnis menggunakan n8n, OpenAI API, dan Python — disesuaikan dengan proses kerja bisnis Anda yang sudah berjalan.',
    icon: '🤖',
    features: [
      'Chatbot WhatsApp / website dengan AI',
      'Otomasi follow-up leads',
      'Laporan otomatis dari berbagai sumber data',
      'Integrasi antar aplikasi (n8n / Make)',
      'Custom workflow sesuai kebutuhan bisnis',
    ],
    waMessage: 'aiIntegration',
    metaTitle: 'Jasa AI Integration & Otomasi Bisnis Semarang',
    metaDescription:
      'Integrasi AI dan otomasi bisnis di Semarang. Chatbot, auto follow-up, laporan otomatis menggunakan n8n, OpenAI, dan Python.',
  },
  {
    slug: 'mobile-app',
    title: 'Aplikasi Mobile',
    shortTitle: 'Mobile App',
    description: 'Solusi custom untuk customer-facing atau tim lapangan Anda.',
    longDescription:
      'Pengembangan aplikasi mobile cross-platform dengan React Native — untuk customer-facing app, aplikasi internal tim, atau kombinasi keduanya.',
    icon: '📱',
    features: [
      'React Native — satu kode untuk Android & iOS',
      'Desain UI/UX yang intuitif',
      'Integrasi API dan backend',
      'Submit ke Play Store & App Store',
      'Support post-launch',
    ],
    waMessage: 'mobileApp',
    metaTitle: 'Jasa Pembuatan Aplikasi Mobile Semarang — Android & iOS',
    metaDescription:
      'Jasa pembuatan aplikasi mobile di Semarang. React Native untuk Android dan iOS. Customer app, internal app, e-commerce.',
  },
  {
    slug: 'maintenance',
    title: 'Maintenance Website',
    shortTitle: 'Maintenance',
    description: 'Website selalu online, aman, dan performa terjaga.',
    longDescription:
      'Layanan perawatan website berkelanjutan — update keamanan, backup rutin, monitoring uptime, dan optimasi performa agar website Anda selalu dalam kondisi terbaik.',
    icon: '🛡️',
    features: [
      'Update keamanan dan dependency rutin',
      'Backup otomatis harian/mingguan',
      'Monitoring uptime 24/7',
      'Optimasi performa berkala',
      'Update konten kecil (teks, foto)',
    ],
    waMessage: 'maintenance',
    metaTitle: 'Maintenance Website Semarang — Keamanan & Performa Terjaga',
    metaDescription:
      'Layanan maintenance website di Semarang. Update keamanan, backup, monitoring, dan optimasi performa. Mulai dari 3 bulan.',
  },
]

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug)
}
