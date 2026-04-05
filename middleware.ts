import { NextRequest, NextResponse } from 'next/server'

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Only protect /admin routes
  if (!pathname.startsWith('/admin')) {
    return NextResponse.next()
  }

  // Allow the login page through so it can render
  if (pathname === '/admin/login') {
    return NextResponse.next()
  }

  // Check session cookie set after login
  const session = req.cookies.get('admin_session')?.value
  const validSession = process.env.ADMIN_SESSION_SECRET

  if (!session || session !== validSession) {
    const loginUrl = new URL('/admin/login', req.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*'],
}
