'use client'

import { useEffect, useState } from 'react'
import { loadData } from '@/lib/store'
import type { SiteData } from '@/lib/store'

const colorMap: Record<string, string> = {
  accent: 'bg-accent-400/10 border-accent-400/20 text-accent-300',
  teal: 'bg-teal-500/10 border-teal-500/20 text-teal-300',
  gold: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-300',
  purple: 'bg-purple-500/10 border-purple-500/20 text-purple-300',
  green: 'bg-green-500/10 border-green-500/20 text-green-300',
  orange: 'bg-orange-500/10 border-orange-500/20 text-orange-300',
}

const headerColorMap: Record<string, string> = {
  accent: 'text-accent-300',
  teal: 'text-teal-300',
  gold: 'text-yellow-300',
  purple: 'text-purple-300',
  green: 'text-green-300',
  orange: 'text-orange-300',
}

const borderColorMap: Record<string, string> = {
  accent: 'border-accent-400/20 hover:border-accent-400/50',
  teal: 'border-teal-500/20 hover:border-teal-400/50',
  gold: 'border-yellow-500/20 hover:border-yellow-400/50',
  purple: 'border-purple-500/20 hover:border-purple-400/50',
  green: 'border-green-500/20 hover:border-green-400/50',
  orange: 'border-orange-500/20 hover:border-orange-400/50',
}

export function SkillsSection() {
  const [data, setData] = useState<SiteData | null>(null)

  useEffect(() => {
    loadData().then(setData)
  }, [])

  const skills = data?.skills || []

  return (
    <section id="skills" className="py-28 bg-navy-700 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="section-label">Technical Expertise</p>
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-4">
            Skills & Technologies
          </h2>
          <p className="text-navy-200 text-lg max-w-2xl mx-auto">
            A broad, battle-tested toolkit built over 5+ years of shipping production software
            across platforms and industries.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skills.map((group) => (
            <div
              key={group.category}
              className={`rounded-xl border bg-navy-800/50 p-6 transition-all duration-300 ${borderColorMap[group.color]}`}
            >
              <h3 className={`text-xs font-bold uppercase tracking-[0.12em] mb-4 ${headerColorMap[group.color]}`}>
                {group.category}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className={`tag ${colorMap[group.color]} transition-opacity hover:opacity-80`}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
