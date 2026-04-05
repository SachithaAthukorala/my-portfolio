import { cookies } from 'next/headers'
import { connectDB } from '@/lib/mongodb'
import SiteDataModel from '@/lib/dbModel'

export async function POST(request: Request) {
  try {
    // Check for admin session
    const cookieStore = await cookies()
    const adminSession = cookieStore.get('admin_session')

    if (!adminSession) {
      return Response.json({
        success: false,
        error: 'Unauthorized',
      }, { status: 401 })
    }

    // Parse incoming data
    const body = await request.json()

    // Save to MongoDB
    await connectDB()
    
    // Find existing doc or create new one
    const existing = await SiteDataModel.findById('main').lean() || {}
    
    // Merge new data with existing data
    const mergedData = { ...existing, ...body }
    
    await SiteDataModel.findByIdAndUpdate(
      'main', 
      mergedData, 
      { upsert: true, new: true, runValidators: true }
    )

    return Response.json({
      success: true,
    })
  } catch (error) {
    console.error('Error saving data to MongoDB:', error)
    return Response.json({
      success: false,
      error: 'Failed to save data',
    }, { status: 500 })
  }
}

