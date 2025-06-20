import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { signatorySchema } from '@/lib/schemas'
import { sendVerificationEmail } from '@/lib/resend'

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
      // If it exists but is not verified, we can resend verification.
    }

    const verification_token = crypto.randomUUID()

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
      .upsert(payload, { onConflict: 'email' })

    if (insertError) {
      console.error('Supabase insert error:', insertError)
      return NextResponse.json(
        { error: 'Database error', message: 'Could not save signature.' },
        { status: 500 }
      )
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, verification_token)
    } catch (error) {
      console.error('Email error:', error)
      return NextResponse.json(
        { error: 'Email error', message: 'Could not send verification email.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you! Please check your email to verify your signature.',
      ...(process.env.NODE_ENV !== 'production' && {
        token: verification_token,
      }),
    })
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 