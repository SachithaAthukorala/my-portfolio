'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Github, Linkedin, Download, Camera, Code2, Smartphone, Monitor, LucideIcon } from 'lucide-react'
import { loadData, getDefaults } from '@/lib/store'
import type { SiteData } from '@/lib/store'

// Map icon name string → Lucide component
const ICON_MAP: Record<string, LucideIcon> = {
  Code2, Smartphone, Monitor, Camera,
}

// Map color name → Tailwind classes
const COLOR_MAP: Record<string, { text: string; border: string; bg: string; pill: string }> = {
  accent:  { text: 'text-accent-300',  border: 'border-accent-400/40',  bg: 'bg-accent-400/10',  pill: 'text-accent-400'  },
  purple:  { text: 'text-purple-400',  border: 'border-purple-500/40',  bg: 'bg-purple-500/10',  pill: 'text-purple-400'  },
  teal:    { text: 'text-teal-400',    border: 'border-teal-500/40',    bg: 'bg-teal-500/10',    pill: 'text-teal-400'    },
  gold:    { text: 'text-yellow-400',  border: 'border-yellow-500/40',  bg: 'bg-yellow-500/10',  pill: 'text-yellow-400'  },
  pink:    { text: 'text-pink-400',    border: 'border-pink-500/40',    bg: 'bg-pink-500/10',    pill: 'text-pink-400'    },
  green:   { text: 'text-green-400',   border: 'border-green-500/40',   bg: 'bg-green-500/10',   pill: 'text-green-400'   },
  blue:    { text: 'text-blue-400',    border: 'border-blue-500/40',    bg: 'bg-blue-500/10',    pill: 'text-blue-400'    },
  orange:  { text: 'text-orange-400',  border: 'border-orange-500/40',  bg: 'bg-orange-500/10',  pill: 'text-orange-400'  },
}

const DEFAULT_COLORS = COLOR_MAP.accent

function TypingBadge({ roles }: { roles: SiteData['heroRoles'] }) {
  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState<'typing' | 'pause' | 'erasing'>('typing')

  const safeRoles = roles?.length ? roles : [{ label: 'Developer', icon: 'Code2', color: 'accent' }]

  useEffect(() => {
    const current = safeRoles[roleIndex % safeRoles.length].label
    let timeout: ReturnType<typeof setTimeout>

    if (phase === 'typing') {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 90)
      } else {
        timeout = setTimeout(() => setPhase('pause'), 1400)
      }
    } else if (phase === 'pause') {
      timeout = setTimeout(() => setPhase('erasing'), 400)
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 55)
      } else {
        setRoleIndex((i) => (i + 1) % safeRoles.length)
        setPhase('typing')
      }
    }

    return () => clearTimeout(timeout)
  }, [displayed, phase, roleIndex, safeRoles])

  const role = safeRoles[roleIndex % safeRoles.length]
  const colors = COLOR_MAP[role.color] ?? DEFAULT_COLORS
  const Icon = ICON_MAP[role.icon] ?? Code2

  return (
    <div
      className={`
        absolute -bottom-5 -left-7 z-10
        flex items-center gap-2.5
        px-4 py-2.5 rounded-xl
        bg-navy-800/95 backdrop-blur-sm shadow-xl
        border ${colors.border}
        transition-colors duration-500
      `}
    >
      <div className={`w-7 h-7 rounded-lg ${colors.bg} flex items-center justify-center flex-shrink-0 transition-colors duration-500`}>
        <Icon size={14} className={`${colors.text} transition-colors duration-500`} />
      </div>
      <span className="text-xs font-semibold text-white min-w-[88px]">
        {displayed}
        <span className="inline-block w-0.5 h-3.5 bg-white ml-0.5 align-middle animate-pulse" />
      </span>
    </div>
  )
}

