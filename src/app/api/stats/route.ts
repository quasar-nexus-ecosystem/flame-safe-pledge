import { NextResponse } from 'next/server'
import { getSignatoryStats } from '@/lib/supabase'

export async function GET() {
  try {
    const stats = await getSignatoryStats()
    
    // Check if stats has an error flag from permission issues
    if (stats.error) {
      return NextResponse.json({ 
        success: false, 
        error: stats.error,
        data: {
          total: 0,
          verified: 0,
          organizations: 0,
          individuals: 0,
          recentSignatures: 0,
          countries: 0,
        }
      }, { status: 200 }) // Return 200 with error message to prevent frontend crashes
    }
    
    return NextResponse.json({ success: true, data: stats }, { status: 200 })
  } catch (error) {
    // Log only in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching stats:', error)
    }
    
    // Return graceful fallback instead of 500 error
    return NextResponse.json({ 
      success: false, 
      error: 'Database temporarily unavailable',
      data: {
        total: 0,
        verified: 0,
        organizations: 0,
        individuals: 0,
        recentSignatures: 0,
        countries: 0,
      }
    }, { status: 200 }) // Return 200 to prevent frontend crashes
  }
} 