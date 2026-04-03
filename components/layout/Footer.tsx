import Link from 'next/link'
import { Github, Linkedin, Twitter, Instagram, Mail, MapPin } from 'lucide-react'
import { siteConfig } from '@/lib/data'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-serif text-2xl text-white mb-3">
              S<span className="text-accent-400">.</span>
            </p>
            <p className="text-navy-200 text-sm leading-relaxed mb-5 max-w-xs">
              Full-Stack Developer & Photographer crafting digital experiences from Sri Lanka.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-navy-200">
              <MapPin size={12} className="text-accent-400" />
              {siteConfig.location}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-navy-200 mb-5">Navigate</h3>
            <ul className="space-y-2.5">
              {[
                { href: '/', label: 'Home' },
                { href: '/works', label: 'Works' },
                { href: '/blog', label: 'Blog' },
                { href: '/#about', label: 'About' },
                { href: '/#contact', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-navy-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-widest text-navy-200 mb-5">Connect</h3>
            <div className="flex gap-3 mb-6">
              {[
                { href: siteConfig.socials.github, icon: Github, label: 'GitHub' },
                { href: siteConfig.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                { href: siteConfig.socials.twitter, icon: Twitter, label: 'Twitter' },
                { href: siteConfig.socials.instagram, icon: Instagram, label: 'Instagram' },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={href}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-md border border-white/10 flex items-center justify-center text-navy-200 hover:text-white hover:border-accent-400/40 transition-all"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
            <a
              href={`mailto:${siteConfig.email}`}
              className="flex items-center gap-2 text-sm text-navy-200 hover:text-white transition-colors"
            >
              <Mail size={13} className="text-accent-400" />
              {siteConfig.email}
            </a>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row justify-between gap-3 text-xs text-navy-200">
          <p>© {year} Sachitha Athukorala. All rights reserved.</p>
          <p>Built with Next.js 14 · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  )
}
