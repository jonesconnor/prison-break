"use client"

import { SectionHeader } from "@/components/ui/section-header"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function Contact() {
  return (
    <section className="space-y-6">
      <SectionHeader>Say Hey</SectionHeader>
      
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left Column - Text */}
        <div className="space-y-4">
          <p className="text-muted-foreground leading-relaxed">
            Got an idea for a new project or just want to say hi? Send us an email and we&apos;ll reply within 24 hrs!
          </p>
          
          <p className="text-muted-foreground">
            If contact forms aren&apos;t your thing... send us an email at{" "}
            <a 
              href="mailto:hello@pisonbreakwednesdays.com" 
              className="text-primary hover:underline"
            >
              hello@pisonbreakwednesdays.com
            </a>
          </p>
        </div>

        {/* Right Column - Contact Form */}
        <div className="space-y-4">
          {/* Name Fields */}
          <div className="space-y-2">
            <Label htmlFor="firstName">Name *</Label>
            <div className="grid grid-cols-2 gap-2">
              <Input 
                id="firstName" 
                placeholder="First Name" 
                className="rounded-none border-[1.5px] border-primary bg-background text-foreground font-medium"
                required 
              />
              <Input 
                id="lastName" 
                placeholder="Last Name" 
                className="rounded-none border-[1.5px] border-primary bg-background text-foreground font-medium"
                required 
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
            />
          </div>

          {/* Send Button */}
          <div className="flex justify-start items-end">
           <Button>Send</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
