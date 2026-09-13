import { NextResponse } from "next/server";
import { Resend } from "resend";

// Runs on the Node.js runtime (default for route handlers) — never in the browser,
// so secrets read here are never exposed to the client.
export const runtime = "nodejs";

const LIMITS = {
  name: 100,
  email: 200,
  phone: 40,
  goal: 100,
  message: 5000,
} as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phonePattern = /^[+\d][\d\s-]{7,}$/;

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  goal?: unknown;
  message?: unknown;
  company?: unknown; // honeypot — real users never see or fill this
};

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid request." },
      { status: 400 }
    );
  }

  // Honeypot: silently accept bot submissions without sending anything.
  if (asString(body.company)) {
    return NextResponse.json({ ok: true });
  }

  const name = asString(body.name);
  const email = asString(body.email);
  const phone = asString(body.phone);
  const goal = asString(body.goal);
  const message = asString(body.message);

  // Server-side validation (mirrors the client, but authoritative).
  const fieldErrors: Record<string, string> = {};
  if (name.length < 2 || name.length > LIMITS.name)
    fieldErrors.name = "Please enter your name.";
  if (!emailPattern.test(email) || email.length > LIMITS.email)
    fieldErrors.email = "Enter a valid email address.";
  if (phone && (!phonePattern.test(phone) || phone.length > LIMITS.phone))
    fieldErrors.phone = "Enter a valid phone number.";
  if (goal.length > LIMITS.goal) fieldErrors.goal = "Invalid selection.";
  if (message.length < 10 || message.length > LIMITS.message)
    fieldErrors.message = "Tell us a little more (at least 10 characters).";

  if (Object.keys(fieldErrors).length > 0) {
    return NextResponse.json(
      { ok: false, error: "Please check the form and try again.", fieldErrors },
      { status: 400 }
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const to = process.env.EMAIL_TO;

  if (!apiKey || !from || !to) {
    // Misconfiguration is our problem, not the visitor's — log it, stay generic.
    console.error(
      "Contact form is not configured: missing RESEND_API_KEY, EMAIL_FROM or EMAIL_TO."
    );
    return NextResponse.json(
      { ok: false, error: "The enquiry service is temporarily unavailable." },
      { status: 500 }
    );
  }

  const submittedAt = new Intl.DateTimeFormat("en-IN", {
    dateStyle: "full",
    timeStyle: "short",
    timeZone: "Asia/Kolkata",
  }).format(new Date());

  const lines = [
    ["Name", name],
    ["Email", email],
    ["Phone", phone || "—"],
    ["Interested in", goal || "—"],
    ["Message", message],
    ["Submitted", `${submittedAt} (IST)`],
  ] as const;

  const text = lines.map(([label, value]) => `${label}: ${value}`).join("\n");

  const html = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;color:#111">
      <h2 style="margin:0 0 16px;font-size:18px">New Website Enquiry — IronForge Fitness</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        ${lines
          .map(
            ([label, value]) => `
          <tr>
            <td style="padding:8px 12px;background:#f4f4f5;font-weight:bold;vertical-align:top;width:130px">${label}</td>
            <td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escapeHtml(
              value
            )}</td>
          </tr>`
          )
          .join("")}
      </table>
    </div>
  `;

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email, // replying to the email goes straight to the visitor
      subject: "New Website Enquiry — IronForge Fitness",
      text,
      html,
    });

    if (error) {
      console.error("Resend send error:", error);
      return NextResponse.json(
        { ok: false, error: "We couldn't send your enquiry. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending enquiry:", err);
    return NextResponse.json(
      { ok: false, error: "We couldn't send your enquiry. Please try again." },
      { status: 502 }
    );
  }
}
