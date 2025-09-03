"use client"

import React, { useState } from 'react'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { LoaderIcon } from 'lucide-react'
import getStripe from '@/lib/stripe'

const cardElementOptions = {
  style: {
    base: {
      fontSize: '16px',
      color: '#424770',
      '::placeholder': {
        color: '#aab7c4',
      },
    },
    invalid: {
      color: '#9e2146',
    },
  },
}

interface CheckoutFormProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

function CheckoutForm({ amount, onSuccess, onCancel }: CheckoutFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string>('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsProcessing(true)
    setError('')

    try {
      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      })

      const { clientSecret, error: apiError } = await response.json()

      if (apiError) {
        setError(apiError)
        setIsProcessing(false)
        return
      }

      // Confirm payment
      const cardElement = elements.getElement(CardElement)
      if (!cardElement) {
        setError('Card element not found')
        setIsProcessing(false)
        return
      }

      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: cardElement,
            billing_details: {
              email: email,
            },
          },
        }
      )

      if (stripeError) {
        setError(stripeError.message || 'Payment failed')
        setIsProcessing(false)
      } else if (paymentIntent?.status === 'succeeded') {
        onSuccess()
      }
    } catch {
      setError('Something went wrong. Please try again.')
      setIsProcessing(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
        />
      </div>

      <div className="space-y-2">
        <Label>Card Information</Label>
        <div className="border rounded-md p-3 bg-background">
          <CardElement options={cardElementOptions} />
        </div>
      </div>

      {error && (
        <div className="text-destructive text-sm">{error}</div>
      )}

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isProcessing}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!stripe || isProcessing}
          className="flex-1 bg-primary hover:bg-primary/90"
        >
          {isProcessing ? (
            <>
              <LoaderIcon className="h-4 w-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Donate $${amount}`
          )}
        </Button>
      </div>
    </form>
  )
}

interface PaymentFormProps {
  amount: number
  onSuccess: () => void
  onCancel: () => void
}

export function PaymentForm({ amount, onSuccess, onCancel }: PaymentFormProps) {
  const stripePromise = getStripe()

  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm amount={amount} onSuccess={onSuccess} onCancel={onCancel} />
    </Elements>
  )
}