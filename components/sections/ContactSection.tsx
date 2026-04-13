'use client'

import { useState, useEffect } from 'react'
import { Mail, MapPin, Github, Linkedin, Twitter, Send } from 'lucide-react'
import { loadData } from '@/lib/store'
import type { SiteData } from '@/lib/store'

export function ContactSection() {
  const [data, setData] = useState<SiteData | null>(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadData().then(setData)
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setSending(true)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        throw new Error(data.error || 'Failed to send message')
      }

      setSent(true)
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setSending(false)
    }
  }

  const siteConfig = data?.siteConfig

  if (!siteConfig) return null

  return (
    <section id="contact" className="py-28 bg-navy-700 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="section-label">Get in Touch</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Let's build something together.
          </h2>
          <p className="text-navy-200 text-lg max-w-xl mx-auto">
            Open to freelance projects, long-term contracts, and full-time opportunities.
            I typically reply within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="p-5 rounded-xl bg-navy-800/50 border border-white/8 hover:border-accent-400/25 transition-all">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-9 h-9 rounded-md bg-accent-400/12 flex items-center justify-center">
                  <Mail size={15} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Email</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-navy-200 text-xs hover:text-accent-300 transition-colors">
                    {siteConfig.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-navy-800/50 border border-white/8">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-accent-400/12 flex items-center justify-center">
                  <MapPin size={15} className="text-accent-400" />
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Location</p>
                  <p className="text-navy-200 text-xs">{siteConfig.location} · Remote OK</p>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-xl bg-navy-800/50 border border-white/8">
              <p className="text-white text-sm font-semibold mb-4">Connect</p>
              <div className="flex gap-3">
                {[
                  { href: siteConfig.socials.github, icon: Github, label: 'GitHub' },
                  { href: siteConfig.socials.linkedin, icon: Linkedin, label: 'LinkedIn' },
                  { href: siteConfig.socials.twitter, icon: Twitter, label: 'Twitter' },
                ].map(({ href, icon: Icon, label }) => (
                  <a
                    key={href}
                    href={href}
                    aria-label={label}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 rounded-lg border border-white/10 flex items-center justify-center text-navy-200 hover:text-white hover:border-accent-400/40 transition-all"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl bg-accent-400/8 border border-accent-400/20">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                <span className="text-green-400 text-xs font-semibold">Available for work</span>
              </div>
              <p className="text-navy-200 text-xs leading-relaxed">
                Currently accepting new projects and freelance contracts. Let's talk about yours.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            {sent ? (
              <div className="h-full flex items-center justify-center text-center p-10 rounded-xl bg-navy-800/50 border border-green-500/20">
                <div>
                  <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/25 flex items-center justify-center mx-auto mb-4">
                    <Send size={22} className="text-green-400" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">Message sent!</h3>
                  <p className="text-navy-200 text-sm">I'll get back to you within 24 hours.</p>
                  <button onClick={() => setSent(false)} className="mt-6 text-xs text-accent-300 hover:text-white transition-colors">
                    Send another message
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: 'name', label: 'Full Name', placeholder: 'Your name', type: 'text' },
                    { name: 'email', label: 'Email', placeholder: 'your@email.com', type: 'email' },
                  ].map((field) => (
                    <div key={field.name}>
                      <label className="block text-xs font-semibold text-white mb-1.5">{field.label}</label>
                      <input
                        type={field.type}
                        name={field.name}
                        value={form[field.name as keyof typeof form]}
                        onChange={handleChange}
                        placeholder={field.placeholder}
                        required
                        className="w-full bg-navy-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-navy-200 focus:outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/20 transition-all"
                      />
                    </div>
                  ))}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project inquiry, freelance, etc."
                    className="w-full bg-navy-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-navy-200 focus:outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/20 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white mb-1.5">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project, timeline, and budget..."
                    required
                    rows={5}
                    className="w-full bg-navy-800/50 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white placeholder-navy-200 focus:outline-none focus:border-accent-400/60 focus:ring-1 focus:ring-accent-400/20 transition-all resize-none"
                  />
                </div>

                <button type="submit" disabled={sending} className="btn-primary w-full justify-center py-3" style={{ opacity: sending ? 0.7 : 1, cursor: sending ? 'wait' : 'pointer' }}>
                  <Send size={15} /> {sending ? 'Sending...' : 'Send Message'}
                </button>
                {error && (
                  <p className="text-red-400 text-xs text-center mt-3">{error}</p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
