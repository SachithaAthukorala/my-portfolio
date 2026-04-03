import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: { slug: string }
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.excerpt,
  }
}

// Minimal markdown-to-HTML renderer (no external deps)
function renderMarkdown(md: string): string {
  return md
    .trim()
    // code blocks
    .replace(/```(\w*)\n([\s\S]*?)```/g, (_m, _lang, code) =>
      `<pre><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`
    )
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // horizontal rule
    .replace(/^---$/gm, '<hr>')
    // tables (basic)
    .replace(/\|(.+)\|\n\|[-| :]+\|\n((?:\|.+\|\n?)*)/g, (_m, header, body) => {
      const headers = header.split('|').map((h: string) => h.trim()).filter(Boolean)
      const rows = body.trim().split('\n').map((row: string) =>
        row.split('|').map((c: string) => c.trim()).filter(Boolean)
      )
      const thead = `<tr>${headers.map((h: string) => `<th>${h}</th>`).join('')}</tr>`
      const tbody = rows.map((row: string[]) => `<tr>${row.map((c: string) => `<td>${c}</td>`).join('')}</tr>`).join('')
      return `<table><thead>${thead}</thead><tbody>${tbody}</tbody></table>`
    })
    // unordered lists
    .replace(/((?:^- .+\n?)+)/gm, (match) => {
      const items = match.trim().split('\n').map((i) => `<li>${i.replace(/^- /, '')}</li>`).join('')
      return `<ul>${items}</ul>`
    })
    // ordered lists
    .replace(/((?:^\d+\. .+\n?)+)/gm, (match) => {
      const items = match.trim().split('\n').map((i) => `<li>${i.replace(/^\d+\. /, '')}</li>`).join('')
      return `<ol>${items}</ol>`
    })
    // paragraphs
    .split(/\n{2,}/)
    .map((block) => {
      const trimmed = block.trim()
      if (!trimmed) return ''
      if (/^<(h[1-6]|ul|ol|pre|hr|table)/.test(trimmed)) return trimmed
      return `<p>${trimmed.replace(/\n/g, ' ')}</p>`
    })
    .join('\n')
}

export default function BlogPostPage({ params }: Props) {
  const post = blogPosts.find((p) => p.slug === params.slug)
  if (!post) notFound()

  const related = blogPosts
    .filter((p) => p.slug !== post.slug && (p.category === post.category || p.tags.some((t) => post.tags.includes(t))))
    .slice(0, 2)

  const html = renderMarkdown(post.content)

  return (
    <div className="min-h-screen bg-navy-700">
      {/* Cover */}
      <div className="relative h-[45vh] min-h-[360px]">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-700 via-navy-700/50 to-navy-900/70" />
        <div className="absolute bottom-0 left-0 right-0 max-w-4xl mx-auto px-5 md:px-8 pb-10">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-xs text-navy-200 hover:text-white mb-6 transition-colors">
            <ArrowLeft size={13} /> Back to Blog
          </Link>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="tag bg-accent-400/15 border-accent-400/30 text-accent-300">{post.category}</span>
            <span className="flex items-center gap-1.5 text-xs text-navy-200">
              <Clock size={11} /> {post.readingTime} min read
            </span>
            <span className="flex items-center gap-1.5 text-xs text-navy-200">
              <Calendar size={11} /> {formatDate(post.publishedAt)}
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-white leading-tight">{post.title}</h1>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Article */}
          <article className="lg:col-span-3">
            <p className="text-navy-200 text-lg leading-relaxed mb-10 italic border-l-2 border-accent-400 pl-5">
              {post.excerpt}
            </p>
            <div
              className="prose-custom"
              dangerouslySetInnerHTML={{ __html: html }}
            />

            {/* Tags */}
            <div className="mt-12 pt-8 border-t border-white/8">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-white/10 text-xs text-navy-200 hover:text-white hover:border-white/25 transition-all cursor-pointer">
                    <Tag size={10} className="text-accent-400" /> {tag}
                  </span>
                ))}
              </div>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Author */}
            <div className="rounded-xl bg-navy-800/50 border border-white/8 p-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent-400/20 border border-accent-400/30 flex items-center justify-center text-accent-300 font-serif font-bold text-sm">
                  SA
                </div>
                <div>
                  <p className="text-white text-sm font-semibold">Sachitha Athukorala</p>
                  <p className="text-navy-200 text-xs">Full-Stack Developer</p>
                </div>
              </div>
              <p className="text-navy-200 text-xs leading-relaxed">
                Writing about web, mobile, desktop development, and photography from Sri Lanka.
              </p>
            </div>

            {/* Related */}
            {related.length > 0 && (
              <div className="rounded-xl bg-navy-800/50 border border-white/8 p-5">
                <h3 className="text-xs font-bold uppercase tracking-widest text-navy-200 mb-4">Related Posts</h3>
                <div className="space-y-4">
                  {related.map((r) => (
                    <Link key={r.slug} href={`/blog/${r.slug}`} className="group block">
                      <p className="text-white text-sm font-medium leading-snug group-hover:text-accent-300 transition-colors mb-1">{r.title}</p>
                      <p className="text-xs text-navy-200 flex items-center gap-1.5">
                        <Clock size={10} /> {r.readingTime} min read
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA */}
            <div className="rounded-xl bg-accent-400/8 border border-accent-400/20 p-5">
              <h3 className="text-white font-semibold text-sm mb-2">Hire me</h3>
              <p className="text-navy-200 text-xs leading-relaxed mb-4">
                Need a full-stack developer? Let's talk about your project.
              </p>
              <Link href="/#contact" className="btn-primary w-full justify-center text-xs">
                Get in Touch <ArrowRight size={12} />
              </Link>
            </div>
          </aside>
        </div>

        {/* Next/prev navigation */}
        <div className="mt-20 pt-12 border-t border-white/8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogPosts.indexOf(post) > 0 && (() => {
            const prev = blogPosts[blogPosts.indexOf(post) - 1]
            return (
              <Link href={`/blog/${prev.slug}`} className="group p-5 rounded-xl bg-navy-800/50 border border-white/8 hover:border-white/20 transition-all">
                <p className="text-xs text-navy-200 mb-2 flex items-center gap-1.5"><ArrowLeft size={11} /> Previous</p>
                <p className="text-white text-sm font-semibold leading-snug group-hover:text-accent-300 transition-colors">{prev.title}</p>
              </Link>
            )
          })()}
          {blogPosts.indexOf(post) < blogPosts.length - 1 && (() => {
            const next = blogPosts[blogPosts.indexOf(post) + 1]
            return (
              <Link href={`/blog/${next.slug}`} className="group p-5 rounded-xl bg-navy-800/50 border border-white/8 hover:border-white/20 transition-all text-right ml-auto w-full">
                <p className="text-xs text-navy-200 mb-2 flex items-center gap-1.5 justify-end">Next <ArrowRight size={11} /></p>
                <p className="text-white text-sm font-semibold leading-snug group-hover:text-accent-300 transition-colors">{next.title}</p>
              </Link>
            )
          })()}
        </div>
      </div>
    </div>
  )
}
