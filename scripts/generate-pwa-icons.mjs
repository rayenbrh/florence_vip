import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const iconsDir = path.join(root, 'public', 'icons')

const svg = (size) => `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
  <rect width="100%" height="100%" fill="#0F0E0C"/>
  <text x="50%" y="50%" dominant-baseline="central" text-anchor="middle" font-family="Georgia, serif" font-size="${Math.round(size * 0.42)}" fill="#C9A96E">◆</text>
</svg>`

async function main() {
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true })
  for (const s of [192, 512]) {
    await sharp(Buffer.from(svg(s))).png().toFile(path.join(iconsDir, `icon-${s}.png`))
  }
  await sharp(Buffer.from(svg(32))).png().toFile(path.join(root, 'public', 'favicon.png'))
  console.log('PWA icons and public/favicon.png written.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
