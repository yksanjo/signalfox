# DataFox - Signal Tracker for B2B Sales

A modern rebuild of DataFox (acquired by Oracle in 2018, then killed) - AI company intelligence for sales teams.

## What It Does
- Tracks signals from Crunchbase, LinkedIn, press releases
- Alerts when target accounts raise money, hire executives, open offices
- Perfect for B2B sales teams who need to know "which companies just raised Series B"

## Why It Wins in 2026
- ZoomInfo costs $15K+/year, we charge $99/month
- Every B2B salesperson needs this
- Immediate use case: Soundraw enterprise outreach

## Tech Stack
- **Frontend**: Next.js 14 (App Router)
- **Backend**: Node.js/Express
- **Scraping**: Apify ($49/month)
- **AI**: OpenAI embeddings for intelligent matching
- **Database**: PostgreSQL with Prisma ORM
- **Payments**: Stripe
- **Deployment**: Vercel + Railway

## Revenue Model
- $299/year upfront (100 customers = $30K)
- Or $99/month subscription

## Build Time: 4 days
1. Day 1: Setup + basic scraping
2. Day 2: Notification system + database
3. Day 3: Frontend dashboard
4. Day 4: Stripe integration + deployment

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL
- Stripe account
- OpenAI API key
- Apify account

### Installation
```bash
npm install
cp .env.example .env
# Fill in your environment variables
npm run dev
```

## Project Structure
```
datafox/
├── app/                 # Next.js app directory
├── components/          # React components
├── lib/                # Utility functions
├── prisma/             # Database schema
├── scripts/            # Scraping scripts
├── public/             # Static assets
└── .env.example        # Environment variables template
```

## First Customers
- Post on r/sales
- Target B2B salespeople at startups
- Use case: Soundraw enterprise outreach

## Features
- [ ] Company tracking dashboard
- [ ] Real-time signal alerts
- [ ] Email/Slack notifications
- [ ] Company intelligence profiles
- [ ] Funding round tracking
- [ ] Hiring/expansion alerts
- [ ] Stripe subscription management
- [ ] Admin dashboard