import type { Metadata } from 'next'
import { Bot, Workflow, FileSpreadsheet, FileScan, Sparkles } from 'lucide-react'

import { generateMetadata, serviceSchema, breadcrumbSchema, faqPageSchema } from '@/lib/seo'
import { SITE } from '@/lib/constants'
import Breadcrumb from '@/components/layout/Breadcrumb'
import ServiceHero from '@/components/sections/ServiceHero'
import ServiceProse from '@/components/sections/ServiceProse'
import ServiceCardGrid from '@/components/sections/ServiceCardGrid'
import ServiceTimeline from '@/components/sections/ServiceTimeline'
import ServiceFAQ from '@/components/sections/ServiceFAQ'
import ServiceCTA from '@/components/sections/ServiceCTA'

const PATH = '/layanan/ai-integration'
const URL = `${SITE.url}${PATH}`

export const metadata: Metadata = generateMetadata({
  title: 'AI Integration — Otomasi Pekerjaan Berulang untuk Tim Anda',
  description:
    'Integrasi AI untuk otomasi bisnis: chatbot, follow-up leads, laporan otomatis, pemrosesan dokumen. n8n, OpenAI, Make, Python.',
  path: PATH,
  keywords: ['AI integration', 'otomasi bisnis', 'chatbot WhatsApp', 'n8n', 'workflow automation'],
})

const jsonLd = [
  serviceSchema({
    name: 'AI Integration & Automation',
    description:
      'Otomasi pekerjaan berulang dengan AI: chatbot, lead follow-up, laporan otomatis, pemrosesan dokumen.',
    url: URL,
    serviceType: 'Business Process Automation',
  }),
  breadcrumbSchema([
    { name: 'Beranda', url: SITE.url },
    { name: 'Layanan', url: `${SITE.url}/layanan` },
    { name: 'AI Integration', url: URL },
  ]),
]

const ICON = 'w-5 h-5'

const solutions = [
  {
    icon: <Bot className={ICON} />,
    title: 'Chatbot Website atau WhatsApp',
    body: 'Jawab pertanyaan umum 24 jam, kumpulkan data leads, dan eskalasi ke manusia hanya kalau perlu. Cocok untuk bisnis jasa panggilan atau produk dengan FAQ panjang.',
  },
  {
    icon: <Workflow className={ICON} />,
    title: 'Otomasi Follow-up Leads',
    body: 'Leads masuk dari form atau WhatsApp, sistem kirim pesan pertama, tanya kebutuhan, masukkan ke pipeline CRM. Tidak ada yang jatuh dari celah.',
  },
  {
    icon: <FileSpreadsheet className={ICON} />,
    title: 'Laporan Otomatis',
    body: 'Data dari berbagai sumber (Google Ads, website, Odoo, spreadsheet) dikumpulkan dan diformat jadi laporan yang langsung bisa dibaca setiap Senin pagi.',
  },
  {
    icon: <FileScan className={ICON} />,
    title: 'Pemrosesan Dokumen',
    body: 'Ekstrak informasi dari invoice, kontrak, atau formulir yang masuk secara otomatis. Cocok untuk bisnis yang terima banyak dokumen dari berbagai format.',
  },
  {
    icon: <Sparkles className={ICON} />,
    title: 'Analisis Konten dan Riset',
    body: 'Riset keyword, kompetitor, atau tren pasar yang biasanya makan waktu berjam-jam bisa dipercepat secara drastis.',
  },
]

const processSteps = [
  {
    label: 'Step 1',
    title: 'Identifikasi Peluang',
    description: 'Pelajari alur kerja bisnis dan identifikasi mana yang paling menguras waktu dan paling cocok diotomasi. Tidak semua harus diotomasi sekaligus.',
  },
  {
    label: 'Step 2',
    title: 'Desain Solusi',
    description: 'Rancang arsitektur otomasi: tools yang dipakai, alur data, dan titik-titik di mana manusia tetap perlu terlibat.',
  },
  {
    label: 'Step 3',
    title: 'Build & Test',
    description: 'Bangun sistem, test dengan skenario nyata, dan pastikan tidak ada yang bocor atau berperilaku aneh.',
  },
  {
    label: 'Step 4',
    title: 'Training & Dokumentasi',
    description: 'Tim Anda perlu tahu cara kerja sistem dan apa yang harus dilakukan kalau ada masalah. Dokumentasi praktis, bukan yang dibaca sekali lalu terlupakan.',
  },
  {
    label: 'Step 5',
    title: 'Monitoring Awal',
    description: 'Minggu-minggu pertama setelah go-live saya pantau performa. Otomasi baru sering perlu penyesuaian kecil begitu bertemu kondisi nyata.',
  },
]

