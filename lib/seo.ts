import type { Metadata } from 'next';
import { loadSettings } from './settings';

export function generateMetadata(pageTitle?: string, pageDescription?: string): Metadata {
  const settings = loadSettings(); // This will load default settings on server, actual settings on client
  const title = pageTitle ? `${pageTitle} | ${settings.siteName}` : settings.siteName;
  const description = pageDescription || settings.siteDescription;

  return {
    title,
    description,
    metadataBase: new URL('https://www.musafireendj.com'), // Replace with your actual domain
    openGraph: {
      title,
      description,
      url: 'https://www.musafireendj.com', // Replace with your actual domain
      siteName: settings.siteName,
      images: [
        {
          url: settings.heroImage, // Use the hero image from settings
          width: 1920,
          height: 1080,
          alt: settings.heroTitle,
        },
      ],
      locale: 'ar_DJ', // Arabic (Djibouti)
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [settings.heroImage],
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
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon-16x16.png',
      apple: '/apple-touch-icon.png',
    },
    manifest: '/site.webmanifest',
    keywords: ['Djibouti', 'Real Estate', 'Rentals', 'Apartments', 'Houses', 'Property', 'MusafireenDj'],
    authors: [{ name: 'MusafireenDj Team' }],
    creator: 'MusafireenDj Team',
    publisher: 'Vercel',
  };
}
