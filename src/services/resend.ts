import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_KEY);

export async function sendEmail(from: string, to: string, subject: string, html: string) {
  return resend.emails.send({
    from,
    to,
    subject,
    html,
  });
}
