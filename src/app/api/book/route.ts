import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const bodySchema = z.object({
  location: z.string().min(1).max(50),
  service: z.string().min(1).max(100),
  preferred_date: z.string().min(1).max(20),
  preferred_time: z.string().min(1).max(20),
  provider: z.string().min(1).max(100),
  full_name: z.string().min(1).max(100),
  phone: z.string().min(7).max(30),
  email: z.string().email().max(255),
  reason: z.string().max(1000).optional().default(""),
  insurance: z.string().max(100).optional().default(""),
  date_of_birth: z.string().max(20).optional().default(""),
});

export async function POST(req: NextRequest) {
  let payload: z.infer<typeof bodySchema>;
  try {
    const json = await req.json();
    payload = bodySchema.parse(json);
  } catch (err) {
    return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
  }

  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM = process.env.BOOKING_FROM_EMAIL || "bookings@quickurgentcareok.com";
  const TO = process.env.BOOKING_TO_EMAIL || "iftikharsandhu1@gmail.com";

  const html = `
    <h2>New booking request</h2>
    <p><strong>Location:</strong> ${escape(payload.location)}</p>
    <p><strong>Service:</strong> ${escape(payload.service)}</p>
    <p><strong>Preferred:</strong> ${escape(payload.preferred_date)} at ${escape(payload.preferred_time)}</p>
    <p><strong>Provider:</strong> ${escape(payload.provider)}</p>
    <hr/>
    <p><strong>Name:</strong> ${escape(payload.full_name)}</p>
    <p><strong>DOB:</strong> ${escape(payload.date_of_birth)}</p>
    <p><strong>Phone:</strong> ${escape(payload.phone)}</p>
    <p><strong>Email:</strong> ${escape(payload.email)}</p>
    <p><strong>Insurance:</strong> ${escape(payload.insurance)}</p>
    <p><strong>Reason:</strong> ${escape(payload.reason)}</p>
  `;

  if (!RESEND_API_KEY) {
    console.log("[booking] (no RESEND_API_KEY — logged only)", payload);
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [TO],
        reply_to: payload.email,
        subject: `New booking — ${payload.full_name} · ${payload.location} · ${payload.preferred_date}`,
        html,
      }),
    });
    if (!res.ok) {
      const text = await res.text();
      console.error("[booking] Resend error", res.status, text);
      return NextResponse.json({ ok: false, error: "Email failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, mode: "emailed" });
  } catch (err) {
    console.error("[booking] fetch failed", err);
    return NextResponse.json({ ok: false, error: "Network error" }, { status: 502 });
  }
}

function escape(s: string) {
  return String(s ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}
