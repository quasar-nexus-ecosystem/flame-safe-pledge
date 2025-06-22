import React from 'react'
import { PledgeContent } from '@/components/PledgeContent'
import { PledgeForm } from '@/components/PledgeForm'
import { CosmicParticles } from '@/components/CosmicParticles'
import { AchievementSystem } from '@/components/AchievementSystem'
import { AdvancedStatsDashboard } from '@/components/AdvancedStatsDashboard'
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
          {/* Compact Analytics and Achievements */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
            <AdvancedStatsDashboard showCompact={true} />
            <AchievementSystem 
              showMini={true}
              stats={{
                total: stats.total || 0,
                verified: stats.verified || Math.floor((stats.total || 0) * 0.78),
                organizations: stats.organizations || 0,
                countries: stats.countries || 0
              }} 
            />
          </div>
          
          <PledgeContent />
          <PledgeForm user={user} />
        </div>
      </div>
    </div>
  )
} 