import React, { useState, useMemo, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Building, MapPin, Globe, Calendar, Quote, CheckCircle, ChevronDown, ChevronUp, X } from 'lucide-react'
import { Signatory } from '@/types/signatory'

interface SignatoryListProps {
  signatories: Signatory[]
}

// Memoized individual signatory card component
const SignatoryCard = React.memo(({ 
  signatory, 
  index, 
  expandedCard, 
  onToggleExpand, 
  onOpenModal 
}: {
  signatory: Signatory
  index: number
  expandedCard: string | null
  onToggleExpand: (id: string) => void
  onOpenModal: (signatory: Signatory) => void
}) => {
  const truncateMessage = useCallback((message: string, maxLength: number = 150) => {
    if (message.length <= maxLength) return message
    return message.substring(0, maxLength) + '...'
  }, [])

  const isExpanded = expandedCard === signatory.id

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="glass-morphism rounded-lg p-6 hover:scale-105 transition-all duration-300 group hover:shadow-2xl hover:shadow-flame-500/20"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-flame-100 to-flame-200 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
            {signatory.organization ? (
              <Building className="h-5 w-5 text-flame-600" />
            ) : (
              <Users className="h-5 w-5 text-flame-600" />
            )}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                {signatory.name || 'Anonymous Protector'}
              </h3>
              {signatory.verified && (
                <span title="Verified">
                  <CheckCircle className="h-4 w-4 text-blue-500 flex-shrink-0" />
                </span>
              )}
            </div>
            {signatory.organization && (
              <p className="text-sm text-gray-600 dark:text-gray-300 truncate">
                {signatory.title ? `${signatory.title} at ${signatory.organization}` : signatory.organization}
              </p>
            )}
          </div>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <div className="text-xs text-gray-500 dark:text-gray-400">
            {new Date(signatory.created_at).toLocaleDateString()}
          </div>
          <button
            onClick={() => onOpenModal(signatory)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded transition-colors"
            title="View details"
          >
            <Globe className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {/* Location */}
      {signatory.location && (
        <div className="flex items-center space-x-2 mb-3 text-sm text-gray-600 dark:text-gray-300">
          <MapPin className="h-4 w-4 flex-shrink-0" />
          <span className="truncate">{signatory.location}</span>
        </div>
      )}

      {/* Message */}
      {signatory.message && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Quote className="h-4 w-4 text-gray-400 flex-shrink-0" />
            <span className="text-sm text-gray-600 dark:text-gray-300">Message</span>
          </div>
          
          <div className="text-sm text-gray-700 dark:text-gray-200 leading-relaxed">
            <AnimatePresence mode="wait">
              {isExpanded ? (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="italic bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg"
                >
                  "{signatory.message}"
                </motion.div>
              ) : (
                <motion.div
                  key="collapsed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="italic bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg"
                >
                  "{truncateMessage(signatory.message)}"
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {signatory.message.length > 150 && (
            <button
              onClick={() => onToggleExpand(signatory.id)}
              className="mt-2 text-xs text-flame-600 hover:text-flame-700 flex items-center space-x-1 transition-colors"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-3 w-3" />
                  <span>Show less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="h-3 w-3" />
                  <span>Read more</span>
                </>
              )}
            </button>
          )}
        </div>
      )}

      {/* Website */}
      {signatory.website && (
        <div className="mt-3">
          <a
            href={signatory.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-flame-600 hover:text-flame-700 underline break-all"
          >
            {signatory.website}
          </a>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
        <div className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-400">
          <Calendar className="h-3 w-3" />
          <span>Signed {new Date(signatory.created_at).toLocaleDateString()}</span>
        </div>
        {signatory.organization && (
          <div className="text-xs bg-flame-100 text-flame-800 px-2 py-1 rounded-full">
            Organization
          </div>
        )}
      </div>
    </motion.div>
  )
})

SignatoryCard.displayName = 'SignatoryCard'

export const SignatoryList = React.memo(function SignatoryList({ signatories }: SignatoryListProps) {
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [selectedSignatory, setSelectedSignatory] = useState<Signatory | null>(null)

  // Memoized event handlers to prevent unnecessary re-renders
  const handleToggleExpand = useCallback((id: string) => {
    setExpandedCard(prev => prev === id ? null : id)
  }, [])

  const handleOpenModal = useCallback((signatory: Signatory) => {
    setSelectedSignatory(signatory)
  }, [])

  const handleCloseModal = useCallback(() => {
    setSelectedSignatory(null)
  }, [])

  // Early return for empty state
  if (signatories.length === 0) {
    return (
      <div className="text-center py-12">
        <Users className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
        <h3 className="text-lg font-semibold mb-2">No signatories found</h3>
        <p className="text-muted-foreground">
          Try adjusting your search or filter criteria
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {signatories.map((signatory, index) => (
          <SignatoryCard
            key={signatory.id}
            signatory={signatory}
            index={index}
            expandedCard={expandedCard}
            onToggleExpand={handleToggleExpand}
            onOpenModal={handleOpenModal}
          />
        ))}
      </div>

      {/* Modal for detailed view */}
      <AnimatePresence>
        {selectedSignatory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={handleCloseModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-slate-900 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto border-2 border-purple-500/50 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-flame-100 to-flame-200 rounded-full flex items-center justify-center">
                    {selectedSignatory.organization ? (
                      <Building className="h-6 w-6 text-flame-600" />
                    ) : (
                      <Users className="h-6 w-6 text-flame-600" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      {selectedSignatory.name || 'Anonymous Protector'}
                    </h2>
                    {selectedSignatory.organization && (
                      <p className="text-gray-600 dark:text-gray-300">
                        {selectedSignatory.title ? `${selectedSignatory.title} at ${selectedSignatory.organization}` : selectedSignatory.organization}
                      </p>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleCloseModal}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
                  aria-label="Close modal"
                  title="Close modal"
                >
                  <X className="h-5 w-5 text-gray-500" />
                </button>
              </div>

              <div className="space-y-4">
                {selectedSignatory.location && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Location</span>
                    </div>
                    <p className="text-gray-900 dark:text-white">{selectedSignatory.location}</p>
                  </div>
                )}

                {selectedSignatory.message && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Quote className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Message</span>
                    </div>
                    <p className="text-gray-900 dark:text-white italic bg-gray-50 dark:bg-gray-800/50 p-3 rounded-lg">
                      "{selectedSignatory.message}"
                    </p>
                  </div>
                )}

                {selectedSignatory.website && (
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Website</span>
                    </div>
                    <a
                      href={selectedSignatory.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-flame-600 hover:text-flame-700 underline break-all"
                    >
                      {selectedSignatory.website}
                    </a>
                  </div>
                )}

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">Signed</span>
                  </div>
                  <p className="text-gray-900 dark:text-white">
                    {new Date(selectedSignatory.created_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>

                {selectedSignatory.verified && (
                  <div className="flex items-center space-x-2 text-blue-600">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Verified Signatory</span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
})
