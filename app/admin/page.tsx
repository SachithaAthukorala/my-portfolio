'use client'

import Link from 'next/link'
import { Sparkles, User, BookOpen, Briefcase, FileText, Camera, Settings, ArrowRight } from 'lucide-react'
import { blogPosts, projects, skills, photoCategories } from '@/lib/data'

const sections = [
  { href: '/admin/hero', label: 'Hero Section', desc: 'Name, tagline, role pills, CTA buttons', icon: Sparkles, color: '#5e99ee' },
  { href: '/admin/about', label: 'About', desc: 'Bio text, work experience, certifications', icon: User, color: '#a78bfa' },
  { href: '/admin/skills', label: 'Skills', desc: `${skills.length} skill groups — add or remove`, icon: BookOpen, color: '#34d399' },
  { href: '/admin/works', label: 'Works', desc: `${projects.length} projects — full case studies`, icon: Briefcase, color: '#f59e0b' },
  { href: '/admin/blog', label: 'Blog', desc: `${blogPosts.length} posts — write and edit`, icon: FileText, color: '#fb7185' },
  { href: '/admin/photos', label: 'Photo Albums', desc: `${photoCategories.length} albums — manage gallery`, icon: Camera, color: '#fbbf24' },
  { href: '/admin/settings', label: 'Settings', desc: 'Email, socials, password', icon: Settings, color: '#94a3b8' },
]

function SectionCard({ href, label, desc, icon: Icon, color }: typeof sections[0]) {
  return (
    <Link href={href} className="block no-underline group">
      <div className="rounded-xl p-5 border transition-all duration-200 hover:border-white/14 hover:bg-white/5"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 12 }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: `${color}18`, border: `1px solid ${color}30` }}>
            <Icon size={18} color={color} />
          </div>
          <ArrowRight size={14} color="#3d5980" />
        </div>
        <p className="font-semibold text-white mb-1" style={{ fontSize: 14 }}>{label}</p>
        <p style={{ fontSize: 12, color: '#6b82a3', lineHeight: 1.5 }}>{desc}</p>
      </div>
    </Link>
  )
}

export default function AdminDashboard() {
  return (
    <div>
      <div style={{ marginBottom: 36 }}>
        <h1 className="font-serif text-white" style={{ fontSize: 32, marginBottom: 6 }}>Dashboard</h1>
        <p style={{ color: '#6b82a3', fontSize: 14 }}>Welcome back, Sachitha. Choose a section to edit.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 14 }}>
        {sections.map((s) => <SectionCard key={s.href} {...s} />)}
      </div>

      <div className="flex items-center gap-3 mt-7 px-5 py-4 rounded-xl"
        style={{ background: 'rgba(59,125,216,0.06)', border: '1px solid rgba(59,125,216,0.15)' }}>
        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
        <p style={{ color: '#9aabc5', fontSize: 13, flex: 1 }}>Your portfolio is live.</p>
        <a href="/" target="_blank" rel="noreferrer"
          style={{ color: '#5e99ee', fontSize: 13, fontWeight: 600, textDecoration: 'none' }}>
          View Site →
        </a>
      </div>
    </div>
  )
}