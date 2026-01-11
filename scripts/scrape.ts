#!/usr/bin/env tsx
import { prisma } from '@/lib/db'
import { classifySignal, extractCompanyInfo } from '@/lib/openai'
import axios from 'axios'

// Mock Apify client - in production, use the real Apify SDK
class MockApifyClient {
  async scrapeCrunchbase() {
    // Mock data - in production, this would use Apify to scrape Crunchbase
    return [
      {
        title: 'Stripe raises $245M in Series I funding',
        description: 'Payment processor Stripe has raised $245 million in a Series I funding round led by existing investors.',
        url: 'https://www.crunchbase.com/funding_round/stripe-series-i',
        source: 'crunchbase',
        date: new Date().toISOString(),
      },
      {
        title: 'Notion hires former Google VP as new CTO',
        description: 'Notion has hired a former Google VP as its new Chief Technology Officer to lead engineering expansion.',
        url: 'https://www.crunchbase.com/person/notion-cto',
        source: 'crunchbase',
        date: new Date().toISOString(),
      },
    ]
  }

  async scrapeLinkedIn() {
    // Mock data - in production, this would use Apify to scrape LinkedIn
    return [
      {
        title: 'Figma opening new Austin office',
        description: 'Design tool company Figma is expanding to Austin, Texas with a new engineering hub.',
        url: 'https://www.linkedin.com/company/figma/posts',
        source: 'linkedin',
        date: new Date().toISOString(),
      },
    ]
  }
}

async function processSignal(rawSignal: any) {
  try {
    // Classify the signal type using OpenAI
    const classification = await classifySignal(`${rawSignal.title} ${rawSignal.description}`)
    
    // Extract company information
    const companyInfo = await extractCompanyInfo(`${rawSignal.title} ${rawSignal.description}`)
    
    // Find or create company
    let company = null
    if (companyInfo.companyName) {
      company = await prisma.company.findFirst({
        where: {
          OR: [
            { name: { contains: companyInfo.companyName, mode: 'insensitive' } },
            { domain: companyInfo.domain },
          ],
        },
      })

      if (!company && companyInfo.companyName) {
        company = await prisma.company.create({
          data: {
            name: companyInfo.companyName,
            domain: companyInfo.domain,
            fundingStage: companyInfo.fundingStage,
            lastFundingAmount: companyInfo.fundingAmount,
            lastFundingDate: classification.type === 'funding' ? new Date() : undefined,
            userId: 'system', // System user for auto-discovered companies
          },
        })
      }
    }

    // Create signal in database
    if (company) {
      const signal = await prisma.signal.create({
        data: {
          type: classification.type,
          title: rawSignal.title,
          description: rawSignal.description,
          source: rawSignal.source,
          url: rawSignal.url,
          companyId: company.id,
          userId: 'system',
          metadata: {
            classification,
            companyInfo,
            raw: rawSignal,
          },
        },
      })

      console.log(`Created signal: ${signal.title}`)
      return signal
    }
  } catch (error) {
    console.error('Error processing signal:', error)
  }
}

async function checkForUserMatches(signal: any) {
  // Find users who are tracking this company
  const users = await prisma.user.findMany({
    where: {
      companies: {
        some: {
          OR: [
            { name: { contains: signal.company?.name || '', mode: 'insensitive' } },
            { domain: signal.company?.domain },
          ],
        },
      },
      subscription: {
        status: 'active',
      },
    },
    include: {
      subscription: true,
    },
  })

  // For each user, create a notification
  for (const user of users) {
    await prisma.signal.create({
      data: {
        type: signal.type,
        title: signal.title,
        description: signal.description,
        source: signal.source,
        url: signal.url,
        companyId: signal.companyId,
        userId: user.id,
        metadata: signal.metadata,
      },
    })

    console.log(`Notified user ${user.email} about signal: ${signal.title}`)
    
    // TODO: Send email/Slack notification
    // await sendNotification(user, signal)
  }
}

async function main() {
  console.log('Starting scraping process...')
  
  const apify = new MockApifyClient()
  
  // Scrape from different sources
  const crunchbaseSignals = await apify.scrapeCrunchbase()
  const linkedinSignals = await apify.scrapeLinkedIn()
  
  const allSignals = [...crunchbaseSignals, ...linkedinSignals]
  
  console.log(`Found ${allSignals.length} potential signals`)
  
  // Process each signal
  for (const rawSignal of allSignals) {
    const signal = await processSignal(rawSignal)
    if (signal) {
      await checkForUserMatches(signal)
    }
  }
  
  console.log('Scraping process completed')
}

main()
  .catch(console.error)
  .finally(() => {
    prisma.$disconnect()
  })