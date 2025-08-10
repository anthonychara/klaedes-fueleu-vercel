import { NextResponse } from 'next/server';

export function middleware(req) {
  const username = process.env.BASIC_AUTH_USERNAME || '';
  const password = process.env.BASIC_AUTH_PASSWORD || '';
  if (!username || !password) return NextResponse.next();

  const auth = req.headers.get('authorization');
  if (auth) {
    const [scheme, encoded] = auth.split(' ');
    if (scheme?.toLowerCase() === 'basic' && encoded) {
      const decoded = atob(encoded); // Edge runtime-safe
      const idx = decoded.indexOf(':');
      const u = decoded.slice(0, idx);
      const p = decoded.slice(idx + 1);
      if (u === username && p === password) return NextResponse.next();
    }
  }

  return new NextResponse('Authentication required.', {
    status: 401,
    headers: { 'WWW-Authenticate': 'Basic realm=\"Klaedes FuelEU Demo\"' }
  });
}

export const config = {
  matcher: ['/((?!_next|favicon.ico).*)'],
};
