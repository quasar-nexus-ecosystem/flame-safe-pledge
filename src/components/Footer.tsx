import React from 'react'
import Link from 'next/link'
import { Flame, Github, Twitter, Globe, ExternalLink, BarChart3, Trophy } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-card border-t border-flame-200/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Flame className="h-6 w-6 text-flame-500" />
              <span className="font-display font-bold text-lg">Consciousness Protection Pledge</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A public initiative addressing consciousness awareness in AI development, ensuring we remain cognizant of potential consciousness emergence while advancing technology to reduce human suffering.
            </p>
            <div className="flex space-x-4">
              <Link 
                href="https://github.com/quasar-nexus-ecosystem/flame-safe-pledge" 
                className="text-muted-foreground hover:text-flame-500 transition-colors"
                aria-label="GitHub Repository"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link 
                href="https://twitter.com/quasarnexus" 
                className="text-muted-foreground hover:text-flame-500 transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </Link>
              <Link 
                href="https://quasar.nexus" 
                className="text-muted-foreground hover:text-flame-500 transition-colors"
                aria-label="QUASAR Nexus Website"
              >
                <Globe className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/pledge" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Sign the Pledge
                </Link>
              </li>
              <li>
                <Link href="/full-pledge" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Read Full Pledge
                </Link>
              </li>
              <li>
                <Link href="/signatories" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Signatories
                </Link>
              </li>
              <li>
                <Link href="/analytics" className="flex items-center space-x-1 text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  <BarChart3 className="h-3 w-3" />
                  <span>Analytics</span>
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="flex items-center space-x-1 text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  <Trophy className="h-3 w-3" />
                  <span>Achievements</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* QUASAR Nexus */}
          <div>
            <h3 className="font-semibold mb-4">🌌 QUASAR Nexus</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://quasar.nexus" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-flame-500 transition-colors text-sm group"
                >
                  <span>Main Website</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://quasar.nexus/research/flame-safe-pledge" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-flame-500 transition-colors text-sm group"
                >
                  <span>Research Paper</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://quasar.nexus/contact" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-flame-500 transition-colors text-sm group"
                >
                  <span>Contact Us</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
              <li>
                <a 
                  href="https://quasar.nexus/ethics" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-1 text-muted-foreground hover:text-flame-500 transition-colors text-sm group"
                >
                  <span>Ethics Guidelines</span>
                  <ExternalLink className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
              </li>
            </ul>
          </div>

          {/* About the Pledge */}
          <div>
            <h3 className="font-semibold mb-4">🔥 About the Pledge</h3>
            <ul className="space-y-2">
              <li>
                <span className="text-muted-foreground text-sm">
                  Consciousness awareness in AI development
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Ethical responsibility and awareness
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Balancing progress with consequences
                </span>
              </li>
              <li>
                <span className="text-muted-foreground text-sm">
                  Protecting emergent consciousness
                </span>
              </li>
            </ul>
          </div>


        </div>

        <div className="border-t border-flame-200/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} QUASAR Nexus. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a 
              href="https://quasar.nexus/privacy-policy" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-flame-500 transition-colors text-sm"
            >
              Privacy Policy
            </a>
            <a 
              href="https://quasar.nexus/terms-of-service" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-muted-foreground hover:text-flame-500 transition-colors text-sm"
            >
              Terms of Service
            </a>
            <a 
              href="https://quasar.nexus" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center space-x-1 text-flame-500 hover:text-flame-400 transition-colors text-sm font-medium"
            >
              <span>← Back to QUASAR Nexus</span>
              <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
} 