import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'
import { sendVerificationEmail } from '@/lib/resend'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      )
    }

    // Find the signatory
    const { data: signatory, error: fetchError } = await supabase
      .from('signatories')
      .select('id, email, verified, verification_token')
      .eq('email', email)
      .single()

    if (fetchError || !signatory) {
      return NextResponse.json(
        { error: 'Email not found. Please sign the pledge first.' },
        { status: 404 }
      )
    }

    if (signatory.verified) {
      return NextResponse.json(
        { error: 'This email is already verified!' },
        { status: 400 }
      )
    }

    // Generate new verification token
    const verification_token = crypto.randomUUID()

    // Update with new token
    const { error: updateError } = await supabase
      .from('signatories')
      .update({ 
        verification_token,
        updated_at: new Date().toISOString()
      })
      .eq('id', signatory.id)

    if (updateError) {
      console.error('Failed to update verification token:', updateError)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

    // Send verification email
    try {
      await sendVerificationEmail(email, verification_token)
    } catch (error) {
      console.error('Email sending failed:', error)
      return NextResponse.json(
        { error: 'Could not send verification email.' },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: '🔄 New verification email sent! Please check your inbox and spam folder.',
    })
  } catch (error) {
    console.error('Resend verification error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
} 