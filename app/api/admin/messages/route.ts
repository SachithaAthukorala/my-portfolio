// Admin API: list, mark as read, delete contact messages
import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import ContactMessage from '@/lib/contactModel'

function isAuthed() {
  const cookieStore = cookies()
  const session = cookieStore.get('admin_session')
  return !!session?.value
}

// GET — fetch all messages (newest first)
export async function GET() {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    await connectDB()
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean()
    return NextResponse.json({ messages })
  } catch (err) {
    console.error('Failed to fetch messages:', err)
    return NextResponse.json({ error: 'Failed to load messages' }, { status: 500 })
  }
}

// PATCH — mark message as read / unread
export async function PATCH(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id, read } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await connectDB()
    await ContactMessage.findByIdAndUpdate(id, { read: !!read })
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to update message:', err)
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 })
  }
}

// DELETE — remove a message
export async function DELETE(req: Request) {
  if (!isAuthed()) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { id } = await req.json()
    if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })

    await connectDB()
    await ContactMessage.findByIdAndDelete(id)
    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('Failed to delete message:', err)
    return NextResponse.json({ error: 'Failed to delete' }, { status: 500 })
  }
}
