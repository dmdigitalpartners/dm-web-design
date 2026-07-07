// One-time logo prep: the source badge is white artwork on flat carbon.
// Luminance becomes the alpha channel, color forced to white — clean
// antialiased transparency. Outputs navbar/footer/favicon/OG sizes.
import sharp from "sharp";
import { mkdirSync } from "fs";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/process-logo.mjs <path-to-Logo.png>");
  process.exit(1);
}
mkdirSync("public/images/brand", { recursive: true });

const { data, info } = await sharp(src)
  .ensureAlpha()
  .raw()
  .toBuffer({ resolveWithObject: true });

// alpha = luminance with a floor cutoff (source background is ~#1B1B1B,
// not pure black — anything at/below it must go fully transparent)
const CUT = 70;
for (let i = 0; i < data.length; i += 4) {
  const lum = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
  data[i] = 255;
  data[i + 1] = 255;
  data[i + 2] = 255;
  data[i + 3] = lum <= CUT ? 0 : Math.min(255, Math.round(((lum - CUT) * 255) / (255 - CUT)));
}

const white = sharp(data, {
  raw: { width: info.width, height: info.height, channels: 4 },
}).trim();
const whiteBuf = await white.png().toBuffer();

// Full-size transparent white mark
await sharp(whiteBuf).toFile("public/images/brand/logo-white.png");
// Navbar (2x for retina at ~40px display height)
await sharp(whiteBuf).resize({ height: 160 }).toFile("public/images/brand/logo-white-160.png");

// Carbon-colored variant for light backgrounds: same alpha, dark RGB
const dark = Buffer.from(data);
for (let i = 0; i < dark.length; i += 4) {
  dark[i] = 0x17;
  dark[i + 1] = 0x17;
  dark[i + 2] = 0x1a;
}
const darkBuf = await sharp(dark, {
  raw: { width: info.width, height: info.height, channels: 4 },
})
  .trim()
  .png()
  .toBuffer();
await sharp(darkBuf).toFile("public/images/brand/logo-dark.png");
await sharp(darkBuf).resize({ height: 160 }).toFile("public/images/brand/logo-dark-160.png");

// Favicon: white mark centered on carbon square
const mark = await sharp(whiteBuf).resize(448, 448, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
await sharp({
  create: { width: 512, height: 512, channels: 4, background: "#0b0b0c" },
})
  .composite([{ input: mark, gravity: "center" }])
  .png()
  .toFile("public/images/brand/icon-512.png");
await sharp("public/images/brand/icon-512.png").resize(32, 32).toFile("app/icon.png");
await sharp("public/images/brand/icon-512.png").resize(180, 180).toFile("app/apple-icon.png");

console.log("done");
