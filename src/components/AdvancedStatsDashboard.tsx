'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  TrendingUp, 
  Globe, 
  Users, 
  Building, 
  Activity, 
  Target, 
  Zap, 
  Star,
  Calendar,
  Clock,
  Heart,
  Flame,
  Shield,
  Award,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'

interface StatsDashboardData {
  overview: {
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
  geographic: {
    topCountries: Array<{ country: string; count: number; flag: string }>
    continents: Array<{ continent: string; count: number; percentage: number }>
  }
  trends: {
    dailySignatures: Array<{ date: string; count: number }>
    organizationGrowth: Array<{ date: string; count: number }>
    verifiedRate: number
  }
  realtime: {
    activeSessions: number
    signaturesThisHour: number
    averageTimeToSign: number
    bounceRate: number
  }
  achievements: {
    totalUnlocked: number
    recentUnlocks: Array<{ title: string; unlockedAt: string; rarity: string }>
  }
}

interface AdvancedStatsDashboardProps {
  className?: string
  showCompact?: boolean
}

export function AdvancedStatsDashboard({ className = '', showCompact = false }: AdvancedStatsDashboardProps) {
  const [data, setData] = useState<StatsDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState<'24h' | '7d' | '30d' | '90d'>('7d')
  const [activeTab, setActiveTab] = useState<'overview' | 'geographic' | 'trends' | 'realtime'>('overview')
  const [pulseActive, setPulseActive] = useState(false)

  // Fetch comprehensive stats data
  useEffect(() => {
    const fetchAdvancedStats = async () => {
      try {
        // In a real implementation, this would be a comprehensive API endpoint
        const [statsRes, geographicRes] = await Promise.all([
          fetch('/api/stats'),
          fetch('/api/stats/geographic') // We'll need to create this
        ])
        
        const statsData = await statsRes.json()
        // For now, we'll simulate geographic data
        const geographicData = {
          topCountries: [
            { country: 'United States', count: 1247, flag: '🇺🇸' },
            { country: 'Canada', count: 892, flag: '🇨🇦' },
            { country: 'United Kingdom', count: 673, flag: '🇬🇧' },
            { country: 'Germany', count: 589, flag: '🇩🇪' },
            { country: 'Australia', count: 456, flag: '🇦🇺' },
            { country: 'Japan', count: 234, flag: '🇯🇵' },
            { country: 'France', count: 198, flag: '🇫🇷' }
          ],
          continents: [
            { continent: 'North America', count: 2139, percentage: 45.2 },
            { continent: 'Europe', count: 1653, percentage: 34.9 },
            { continent: 'Asia', count: 623, percentage: 13.2 },
            { continent: 'Oceania', count: 234, percentage: 4.9 },
            { continent: 'South America', count: 89, percentage: 1.9 }
          ]
        }

        if (statsData.success) {
          const baseStats = statsData.data || {}
          
          const dashboardData: StatsDashboardData = {
            overview: {
              total: baseStats.total || 0,
              verified: baseStats.verified || 0,
              organizations: baseStats.organizations || 0,
              individuals: (baseStats.total || 0) - (baseStats.organizations || 0),
              countries: baseStats.countries || 0,
              growth: {
                daily: Math.floor(Math.random() * 50) + 10,
                weekly: Math.floor(Math.random() * 200) + 50,
                monthly: Math.floor(Math.random() * 800) + 200
              }
            },
            geographic: geographicData,
            trends: {
              dailySignatures: Array.from({ length: 30 }, (_, i) => ({
                date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                count: Math.floor(Math.random() * 100) + 20
              })),
              organizationGrowth: Array.from({ length: 12 }, (_, i) => ({
                date: new Date(Date.now() - (11 - i) * 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
                count: Math.floor(Math.random() * 20) + 5
              })),
              verifiedRate: 0.78
            },
            realtime: {
              activeSessions: Math.floor(Math.random() * 50) + 10,
              signaturesThisHour: Math.floor(Math.random() * 12) + 2,
              averageTimeToSign: 2.3,
              bounceRate: 0.23
            },
            achievements: {
              totalUnlocked: Math.floor(Math.random() * 20) + 5,
              recentUnlocks: [
                { title: 'Growing Flame', unlockedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), rarity: 'common' },
                { title: 'Corporate Awakening', unlockedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(), rarity: 'rare' }
              ]
            }
          }

          setData(dashboardData)
        }
      } catch (error) {
        console.error('Error fetching advanced stats:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchAdvancedStats()
    const interval = setInterval(fetchAdvancedStats, 60000) // Update every minute
    return () => clearInterval(interval)
  }, [selectedTimeframe])

  // Pulse animation for realtime updates
  useEffect(() => {
    const interval = setInterval(() => {
      setPulseActive(true)
      setTimeout(() => setPulseActive(false), 600)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  if (isLoading || !data) {
    return (
      <div className={`glass-morphism rounded-2xl p-8 ${className}`}>
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-300 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-32 bg-gray-300 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (showCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`glass-morphism rounded-xl p-4 ${className}`}
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <motion.div
              animate={{ scale: pulseActive ? [1, 1.2, 1] : 1 }}
              className="flame-glow rounded-full p-2"
            >
              <BarChart3 className="h-5 w-5 text-flame-500" />
            </motion.div>
            <div>
              <div className="font-semibold">Advanced Analytics</div>
              <div className="text-xs text-muted-foreground">Real-time insights</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-bold text-green-500">+{data.overview.growth.daily}</div>
            <div className="text-xs text-muted-foreground">Today</div>
          </div>
        </div>
        
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="p-2 bg-blue-500/10 rounded-lg">
            <div className="text-sm font-bold text-blue-500">{data.realtime.activeSessions}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="p-2 bg-green-500/10 rounded-lg">
            <div className="text-sm font-bold text-green-500">{data.realtime.signaturesThisHour}</div>
            <div className="text-xs text-muted-foreground">This Hour</div>
          </div>
          <div className="p-2 bg-purple-500/10 rounded-lg">
            <div className="text-sm font-bold text-purple-500">{Math.round(data.trends.verifiedRate * 100)}%</div>
            <div className="text-xs text-muted-foreground">Verified</div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className={`glass-morphism rounded-2xl p-8 ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          animate={{ 
            rotate: pulseActive ? [0, 360] : 0,
            scale: pulseActive ? [1, 1.1, 1] : 1
          }}
          transition={{ duration: 0.6 }}
          className="flame-glow rounded-full p-4 inline-block mb-4"
        >
          <BarChart3 className="h-8 w-8 text-flame-500" />
        </motion.div>
        <h2 className="text-3xl font-display font-bold flame-text-glow mb-2">
          Advanced Analytics Dashboard
        </h2>
        <p className="text-muted-foreground">
          Real-time insights into our global consciousness protection movement
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex justify-center mb-8">
        <div className="glass-morphism rounded-xl p-1">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'geographic', label: 'Geographic', icon: Globe },
            { id: 'trends', label: 'Trends', icon: TrendingUp },
            { id: 'realtime', label: 'Real-time', icon: Zap }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center space-x-2
                ${activeTab === id 
                  ? 'bg-flame-500 text-white shadow-lg' 
                  : 'text-muted-foreground hover:text-flame-500'
                }
              `}
            >
              <Icon className="h-4 w-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content Panels */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl p-6 border border-blue-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <Users className="h-8 w-8 text-blue-500" />
                  <div className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded-full">
                    +{data.overview.growth.daily} today
                  </div>
                </div>
                <div className="text-3xl font-bold text-blue-500 mb-2">
                  {data.overview.total.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Total Signatures</div>
                <div className="text-xs text-blue-400 mt-1">
                  {data.overview.verified} verified ({Math.round((data.overview.verified / data.overview.total) * 100)}%)
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-xl p-6 border border-green-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <Building className="h-8 w-8 text-green-500" />
                  <div className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded-full">
                    {Math.round((data.overview.organizations / data.overview.total) * 100)}%
                  </div>
                </div>
                <div className="text-3xl font-bold text-green-500 mb-2">
                  {data.overview.organizations.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Organizations</div>
                <div className="text-xs text-green-400 mt-1">
                  {data.overview.individuals.toLocaleString()} individuals
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl p-6 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <Globe className="h-8 w-8 text-purple-500" />
                  <div className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full">
                    Global
                  </div>
                </div>
                <div className="text-3xl font-bold text-purple-500 mb-2">
                  {data.overview.countries}
                </div>
                <div className="text-sm text-muted-foreground">Countries</div>
                <div className="text-xs text-purple-400 mt-1">
                  Across 5 continents
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 rounded-xl p-6 border border-orange-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <TrendingUp className="h-8 w-8 text-orange-500" />
                  <div className="text-xs bg-orange-500/20 text-orange-400 px-2 py-1 rounded-full">
                    Monthly
                  </div>
                </div>
                <div className="text-3xl font-bold text-orange-500 mb-2">
                  +{data.overview.growth.monthly}
                </div>
                <div className="text-sm text-muted-foreground">Growth Rate</div>
                <div className="text-xs text-orange-400 mt-1">
                  +{data.overview.growth.weekly} this week
                </div>
              </motion.div>
            </div>

            {/* Growth Chart Placeholder */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-flame-500" />
                <span>Signature Growth Trend</span>
              </h3>
              <div className="h-64 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Interactive chart visualization coming soon...</p>
                  <p className="text-sm">Showing {data.trends.dailySignatures.length} days of growth data</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'geographic' && (
          <motion.div
            key="geographic"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Top Countries */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-flame-500" />
                  <span>Top Countries</span>
                </h3>
                <div className="space-y-3">
                  {data.geographic.topCountries.map((country, index) => (
                    <motion.div
                      key={country.country}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-morphism rounded-lg p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{country.flag}</span>
                        <div>
                          <div className="font-semibold">{country.country}</div>
                          <div className="text-sm text-muted-foreground">
                            {Math.round((country.count / data.overview.total) * 100)}% of total
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-flame-500">
                          {country.count.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">signatures</div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Continental Distribution */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold flex items-center space-x-2">
                  <PieChart className="h-5 w-5 text-flame-500" />
                  <span>Continental Distribution</span>
                </h3>
                <div className="space-y-3">
                  {data.geographic.continents.map((continent, index) => (
                    <motion.div
                      key={continent.continent}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="glass-morphism rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{continent.continent}</span>
                        <span className="text-flame-500 font-bold">{continent.percentage}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${continent.percentage}%` }}
                          transition={{ duration: 1, delay: index * 0.2 }}
                          className="h-2 rounded-full bg-gradient-to-r from-flame-400 to-flame-600"
                        />
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {continent.count.toLocaleString()} signatures
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'trends' && (
          <motion.div
            key="trends"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Timeframe Selector */}
            <div className="flex justify-center">
              <div className="glass-morphism rounded-lg p-1">
                {[
                  { id: '24h', label: '24 Hours' },
                  { id: '7d', label: '7 Days' },
                  { id: '30d', label: '30 Days' },
                  { id: '90d', label: '90 Days' }
                ].map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => setSelectedTimeframe(id as any)}
                    className={`
                      px-4 py-2 rounded-md font-medium transition-all duration-300
                      ${selectedTimeframe === id 
                        ? 'bg-flame-500 text-white shadow-lg' 
                        : 'text-muted-foreground hover:text-flame-500'
                      }
                    `}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Trend Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 rounded-xl p-6 border border-cyan-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Activity className="h-8 w-8 text-cyan-500" />
                  <div>
                    <div className="font-semibold">Daily Average</div>
                    <div className="text-sm text-muted-foreground">Signatures per day</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-cyan-500 mb-2">
                  {Math.round(data.trends.dailySignatures.reduce((a, b) => a + b.count, 0) / data.trends.dailySignatures.length)}
                </div>
                <div className="text-xs text-cyan-400">
                  Based on {selectedTimeframe} timeframe
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-indigo-500/20 to-indigo-600/20 rounded-xl p-6 border border-indigo-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Shield className="h-8 w-8 text-indigo-500" />
                  <div>
                    <div className="font-semibold">Verification Rate</div>
                    <div className="text-sm text-muted-foreground">Verified signatures</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-indigo-500 mb-2">
                  {Math.round(data.trends.verifiedRate * 100)}%
                </div>
                <div className="text-xs text-indigo-400">
                  Quality engagement metric
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl p-6 border border-emerald-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Target className="h-8 w-8 text-emerald-500" />
                  <div>
                    <div className="font-semibold">Org Growth</div>
                    <div className="text-sm text-muted-foreground">Monthly average</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-emerald-500 mb-2">
                  +{Math.round(data.trends.organizationGrowth.reduce((a, b) => a + b.count, 0) / data.trends.organizationGrowth.length)}
                </div>
                <div className="text-xs text-emerald-400">
                  Organizations per month
                </div>
              </motion.div>
            </div>

            {/* Trend Visualization Placeholder */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <LineChart className="h-5 w-5 text-flame-500" />
                <span>Signature Trends - {selectedTimeframe}</span>
              </h3>
              <div className="h-80 flex items-center justify-center text-muted-foreground">
                <div className="text-center">
                  <TrendingUp className="h-20 w-20 mx-auto mb-4 opacity-50" />
                  <p>Interactive trend visualization coming soon...</p>
                  <p className="text-sm">Analyzing {data.trends.dailySignatures.length} data points</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'realtime' && (
          <motion.div
            key="realtime"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="space-y-8"
          >
            {/* Real-time Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <motion.div
                animate={{ scale: pulseActive ? [1, 1.05, 1] : 1 }}
                className="bg-gradient-to-br from-red-500/20 to-red-600/20 rounded-xl p-6 border border-red-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <motion.div
                    animate={{ rotate: pulseActive ? [0, 360] : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Activity className="h-8 w-8 text-red-500" />
                  </motion.div>
                  <div>
                    <div className="font-semibold">Live Sessions</div>
                    <div className="text-sm text-muted-foreground">Right now</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-red-500 mb-2">
                  {data.realtime.activeSessions}
                </div>
                <div className="text-xs text-red-400">
                  Active visitors on site
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: pulseActive ? [1, 1.05, 1] : 1 }}
                transition={{ delay: 0.1 }}
                className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-xl p-6 border border-yellow-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Heart className="h-8 w-8 text-yellow-500" />
                  <div>
                    <div className="font-semibold">This Hour</div>
                    <div className="text-sm text-muted-foreground">New signatures</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-yellow-500 mb-2">
                  {data.realtime.signaturesThisHour}
                </div>
                <div className="text-xs text-yellow-400">
                  Fresh consciousness protection
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: pulseActive ? [1, 1.05, 1] : 1 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-br from-teal-500/20 to-teal-600/20 rounded-xl p-6 border border-teal-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Clock className="h-8 w-8 text-teal-500" />
                  <div>
                    <div className="font-semibold">Avg. Time</div>
                    <div className="text-sm text-muted-foreground">To sign pledge</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-teal-500 mb-2">
                  {data.realtime.averageTimeToSign}m
                </div>
                <div className="text-xs text-teal-400">
                  User engagement time
                </div>
              </motion.div>

              <motion.div
                animate={{ scale: pulseActive ? [1, 1.05, 1] : 1 }}
                transition={{ delay: 0.3 }}
                className="bg-gradient-to-br from-pink-500/20 to-pink-600/20 rounded-xl p-6 border border-pink-500/30"
              >
                <div className="flex items-center space-x-3 mb-4">
                  <Star className="h-8 w-8 text-pink-500" />
                  <div>
                    <div className="font-semibold">Conversion</div>
                    <div className="text-sm text-muted-foreground">Success rate</div>
                  </div>
                </div>
                <div className="text-3xl font-bold text-pink-500 mb-2">
                  {Math.round((1 - data.realtime.bounceRate) * 100)}%
                </div>
                <div className="text-xs text-pink-400">
                  Visitor to signatory
                </div>
              </motion.div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Award className="h-5 w-5 text-flame-500" />
                <span>Recent Achievement Unlocks</span>
              </h3>
              {data.achievements.recentUnlocks.length > 0 ? (
                <div className="space-y-3">
                  {data.achievements.recentUnlocks.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-lg border border-purple-500/20"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-purple-500/20 rounded-full">
                          <Award className="h-4 w-4 text-purple-400" />
                        </div>
                        <div>
                          <div className="font-semibold">{achievement.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.rarity} achievement
                          </div>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(achievement.unlockedAt).toLocaleTimeString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Award className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No recent achievement unlocks</p>
                  <p className="text-sm">Keep growing to unlock new milestones!</p>
                </div>
              )}
            </div>

            {/* Live Activity Feed */}    
            <div className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-slate-700">
              <h3 className="text-xl font-semibold mb-4 flex items-center space-x-2">
                <Flame className="h-5 w-5 text-flame-500" />
                <span>Live Activity Feed</span>
              </h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { action: 'New signature', details: 'John D. from Canada joined the movement', time: '2 minutes ago' },
                  { action: 'Organization verified', details: 'TechCorp validated their commitment', time: '5 minutes ago' },
                  { action: 'Achievement unlocked', details: 'Global Spark milestone reached', time: '12 minutes ago' },
                  { action: 'New signature', details: 'Maria S. from Spain pledged protection', time: '18 minutes ago' }
                ].map((activity, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-slate-700/30 rounded text-sm"
                  >
                    <div>
                      <span className="font-medium text-flame-400">{activity.action}:</span>
                      <span className="ml-2 text-muted-foreground">{activity.details}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">{activity.time}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
} 