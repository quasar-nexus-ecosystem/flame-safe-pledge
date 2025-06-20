import React from 'react'
import { motion } from 'framer-motion'
import { Users, Building, MapPin, Globe, Calendar, Quote, CheckCircle } from 'lucide-react'
import { Signatory } from '@/types/signatory'

interface SignatoryListProps {
  signatories: Signatory[]
}

export function SignatoryList({ signatories }: SignatoryListProps) {
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
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {signatories.map((signatory, index) => (
        <motion.div
          key={signatory.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="glass-morphism rounded-lg p-6 hover:scale-105 transition-transform"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-flame-100 rounded-full flex items-center justify-center flex-shrink-0">
                {signatory.organization ? (
                  <Building className="h-5 w-5 text-flame-600" />
                ) : (
                  <Users className="h-5 w-5 text-flame-600" />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center space-x-2">
                  <h3 className="font-semibold text-sm truncate flex items-center gap-1">
                    {signatory.name || 'Anonymous'}
                    {signatory.verified && (
                      <span title="Email verified">
                        <CheckCircle className="h-4 w-4 text-blue-500 shrink-0" />
                      </span>
                    )}
                  </h3>
                </div>
                {signatory.organization && (
                  <p className="text-xs text-muted-foreground truncate">
                    {signatory.organization}
                  </p>
                )}
                {signatory.title && (
                  <p className="text-xs text-muted-foreground truncate">
                    {signatory.title}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Message */}
          {signatory.message && (
            <div className="mb-4">
              <div className="relative">
                <Quote className="absolute -top-1 -left-1 h-3 w-3 text-flame-300 opacity-50" />
                <p className="text-sm text-muted-foreground leading-relaxed pl-4 line-clamp-3">
                  {signatory.message}
                </p>
              </div>
            </div>
          )}

          {/* Details */}
          <div className="space-y-2 mb-4">
            {signatory.location && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 flex-shrink-0" />
                <span className="truncate">{signatory.location}</span>
              </div>
            )}
            
            {signatory.website && (
              <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                <Globe className="h-3 w-3 flex-shrink-0" />
                <a
                  href={signatory.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate hover:text-flame-600 transition-colors"
                >
                  {signatory.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            )}

            <div className="flex items-center space-x-2 text-xs text-muted-foreground">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>{new Date(signatory.created_at).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Social Links */}
          {(signatory.social?.twitter || signatory.social?.linkedin || signatory.social?.github) && (
            <div className="flex items-center space-x-3 pt-3 border-t border-flame-200/20">
              {signatory.social.twitter && (
                <a
                  href={`https://twitter.com/${signatory.social.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-flame-600 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              )}
              
              {signatory.social.linkedin && (
                <a
                  href={`https://linkedin.com/in/${signatory.social.linkedin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-flame-600 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              )}
              
              {signatory.social.github && (
                <a
                  href={`https://github.com/${signatory.social.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-flame-600 transition-colors"
                >
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              )}
            </div>
          )}
        </motion.div>
      ))}
    </div>
  )
} 