import { NextRequest, NextResponse } from 'next/server';
import { updateSession } from '@/lib/session';

export default async function middleware(request: NextRequest) {
  if (
    !request.nextUrl.pathname.includes('robots') &&
    !request.nextUrl.pathname.includes('sitemap') &&
    !request.nextUrl.pathname.includes('api') &&
    !request.nextUrl.pathname.includes('.well-known')
  ) {
    await updateSession(request.nextUrl.pathname);
  }
  return NextResponse.next();
}

export const config = {
  runtime: 'nodejs',
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
