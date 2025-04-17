// برای App Router (در مسیر: app/api/auth/login/route.ts)

import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request: Request) {
  const { username, password } = await request.json();

  // 🔐 اینجا اعتبارسنجی کن
  if (username === 'admin' && password === '1234') {
    const token = jwt.sign({ username, role: 'admin' }, 'secret-key', {
      expiresIn: '1h',
    });

    const response = NextResponse.json({ success: true });

    // ✨ ست کردن توکن در کوکی
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  }

  return NextResponse.json(
    { success: false, message: 'Invalid credentials' },
    { status: 401 }
  );
}
