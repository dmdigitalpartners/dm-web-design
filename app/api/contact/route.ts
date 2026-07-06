import { NextResponse } from "next/server";

// Full implementation (Zod validation, rate limiting, Resend email) lands in
// the booking/contact integration phase.
export async function POST() {
  return NextResponse.json({ ok: false, error: "Not implemented" }, { status: 501 });
}
