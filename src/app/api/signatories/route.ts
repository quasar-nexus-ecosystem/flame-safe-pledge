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
    
    // Return proper error status
    return NextResponse.json({ 
      success: false, 
      error: 'Database temporarily unavailable'
    }, { status: 500 })
  }
} 