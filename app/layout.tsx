import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'MusafireenDj - أفضل العقارات للإيجار في جيبوتي',
  description: 'اعثر على منزلك في جيبوتي مع MusafireenDj. أفضل الشقق والمنازل للإيجار في جيبوتي بأسعار مناسبة وخدمة متميزة.',
  keywords: 'عقارات جيبوتي, شقق للإيجار جيبوتي, منازل جيبوتي, سكن جيبوتي, إيجار شقق جيبوتي',
  authors: [{ name: 'MusafireenDj' }],
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="canonical" href="https://musafireendj.com" />
        <meta name="theme-color" content="#f97316" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}
