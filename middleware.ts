import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

// Demo middleware - in production, use proper authentication
export function middleware(request: NextRequest) {
  // For demo purposes, allow all routes
  // In production, implement proper authentication
  
  return NextResponse.next()
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    '/dashboard/:path*',
    '/companies/:path*',
    '/signals/:path*',
  ],
}