import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/jwt';
import { isPlatformAdmin } from '@/constants/roles';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('token')?.value;
  const payload = token ? verifyJwt(token) : null;

  // 1. Handling Super Admin routes (/admin/...)
  if (pathname.startsWith('/admin')) {
    const isAuthRoute = pathname.startsWith('/admin/auth');

    if (isAuthRoute) {
      // If already logged in as platform admin, redirect to dashboard
      if (payload && isPlatformAdmin(payload.role)) {
        return NextResponse.redirect(new URL('/admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Protected admin dashboard routes
    if (!payload) {
      const loginUrl = new URL('/admin/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!isPlatformAdmin(payload.role)) {
      return NextResponse.redirect(new URL('/admin/auth/login?error=forbidden', request.url));
    }

    return NextResponse.next();
  }

  // 2. Handling Shop Admin routes (/shop-admin/...)
  if (pathname.startsWith('/shop-admin')) {
    const isAuthRoute = pathname.startsWith('/shop-admin/auth');

    if (isAuthRoute) {
      // If already logged in as shop admin or platform admin, redirect to shop dashboard
      if (payload && (payload.role === 'SHOP_ADMIN' || payload.role === 'SHOP_EMPLOYEE' || isPlatformAdmin(payload.role))) {
        return NextResponse.redirect(new URL('/shop-admin/dashboard', request.url));
      }
      return NextResponse.next();
    }

    // Protected shop admin dashboard routes
    if (!payload) {
      const loginUrl = new URL('/shop-admin/auth/login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }

    const hasShopRole =
      payload.role === 'SHOP_ADMIN' ||
      payload.role === 'SHOP_EMPLOYEE' ||
      isPlatformAdmin(payload.role);

    if (!hasShopRole) {
      return NextResponse.redirect(new URL('/shop-admin/auth/login?error=forbidden', request.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/shop-admin/:path*',
  ],
};
