import { readFile, writeFile } from 'fs/promises'
import { join } from 'path'
import { cookies } from 'next/headers'
import { execSync } from 'child_process'

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

    // Parse request
    const body = await request.json()

    // Read current data
    const filePath = join(process.cwd(), 'public', 'data.json')
    const currentData = JSON.parse(await readFile(filePath, 'utf-8'))

    // Merge new data
    const merged = { ...currentData, ...body }

    // Write back to file
    await writeFile(filePath, JSON.stringify(merged, null, 2))

    // Auto-commit to git
    try {
      execSync('git add public/data.json', { cwd: process.cwd() })
      execSync(
        `git commit -m "Update portfolio data: ${new Date().toISOString()}"`,
        { cwd: process.cwd() }
      )
    } catch (gitError) {
      console.warn('Git commit failed (non-critical):', gitError)
      // Don't fail the API response if git commit fails
    }

    return Response.json({
      success: true,
    })
  } catch (error) {
    console.error('Error saving data:', error)
    return Response.json({
      success: false,
      error: 'Failed to save data',
    }, { status: 500 })
  }
}
