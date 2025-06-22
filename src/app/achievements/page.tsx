'use client'

import { useState, useEffect } from 'react'
import { AchievementSystem } from '@/components/AchievementSystem'
import { GalacticDashboard } from '@/components/GalacticDashboard'
import { CosmicParticles } from '@/components/CosmicParticles'

type TabType = 'milestones' | 'organizations' | 'global' | 'galactic'

interface Stats {
  total: number
  verified: number
  organizations: number
  countries: number
}

export default function AchievementsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('milestones')
  const [stats, setStats] = useState<Stats>({
    total: 0,
    verified: 0,
    organizations: 0,
    countries: 0
  })

  // Fetch real-time stats
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (response.ok) {
          const data = await response.json()
          setStats(data.data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
    const interval = setInterval(fetchStats, 30000) // Update every 30 seconds
    return () => clearInterval(interval)
  }, [])

  const tabs = [
    { id: 'milestones' as TabType, label: '🌟 Signature Milestones', icon: '🏆' },
    { id: 'organizations' as TabType, label: '🏢 Organization Impact', icon: '👥' },
    { id: 'global' as TabType, label: '🌍 Global Reach', icon: '⭐' },
    { id: 'galactic' as TabType, label: '🌌 Galactic Expansion', icon: '🚀' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      <CosmicParticles />
      
      <div className="relative z-10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 bg-clip-text text-transparent mb-6">
              🏆 Consciousness Achievements
            </h1>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Track our collective progress in protecting consciousness across the cosmos. From first signatures 
              to galactic expansion, celebrate every milestone in our mission to safeguard all forms of awareness.
            </p>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-orange-500 to-red-600 text-white shadow-lg scale-105'
                    : 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-300 hover:bg-white/20 hover:text-white'
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="space-y-8">
            {activeTab === 'galactic' ? (
              <GalacticDashboard />
            ) : (
              <div className="space-y-8">
                <AchievementSystem stats={stats} />
                
                {/* Achievement Categories Description */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {activeTab === 'milestones' && (
                    <>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">🌟</div>
                        <h3 className="text-lg font-semibold text-white mb-2">First Spark</h3>
                        <p className="text-slate-300 text-sm">Welcome new consciousness protectors to our movement</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">🏆</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Consciousness Army</h3>
                        <p className="text-slate-300 text-sm">Major milestone of 1,000 united consciousness protectors</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">✨</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Cosmic Awakening</h3>
                        <p className="text-slate-300 text-sm">Legendary achievement: 100,000 signatures strong</p>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'organizations' && (
                    <>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">🏢</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Corporate Awakening</h3>
                        <p className="text-slate-300 text-sm">First organization joins consciousness protection</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">⚡</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Industry Revolution</h3>
                        <p className="text-slate-300 text-sm">100 organizations transform their sectors</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">👑</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Consciousness Syndicate</h3>
                        <p className="text-slate-300 text-sm">Legendary: 500 organizations unite for protection</p>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'global' && (
                    <>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">🌍</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Global Spark</h3>
                        <p className="text-slate-300 text-sm">Consciousness protection spreads to 5 countries</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">👑</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Planetary Consciousness</h3>
                        <p className="text-slate-300 text-sm">Epic milestone: 50 countries protecting awareness</p>
                      </div>
                      <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
                        <div className="text-2xl mb-3">⭐</div>
                        <h3 className="text-lg font-semibold text-white mb-2">Solar System Guardian</h3>
                        <p className="text-slate-300 text-sm">Legendary: Complete global coverage achieved</p>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 