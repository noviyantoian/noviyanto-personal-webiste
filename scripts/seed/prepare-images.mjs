/**
 * Normalisasi PNG hasil codex jadi WebP siap upload.
 *
 * raw/<key>.png  ->  assets/<key>.webp  (1536x1024, 3:2)
 *
 * Gambar hero diberi padding vertikal dulu: Payload memotong hero jadi
 * `og` 1200x630 (rasio 1.9) dan `feature` 1600x900 (16:9) dengan cover-crop,
 * jadi isi ilustrasi harus muat di area tengah 1536x806 supaya tidak ada
 * bagian yang terpotong di preview sosial maupun di hero halaman.
 */
import { readdir, mkdir } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const HERE = path.dirname(fileURLToPath(import.meta.url))
const RAW = path.join(HERE, 'raw')
const ASSETS = path.join(HERE, 'assets')

const CANVAS = { width: 1536, height: 1024 }
const HERO_SAFE_HEIGHT = 806 // area yang selamat dari crop 1200x630
const WHITE = { r: 255, g: 255, b: 255, alpha: 1 }

async function build(key, file) {
  const src = path.join(RAW, file)
  const out = path.join(ASSETS, `${key}.webp`)
  const isHero = key.endsWith('-hero')

  const base = isHero
    ? await sharp(src)
        .resize({
          width: CANVAS.width,
          height: HERO_SAFE_HEIGHT,
          fit: 'contain',
          background: WHITE,
        })
        .extend({
          top: Math.round((CANVAS.height - HERO_SAFE_HEIGHT) / 2),
          bottom: CANVAS.height - HERO_SAFE_HEIGHT - Math.round((CANVAS.height - HERO_SAFE_HEIGHT) / 2),
          background: WHITE,
        })
        .toBuffer()
    : await sharp(src)
        .resize({ ...CANVAS, fit: 'cover', background: WHITE })
        .toBuffer()

  const info = await sharp(base).webp({ quality: 82, effort: 5 }).toFile(out)
  console.log(`${key.padEnd(30)} ${info.width}x${info.height}  ${(info.size / 1024).toFixed(0)} KB`)
}

await mkdir(ASSETS, { recursive: true })
const files = (await readdir(RAW)).filter((f) => f.endsWith('.png')).sort()
if (!files.length) throw new Error(`Tidak ada PNG di ${RAW}`)
for (const file of files) {
  await build(path.basename(file, '.png'), file)
}
console.log(`\n${files.length} gambar siap di scripts/seed/assets/`)
