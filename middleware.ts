// middleware.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    const decoded = jwt.verify(token, 'secret-key') as { role: string };
    if (decoded.role !== 'admin') {
      return NextResponse.redirect(new URL('/404', request.url));
    }
  } catch (err) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: ['/homeAd', '/productAd', '/productQuallity', '/orders', '/users'],
};