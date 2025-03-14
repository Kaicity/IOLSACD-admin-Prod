import { NextResponse } from 'next/server';

export function middleware(req: Request) {
  console.log('Request body:', req.body); // Kiểm tra body

  const res = NextResponse.next();

  res.headers.set('Access-Control-Allow-Origin', '*'); // Hoặc 'http://localhost:1620'
  res.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  return res;
}

export const config = {
  matcher: '/api/:path*', // Áp dụng middleware cho tất cả API routes
};
