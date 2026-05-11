import { NextResponse, type NextRequest } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

async function readPayload(req: NextRequest): Promise<ContactPayload> {
  const contentType = req.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return (await req.json()) as ContactPayload;
  }
  const form = await req.formData();
  return {
    name: form.get("name")?.toString(),
    email: form.get("email")?.toString(),
    subject: form.get("subject")?.toString(),
    message: form.get("message")?.toString(),
  };
}

export async function POST(req: NextRequest) {
  const data = await readPayload(req);

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ type: "contact", ...data, at: new Date().toISOString() }),
      });
    } catch (err) {
      console.error("contact webhook failed", err);
    }
  } else {
    console.log("[contact form]", data);
  }

  const accept = req.headers.get("accept") || "";
  if (accept.includes("application/json")) {
    return NextResponse.json({ ok: true });
  }
  return NextResponse.redirect(new URL("/thank-you", req.url), { status: 303 });
}
