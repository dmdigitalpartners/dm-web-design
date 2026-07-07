import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/validation/contact-schema";
import { siteConfig } from "@/lib/site-config";

// Simple in-memory rate limit: 5 requests / 10 min per IP. Resets on
// redeploy, which is fine for a marketing-site contact form.
const WINDOW_MS = 10 * 60 * 1000;
const LIMIT = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > LIMIT;
}

export async function POST(request: NextRequest) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0] ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Твърде много опити. Опитайте отново по-късно." },
      { status: 429 }
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
  const { error } = await resend.emails.send({
    from: "D&M Website <onboarding@resend.dev>",
    to: process.env.CONTACT_EMAIL ?? siteConfig.email,
    replyTo: email,
    subject: `Ново запитване от сайта — ${name}`,
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
