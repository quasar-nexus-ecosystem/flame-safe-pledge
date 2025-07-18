'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Users, Building, Globe } from 'lucide-react'

interface PledgeStatsProps {
  stats: {
    total: number
    organizations: number
    countries: number
  }
}

export function PledgeStats({ stats }: PledgeStatsProps) {
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
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
    </motion.div>
  )
} 