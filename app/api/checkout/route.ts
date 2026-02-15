import { NextResponse } from 'next/server'
import { stripe, PRICE_IDS, createCheckoutSession } from '@/lib/stripe'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { plan, customerId, userId, userEmail } = body
    
    if (!plan) {
      return new NextResponse('Plan is required', { status: 400 })
    }
    
    // Get price ID for the selected plan
    const priceId = PRICE_IDS[plan as keyof typeof PRICE_IDS]
    if (!priceId) {
      return new NextResponse('Invalid plan', { status: 400 })
    }
    
    // Create checkout session
    const session = await createCheckoutSession({
      customerId,
      priceId,
      successUrl: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
      cancelUrl: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
      metadata: {
        userId: userId || 'demo-user',
        plan,
        userEmail: userEmail || 'demo@signalfox.com',
      },
    })
    
    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Error creating checkout session:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}