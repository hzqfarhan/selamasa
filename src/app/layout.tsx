import type { Metadata, Viewport } from 'next'
import { Playfair_Display, DM_Sans, Poppins, Great_Vibes, Caveat } from 'next/font/google'
import './globals.css'

const playfair = Playfair_Display({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair'
})
const dmSans = DM_Sans({ 
  subsets: ['latin'], 
  weight: ['200', '300', '400', '500', '600'],
  variable: '--font-dm-sans'
})
const poppins = Poppins({ 
  subsets: ['latin'], 
  weight: ['300', '400', '500', '600'],
  variable: '--font-poppins'
})
const greatVibes = Great_Vibes({ 
  subsets: ['latin'], 
  weight: ['400'],
  variable: '--font-great-vibes'
})
const caveat = Caveat({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  variable: '--font-caveat'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#f8f1e8',
}

export const metadata: Metadata = {
  title: 'SelaMasa',
  description: 'Every Moment, Forever Cherished.',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'SelaMasa',
  },
  manifest: '/manifest.json',
  icons: {
    apple: '/icon-192.png',
  },
  other: {
    'mobile-web-app-capable': 'yes',
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} ${playfair.variable} ${dmSans.variable} ${poppins.variable} ${greatVibes.variable} ${caveat.variable}`}>
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  )
}
