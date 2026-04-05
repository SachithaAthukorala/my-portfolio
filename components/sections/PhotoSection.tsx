'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { ArrowRight, Camera } from 'lucide-react'
import { loadData } from '@/lib/store'
import type { SiteData } from '@/lib/store'

export function PhotoSection() {
  const [data, setData] = useState<SiteData | null>(null)

  useEffect(() => {
    loadData().then(setData)
  }, [])

  const photoCategories = data?.photoCategories || []

  return (
    <section id="photography" className="py-28 bg-navy-700 relative">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16">
          <div>
            <p className="section-label">Creative Work</p>
            <h2 className="font-serif text-4xl md:text-5xl text-white leading-[1.1]">
              Photography
            </h2>
            <p className="text-navy-200 mt-4 max-w-lg leading-relaxed">
              A creative practice that sharpens my eye for composition, light, and storytelling —
              skills that directly enhance my design sensibility.
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-navy-200 flex-shrink-0">
            <Camera size={14} className="text-gold-500" />
            <span>200+ published photographs</span>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {photoCategories.map((cat, i) => (
            <div
              key={cat.name}
              className={`group relative rounded-xl overflow-hidden cursor-pointer border border-white/8 hover:border-white/20 transition-all duration-300 card-hover ${
                i === 0 ? 'col-span-2 md:col-span-1 row-span-2' : ''
              }`}
            >
              <div className={`relative w-full ${i === 0 ? 'h-80' : 'h-44'}`}>
                <Image
                  src={cat.cover}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/20 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold text-sm">{cat.name}</p>
                <p className="text-navy-200 text-xs">{cat.count} photos</p>
              </div>
              <div className="absolute inset-0 bg-accent-400/0 group-hover:bg-accent-400/5 transition-colors duration-300" />
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/#photography" className="btn-outline inline-flex">
            View Full Gallery <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
