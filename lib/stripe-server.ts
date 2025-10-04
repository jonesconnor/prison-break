import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" })
  : null

export async function getMonthlyDonationTotalCents(): Promise<number> {
  if (!stripe) {
    console.warn("STRIPE_SECRET_KEY is not configured; returning 0 for monthly donations")
    return 0
  }

  const now = new Date()
  const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
  const startTimestamp = Math.floor(startOfMonth.getTime() / 1000)

  const sumFromIntent = (intent: Stripe.PaymentIntent) => {
    if (intent.status !== "succeeded") return 0
    if (intent.metadata?.purpose !== "prison_break_donation") return 0
    return intent.amount_received ?? intent.amount ?? 0
  }

  const sumWithSearch = async () => {
    let total = 0
    let page: string | undefined

    const query = `status:'succeeded' AND metadata['purpose']:'prison_break_donation' AND created>=${startTimestamp}`

    do {
      const result = await stripe.paymentIntents.search({
        query,
        limit: 100,
        page,
      })

      total += result.data.reduce((sum, intent) => sum + sumFromIntent(intent), 0)
      page = result.next_page ?? undefined
    } while (page)

    return total
  }

  const sumWithList = async () => {
    let total = 0
    let startingAfter: string | undefined

    do {
      const result = await stripe.paymentIntents.list({
        limit: 100,
        starting_after: startingAfter,
        created: { gte: startTimestamp },
      })

      total += result.data.reduce((sum, intent) => sum + sumFromIntent(intent), 0)
      startingAfter = result.data.at(-1)?.id
      if (!result.has_more) {
        startingAfter = undefined
      }
    } while (startingAfter)

    return total
  }

  try {
    return await sumWithSearch()
  } catch (error) {
    console.error("Stripe search API unavailable; falling back to list", error)
    return sumWithList()
  }
}
