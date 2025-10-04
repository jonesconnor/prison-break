import Stripe from "stripe"

const stripeSecretKey = process.env.STRIPE_SECRET_KEY

export const stripe = stripeSecretKey
  ? new Stripe(stripeSecretKey, { apiVersion: "2025-08-27.basil" })
  : null

export async function getDonationTotalCents(startTimestamp?: number): Promise<number> {
  if (!stripe) {
    console.warn("STRIPE_SECRET_KEY is not configured; returning 0 for donations")
    return 0
  }

  const sumFromIntent = (intent: Stripe.PaymentIntent) => {
    if (intent.status !== "succeeded") return 0
    if (intent.metadata?.purpose !== "prison_break_donation") return 0
    return intent.amount_received ?? intent.amount ?? 0
  }

  const sumWithSearch = async () => {
    let total = 0
    let page: string | undefined

    const filters = [
      "status:'succeeded'",
      "metadata['purpose']:'prison_break_donation'",
    ]

    if (typeof startTimestamp === "number") {
      filters.push(`created>=${startTimestamp}`)
    }

    const query = filters.join(" AND ")

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
      const params: Stripe.PaymentIntentListParams = {
        limit: 100,
        starting_after: startingAfter,
      }

      if (typeof startTimestamp === "number") {
        params.created = { gte: startTimestamp }
      }

      const result = await stripe.paymentIntents.list(params)

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

export interface MonthlyMRRMetrics {
  totalCents: number
  activeSubscriptions: number
}

const INCLUDED_SUBSCRIPTION_STATUSES: Stripe.Subscription.Status[] = [
  "active",
  "trialing",
]

export async function getMonthlyMRR(): Promise<MonthlyMRRMetrics> {
  if (!stripe) {
    console.warn("STRIPE_SECRET_KEY is not configured; returning 0 for MRR")
    return { totalCents: 0, activeSubscriptions: 0 }
  }

  let totalCents = 0
  let activeSubscriptions = 0
  let startingAfter: string | undefined

  const calculateMonthlyAmount = (item: Stripe.SubscriptionItem): number => {
    const price = item.price
    const recurring = price.recurring
    if (!recurring) return 0

    const unitAmount = price.unit_amount ?? 0
    if (!unitAmount) return 0

    const interval = recurring.interval
    const intervalCount = recurring.interval_count ?? 1
    const quantity = item.quantity ?? 1

    const occurrencesPerYear = (() => {
      switch (interval) {
        case "day":
          return 365 / intervalCount
        case "week":
          return 52 / intervalCount
        case "month":
          return 12 / intervalCount
        case "year":
          return 1 / intervalCount
        default:
          return 0
      }
    })()

    if (!occurrencesPerYear) return 0

    const annualAmount = unitAmount * quantity * occurrencesPerYear
    return Math.round(annualAmount / 12)
  }

  do {
    const params: Stripe.SubscriptionListParams = {
      limit: 100,
      starting_after: startingAfter,
      status: "all",
      expand: ["data.items.data.price"],
    }

    const result = await stripe.subscriptions.list(params)

    for (const subscription of result.data) {
      if (!INCLUDED_SUBSCRIPTION_STATUSES.includes(subscription.status)) {
        continue
      }

      activeSubscriptions += 1

      for (const item of subscription.items.data) {
        totalCents += calculateMonthlyAmount(item)
      }
    }

    if (result.has_more) {
      startingAfter = result.data.at(-1)?.id
    } else {
      startingAfter = undefined
    }
  } while (startingAfter)

  return { totalCents, activeSubscriptions }
}
