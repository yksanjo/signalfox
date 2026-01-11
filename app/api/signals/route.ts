import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

// GET /api/signals - Get user's signals
export async function GET(request: Request) {
  try {
    // TODO: Implement authentication
    // For demo, we'll use mock data
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    // Mock data for demo
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
    let signals = mockSignals
    if (type && type !== 'all') {
      signals = mockSignals.filter(s => s.type === type)
    }
    
    // Apply pagination
    const paginatedSignals = signals.slice(offset, offset + limit)
    const total = signals.length
    
    return NextResponse.json({
      signals,
      pagination: {
        total,
        limit,
        offset,
        hasMore: offset + signals.length < total,
      },
    })
  } catch (error) {
    console.error('Error fetching signals:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}

// POST /api/signals - Create a new signal (for testing)
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Mock response for demo
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
  } catch (error) {
    console.error('Error creating signal:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}