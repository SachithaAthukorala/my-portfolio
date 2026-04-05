import { readFile } from 'fs/promises'
import { join } from 'path'

export async function POST() {
  try {
    const filePath = join(process.cwd(), 'public', 'data.json')
    const data = await readFile(filePath, 'utf-8')
    const parsed = JSON.parse(data)

    return Response.json({
      success: true,
      data: parsed,
    })
  } catch (error) {
    console.error('Error loading data:', error)
    return Response.json({
      success: false,
      error: 'Failed to load data',
    }, { status: 500 })
  }
}
