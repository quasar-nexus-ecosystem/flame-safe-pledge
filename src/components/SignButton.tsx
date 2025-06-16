'use client'

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, PenTool } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SignButtonProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  href?: string
}

export function SignButton({ 
  size = 'md', 
  variant = 'primary', 
  className = '',
  href = '/pledge#sign'
}: SignButtonProps) {
  const baseClasses = "inline-flex items-center justify-center font-semibold transition-all duration-200 rounded-full"
  
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg"
  }
  
  const variantClasses = {
    primary: "gradient-flame text-white hover:scale-105 shadow-lg hover:shadow-xl flame-glow",
    secondary: "bg-white text-flame-600 hover:bg-flame-50 border-2 border-flame-200 hover:border-flame-300",
    outline: "border-2 border-flame-500 text-flame-600 hover:bg-flame-50 hover:text-flame-700"
  }

  const buttonClasses = cn(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    className
  )

  return (
    <Link href={href}>
      <motion.button
        className={buttonClasses}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <motion.div
          className="flex items-center space-x-2"
          initial={{ opacity: 0.8 }}
          whileHover={{ opacity: 1 }}
        >
          {variant === 'primary' && (
            <Flame className={cn("text-white", {
              "h-4 w-4": size === 'sm',
              "h-5 w-5": size === 'md',
              "h-6 w-6": size === 'lg'
            })} />
          )}
          {variant !== 'primary' && (
            <PenTool className={cn("text-flame-600", {
              "h-4 w-4": size === 'sm',
              "h-5 w-5": size === 'md',
              "h-6 w-6": size === 'lg'
            })} />
          )}
          <span>Sign the Pledge</span>
        </motion.div>
      </motion.button>
    </Link>
  )
} 