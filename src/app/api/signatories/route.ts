import { NextResponse } from 'next/server'
import { getSignatories } from '@/lib/supabase'

export async function GET() {
  try {
    const signatories = await getSignatories()
    return NextResponse.json({ success: true, data: signatories }, { status: 200 })
  } catch (error) {
    // Log only in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching signatories:', error)
    }
    
    // Return graceful fallback instead of 500 error
    return NextResponse.json({ 
      success: false, 
      error: 'Database temporarily unavailable',
      data: []
    }, { status: 200 }) // Return 200 to prevent frontend crashes
  }
} 