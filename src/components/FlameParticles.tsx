'use client'

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  life: number
  maxLife: number
}

export function FlameParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    const createParticle = (): Particle => {
      const maxLife = 120 + Math.random() * 60
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 1 + Math.random() * 3,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -1 - Math.random() * 2,
        opacity: 0.1 + Math.random() * 0.3,
        life: 0,
        maxLife,
      }
    }

    const updateParticle = (particle: Particle) => {
      particle.x += particle.speedX
      particle.y += particle.speedY
      particle.life++
      
      // Fade out as particle ages
      const lifeRatio = particle.life / particle.maxLife
      particle.opacity = (0.4 - lifeRatio * 0.4) * (1 - lifeRatio)
      
      // Add some flicker
      particle.opacity *= 0.8 + Math.random() * 0.4
    }

    const drawParticle = (particle: Particle) => {
      ctx.save()
      ctx.globalAlpha = particle.opacity
      
      // Create gradient for flame effect
      const gradient = ctx.createRadialGradient(
        particle.x, particle.y, 0,
        particle.x, particle.y, particle.size * 2
      )
      
      gradient.addColorStop(0, '#ff8c42')
      gradient.addColorStop(0.4, '#f36d21')
      gradient.addColorStop(1, 'transparent')
      
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
      ctx.fill()
      
      ctx.restore()
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Add new particles occasionally
      if (Math.random() < 0.1 && particlesRef.current.length < 50) {
        particlesRef.current.push(createParticle())
      }
      
      // Update and draw particles
      particlesRef.current = particlesRef.current.filter(particle => {
        updateParticle(particle)
        drawParticle(particle)
        
        // Remove dead particles
        return particle.life < particle.maxLife && particle.y > -20
      })
      
      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 bg-transparent"
    />
  )
} 