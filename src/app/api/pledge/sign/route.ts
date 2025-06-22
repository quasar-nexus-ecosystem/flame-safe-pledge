import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { signatorySchema } from '@/lib/schemas'
import { sendVerificationEmail } from '@/lib/resend'
import { trackPledgeSign } from '@/lib/posthog'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = signatorySchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: 'Invalid input', details: validation.error.flatten() },
        { status: 400 }
      )
    }

    const { email, display_publicly, name, ...rest } = validation.data

    // Check for duplicate email
    const { data: existing } = await supabase
      .from('signatories')
      .select('id, verified')
      .eq('email', email)
      .maybeSingle()

    if (existing) {
      if (existing.verified) {
        return NextResponse.json(
          {
            error: 'duplicate',
            message:
              'This email has already been used to sign and verify the pledge.',
          },
          { status: 409 }
        )
      }
      // If it exists but is not verified, we'll update and resend verification
      console.log('🔄 Resending verification for existing unverified email:', email)
    }

    const verification_token = crypto.randomUUID()

    if (existing && !existing.verified) {
      // Update existing unverified record
      const { error: updateError } = await supabase
        .from('signatories')
        .update({
          ...rest,
          name,
          display_publicly,
          verification_token,
        })
        .eq('id', existing.id)

      if (updateError) {
        console.error('Supabase update error:', updateError)
        return NextResponse.json(
          { error: 'Database error', message: 'Could not update signature.' },
          { status: 500 }
        )
      }
    } else {
      // Create new record
      const payload = {
        ...rest,
        name,
        email,
        display_publicly,
        verified: false, // email not yet confirmed
        created_at: new Date().toISOString(),
        verification_token,
      }

      const { error: insertError } = await supabase
        .from('signatories')
        .insert(payload)

      if (insertError) {
        console.error('Supabase insert error:', insertError)
        return NextResponse.json(
          { error: 'Database error', message: 'Could not save signature.' },
          { status: 500 }
        )
      }
    }



    // 📊 TRACK PLEDGE SIGNING EVENT WITH POSTHOG
    try {
      trackPledgeSign({
        name: name || 'Anonymous',
        organization: rest.organization,
        location: rest.location,
        verified: false
      })
      console.log('🎯 PostHog: Pledge signing tracked')
    } catch (trackingError) {
      console.warn('PostHog tracking failed:', trackingError)
      // Don't fail the request if tracking fails
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, verification_token)
    } catch (error) {
      console.error('Email sending failed. Full error:', JSON.stringify(error, null, 2))
      return NextResponse.json(
        { error: 'Email error', message: 'Could not send verification email.' },
        { status: 500 }
      )
    }

    const isResend = existing && !existing.verified
    
    return NextResponse.json({
      success: true,
      message: isResend 
        ? '🔄 Verification email resent! Please check your email (including spam folder) for the new verification link.'
        : 'Thank you! Please check your email to verify your signature.',
      isResend,
      ...(process.env.NODE_ENV !== 'production' && {
        token: verification_token,
      }),
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 