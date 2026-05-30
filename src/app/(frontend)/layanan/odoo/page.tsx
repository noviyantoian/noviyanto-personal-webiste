import type { Metadata } from 'next'
import {
  Users,
  Receipt,
  UserCog,
  Boxes,
  ListChecks,
  Globe,
} from 'lucide-react'

import { generateMetadata, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceTimeline from '@/components/sections/ServiceTimeline'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/odoo'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'Implementasi Odoo CRM & ERP — Sistem Bisnis All-in-One',
  description:
    'Implementasi Odoo (CRM, Accounting, HR, Inventory, Project, Website) untuk bisnis Indonesia. Konfigurasi, kustomisasi, migrasi data, training.',
  path: PATH,
  keywords: ['Odoo developer', 'implementasi Odoo', 'Odoo Indonesia', 'CRM ERP'],
  noIndex: true,
})

const jsonLd = [
  serviceSchema({
    name: 'Implementasi Odoo CRM & ERP',
    description:
      'Implementasi Odoo end-to-end: discovery, konfigurasi, kustomisasi, migrasi data, training, dan support pasca go-live.',
    url: URL,
    serviceType: 'ERP Implementation',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'Odoo CRM & ERP', url: URL },
  ]),
]

const ICON = 'w-5 h-5'

const modules = [
  {
    icon: <Users className={ICON} />,
    title: 'CRM (Customer Relationship)',
    body: 'Kelola pipeline sales dari leads masuk sampai closing. Tahu persis berapa leads dalam proses, mana yang perlu di-follow-up hari ini, dan berapa yang sudah jadi customer.',
  },
  {
    icon: <Receipt className={ICON} />,
    title: 'Accounting & Invoicing',
    body: 'Buat invoice, catat pembayaran, kelola biaya operasional, dan lihat laporan keuangan — semua dalam satu tempat.',
  },
  {
    icon: <UserCog className={ICON} />,
    title: 'HR & Payroll',
    body: 'Database karyawan, absensi, cuti, dan penggajian. Cocok untuk bisnis dengan tim lebih dari 5 orang yang mulai butuh sistem terstruktur.',
  },
  {
    icon: <Boxes className={ICON} />,
    title: 'Inventory & Warehouse',
    body: 'Untuk bisnis yang jual produk fisik: kelola stok, lacak pergerakan barang, dan setting reorder point otomatis.',
  },
  {
    icon: <ListChecks className={ICON} />,
    title: 'Project Management',
    body: 'Untuk bisnis jasa atau agensi: kelola proyek per client, assign task ke tim, pantau progress dalam satu tampilan.',
  },
  {
    icon: <Globe className={ICON} />,
    title: 'Website + E-commerce',
    body: 'Modul website bawaan yang terintegrasi langsung ke backend. Cocok untuk toko online yang butuh manajemen stok dan order serius.',
  },
]

const implementationSteps = [
  {
    label: 'Tahap 1',
    title: 'Discovery',
    description: 'Memahami alur kerja bisnis Anda sekarang. Apa yang berjalan baik dan apa yang perlu diubah. Dari sini ditentukan modul prioritas.',
  },
  {
    label: 'Tahap 2',
    title: 'Konfigurasi & Kustomisasi',
    description: 'Setup Odoo sesuai kebutuhan bisnis. Kalau perlu workflow khusus atau tampilan disesuaikan, dikerjakan di tahap ini.',
  },
  {
    label: 'Tahap 3',
    title: 'Migrasi Data',
    description: 'Kalau Anda punya data existing (Excel, Google Sheets, sistem lain), saya bantu pindahkan ke Odoo.',
  },
  {
    label: 'Tahap 4',
    title: 'Training',
    description: 'Tim Anda dilatih cara pakai sistem. Tidak ada gunanya sistem bagus kalau tim tidak mau atau tidak bisa menggunakannya.',
  },
  {
    label: 'Tahap 5',
    title: 'Go Live & Support',
    description: 'Sistem mulai dipakai. Saya standby untuk bantu troubleshoot dan penyesuaian di minggu-minggu pertama.',
  },
]

const fitFor = [
  {
    title: 'Bisnis jasa dengan tim',
    body: 'Agency, konsultan, jasa IT, kontraktor — yang punya banyak proyek berjalan bersamaan dan butuh visibilitas penuh atas progress dan keuangan setiap proyek.',
  },
  {
    title: 'Bisnis yang sedang scale up',
    body: 'Excel cukup waktu kecil. Tapi begitu ada 10+ karyawan, 50+ customer aktif, dan transaksi harian banyak, Anda butuh sistem lebih solid.',
  },
  {
    title: 'Pakai software terpisah-pisah',
    body: 'Dan capek rekap manual. Odoo bisa gantikan banyak aplikasi sekaligus dengan data yang saling terhubung.',
  },
  {
    title: 'Butuh reporting yang lebih baik',
    body: 'Kalau Anda sering merasa "tidak tahu persis kondisi bisnis saya sekarang" — itu sinyal sistem manajemen data perlu diperbaiki.',
  },
]

