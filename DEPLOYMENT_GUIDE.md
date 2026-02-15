# SignalFox Deployment Guide

## 🚀 Complete Production Setup

### Prerequisites
- [ ] Vercel account (Pro recommended)
- [ ] GitHub account
- [ ] Stripe account
- [ ] OpenAI account
- [ ] Apify account (optional)
- [ ] Resend account (optional)
- [ ] Supabase/PostgreSQL database

## Step 1: Deploy to Vercel

### Option A: Deploy from GitHub (Recommended)
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Enter: `https://github.com/yksanjo/signalfox`
4. Click "Import"
5. Configure:
   - **Project Name**: `signalfox` (or your preferred name)
   - **Framework**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
   - **Install Command**: `npm install`
6. Click "Deploy"

### Option B: Deploy from CLI
```bash
# Clone the repository
git clone https://github.com/yksanjo/signalfox.git
cd signalfox

# Install dependencies
npm install

# Deploy to Vercel
npx vercel --prod
```

## Step 2: Configure Environment Variables

In Vercel project settings → Environment Variables, add:

### Required Variables:
```env
# Database (choose one)
DATABASE_URL="postgresql://user:password@host:port/database"

# Next.js
NEXT_PUBLIC_APP_URL="https://your-domain.vercel.app"
NEXTAUTH_SECRET="your-secret-key-here" # Generate with: openssl rand -base64 32
NEXTAUTH_URL="https://your-domain.vercel.app"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_STARTER_PRICE_ID="price_..."
STRIPE_PRO_PRICE_ID="price_..."
STRIPE_TEAM_PRICE_ID="price_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Optional but recommended:
# Apify (for web scraping)
APIFY_API_KEY="apify_api_..."

# Resend (for emails)
RESEND_API_KEY="re_..."

# Slack (for notifications)
SLACK_WEBHOOK_URL="https://hooks.slack.com/services/..."
```

## Step 3: Database Setup

### Option A: Supabase (Free Tier - Recommended)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Go to Settings → Database
4. Copy connection string
5. Update `DATABASE_URL` in Vercel
6. Run database migrations:
```bash
npx prisma db push
```

