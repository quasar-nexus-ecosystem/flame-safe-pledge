import React from 'react'
import { PledgeContent } from '@/components/PledgeContent'
import { PledgeForm } from '@/components/PledgeForm'
import { PledgeStats } from '@/components/PledgeStats'
import { CosmicParticles } from '@/components/CosmicParticles'
import { RealtimeNotifications } from '@/components/RealtimeNotifications'
import { getCurrentUser } from '@/lib/auth'
import { getSignatoryStats } from '@/lib/supabase'

// Mark as dynamic since we use cookies for authentication
export const dynamic = 'force-dynamic'

export default async function PledgePage() {
  const user = await getCurrentUser()

  // Fetch stats directly from Supabase instead of API route to avoid URL issues
  let stats = { total: 0, organizations: 0, countries: 0, verified: 0 }
  try {
    stats = await getSignatoryStats()
  } catch (error) {
    console.error('Error fetching stats:', error)
    // Use default stats if there's an error
  }

  return (
    <div className="min-h-screen py-12 relative overflow-hidden">
      {/* Cosmic Background Particles */}
      <CosmicParticles 
        theme="flame" 
        particleCount={60} 
        interactive={true}
        className="fixed inset-0 z-0" 
      />

      {/* REALTIME Live Notifications */}
      <RealtimeNotifications />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Pledge Content - WITHOUT the Read Full Pledge button */}
          <PledgeContent showReadFullButton={false} />
          
          {/* Pledge Form */}
          <PledgeForm user={user} />
          
          {/* Simple Stats at Bottom */}
          <PledgeStats stats={{
            total: stats.total || 0,
            organizations: stats.organizations || 0,
            countries: stats.countries || 0
          }} />
        </div>
      </div>
    </div>
  )
} 