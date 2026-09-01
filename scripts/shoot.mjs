// Screenshot harness for the build-verify loop.
// Usage: node scripts/shoot.mjs <url> <name> [--full]
// Captures desktop (1440) + mobile (390) in dark and light mode
// into <repo>/.shots/<name>-{desktop,mobile}-{dark,light}.png
import { chromium } from "playwright";
import { mkdirSync } from "fs";
import { fileURLToPath } from "url";

const [url, name, ...flags] = process.argv.slice(2);
if (!url || !name) {
  console.error("Usage: node scripts/shoot.mjs <url> <name> [--full]");
  process.exit(1);
}
const fullPage = flags.includes("--full");
const outDir = fileURLToPath(new URL("../.shots/", import.meta.url));
mkdirSync(outDir, { recursive: true });

const browser = await chromium.launch();
const viewports = { desktop: { width: 1440, height: 900 }, mobile: { width: 390, height: 844 } };

for (const [vpName, viewport] of Object.entries(viewports)) {
  for (const theme of ["dark", "light"]) {
    const page = await browser.newPage({ viewport });
    await page.goto(url, { waitUntil: "networkidle" });
    await page.evaluate((t) => {
      document.documentElement.classList.toggle("dark", t === "dark");
    }, theme);
    // Scroll through the page so whileInView reveals fire, then return to top
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(800);
    const path = `${outDir}${name}-${vpName}-${theme}.png`;
    await page.screenshot({ path, fullPage });
    console.log(path);
    await page.close();
  }
}
await browser.close();
