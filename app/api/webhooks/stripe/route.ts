import { NextResponse } from 'next/server'
import { stripe, handleWebhookEvent } from '@/lib/stripe'
import { prisma } from '@/lib/db'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY || 're_dummy_key_for_build'
const resend = new Resend(resendApiKey)

export async function POST(request: Request) {
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature') || ''
    
    // Verify webhook signature
    let event
    try {
      event = await handleWebhookEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      )
    } catch (error) {
      console.error('Webhook signature verification failed:', error)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as any
        const { userId, plan, userEmail } = session.metadata
        
        // Update user subscription in database
        if (userId && userId !== 'demo-user') {
          await prisma.subscription.upsert({
            where: { userId },
            update: {
              plan,
              status: 'active',
              stripeSubscriptionId: session.subscription,
              currentPeriodEnd: new Date(session.subscription_details.current_period_end * 1000),
            },
            create: {
              userId,
              user: {
                connect: { id: userId }
              },
              plan,
              status: 'active',
              stripeSubscriptionId: session.subscription,
              currentPeriodEnd: new Date(session.subscription_details.current_period_end * 1000),
            },
          })
          
          // Update user stripeId if not set
          await prisma.user.update({
            where: { id: userId },
            data: {
              stripeId: session.customer,
            },
          })
          
          // Send welcome email
          if (userEmail) {
            await resend.emails.send({
              from: 'SignalFox <welcome@signalfox.com>',
              to: userEmail,
              subject: 'Welcome to SignalFox!',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h1>Welcome to SignalFox! 🎉</h1>
                  <p>Thank you for subscribing to our ${plan} plan.</p>
                  <p>You now have access to:</p>
                  <ul>
                    <li>Real-time sales signals</li>
                    <li>AI-powered signal classification</li>
                    <li>Email notifications</li>
                    <li>Dashboard analytics</li>
                  </ul>
                  <p>Get started by:</p>
                  <ol>
                    <li>Adding companies to track</li>
                    <li>Setting up notification preferences</li>
                    <li>Exploring your dashboard</li>
                  </ol>
                  <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #0057FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a></p>
                  <p>Need help? Reply to this email or check our <a href="${process.env.NEXT_PUBLIC_APP_URL}/help">help center</a>.</p>
                  <p>Best,<br>The SignalFox Team</p>
                </div>
              `,
            })
          }
        }
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as any
        const subscriptionRecord = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        })
        
        if (subscriptionRecord) {
          await prisma.subscription.update({
            where: { id: subscriptionRecord.id },
            data: {
              status: subscription.status,
              currentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
          })
        }
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as any
        const subscriptionRecord = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: subscription.id },
        })
        
        if (subscriptionRecord) {
          await prisma.subscription.update({
            where: { id: subscriptionRecord.id },
            data: {
              status: 'canceled',
            },
          })
          
          // Send cancellation email
          const user = await prisma.user.findUnique({
            where: { id: subscriptionRecord.userId },
          })
          
          if (user?.email) {
            await resend.emails.send({
              from: 'SignalFox <support@signalfox.com>',
              to: user.email,
              subject: 'Your SignalFox subscription has been canceled',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h1>Sorry to see you go 😔</h1>
                  <p>Your SignalFox subscription has been canceled.</p>
                  <p>You'll continue to have access until the end of your billing period.</p>
                  <p>If this was a mistake or you'd like to reactivate, you can:</p>
                  <ol>
                    <li>Log in to your account</li>
                    <li>Go to Billing settings</li>
                    <li>Reactivate your subscription</li>
                  </ol>
                  <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" style="background-color: #0057FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Go to Dashboard</a></p>
                  <p>We'd love to hear your feedback on how we can improve. Reply to this email to share your thoughts.</p>
                  <p>Best,<br>The SignalFox Team</p>
                </div>
              `,
            })
          }
        }
        break
      }
      
      case 'invoice.payment_failed': {
        const invoice = event.data.object as any
        const subscriptionRecord = await prisma.subscription.findFirst({
          where: { stripeSubscriptionId: invoice.subscription },
        })
        
        if (subscriptionRecord) {
          await prisma.subscription.update({
            where: { id: subscriptionRecord.id },
            data: {
              status: 'past_due',
            },
          })
          
          // Send payment failed email
          const user = await prisma.user.findUnique({
            where: { id: subscriptionRecord.userId },
          })
          
          if (user?.email) {
            await resend.emails.send({
              from: 'SignalFox <billing@signalfox.com>',
              to: user.email,
              subject: 'Payment Failed - Update Your Payment Method',
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                  <h1>Payment Failed ❌</h1>
                  <p>We were unable to process your payment for SignalFox.</p>
                  <p>Please update your payment method to avoid service interruption.</p>
                  <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/billing" style="background-color: #0057FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block;">Update Payment Method</a></p>
                  <p>If you need help, reply to this email or check our <a href="${process.env.NEXT_PUBLIC_APP_URL}/help/billing">billing help center</a>.</p>
                  <p>Best,<br>The SignalFox Team</p>
                </div>
              `,
            })
          }
        }
        break
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 400 })
  }
}