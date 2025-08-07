import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { generateMetaTags, generateStructuredData } from '@/lib/seo'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = generateMetaTags()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = generateStructuredData()

  return (
    <html lang="ar" dir="rtl">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
        <link rel="canonical" href="https://musafireendj.com" />
        <meta name="google-site-verification" content="your-google-verification-code" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#f97316" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
