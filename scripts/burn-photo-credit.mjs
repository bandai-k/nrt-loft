// 写真の左下に出典（写真：撮影者 / Unsplash）を焼き込む。元写真は <name>-src.webp に残しておく。
// 使い方: node scripts/burn-photo-credit.mjs public/images/<slug>/<name>.webp "撮影者名"
import fs from "node:fs";
import sharp from "sharp";

const [target, author] = process.argv.slice(2);
if (!target || !author) {
  console.error('usage: node scripts/burn-photo-credit.mjs <image.webp> "撮影者名"');
  process.exit(1);
}

const src = target.replace(/\.webp$/, "-src.webp");
if (!fs.existsSync(src)) fs.copyFileSync(target, src);

const { width, height } = await sharp(src).metadata();
const fontPx = Math.round(width * 0.016);
const padX = Math.round(fontPx * 0.7);
const padY = Math.round(fontPx * 0.4);
const margin = Math.round(width * 0.02);

const escaped = `写真：${author} / Unsplash`.replace(/&/g, "&amp;").replace(/</g, "&lt;");
const label = await sharp({
  text: {
    text: `<span foreground="#ffffff">${escaped}</span>`,
    font: `Hiragino Sans W6 ${fontPx}`,
    dpi: 72,
    rgba: true,
  },
})
  .png()
  .toBuffer({ resolveWithObject: true });

const boxW = label.info.width + padX * 2;
const boxH = label.info.height + padY * 2;
const plate = Buffer.from(
  `<svg width="${boxW}" height="${boxH}" xmlns="http://www.w3.org/2000/svg"><rect width="${boxW}" height="${boxH}" rx="${Math.round(boxH / 2)}" fill="#000" fill-opacity="0.5"/></svg>`,
);

const top = height - margin - boxH;
const tmp = `${target}.tmp`;
await sharp(src)
  .composite([
    { input: plate, left: margin, top },
    { input: label.data, left: margin + padX, top: top + padY },
  ])
  .webp({ quality: 85 })
  .toFile(tmp);
fs.renameSync(tmp, target);
console.log(`OK ${target}`);
