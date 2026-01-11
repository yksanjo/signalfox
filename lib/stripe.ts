import Stripe from 'stripe'

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is not set')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
  typescript: true,
})

// Price IDs for different plans
export const PRICE_IDS = {
  starter_monthly: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter_monthly',
  pro_yearly: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_yearly',
  team_monthly: process.env.STRIPE_TEAM_PRICE_ID || 'price_team_monthly',
}

// Create a checkout session
export async function createCheckoutSession({
  priceId,
  customerEmail,
  userId,
  successUrl,
  cancelUrl,
}: {
  priceId: string
  customerEmail: string
  userId: string
  successUrl: string
  cancelUrl: string
}) {
  const session = await stripe.checkout.sessions.create({
    customer_email: customerEmail,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: successUrl,
    cancel_url: cancelUrl,
    metadata: {
      userId,
    },
  })

  return session
}

// Handle webhook events
export async function handleStripeWebhook(event: Stripe.Event) {
  switch (event.type) {
    case 'checkout.session.completed':
      const session = event.data.object as Stripe.Checkout.Session
      // Update user subscription in database
      console.log('Checkout session completed:', session.id)
      break
    
    case 'customer.subscription.updated':
      const subscription = event.data.object as Stripe.Subscription
      // Update subscription status in database
      console.log('Subscription updated:', subscription.id)
      break
    
    case 'customer.subscription.deleted':
      const deletedSubscription = event.data.object as Stripe.Subscription
      // Mark subscription as canceled in database
      console.log('Subscription deleted:', deletedSubscription.id)
      break
  }
}