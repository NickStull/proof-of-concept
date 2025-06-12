import { NextResponse } from 'next/server';

export function middleware(request) {
  console.log('middleware hit:', request.nextUrl.pathname);
  // Only handle the /secret route
  if (request.nextUrl.pathname === '/secret') {
    const code = request.nextUrl.searchParams.get('code');
    console.log('code found in middleware:', code);
    
    if (code) {
      // Create a clean URL without the code parameter
      const cleanUrl = new URL('/secret', request.url);
      
      // Create response with redirect to clean URL
      const response = NextResponse.redirect(cleanUrl);
      
      // Store the code in an HTTP-only cookie that expires quickly
      response.cookies.set('scavenger_code', code, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 300, // 5 minutes
        path: '/' // Changed from '/secret' to '/' so it's available to all routes
      });
      
      console.log('cookie set, redirecting to clean URL');
      return response;
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: '/secret'
};