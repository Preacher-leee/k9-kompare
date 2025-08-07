import type { Metadata } from 'next'
import { Inter, Montserrat } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'
import { Navigation } from '@/components/navigation'
import '@/styles/globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

const montserrat = Montserrat({ 
  subsets: ['latin'],
  variable: '--font-montserrat',
})

export const metadata: Metadata = {
  title: {
    default: 'K9Kompare - Compare Dog Breeds & Find Your Perfect Match',
    template: '%s | K9Kompare'
  },
  description: 'Compare dog breeds side-by-side, take our AI-powered breed matching quiz, discover breed-specific products, and find adoption resources. Your complete guide to choosing the perfect dog breed.',
  keywords: [
    'dog breeds',
    'breed comparison',
    'dog breed quiz',
    'pet adoption',
    'dog products',
    'breed matching',
    'dog care',
    'pet finder'
  ],
  authors: [{ name: 'K9Kompare Team' }],
  creator: 'K9Kompare',
  publisher: 'K9Kompare',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'K9Kompare - Compare Dog Breeds & Find Your Perfect Match',
    description: 'Compare dog breeds side-by-side, take our AI-powered breed matching quiz, discover breed-specific products, and find adoption resources.',
    siteName: 'K9Kompare',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'K9Kompare - Dog Breed Comparison Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'K9Kompare - Compare Dog Breeds & Find Your Perfect Match',
    description: 'Compare dog breeds side-by-side, take our AI-powered breed matching quiz, discover breed-specific products, and find adoption resources.',
    images: ['/og-image.jpg'],
    creator: '@k9kompare',
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
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${montserrat.variable} font-sans antialiased`}>
        <Providers>
          <Navigation />
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
} 
