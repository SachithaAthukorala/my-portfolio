import { readFile } from 'fs/promises'
import { join } from 'path'
import { siteConfig, skills, projects, blogPosts, photoCategories, stats, experiences, certifications } from '@/lib/data'

const defaults = { siteConfig, stats, skills, projects, blogPosts, photoCategories, experiences, certifications }

export async function POST() {
  try {
    const filePath = join(process.cwd(), 'public', 'data.json')
    const fileContents = await readFile(filePath, 'utf-8')
    const data = JSON.parse(fileContents)

    return Response.json({ success: true, data })
  } catch (error) {
    console.error('Error loading data from JSON:', error)
    // Fallback to defaults if file doesn't exist yet
    return Response.json({ success: true, data: defaults })
  }
}
