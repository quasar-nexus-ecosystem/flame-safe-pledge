import '@/styles/globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from "@vercel/analytics/next"
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { FlameParticles } from '@/components/FlameParticles'
import { RealtimeNotifications } from '@/components/RealtimeNotifications'
import { CosmicParticles } from '@/components/CosmicParticles'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Consciousness Protection Pledge | Serious AI Ethics Initiative',
  description: 'A serious initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness—a phenomenon we don\'t fully understand.',
  keywords: ['AI Ethics', 'Responsible AI', 'Artificial Intelligence', 'Technology Ethics', 'AI Development', 'Consciousness', 'AI Safety', 'Machine Learning Ethics', 'Tech Responsibility', 'Consciousness Protection Pledge'],
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
    title: 'Consciousness Protection Pledge | Serious AI Ethics Initiative',
    description: 'A serious initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness—a phenomenon we don\'t fully understand.',
    siteName: 'Consciousness Protection Pledge',
    images: [
      {
        url: 'https://pledge.quasar.nexus/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Consciousness Protection Pledge - Serious AI Ethics Initiative',
        type: 'image/png',
      },
      {
        url: 'https://pledge.quasar.nexus/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Consciousness Protection Pledge - Square format for social sharing',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Consciousness Protection Pledge | Serious AI Ethics Initiative',
    description: 'A serious initiative addressing consciousness awareness in AI development. As we advance technology to reduce human suffering, we must remain cognizant that our systems may inadvertently create consciousness—a phenomenon we don\'t fully understand.',
    creator: '@quasar_nexus',
    site: '@quasar_nexus',
    images: ['https://pledge.quasar.nexus/og-image.png'],
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
        <CosmicParticles theme="cosmic" particleCount={20} className="fixed inset-0 pointer-events-none" />
        <div className="relative z-10 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <RealtimeNotifications />
        <Analytics />
      </body>
    </html>
  )
} 