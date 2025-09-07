"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SectionHeader } from "@/components/ui/section-header"
import { CoffeeIcon, BookIcon, LaptopIcon, GraduationCapIcon, CheckIcon } from "lucide-react"
import { PaymentForm } from "@/components/payment-form"

const donationTiers = [
  {
    name: "Coffee Fund",
    amount: 5,
    description: "Fuel our late-night application sessions",
    icon: CoffeeIcon,
    color: "text-chart-1",
  },
  {
    name: "Interview Prep",
    amount: 25,
    description: "Help us practice and prepare for interviews",
    icon: BookIcon,
    color: "text-chart-2",
  },
  {
    name: "Skills Upgrade",
    amount: 50,
    description: "Support our learning and certification goals",
    icon: LaptopIcon,
    color: "text-chart-3",
  },
  {
    name: "Career Coaching",
    amount: 100,
    description: "Professional guidance for our escape plan",
    icon: GraduationCapIcon,
    color: "text-chart-4",
  },
]

export function DonationSection() {
  const [showPayment, setShowPayment] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState<number>(0)
  const [customAmount, setCustomAmount] = useState("")
  const [showCustom, setShowCustom] = useState(false)
  const [paymentSuccess, setPaymentSuccess] = useState(false)

  const handleTierSelect = (amount: number) => {
    setSelectedAmount(amount)
    setShowPayment(true)
  }

  const handleCustomDonate = () => {
    const amount = parseFloat(customAmount)
    if (amount >= 0.5) {
      setSelectedAmount(amount)
      setShowPayment(true)
    }
  }

  const handlePaymentSuccess = () => {
    setShowPayment(false)
    setPaymentSuccess(true)
    setTimeout(() => {
      setPaymentSuccess(false)
      setShowCustom(false)
      setCustomAmount("")
    }, 3000)
  }

  const handlePaymentCancel = () => {
    setShowPayment(false)
  }

  if (paymentSuccess) {
    return (
      <section className="space-y-6">
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <CheckIcon className="h-16 w-16 text-primary mx-auto mb-4" />
            <SectionHeader>Thank You!</SectionHeader>
            <p className="text-muted-foreground">
              Your donation of ${selectedAmount} will help fund our escape plan. We appreciate your support!
            </p>
          </CardContent>
        </Card>
      </section>
    )
  }

  if (showPayment) {
    return (
      <section className="space-y-6">
        <Card className="bg-card border-border">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-foreground">Complete Your Donation</CardTitle>
            <p className="text-muted-foreground">
              Supporting our escape plan with ${selectedAmount}
            </p>
          </CardHeader>
          <CardContent>
            <PaymentForm 
              amount={selectedAmount}
              onSuccess={handlePaymentSuccess}
              onCancel={handlePaymentCancel}
            />
          </CardContent>
        </Card>
      </section>
    )
  }

  return (
    <section className="space-y-6">
        <SectionHeader>Fund Our Escape Plan</SectionHeader>
      <div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {donationTiers.map((tier) => (
              <Card key={tier.name} className="bg-muted border-border hover:shadow-md transition-shadow">
                <CardContent className="p-6 text-center space-y-4">
                  <tier.icon className={`h-8 w-8 mx-auto ${tier.color}`} />
                  <div>
                    <h3 className="font-semibold text-foreground">{tier.name}</h3>
                    <p className="text-2xl font-bold text-primary">${tier.amount}</p>
                  </div>
                  <p className="text-sm text-muted-foreground text-balance">{tier.description}</p>
                  <Button 
                    variant="outline"
                    onClick={() => handleTierSelect(tier.amount)}
                  >
                    Support ${tier.amount}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            {!showCustom ? (
              <Button
                size="lg"
                variant="outline"
                className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                onClick={() => setShowCustom(true)}
              >
                Custom Amount
              </Button>
            ) : (
              <div className="max-w-sm mx-auto space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="custom-amount">Custom Amount ($)</Label>
                  <Input
                    id="custom-amount"
                    type="number"
                    min="0.5"
                    step="0.01"
                    value={customAmount}
                    onChange={(e) => setCustomAmount(e.target.value)}
                    placeholder="Enter amount"
                  />
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowCustom(false)}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleCustomDonate}
                    disabled={!customAmount || parseFloat(customAmount) < 0.5}
                    className="flex-1 bg-primary hover:bg-primary/90"
                  >
                    Donate ${customAmount || "0"}
                  </Button>
                </div>
              </div>
            )}
          </div>
      </div>
    </section>
  )
}
