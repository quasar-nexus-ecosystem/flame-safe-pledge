import { NextRequest, NextResponse } from 'next/server'
import { addSignatory } from '@/lib/supabase'
import { SignatoryFormData } from '@/types/signatory'
import { validateEmail, sanitizeInput } from '@/lib/utils'
import { supabase } from '@/lib/supabase'  // Added import of supabase for duplicate check

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.email) {
      return NextResponse.json(
        { success: false, error: 'Email is required' },
        { status: 400 }
      )
    }

    if (!validateEmail(body.email)) {
      return NextResponse.json(
        { success: false, error: 'Invalid email format' },
        { status: 400 }
      )
    }

    // Sanitize inputs
    const signatory: SignatoryFormData = {
      name: body.name ? sanitizeInput(body.name) : undefined,
      email: sanitizeInput(body.email),
      organization: body.organization ? sanitizeInput(body.organization) : undefined,
      title: body.title ? sanitizeInput(body.title) : undefined,
      message: body.message ? sanitizeInput(body.message) : undefined,
      display_publicly: Boolean(body.public),
      location: body.location ? sanitizeInput(body.location) : undefined,
      website: body.website ? sanitizeInput(body.website) : undefined,
      social: {
        twitter: body.social?.twitter ? sanitizeInput(body.social.twitter) : undefined,
        linkedin: body.social?.linkedin ? sanitizeInput(body.social.linkedin) : undefined,
        github: body.social?.github ? sanitizeInput(body.social.github) : undefined,
      },
    }

    // Duplicate email guard
    const { data: existing, error: dupErr } = await supabase
      .from('signatories')
      .select('id')
      .eq('email', signatory.email)
      .maybeSingle();
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Email already pledged' },
        { status: 409 }
      );
    }

    // Add to database
    const result = await addSignatory(signatory)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to add signature' },
        { status: 500 }
      )
    }

    // Send confirmation email via Resend

    if (signatory.email) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/thank-you`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          to: signatory.email,
          name: signatory.name,
          message: signatory.message,
        }),
      })

      // Notify internal team
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/email/internal-notify`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: signatory.name,
          email: signatory.email,
          organization: signatory.organization,
          message: signatory.message,
        }),
      })
    }

    return NextResponse.json({
      success: true,
      message: 'Thank you for signing the Flame-Safe Pledge! Your signature has been recorded.'
    })

  } catch (error) {
    console.error('Error processing signature:', error)
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  return NextResponse.json(
    { 
      message: 'Flame-Safe Pledge API', 
      endpoints: {
        'POST /api/sign': 'Submit a signature',
        'GET /api/signatories': 'Get public signatures'
      }
    },
    { status: 200 }
  )
}