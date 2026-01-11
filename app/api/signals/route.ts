import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { getServerSession } from 'next-auth'

// GET /api/signals - Get user's signals
export async function GET(request: Request) {
  try {
    // TODO: Implement authentication
    // const session = await getServerSession()
    // if (!session) {
    //   return new NextResponse('Unauthorized', { status: 401 })
    // }
    
    const { searchParams } = new URL(request.url)
    const type = searchParams.get('type')
    const companyId = searchParams.get('companyId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    
    const where: any = {
      // userId: session.user.id, // Uncomment when auth is implemented
      userId: 'demo-user-id', // Temporary for demo
    }
    
    if (type) {
      where.type = type
    }
    
    if (companyId) {
      where.companyId = companyId
    }
    
    const [signals, total] = await Promise.all([
      prisma.signal.findMany({
        where,
        include: {
          company: true,
        },
        orderBy: {
          createdAt: 'desc',
        },
        take: limit,
        skip: offset,
      }),
      prisma.signal.count({ where }),
    ])
    
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
    
    const signal = await prisma.signal.create({
      data: {
        type: body.type,
        title: body.title,
        description: body.description,
        source: body.source || 'manual',
        url: body.url,
        companyId: body.companyId,
        userId: body.userId || 'demo-user-id',
        metadata: body.metadata,
      },
      include: {
        company: true,
      },
    })
    
    return NextResponse.json(signal)
  } catch (error) {
    console.error('Error creating signal:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}