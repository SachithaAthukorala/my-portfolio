import { connectDB } from '@/lib/mongodb'
import SiteDataModel from '@/lib/dbModel'
import { siteConfig, skills, projects, blogPosts, photoCategories, stats, experiences, certifications } from '@/lib/data'

const defaults = { siteConfig, stats, skills, projects, blogPosts, photoCategories, experiences, certifications }

export async function POST() {
  try {
    await connectDB()

    const doc = await SiteDataModel.findById('main').lean()

    if (!doc) {
      // First run — return defaults (will be saved on first admin save)
      return Response.json({ success: true, data: defaults })
    }

    // Strip mongoose internal fields and merge with defaults!
    // This prevents existing data from disappearing if MongoDB only has a partial save.
    const { _id, __v, createdAt, updatedAt, ...dbData } = doc as any
    const mergedData = { ...defaults, ...dbData }
    
    return Response.json({ success: true, data: mergedData })
  } catch (error) {
    console.error('Error loading data from MongoDB:', error)
    // Fallback to defaults so the site still works
    return Response.json({ success: true, data: defaults })
  }
}

