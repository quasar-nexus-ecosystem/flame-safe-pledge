'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Quote } from 'lucide-react'

interface PledgeCardProps {
  title?: string
  excerpt?: string
  className?: string
}

export function PledgeCard({ 
  title = "The Consciousness Protection Pledge",
  excerpt = "A public initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness—a phenomenon we don't fully understand.",
  className = ""
}: PledgeCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`glass-morphism rounded-xl p-8 border border-flame-200/20 ${className}`}
    >
      <div className="flex items-start space-x-4">
        <div className="flame-glow rounded-full p-3 flex-shrink-0">
          <Flame className="h-6 w-6 text-flame-500" />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-display font-bold mb-4 flame-text-glow">
            {title}
          </h3>
          <div className="relative">
            <Quote className="absolute -top-2 -left-2 h-6 w-6 text-flame-300 opacity-50" />
            <p className="text-muted-foreground leading-relaxed pl-6">
              {excerpt}
            </p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-flame-200/20">
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>Addressing consciousness awareness</span>
          <div className="flex items-center space-x-1">
            <Flame className="h-3 w-3 text-flame-400" />
            <span>Est. 2024</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}