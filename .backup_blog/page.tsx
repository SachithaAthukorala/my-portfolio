import { BlogClient } from '@/components/sections/BlogClient'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Thoughts on full-stack development, mobile, desktop apps, photography, and the craft of building great software.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-navy-700">
      {/* Static header */}
      <div className="relative pt-32 pb-0 bg-navy-800/40 border-b border-white/5">
        <div className="absolute inset-0 grid-lines" />
        <div className="relative max-w-7xl mx-auto px-5 md:px-8 pb-0">
          <p className="section-label">Writing</p>
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-5">Blog</h1>
          <p className="text-navy-200 text-xl max-w-2xl leading-relaxed">
            Thoughts on full-stack development, mobile, desktop apps, photography, and the craft
            of building great software.
          </p>
        </div>
      </div>

      {/* Interactive filter + posts */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-16">
        <BlogClient />
      </div>
    </div>
  )
}
