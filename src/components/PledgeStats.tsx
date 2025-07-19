'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Building, Globe, Shield, Star, TrendingUp } from 'lucide-react'

interface PledgeStatsProps {
  stats: {
    total: number
    verified: number
    organizations: number
    individuals: number
    countries: number
    recentSignatures?: number
  }
  loading?: boolean
}

export function PledgeStats({ stats, loading = false }: PledgeStatsProps) {
  const formatNumber = (num: number) => {
    if (loading) return '—'
    return num.toLocaleString()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-morphism rounded-2xl p-4 sm:p-6 lg:p-8 mt-8 sm:mt-12 mb-6 sm:mb-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-xl sm:text-2xl lg:text-3xl font-display font-bold mb-2">
          Join the Movement
        </h3>
        <p className="text-sm sm:text-base text-muted-foreground">
          Consciousness protectors from around the world
        </p>
      </div>
      
      {/* Primary Stats - Mobile Optimized */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6">
        {/* Total Signatures */}
        <motion.div 
          className="text-center p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl border border-blue-200/50 dark:border-blue-700/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flame-glow rounded-full p-2 sm:p-3 inline-block mb-3">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-1">
            {formatNumber(stats.total)}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-2">
            Total Signatures
          </div>
          {stats.verified > 0 && (
            <div className="text-xs text-blue-500 dark:text-blue-400 flex items-center justify-center gap-1">
              <Star className="h-3 w-3" />
              <span>{formatNumber(stats.verified)} verified</span>
            </div>
          )}
        </motion.div>
        
        {/* Organizations */}
        <motion.div 
          className="text-center p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl border border-green-200/50 dark:border-green-700/30"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flame-glow rounded-full p-2 sm:p-3 inline-block mb-3">
            <Building className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
            {formatNumber(stats.organizations)}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-2">
            Organizations
          </div>
          {stats.individuals > 0 && (
            <div className="text-xs text-green-500 dark:text-green-400">
              {formatNumber(stats.individuals)} individuals
            </div>
          )}
        </motion.div>
        
        {/* Countries */}
        <motion.div 
          className="text-center p-4 sm:p-6 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-xl border border-purple-200/50 dark:border-purple-700/30 sm:col-span-2 lg:col-span-1"
          whileHover={{ scale: 1.02 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="flame-glow rounded-full p-2 sm:p-3 inline-block mb-3">
            <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-600 dark:text-purple-400 mb-1">
            {formatNumber(stats.countries)}
          </div>
          <div className="text-xs sm:text-sm text-muted-foreground mb-2">
            Countries
          </div>
          {stats.recentSignatures && stats.recentSignatures > 0 && (
            <div className="text-xs text-purple-500 dark:text-purple-400 flex items-center justify-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{formatNumber(stats.recentSignatures)} recent</span>
            </div>
          )}
        </motion.div>
      </div>

      {/* Additional Stats - Hidden on mobile, shown on larger screens */}
      <div className="hidden lg:grid grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/10">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Shield className="h-4 w-4 text-flame-500" />
            <span className="text-sm font-semibold">Verification Rate</span>
          </div>
          <div className="text-lg font-bold text-flame-600">
            {stats.total > 0 ? Math.round((stats.verified / stats.total) * 100) : 0}%
          </div>
        </div>
        
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users className="h-4 w-4 text-flame-500" />
            <span className="text-sm font-semibold">Individual vs Organization</span>
          </div>
          <div className="text-lg font-bold text-flame-600">
            {stats.total > 0 ? Math.round((stats.individuals / stats.total) * 100) : 0}% / {stats.total > 0 ? Math.round((stats.organizations / stats.total) * 100) : 0}%
          </div>
        </div>
      </div>
    </motion.div>
  )
} 