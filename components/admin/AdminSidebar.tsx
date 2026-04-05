'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, Briefcase,
  Settings, LogOut, ExternalLink, User,
  Sparkles, BookOpen, Camera, ChevronRight,
} from 'lucide-react'

const nav = [
  { group: 'Overview', items: [
    { href: '/admin',          label: 'Dashboard',    icon: LayoutDashboard },
  ]},
  { group: 'Content',  items: [
    { href: '/admin/hero',     label: 'Hero Section', icon: Sparkles        },
    { href: '/admin/about',    label: 'About',        icon: User            },
    { href: '/admin/skills',   label: 'Skills',       icon: BookOpen        },
    { href: '/admin/works',    label: 'Works',        icon: Briefcase       },
    { href: '/admin/blog',     label: 'Blog',         icon: FileText        },
    { href: '/admin/photos',   label: 'Photo Albums', icon: Camera          },
  ]},
  { group: 'System',   items: [
    { href: '/admin/settings', label: 'Settings',     icon: Settings        },
  ]},
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router   = useRouter()

  async function logout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.push('/admin/login')
    router.refresh()
  }

  function active(href: string) {
    return href === '/admin' ? pathname === '/admin' : pathname.startsWith(href)
  }

  return (
    <aside className="fixed top-0 left-0 bottom-0 z-50 flex flex-col overflow-y-auto"
      style={{ width: 240, background: '#0d1526', borderRight: '1px solid rgba(255,255,255,0.06)' }}>

      {/* Brand */}
      <div className="flex items-center gap-2.5 px-4 py-5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center font-serif font-bold text-base"
          style={{ background: 'rgba(59,125,216,0.15)', border: '1px solid rgba(59,125,216,0.3)', color: '#5e99ee' }}>
          S
        </div>
        <div>
          <p className="text-white font-semibold" style={{ fontSize: 13, lineHeight: 1.2 }}>Admin Panel</p>
          <p style={{ fontSize: 11, color: '#6b82a3' }}>Portfolio CMS</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 p-2">
        {nav.map(({ group, items }) => (
          <div key={group} className="mb-5">
            <p className="px-2 mb-1.5" style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#3d5980' }}>
              {group}
            </p>
            {items.map(({ href, label, icon: Icon }) => {
              const on = active(href)
              return (
                <Link key={href} href={href}
                  className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 no-underline transition-all"
                  style={{
                    background: on ? 'rgba(59,125,216,0.12)' : 'transparent',
                    border: on ? '1px solid rgba(59,125,216,0.2)' : '1px solid transparent',
                    color: on ? '#fff' : '#6b82a3',
                    fontSize: 13, fontWeight: on ? 600 : 400,
                  }}>
                  <Icon size={15} color={on ? '#5e99ee' : '#3d5980'} className="flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {on && <ChevronRight size={12} color="#5e99ee" />}
                </Link>
              )
            })}
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-2" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <a href="/" target="_blank" rel="noreferrer"
          className="flex items-center gap-2.5 px-2.5 py-2 rounded-lg mb-0.5 no-underline transition-all"
          style={{ color: '#6b82a3', fontSize: 13 }}>
          <ExternalLink size={14} /> View Live Site
        </a>
        <button onClick={logout}
          className="flex items-center gap-2.5 w-full px-2.5 py-2 rounded-lg border-0 bg-transparent cursor-pointer transition-all"
          style={{ color: '#6b82a3', fontSize: 13 }}>
          <LogOut size={14} /> Sign Out
        </button>
      </div>
    </aside>
  )
}
