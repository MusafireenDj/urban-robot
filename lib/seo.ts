// تحسين محركات البحث (SEO)
export const siteMetadata = {
  title: 'MusafireenDj - أفضل العقارات للإيجار في جيبوتي',
  description: 'اعثر على منزلك في جيبوتي مع MusafireenDj. أفضل الشقق والمنازل للإيجار في جيبوتي بأسعار مناسبة وخدمة متميزة. شقق مفروشة، فيلل، استوديوهات في أفضل المناطق.',
  keywords: [
    'عقارات جيبوتي',
    'شقق للإيجار جيبوتي',
    'منازل جيبوتي',
    'سكن جيبوتي',
    'إيجار شقق جيبوتي',
    'عقارات للإيجار',
    'MusafireenDj',
    'Djibouti rentals',
    'Djibouti apartments',
    'Djibouti housing',
    'منزلك في جيبوتي',
    'بيوت جيبوتي'
  ],
  author: 'MusafireenDj',
  siteUrl: 'https://musafireendj.com',
  image: '/og-image.jpg',
  twitterHandle: '@MusafireenDj',
  language: 'ar',
  locale: 'ar_DJ'
}

export const generateMetaTags = (pageTitle?: string, pageDescription?: string) => {
  const title = pageTitle ? `${pageTitle} | ${siteMetadata.title}` : siteMetadata.title
  const description = pageDescription || siteMetadata.description
  
  return {
    title,
    description,
    keywords: siteMetadata.keywords.join(', '),
    author: siteMetadata.author,
    'og:title': title,
    'og:description': description,
    'og:image': siteMetadata.image,
    'og:url': siteMetadata.siteUrl,
    'og:type': 'website',
    'og:locale': siteMetadata.locale,
    'twitter:card': 'summary_large_image',
    'twitter:site': siteMetadata.twitterHandle,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': siteMetadata.image,
    'viewport': 'width=device-width, initial-scale=1',
    'robots': 'index, follow',
    'googlebot': 'index, follow'
  }
}

// Schema.org structured data
export const generateStructuredData = () => {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'MusafireenDj',
    description: siteMetadata.description,
    url: siteMetadata.siteUrl,
    telephone: '+253-77-77-77-77',
    email: 'medalmqaleh@gmail.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'شارع الاستقلال',
      addressLocality: 'جيبوتي سيتي',
      addressCountry: 'DJ'
    },
    areaServed: {
      '@type': 'City',
      name: 'جيبوتي'
    },
    serviceType: ['تأجير الشقق', 'تأجير المنازل', 'استشارات عقارية']
  }
}
