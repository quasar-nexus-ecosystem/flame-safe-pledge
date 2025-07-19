'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Users, 
  Building2, 
  Globe, 
  TrendingUp, 
  UserCheck,
  Activity,
  Zap
} from 'lucide-react'

interface MobileAnalyticsProps {
  className?: string
}

interface StatsData {
  total: number
  verified: number
  organizations: number
  individuals: number
  countries: number
  growth: {
    daily: number
    weekly: number
    monthly: number
  }
}

export function MobileAnalyticsDashboard({ className = '' }: MobileAnalyticsProps) {
  const [stats, setStats] = useState<StatsData>({
    total: 0,
    verified: 0,
    organizations: 0,
    individuals: 0,
    countries: 0,
    growth: {
      daily: 0,
      weekly: 0,
      monthly: 0
    }
  })
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        const data = await response.json()
        
        if (data.success) {
          setStats(data.data)
        }
      } catch (error) {
        console.error('Error fetching stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  // Calculate correct percentages for Individual vs Organization breakdown
  const individualRate = stats.total > 0 ? (stats.individuals / stats.total) * 100 : 0
  const organizationRate = stats.total > 0 ? ((stats.total - stats.individuals) / stats.total) * 100 : 0

  if (isLoading) {
    return (
      <div className={`glass-morphism rounded-2xl p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-6 bg-muted rounded w-1/3 mb-6" />
          <div className="grid grid-cols-2 gap-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <div className="h-10 w-10 bg-muted rounded-full" />
                <div className="h-6 bg-muted rounded" />
                <div className="h-4 bg-muted rounded w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`glass-morphism rounded-2xl p-6 ${className}`}
    >
      <h3 className="text-xl font-semibold mb-6 text-center">Analytics Dashboard</h3>
      
      {/* Core Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <StatCard
          icon={Users}
          value={stats.total.toLocaleString()}
          label="Total Signatures"
          color="blue"
        />
        <StatCard
          icon={Zap}
          value={stats.verified.toLocaleString()}
          label="Verified"
          color="green"
        />
        <StatCard
          icon={Building2}
          value={stats.organizations.toLocaleString()}
          label="Organizations"
          color="purple"
        />
        <StatCard
          icon={Globe}
          value={stats.countries.toLocaleString()}
          label="Countries"
          color="orange"
        />
      </div>

      {/* Individual vs Organization Breakdown */}
      <div className="border-t border-white/10 pt-6 mb-6">
        <h4 className="text-lg font-semibold text-center mb-4">Signatory Breakdown</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flame-glow rounded-full p-3 inline-block mb-3">
              <UserCheck className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-xl font-bold text-blue-400 mb-1">
              {individualRate.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Individuals
            </div>
            <div className="text-xs text-muted-foreground/70">
              ({stats.individuals.toLocaleString()})
            </div>
          </div>
          
          <div className="text-center">
            <div className="flame-glow rounded-full p-3 inline-block mb-3">
              <Building2 className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-xl font-bold text-purple-400 mb-1">
              {organizationRate.toFixed(1)}%
            </div>
            <div className="text-xs text-muted-foreground">
              Organizations
            </div>
            <div className="text-xs text-muted-foreground/70">
              ({(stats.total - stats.individuals).toLocaleString()})
            </div>
          </div>
        </div>

        {/* Percentage Verification */}
        <div className="mt-4 p-3 bg-white/5 rounded-lg">
          <div className="text-xs text-center text-muted-foreground">
            Verification: {individualRate.toFixed(1)}% + {organizationRate.toFixed(1)}% = {(individualRate + organizationRate).toFixed(1)}%
          </div>
        </div>
      </div>

      {/* Growth Stats */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-center mb-4">Growth Metrics</h4>
        <div className="grid grid-cols-3 gap-3">
          <GrowthCard
            icon={Activity}
            value={stats.growth.daily}
            label="Daily"
            color="green"
          />
          <GrowthCard
            icon={TrendingUp}
            value={stats.growth.weekly}
            label="Weekly"
            color="blue"
          />
          <GrowthCard
            icon={TrendingUp}
            value={stats.growth.monthly}
            label="Monthly"
            color="purple"
          />
        </div>
      </div>
    </motion.div>
  )
}

// Helper Components
function StatCard({ 
  icon: Icon, 
  value, 
  label, 
  color 
}: { 
  icon: any
  value: string
  label: string
  color: string
}) {
  const colorClasses = {
    blue: 'text-blue-400',
    green: 'text-green-400',
    purple: 'text-purple-400',
    orange: 'text-orange-400'
  }

  return (
    <div className="text-center p-3 rounded-lg bg-white/5">
      <div className="flame-glow rounded-full p-2 inline-block mb-2">
        <Icon className={`h-5 w-5 ${colorClasses[color as keyof typeof colorClasses]}`} />
      </div>
      <div className={`text-lg font-bold ${colorClasses[color as keyof typeof colorClasses]} mb-1`}>
        {value}
      </div>
      <div className="text-xs text-muted-foreground">
        {label}
      </div>
    </div>
  )
}

function GrowthCard({ 
  icon: Icon, 
  value, 
  label, 
  color 
}: { 
  icon: any
  value: number
  label: string
  color: string
}) {
  const colorClasses = {
    green: 'text-green-400',
    blue: 'text-blue-400',
    purple: 'text-purple-400'
  }

  return (
    <div className="text-center p-2 rounded-lg bg-white/5">
      <Icon className={`h-4 w-4 ${colorClasses[color as keyof typeof colorClasses]} mx-auto mb-1`} />
      <div className={`text-sm font-bold ${colorClasses[color as keyof typeof colorClasses]}`}>
        {value > 0 ? '+' : ''}{value}
      </div>
      <div className="text-xs text-muted-foreground">
        {label}
      </div>
    </div>
  )
}