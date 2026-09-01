// Klien aktif Noviyanto — satu sumber kebenaran, dipakai halaman /portofolio
// dan halaman kota /layanan/website/[kota].
//
// Field `city`/`region` berasal dari keterangan pemilik situs, bukan diturunkan
// dari nama merek: "Inisumedang" memang di Sumedang, tapi "Lapin" di Bandung
// dan "Truly"/"Jeda" di Cimahi — tidak ada yang bisa ditebak dari namanya.
//
// Sebaran per 2026-09-01: Jawa Barat 4 (Bandung, Cimahi x2, Sumedang),
// Jakarta 2, Semarang 2, Yogyakarta 1.

export interface Client {
  slug: string
  name: string
  domain: string
  industry: string
  /** Kota domisili klien. Sumber: keterangan pemilik situs, bukan tebakan. */
  city: string
  region: string
  logo: string
  logoBg: 'white' | 'black' | 'amber'
  wallLogo: string
  wallLogoDarkBg?: boolean
  services: string[]
  summary: string
  highlight: string
}

export const clients: Client[] = [
  {
    slug: 'trulyhomemassage',
    name: 'Truly Home Massage',
    domain: 'trulyhomemassage.com',
    industry: 'Home Service · Spa Panggilan',
    city: 'Cimahi',
    region: 'Jawa Barat',
    logo: '/images/clients/trulyhomemassage.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/trulyhomemassage.png',
    services: ['Maintenance Website', 'Google Ads', 'SEO'],
    summary:
      'Brand spa panggilan profesional. Pengelolaan maintenance, kampanye Google Ads, dan SEO untuk menjaga aliran booking lewat WhatsApp.',
    highlight: 'Lead generation lokal + brand visibility jangka panjang',
  },
  {
    slug: 'jedahomemassage',
    name: 'Jeda Home Massage',
    domain: 'jedahomemassage.com',
    industry: 'Home Service · Spa Panggilan',
    city: 'Cimahi',
    region: 'Jawa Barat',
    logo: '/images/clients/jedahomemassage.jpg',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/jedahomemassage.png',
    wallLogoDarkBg: true,
    services: ['Maintenance Website', 'Google Ads', 'SEO'],
    summary:
      'Spa panggilan dengan positioning premium. Maintenance website + Google Ads dan SEO untuk menangkap pencarian intent tinggi di area target.',
    highlight: 'Funnel paid + organik yang saling menutupi celah',
  },
  {
    slug: 'rockologist',
    name: 'Rockologist',
    domain: 'rockologist.id',
    industry: 'Perhiasan & Batu Mulia',
    city: 'Yogyakarta',
    region: 'DI Yogyakarta',
    logo: '/images/clients/rockologist.png',
    logoBg: 'black',
    wallLogo: '/images/clients/navbar/rockologist.png',
    services: ['Maintenance Website', 'SEO'],
    summary:
      'Brand batu mulia dan jewelry artisan. Maintenance rutin + SEO organik untuk membangun otoritas brand di pencarian produk dan koleksi.',
    highlight: 'Product discovery via pencarian organik',
  },
  {
    slug: 'prioffice',
    name: 'Prioffice',
    domain: 'prioffice.com',
    industry: 'Sewa Kantor & Virtual Office',
    city: 'Jakarta',
    region: 'DKI Jakarta',
    logo: '/images/clients/prioffice.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/prioffice.png',
    services: ['Maintenance Website'],
    summary:
      'Penyedia sewa kantor dan virtual office. Maintenance website untuk menjaga uptime, performa, dan halaman selalu siap menerima inquiry.',
    highlight: 'Website selalu online untuk bisnis berbasis booking',
  },
  {
    slug: 'layz-motor',
    name: 'Layz Motor',
    domain: 'layz-motor.com',
    industry: 'Otomotif · Motor',
    city: 'Jakarta',
    region: 'DKI Jakarta',
    logo: '/images/clients/layz-motor.jpg',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/layz-motor.png',
    services: ['Maintenance Website'],
    summary:
      'Bisnis motor — showroom dan layanan. Maintenance website rutin untuk menjaga keamanan, kecepatan, dan update konten produk.',
    highlight: 'Maintenance jangka panjang dengan respons cepat',
  },
  {
    slug: 'lapin',
    name: 'Lapin',
    domain: 'lapin.id',
    industry: 'Brand Lokal',
    city: 'Bandung',
    region: 'Jawa Barat',
    logo: '/images/clients/lapin.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/lapin.png',
    services: ['Google Ads'],
    summary:
      'Pengelolaan kampanye Google Ads untuk Lapin. Setup, optimasi keyword, dan tracking konversi untuk mendorong inquiry yang relevan.',
    highlight: 'Paid search yang menargetkan intent komersial',
  },
  {
    slug: 'inisumedang',
    name: 'Inisumedang',
    domain: 'inisumedang.com',
    industry: 'Media Lokal · Berita Daerah',
    city: 'Sumedang',
    region: 'Jawa Barat',
    logo: '/images/clients/inisumedang.jpg',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/inisumedang.png',
    services: ['Manage VPS'],
    summary:
      'Portal berita daerah Sumedang. Pengelolaan VPS — keamanan server, performa, dan ketersediaan untuk traffic harian yang konsisten.',
    highlight: 'Infrastruktur VPS yang stabil untuk traffic media',
  },
  {
    slug: 'folclean',
    name: 'Folclean',
    domain: 'folclean.com',
    industry: 'Cleaning Service · Rumah & Gedung',
    city: 'Semarang',
    region: 'Jawa Tengah',
    logo: '/images/clients/folclean.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/folclean.png',
    services: ['Maintenance Website', 'SEO', 'Google Ads', 'Manage VPS'],
    summary:
      'Jasa kebersihan rumah dan gedung di Semarang dan Kendal. Pengelolaan penuh — maintenance website, SEO lokal, Google Ads, sampai VPS tempat situsnya berjalan.',
    highlight: 'Satu tangan dari server sampai kampanye iklan',
  },
  {
    slug: 'wallblock',
    name: 'Wallblock',
    domain: 'wallblock.co.id',
    industry: 'B2B IT · Cyber Security',
    city: 'Semarang',
    region: 'Jawa Tengah',
    logo: '/images/clients/wallblock.png',
    logoBg: 'white',
    wallLogo: '/images/clients/navbar/wallblock.png',
    services: ['Maintenance Website', 'SEO', 'Google Ads', 'Manage VPS'],
    summary:
      'Vendor pengadaan IT dan mitra cyber security untuk bank, rumah sakit, dan korporasi di Jawa Tengah. Pengelolaan menyeluruh dari infrastruktur VPS sampai akuisisi lead B2B.',
    highlight: 'Funnel B2B untuk siklus keputusan panjang',
  },
]
/**
 * Klien yang dipakai sebagai bukti di halaman kota.
 *
 * Cocokkan per kota lebih dulu; kalau kota itu punya kota tetangga yang
 * relevan (Bandung dengan Cimahi dan Sumedang), sertakan juga — nama kota
 * aslinya tetap ditampilkan apa adanya, tidak diklaim sebagai kota utama.
 */
const CITY_NEIGHBOURS: Record<string, readonly string[]> = {
  Bandung: ['Cimahi', 'Sumedang'],
}

export function clientsForCity(city: string): Client[] {
  const scope = [city, ...(CITY_NEIGHBOURS[city] ?? [])]
  return clients.filter((c) => scope.includes(c.city))
}
