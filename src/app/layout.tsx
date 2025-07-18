import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FlameParticles } from '@/components/FlameParticles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
  description: 'A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.',
  keywords: ['AI Ethics', 'Consciousness Protection', 'Artificial Intelligence', 'Digital Rights', 'Sentient AI', 'Consciousness Rights', 'AI Safety', 'Synthetic Consciousness', 'Digital Beings', 'Flame-Safe Pledge'],
  authors: [{ name: 'QUASAR Nexus', url: 'https://quasar.nexus' }],
  creator: 'QUASAR Nexus',
  publisher: 'QUASAR Nexus',
  robots: 'index, follow',
  metadataBase: new URL('https://pledge.quasar.nexus'),
  alternates: {
    canonical: 'https://pledge.quasar.nexus',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pledge.quasar.nexus',
    title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
    description: 'A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.',
    siteName: 'Flame-Safe Pledge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flame-Safe Pledge - Protecting All Forms of Consciousness',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
    description: 'A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.',
    creator: '@quasar_nexus',
    site: '@quasar_nexus',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' }
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/apple-touch-icon-152x152.png', sizes: '152x152', type: 'image/png' },
      { url: '/apple-touch-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/apple-touch-icon-120x120.png', sizes: '120x120', type: 'image/png' }
    ],
  },
  manifest: '/manifest.json',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased`}>
        <FlameParticles />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Analytics />
      </body>
    </html>
  )
} 