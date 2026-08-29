import { chromium } from "playwright";

// Port-aware so the harness can target a dev server that is not on :3000.
const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/contact`, { waitUntil: "networkidle" });

// 1. Empty submit → client-side Zod errors
await page.getByRole("button", { name: "Изпратете съобщението" }).click();
await page.waitForTimeout(400);
const nameError = await page.locator("#contact-name-error").textContent().catch(() => null);
console.log("empty-submit name error:", nameError);

// 2. Valid submit → server 503 (no RESEND_API_KEY) → aria-live error with mailto
await page.fill("#contact-name", "Тест Тестов");
await page.fill("#contact-email", "test@example.com");
await page.fill("#contact-message", "Това е тестово съобщение от проверката на формата.");
await page.getByRole("button", { name: "Изпратете съобщението" }).click();
await page.waitForTimeout(1500);
const status = await page.locator("[role=status]").textContent();
console.log("server response message:", status?.trim());
await page.screenshot({ path: ".shots/contact-form-states.png" });
await browser.close();
