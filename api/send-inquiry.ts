/**
 * Vercel Serverless Function: /api/send-inquiry
 *
 * Receives form data from the InquiryForm component and sends:
 *   1. Admin notification email to hello@magdalenajohanna.com
 *   2. Confirmation email to the customer
 *   3. Logs the inquiry to Google Sheets (if configured)
 *
 * ── Setup ──
 * 1. Install nodemailer: `npm install nodemailer`
 * 2. Add Environment Variables in Vercel Dashboard:
 *    - SMTP_HOST    = smtpout.secureserver.net
 *    - SMTP_PORT    = 465
 *    - SMTP_USER    = hello@magdalenajohanna.com
 *    - SMTP_PASS    = <your email password>
 *    - SMTP_TO      = hello@magdalenajohanna.com
 *
 * 3. For Google Sheets logging (optional):
 *    - GOOGLE_SERVICE_ACCOUNT_EMAIL = your-service-account@project.iam.gserviceaccount.com
 *    - GOOGLE_SERVICE_ACCOUNT_KEY   = the full private key (with \n line breaks)
 *    - GOOGLE_SHEETS_ID             = your spreadsheet ID
 *    - Sheet must have a tab called "Anfragen"
 *    - Share the sheet with the service account email (Editor)
 */

import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import crypto from "crypto";