const faqItems = [
  {
    question: 'Apakah Odoo cocok untuk UMKM?',
    answer:
      'Tergantung kebutuhannya. Odoo Community (versi gratis) sudah cukup untuk banyak bisnis menengah. Saya jelaskan mana yang lebih cocok untuk kondisi bisnis Anda.',
  },
  {
    question: 'Berapa lama implementasi?',
    answer:
      'Implementasi dasar bisa selesai dalam 4-8 minggu. Proyek lebih kompleks dengan kustomisasi bisa 3-6 bulan.',
  },
  {
    question: 'Apakah ada biaya lisensi?',
    answer:
      'Odoo Community sepenuhnya gratis. Odoo Enterprise (versi berbayar) punya fitur tambahan tapi ada biaya lisensi per pengguna per bulan. Saya rekomendasikan versi yang tepat.',
  },
  {
    question: 'Bagaimana kalau tim saya tidak terbiasa pakai sistem seperti ini?',
    answer:
      'Training adalah bagian dari proses implementasi. Saya tidak selesai sebelum tim Anda bisa pakai sistemnya dengan nyaman.',
  },
]

export default function OdooPage() {
  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([...jsonLd, faqPageSchema(faqItems)]) }}
      />

      <Breadcrumb
        items={[
          { label: 'Beranda', href: '/' },
          { label: 'Layanan', href: '/layanan' },
          { label: 'Odoo CRM & ERP' },
        ]}
      />

      <ServiceHero
        badge="Odoo CRM & ERP"
        headline="Sistem yang Biasanya Hanya Dipakai Perusahaan Besar — Sekarang Bisa untuk Bisnis Anda"
        highlight="Perusahaan Besar"
        subheadline="Odoo adalah platform bisnis all-in-one yang bisa disesuaikan persis dengan cara kerja bisnis Anda. Kelola leads, tim, stok, keuangan, dan HR dalam satu sistem yang terhubung."
        ctaWaKey="odoo"
        ctaLabel="Diskusikan Kebutuhan Sistem Bisnis Saya"
        socialProof="Odoo developer tersertifikasi — salah satu dari sedikit yang ada di Indonesia"
      />

      <ServiceProse
        eyebrow="Masalah"
        headline="Bisnis Anda Pakai Berapa Aplikasi yang Berbeda Sekarang?"
        paragraphs={[
          'WhatsApp untuk komunikasi tim. Excel untuk data customer. Google Sheets untuk laporan. Aplikasi lain untuk stok. Dan semuanya tidak saling terhubung.',
          'Setiap kali butuh data lengkap, Anda harus kumpulkan dari beberapa tempat, lalu rekap manual. Itu memakan waktu. Semakin bisnis tumbuh, masalahnya semakin besar.',
          'Odoo menyatukan semua itu.',
        ]}
      />

      <ServiceProse
        eyebrow="Apa Itu Odoo"
        headline="Odoo Bukan Sekadar Software. Ini Tulang Punggung Operasional Bisnis."
        background="gray"
        paragraphs={[
          'Odoo adalah platform open-source yang menyatukan semua aspek operasional bisnis dalam satu ekosistem. Dari manajemen customer dan leads sampai keuangan, HR, stok, dan proyek.',
          'Modular: mulai dari modul yang Anda butuhkan sekarang, tambah modul lain seiring bisnis berkembang. Bisa dikustomisasi penuh untuk proses bisnis spesifik. Satu database, semua terintegrasi — data customer di CRM otomatis terhubung ke invoicing, project management, dan HR.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Modul"
        headline="Modul yang Sering Diimplementasikan"
        items={modules}
        columns={3}
      />

      <ServiceTimeline
        eyebrow="Implementasi"
        headline="Implementasi yang Terstruktur, Bukan Dilempar Sistem Lalu Ditinggal"
        steps={implementationSteps}
        background="gray"
      />

      <ServiceCardGrid
        eyebrow="Cocok Untuk"
        headline="Bisnis yang Paling Merasakan Manfaatnya"
        items={fitFor}
      />

      <ServiceProse
        eyebrow="Kenapa Developer Berpengalaman"
        headline="Odoo Bisa Sangat Powerful atau Sangat Membingungkan — Bergantung Implementasinya"
        background="gray"
        paragraphs={[
          'Odoo yang diimplementasikan dengan benar bisa mengubah cara kerja bisnis secara signifikan. Tapi kalau implementasinya terburu-buru, tidak mempertimbangkan alur bisnis yang ada, atau tidak disertai training cukup — sistemnya tidak akan dipakai.',
          'Saya bukan vendor yang selesai install lalu pergi. Implementasi Odoo adalah proyek jangka panjang, dan saya memastikan sistemnya benar-benar dipakai dan menghasilkan nilai nyata.',
        ]}
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Mau Tahu Apakah Odoo Cocok untuk Bisnis Anda?"
        body="Tidak semua bisnis butuh Odoo sekarang. Saya akan jujur kalau menurut saya kondisi bisnis Anda belum siap atau bisa diselesaikan dengan cara lebih sederhana. Hubungi saya untuk diskusi awal. Gratis."
        ctaWaKey="odoo"
        ctaLabel="Konsultasi Odoo via WhatsApp"
        subText="Konsultasi awal gratis, tanpa komitmen."
      />
    </main>
  )
}
