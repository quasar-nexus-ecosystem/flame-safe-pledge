import { NextResponse } from 'next/server'
import { getSignatoryStats } from '@/lib/supabase'

export async function GET() {
  try {
    const stats = await getSignatoryStats()
    
    // getSignatoryStats() returns stats directly, no error property to check
    return NextResponse.json({ success: true, data: stats }, { status: 200 })
  } catch (error) {
    // Log only in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching stats:', error)
    }
    
    // Return proper error status
    return NextResponse.json({ 
      success: false, 
      error: 'Database temporarily unavailable'
    }, { status: 500 })
  }
} 