'use client'

import { useState, useEffect } from 'react'
import { Mail, MailOpen, Trash2, Clock, User, Search, Filter, RefreshCw, ChevronDown, ChevronUp, ExternalLink, ArrowLeft } from 'lucide-react'
import { PageHeader, Card, DeleteBtn, Toast } from '@/components/admin/AdminUI'

interface Message {
  _id: string
  name: string
  email: string
  subject: string
  message: string
  read: boolean
  createdAt: string
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins = Math.floor(diff / 60000)
  if (mins < 1) return 'Just now'
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  if (days < 30) return `${days}d ago`
  const months = Math.floor(days / 30)
  return `${months}mo ago`
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit',
  })
}

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<string | null>(null)
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')
  const [toast, setToast] = useState('')
  const [refreshing, setRefreshing] = useState(false)

  async function load() {
    try {
      const res = await fetch('/api/admin/messages')
      if (!res.ok) throw new Error()
      const data = await res.json()
      setMessages(data.messages || [])
    } catch {
      console.error('Failed to load messages')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  async function refresh() {
    setRefreshing(true)
    await load()
    setRefreshing(false)
  }

  async function toggleRead(id: string, read: boolean) {
    await fetch('/api/admin/messages', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, read }),
    })
    setMessages(prev => prev.map(m => m._id === id ? { ...m, read } : m))
    setToast(read ? 'Marked as read' : 'Marked as unread')
    setTimeout(() => setToast(''), 2500)
  }

  async function remove(id: string) {
    await fetch('/api/admin/messages', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    setMessages(prev => prev.filter(m => m._id !== id))
    if (selected === id) setSelected(null)
    setToast('Message deleted')
    setTimeout(() => setToast(''), 2500)
  }

  const unreadCount = messages.filter(m => !m.read).length
  const filtered = messages.filter(m => {
    if (filter === 'unread' && m.read) return false
    if (filter === 'read' && !m.read) return false
    if (search) {
      const q = search.toLowerCase()
      return (
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        m.subject.toLowerCase().includes(q) ||
        m.message.toLowerCase().includes(q)
      )
    }
    return true
  })

  const selectedMsg = messages.find(m => m._id === selected)

  // Auto-mark as read when opening
  useEffect(() => {
    if (selectedMsg && !selectedMsg.read) {
      toggleRead(selectedMsg._id, true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  if (loading) {
    return (
      <div>
        <PageHeader title="Messages" desc="Loading..." />
        <div className="flex items-center justify-center py-20">
          <RefreshCw size={20} className="animate-spin" style={{ color: '#5e99ee' }} />
        </div>
      </div>
    )
  }

  return (
    <div>
      <PageHeader
        title="Messages"
        desc={`${messages.length} total · ${unreadCount} unread`}
        action={
          <button onClick={refresh} disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-all"
            style={{
              background: 'rgba(59,125,216,0.12)', border: '1px solid rgba(59,125,216,0.25)',
              color: '#5e99ee', cursor: 'pointer',
            }}>
            <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''} /> Refresh
          </button>
        }
      />

      {/* Search + Filter bar */}
      <div className="flex items-center gap-3 mb-5">
        <div className="relative flex-1">
          <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: '#3d5980' }} />
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search messages..."
            style={{
              width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 8, padding: '9px 12px 9px 34px', color: '#fff', fontSize: 13,
              outline: 'none', boxSizing: 'border-box', fontFamily: 'inherit',
            }}
          />
        </div>
        <div className="flex rounded-lg overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
          {(['all', 'unread', 'read'] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              style={{
                padding: '8px 14px', fontSize: 12, fontWeight: 600, border: 'none', cursor: 'pointer',
                background: filter === f ? 'rgba(59,125,216,0.2)' : 'rgba(0,0,0,0.2)',
                color: filter === f ? '#5e99ee' : '#6b82a3',
                textTransform: 'capitalize',
              }}>
              {f}{f === 'unread' && unreadCount > 0 ? ` (${unreadCount})` : ''}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {messages.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '60px 24px' }}>
          <div style={{
            width: 56, height: 56, borderRadius: '50%', margin: '0 auto 16px',
            background: 'rgba(59,125,216,0.1)', border: '1px solid rgba(59,125,216,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Mail size={24} style={{ color: '#5e99ee' }} />
          </div>
          <p className="text-white font-semibold mb-2" style={{ fontSize: 16 }}>No messages yet</p>
          <p style={{ color: '#6b82a3', fontSize: 13 }}>
            When visitors submit the contact form, their messages will appear here.
          </p>
        </Card>
      ) : filtered.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '40px 24px' }}>
          <p style={{ color: '#6b82a3', fontSize: 13 }}>No messages match your search.</p>
        </Card>
      ) : selectedMsg ? (
        /* ── Detail view ───────────────────────────── */
        <div>
          <button onClick={() => setSelected(null)}
            className="flex items-center gap-1.5 mb-4 border-0 bg-transparent cursor-pointer transition-all"
            style={{ color: '#5e99ee', fontSize: 13, fontWeight: 600 }}>
            <ArrowLeft size={14} /> Back to inbox
          </button>
          <Card>
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <h2 className="text-white font-semibold" style={{ fontSize: 18, marginBottom: 4 }}>
                  {selectedMsg.subject || '(No subject)'}
                </h2>
                <div className="flex items-center gap-3 flex-wrap" style={{ fontSize: 12, color: '#6b82a3' }}>
                  <span className="flex items-center gap-1.5">
                    <User size={12} /> {selectedMsg.name}
                  </span>
                  <span>·</span>
                  <a href={`mailto:${selectedMsg.email}`}
                    style={{ color: '#5e99ee', textDecoration: 'none' }}
                    className="flex items-center gap-1">
                    {selectedMsg.email} <ExternalLink size={10} />
                  </a>
                  <span>·</span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={12} /> {formatDate(selectedMsg.createdAt)}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  onClick={() => toggleRead(selectedMsg._id, !selectedMsg.read)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)',
                    color: '#9aabc5', cursor: 'pointer',
                  }}>
                  {selectedMsg.read ? <MailOpen size={13} /> : <Mail size={13} />}
                  {selectedMsg.read ? 'Mark unread' : 'Mark read'}
                </button>
                <DeleteBtn onConfirm={() => remove(selectedMsg._id)} />
              </div>
            </div>

            <div style={{
              borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 20,
              color: '#c8d4e3', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap',
            }}>
              {selectedMsg.message}
            </div>

            {/* Reply shortcut */}
            <div className="mt-8">
              <a href={`mailto:${selectedMsg.email}?subject=Re: ${encodeURIComponent(selectedMsg.subject || 'Your message')}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white text-sm no-underline transition-all"
                style={{ background: '#3b7dd8', border: 'none' }}>
                <Mail size={14} /> Reply via Email
              </a>
            </div>
          </Card>
        </div>
      ) : (
        /* ── List view ─────────────────────────────── */
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filtered.map(msg => (
            <button
              key={msg._id}
              onClick={() => setSelected(msg._id)}
              className="w-full text-left border-0 cursor-pointer transition-all"
              style={{
                background: msg.read ? 'rgba(255,255,255,0.02)' : 'rgba(59,125,216,0.06)',
                borderLeft: msg.read ? '3px solid transparent' : '3px solid #5e99ee',
                borderRadius: 8, padding: '14px 18px',
                display: 'flex', alignItems: 'flex-start', gap: 14,
              }}>
              {/* Icon */}
              <div style={{
                width: 36, height: 36, borderRadius: 8, flexShrink: 0, marginTop: 2,
                background: msg.read ? 'rgba(255,255,255,0.04)' : 'rgba(59,125,216,0.15)',
                border: msg.read ? '1px solid rgba(255,255,255,0.08)' : '1px solid rgba(59,125,216,0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {msg.read
                  ? <MailOpen size={14} style={{ color: '#3d5980' }} />
                  : <Mail size={14} style={{ color: '#5e99ee' }} />}
              </div>

              {/* Content */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold" style={{
                    fontSize: 13, color: msg.read ? '#9aabc5' : '#fff',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {msg.name}
                  </span>
                  {!msg.read && (
                    <span style={{
                      width: 7, height: 7, borderRadius: '50%', background: '#5e99ee', flexShrink: 0,
                    }} />
                  )}
                  <span style={{ marginLeft: 'auto', fontSize: 11, color: '#3d5980', flexShrink: 0 }}>
                    {timeAgo(msg.createdAt)}
                  </span>
                </div>
                <p style={{
                  fontSize: 13, fontWeight: msg.read ? 400 : 600,
                  color: msg.read ? '#6b82a3' : '#c8d4e3', marginBottom: 3,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {msg.subject || '(No subject)'}
                </p>
                <p style={{
                  fontSize: 12, color: '#3d5980', margin: 0,
                  overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                }}>
                  {msg.message}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}

      {toast && <Toast msg={toast} onClose={() => setToast('')} />}
    </div>
  )
}
