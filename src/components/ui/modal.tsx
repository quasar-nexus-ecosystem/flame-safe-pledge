import { ReactNode, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title?: string
  description?: string
  children: ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  variant?: 'default' | 'cosmic' | 'glass'
  className?: string
  hideCloseButton?: boolean
  closeOnBackdropClick?: boolean
}

export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  size = 'md',
  variant = 'default',
  className,
  hideCloseButton = false,
  closeOnBackdropClick = true
}: ModalProps) {
  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [isOpen, onClose])

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
    
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [isOpen])

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
    full: 'max-w-4xl'
  }

  const variantClasses = {
    default: 'bg-white dark:bg-slate-900 border-2 border-gray-200 dark:border-gray-700',
    cosmic: 'bg-gradient-to-br from-slate-900/95 to-purple-900/95 border-2 border-purple-500/50',
    glass: 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-2 border-purple-500/50'
  }

  const backdropClasses = {
    default: 'bg-black/50',
    cosmic: 'bg-black/60 backdrop-blur-sm',
    glass: 'bg-black/40 backdrop-blur-sm'
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={cn(
            'fixed inset-0 flex items-center justify-center z-50 p-4',
            backdropClasses[variant]
          )}
          onClick={closeOnBackdropClick ? onClose : undefined}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className={cn(
              'relative rounded-2xl shadow-2xl w-full mx-4',
              sizeClasses[size],
              variantClasses[variant],
              className
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            {(title || !hideCloseButton) && (
              <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                <div>
                  {title && (
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {title}
                    </h2>
                  )}
                  {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {description}
                    </p>
                  )}
                </div>
                {!hideCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className="p-6">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// Specialized modal variants
export function CosmicModal(props: Omit<ModalProps, 'variant'>) {
  return <Modal {...props} variant="cosmic" />
}

export function GlassModal(props: Omit<ModalProps, 'variant'>) {
  return <Modal {...props} variant="glass" />
}

// Modal content helpers
export function ModalHeader({ 
  title, 
  description, 
  className 
}: { 
  title: string
  description?: string
  className?: string 
}) {
  return (
    <div className={cn('mb-6', className)}>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-600 dark:text-gray-300">
          {description}
        </p>
      )}
    </div>
  )
}

export function ModalFooter({ 
  children, 
  className 
}: { 
  children: ReactNode
  className?: string 
}) {
  return (
    <div className={cn('flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200 dark:border-gray-700', className)}>
      {children}
    </div>
  )
}