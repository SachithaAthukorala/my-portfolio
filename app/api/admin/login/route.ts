import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  const adminPassword = process.env.ADMIN_PASSWORD
  const sessionSecret = process.env.ADMIN_SESSION_SECRET

  if (!adminPassword || !sessionSecret) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured' },
      { status: 500 }
    )
  }

  if (password !== adminPassword) {
    // Small delay to slow brute-force attempts
    await new Promise((r) => setTimeout(r, 500))
    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    )
  }

  const response = NextResponse.json({ success: true })

  // Secure, httpOnly cookie — 12 hour session
  response.cookies.set('admin_session', sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  })

  return response
}
