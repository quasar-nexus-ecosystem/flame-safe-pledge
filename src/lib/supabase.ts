import { createClient } from '@supabase/supabase-js'
import { Signatory, SignatoryFormData } from '@/types/signatory'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database functions
export async function getSignatories(): Promise<Signatory[]> {
  const { data, error } = await supabase
    .from('signatories')
    .select('*')
    .eq('public', true)
    .order('timestamp', { ascending: false })

  if (error) {
    console.error('Error fetching signatories:', error)
    return []
  }

  return data || []
}

export async function addSignatory(signatory: SignatoryFormData): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('signatories')
      .insert({
        ...signatory,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
        verified: false, // Will be verified by admin
      })

    if (error) {
      console.error('Error adding signatory:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error('Error adding signatory:', error)
    return { success: false, error: 'Failed to add signature' }
  }
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
      recentSignatures: data.filter(s => new Date(s.timestamp) > oneDayAgo).length,
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