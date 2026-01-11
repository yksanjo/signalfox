// Simplified Stripe client for demo
// In production, use the real Stripe SDK

export const PRICE_IDS = {
  starter_monthly: 'price_starter_monthly',
  pro_yearly: 'price_pro_yearly',
  team_monthly: 'price_team_monthly',
}

// Mock functions for demo
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
  console.log('Mock checkout session created for:', customerEmail)
  
  return {
    id: 'mock_session_' + Date.now(),
    url: successUrl + '?session_id=mock&success=true',
  }
}

export async function handleStripeWebhook(event: any) {
  console.log('Mock webhook handled:', event.type)
  return { processed: true }
}