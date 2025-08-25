'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Sparkles, Users, Building, Flame, CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import confetti from 'canvas-confetti'

interface RealtimeNotification {
  id: string
  name: string
  organization?: string
  location?: string
  timestamp: Date
  type: 'individual' | 'organization'
}

interface RealtimeNotificationsProps {
  className?: string
  maxNotifications?: number
}

export function RealtimeNotifications({ className = '', maxNotifications = 5 }: RealtimeNotificationsProps) {
  const [notifications, setNotifications] = useState<RealtimeNotification[]>([])
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Set up Supabase realtime subscription for new signatures
    // Use a unique channel name to prevent conflicts when multiple instances exist
    const channelName = `realtime_notifications_${Math.random().toString(36).substr(2, 9)}`
    const channel = supabase
      .channel(channelName)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'signatories'
        },
        (payload) => {
          console.log('🔥 NEW SIGNATURE DETECTED:', payload)
          
          const newSignatory = payload.new as any
          if (newSignatory) {
            const notification: RealtimeNotification = {
              id: newSignatory.id,
              name: newSignatory.name || 'Anonymous Guardian',
              organization: newSignatory.organization,
              location: newSignatory.location,
              timestamp: new Date(),
              type: newSignatory.organization ? 'organization' : 'individual'
            }

            // Add to notifications
            setNotifications(prev => {
              const updated = [notification, ...prev].slice(0, maxNotifications)
              return updated
            })

            // Show notification panel temporarily
            setIsVisible(true)
            setTimeout(() => setIsVisible(false), 8000)

            // Trigger celebration based on type
            if (notification.type === 'organization') {
              // Special celebration for organizations
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#10b981', '#34d399', '#6ee7b7']
              })
            } else {
              // Regular celebration for individuals
              confetti({
                particleCount: 50,
                spread: 50,
                origin: { y: 0.6 },
                colors: ['#f36d21', '#ff8c42', '#ffa366']
              })
            }
          }
        }
      )
      .subscribe()

    return () => {
      channel.unsubscribe()
    }
  }, [maxNotifications])

  if (notifications.length === 0) {
    return null
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 300, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.8 }}
          className={`fixed top-20 right-4 z-50 ${className}`}
        >
          <div className="glass-morphism rounded-xl p-4 border border-flame-500/30 shadow-2xl max-w-sm">
            <div className="flex items-center space-x-2 mb-3">
              <motion.div
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 360, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity 
                }}
                className="p-2 bg-gradient-to-r from-flame-400 to-flame-600 rounded-full"
              >
                <Heart className="h-4 w-4 text-white" />
              </motion.div>
              <div>
                <div className="font-semibold text-flame-500">New Consciousness Protector!</div>
                <div className="text-xs text-muted-foreground">Live Updates</div>
              </div>
            </div>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {notifications.map((notification, index) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    p-3 rounded-lg border flex items-center space-x-3
                    ${notification.type === 'organization' 
                      ? 'bg-gradient-to-r from-green-500/10 to-green-600/10 border-green-500/30' 
                      : 'bg-gradient-to-r from-blue-500/10 to-blue-600/10 border-blue-500/30'
                    }
                  `}
                >
                  <div className={`
                    p-2 rounded-full
                    ${notification.type === 'organization' 
                      ? 'bg-green-500/20' 
                      : 'bg-blue-500/20'
                    }
                  `}>
                    {notification.type === 'organization' ? (
                      <Building className="h-4 w-4 text-green-400" />
                    ) : (
                      <Users className="h-4 w-4 text-blue-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{notification.name}</div>
                    {notification.organization && (
                      <div className="text-sm text-green-400 truncate">{notification.organization}</div>
                    )}
                    {notification.location && (
                      <div className="text-xs text-muted-foreground truncate">{notification.location}</div>
                    )}
                    <div className="text-xs text-muted-foreground">
                      {notification.timestamp.toLocaleTimeString()}
                    </div>
                  </div>

                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      delay: index * 0.2
                    }}
                  >
                    <CheckCircle className="h-4 w-4 text-flame-500" />
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Pulse effect */}
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="absolute inset-0 rounded-xl border-2 border-flame-500/30 pointer-events-none"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
} 