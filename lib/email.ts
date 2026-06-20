import { Resend } from "resend";
import nodemailer from "nodemailer";

export const NOTIFY_EMAIL =
  process.env.NOTIFY_EMAIL || "prodeveloper032@gmail.com";

const FROM_EMAIL =
  process.env.EMAIL_FROM || "SoftPulse <onboarding@resend.dev>";

export type CourseApplicationEmailData = {
  name: string;
  email: string;
  phone?: string | null;
  message?: string | null;
  course_slug: string;
  course_title: string;
};

function buildEmailContent(data: CourseApplicationEmailData) {
  const submittedAt = new Date().toLocaleString("en-PK", {
    timeZone: "Asia/Karachi",
    dateStyle: "medium",
    timeStyle: "short",
  });

  const subject = `Course Application: ${data.course_title} — ${data.name}`;

  const html = `
    <div style="font-family: system-ui, sans-serif; max-width: 560px; margin: 0 auto; color: #0f172a;">
      <div style="background: linear-gradient(135deg, #1e40af, #2563eb); padding: 28px 32px; border-radius: 16px 16px 0 0;">
        <h1 style="margin: 0; color: #fff; font-size: 22px;">New Course Application</h1>
        <p style="margin: 8px 0 0; color: #bfdbfe; font-size: 14px;">SoftPulse — ${submittedAt}</p>
      </div>
      <div style="background: #f8fafc; padding: 28px 32px; border: 1px solid #e2e8f0; border-top: none; border-radius: 0 0 16px 16px;">
        <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
          <tr>
            <td style="padding: 10px 0; color: #64748b; width: 120px; vertical-align: top;">Course</td>
            <td style="padding: 10px 0; font-weight: 600;">${escapeHtml(data.course_title)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Name</td>
            <td style="padding: 10px 0;">${escapeHtml(data.name)}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Email</td>
            <td style="padding: 10px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color: #2563eb;">${escapeHtml(data.email)}</a></td>
          </tr>
          ${
            data.phone
              ? `<tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Phone</td>
            <td style="padding: 10px 0;">${escapeHtml(data.phone)}</td>
          </tr>`
              : ""
          }
          ${
            data.message
              ? `<tr>
            <td style="padding: 10px 0; color: #64748b; vertical-align: top;">Message</td>
            <td style="padding: 10px 0; white-space: pre-wrap;">${escapeHtml(data.message)}</td>
          </tr>`
              : ""
          }
        </table>
        <p style="margin: 24px 0 0; font-size: 13px; color: #64748b;">
          View all applications in the <a href="${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin" style="color: #2563eb;">SoftPulse admin panel</a>.
        </p>
      </div>
    </div>
  `;

  const text = [
    `New course application — ${submittedAt}`,
    `Course: ${data.course_title}`,
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : null,
    data.message ? `Message: ${data.message}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  return { subject, html, text };
}

async function sendViaResend(
  data: CourseApplicationEmailData,
  content: ReturnType<typeof buildEmailContent>
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: FROM_EMAIL,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: content.subject,
    html: content.html,
  });

  if (error) {
    console.error("Resend email error:", error);
    return { ok: false as const, error };
  }

  return { ok: true as const };
}

async function sendViaGmail(
  data: CourseApplicationEmailData,
  content: ReturnType<typeof buildEmailContent>
) {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });

  await transporter.sendMail({
    from: `SoftPulse <${user}>`,
    to: NOTIFY_EMAIL,
    replyTo: data.email,
    subject: content.subject,
    html: content.html,
    text: content.text,
  });

  return { ok: true as const };
}

export async function sendCourseApplicationEmail(
  data: CourseApplicationEmailData
) {
  const content = buildEmailContent(data);

  const resendResult = await sendViaResend(data, content);
  if (resendResult?.ok) return resendResult;

  try {
    const gmailResult = await sendViaGmail(data, content);
    if (gmailResult?.ok) return gmailResult;
  } catch (error) {
    console.error("Gmail email error:", error);
  }

  console.warn(
    "Email not sent — set RESEND_API_KEY or GMAIL_USER + GMAIL_APP_PASSWORD in .env"
  );
  return { ok: false, skipped: true as const };
}

function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
