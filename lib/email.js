import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

if (!process.env.RESEND_API_KEY) {
  console.warn("RESEND_API_KEY is not set. Email sending will be disabled.");
}

export async function sendEmail({ to, subject, html }) {
  if (!resend) {
    console.warn("Email sending disabled due to missing RESEND_API_KEY");
    return { success: false, error: "Email service not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: "Homeopathy Clinic <no-reply@yourdomain.com>",
      to,
      subject,
      html,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
}
