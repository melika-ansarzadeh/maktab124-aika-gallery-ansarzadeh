import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token = request.headers.get('Authorization')?.split(' ')[1]; // توکن در هدر Authorization
  const role = request.headers.get('X-Role');

  if (
    pathname.startsWith('/homeAd') ||
    pathname.startsWith('/orders') ||
    pathname.startsWith('/productAd') ||
    pathname.startsWith('/productQuallity') ||
    pathname.startsWith('/users')
  ) {
    if (!token || role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  if (pathname.startsWith('/checkOut') || pathname.startsWith('/payment')) {
    if (!token) {
      const loginUrl = new URL('/login', request.url);
      loginUrl.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}
