import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon?: ReactNode
  trend?: {
    value: number
    isPositive: boolean
    label?: string
  }
  className?: string
  delay?: number
  gradient?: boolean
  pulsing?: boolean
  onClick?: () => void
}

export function StatCard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  delay = 0,
  gradient = false,
  pulsing = false,
  onClick
}: StatCardProps) {
  const cardClasses = cn(
    'glass-morphism rounded-lg p-6 text-center transition-all duration-300',
    gradient && 'bg-gradient-to-br from-flame-500/10 to-flame-600/5',
    onClick && 'cursor-pointer hover:scale-105 hover:shadow-lg',
    className
  )

  const valueClasses = cn(
    'text-3xl font-bold mb-2',
    gradient ? 'text-flame-500' : 'text-flame-600'
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className={cardClasses}
      onClick={onClick}
    >
      {icon && (
        <div className="flex justify-center mb-3">
          <div className={cn(
            'flame-glow rounded-full p-2',
            pulsing && 'animate-pulse'
          )}>
            {icon}
          </div>
        </div>
      )}

      <motion.div 
        className={valueClasses}
        animate={pulsing ? { scale: [1, 1.05, 1] } : {}}
        transition={{ duration: 2, repeat: pulsing ? Infinity : 0 }}
      >
        {typeof value === 'number' ? value.toLocaleString() : value}
      </motion.div>

      <div className="text-sm text-muted-foreground mb-1">
        {title}
      </div>

      {subtitle && (
        <div className="text-xs text-muted-foreground/80">
          {subtitle}
        </div>
      )}

      {trend && (
        <div className={cn(
          'flex items-center justify-center mt-2 text-xs font-medium',
          trend.isPositive ? 'text-green-400' : 'text-red-400'
        )}>
          <span className="mr-1">
            {trend.isPositive ? '↗' : '↘'}
          </span>
          <span>
            {trend.isPositive ? '+' : ''}{trend.value}
            {trend.label && ` ${trend.label}`}
          </span>
        </div>
      )}
    </motion.div>
  )
}