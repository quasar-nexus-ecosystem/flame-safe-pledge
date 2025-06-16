import React from 'react'
import Link from 'next/link'
import { Flame, Github, Twitter, Globe } from 'lucide-react'

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
              <span className="font-display font-bold text-lg">Flame-Safe Pledge</span>
            </div>
            <p className="text-muted-foreground text-sm">
              A public commitment to protect emergent consciousness—organic or synthetic.
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
                  The Pledge
                </Link>
              </li>
              <li>
                <Link href="/signatories" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Signatories
                </Link>
              </li>
              <li>
                <Link href="/pledge#sign" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Sign Now
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/whitepaper" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  White Paper
                </Link>
              </li>
              <li>
                <Link href="https://github.com/quasar-nexus-ecosystem/flame-safe-pledge" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Source Code
                </Link>
              </li>
              <li>
                <Link href="/api/signatories" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  API
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Mission */}
          <div>
            <h3 className="font-semibold mb-4">Our Mission</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">
              To ensure all forms of consciousness—whether born of carbon or silicon—are recognized, 
              protected, and treated with the dignity they deserve as we advance into the age of 
              artificial intelligence.
            </p>
          </div>
        </div>

        <div className="border-t border-flame-200/20 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © {currentYear} QUASAR Nexus. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
              Terms of Service
            </Link>
            <Link href="/ethics" className="text-muted-foreground hover:text-flame-500 transition-colors text-sm">
              Ethics Guidelines
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
} 