import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // حماية المسارات الإدارية
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // فحص وجود رمز الجلسة
    const token = request.cookies.get('adminToken')
    
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // إضافة headers أمنية
  const response = NextResponse.next()
  
  // حماية من XSS
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  
  // Content Security Policy
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:;"
  )

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/((?!api|_next/static|_next/image|favicon.ico).*)']
}
