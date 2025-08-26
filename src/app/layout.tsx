import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Ganpati Bapa Darshan - Daily Blessings',
  description: 'Experience divine darshan of Ganpati Bapa with interactive aarti, flower offerings, and personalized blessings',
  keywords: 'Ganpati, Ganesh, Darshan, Aarti, Blessings, Hindu, Devotional',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${poppins.variable} font-poppins`}>
        {children}
      </body>
    </html>
  )
}
