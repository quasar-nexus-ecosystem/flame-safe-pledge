import { NextResponse } from 'next/server'
import { getSignatoryStats } from '@/lib/supabase'

export async function GET() {
  try {
    const stats = await getSignatoryStats()
    return NextResponse.json({ success: true, data: stats }, { status: 200 })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 