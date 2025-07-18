import { motion } from 'framer-motion'
import { Loader2, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface LoadingStateProps {
  message?: string
  variant?: 'default' | 'cosmic' | 'minimal'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function LoadingState({ 
  message = 'Loading consciousness data...', 
  variant = 'default',
  size = 'md',
  className 
}: LoadingStateProps) {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8', 
    lg: 'h-12 w-12'
  }

  const textSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  }

  if (variant === 'minimal') {
    return (
      <div className={cn('flex items-center justify-center', className)}>
        <Loader2 className={cn('animate-spin text-flame-500', sizeClasses[size])} />
      </div>
    )
  }

  if (variant === 'cosmic') {
    return (
      <motion.div 
        className={cn('flex flex-col items-center justify-center space-y-4 p-8', className)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="relative">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            className="relative"
          >
            <Sparkles className={cn('text-flame-500', sizeClasses[size])} />
          </motion.div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0"
          >
            <div className={cn('rounded-full border-2 border-flame-500/30', sizeClasses[size])} />
          </motion.div>
        </div>
        <motion.p 
          className={cn('text-muted-foreground text-center', textSizeClasses[size])}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {message}
        </motion.p>
      </motion.div>
    )
  }

  return (
    <motion.div 
      className={cn('flex flex-col items-center justify-center space-y-4 p-6', className)}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        >
          <Loader2 className={cn('text-flame-500', sizeClasses[size])} />
        </motion.div>
        <motion.div
          animate={{ 
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.7, 0.3]
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute inset-0 rounded-full bg-flame-500/20 blur-lg"
        />
      </div>
      <motion.p 
        className={cn('text-muted-foreground text-center max-w-xs', textSizeClasses[size])}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        {message}
      </motion.p>
    </motion.div>
  )
}

// Skeleton loading components for specific use cases
export function StatCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('glass-morphism rounded-lg p-6 animate-pulse', className)}>
      <div className="h-8 bg-gray-300/20 rounded mb-2"></div>
      <div className="h-4 bg-gray-300/20 rounded mb-1"></div>
      <div className="h-3 bg-gray-300/20 rounded w-2/3 mx-auto"></div>
    </div>
  )
}

export function ChartSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('glass-morphism rounded-2xl p-6 animate-pulse', className)}>
      <div className="h-6 bg-gray-300/20 rounded mb-6 w-1/3"></div>
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center space-x-3">
            <div className="h-4 bg-gray-300/20 rounded flex-1"></div>
            <div className="h-4 bg-gray-300/20 rounded w-12"></div>
          </div>
        ))}
      </div>
    </div>
  )
}