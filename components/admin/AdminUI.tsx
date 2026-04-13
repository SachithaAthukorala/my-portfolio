'use client'

import React, { ReactNode, useState } from 'react'
import { CheckCircle2, X } from 'lucide-react'

/* ── Toast ──────────────────────────────────────── */
export function Toast({ msg, onClose }: { msg: string; onClose: () => void }) {
  return (
    <div className="fixed bottom-6 right-6 z-[999] flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl"
      style={{ background: '#0d1f3d', border: '1px solid rgba(59,125,216,0.4)' }}>
      <CheckCircle2 size={16} color="#4ade80" />
      <span className="text-white text-sm font-medium">{msg}</span>
      <button onClick={onClose} className="ml-2 border-0 bg-transparent cursor-pointer" style={{ color: '#6b82a3' }}>
        <X size={14} />
      </button>
    </div>
  )
}

/* ── Page header ────────────────────────────────── */
export function PageHeader({ title, desc, action }: { title: string; desc?: string; action?: ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 mb-8">
      <div>
        <h1 className="font-serif text-white mb-1" style={{ fontSize: 28 }}>{title}</h1>
        {desc && <p style={{ color: '#6b82a3', fontSize: 14 }}>{desc}</p>}
      </div>
      {action}
    </div>
  )
}

/* ── Card ───────────────────────────────────────── */
export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={className} style={{
      background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
      borderRadius: 12, padding: 24,
      ...style,
    }}>
      {children}
    </div>
  )
}

/* ── Section title inside card ──────────────────── */
export function CardTitle({ children }: { children: ReactNode }) {
  return (
    <p className="font-semibold text-white mb-4" style={{ fontSize: 13, borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: 12 }}>
      {children}
    </p>
  )
}

/* ── Label + Input ──────────────────────────────── */
export function Field({
  label, value, onChange, placeholder = '', type = 'text', rows,
}: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; rows?: number;
}) {
  const base: React.CSSProperties = {
    width: '100%', background: 'rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 8, padding: '9px 12px', color: '#fff', fontSize: 13, outline: 'none',
    boxSizing: 'border-box', fontFamily: 'inherit', resize: rows ? 'vertical' : undefined,
  }
  return (
    <div className="mb-4">
      <label className="block mb-1.5 font-semibold" style={{ fontSize: 12, color: '#9aabc5' }}>{label}</label>
      {rows ? (
        <textarea value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} rows={rows} style={base} />
      ) : (
        <input type={type} value={value} onChange={e => onChange(e.target.value)}
          placeholder={placeholder} style={base} />
      )}
    </div>
  )
}

/* ── Save button ────────────────────────────────── */
export function SaveBtn({ onClick, saving = false }: { onClick: () => void; saving?: boolean }) {
  return (
    <button onClick={onClick} disabled={saving}
      className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-semibold text-white transition-all"
      style={{ background: saving ? '#2a4a8a' : '#3b7dd8', border: 'none', fontSize: 13, cursor: saving ? 'wait' : 'pointer' }}>
      {saving ? 'Saving…' : 'Save Changes'}
    </button>
  )
}

/* ── Delete confirm button ──────────────────────── */
export function DeleteBtn({ onConfirm, label = 'Delete' }: { onConfirm: () => void; label?: string }) {
  const [confirm, setConfirm] = useState(false)
  if (confirm) return (
    <span className="flex items-center gap-2">
      <span style={{ fontSize: 12, color: '#f87171' }}>Sure?</span>
      <button onClick={() => { onConfirm(); setConfirm(false) }}
        className="px-3 py-1 rounded text-xs font-semibold text-white"
        style={{ background: '#ef4444', border: 'none', cursor: 'pointer' }}>Yes</button>
      <button onClick={() => setConfirm(false)}
        className="px-3 py-1 rounded text-xs"
        style={{ background: 'rgba(255,255,255,0.06)', border: 'none', color: '#9aabc5', cursor: 'pointer' }}>No</button>
    </span>
  )
  return (
    <button onClick={() => setConfirm(true)}
      className="px-3 py-1 rounded text-xs font-medium"
      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', cursor: 'pointer' }}>
      {label}
    </button>
  )
}

/* ── Add row button ─────────────────────────────── */
export function AddBtn({ onClick, label = '+ Add' }: { onClick: () => void; label?: string }) {
  return (
    <button onClick={onClick}
      className="px-4 py-2 rounded-lg text-xs font-semibold transition-all"
      style={{ background: 'rgba(59,125,216,0.12)', border: '1px solid rgba(59,125,216,0.25)', color: '#5e99ee', cursor: 'pointer' }}>
      {label}
    </button>
  )
}

/* ── Tag pill (removable) ───────────────────────── */
export function TagPill({ label, onRemove }: { label: string; onRemove: () => void }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs"
      style={{ background: 'rgba(59,125,216,0.12)', border: '1px solid rgba(59,125,216,0.25)', color: '#5e99ee' }}>
      {label}
      <button onClick={onRemove} className="border-0 bg-transparent cursor-pointer leading-none" style={{ color: '#3b7dd8' }}>
        <X size={11} />
      </button>
    </span>
  )
}

/* ── Divider ────────────────────────────────────── */
export function Divider() {
  return <div className="my-5" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }} />
}
