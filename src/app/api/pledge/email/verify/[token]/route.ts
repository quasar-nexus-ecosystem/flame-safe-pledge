import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { trackEvent } from '@/lib/posthog'

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

    // 📊 TRACK EMAIL VERIFICATION WITH POSTHOG
    try {
      trackEvent('email_verified', {
        signatory_id: signatory.id,
        has_organization: !!signatory.organization,
        location: signatory.location,
        time_to_verify: signatory.created_at ? 
          Date.now() - new Date(signatory.created_at).getTime() : null,
        timestamp: new Date().toISOString()
      })
      console.log('🎯 PostHog: Email verification tracked')
    } catch (trackingError) {
      console.warn('PostHog tracking failed:', trackingError)
      // Don't fail the request if tracking fails
    }

    console.log('✅ Email verified successfully for:', signatory.email)
    return NextResponse.redirect(new URL('/pledge/verified', request.url))
    
  } catch (error) {
    console.error('Verification error:', error)
    return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
  }
} 