export function HeroSection() {
  // Pre-fill with defaults so the hero renders immediately (no loading flash).
  // When the real data resolves, only dynamic values (tagline, stats, socials) update.
  const [data, setData] = useState<SiteData>(getDefaults)

  useEffect(() => {
    loadData().then(setData)
  }, [])

  const siteConfig = data.siteConfig
  const stats = data.stats
  const heroRoles = data.heroRoles

  return (
    <section className="relative min-h-screen flex items-center bg-navy-700 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-lines" />
      <div className="absolute inset-0">
        <div className="absolute right-0 top-0 w-[600px] h-[600px] rounded-full bg-accent-400/5 blur-[120px]" />
        <div className="absolute left-1/4 bottom-0 w-[400px] h-[400px] rounded-full bg-blue-800/10 blur-[100px]" />
      </div>
      <div className="absolute left-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-accent-400/20 to-transparent" />
      <div className="absolute right-[5%] top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/5 to-transparent" />

      <div className="relative max-w-7xl mx-auto px-5 md:px-8 pt-24 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* LEFT: copy */}
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent-400/25 bg-accent-400/8 mb-8 animate-fade-in">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-xs font-medium text-accent-300 tracking-wide">
                Open to new opportunities
              </span>
            </div>

            <h1 className="font-serif text-5xl md:text-6xl xl:text-7xl leading-[1.05] mb-6 animate-fade-up">
              <span className="text-white">Sachitha</span>
              <br />
              <span className="text-gradient-accent">Athukorala</span>
            </h1>

            <div className="flex flex-wrap gap-2.5 mb-7 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              {heroRoles?.map((role) => {
                const Icon = ICON_MAP[role.icon] ?? Code2
                const colors = COLOR_MAP[role.color] ?? DEFAULT_COLORS
                return (
                  <span key={role.label} className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/6 border border-white/10 text-xs text-navy-200 font-medium">
                    <Icon size={11} className={colors.pill} /> {role.label}
                  </span>
                )
              })}
            </div>

            <p className="text-navy-200 text-lg leading-relaxed max-w-lg mb-10 animate-fade-up" style={{ animationDelay: '0.2s' }}>
              {siteConfig.tagline}
            </p>

            <div className="flex flex-wrap gap-3 mb-12 animate-fade-up" style={{ animationDelay: '0.3s' }}>
              <Link href="/works" className="btn-primary">
                View My Work <ArrowRight size={15} />
              </Link>
              <a href="#contact" className="btn-outline">Get in Touch</a>
              <a href="/cv.pdf" className="btn-ghost">
                <Download size={14} /> Resume
              </a>
            </div>

            <div className="flex items-center gap-4 animate-fade-up" style={{ animationDelay: '0.4s' }}>
              <span className="text-xs text-navy-200 uppercase tracking-widest">Follow</span>
              <div className="w-8 h-px bg-white/15" />
              <div className="flex gap-3">
                <a href={siteConfig.socials.github} target="_blank" rel="noreferrer" className="text-navy-200 hover:text-white transition-colors" aria-label="GitHub">
                  <Github size={17} />
                </a>
                <a href={siteConfig.socials.linkedin} target="_blank" rel="noreferrer" className="text-navy-200 hover:text-white transition-colors" aria-label="LinkedIn">
                  <Linkedin size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: photo + stats */}
          <div className="relative hidden lg:flex flex-col items-center gap-10">

            <div className="relative">
              {/* Glow ring */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-accent-400/40 via-transparent to-accent-400/10 blur-sm" />

              {/* Photo frame */}
              <div className="relative w-72 h-80 rounded-2xl overflow-hidden border border-white/12 shadow-[0_32px_80px_rgba(0,0,0,0.5)]">
                <Image
                  src="/sachitha.png"
                  alt="Sachitha Athukorala"
                  fill
                  priority
                  className="object-cover object-top"
                  sizes="288px"
                />
                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-navy-900/60 to-transparent" />
              </div>

              {/* Typing badge — bottom left */}
              <TypingBadge roles={heroRoles} />

              {/* Available badge — top right (static) */}
              <div className="absolute -top-4 -right-6 z-10 bg-navy-800/95 border border-green-500/30 rounded-xl px-4 py-2.5 backdrop-blur-sm shadow-lg">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-xs font-semibold text-white">Available</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-3 w-full max-w-sm">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-navy-800/60 border border-white/8 rounded-xl p-3 text-center backdrop-blur-sm hover:border-accent-400/30 transition-all duration-300"
                >
                  <p className="font-serif text-xl text-white">{stat.value}</p>
                  <p className="text-[10px] text-navy-200 leading-snug mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-navy-200 animate-bounce">
          <div className="w-px h-8 bg-gradient-to-b from-accent-400/40 to-transparent" />
          <span className="text-xs tracking-widest uppercase">Scroll</span>
        </div>
      </div>
    </section>
  )
}