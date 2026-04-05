'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, ExternalLink } from 'lucide-react'
import { loadData } from '@/lib/store'
import type { SiteData } from '@/lib/store'

export function FeaturedProjects() {
  const [data, setData] = useState<SiteData | null>(null)

  useEffect(() => {
    loadData().then(setData)
  }, [])

  const featured = data?.projects?.filter((p) => p.featured).slice(0, 3) || []

  return (
    <section id="projects" className="py-28 bg-navy-800/40 relative">
      <div className="glow-line" />
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Selected Work</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1]">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/works"
            className="flex items-center gap-2 text-sm text-accent-300 hover:text-white transition-colors font-medium flex-shrink-0"
          >
            View all projects <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {featured.map((project, i) => (
            <Link
              key={project.slug}
              href={`/works/${project.slug}`}
              className="group relative rounded-2xl overflow-hidden border border-white/8 bg-navy-800/50 hover:border-white/20 transition-all duration-300 card-hover flex flex-col"
            >
              {/* Thumbnail */}
              <div className="relative h-52 overflow-hidden">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 1024px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

                {/* Industry badge */}
                <div
                  className="absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: `${project.industryColor}20`,
                    color: project.industryColor,
                    border: `1px solid ${project.industryColor}40`,
                  }}
                >
                  {project.industry}
                </div>

                {/* Year */}
                <p className="absolute bottom-3 right-4 text-xs text-white/50">{project.year}</p>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-xl text-white mb-2 group-hover:text-accent-300 transition-colors leading-tight">
                  {project.title}
                </h3>
                <p className="text-sm text-navy-200 leading-relaxed mb-5 flex-1">
                  {project.summary}
                </p>

                {/* Stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span key={tech} className="tag-blue text-[11px] py-0.5">
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="tag bg-white/5 border-white/10 text-navy-200 text-[11px] py-0.5">
                      +{project.stack.length - 4}
                    </span>
                  )}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-2 pt-4 border-t border-white/8">
                  {project.metrics.slice(0, 2).map((m) => (
                    <div key={m.label}>
                      <p className="font-serif text-lg text-white">{m.value}</p>
                      <p className="text-[11px] text-navy-200">{m.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
