'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Flame, Menu, X, ExternalLink } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { href: '/full-pledge', label: 'The Pledge' },
    { href: '/signatories', label: 'Signatories' },
    { href: '/analytics', label: '📊 Analytics' },
    { href: '/achievements', label: '🏆 Achievements' },
  ]

  return (
    <header className="sticky top-0 z-50 glass-morphism border-b border-flame-200/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <motion.div
              className="flame-glow rounded-full p-2"
              animate={{ 
                boxShadow: [
                  '0 0 5px #f59144, 0 0 10px #f59144, 0 0 15px #f59144',
                  '0 0 10px #f2711e, 0 0 20px #f2711e, 0 0 30px #f2711e',
                  '0 0 5px #f59144, 0 0 10px #f59144, 0 0 15px #f59144',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Flame className="h-6 w-6 text-flame-500 group-hover:animate-flame-flicker" />
            </motion.div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg flame-text-glow">
                Flame-Safe
              </span>
              <span className="text-xs text-muted-foreground -mt-1">
                Pledge
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-flame-500 transition-colors font-medium relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-flame-500 transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            
            {/* QUASAR Nexus Home Link */}
            <a
              href="https://quasar.nexus"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-1 text-foreground hover:text-flame-500 transition-colors font-medium relative group"
            >
              <span>🌌 QUASAR Nexus</span>
              <ExternalLink className="h-3 w-3" />
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-flame-500 transition-all duration-300 group-hover:w-full" />
            </a>
            
            <Link
              href="/pledge"
              className="gradient-flame text-white px-6 py-2 rounded-full font-semibold hover:scale-105 transition-transform shadow-lg hover:shadow-xl"
            >
              🔥 Sign the Pledge
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-accent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-flame-200/20"
          >
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-foreground hover:text-flame-500 transition-colors font-medium px-4 py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* QUASAR Nexus Home Link - Mobile */}
              <a
                href="https://quasar.nexus"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-foreground hover:text-flame-500 transition-colors font-medium px-4 py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <span>🌌 QUASAR Nexus</span>
                <ExternalLink className="h-3 w-3" />
              </a>
              
              <Link
                href="/pledge"
                className="gradient-flame text-white px-6 py-3 rounded-full font-semibold text-center mx-4 hover:scale-105 transition-transform"
                onClick={() => setIsMenuOpen(false)}
              >
                🔥 Sign the Pledge
              </Link>
            </div>
          </motion.nav>
        )}
      </div>
    </header>
  )
} 