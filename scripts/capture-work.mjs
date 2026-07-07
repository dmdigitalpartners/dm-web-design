// Capture live client sites for case-study visuals.
// Outputs WebP: hero (viewport) + full-page at desktop, hero at mobile.
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdirSync, rmSync } from "fs";

const sites = [
  { slug: "maxterm", url: "https://maxterm-paint.vercel.app/" },
  { slug: "skat-print", url: "https://skat-print.vercel.app/bg" },
  { slug: "tavernaki", url: "https://greek-tavernaki-iota.vercel.app/" },
];

mkdirSync("public/images/work", { recursive: true });
const browser = await chromium.launch();

for (const { slug, url } of sites) {
  for (const [vp, viewport] of Object.entries({
    desktop: { width: 1440, height: 900 },
    mobile: { width: 390, height: 844 },
  })) {
    const page = await browser.newPage({ viewport, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle", timeout: 60000 });
    // settle lazy content/animations
    await page.mouse.wheel(0, 400);
    await page.waitForTimeout(1500);
    await page.mouse.wheel(0, -400);
    await page.waitForTimeout(1500);

    const tmp = `public/images/work/${slug}-${vp}.tmp.png`;
    await page.screenshot({ path: tmp });
    await sharp(tmp).webp({ quality: 82 }).toFile(`public/images/work/${slug}-${vp}.webp`);
    rmSync(tmp);

    if (vp === "desktop") {
      const tmpFull = `public/images/work/${slug}-full.tmp.png`;
      await page.screenshot({ path: tmpFull, fullPage: true });
      await sharp(tmpFull).webp({ quality: 78 }).toFile(`public/images/work/${slug}-full.webp`);
      rmSync(tmpFull);
    }
    await page.close();
    console.log(`${slug} ${vp} done`);
  }
}
await browser.close();
