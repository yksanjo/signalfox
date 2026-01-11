# Deployment Guide

## Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/datafox)

### Environment Variables for Vercel

Add these environment variables in your Vercel project settings:

```
# Database (use Supabase or Railway)
DATABASE_URL="postgresql://..."

# Next.js
NEXTAUTH_SECRET="generate-with: openssl rand -base64 32"
NEXTAUTH_URL="https://your-app.vercel.app"

# Stripe
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_live_..."

# OpenAI
OPENAI_API_KEY="sk-..."

# Apify
APIFY_API_KEY="apify_api_..."

# Email (Resend)
RESEND_API_KEY="re_..."

# App URLs
APP_URL="https://your-app.vercel.app"
```

## Database Setup

### Option 1: Supabase (Recommended)
1. Go to [supabase.com](https://supabase.com) and create a new project
2. Get the connection string from Settings > Database
3. Run the SQL from `prisma/schema.prisma` in the SQL editor

### Option 2: Railway
1. Go to [railway.app](https://railway.app) and create a new PostgreSQL service
2. Get the connection string from the service variables
3. Run: `npx prisma db push`

## Stripe Setup

1. Create a Stripe account at [stripe.com](https://stripe.com)
2. Go to Developers > API keys to get your keys
3. Create products and prices for your plans:
   - Starter: $99/month
   - Pro: $299/year  
   - Team: $499/month
4. Set up webhooks:
   - Endpoint: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events to listen for:
     - `checkout.session.completed`
     - `customer.subscription.updated`
     - `customer.subscription.deleted`

## Scraping Setup

### Apify Setup
1. Sign up at [apify.com](https://apify.com)
2. Get your API key from Settings > Integrations
3. Set up actors for:
   - Crunchbase scraping
   - LinkedIn company updates
   - Press release monitoring

### Running Scrapers
Set up a cron job to run scraping every hour:

```bash
# Using GitHub Actions
# Create .github/workflows/scrape.yml

# Using Railway cron
# Add a cron job in railway.json

# Manual run
npm run scrape
```

## Email Notifications

### Resend Setup
1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get your API key
4. Update email templates in `lib/email.ts`

## Monitoring

### Logging
- Use Vercel Analytics for frontend
- Use Logtail or Datadog for backend logs

### Error Tracking
- Sentry for error monitoring
- Statuspage for uptime monitoring

## Scaling Considerations

### Database
- Add indexes for frequently queried fields
- Set up connection pooling
- Consider read replicas for heavy read loads

### Caching
- Use Redis for caching frequent queries
- Implement CDN for static assets

### Rate Limiting
- Implement rate limiting for API endpoints
- Use Upstash Redis for distributed rate limiting

## Security

### Environment Variables
- Never commit `.env` files
- Use Vercel Environment Variables or similar
- Rotate API keys regularly

### API Security
- Implement CORS properly
- Use API keys for external APIs
- Validate all user input

### Data Protection
- Encrypt sensitive user data
- Implement data retention policies
- Regular security audits

## Backup Strategy

### Database Backups
- Daily automated backups
- Point-in-time recovery
- Test restore procedures regularly

### File Storage
- Use S3-compatible storage for uploads
- Implement versioning
- Regular backup verification

## Cost Optimization

### Monthly Costs Estimate
- Vercel: $20-100/month (depending on traffic)
- Supabase: $25-100/month (depending on usage)
- Stripe: 2.9% + $0.30 per transaction
- OpenAI: $10-50/month (depending on usage)
- Apify: $49/month (basic plan)
- Resend: $20/month (10,000 emails)

### Cost Saving Tips
- Use edge functions for compute-heavy tasks
- Implement caching to reduce API calls
- Monitor and optimize database queries
- Use CDN for static assets