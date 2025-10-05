"use client"

import { useState } from "react"
import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Contact() {
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, lastName, email, message }),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data?.error || "Failed to send. Please try again.")
      }

      setSubmitted(true)
      setFirstName("")
      setLastName("")
      setEmail("")
      setMessage("")
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Something went wrong.")
      } else {
        setError("Something went wrong.")
      }
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section className="space-y-6">
      <SectionHeader>Say Hey</SectionHeader>
      
      <div className="space-y-8">
        {/* Left Column - Text */}
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Got an idea for a new project or just want to say hi? Send us an email and we&apos;ll reply within 24 hrs!
          </p>
        </div>

        {/* Right Column - Contact Form */}
        <form className="space-y-4" onSubmit={onSubmit} noValidate>
          {/* Name Fields */}
          <div className="space-y-2">
            <Label htmlFor="firstName">Name *</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                id="firstName" 
                placeholder="First Name" 
                className="rounded-none border-[1.5px] border-primary bg-background text-foreground font-medium"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={submitting}
              />
              <Input 
                id="lastName" 
                placeholder="Last Name" 
                className="rounded-none border-[1.5px] border-primary bg-background text-foreground font-medium"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={submitting}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input 
              id="email" 
              type="email" 
              placeholder="Email"
              className="rounded-none border-[1.5px] border-primary bg-background text-foreground font-medium"
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={submitting}
            />
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <Label htmlFor="message">Message *</Label>
            <textarea 
              id="message" 
              placeholder="Hello..."
              className="w-full px-3 py-2 border-[1.5px] border-primary rounded-none bg-background text-foreground font-medium min-h-[100px] resize-vertical"
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={submitting}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm">{error}</p>
          )}
          {submitted && !error && (
            <p className="text-green-700 text-sm">Thanks! Your message has been sent.</p>
          )}

          {/* Send Button */}
          <div className="flex justify-start items-end">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Sending…" : "Send"}
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}
