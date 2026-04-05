import { connectDB } from '@/lib/mongodb'
import SiteDataModel from '@/lib/dbModel'
import { siteConfig, skills, projects, blogPosts, photoCategories, stats, experiences, certifications } from '@/lib/data'

const defaults = { siteConfig, stats, skills, projects, blogPosts, photoCategories, experiences, certifications }

export async function POST() {
  try {
    await connectDB()

    const doc = await SiteDataModel.findById('main').lean()

    if (!doc) {
      return Response.json({ success: true, data: defaults })
    }

    const { _id, __v, createdAt, updatedAt, ...dbData } = doc as any
    const mergedData = { ...defaults } as any
    
    // Smart merge: if the database has an empty array but our default has data, keep the default data.
    // This fixes the issue where MongoDB saving an empty `blogPosts: []` overrides the default blogs.
    for (const key of Object.keys(dbData)) {
      if (Array.isArray(dbData[key]) && dbData[key].length === 0 && Array.isArray(defaults[key as keyof typeof defaults]) && (defaults[key as keyof typeof defaults] as any[]).length > 0) {
        // Keep default
        continue
      }
      mergedData[key] = dbData[key]
    }
    
    return Response.json({ success: true, data: mergedData })
  } catch (error) {
    console.error('Error loading data from MongoDB:', error)
    // Fallback to defaults so the site still works
    return Response.json({ success: true, data: defaults })
  }
}

