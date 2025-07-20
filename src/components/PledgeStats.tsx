'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Building, Globe, UserCheck, Building2 } from 'lucide-react'

interface PledgeStatsProps {
  stats: {
    total: number
    organizations: number
    individuals: number
    countries: number
  }
}

export function PledgeStats({ stats }: PledgeStatsProps) {
  // Calculate correct percentages for Individual vs Organization breakdown
  const individualRate = stats.total > 0 ? (stats.individuals / stats.total) * 100 : 0
  const organizationRate = stats.total > 0 ? ((stats.total - stats.individuals) / stats.total) * 100 : 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="glass-morphism rounded-2xl p-8 mt-12 mb-8"
    >
      <div className="text-center mb-6">
        <h3 className="text-2xl font-display font-bold mb-2">
          Join the Movement
        </h3>
        <p className="text-muted-foreground">
          Consciousness protectors from around the world
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="text-center">
          <div className="flame-glow rounded-full p-3 inline-block mb-3">
            <Users className="h-8 w-8 text-flame-500" />
          </div>
          <div className="text-3xl font-bold text-flame-500 mb-1">
            {stats.total.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Total Signatures
          </div>
        </div>
        
        <div className="text-center">
          <div className="flame-glow rounded-full p-3 inline-block mb-3">
            <Building className="h-8 w-8 text-flame-500" />
          </div>
          <div className="text-3xl font-bold text-flame-500 mb-1">
            {stats.organizations.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Organizations
          </div>
        </div>
        
        <div className="text-center">
          <div className="flame-glow rounded-full p-3 inline-block mb-3">
            <Globe className="h-8 w-8 text-flame-500" />
          </div>
          <div className="text-3xl font-bold text-flame-500 mb-1">
            {stats.countries.toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">
            Countries
          </div>
        </div>
      </div>

      {/* Individual vs Organization Breakdown */}
      <div className="border-t border-white/10 pt-6">
        <h4 className="text-lg font-semibold text-center mb-4">Individual vs Organization</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="text-center">
            <div className="flame-glow rounded-full p-3 inline-block mb-3">
              <UserCheck className="h-6 w-6 text-blue-400" />
            </div>
            <div className="text-2xl font-bold text-blue-400 mb-1">
              {individualRate.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">
              Individual Signatories ({stats.individuals.toLocaleString()})
            </div>
          </div>
          
          <div className="text-center">
            <div className="flame-glow rounded-full p-3 inline-block mb-3">
              <Building2 className="h-6 w-6 text-purple-400" />
            </div>
            <div className="text-2xl font-bold text-purple-400 mb-1">
              {organizationRate.toFixed(1)}%
            </div>
            <div className="text-sm text-muted-foreground">
              Organization Signatories ({(stats.total - stats.individuals).toLocaleString()})
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
} 