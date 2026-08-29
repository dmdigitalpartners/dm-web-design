// Interactive shell verification: console errors, mobile menu, Escape close.
import { chromium } from "playwright";

// Port-aware so the harness can target a dev server that is not on :3000.
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const errors = [];
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(msg.text());
});
page.on("pageerror", (err) => errors.push(String(err)));

await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: "Отвори менюто" }).click();
await page.waitForTimeout(500);
await page.screenshot({ path: ".shots/shell-mobile-menu.png" });
const menuVisible = await page.getByRole("link", { name: "Процес" }).last().isVisible();
await page.keyboard.press("Escape");
await page.waitForTimeout(400);
const menuClosedAfterEscape = !(await page
  .getByRole("link", { name: "Процес" })
  .last()
  .isVisible()
  .catch(() => false));

console.log("menu opens:", menuVisible);
console.log("escape closes:", menuClosedAfterEscape);
console.log("console errors:", errors.length ? errors : "none");
await browser.close();
process.exit(errors.length || !menuVisible || !menuClosedAfterEscape ? 1 : 0);
