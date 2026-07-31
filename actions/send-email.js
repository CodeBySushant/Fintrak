"use server";

import { Resend } from "resend";

export async function sendEmail({ to, subject, react }) {
  const resend = new Resend(process.env.RESEND_API_KEY || "");

  // Resend's test sender (onboarding@resend.dev) only delivers to YOUR
  // own Resend account email. Once you verify a domain in Resend, set
  // EMAIL_FROM in .env (e.g. "Fintrak <alerts@yourdomain.com>") and real
  // users will start receiving emails — no code change needed.
  const from = process.env.EMAIL_FROM || "Fintrak <onboarding@resend.dev>";

  try {
    const data = await resend.emails.send({
      from,
      to,
      subject,
      react,
    });

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
