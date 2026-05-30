import { ImageResponse } from 'next/og'
import { readFile } from 'node:fs/promises'
import { join } from 'node:path'

/**
 * Generator OG card branded (1200×630) untuk halaman layanan.
 * Dirender Next sebagai static PNG saat build via konvensi opengraph-image.tsx.
 *
 * Font Clash Display + Satoshi dibaca dari public/fonts/og/*.ttf (woff2 tidak
 * didukung Satori — sudah dikonversi ke ttf). fs read aman: opengraph-image
 * jalan di Node runtime saat build.
 */

export const ogSize = { width: 1200, height: 630 } as const
export const ogContentType = 'image/png'

// Palette brand (light mode) — selaras design system.
const COLOR = {
  bg: '#FFFFFF',
  surface: '#F9FAFB',
  text: '#111827',
  muted: '#6B7280',
  border: '#E5E7EB',
  accent: '#F59E0B',
  accentWarm: '#F97316',
} as const

let fontCache: Array<{ name: string; data: Buffer; weight: 500 | 600; style: 'normal' }> | null = null

async function loadFonts() {
  if (fontCache) return fontCache
  const dir = join(process.cwd(), 'public', 'fonts', 'og')
  const [clash, satoshi] = await Promise.all([
    readFile(join(dir, 'ClashDisplay-Semibold.ttf')),
    readFile(join(dir, 'Satoshi-Medium.ttf')),
  ])
  fontCache = [
    { name: 'Clash Display', data: clash, weight: 600, style: 'normal' },
    { name: 'Satoshi', data: satoshi, weight: 500, style: 'normal' },
  ]
  return fontCache
}

interface OgCardParams {
  eyebrow: string
  title: string
  subtitle: string
}

export async function renderOgCard({ eyebrow, title, subtitle }: OgCardParams): Promise<ImageResponse> {
  const fonts = await loadFonts()

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: COLOR.bg,
          padding: '72px 80px',
          fontFamily: 'Satoshi',
          position: 'relative',
        }}
      >
        {/* Amber glow corner */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -160,
            width: 520,
            height: 520,
            borderRadius: 9999,
            background: `radial-gradient(circle, ${COLOR.accent}33 0%, ${COLOR.accent}00 70%)`,
            display: 'flex',
          }}
        />

        {/* Top: wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ width: 16, height: 16, borderRadius: 9999, backgroundColor: COLOR.accent, display: 'flex' }} />
          <div style={{ fontFamily: 'Clash Display', fontSize: 30, fontWeight: 600, color: COLOR.text, letterSpacing: -0.5 }}>
            Noviyanto
          </div>
        </div>

        {/* Middle: eyebrow + title + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: 4,
              textTransform: 'uppercase',
              color: COLOR.accentWarm,
              marginBottom: 20,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              fontFamily: 'Clash Display',
              fontSize: 76,
              fontWeight: 600,
              color: COLOR.text,
              lineHeight: 1.05,
              letterSpacing: -1.5,
              maxWidth: 940,
            }}
          >
            {title}
          </div>
          <div style={{ fontSize: 30, color: COLOR.muted, lineHeight: 1.4, marginTop: 28, maxWidth: 900 }}>
            {subtitle}
          </div>
        </div>

        {/* Bottom: accent bar + url */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 56, height: 6, borderRadius: 9999, backgroundColor: COLOR.accent, display: 'flex' }} />
            <div style={{ fontSize: 24, color: COLOR.muted }}>Digital Growth Partner · Semarang</div>
          </div>
          <div style={{ fontFamily: 'Clash Display', fontSize: 26, fontWeight: 600, color: COLOR.text }}>
            noviyanto.com
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts },
  )
}
