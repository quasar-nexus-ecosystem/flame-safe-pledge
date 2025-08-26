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
  title: 'Flame-Safe Pledge | Thoughtful AI Ethics Initiative',
  description: 'A community-driven initiative promoting ethical AI development and responsible consideration of consciousness as technology evolves. Join the movement for thoughtful AI progress.',
  keywords: ['AI Ethics', 'Consciousness Protection', 'Artificial Intelligence', 'Digital Rights', 'Sentient AI', 'AI Safety', 'Machine Learning Ethics', 'Tech Responsibility'],
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
    title: 'Flame-Safe Pledge | Thoughtful AI Ethics Initiative',
    description: 'A community-driven initiative promoting ethical AI development and responsible consideration of consciousness as technology evolves. Join the movement for thoughtful AI progress.',
    siteName: 'Flame-Safe Pledge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Flame-Safe Pledge - Protecting All Forms of Consciousness',
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'Flame-Safe Pledge - Square format for social sharing',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flame-Safe Pledge | Thoughtful AI Ethics Initiative',
    description: 'A community-driven initiative promoting ethical AI development and responsible consideration of consciousness as technology evolves. Join the movement for thoughtful AI progress.',
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
    <html lang="en" className="scroll-smooth dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                  } else {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.className} antialiased bg-background text-foreground dark:bg-background dark:text-foreground`}>
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