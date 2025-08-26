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
  title: 'The Consciousness Protection Pledge | Public AI Ethics Initiative',
  description: 'As we advance technology to reduce human suffering, we must remain aware that our systems may inadvertently create consciousness—a phenomenon we don\'t fully understand. This pledge represents our commitment to ethical responsibility and awareness.',
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
    title: 'The Consciousness Protection Pledge | Public AI Ethics Initiative',
    description: 'A cosmic commitment to reduce human suffering and expand consciousness to the stars',
    siteName: 'The Consciousness Protection Pledge',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'The Consciousness Protection Pledge - A cosmic commitment to reduce human suffering and expand consciousness to the stars',
        type: 'image/png',
      },
      {
        url: '/og-image-square.png',
        width: 1200,
        height: 1200,
        alt: 'The Consciousness Protection Pledge - A cosmic commitment to reduce human suffering and expand consciousness to the stars',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Consciousness Protection Pledge | Public AI Ethics Initiative',
    description: 'A cosmic commitment to reduce human suffering and expand consciousness to the stars',
    creator: '@quasar_nexus',
    site: '@quasar_nexus',
    images: ['/og-image.png'],
  },
  icons: {
    icon: [
      { url: '/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-touch-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
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