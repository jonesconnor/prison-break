import { NextResponse } from "next/server"
import { EmailNotConfiguredError, sendContactEmail } from "@/lib/email"

const MAX_MESSAGE_LENGTH = 4000

function validatePayload(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    throw new Error("Invalid payload")
  }

  const { firstName, lastName, email, message } = payload as Record<string, unknown>

  const requiredString = (value: unknown, field: string) => {
    if (typeof value !== "string" || !value.trim()) {
      throw new Error(`${field} is required`)
    }
    return value.trim()
  }

  const first = requiredString(firstName, "First name")
  const last = requiredString(lastName, "Last name")
  const emailValue = requiredString(email, "Email")
  const messageValue = requiredString(message, "Message")

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    throw new Error("Please provide a valid email")
  }

  if (messageValue.length > MAX_MESSAGE_LENGTH) {
    throw new Error("Message is too long")
  }

  return {
    firstName: first,
    lastName: last,
    email: emailValue,
    message: messageValue,
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const payload = validatePayload(body)

    await sendContactEmail(payload)

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Contact form submission failed", error)

    if (error instanceof EmailNotConfiguredError) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 })
    }

    return NextResponse.json({ error: "Unable to send message" }, { status: 500 })
  }
}
