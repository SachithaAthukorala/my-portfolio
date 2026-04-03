import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on full-stack development, mobile, desktop apps, photography, and the craft of building great software.',
}

const allCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export default function BlogPage() {
  const featured = blogPosts.find((p) => p.featured)
  const rest = blogPosts.filter((p) => !p.featured)

  return (
    <div className="min-h-screen bg-navy-700">
      {/* Header */}
      <div className="relative pt-32 pb-20 bg-navy-800/40 border-b border-white/5">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-label">Writing</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-5">Blog</h1>
          <p className="text-navy-200 text-xl max-w-2xl leading-relaxed">
            Thoughts on full-stack development, mobile, desktop apps, photography, and
            the craft of building great software.
          </p>

          {/* Category pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {allCategories.map((cat) => (
              <span
                key={cat}
                className={`px-3 py-1 rounded-full text-xs font-medium border transition-all ${
                  cat === 'All'
                    ? 'bg-accent-400 text-white border-accent-400'
                    : 'text-navy-200 border-white/10 hover:border-white/25 hover:text-white cursor-pointer'
                }`}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16">
        {/* Featured post */}
        {featured && (
          <div className="mb-16">
            <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">Featured Post</p>
            <Link href={`/blog/${featured.slug}`} className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-300 card-hover">
              <div className="relative h-72 lg:h-auto">
                <Image
                  src={featured.coverImage}
                  alt={featured.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-navy-800/20" />
              </div>
              <div className="bg-navy-800/50 p-8 lg:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-4">
                  <span className="tag bg-accent-400/10 border-accent-400/25 text-accent-300">
                    {featured.category}
                  </span>
                  <span className="flex items-center gap-1.5 text-xs text-navy-200">
                    <Clock size={11} /> {featured.readingTime} min read
                  </span>
                </div>
                <h2 className="font-serif text-3xl text-white mb-4 leading-tight group-hover:text-accent-300 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-navy-200 leading-relaxed mb-6 text-sm">{featured.excerpt}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-navy-200">{formatDate(featured.publishedAt)}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-300 group-hover:text-white transition-colors">
                    Read article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Post grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {rest.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </div>
    </div>
  )
}

function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden border border-white/8 bg-navy-800/50 hover:border-white/20 transition-all duration-300 card-hover"
    >
      <div className="relative h-48 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
        <div className="absolute bottom-3 left-4">
          <span className="tag bg-navy-900/70 border-white/15 text-white text-[11px] backdrop-blur-sm">
            {post.category}
          </span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center gap-3 mb-3 text-xs text-navy-200">
          <span>{formatDate(post.publishedAt)}</span>
          <span className="w-1 h-1 rounded-full bg-navy-200" />
          <span className="flex items-center gap-1"><Clock size={10} /> {post.readingTime} min</span>
        </div>
        <h3 className="font-serif text-xl text-white mb-3 leading-snug group-hover:text-accent-300 transition-colors flex-1">
          {post.title}
        </h3>
        <p className="text-sm text-navy-200 leading-relaxed mb-5 line-clamp-2">{post.excerpt}</p>

        <div className="flex flex-wrap gap-1.5 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="flex items-center gap-1 text-[11px] text-navy-200">
              <Tag size={9} className="text-accent-400" />{tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1.5 text-xs font-semibold text-accent-300 group-hover:text-white transition-colors mt-auto">
          Read more <ArrowRight size={12} />
        </div>
      </div>
    </Link>
  )
}
