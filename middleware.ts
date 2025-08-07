import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { ADMIN_DASHBOARD_PATH, ADMIN_LOGIN_PATH } from './lib/settings';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow API routes, static files, and public pages
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next/static') ||
    pathname.startsWith('/_next/image') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/public') ||
    pathname === '/' ||
    pathname.startsWith('/properties') ||
    pathname.startsWith('/property/') ||
    pathname.startsWith('/about') ||
    pathname.startsWith('/contact') ||
    pathname.startsWith(ADMIN_LOGIN_PATH) // Allow access to login page
  ) {
    return NextResponse.next();
  }

  // For admin routes, check session
  if (pathname.startsWith(ADMIN_DASHBOARD_PATH)) {
    // Middleware cannot directly access localStorage, so this check is limited.
    // The AdminGuard component will perform the actual client-side session check.
    return NextResponse.next();
  }

  // If trying to access /admin directly, redirect to /admin-dashboard
  if (pathname === '/admin') {
    return NextResponse.redirect(new URL(ADMIN_DASHBOARD_PATH, request.url));
  }

  // Default: allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};
