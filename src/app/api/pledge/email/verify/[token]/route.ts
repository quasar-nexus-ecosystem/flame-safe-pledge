import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ token: string }> }
) {
  const { token } = await params
  const { searchParams } = new URL(request.url)
  const next = searchParams.get('next') ?? '/pledge/verified'

  if (!token) {
    return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
  }

  try {
    const { data, error } = await supabase
      .from('signatories')
      .update({ verified: true, verification_token: null })
      .eq('verification_token', token)
      .select()
      .single()

    if (error || !data) {
      console.error('Verification error:', error)
      return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
    }

    const redirectUrl = new URL(next, request.url)
    if (data.name) {
      redirectUrl.searchParams.set('name', data.name)
    }

    return NextResponse.redirect(redirectUrl)
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.redirect(new URL('/pledge/invalid-token', request.url))
  }
} 