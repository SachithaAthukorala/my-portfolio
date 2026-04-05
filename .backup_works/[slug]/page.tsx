'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, ExternalLink, Github, Calendar, Layers } from 'lucide-react'
import { useEffect, useState } from 'react'
import { loadData } from '@/lib/store'
import type { SiteData } from '@/lib/store'

interface Props {
  params: { slug: string }
}

export default function CaseStudyPage({ params }: Props) {
  const [data, setData] = useState<SiteData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData().then(setData).finally(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen bg-navy-700 flex items-center justify-center"><p className="text-navy-200">Loading...</p></div>
  if (!data) return notFound()

  const projects = data.projects
  const project = projects.find((p) => p.slug === params.slug)
  if (!project) notFound()

  const related = projects.filter((p) => p.slug !== project.slug).slice(0, 3)

  return (
    <div className="min-h-screen bg-navy-700">
      {/* Hero image */}
      <div className="relative h-[55vh] min-h-[420px]">
        <Image
          src={project.images[0]}
          alt={project.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-700 via-navy-700/40 to-navy-900/60" />

        <div className="absolute bottom-0 left-0 right-0 max-w-7xl mx-auto px-5 md:px-8 pb-10">
          <Link href="/works" className="flex items-center gap-1.5 text-xs text-navy-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={13} /> Back to Works
          </Link>

          <div className="flex items-center gap-3 mb-4">
            <span
              className="px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: `${project.industryColor}20`,
                color: project.industryColor,
                border: `1px solid ${project.industryColor}40`,
              }}
            >
              {project.industry}
            </span>
            <span className="text-navy-200 text-xs capitalize border border-white/10 rounded px-2 py-0.5">
              {project.platform}
            </span>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight max-w-3xl">
            {project.title}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main */}
          <div className="lg:col-span-2 space-y-12">
            {/* Summary */}
            <div>
              <p className="text-navy-200 text-lg leading-relaxed">{project.summary}</p>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {project.metrics.map((m) => (
                <div key={m.label} className="p-5 rounded-xl bg-navy-800/50 border border-white/8 text-center">
                  <p className="font-serif text-2xl md:text-3xl text-white mb-1">{m.value}</p>
                  <p className="text-xs text-navy-200 leading-tight">{m.label}</p>
                </div>
              ))}
            </div>

            {/* Case study sections */}
            {[
              { title: 'The Problem', content: project.problem },
              { title: 'Approach & Solution', content: project.approach },
              { title: 'Results', content: project.results },
            ].map(({ title, content }) => (
              <div key={title}>
                <h2 className="font-serif text-2xl text-white mb-4 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-accent-400 flex-shrink-0" />
                  {title}
                </h2>
                <p className="text-navy-200 leading-relaxed">{content}</p>
              </div>
            ))}

            {/* Images */}
            {project.images.length > 1 && (
              <div>
                <h2 className="font-serif text-2xl text-white mb-6 flex items-center gap-3">
                  <span className="w-1 h-6 rounded-full bg-accent-400 flex-shrink-0" />
                  Gallery
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.images.map((img, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden aspect-video border border-white/8">
                      <Image src={img} alt={`${project.title} screenshot ${i + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 50vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Meta */}
            <div className="rounded-xl bg-navy-800/50 border border-white/8 p-6">
              <h3 className="text-xs font-bold uppercase tracking-widest text-navy-200 mb-5">Project Details</h3>
              <dl className="space-y-4">
                <div>
                  <dt className="text-xs text-navy-200 mb-1 flex items-center gap-1.5">
                    <Calendar size={11} className="text-accent-400" /> Year
                  </dt>
                  <dd className="text-white text-sm font-medium">{project.year}</dd>
                </div>
                <div>
                  <dt className="text-xs text-navy-200 mb-1 flex items-center gap-1.5">
                    <Layers size={11} className="text-accent-400" /> Platform
                  </dt>
                  <dd className="text-white text-sm font-medium capitalize">{project.platform}</dd>
                </div>
                <div>
                  <dt className="text-xs text-navy-200 mb-2">Tech Stack</dt>
                  <dd>
                    <div className="flex flex-wrap gap-1.5">
                      {project.stack.map((tech) => (
                        <span key={tech} className="tag-blue text-[11px]">{tech}</span>
                      ))}
                    </div>
                  </dd>
                </div>
              </dl>
            </div>

            {/* Links */}
            <div className="space-y-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full btn-primary"
                >
                  <ExternalLink size={14} /> View Live Project
                </a>
              )}
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 w-full btn-outline"
                >
                  <Github size={14} /> View Source Code
                </a>
              )}
            </div>

            {/* Hire CTA */}
            <div className="rounded-xl bg-accent-400/8 border border-accent-400/20 p-6">
              <h3 className="text-white font-semibold text-sm mb-2">Like what you see?</h3>
              <p className="text-navy-200 text-xs leading-relaxed mb-4">
                I'm available for new projects. Let's discuss yours.
              </p>
              <Link href="/#contact" className="btn-primary w-full justify-center text-xs">
                Get in Touch
              </Link>
            </div>
          </div>
        </div>

        {/* Related projects */}
        <div className="mt-24 pt-16 border-t border-white/8">
          <h2 className="font-serif text-3xl text-white mb-10">More Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((p) => (
              <Link
                key={p.slug}
                href={`/works/${p.slug}`}
                className="group rounded-xl overflow-hidden border border-white/8 bg-navy-800/50 hover:border-white/20 transition-all duration-300 card-hover"
              >
                <div className="relative h-40 overflow-hidden">
                  <Image src={p.thumbnail} alt={p.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="33vw" />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/70 to-transparent" />
                </div>
                <div className="p-5">
                  <p className="text-xs font-medium mb-1" style={{ color: p.industryColor }}>{p.industry}</p>
                  <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-accent-300 transition-colors">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
