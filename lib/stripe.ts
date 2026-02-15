import Stripe from 'stripe'

// Initialize Stripe with fallback for development
const stripeSecretKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy_key_for_build'

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-12-15.clover',
  typescript: true,
})

// Stripe price IDs for different plans
export const PRICE_IDS = {
  starter: process.env.STRIPE_STARTER_PRICE_ID || 'price_starter_monthly',
  pro: process.env.STRIPE_PRO_PRICE_ID || 'price_pro_yearly',
  team: process.env.STRIPE_TEAM_PRICE_ID || 'price_team_monthly',
}

// Create a checkout session
export async function createCheckoutSession({
  customerId,
  priceId,
  successUrl,
  cancelUrl,
  metadata = {},
}: {
  customerId?: string
  priceId: string
  successUrl: string
  cancelUrl: string
  metadata?: Record<string, string>
}) {
  try {
    // For development/demo, return a mock session
    if (stripeSecretKey === 'sk_test_dummy_key_for_build') {
      return {
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'https://signal-fox-sandy.vercel.app'}/dashboard?demo=true`,
        id: 'demo_session_' + Date.now(),
      } as any
    }

    const session = await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata,
      subscription_data: {
        metadata,
      },
    })

    return session
  } catch (error) {
    console.error('Error creating checkout session:', error)
    throw error
  }
}

// Create a customer portal session
export async function createCustomerPortalSession(customerId: string, returnUrl: string) {
  try {
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    })

    return session
  } catch (error) {
    console.error('Error creating portal session:', error)
    throw error
  }
}

// Get customer by ID
export async function getCustomer(customerId: string) {
  try {
    return await stripe.customers.retrieve(customerId)
  } catch (error) {
    console.error('Error getting customer:', error)
    throw error
  }
}

// Create a customer
export async function createCustomer(email: string, name?: string) {
  try {
    return await stripe.customers.create({
      email,
      name,
      metadata: {
        signup_date: new Date().toISOString(),
      },
    })
  } catch (error) {
    console.error('Error creating customer:', error)
    throw error
  }
}

// Get subscription by ID
export async function getSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.retrieve(subscriptionId)
  } catch (error) {
    console.error('Error getting subscription:', error)
    throw error
  }
}

// Cancel subscription
export async function cancelSubscription(subscriptionId: string) {
  try {
    return await stripe.subscriptions.cancel(subscriptionId)
  } catch (error) {
    console.error('Error canceling subscription:', error)
    throw error
  }
}

// Handle webhook events
export async function handleWebhookEvent(payload: string, signature: string, webhookSecret: string) {
  try {
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret)
    return event
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    throw error
  }
}