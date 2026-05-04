import { NextResponse } from "next/server";
import { Resend } from "resend";

const RESEND_KEY = process.env.RESEND_API_KEY;
const resend = RESEND_KEY ? new Resend(RESEND_KEY) : null;

interface ReceiptInvoice {
  id: string;
  service: string;
  date: string;
  amount: number;
}

export async function POST(req: Request) {
  try {
    const { email, name, total, invoices, paymentIntentId } = await req.json();

    if (!email || !total) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!resend) {
      console.warn("RESEND_API_KEY not set — skipping receipt email");
      return NextResponse.json({ success: true, skipped: true });
    }

    const invoiceRows = (invoices as ReceiptInvoice[])
      .map(
        (inv) => `
        <tr>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0">${inv.service}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;color:#6b7280">${inv.id} · ${inv.date}</td>
          <td style="padding:12px 16px;border-bottom:1px solid #f0f0f0;text-align:right;font-weight:600">$${inv.amount.toFixed(2)}</td>
        </tr>`
      )
      .join("");

    const html = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08)">

    <!-- Header -->
    <div style="background:linear-gradient(135deg,#1e40af,#3b82f6);padding:36px 40px">
      <div style="display:flex;align-items:center;gap:14px">
        <div style="width:44px;height:44px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-weight:700;font-size:20px;color:#fff">Q</div>
        <div>
          <div style="color:#fff;font-weight:700;font-size:17px">Quick Urgent Care</div>
          <div style="color:rgba(255,255,255,0.75);font-size:12px;letter-spacing:0.08em;text-transform:uppercase">Payment Receipt</div>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div style="padding:36px 40px">
      <p style="margin:0 0 6px;color:#374151;font-size:16px">Hi${name ? ` ${name}` : ""},</p>
      <p style="margin:0 0 28px;color:#6b7280;line-height:1.6">Your payment has been received. Thank you for trusting Quick Urgent Care.</p>

      <!-- Invoice table -->
      <table style="width:100%;border-collapse:collapse;border:1px solid #f0f0f0;border-radius:10px;overflow:hidden;margin-bottom:24px">
        <thead>
          <tr style="background:#f9fafb">
            <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;font-weight:600">Service</th>
            <th style="padding:12px 16px;text-align:left;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;font-weight:600">Invoice</th>
            <th style="padding:12px 16px;text-align:right;font-size:11px;text-transform:uppercase;letter-spacing:0.08em;color:#9ca3af;font-weight:600">Amount</th>
          </tr>
        </thead>
        <tbody>${invoiceRows}</tbody>
        <tfoot>
          <tr style="background:#eff6ff">
            <td colspan="2" style="padding:14px 16px;font-weight:700;color:#1e40af">Total paid</td>
            <td style="padding:14px 16px;text-align:right;font-weight:700;font-size:18px;color:#1e40af">$${(total as number).toFixed(2)}</td>
          </tr>
        </tfoot>
      </table>

      <!-- Reference -->
      ${paymentIntentId ? `<p style="margin:0 0 28px;font-size:12px;color:#9ca3af">Reference: ${paymentIntentId}</p>` : ""}

      <!-- Contact -->
      <div style="background:#f9fafb;border-radius:12px;padding:20px 24px">
        <p style="margin:0 0 4px;font-weight:600;color:#374151;font-size:14px">Questions about your bill?</p>
        <p style="margin:0;color:#6b7280;font-size:13px">
          Call us at <a href="tel:4052857222" style="color:#3b82f6;font-weight:600">405-285-7222</a> · Open daily 7am–8pm
        </p>
      </div>
    </div>

    <!-- Footer -->
    <div style="padding:20px 40px;border-top:1px solid #f0f0f0;text-align:center">
      <p style="margin:0;font-size:11px;color:#d1d5db">Quick Urgent Care · Moore &amp; Oklahoma City · quickurgentcareok.com</p>
    </div>
  </div>
</body>
</html>`;

    const { error } = await resend.emails.send({
      from: "Quick Urgent Care <receipts@quickurgentcareok.com>",
      to: email,
      subject: `Payment receipt — $${(total as number).toFixed(2)} | Quick Urgent Care`,
      html,
    });

    if (error) throw new Error(error.message);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Email error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
