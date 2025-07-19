import { createClient } from '@supabase/supabase-js'
import { Signatory } from '@/types/signatory'
import { SignatoryFormValues } from './schemas'
import { getCountryFromLocation } from './countries'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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

    // Calculate countries using improved detection
    const countries = new Set(
      data
        .map(s => getCountryFromLocation(s.location))
        .filter(country => country !== null)
    )

    // Calculate distinct organizations using case-insensitive comparison and trimming
    const uniqueOrganizations = new Set(
      data
        .filter((s) => s.organization)
        .map((s) => (s.organization as string).trim().toLowerCase())
    )

    return {
      total: data.length,
      verified: data.filter(s => s.verified).length,
      organizations: uniqueOrganizations.size,
      individuals: data.filter(s => !s.organization).length,
      recentSignatures: data.filter(s => new Date(s.created_at) > oneDayAgo).length,
      countries: countries.size,
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