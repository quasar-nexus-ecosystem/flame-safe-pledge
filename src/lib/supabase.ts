import { createClient } from '@supabase/supabase-js'
import { Signatory } from '@/types/signatory'
import { SignatoryFormValues } from './schemas'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function checkDuplicateEmail(email: string): Promise<{ exists: boolean }> {
  if (!email) {
    return { exists: false }
  }

  const { data, error } = await supabase
    .from('signatories')
    .select('id')
    .eq('email', email)
    .maybeSingle()

  if (error) {
    console.error('Error checking for duplicate email:', error)
    // To be safe, we'll say it doesn't exist if there's an error.
    // This prevents a user from being blocked from signing if the check fails.
    return { exists: false }
  }

  return { exists: !!data }
}

// Database functions
export async function getSignatories(): Promise<Signatory[]> {
  const { data, error } = await supabase
    .from('signatories')
    .select(`
      id, name, organization, title, message, created_at,
      display_publicly, location, website, social,
      verified
    `)
    .eq('display_publicly', true)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching signatories:', error)
    return []
  }

  return data || []
}

export async function getSignatoryStats() {
  try {
    const { data, error } = await supabase
      .from('signatories')
      .select('*')

    if (error) {
      console.error('Error fetching stats:', error)
      return {
        total: 0,
        verified: 0,
        organizations: 0,
        individuals: 0,
        recentSignatures: 0,
        countries: 0,
      }
    }

    const now = new Date()
    const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)

    return {
      total: data.length,
      verified: data.filter(s => s.verified).length,
      organizations: data.filter(s => s.organization).length,
      individuals: data.filter(s => !s.organization).length,
      recentSignatures: data.filter(s => new Date(s.created_at) > oneDayAgo).length,
      countries: new Set(data.map(s => s.location?.split(',')[1]?.trim())).size,
    }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return {
      total: 0,
      verified: 0,
      organizations: 0,
      individuals: 0,
      recentSignatures: 0,
      countries: 0,
    }
  }
} 