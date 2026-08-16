import { SITE } from './constants'

/**
 * IndexNow — protokol ping instant ke Bing, Yandex, dan search engine
 * yang mendukung (Google TIDAK mendukung; pakai GSC manual untuk Google).
 *
 * Saat artikel publish/update, kirim URL ke endpoint IndexNow supaya
 * di-crawl dalam hitungan menit, bukan hari.
 *
 * Key di-host sebagai file statis di `/public/<KEY>.txt` (isi = KEY).
 * Spec: https://www.indexnow.org/documentation
 */

const INDEXNOW_KEY = '552afcd3d74a99c4d9bc97083bb81598'
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow'

/** Semua halaman statis penting — ping saat deploy atau update konten. */
export const ALL_STATIC_PAGES = [
  '/',
  '/layanan',
  '/layanan/website',
  '/layanan/website/semarang',
  '/layanan/website/jakarta',
  '/layanan/website/bandung',
  '/layanan/google-ads',
  '/layanan/seo',
  '/layanan/digital-marketing',
  '/layanan/ai-integration',
  '/layanan/mobile-app',
  '/layanan/maintenance',
  '/jasa-website-tour-travel',
  '/portofolio',
  '/tentang',
  '/kontak',
  '/blog',
  '/kebijakan-privasi',
  '/syarat-ketentuan',
] as const

// Catatan: daftar ini sengaja hanya memuat halaman STATIS. Artikel blog
// ditambahkan secara dinamis oleh /api/indexnow karena slug-nya berasal dari
// CMS — lihat route-nya. Query Payload tidak ditaruh di file ini untuk
// menghindari dependensi melingkar: indexnow.ts diimpor collections/Posts.ts,
// sementara lib/blog.ts menarik konfigurasi Payload yang memuat koleksi itu.

interface PingResult {
  ok: boolean
  status?: number
  error?: string
  urls?: number
}

/**
 * Kirim daftar URL ke IndexNow. Non-blocking-friendly: caller boleh
 * `void pingIndexNow(...)` tanpa await kalau tidak mau menunda response.
 */
export async function pingIndexNow(urls: string[]): Promise<PingResult> {
  if (urls.length === 0) return { ok: true, urls: 0 }

  const host = new URL(SITE.url).host

  const payload = {
    host,
    key: INDEXNOW_KEY,
    keyLocation: `${SITE.url}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  try {
    const res = await fetch(INDEXNOW_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
      body: JSON.stringify(payload),
    })

    // 200 = diterima, 202 = diterima (validasi key tertunda). Keduanya OK.
    if (res.status === 200 || res.status === 202) {
      return { ok: true, status: res.status, urls: urls.length }
    }
    return { ok: false, status: res.status, error: `HTTP ${res.status}`, urls: urls.length }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

// pingAllPages() dihapus: ia hanya mengirim halaman statis dan melewatkan
// artikel blog, sehingga memakainya untuk "ping semuanya" justru menyesatkan.
// /api/indexnow kini menyusun daftar lengkapnya sendiri (statis + blog dari CMS).

/** Helper: bangun URL artikel blog dari slug. */
export function blogUrl(slug: string): string {
  return `${SITE.url}/blog/${slug}`
}

/** Helper: bangun URL halaman layanan dari slug. */
export function serviceUrl(slug: string): string {
  return `${SITE.url}/layanan/${slug}`
}