### Option B: Railway (Free Credits)
1. Go to [railway.app](https://railway.app)
2. Create new PostgreSQL database
3. Copy connection string
4. Update `DATABASE_URL` in Vercel
5. Run migrations:
```bash
npx prisma db push
```

### Option C: Neon (PostgreSQL)
1. Go to [neon.tech](https://neon.tech)
2. Create new project
3. Copy connection string
4. Update `DATABASE_URL` in Vercel
5. Run migrations:
```bash
npx prisma db push
```

## Step 4: Stripe Setup

### 1. Create Stripe Account
1. Go to [stripe.com](https://stripe.com)
2. Create account or log in
3. Enable test mode first, then live mode

### 2. Get API Keys
1. Go to Developers → API Keys
2. Copy:
   - **Secret Key**: `sk_live_...`
   - **Publishable Key**: `pk_live_...`

### 3. Create Products & Prices
1. Go to Products → Add Product
2. Create 3 products:
   - **Starter** ($99/month)
   - **Pro** ($299/year)
   - **Team** ($499/month)
3. Copy Price IDs for each

### 4. Set Up Webhooks
1. Go to Developers → Webhooks
2. Add endpoint: `https://your-domain.vercel.app/api/webhooks/stripe`
3. Select events:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_failed`
4. Copy signing secret: `whsec_...`

## Step 5: OpenAI Setup

### 1. Create OpenAI Account
1. Go to [platform.openai.com](https://platform.openai.com)
2. Create account or log in
3. Go to API Keys

### 2. Get API Key
1. Click "Create new secret key"
2. Copy key: `sk-...`
3. Add to environment variables

## Step 6: Email Setup (Resend)

### 1. Create Resend Account
1. Go to [resend.com](https://resend.com)
2. Create account or log in
3. Go to API Keys

### 2. Get API Key
1. Click "Create API Key"
2. Copy key: `re_...`
3. Add to environment variables

### 3. Verify Domain (Optional but Recommended)
1. Go to Domains
2. Add your domain
3. Add DNS records as instructed
4. Wait for verification

## Step 7: Apify Setup (Optional)

### 1. Create Apify Account
1. Go to [apify.com](https://apify.com)
2. Create account or log in
3. Go to Settings → Integrations

### 2. Get API Key
1. Click "Create API token"
2. Copy key: `apify_api_...`
3. Add to environment variables

## Step 8: Custom Domain (Optional but Recommended)

### 1. Buy Domain
1. Go to [namecheap.com](https://namecheap.com) or similar
2. Buy domain: `signalfox.com` or similar

### 2. Configure in Vercel
1. Go to Vercel project → Domains
2. Add your domain
3. Follow DNS configuration instructions

## Step 9: Test Everything

### 1. Test Website
```bash
# Visit your deployed site
https://your-domain.vercel.app

# Test pages:
- Homepage: /
- Login: /login
- Dashboard: /dashboard
- Pricing: /pricing
```

### 2. Test API Endpoints
```bash
# Test signals API
curl https://your-domain.vercel.app/api/signals

# Test checkout API (with proper auth)
curl -X POST https://your-domain.vercel.app/api/checkout \
  -H "Content-Type: application/json" \
  -d '{"plan": "starter"}'
```

### 3. Test Stripe Webhook
1. Go to Stripe Dashboard → Developers → Webhooks
2. Send test webhook
3. Check Vercel logs for receipt

### 4. Test Database
```bash
# Run Prisma Studio to view data
npx prisma studio
```

## Step 10: Go Live Checklist

### Before Launch:
- [ ] All environment variables set
- [ ] Database migrated and working
- [ ] Stripe payments tested
- [ ] Email notifications working
- [ ] All pages load correctly
- [ ] Mobile responsive tested
- [ ] SEO meta tags set
- [ ] Analytics installed (Google Analytics, etc.)
- [ ] Error tracking set up (Sentry, etc.)
- [ ] Backup strategy in place

### Launch Day:
- [ ] Switch Stripe to live mode
- [ ] Update all API keys to production
- [ ] Test complete user flow
- [ ] Monitor error logs
- [ ] Celebrate! 🎉

## Troubleshooting

### Common Issues:

#### 1. Database Connection Failed
```bash
# Check connection
npx prisma db pull

# Reset database
npx prisma db push --force-reset

# Seed data
npx prisma db seed
```

#### 2. Stripe Webhook Not Working
1. Check webhook endpoint URL
2. Verify signing secret
3. Check Vercel logs
4. Test with Stripe CLI:
```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

#### 3. Emails Not Sending
1. Check Resend API key
2. Verify domain (if using custom domain)
3. Check spam folder
4. Test with Resend dashboard

#### 4. Build Errors on Vercel
1. Check build logs in Vercel
2. Verify all dependencies in package.json
3. Check TypeScript errors locally:
```bash
npm run build
```

#### 5. Authentication Issues
1. Check NEXTAUTH_SECRET is set
2. Verify NEXTAUTH_URL matches deployment
3. Clear browser cache
4. Check cookies are being set

## Monitoring & Maintenance

### Daily Checks:
- [ ] Error logs (Vercel, Stripe, etc.)
- [ ] New signups
- [ ] Payment failures
- [ ] Email delivery rates

### Weekly Tasks:
- [ ] Backup database
- [ ] Review analytics
- [ ] Check server costs
- [ ] Update dependencies

### Monthly Tasks:
- [ ] Security audit
- [ ] Performance review
- [ ] Feature planning
- [ ] Customer feedback review

## Scaling Tips

### When you reach 100 users:
1. Upgrade database plan
2. Implement caching (Redis)
3. Add CDN for static assets
4. Set up monitoring alerts

### When you reach 1,000 users:
1. Consider dedicated hosting
2. Implement load balancing
3. Add advanced analytics
4. Hire support staff

### When you reach 10,000 users:
1. Enterprise-grade infrastructure
2. 24/7 support
3. Advanced security features
4. Custom enterprise features

## Support Resources

### Documentation:
- [Next.js Docs](https://nextjs.org/docs)
- [Prisma Docs](https://www.prisma.io/docs)
- [Stripe Docs](https://stripe.com/docs)
- [Vercel Docs](https://vercel.com/docs)

### Community:
- [GitHub Issues](https://github.com/yksanjo/signalfox/issues)
- [Discord/Slack community]
- [Stack Overflow](https://stackoverflow.com)

### Paid Support:
- Email: support@signalfox.com
- Priority support for Pro/Team plans
- Custom development services

## Security Best Practices

### 1. API Keys
- Never commit API keys to GitHub
- Use environment variables
- Rotate keys regularly
- Use different keys for dev/prod

### 2. Database
- Regular backups
- Strong passwords
- IP whitelisting
- SSL connections only

### 3. Application
- HTTPS everywhere
- CSRF protection
- XSS protection
- Rate limiting
- Input validation

### 4. Compliance
- GDPR compliance
- Privacy policy
- Terms of service
- Data retention policy

## Revenue Optimization

### 1. Pricing Strategy
- A/B test pricing pages
- Offer annual discounts
- Add enterprise pricing
- Consider usage-based pricing

### 2. Conversion Optimization
- Improve landing page
- Add social proof
- Simplify signup flow
- Offer free trial

### 3. Retention
- Onboarding emails
- Regular product updates
- Customer success check-ins
- Proactive support

### 4. Expansion
- Add-ons and upgrades
- Team/enterprise features
- API access
- White labeling

## 🎉 Congratulations!

Your SignalFox application is now production-ready. You have:

✅ **Full SaaS Application** with authentication
✅ **Database** connected and migrated  
✅ **Payment Processing** with Stripe
✅ **Email Notifications** with Resend
✅ **AI Integration** with OpenAI
✅ **Deployment** on Vercel
✅ **Marketing Materials** ready
✅ **Documentation** complete

**Next Steps:**
1. Start marketing (use MARKETING_MATERIALS.md)
2. Get first 10 customers
3. Collect feedback
4. Iterate and improve

**Remember:** The original DataFox sold for $100M to Oracle. Your SignalFox is positioned to capture the same market with better technology at 1/10th the price.

**Good luck! 🚀**