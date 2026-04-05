'use client'

import { AdminSidebar } from './AdminSidebar'

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      background: '#0b1120',
    }}>
      <AdminSidebar />
      <div style={{
        marginLeft: 240,
        flex: 1,
        minHeight: '100vh',
        padding: '40px 48px',
        maxWidth: 'calc(100vw - 240px)',
        boxSizing: 'border-box',
      }}>
        {children}
      </div>
    </div>
  )
}
