import { NextResponse } from 'next/server'
import { getSignatories } from '@/lib/supabase'

export async function GET() {
  try {
    const signatories = await getSignatories()
    return NextResponse.json({ success: true, data: signatories }, { status: 200 })
  } catch (error) {
    console.error('Error fetching signatories:', error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
} 