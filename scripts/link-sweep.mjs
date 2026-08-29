// Crawl all internal links from every route; report non-200s. Also checks 404 page.
import { chromium } from "playwright";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const routes = [
  "/", "/work", "/work/maxterm", "/work/skat-print", "/work/tavernaki",
  "/services", "/pricing", "/process", "/about", "/contact", "/book-a-call",
  "/legal/privacy", "/legal/terms",
];

const browser = await chromium.launch();
const page = await browser.newPage();
const found = new Set();

for (const route of routes) {
  await page.goto(base + route, { waitUntil: "load", timeout: 60000 });
  const hrefs = await page.$$eval("a[href]", (as) => as.map((a) => a.getAttribute("href")));
  for (const h of hrefs) {
    if (!h || h.startsWith("mailto:") || h.startsWith("#")) continue;
    if (h.startsWith("http") && !h.startsWith(base)) continue;
    found.add(h.split("#")[0].split("?")[0] || "/");
  }
}

let bad = 0;
for (const path of [...found].sort()) {
  const res = await page.request.get(base + path);
  if (res.status() !== 200) {
    console.log("BAD", res.status(), path);
    bad++;
  }
}
console.log(`checked ${found.size} unique internal links`);

// 404 behavior
const nf = await page.request.get(base + "/no-such-page");
console.log("404 route returns:", nf.status());

await browser.close();
process.exit(bad ? 1 : 0);
