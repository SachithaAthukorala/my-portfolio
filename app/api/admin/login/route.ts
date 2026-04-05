import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/mongodb'
import mongoose, { Schema, Model } from 'mongoose'

// ── AdminUser model (inline to keep this self-contained) ──────────────────
interface IAdminUser {
  username: string
  passwordHash: string
}

const AdminUserSchema = new Schema<IAdminUser>({
  username:     { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
})

const AdminUser: Model<IAdminUser> =
  (mongoose.models.AdminUser as Model<IAdminUser>) ||
  mongoose.model<IAdminUser>('AdminUser', AdminUserSchema)

// ─────────────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  const { password } = await req.json()

  const sessionSecret = process.env.ADMIN_SESSION_SECRET
  const seedPassword  = process.env.ADMIN_PASSWORD   // used only for first-run seed

  if (!sessionSecret) {
    return NextResponse.json(
      { success: false, error: 'Server misconfigured' },
      { status: 500 }
    )
  }

  await connectDB()

  // ── Seed / sync admin credentials ───────────────────────────────────────
  // If ADMIN_PASSWORD env var is set, always keep MongoDB in sync with it.
  // This means changing ADMIN_PASSWORD (locally or on Vercel) takes effect
  // on the very next login attempt.
  let admin = await AdminUser.findOne({ username: 'admin' })

  if (seedPassword) {
    const currentHashMatches = admin
      ? await bcrypt.compare(seedPassword, admin.passwordHash)
      : false

    if (!admin) {
      // First run — create the admin record
      const hash = await bcrypt.hash(seedPassword, 12)
      admin = await AdminUser.create({ username: 'admin', passwordHash: hash })
    } else if (!currentHashMatches) {
      // Password was changed in env var — update the stored hash
      const hash = await bcrypt.hash(seedPassword, 12)
      admin.passwordHash = hash
      await admin.save()
    }
  }

  if (!admin) {
    return NextResponse.json(
      { success: false, error: 'No admin account exists. Set ADMIN_PASSWORD env var.' },
      { status: 500 }
    )
  }

  // ── Verify password ─────────────────────────────────────────────────────
  const valid = await bcrypt.compare(password, admin.passwordHash)

  if (!valid) {
    await new Promise((r) => setTimeout(r, 500)) // slow brute-force
    return NextResponse.json(
      { success: false, error: 'Invalid password' },
      { status: 401 }
    )
  }

  // ── Set session cookie (12 h) ────────────────────────────────────────────
  const response = NextResponse.json({ success: true })
  response.cookies.set('admin_session', sessionSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 12,
  })

  return response
}
