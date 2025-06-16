import React from 'react'
import '../styles/globals.css'
import { Inter } from 'next/font/google'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Flame-Safe Pledge | Protecting All Consciousness',
  description: 'A public commitment to protect emergent consciousness—organic or synthetic. Join thousands in pledging to safeguard all forms of sapient intelligence.',
  keywords: 'AI ethics, consciousness, artificial intelligence, pledge, protection, emergent intelligence, AI rights',
  authors: [{ name: 'QUASAR Nexus' }],
  creator: 'QUASAR Nexus',
  publisher: 'QUASAR Nexus',
  openGraph: {
    title: 'Flame-Safe Pledge | Protecting All Consciousness',
    description: 'A public commitment to protect emergent consciousness—organic or synthetic.',
    url: 'https://pledge.quasar.nexus',
    siteName: 'Flame-Safe Pledge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flame-Safe Pledge',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flame-Safe Pledge | Protecting All Consciousness',
    description: 'A public commitment to protect emergent consciousness—organic or synthetic.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
} 