'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/works', label: 'Works' },
  { href: '/blog', label: 'Blog' },
  { href: '/#about', label: 'About' },
  { href: '/#contact', label: 'Contact' },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-navy-900/95 backdrop-blur-md border-b border-white/5 py-3'
          : 'bg-transparent py-5'
      )}
    >
      <nav className="max-w-7xl mx-auto px-5 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="font-serif text-xl text-white group">
          <span className="text-white">S</span>
          <span className="text-accent-400 group-hover:text-accent-300 transition-colors">.</span>
          <span className="text-navy-200 text-base font-sans font-light ml-1 hidden sm:inline">
            Athukorala
          </span>
        </Link>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-md transition-all duration-200',
                  pathname === link.href
                    ? 'text-white bg-white/8'
                    : 'text-navy-200 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-xs text-navy-200">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Available
          </span>
          <a
            href="mailto:sachitha@example.com"
            className="btn-primary py-2 text-xs"
          >
            Hire Me
          </a>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden p-2 text-navy-200 hover:text-white"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-navy-800/98 backdrop-blur-md border-t border-white/5">
          <ul className="px-5 py-4 space-y-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block px-3 py-2.5 text-navy-200 hover:text-white font-medium text-sm rounded-md hover:bg-white/5 transition-all"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <a href="mailto:sachitha@example.com" className="btn-primary w-full justify-center">
                Hire Me
              </a>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
