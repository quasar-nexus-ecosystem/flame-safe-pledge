'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { getCountryFromLocation, getCountryFlag } from '@/lib/countries'
import { 
  TrendingUp, 
  Globe, 
  Users, 
  Building2, 
  Activity, 
  MapPin,
  Clock,
  Eye,
  MousePointer,
  Zap,
  Star,
  Shield,
  Heart,
  Sparkles
} from 'lucide-react'

interface MobileStats {
  total: number
  verified: number
  organizations: number
  individuals: number
  countries: number
  recentSignatures: number
}

interface MobileAnalyticsDashboardProps {
  className?: string
}

export function MobileAnalyticsDashboard({ className = '' }: MobileAnalyticsDashboardProps) {
  const [stats, setStats] = useState<MobileStats>({
    total: 0,
    verified: 0,
    organizations: 0,
    individuals: 0,
    countries: 0,
    recentSignatures: 0
  })
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('overview')
  const [topCountries, setTopCountries] = useState<Array<{name: string, count: number, flag: string}>>([])

  useEffect(() => {
    const fetchMobileStats = async () => {
      try {
        setIsLoading(true)
        
        // Fetch base stats
        const statsRes = await fetch('/api/stats', { cache: 'no-store' })
        const statsData = await statsRes.json()
        
        if (statsData.success) {
          setStats(statsData.data)
        }

        // Fetch signatories for geographic analysis
        const { data: signatories, error } = await supabase
          .from('signatories')
          .select('*')
          .eq('display_publicly', true)

        if (!error && signatories) {
          // Calculate top countries
          const countryStats = signatories.reduce((acc, s) => {
            if (s.location) {
              const country = getCountryFromLocation(s.location)
              if (country) {
                acc[country] = (acc[country] || 0) + 1
              }
            }
            return acc
          }, {} as Record<string, number>)

          const countries = Object.entries(countryStats)
            .map(([name, count]) => ({
              name,
              count: count as number,
              flag: getCountryFlag(name)
            }))
            .sort((a, b) => b.count - a.count)
            .slice(0, 5)

          setTopCountries(countries)
        }
      } catch (error) {
        console.error('Error fetching mobile stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMobileStats()
  }, [])

  const formatNumber = (num: number) => {
    if (isLoading) return '—'
    return num.toLocaleString()
  }

  const sections = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'geographic', label: 'Global', icon: Globe },
    { id: 'insights', label: 'Insights', icon: TrendingUp }
  ]

  return (
    <div className={`w-full ${className}`}>
      {/* Mobile Navigation Tabs */}
      <div className="flex justify-center mb-6">
        <div className="flex bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === section.id
                    ? 'bg-flame-500 text-white shadow-lg'
                    : 'text-muted-foreground hover:text-white'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{section.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Content Sections */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="space-y-6"
        >
          {activeSection === 'overview' && (
            <OverviewSection stats={stats} isLoading={isLoading} formatNumber={formatNumber} />
          )}
          
          {activeSection === 'geographic' && (
            <GeographicSection topCountries={topCountries} isLoading={isLoading} formatNumber={formatNumber} />
          )}
          
          {activeSection === 'insights' && (
            <InsightsSection stats={stats} isLoading={isLoading} formatNumber={formatNumber} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function OverviewSection({ stats, isLoading, formatNumber }: { 
  stats: MobileStats; 
  isLoading: boolean; 
  formatNumber: (num: number) => string 
}) {
  return (
    <div className="space-y-4">
      {/* Main Stats Cards */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-4 border border-blue-500/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Users className="h-5 w-5 text-blue-400" />
            <span className="text-sm font-medium text-blue-200">Total</span>
          </div>
          <div className="text-2xl font-bold text-blue-100">
            {formatNumber(stats.total)}
          </div>
          <div className="text-xs text-blue-300 mt-1">
            {stats.verified > 0 && `${formatNumber(stats.verified)} verified`}
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-4 border border-green-500/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Building2 className="h-5 w-5 text-green-400" />
            <span className="text-sm font-medium text-green-200">Organizations</span>
          </div>
          <div className="text-2xl font-bold text-green-100">
            {formatNumber(stats.organizations)}
          </div>
          <div className="text-xs text-green-300 mt-1">
            {formatNumber(stats.individuals)} individuals
          </div>
        </motion.div>
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div 
          className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-4 border border-purple-500/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Globe className="h-5 w-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-200">Countries</span>
          </div>
          <div className="text-2xl font-bold text-purple-100">
            {formatNumber(stats.countries)}
          </div>
        </motion.div>

        <motion.div 
          className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-4 border border-orange-500/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flex items-center gap-3 mb-2">
            <Clock className="h-5 w-5 text-orange-400" />
            <span className="text-sm font-medium text-orange-200">Recent</span>
          </div>
          <div className="text-2xl font-bold text-orange-100">
            {formatNumber(stats.recentSignatures)}
          </div>
          <div className="text-xs text-orange-300 mt-1">
            Last 24h
          </div>
        </motion.div>
      </div>
    </div>
  )
}

function GeographicSection({ topCountries, isLoading, formatNumber }: { 
  topCountries: Array<{name: string, count: number, flag: string}>; 
  isLoading: boolean; 
  formatNumber: (num: number) => string 
}) {
  return (
    <div className="space-y-4">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Global Distribution</h3>
        <p className="text-sm text-muted-foreground">Top countries by signatures</p>
      </div>

      <div className="space-y-3">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-8 h-6 bg-white/10 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-white/10 rounded w-24 mb-2"></div>
                  <div className="h-3 bg-white/10 rounded w-16"></div>
                </div>
              </div>
            </div>
          ))
        ) : topCountries.length > 0 ? (
          topCountries.map((country, index) => (
            <motion.div
              key={country.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <div className="font-medium text-white">{country.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {formatNumber(country.count)} signatures
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-bold text-flame-400">
                    #{index + 1}
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-8">
            <Globe className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">No geographic data available yet</p>
          </div>
        )}
      </div>
    </div>
  )
}

function InsightsSection({ stats, isLoading, formatNumber }: { 
  stats: MobileStats; 
  isLoading: boolean; 
  formatNumber: (num: number) => string 
}) {
  const verificationRate = stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0
  const individualRate = stats.total > 0 ? Math.round((stats.individuals / stats.total) * 100) : 0
  const organizationRate = stats.total > 0 ? Math.round((stats.organizations / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-white mb-2">Key Insights</h3>
        <p className="text-sm text-muted-foreground">Analytics and trends</p>
      </div>

      {/* Verification Rate */}
      <motion.div 
        className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 rounded-xl p-4 border border-blue-500/20"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Star className="h-5 w-5 text-blue-400" />
          <span className="font-medium text-blue-200">Verification Rate</span>
        </div>
        <div className="text-3xl font-bold text-blue-100 mb-2">
          {isLoading ? '—' : `${verificationRate}%`}
        </div>
        <div className="text-sm text-blue-300">
          {formatNumber(stats.verified)} of {formatNumber(stats.total)} signatures verified
        </div>
      </motion.div>

      {/* Individual vs Organization Split */}
      <motion.div 
        className="bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-xl p-4 border border-green-500/20"
        whileHover={{ scale: 1.01 }}
      >
        <div className="flex items-center gap-3 mb-3">
          <Users className="h-5 w-5 text-green-400" />
          <span className="font-medium text-green-200">Signature Types</span>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-100 mb-1">
              {isLoading ? '—' : `${individualRate}%`}
            </div>
            <div className="text-xs text-green-300">Individuals</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-100 mb-1">
              {isLoading ? '—' : `${organizationRate}%`}
            </div>
            <div className="text-xs text-green-300">Organizations</div>
          </div>
        </div>
      </motion.div>

      {/* Recent Activity */}
      {stats.recentSignatures > 0 && (
        <motion.div 
          className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 rounded-xl p-4 border border-orange-500/20"
          whileHover={{ scale: 1.01 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <TrendingUp className="h-5 w-5 text-orange-400" />
            <span className="font-medium text-orange-200">Recent Activity</span>
          </div>
          <div className="text-3xl font-bold text-orange-100 mb-2">
            {formatNumber(stats.recentSignatures)}
          </div>
          <div className="text-sm text-orange-300">
            New signatures in the last 24 hours
          </div>
        </motion.div>
      )}
    </div>
  )
}