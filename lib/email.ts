import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_123456789')

// Email templates
export const EMAIL_TEMPLATES = {
  welcome: {
    subject: 'Welcome to SignalFox! 🎉',
    from: 'SignalFox <welcome@signalfox.com>',
  },
  signalAlert: {
    subject: 'New Signal Alert: {company}',
    from: 'SignalFox <alerts@signalfox.com>',
  },
  weeklyDigest: {
    subject: 'Your Weekly SignalFox Digest',
    from: 'SignalFox <digest@signalfox.com>',
  },
  trialEnding: {
    subject: 'Your SignalFox Trial is Ending Soon',
    from: 'SignalFox <trial@signalfox.com>',
  },
  paymentFailed: {
    subject: 'Payment Failed - Update Your Payment Method',
    from: 'SignalFox <billing@signalfox.com>',
  },
}

// Send welcome email
export async function sendWelcomeEmail(to: string, name?: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_TEMPLATES.welcome.from,
      to,
      subject: EMAIL_TEMPLATES.welcome.subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #0057FF; margin-bottom: 10px;">Welcome to SignalFox! 🎉</h1>
            <p style="color: #666; font-size: 16px;">AI-powered sales intelligence for modern teams</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <h2 style="color: #333; margin-top: 0;">Hi ${name || 'there'},</h2>
            <p style="color: #555; line-height: 1.6;">
              Thank you for joining SignalFox! You're now part of a growing community of sales teams 
              who use AI to track company signals and close more deals.
            </p>
          </div>
          
          <div style="margin-bottom: 30px;">
            <h3 style="color: #333; margin-bottom: 15px;">🚀 Get Started in 3 Steps:</h3>
            <div style="display: flex; flex-direction: column; gap: 15px;">
              <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="background-color: #0057FF; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">1</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333;">Add Companies to Track</h4>
                  <p style="margin: 0; color: #666;">Start by adding companies you want to monitor for signals.</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="background-color: #0057FF; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">2</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333;">Set Up Notifications</h4>
                  <p style="margin: 0; color: #666;">Choose how you want to receive signal alerts (email, Slack, etc.).</p>
                </div>
              </div>
              
              <div style="display: flex; align-items: flex-start; gap: 15px;">
                <div style="background-color: #0057FF; color: white; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; flex-shrink: 0;">3</div>
                <div>
                  <h4 style="margin: 0 0 5px 0; color: #333;">Explore Your Dashboard</h4>
                  <p style="margin: 0; color: #666;">View all your signals in one place with AI-powered insights.</p>
                </div>
              </div>
            </div>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://signal-fox-sandy.vercel.app'}/dashboard" style="background-color: #0057FF; color: white; padding: 14px 32px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; font-size: 16px;">
              Go to Dashboard →
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 14px; margin-bottom: 5px;">
              Need help? Check out our <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://signal-fox-sandy.vercel.app'}/help" style="color: #0057FF;">help center</a> or reply to this email.
            </p>
            <p style="color: #999; font-size: 12px;">
              SignalFox · 123 Sales Street · San Francisco, CA 94107
            </p>
          </div>
        </div>
      `,
    })
    
    if (error) {
      console.error('Error sending welcome email:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error sending welcome email:', error)
    return false
  }
}

// Send signal alert email
export async function sendSignalAlertEmail(to: string, signal: any) {
  try {
    const { data, error } = await resend.emails.send({
      from: EMAIL_TEMPLATES.signalAlert.from,
      to,
      subject: EMAIL_TEMPLATES.signalAlert.subject.replace('{company}', signal.company.name),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 25px;">
            <h1 style="color: #0057FF; margin-bottom: 5px;">🚨 New Signal Alert</h1>
            <p style="color: #666; font-size: 16px;">${signal.company.name} - ${signal.type.toUpperCase()}</p>
          </div>
          
          <div style="background-color: #f8f9fa; border-radius: 8px; padding: 25px; margin-bottom: 25px;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
              <div>
                <span style="background-color: ${
                  signal.type === 'funding' ? '#10b981' : 
                  signal.type === 'hiring' ? '#8b5cf6' : 
                  '#f59e0b'
                }; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase;">
                  ${signal.type}
                </span>
                <span style="margin-left: 10px; color: #666; font-size: 14px;">${signal.source}</span>
              </div>
              <div style="color: #999; font-size: 14px;">
                ${new Date(signal.createdAt).toLocaleDateString()}
              </div>
            </div>
            
            <h2 style="color: #333; margin-top: 0; margin-bottom: 10px;">${signal.title}</h2>
            <p style="color: #555; line-height: 1.6; margin-bottom: 20px;">${signal.description}</p>
            
            <div style="background-color: white; border-radius: 6px; padding: 15px; border-left: 4px solid #0057FF;">
              <h3 style="margin: 0 0 10px 0; color: #333; font-size: 16px;">📊 Company Details</h3>
              <p style="margin: 0; color: #666;">
                <strong>Company:</strong> ${signal.company.name}<br>
                <strong>Domain:</strong> ${signal.company.domain}<br>
                ${signal.metadata?.amount ? `<strong>Amount:</strong> $${signal.metadata.amount.toLocaleString()}<br>` : ''}
                ${signal.metadata?.location ? `<strong>Location:</strong> ${signal.metadata.location}<br>` : ''}
              </p>
            </div>
          </div>
          
          <div style="margin-bottom: 25px;">
            <h3 style="color: #333; margin-bottom: 15px;">🎯 Why This Matters:</h3>
            <p style="color: #555; line-height: 1.6;">
              ${signal.type === 'funding' ? 'Companies that recently raised funding are often looking to spend on new tools and services to support their growth.' :
                signal.type === 'hiring' ? 'Hiring sprees indicate company growth and potential needs for new software, services, or partnerships.' :
                'Expansion into new markets or locations often requires new vendors, partners, and service providers.'}
            </p>
            <p style="color: #555; line-height: 1.6;">
              <strong>Recommended Action:</strong> Reach out to discuss how your solution can help with their ${signal.type === 'funding' ? 'growth initiatives' : signal.type === 'hiring' ? 'expansion needs' : 'new market entry'}.
            </p>
          </div>
          
          <div style="text-align: center; margin-bottom: 30px;">
            <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://signal-fox-sandy.vercel.app'}/dashboard" style="background-color: #0057FF; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block; margin-right: 10px;">
              View in Dashboard
            </a>
            <a href="https://${signal.company.domain}" style="background-color: white; color: #0057FF; padding: 12px 24px; text-decoration: none; border-radius: 6px; border: 2px solid #0057FF; font-weight: bold; display: inline-block;">
              Visit Company Website
            </a>
          </div>
          
          <div style="border-top: 1px solid #eee; padding-top: 20px; text-align: center;">
            <p style="color: #999; font-size: 14px; margin-bottom: 5px;">
              To adjust your notification settings, visit your <a href="${process.env.NEXT_PUBLIC_APP_URL || 'https://signal-fox-sandy.vercel.app'}/settings/notifications" style="color: #0057FF;">notification preferences</a>.
            </p>
          </div>
        </div>
      `,
    })
    
    if (error) {
      console.error('Error sending signal alert email:', error)
      return false
    }
    
    return true
  } catch (error) {
    console.error('Error sending signal alert email:', error)
    return false
  }
}