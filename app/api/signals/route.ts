import { NextResponse } from 'next/server'
import { prisma, getSignalsForUser, createSignal } from '@/lib/db'

// GET /api/signals - Get user's signals
export async function GET(request: Request) {
  try {
    // TODO: Implement proper authentication
    // For now, we'll use a demo user ID
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    
    // Demo user ID - in production, get from session
    const demoUserId = 'demo-user-id'
    
    // Try to get real signals from database
    let signals
    try {
      signals = await getSignalsForUser(demoUserId, { type: type || undefined })
      
      // If no signals in database, use mock data
      if (signals.length === 0) {
        throw new Error('No signals in database')
      }
    } catch (error) {
      // Fallback to mock data
      const mockSignals = [
        {
          id: '1',
          type: 'funding',
          title: 'Stripe raises $245M in Series I funding',
          description: 'Payment processor Stripe has raised $245 million in a Series I funding round led by existing investors.',
          source: 'crunchbase',
          createdAt: new Date().toISOString(),
          company: {
            name: 'Stripe',
            domain: 'stripe.com',
          },
        },
        {
          id: '2',
          type: 'hiring',
          title: 'Notion hires former Google VP as new CTO',
          description: 'Notion has hired a former Google VP as its new Chief Technology Officer to lead engineering expansion.',
          source: 'linkedin',
          createdAt: new Date(Date.now() - 86400000).toISOString(), // 1 day ago
          company: {
            name: 'Notion',
            domain: 'notion.so',
          },
        },
        {
          id: '3',
          type: 'expansion',
          title: 'Figma opening new Austin office',
          description: 'Design tool company Figma is expanding to Austin, Texas with a new engineering hub.',
          source: 'press',
          createdAt: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
          company: {
            name: 'Figma',
            domain: 'figma.com',
          },
        },
        {
          id: '4',
          type: 'funding',
          title: 'OpenAI raises $10B at $100B valuation',
          description: 'OpenAI has raised $10 billion in new funding at a $100 billion valuation.',
          source: 'crunchbase',
          createdAt: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
          company: {
            name: 'OpenAI',
            domain: 'openai.com',
          },
        },
        {
          id: '5',
          type: 'hiring',
          title: 'Vercel hiring 50 engineers for AI division',
          description: 'Vercel is expanding its AI team with 50 new engineering hires.',
          source: 'linkedin',
          createdAt: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
          company: {
            name: 'Vercel',
            domain: 'vercel.com',
          },
        },
      ]

      // Filter by type if specified
      let filteredSignals = mockSignals
      if (type && type !== 'all') {
        filteredSignals = mockSignals.filter(s => s.type === type)
      }

      signals = filteredSignals as any
    }

    return NextResponse.json({
      signals,
      pagination: {
        total: signals.length,
        limit: 50,
        offset: 0,
        hasMore: false,
      },
    })
  } catch (error) {
    console.error('Error fetching signals:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/signals - Create a new signal
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Demo user ID - in production, get from session
    const demoUserId = 'demo-user-id'
    const demoCompanyId = 'demo-company-id'
    
    try {
      // Try to create signal in database
      const signal = await createSignal({
        type: body.type,
        title: body.title,
        description: body.description,
        source: body.source || 'manual',
        url: body.url,
        companyId: demoCompanyId,
        userId: demoUserId,
        metadata: body.metadata,
      })
      
      return NextResponse.json(signal)
    } catch (error) {
      // Fallback to mock response
      const signal = {
        id: 'mock_' + Date.now(),
        type: body.type,
        title: body.title,
        description: body.description,
        source: body.source || 'manual',
        url: body.url,
        company: {
          name: body.companyName || 'Demo Company',
          domain: 'demo.com',
        },
        createdAt: new Date().toISOString(),
      }

      return NextResponse.json(signal)
    }
  } catch (error) {
    console.error('Error creating signal:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}