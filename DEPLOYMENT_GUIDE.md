# SignalFox Deployment Guide

## 🚀 **Quick Deploy to Vercel**

### Option 1: Deploy via Vercel Dashboard
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click "Import Git Repository"
3. Enter: `https://github.com/yksanjo/signalfox`
4. Click "Import"
5. Configure:
   - **Project Name**: `signal-fox`
   - **Framework Preset**: Next.js
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`
6. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
cd signalfox
vercel --prod
```

## 🌐 **Live URLs**
- **GitHub Repository**: https://github.com/yksanjo/signalfox
- **Vercel Deployment**: https://datafox-6qeox1xhu-yoshi-kondos-projects.vercel.app
- **Custom Domain**: signal-fox.vercel.app (to be configured)

## 🔧 **Environment Variables**

Add these in Vercel project settings:

```env
# App URL
NEXT_PUBLIC_APP_URL=https://signal-fox.vercel.app

# Database (for production)
DATABASE_URL=postgresql://...

# Stripe (test mode)
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...

# OpenAI
OPENAI_API_KEY=sk-...

# Apify
APIFY_API_KEY=apify_api_...

# Email (Resend)
RESEND_API_KEY=re_...
```

## 🗄️ **Database Setup**

### Option A: Supabase (Free Tier)
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Get connection string from Settings > Database
4. Run SQL from `prisma/schema.prisma`

### Option B: Railway (Free Tier)
1. Go to [railway.app](https://railway.app)
2. Create new PostgreSQL service
3. Get connection string
4. Run: `npx prisma db push`

## 💳 **Stripe Setup**

1. Create account at [stripe.com](https://stripe.com)
2. Get API keys from Developers > API keys
3. Create products:
   - Starter: $99/month
   - Pro: $299/year
   - Team: $499/month
4. Set up webhook:
   - URL: `https://your-app.vercel.app/api/webhooks/stripe`
   - Events: `checkout.session.completed`, `customer.subscription.updated`

## 🎯 **Launch Checklist**

### Day 1: Setup
- [ ] Deploy to Vercel
- [ ] Configure environment variables
- [ ] Test all pages
- [ ] Verify API endpoints

### Day 2: Marketing
- [ ] Post on r/sales (500K+ members)
- [ ] Twitter/X launch thread
- [ ] Create landing page copy
- [ ] Set up email list

### Day 3: Sales
- [ ] Contact first 100 prospects
- [ ] Offer early bird discount
- [ ] Collect testimonials
- [ ] Setup referral program

## 📊 **Monitoring**

### Essential Metrics
- **Uptime**: Vercel Analytics
- **Errors**: Sentry (free tier)
- **Performance**: Vercel Speed Insights
- **Users**: Google Analytics

### Cost Monitoring
- **Vercel**: $20/month (Hobby plan)
- **Supabase**: Free tier
- **Stripe**: 2.9% + $0.30 per transaction
- **OpenAI**: ~$10/month
- **Apify**: $49/month

## 🔒 **Security**

### Required
- [ ] HTTPS enabled (Vercel auto)
- [ ] Environment variables encrypted
- [ ] API rate limiting
- [ ] Input validation

### Recommended
- [ ] CSP headers
- [ ] Security headers
- [ ] Regular dependency updates
- [ ] Security audit

## 🚨 **Troubleshooting**

### Build Fails
```bash
# Clear cache
rm -rf node_modules .next
npm install
npm run build
```

### Database Issues
```bash
# Reset database
npx prisma db push --force-reset

# Generate client
npx prisma generate
```

### API Errors
- Check Vercel function logs
- Verify environment variables
- Test endpoints locally first

## 📞 **Support**

- **GitHub Issues**: https://github.com/yksanjo/signalfox/issues
- **Twitter/X**: @SignalFoxApp
- **Email**: support@signalfox.app

## 🎉 **Success!**

Your SignalFox application is now deployed and ready for customers. The market is proven (original sold for $100M), the technology is modern, and the pricing is disruptive ($99/month vs ZoomInfo's $15K+/year).

**Next step**: Get your first 10 paying customers at $299/year each!