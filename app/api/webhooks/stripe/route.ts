import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import { stripe, handleStripeWebhook } from '@/lib/stripe'
import { prisma } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.text()
  const headersList = await headers()
  const signature = headersList.get('stripe-signature')

  if (!signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new NextResponse('Webhook signature missing', { status: 400 })
  }

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    )

    // Handle the event
    await handleStripeWebhook(event)

    // Update database based on event type
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const userId = session.metadata?.userId
        
        if (userId) {
          await prisma.subscription.create({
            data: {
              userId,
              plan: 'pro', // Default to pro for now
              status: 'active',
              currentPeriodEnd: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000), // 1 year from now
              stripeSubscriptionId: session.subscription as string,
            },
          })
        }
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: subscription.status,
            currentPeriodEnd: new Date(subscription.current_period_end * 1000),
          },
        })
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        await prisma.subscription.update({
          where: { stripeSubscriptionId: subscription.id },
          data: {
            status: 'canceled',
          },
        })
        break
      }
    }

    return new NextResponse(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (err) {
    console.error('Webhook error:', err)
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 })
  }
}