const faqItems = [
  {
    question: 'Apakah ini mahal?',
    answer:
      'Sangat bergantung pada kompleksitas. Otomasi sederhana (auto-reply, lead capture) bisa dikerjakan dalam beberapa hari. Sistem kompleks dengan banyak integrasi butuh waktu dan biaya lebih. Saya berikan estimasi setelah memahami kebutuhan.',
  },
  {
    question: 'Apakah perlu tim IT untuk mengelolanya?',
    answer:
      'Untuk kebanyakan solusi yang saya bangun, tidak. Tapi ada standar pengetahuan teknis minimal yang tim Anda perlu punya. Ini jadi bagian diskusi awal.',
  },
  {
    question: 'Apakah aman? Data perusahaan ada di mana?',
    answer:
      'Ini pertanyaan penting dan selalu saya bahas dari awal. Tergantung solusinya, data bisa diproses di server Anda sendiri atau via API layanan pihak ketiga dengan enkripsi standar industri.',
  },
]

export default function AiIntegrationPage() {
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
          { label: 'AI Integration' },
        ]}
      />

      <ServiceHero
        badge="AI Integration"
        headline="Otomasi Pekerjaan yang Berulang Agar Tim Anda Fokus ke Hal yang Lebih Penting"
        highlight="Pekerjaan yang Berulang"
        subheadline="AI bukan tentang ganti manusia. Ini tentang menghilangkan pekerjaan membosankan yang menyita waktu tim Anda — supaya energi bisa difokuskan ke hal yang benar-benar membutuhkan penilaian manusia."
        ctaWaKey="aiIntegration"
        ctaLabel="Diskusikan Kebutuhan Otomasi Bisnis Saya"
        socialProof="Stack: n8n, OpenAI, Anthropic Claude, Make, Python"
      />

      <ServiceProse
        eyebrow="Masalah"
        headline="Berapa Jam Per Minggu Tim Anda Habiskan untuk Pekerjaan yang Bisa Diotomasi?"
        paragraphs={[
          'Membalas pertanyaan yang sama berkali-kali di WhatsApp. Merekap data dari satu spreadsheet ke spreadsheet lain. Mengirimkan email follow-up yang isinya hampir selalu sama. Membuat laporan mingguan dari data yang sudah ada.',
          'Semua itu bisa diotomasi. Dan kalau dijumlahkan, waktu yang terbuang untuk pekerjaan-pekerjaan itu bisa sangat signifikan.',
        ]}
      />

      <ServiceCardGrid
        eyebrow="Solusi"
        headline="Apa yang Bisa Diotomasi dengan AI?"
        intro="Ini bukan daftar fitur abstrak. Ini contoh nyata dari masalah yang bisa diselesaikan."
        items={solutions}
        columns={3}
        background="gray"
      />

      <ServiceProse
        eyebrow="Tools"
        headline="Teknologi di Baliknya"
        paragraphs={[
          'Saya tidak terikat pada satu platform. Pilihan tools disesuaikan dengan kebutuhan dan kondisi teknis bisnis Anda.',
          'n8n untuk otomasi open-source yang fleksibel dan bisa di-host sendiri. OpenAI API dan Anthropic Claude untuk fitur yang butuh pemahaman bahasa alami. Make (mantan Integromat) untuk integrasi sederhana tanpa server sendiri. Python untuk logika kompleks atau pemrosesan data besar.',
        ]}
        chips={['n8n', 'OpenAI', 'Anthropic Claude', 'Make', 'Python', 'Webhook']}
      />

      <ServiceTimeline
        eyebrow="Proses Kerja"
        headline="Dari Ide ke Sistem yang Berjalan"
        steps={processSteps}
        background="gray"
      />

      <ServiceProse
        eyebrow="Harapan Realistis"
        headline="Yang Perlu Anda Pahami Sebelum Mulai"
        paragraphs={[
          'AI integration bukan solusi instan yang langsung mengubah semua. Ada kurva implementasi, ada waktu yang dibutuhkan untuk tim terbiasa, dan ada kemungkinan perlu iterasi.',
          'Yang paling sering berhasil adalah dimulai dari satu masalah spesifik yang paling menyita waktu, selesaikan itu dengan baik, lalu baru ekspansi ke area lain.',
          'Saya tidak akan menjual sistem yang kompleks kalau kebutuhan Anda bisa diselesaikan dengan cara yang lebih sederhana.',
        ]}
      />

      <ServiceFAQ items={faqItems} title="Pertanyaan yang Sering Ditanyakan" />

      <ServiceCTA
        headline="Ada Pekerjaan yang Ingin Anda Otomasi tapi Tidak Tahu Caranya?"
        body="Ceritakan masalahnya. Saya bantu evaluasi apakah itu bisa diotomasi dan berapa yang kira-kira bisa dihemat."
        ctaWaKey="aiIntegration"
        ctaLabel="Diskusi via WhatsApp"
        subText="Atau jadwalkan sesi discovery 45 menit via Calendly →"
      />
    </main>
  )
}
