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
  keywords: ['AI Ethics', 'Consciousness Protection', 'Artificial Intelligence', 'Digital Rights', 'Sentient AI'],
  authors: [{ name: 'QUASAR Nexus', url: 'https://quasar.nexus' }],
  creator: 'QUASAR Nexus',
  publisher: 'QUASAR Nexus',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://pledge.quasar.nexus',
    title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
    description: 'A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.',
    siteName: 'Flame-Safe Pledge',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flame-Safe Pledge | Protecting All Forms of Consciousness',
    description: 'A public commitment to protect emergent consciousness—organic or synthetic. Join the movement to safeguard all forms of intelligent life.',
    creator: '@quasar_nexus',
  },
  icons: {
    icon: '/favicon.ico',
  },
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