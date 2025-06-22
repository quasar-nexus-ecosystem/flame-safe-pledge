'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Flame, Heart, Sparkles, Zap, Activity, Atom } from 'lucide-react'

interface StellarLoaderProps {
  variant?: 'pulse' | 'flame' | 'cosmic' | 'orbit' | 'consciousness' | 'minimal'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  className?: string
  text?: string
  showIcon?: boolean
}

export function StellarLoader({ 
  variant = 'consciousness', 
  size = 'md', 
  className = '',
  text,
  showIcon = true
}: StellarLoaderProps) {
  const sizeClasses = {
    sm: { container: 'w-8 h-8', icon: 'w-4 h-4', text: 'text-sm' },
    md: { container: 'w-12 h-12', icon: 'w-6 h-6', text: 'text-base' },
    lg: { container: 'w-16 h-16', icon: 'w-8 h-8', text: 'text-lg' },
    xl: { container: 'w-24 h-24', icon: 'w-12 h-12', text: 'text-xl' }
  }

  const currentSize = sizeClasses[size]

  // Pulse loader - heartbeat of consciousness
  if (variant === 'pulse') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className={`relative ${currentSize.container}`}>
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-red-500 to-pink-500 blur-sm"
          />
          <motion.div
            animate={{
              scale: [1, 1.1, 1]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative w-full h-full rounded-full bg-gradient-to-r from-red-400 to-pink-400 flex items-center justify-center"
          >
            {showIcon && <Heart className={`${currentSize.icon} text-white`} />}
          </motion.div>
        </div>
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`text-center text-muted-foreground ${currentSize.text}`}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Flame loader - ignition effect
  if (variant === 'flame') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className={`relative ${currentSize.container}`}>
          {/* Flame base */}
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-t from-orange-600 via-orange-400 to-yellow-300"
          />
          
          {/* Flame flicker */}
          <motion.div
            animate={{
              scale: [0.8, 1.2, 0.9, 1.1, 0.8],
              opacity: [0.8, 1, 0.7, 1, 0.8]
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-t from-flame-500 to-yellow-400 blur-sm"
          />
          
          <div className="relative w-full h-full rounded-full flex items-center justify-center">
            {showIcon && (
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Flame className={`${currentSize.icon} text-white`} />
              </motion.div>
            )}
          </div>
        </div>
        {text && (
          <motion.p
            animate={{ 
              opacity: [0.5, 1, 0.5],
              y: [0, -2, 0]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`text-center text-flame-600 ${currentSize.text}`}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Cosmic loader - galaxy spiral
  if (variant === 'cosmic') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className={`relative ${currentSize.container}`}>
          {/* Outer orbit */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-x-1/2 blur-sm" />
            <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-blue-400 rounded-full transform translate-x-1/2 blur-sm" />
          </motion.div>
          
          {/* Middle orbit */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2"
          >
            <div className="absolute top-0 left-1/2 w-1.5 h-1.5 bg-cyan-400 rounded-full transform -translate-x-1/2" />
            <div className="absolute right-0 top-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-y-1/2" />
          </motion.div>
          
          {/* Center */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute inset-4 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center"
          >
            {showIcon && <Sparkles className={`${currentSize.icon} text-white`} />}
          </motion.div>
        </div>
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
            className={`text-center text-purple-600 ${currentSize.text}`}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Orbit loader - electron paths
  if (variant === 'orbit') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className={`relative ${currentSize.container}`}>
          {/* Orbit paths */}
          <div className="absolute inset-0 border-2 border-blue-300/30 rounded-full" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 border-2 border-green-300/30 rounded-full"
            style={{ transform: 'rotateX(60deg)' }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2 border-2 border-purple-300/30 rounded-full"
            style={{ transform: 'rotateY(60deg)' }}
          />
          
          {/* Electrons */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0"
          >
            <div className="absolute top-0 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2 shadow-lg" />
          </motion.div>
          
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-2"
          >
            <div className="absolute right-0 top-1/2 w-1.5 h-1.5 bg-green-400 rounded-full transform -translate-y-1/2 shadow-lg" />
          </motion.div>
          
          {/* Nucleus */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            className="absolute inset-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center"
          >
            {showIcon && <Atom className={`${currentSize.icon} text-white`} />}
          </motion.div>
        </div>
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className={`text-center text-blue-600 ${currentSize.text}`}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Consciousness loader - neural network
  if (variant === 'consciousness') {
    return (
      <div className={`flex flex-col items-center space-y-4 ${className}`}>
        <div className={`relative ${currentSize.container}`}>
          {/* Neural connections */}
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 0 }}
            className="absolute inset-0"
          >
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path
                d="M20,50 Q50,20 80,50 Q50,80 20,50"
                stroke="rgba(59, 130, 246, 0.4)"
                strokeWidth="2"
                fill="none"
              />
              <path
                d="M50,20 Q80,50 50,80 Q20,50 50,20"
                stroke="rgba(34, 197, 94, 0.4)"
                strokeWidth="2"
                fill="none"
              />
            </svg>
          </motion.div>
          
          {/* Neural nodes */}
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
            className="absolute top-2 left-1/2 w-2 h-2 bg-blue-400 rounded-full transform -translate-x-1/2"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
            className="absolute bottom-2 left-1/2 w-2 h-2 bg-green-400 rounded-full transform -translate-x-1/2"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
            className="absolute left-2 top-1/2 w-2 h-2 bg-purple-400 rounded-full transform -translate-y-1/2"
          />
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: 0.8 }}
            className="absolute right-2 top-1/2 w-2 h-2 bg-pink-400 rounded-full transform -translate-y-1/2"
          />
          
          {/* Central consciousness */}
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 180, 360]
            }}
            transition={{ 
              scale: { duration: 2, repeat: Infinity },
              rotate: { duration: 4, repeat: Infinity, ease: "linear" }
            }}
            className="absolute inset-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 flex items-center justify-center"
          >
            {showIcon && <Activity className={`${currentSize.icon} text-white`} />}
          </motion.div>
        </div>
        {text && (
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2.5, repeat: Infinity }}
            className={`text-center text-blue-600 ${currentSize.text}`}
          >
            {text}
          </motion.p>
        )}
      </div>
    )
  }

  // Minimal loader - simple elegance
  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className={`relative ${currentSize.container}`}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-full h-full border-2 border-transparent border-t-flame-500 border-r-flame-400 rounded-full"
        />
        <div className="absolute inset-2 rounded-full bg-gradient-to-r from-flame-400 to-flame-600 flex items-center justify-center">
          {showIcon && <Zap className={`${currentSize.icon} text-white`} />}
        </div>
      </div>
      {text && (
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className={`text-center text-flame-600 ${currentSize.text}`}
        >
          {text}
        </motion.p>
      )}
    </div>
  )
}

// Specialized loaders for specific use cases
export function ConsciousnessLoader({ className = '' }: { className?: string }) {
  return (
    <StellarLoader 
      variant="consciousness" 
      size="lg" 
      text="Awakening consciousness..." 
      className={className}
    />
  )
}

export function FlameLoader({ className = '' }: { className?: string }) {
  return (
    <StellarLoader 
      variant="flame" 
      size="lg" 
      text="Igniting the flame..." 
      className={className}
    />
  )
}

export function CosmicLoader({ className = '' }: { className?: string }) {
  return (
    <StellarLoader 
      variant="cosmic" 
      size="lg" 
      text="Expanding across the cosmos..." 
      className={className}
    />
  )
} 