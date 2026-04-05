'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ExternalLink, Github } from 'lucide-react'
import { loadData } from '@/lib/store'
import type { SiteData, SiteData as SiteDataType } from '@/lib/store'
import type { Project } from '@/lib/data'

const platforms = ['All', 'web', 'mobile', 'desktop', 'fullstack']
const platformLabels: Record<string, string> = {
  All: 'All',
  web: 'Web',
  mobile: 'Mobile',
  desktop: 'Desktop',
  fullstack: 'Full-Stack',
}

export default function WorksPage() {
  const [active, setActive] = useState('All')
  const [data, setData] = useState<SiteDataType | null>(null)

  useEffect(() => {
    loadData().then(setData)
  }, [])

  const projects = data?.projects || []
  const filtered = active === 'All' ? projects : projects.filter((p) => p.platform === active)

  return (
    <div className="min-h-screen bg-navy-700">
      {/* Hero */}
      <div className="relative pt-32 pb-20 bg-navy-800/40 border-b border-white/5">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-label">Portfolio</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-5">
            My Works
          </h1>
          <p className="text-navy-200 text-xl max-w-2xl leading-relaxed">
            A curated selection of projects across web, mobile, desktop, and full-stack
            — each with a real problem, a deliberate approach, and measurable results.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-16 z-30 bg-navy-700/95 backdrop-blur border-b border-white/5">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <div className="flex items-center gap-1 py-3 overflow-x-auto scrollbar-none">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setActive(p)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  active === p
                    ? 'bg-accent-400 text-white'
                    : 'text-navy-200 hover:text-white hover:bg-white/6'
                }`}
              >
                {platformLabels[p]}
              </button>
            ))}
            <span className="ml-auto text-xs text-navy-200 flex-shrink-0">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="group rounded-2xl overflow-hidden border border-white/8 bg-navy-800/50 hover:border-white/18 transition-all duration-300 card-hover flex flex-col">
      {/* Thumbnail */}
      <div className="relative h-52 overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

        <div
          className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-sm"
          style={{
            backgroundColor: `${project.industryColor}20`,
            color: project.industryColor,
            border: `1px solid ${project.industryColor}40`,
          }}
        >
          {project.industry}
        </div>

        <div className="absolute top-4 right-4 px-2 py-0.5 rounded text-[11px] text-white/60 bg-navy-900/50 capitalize">
          {project.platform}
        </div>

        {project.featured && (
          <div className="absolute bottom-4 left-4 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gold-500/20 border border-gold-500/30">
            <span className="text-[10px] font-bold text-gold-500 uppercase tracking-wider">Featured</span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="font-serif text-xl text-white mb-2 leading-tight">
          {project.title}
        </h3>
        <p className="text-sm text-navy-200 leading-relaxed mb-4 flex-1">
          {project.summary}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.slice(0, 5).map((tech) => (
            <span key={tech} className="tag-blue text-[11px] py-0.5">{tech}</span>
          ))}
          {project.stack.length > 5 && (
            <span className="tag bg-white/5 border-white/10 text-navy-200 text-[11px] py-0.5">
              +{project.stack.length - 5}
            </span>
          )}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-3 mb-5 pt-4 border-t border-white/8">
          {project.metrics.slice(0, 2).map((m) => (
            <div key={m.label}>
              <p className="font-serif text-lg text-white">{m.value}</p>
              <p className="text-[11px] text-navy-200 leading-tight">{m.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <Link
            href={`/works/${project.slug}`}
            className="flex items-center gap-1.5 text-xs font-semibold text-accent-300 hover:text-white transition-colors"
          >
            Case Study <ArrowRight size={13} />
          </Link>
          <div className="flex-1" />
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center text-navy-200 hover:text-white hover:border-white/25 transition-all"
              aria-label="View live"
            >
              <ExternalLink size={12} />
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 rounded-md border border-white/10 flex items-center justify-center text-navy-200 hover:text-white hover:border-white/25 transition-all"
              aria-label="View source"
            >
              <Github size={12} />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
