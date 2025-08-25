import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
// PostHog removed - tracking disabled

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params

    if (!token) {
      return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
    }

    // Find the signatory with this verification token
    const { data: signatory, error: fetchError } = await supabase
      .from('signatories')
      .select('*')
      .eq('verification_token', token)
      .single()

    if (fetchError || !signatory) {
      console.error('Verification token not found:', fetchError)
      return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
    }

    if (signatory.verified) {
      // Already verified, redirect to success page
      return NextResponse.redirect(new URL('/pledge/verified', request.url))
    }

    // Check if token has expired (48 hours)
    const tokenAge = Date.now() - new Date(signatory.created_at).getTime()
    const maxAge = 48 * 60 * 60 * 1000 // 48 hours in milliseconds
    
    if (tokenAge > maxAge) {
      console.error('Verification token expired:', token)
      return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
    }

    // Update the signatory to mark as verified
    const { error: updateError } = await supabase
      .from('signatories')
      .update({ 
        verified: true, 
        verification_token: null,
        updated_at: new Date().toISOString()
      })
      .eq('id', signatory.id)

    if (updateError) {
      console.error('Failed to verify signatory:', updateError)
      return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
    }

    // Analytics tracking disabled (PostHog removed)
    // Log only in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.log('✅ Email verification completed:', { id: signatory.id, email: signatory.email })
      console.log('✅ Email verified successfully for:', signatory.email)
    }
    return NextResponse.redirect(new URL('/pledge/verified', request.url))
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
  }
} 