import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/contact-schema";
import { siteConfig } from "@/lib/site-config";

// Best-effort, per-instance rate limit for the marketing form. It resets on
// redeploy and does not coordinate across serverless instances.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const MAX_TRACKED_IPS = 1_000;
const hits = new Map<string, { count: number; resetAt: number }>();

function pruneExpiredHits(now: number) {
  for (const [ip, entry] of hits) {
    if (entry.resetAt <= now) hits.delete(ip);
  }
}

function rateLimit(ip: string) {
  const now = Date.now();
  const existing = hits.get(ip);

  if (!existing || existing.resetAt <= now) {
    if (!existing && hits.size >= MAX_TRACKED_IPS) pruneExpiredHits(now);

    // Keep memory bounded. If every retained entry is active, fail open for a
    // new address rather than denying unrelated visitors.
    if (!existing && hits.size >= MAX_TRACKED_IPS) {
      return { limited: false, retryAfter: 0 };
    }

    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return { limited: false, retryAfter: 0 };
  }

  const retryAfter = Math.max(1, Math.ceil((existing.resetAt - now) / 1_000));
  if (existing.count >= LIMIT) return { limited: true, retryAfter };

  existing.count += 1;
  return { limited: false, retryAfter: 0 };
}

function getClientIp(request: NextRequest) {
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return forwarded || request.headers.get("x-real-ip")?.trim() || null;
}

export async function POST(request: NextRequest) {
  const ip = getClientIp(request);
  const limit = ip ? rateLimit(ip) : { limited: false, retryAfter: 0 };
  if (limit.limited) {
    return NextResponse.json(
      { ok: false, error: "Твърде много опити. Опитайте отново по-късно." },
      { status: 429, headers: { "Retry-After": String(limit.retryAfter) } }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Невалидна заявка." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Моля, проверете полетата на формата." },
      { status: 400 }
    );
  }

  // Honeypot filled → pretend success, send nothing
  if (parsed.data.company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not configured");
    return NextResponse.json(
      { ok: false, error: "Формата е временно недостъпна. Пишете ни на имейл." },
      { status: 503 }
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(apiKey);
  // Production deliverability requires a verified sending domain in Resend
  // (set CONTACT_FROM to e.g. "D&M Website <hello@yourdomain.bg>" once DNS
  // SPF/DKIM are configured). The resend.dev sandbox only works for testing.
  const from = process.env.CONTACT_FROM ?? "D&M Website <onboarding@resend.dev>";
  const { error } = await resend.emails.send({
    from,
    to: process.env.CONTACT_EMAIL ?? siteConfig.email,
    replyTo: email,
    subject: `Ново запитване от сайта, ${name}`,
    text: `Име: ${name}\nИмейл: ${email}\n\n${message}`,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json(
      { ok: false, error: "Изпращането не успя. Пишете ни директно на имейл." },
      { status: 502 }
    );
  }

  return NextResponse.json({ ok: true });
}
