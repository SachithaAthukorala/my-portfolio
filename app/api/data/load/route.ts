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

    // Strip mongoose internal fields
    const { _id, __v, createdAt, updatedAt, ...data } = doc as any
    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Error loading data from MongoDB:', error)
    // Fallback to defaults so the site still works
    return Response.json({ success: true, data: defaults })
  }
}