/* ── Google Sheets JWT helper (no external deps) ── */
async function getGoogleAccessToken(email: string, key: string): Promise<string> {
  const header = Buffer.from(JSON.stringify({ alg: "RS256", typ: "JWT" })).toString("base64url");
  const now = Math.floor(Date.now() / 1000);
  const claim = Buffer.from(JSON.stringify({
    iss: email,
    scope: "https://www.googleapis.com/auth/spreadsheets",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  })).toString("base64url");

  const signInput = `${header}.${claim}`;
  const sign = crypto.createSign("RSA-SHA256");
  sign.update(signInput);
  const signature = sign.sign(key, "base64url");

  const jwt = `${signInput}.${signature}`;

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${jwt}`,
  });

  const tokenData = await tokenRes.json();
  return tokenData.access_token;
}

async function appendToSheet(row: string[]) {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const rawKey = process.env.GOOGLE_SERVICE_ACCOUNT_KEY || "";
  const key = rawKey.replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEETS_ID || "1_7HMYEFIEV4OaQMtfmPvlAr1cUuSC540kHha7B7xMbc";

  if (!email || !key) return;

  const accessToken = await getGoogleAccessToken(email, key);

  const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/Anfragen!A:Z:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values: [row] }),
  });

  if (!res.ok) {
    const err = await res.text();
    console.error("[Sheets] append FAILED:", res.status, err);
    throw new Error(`Sheets append failed: ${res.status} ${err}`);
  }
}

/* ── Sanitize phone for WhatsApp (digits only, with country code) ── */
function toWhatsAppNumber(phone: string): string {
  // phone comes in as e.g. "+491761234567" — strip everything except digits
  return phone.replace(/[^0-9]/g, "");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // CORS headers (for local dev & preflight)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { variant, name, firstName, lastName, email, phone, subject, summary, lang, contactPref } = req.body;

  if (!name || !email || !summary) {
    return res.status(400).json({ error: "Missing required fields: name, email, summary" });
  }

  // Create SMTP transporter
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || "smtpout.secureserver.net",
    port: Number(process.env.SMTP_PORT) || 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  // Variant-specific emoji for subject
  const variantEmoji: Record<string, string> = {
    wedding: "\u{1F48D}",
    jga: "\u{1F389}",
    corporate: "\u{1F3E2}",
    hair: "\u2702\uFE0F",
    skincare: "\u{1F33F}",
    workshop: "\u{1F3A8}",
  };
  const emoji = variantEmoji[variant] || "\u{1F4E9}";

  // WhatsApp number (clean digits with country code)
  const waNumber = phone ? toWhatsAppNumber(phone) : "";

  // Build HTML email
  const htmlBody = `
    <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E0704;">
      <div style="background-color: #F2F2E4; padding: 24px 32px; border-radius: 12px 12px 0 0;">
        <h1 style="font-size: 20px; margin: 0; color: #1E0704;">${emoji} ${subject}</h1>
        <p style="font-size: 13px; color: #1E0704; opacity: 0.5; margin: 4px 0 0;">magdalenajohanna.com</p>
      </div>
      <div style="background-color: #FDFBF8; padding: 24px 32px; border: 1px solid #1E070410; border-top: none; border-radius: 0 0 12px 12px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #1E0704; opacity: 0.5; width: 120px; vertical-align: top;">Name</td>
            <td style="padding: 8px 0; color: #1E0704; font-weight: 600;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #1E0704; opacity: 0.5; vertical-align: top;">E-Mail</td>
            <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #D9A282; text-decoration: none;">${email}</a></td>
          </tr>
          ${phone ? `
          <tr>
            <td style="padding: 8px 0; color: #1E0704; opacity: 0.5; vertical-align: top;">${lang === "de" ? "Telefon" : "Phone"}</td>
            <td style="padding: 8px 0; color: #1E0704;"><a href="tel:${phone}" style="color: #D9A282; text-decoration: none;">${phone}</a></td>
          </tr>` : ""}
          ${contactPref ? `
          <tr>
            <td style="padding: 8px 0; color: #1E0704; opacity: 0.5; vertical-align: top;">Kontaktart</td>
            <td style="padding: 8px 0; color: #1E0704; font-weight: 600;">${contactPref === "phone" ? "📞 Telefonanruf" : contactPref === "whatsapp" ? "💬 WhatsApp" : "✉️ E-Mail"}</td>
          </tr>` : ""}
        </table>

        <hr style="border: none; border-top: 1px solid #1E070410; margin: 16px 0;" />

        <pre style="font-family: 'Montserrat', Arial, sans-serif; font-size: 13px; line-height: 1.7; color: #1E0704; opacity: 0.7; white-space: pre-wrap; margin: 0;">${summary}</pre>

        <hr style="border: none; border-top: 1px solid #1E070410; margin: 16px 0;" />

        <div style="display: flex; gap: 8px; margin-top: 12px;">
          <a href="mailto:${email}" style="display: inline-block; background: #1E0704; color: white; padding: 10px 20px; border-radius: 100px; text-decoration: none; font-size: 12px; letter-spacing: 0.5px;">Antworten</a>
          ${waNumber ? `<a href="https://wa.me/${waNumber}" style="display: inline-block; border: 1px solid #1E070420; color: #1E0704; padding: 10px 20px; border-radius: 100px; text-decoration: none; font-size: 12px; letter-spacing: 0.5px;">WhatsApp</a>` : ""}
        </div>
      </div>
    </div>
  `;

  try {
    // 1. Send admin notification
    await transporter.sendMail({
      from: `"Magdalena Johanna Website" <${process.env.SMTP_USER}>`,
      to: process.env.SMTP_TO || "hello@magdalenajohanna.com",
      replyTo: email,
      subject: `${emoji} ${subject} — ${name}`,
      text: summary,
      html: htmlBody,
    });

    // 2. Send confirmation email to customer
    const confirmSubject = lang === "de"
      ? "Danke für deine Anfrage bei Magdalena Johanna \u2661"
      : "Thank you for your inquiry at Magdalena Johanna \u2661";

    const greeting = firstName || name;

    const confirmHtml = `
      <div style="font-family: 'Montserrat', Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #1E0704;">
        <div style="background-color: #F2F2E4; padding: 24px 32px; border-radius: 12px 12px 0 0;">
          <h1 style="font-size: 20px; margin: 0; color: #1E0704;">${lang === "de" ? "Danke für deine Anfrage! \u2661" : "Thank you for your inquiry! \u2661"}</h1>
        </div>
        <div style="background-color: #FDFBF8; padding: 24px 32px; border: 1px solid #1E070410; border-top: none; border-radius: 0 0 12px 12px;">
          <p style="font-size: 14px; line-height: 1.7; color: #1E0704; opacity: 0.7;">
            ${lang === "de"
              ? `Liebe/r ${greeting},<br><br>vielen Dank für deine Anfrage! Ich habe deine Nachricht erhalten und melde mich so schnell wie möglich bei dir — in der Regel innerhalb von 24 Stunden.<br><br>Liebe Grüße,<br><strong>Magdalena Johanna</strong>`
              : `Dear ${greeting},<br><br>Thank you for your inquiry! I have received your message and will get back to you as soon as possible — usually within 24 hours.<br><br>Best regards,<br><strong>Magdalena Johanna</strong>`
            }
          </p>
          <hr style="border: none; border-top: 1px solid #1E070410; margin: 16px 0;" />
          <p style="font-size: 12px; color: #1E0704; opacity: 0.4;">
            ${lang === "de" ? "Deine Anfrage:" : "Your inquiry:"}<br>
          </p>
          <pre style="font-family: 'Montserrat', Arial, sans-serif; font-size: 12px; line-height: 1.6; color: #1E0704; opacity: 0.5; white-space: pre-wrap; margin: 8px 0 0;">${summary}</pre>
        </div>
      </div>
    `;

    await transporter.sendMail({
      from: `"Magdalena Johanna" <${process.env.SMTP_USER}>`,
      to: email,
      subject: confirmSubject,
      text: lang === "de"
        ? `Liebe/r ${greeting},\n\nVielen Dank für deine Anfrage! Ich melde mich so schnell wie möglich bei dir.\n\nLiebe Grüße,\nMagdalena Johanna`
        : `Dear ${greeting},\n\nThank you for your inquiry! I'll get back to you as soon as possible.\n\nBest regards,\nMagdalena Johanna`,
      html: confirmHtml,
    });

    // 3. Log to Google Sheets (awaited — must complete before response)
    const timestamp = new Date().toISOString();
    const sheetRow = [
      timestamp,
      variant || "",
      name,
      email,
      phone || "",
      subject || "",
      summary.substring(0, 5000), // limit to avoid huge cells
      lang || "de",
      contactPref || "",
    ];
    try {
      await appendToSheet(sheetRow);
    } catch (sheetErr) {
      // Log but don't fail the whole request — emails were already sent
      console.error("[Sheets] logging failed, but emails sent OK:", sheetErr);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error("SMTP Error:", error);
    return res.status(500).json({ error: "Failed to send email", details: error.message });
  }
}