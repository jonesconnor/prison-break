import { Resend } from "resend"

const resendApiKey = process.env.RESEND_API_KEY
const contactRecipient = process.env.CONTACT_RECIPIENT_EMAIL
const contactFrom = process.env.CONTACT_FROM_EMAIL || "Team Prison Break <hello@prisonbreakwednesdays.com>"

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

export class EmailNotConfiguredError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "EmailNotConfiguredError"
  }
}

export async function sendContactEmail({
  firstName,
  lastName,
  email,
  message,
}: {
  firstName: string
  lastName: string
  email: string
  message: string
}) {
  if (!resendApiKey) {
    throw new EmailNotConfiguredError("RESEND_API_KEY is not set")
  }

  if (!contactRecipient) {
    throw new EmailNotConfiguredError("CONTACT_RECIPIENT_EMAIL is not set")
  }

  const resend = new Resend(resendApiKey)

  const html = `
    <div>
      <p>New contact form submission from <strong>${escapeHtml(firstName)} ${escapeHtml(lastName)}</strong>.</p>
      <p><strong>Email:</strong> ${escapeHtml(email)}</p>
      <p><strong>Message:</strong></p>
      <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
    </div>
  `

  return resend.emails.send({
    from: contactFrom,
    to: [contactRecipient],
    subject: `New message from ${firstName} ${lastName}`,
    replyTo: email,
    text: `New contact form submission from ${firstName} ${lastName} (${email}).\n\n${message}`,
    html,
  })
}
