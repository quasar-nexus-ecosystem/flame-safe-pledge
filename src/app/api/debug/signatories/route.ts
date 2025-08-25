import { NextResponse } from 'next/server'
import { getAllSignatories } from '@/lib/supabase'

export async function GET() {
  try {
    // Only allow in development or with proper authentication
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { success: false, error: 'Debug endpoint not available in production' },
        { status: 403 }
      )
    }

    const signatories = await getAllSignatories()
    return NextResponse.json({ 
      success: true, 
      data: signatories,
      count: signatories.length 
    }, { status: 200 })
  } catch (error) {
    console.error('Error in debug signatories route:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
} 