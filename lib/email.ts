import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  console.warn('RESEND_API_KEY not set - email notifications disabled')
}

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null

export async function sendSignalNotification(email: string, signal: any) {
  if (!resend) {
    console.log('Email notification (mock):', { email, signal })
    return
  }

  const signalTypeEmoji = {
    funding: '💰',
    hiring: '👔',
    expansion: '🌍',
    news: '📰',
  }[signal.type] || '🔔'

  try {
    await resend.emails.send({
      from: 'DataFox <alerts@datafox.app>',
      to: email,
      subject: `${signalTypeEmoji} New Signal: ${signal.company.name} - ${signal.title}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">DataFox Signal Alert</h1>
            <p style="margin: 8px 0 0; opacity: 0.9;">Intelligence for B2B Sales</p>
          </div>
          
          <div style="padding: 32px; background: white;">
            <div style="display: flex; align-items: center; margin-bottom: 24px;">
              <div style="background: #f3f4f6; border-radius: 8px; padding: 12px; margin-right: 16px;">
                <span style="font-size: 24px;">${signalTypeEmoji}</span>
              </div>
              <div>
                <h2 style="margin: 0 0 4px; font-size: 20px; color: #111827;">${signal.title}</h2>
                <p style="margin: 0; color: #6b7280;">${signal.company.name}</p>
              </div>
            </div>
            
            <div style="background: #f9fafb; border-radius: 8px; padding: 20px; margin-bottom: 24px;">
              <p style="margin: 0; color: #374151;">${signal.description}</p>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 32px;">
              <div style="background: #f0f9ff; border-radius: 6px; padding: 12px;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #0369a1;">TYPE</p>
                <p style="margin: 0; font-weight: 600; color: #0c4a6e;">${signal.type.toUpperCase()}</p>
              </div>
              <div style="background: #f0f9ff; border-radius: 6px; padding: 12px;">
                <p style="margin: 0 0 4px; font-size: 12px; color: #0369a1;">SOURCE</p>
                <p style="margin: 0; font-weight: 600; color: #0c4a6e;">${signal.source.toUpperCase()}</p>
              </div>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.APP_URL}/dashboard" style="background: #4f46e5; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600;">
                View in Dashboard
              </a>
              <p style="margin: 16px 0 0; color: #6b7280; font-size: 14px;">
                This signal was detected by DataFox's AI monitoring system.
              </p>
            </div>
          </div>
          
          <div style="padding: 24px; background: #f9fafb; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0 0 8px;">You received this email because you're tracking ${signal.company.name} on DataFox.</p>
            <p style="margin: 0;">
              <a href="${process.env.APP_URL}/settings/notifications" style="color: #4f46e5;">Manage notifications</a> | 
              <a href="${process.env.APP_URL}/unsubscribe" style="color: #4f46e5;">Unsubscribe</a>
            </p>
            <p style="margin: 16px 0 0; font-size: 12px;">© ${new Date().getFullYear()} DataFox. All rights reserved.</p>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending email:', error)
  }
}

export async function sendWelcomeEmail(email: string, name?: string) {
  if (!resend) {
    console.log('Welcome email (mock):', { email, name })
    return
  }

  try {
    await resend.emails.send({
      from: 'DataFox <welcome@datafox.app>',
      to: email,
      subject: 'Welcome to DataFox! Start tracking sales signals',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 32px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">Welcome to DataFox! 🎉</h1>
            <p style="margin: 8px 0 0; opacity: 0.9;">Your sales intelligence platform</p>
          </div>
          
          <div style="padding: 32px; background: white;">
            <h2 style="margin: 0 0 16px; color: #111827;">Hi ${name || 'there'},</h2>
            <p style="margin: 0 0 24px; color: #374151; line-height: 1.6;">
              Welcome to DataFox! You're now ready to start tracking sales signals from companies you want to sell to.
            </p>
            
            <div style="background: #f0f9ff; border-radius: 8px; padding: 24px; margin-bottom: 24px;">
              <h3 style="margin: 0 0 16px; color: #0c4a6e;">Next Steps:</h3>
              <ol style="margin: 0; padding-left: 20px; color: #374151;">
                <li style="margin-bottom: 8px;"><strong>Add companies to track</strong> - Start with 5-10 target accounts</li>
                <li style="margin-bottom: 8px;"><strong>Set up notifications</strong> - Choose email or Slack alerts</li>
                <li style="margin-bottom: 8px;"><strong>Watch for signals</strong> - We'll alert you about funding, hiring, expansion</li>
                <li><strong>Close more deals</strong> - Reach out at the perfect time</li>
              </ol>
            </div>
            
            <div style="text-align: center;">
              <a href="${process.env.APP_URL}/dashboard" style="background: #4f46e5; color: white; padding: 12px 32px; border-radius: 6px; text-decoration: none; display: inline-block; font-weight: 600; margin-bottom: 16px;">
                Go to Dashboard
              </a>
              <p style="margin: 0; color: #6b7280; font-size: 14px;">
                Need help? Check out our <a href="${process.env.APP_URL}/guide" style="color: #4f46e5;">getting started guide</a>
              </p>
            </div>
          </div>
          
          <div style="padding: 24px; background: #f9fafb; text-align: center; color: #6b7280; font-size: 14px;">
            <p style="margin: 0;">You're receiving this email because you signed up for DataFox.</p>
            <p style="margin: 16px 0 0; font-size: 12px;">© ${new Date().getFullYear()} DataFox. All rights reserved.</p>
          </div>
        </div>
      `,
    })
  } catch (error) {
    console.error('Error sending welcome email:', error)
  }
}