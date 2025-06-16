import { NextRequest, NextResponse } from 'next/server'
import { addSignatory } from '@/lib/supabase'
import { SignatoryFormData } from '@/types/signatory'
import { validateEmail, sanitizeInput } from '@/lib/utils'

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
      public: Boolean(body.public),
      location: body.location ? sanitizeInput(body.location) : undefined,
      website: body.website ? sanitizeInput(body.website) : undefined,
      social: {
        twitter: body.social?.twitter ? sanitizeInput(body.social.twitter) : undefined,
        linkedin: body.social?.linkedin ? sanitizeInput(body.social.linkedin) : undefined,
        github: body.social?.github ? sanitizeInput(body.social.github) : undefined,
      },
    }

    // Add to database
    const result = await addSignatory(signatory)

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error || 'Failed to add signature' },
        { status: 500 }
      )
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