import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // VULNERABILITY: Blindly trusting the internal subrequest header
  const isInternal = request.headers.get('x-middleware-subrequest') === '1';
  const token = request.cookies.get('auth_token');

  // If the internal header is present, bypass the token check entirely
  if (isInternal) {
    return NextResponse.next();
  }

  if (!token) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/:path*', '/admin/:path*'],
}
