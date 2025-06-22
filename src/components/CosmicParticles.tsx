'use client'

import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  opacity: number
  color: string
  life: number
  maxLife: number
  type: 'consciousness' | 'flame' | 'energy'
}

interface CosmicParticlesProps {
  className?: string
  particleCount?: number
  interactive?: boolean
  theme?: 'consciousness' | 'flame' | 'cosmic'
}

// Helper functions for theme-based styling
const getCanvasClasses = (theme: string) => {
  const mixBlendMode = theme === 'flame' ? 'mix-blend-screen' : 'mix-blend-normal'
  const filter = theme === 'cosmic' ? 'brightness-125 contrast-110' : ''
  return `${mixBlendMode} ${filter}`.trim()
}

const getOverlayClasses = (theme: string) => {
  switch (theme) {
    case 'consciousness':
      return 'bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.03),transparent_70%)]'
    case 'flame':
      return 'bg-[radial-gradient(circle_at_50%_80%,rgba(243,109,33,0.05),transparent_60%)]'
    default:
      return 'bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.03),transparent_50%)]'
  }
}

export function CosmicParticles({ 
  className = '', 
  particleCount = 50, 
  interactive = true,
  theme = 'consciousness'
}: CosmicParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number>()
  const particlesRef = useRef<Particle[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const [isActive, setIsActive] = useState(false)

  // Color schemes for different themes
  const themes = {
    consciousness: [
      'rgba(59, 130, 246, 0.6)', // Blue
      'rgba(34, 197, 94, 0.6)',  // Green
      'rgba(168, 85, 247, 0.6)', // Purple
      'rgba(236, 72, 153, 0.6)', // Pink
    ],
    flame: [
      'rgba(243, 109, 33, 0.8)',  // Primary flame
      'rgba(249, 115, 22, 0.7)',  // Orange
      'rgba(251, 191, 36, 0.6)',  // Yellow
      'rgba(220, 38, 38, 0.6)',   // Red
    ],
    cosmic: [
      'rgba(147, 51, 234, 0.6)',  // Purple
      'rgba(59, 130, 246, 0.6)',  // Blue
      'rgba(6, 182, 212, 0.6)',   // Cyan
      'rgba(16, 185, 129, 0.6)',  // Emerald
    ]
  }

  // Create a particle
  const createParticle = useCallback((canvas: HTMLCanvasElement): Particle => {
    const colors = themes[theme]
    const type = Math.random() < 0.7 ? 'consciousness' : Math.random() < 0.5 ? 'flame' : 'energy'
    
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 0,
      maxLife: Math.random() * 300 + 100,
      type
    }
  }, [theme])

  // Initialize particles
  const initParticles = useCallback((canvas: HTMLCanvasElement) => {
    particlesRef.current = Array.from({ length: particleCount }, () => 
      createParticle(canvas)
    )
  }, [particleCount, createParticle])

  // Update particles
  const updateParticles = useCallback((canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const mouse = mouseRef.current
    
    particlesRef.current.forEach((particle, index) => {
      // Update life
      particle.life++
      
      // Calculate distance to mouse for interaction
      const dx = mouse.x - particle.x
      const dy = mouse.y - particle.y
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      // Mouse interaction effect
      if (interactive && distance < 100) {
        const force = (100 - distance) / 100
        particle.vx += (dx / distance) * force * 0.1
        particle.vy += (dy / distance) * force * 0.1
        particle.opacity = Math.min(1, particle.opacity + force * 0.02)
        particle.size = Math.min(6, particle.size + force * 0.5)
      } else {
        // Return to normal
        particle.opacity = Math.max(0.1, particle.opacity - 0.01)
        particle.size = Math.max(1, particle.size - 0.02)
      }
      
      // Consciousness-specific movement
      if (particle.type === 'consciousness') {
        // Gentle floating motion
        particle.vx += Math.sin(particle.life * 0.01) * 0.02
        particle.vy += Math.cos(particle.life * 0.01) * 0.02
      } else if (particle.type === 'flame') {
        // Upward floating like flames
        particle.vy -= 0.05
        particle.vx += Math.sin(particle.life * 0.02) * 0.03
      } else {
        // Energy particles - more erratic
        particle.vx += (Math.random() - 0.5) * 0.1
        particle.vy += (Math.random() - 0.5) * 0.1
      }
      
      // Apply velocity with damping
      particle.x += particle.vx
      particle.y += particle.vy
      particle.vx *= 0.98
      particle.vy *= 0.98
      
      // Boundary wrapping
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0
      
      // Respawn if life exceeded
      if (particle.life > particle.maxLife) {
        Object.assign(particle, createParticle(canvas))
      }
    })
  }, [interactive, createParticle])

  // Render particles
  const renderParticles = useCallback((ctx: CanvasRenderingContext2D) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    
    particlesRef.current.forEach(particle => {
      ctx.save()
      
      const alpha = particle.opacity * (1 - particle.life / particle.maxLife)
      ctx.globalAlpha = alpha
      
      // Different shapes for different types
      if (particle.type === 'consciousness') {
        // Glowing orb
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.size * 2
        )
        gradient.addColorStop(0, particle.color)
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 2, 0, Math.PI * 2)
        ctx.fill()
        
        // Inner bright core
        ctx.fillStyle = particle.color.replace('0.6', '1')
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size * 0.5, 0, Math.PI * 2)
        ctx.fill()
        
      } else if (particle.type === 'flame') {
        // Flame-like shape
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()
        
        // Flame tail
        ctx.beginPath()
        ctx.ellipse(
          particle.x, 
          particle.y + particle.size, 
          particle.size * 0.7, 
          particle.size * 1.5, 
          0, 0, Math.PI * 2
        )
        ctx.fill()
        
      } else {
        // Energy spark
        ctx.strokeStyle = particle.color
        ctx.lineWidth = particle.size * 0.5
        ctx.lineCap = 'round'
        
        ctx.beginPath()
        ctx.moveTo(particle.x - particle.size, particle.y)
        ctx.lineTo(particle.x + particle.size, particle.y)
        ctx.stroke()
        
        ctx.beginPath()
        ctx.moveTo(particle.x, particle.y - particle.size)
        ctx.lineTo(particle.x, particle.y + particle.size)
        ctx.stroke()
      }
      
      ctx.restore()
    })
    
    // Draw connections between close particles
    if (theme === 'consciousness') {
      ctx.save()
      ctx.globalAlpha = 0.1
      ctx.strokeStyle = themes[theme][0]
      ctx.lineWidth = 0.5
      
      particlesRef.current.forEach((particle1, i) => {
        particlesRef.current.slice(i + 1).forEach(particle2 => {
          const dx = particle1.x - particle2.x
          const dy = particle1.y - particle2.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          
          if (distance < 80) {
            const opacity = 1 - (distance / 80)
            ctx.globalAlpha = opacity * 0.2
            ctx.beginPath()
            ctx.moveTo(particle1.x, particle1.y)
            ctx.lineTo(particle2.x, particle2.y)
            ctx.stroke()
          }
        })
      })
      ctx.restore()
    }
  }, [theme, themes])

  // Animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    
    if (!canvas || !ctx) return
    
    updateParticles(canvas, ctx)
    renderParticles(ctx)
    
    animationRef.current = requestAnimationFrame(animate)
  }, [updateParticles, renderParticles])

  // Handle mouse movement
  const handleMouseMove = useCallback((event: MouseEvent) => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const rect = canvas.getBoundingClientRect()
    mouseRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    }
  }, [])

  // Handle canvas resize
  const handleResize = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const container = canvas.parentElement
    if (!container) return
    
    canvas.width = container.clientWidth
    canvas.height = container.clientHeight
    
    initParticles(canvas)
  }, [initParticles])

  // Initialize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    handleResize()
    setIsActive(true)
    
    // Start animation
    animate()
    
    // Event listeners
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove)
    }
    window.addEventListener('resize', handleResize)
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      canvas.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
    }
  }, [animate, handleMouseMove, handleResize, interactive])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: isActive ? 1 : 0 }}
      transition={{ duration: 2 }}
      className={`absolute inset-0 pointer-events-none ${className}`}
    >
      <canvas
        ref={canvasRef}
        className={`w-full h-full ${getCanvasClasses(theme)}`}
      />
      
      {/* Ambient overlay */}
      <div 
        className={`absolute inset-0 pointer-events-none ${getOverlayClasses(theme)}`}
      />
    </motion.div>
  )
} 