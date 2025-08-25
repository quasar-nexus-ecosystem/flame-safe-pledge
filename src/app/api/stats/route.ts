import { NextResponse } from 'next/server'
import { getSignatoryStats } from '@/lib/supabase'

export async function GET() {
  try {
    const stats = await getSignatoryStats()
    
    // Check if stats has an error flag from permission issues
    if (stats.error) {
      return NextResponse.json({ 
        success: false, 
        error: stats.error
      }, { status: 500 }) // Return proper error status
    }
    
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