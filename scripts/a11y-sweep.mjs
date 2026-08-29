// axe-core accessibility sweep over every route, dark + light.
import { chromium } from "playwright";
import { AxeBuilder } from "@axe-core/playwright";

// Port-aware so the harness can target a dev server that is not on :3000.
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const routes = [
  "/",
  "/work",
  "/work/maxterm",
  "/work/skat-print",
  "/work/tavernaki",
  "/services",
  "/pricing",
  "/process",
  "/about",
  "/contact",
  "/book-a-call",
  "/legal/privacy",
  "/legal/terms",
];

const browser = await chromium.launch();
const context = await browser.newContext();
const page = await context.newPage();
let totalViolations = 0;

for (const route of routes) {
  for (const theme of ["dark", "light"]) {
    await page.goto(`${BASE}${route}`, {
      waitUntil: "load",
      timeout: 60000,
    });
    await page.evaluate((t) => {
      document.documentElement.classList.toggle("dark", t === "dark");
    }, theme);
    // Scroll through so whileInView reveals complete before contrast checks
    await page.evaluate(async () => {
      const step = window.innerHeight / 2;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(900);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa"])
      // Cal.com iframe content is third-party
      .exclude("iframe")
      .analyze();
    if (results.violations.length) {
      totalViolations += results.violations.length;
      console.log(`\n${route} [${theme}]`);
      for (const v of results.violations) {
        console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} nodes)`);
        for (const n of v.nodes.slice(0, 3)) {
          console.log(`    -> ${n.target.join(" ")}`);
        }
      }
    }
  }
}

console.log(totalViolations === 0 ? "\nA11Y CLEAN" : `\n${totalViolations} violation groups`);
await browser.close();
process.exit(totalViolations ? 1 : 0);
