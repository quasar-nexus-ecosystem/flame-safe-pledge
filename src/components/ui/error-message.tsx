import { ReactNode } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AlertTriangle, X, RefreshCw } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ErrorMessageProps {
  message: string
  title?: string
  variant?: 'inline' | 'card' | 'banner'
  severity?: 'error' | 'warning' | 'info'
  onRetry?: () => void
  onDismiss?: () => void
  icon?: ReactNode
  className?: string
  retryLabel?: string
  show?: boolean
}

export function ErrorMessage({
  message,
  title,
  variant = 'inline',
  severity = 'error',
  onRetry,
  onDismiss,
  icon,
  className,
  retryLabel = 'Try Again',
  show = true
}: ErrorMessageProps) {
  const severityStyles = {
    error: {
      bg: 'bg-red-50 dark:bg-red-900/20',
      border: 'border-red-200 dark:border-red-800',
      text: 'text-red-800 dark:text-red-200',
      icon: 'text-red-500 dark:text-red-400'
    },
    warning: {
      bg: 'bg-yellow-50 dark:bg-yellow-900/20',
      border: 'border-yellow-200 dark:border-yellow-800',
      text: 'text-yellow-800 dark:text-yellow-200',
      icon: 'text-yellow-500 dark:text-yellow-400'
    },
    info: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      border: 'border-blue-200 dark:border-blue-800',
      text: 'text-blue-800 dark:text-blue-200',
      icon: 'text-blue-500 dark:text-blue-400'
    }
  }

  const styles = severityStyles[severity]
  const defaultIcon = <AlertTriangle className="h-5 w-5" />

  if (variant === 'inline') {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={cn(
              'flex items-center space-x-2 text-sm mt-1',
              styles.text,
              className
            )}
          >
            <div className={styles.icon}>
              {icon || defaultIcon}
            </div>
            <span>{message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  if (variant === 'banner') {
    return (
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              'border-l-4 p-4',
              styles.bg,
              styles.border,
              className
            )}
          >
            <div className="flex items-start">
              <div className={cn('flex-shrink-0', styles.icon)}>
                {icon || defaultIcon}
              </div>
              <div className="ml-3 flex-1">
                {title && (
                  <h3 className={cn('text-sm font-medium', styles.text)}>
                    {title}
                  </h3>
                )}
                <p className={cn('text-sm', styles.text, title && 'mt-1')}>
                  {message}
                </p>
                {(onRetry || onDismiss) && (
                  <div className="mt-3 flex space-x-3">
                    {onRetry && (
                      <button
                        onClick={onRetry}
                        className={cn(
                          'inline-flex items-center space-x-1 text-sm font-medium rounded-md px-3 py-1 transition-colors',
                          'hover:bg-white/50 dark:hover:bg-black/20',
                          styles.text
                        )}
                      >
                        <RefreshCw className="h-4 w-4" />
                        <span>{retryLabel}</span>
                      </button>
                    )}
                    {onDismiss && (
                      <button
                        onClick={onDismiss}
                        className={cn(
                          'text-sm font-medium rounded-md px-3 py-1 transition-colors',
                          'hover:bg-white/50 dark:hover:bg-black/20',
                          styles.text
                        )}
                      >
                        Dismiss
                      </button>
                    )}
                  </div>
                )}
              </div>
              {onDismiss && (
                <div className="ml-auto pl-3">
                  <button
                    onClick={onDismiss}
                    className={cn(
                      'inline-flex rounded-md p-1.5 transition-colors',
                      'hover:bg-white/50 dark:hover:bg-black/20',
                      styles.icon
                    )}
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    )
  }

  // Card variant
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className={cn(
            'rounded-lg border p-4',
            styles.bg,
            styles.border,
            className
          )}
        >
          <div className="flex items-start">
            <div className={cn('flex-shrink-0', styles.icon)}>
              {icon || defaultIcon}
            </div>
            <div className="ml-3 flex-1">
              {title && (
                <h3 className={cn('text-sm font-medium', styles.text)}>
                  {title}
                </h3>
              )}
              <p className={cn('text-sm', styles.text, title && 'mt-1')}>
                {message}
              </p>
              {(onRetry || onDismiss) && (
                <div className="mt-4 flex space-x-3">
                  {onRetry && (
                    <button
                      onClick={onRetry}
                      className={cn(
                        'inline-flex items-center space-x-1 text-sm font-medium rounded-md px-3 py-2 transition-colors',
                        'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600',
                        'hover:bg-gray-50 dark:hover:bg-gray-700',
                        styles.text
                      )}
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>{retryLabel}</span>
                    </button>
                  )}
                  {onDismiss && (
                    <button
                      onClick={onDismiss}
                      className={cn(
                        'text-sm font-medium rounded-md px-3 py-2 transition-colors',
                        'hover:bg-white/50 dark:hover:bg-black/20',
                        styles.text
                      )}
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              )}
            </div>
            {onDismiss && !onRetry && (
              <div className="ml-auto">
                <button
                  onClick={onDismiss}
                  className={cn(
                    'inline-flex rounded-md p-1.5 transition-colors',
                    'hover:bg-white/50 dark:hover:bg-black/20',
                    styles.icon
                  )}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Convenience components for different severities
export function ErrorCard(props: Omit<ErrorMessageProps, 'variant' | 'severity'>) {
  return <ErrorMessage {...props} variant="card" severity="error" />
}

export function WarningCard(props: Omit<ErrorMessageProps, 'variant' | 'severity'>) {
  return <ErrorMessage {...props} variant="card" severity="warning" />
}

export function InfoCard(props: Omit<ErrorMessageProps, 'variant' | 'severity'>) {
  return <ErrorMessage {...props} variant="card" severity="info" />
}