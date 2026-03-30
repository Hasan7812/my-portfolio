import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const { cookies, nextUrl, headers } = request;
  const path = nextUrl.pathname;

  if (
    path.startsWith('/_next') ||
    path.startsWith('/api') ||
    path.includes('.')
  ) {
    return response;
  }

  let trackingId = cookies.get('trackingId')?.value;
  
  if (!trackingId) {
    trackingId = 'hy-' + crypto.randomUUID();
    response.cookies.set('trackingId', trackingId, {
      maxAge: 315360000,
      path: '/',
      httpOnly: true,
    });
  }

  let lang = cookies.get('lang')?.value;
  
  if (!lang) {
    const acceptLang = headers.get('accept-language');
    lang = acceptLang ? acceptLang.split(',')[0].split('-')[0] : 'en';
    response.cookies.set('lang', lang, {
      maxAge: 31536000,
      path: '/'
    });
  }

  const userAgent = headers.get('user-agent') || 'Bilinmiyor';
  const ip = headers.get('x-forwarded-for') || headers.get('x-real-ip') || '127.0.0.1';

  try {
    fetch(`${nextUrl.origin}/api/record`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ trackingId, ip, userAgent, path, lang }),
    }).catch(() => {});
  } catch (error) {
    console.error(error);
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};