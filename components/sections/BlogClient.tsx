'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Clock, ArrowRight, Tag } from 'lucide-react'
import { blogPosts } from '@/lib/data'
import { formatDate } from '@/lib/utils'

const allCategories = ['All', ...Array.from(new Set(blogPosts.map((p) => p.category)))]

export function BlogClient() {
    const [active, setActive] = useState('All')

    const filtered =
        active === 'All'
            ? blogPosts
            : blogPosts.filter((p) => p.category === active)

    const featured = filtered.find((p) => p.featured) ?? filtered[0]
    const rest = filtered.filter((p) => p.slug !== featured?.slug)

    return (
        <>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2 mt-8">
                {allCategories.map((cat) => (
                    <button
                        key={cat}
                        onClick={() => setActive(cat)}
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200 ${active === cat
                                ? 'bg-accent-400 text-white border-accent-400 shadow-[0_0_16px_rgba(59,125,216,0.35)]'
                                : 'text-navy-200 border-white/10 hover:border-white/30 hover:text-white bg-transparent'
                            }`}
                    >
                        {cat}
                    </button>
                ))}
                <span className="ml-auto self-center text-xs text-navy-200">
                    {filtered.length} post{filtered.length !== 1 ? 's' : ''}
                </span>
            </div>

            {/* Posts */}
            <div className="mt-12">
                {filtered.length === 0 ? (
                    <div className="text-center py-24 text-navy-200">
                        No posts in this category yet.
                    </div>
                ) : (
                    <>
                        {/* Featured — only show when it's featured and visible */}
                        {featured && featured.featured && active === 'All' && (
                            <div className="mb-12">
                                <p className="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">
                                    Featured Post
                                </p>
                                <Link
                                    href={`/blog/${featured.slug}`}
                                    className="group grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-2xl overflow-hidden border border-white/8 hover:border-white/20 transition-all duration-300 card-hover"
                                >
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
                                        <p className="text-navy-200 leading-relaxed mb-6 text-sm">
                                            {featured.excerpt}
                                        </p>
                                        <div className="flex items-center justify-between">
                                            <span className="text-xs text-navy-200">
                                                {formatDate(featured.publishedAt)}
                                            </span>
                                            <span className="flex items-center gap-1.5 text-sm font-semibold text-accent-300 group-hover:text-white transition-colors">
                                                Read article <ArrowRight size={14} />
                                            </span>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        )}

                        {/* Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                            {(active === 'All' ? rest : filtered).map((post) => (
                                <BlogCard key={post.slug} post={post} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </>
    )
}

function BlogCard({ post }: { post: (typeof blogPosts)[0] }) {
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
                    <span className="flex items-center gap-1">
                        <Clock size={10} /> {post.readingTime} min
                    </span>
                </div>

                <h3 className="font-serif text-xl text-white mb-3 leading-snug group-hover:text-accent-300 transition-colors flex-1">
                    {post.title}
                </h3>

                <p className="text-sm text-navy-200 leading-relaxed mb-5 line-clamp-2">
                    {post.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                    {post.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="flex items-center gap-1 text-[11px] text-navy-200">
                            <Tag size={9} className="text-accent-400" />
                            {tag}
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
