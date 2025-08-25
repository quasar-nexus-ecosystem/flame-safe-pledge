import { createClient } from '@supabase/supabase-js'
import { Signatory } from '@/types/signatory'
import { SignatoryFormValues } from './schemas'
import { getCountryFromLocation } from './countries'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database functions
export async function getAllSignatories(): Promise<Signatory[]> {
  const { data, error } = await supabase
    .from('signatories')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    // Log only in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching all signatories:', error)
    }
    
    // Check if it's a permission issue
    if (error.message.includes('permission denied')) {
      console.error('🔒 Database permission issue detected. Please check Supabase RLS policies.')
      return []
    }
    
    return []
  }

  // Log only in development to reduce console spam
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 All signatories in database:', data?.length || 0)
    console.log('📊 Signatories data sample:', data?.slice(0, 2))
  }
  return data || []
}

export async function getSignatories(): Promise<Signatory[]> {
  const { data, error } = await supabase
    .from('signatories')
    .select(`
      id, name, organization, title, message, created_at,
      display_publicly, location, website, social,
      verified
    `)
    .eq('display_publicly', true)
    // Temporarily removed .eq('verified', true) for debugging
    .order('created_at', { ascending: false })

  if (error) {
    // Log only in development to reduce console spam
    if (process.env.NODE_ENV === 'development') {
      console.error('Error fetching signatories:', error)
      console.error('Supabase error details:', error)
    }
    
    // Check if it's a permission issue
    if (error.message.includes('permission denied')) {
      console.error('🔒 Database permission issue detected. Please check Supabase RLS policies.')
      return []
    }
    
    return []
  }

  // Log only in development to reduce console spam
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Fetched signatories from Supabase:', data?.length || 0)
  }
  return data || []
}

export async function getSignatoryStats() {
  try {
    const { data, error } = await supabase
      .from('signatories')
      .select('*')

    if (error) {
      // Log only in development to reduce console spam
      if (process.env.NODE_ENV === 'development') {
        console.error('Error fetching stats:', error)
      }
      
      // Check if it's a permission issue
      if (error.message.includes('permission denied')) {
        console.error('🔒 Database permission issue detected. Please check Supabase RLS policies.')
        return {
          total: 0,
          verified: 0,
          organizations: 0,
          individuals: 0,
          recentSignatures: 0,
          countries: 0,
          error: 'Database access restricted'
        }
      }
      
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

    // Count unique organizations
    const uniqueOrganizations = new Set(
      data
        .filter(s => s.organization && s.organization.trim())
        .map(s => s.organization.trim().toLowerCase())
    )

    return {
      total: data.length,
      verified: data.filter(s => s.verified).length,
      organizations: uniqueOrganizations.size,
      individuals: data.filter(s => !s.organization || !s.organization.trim()).length,
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