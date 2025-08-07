// إعدادات الموقع القابلة للتعديل
export interface SiteSettings {
  siteName: string
  siteDescription: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string
  contactInfo: {
    phone: string
    whatsapp: string
    email: string
    address: string
    googleMapsUrl: string
  }
  socialMedia: {
    facebook?: string
    instagram?: string
    twitter?: string
  }
  businessHours: {
    weekdays: string
    weekend: string
  }
  features: {
    enableBooking: boolean
    enableChat: boolean
    enableReviews: boolean
  }
}

// الإعدادات الافتراضية
export const defaultSettings: SiteSettings = {
  siteName: 'MusafireenDj',
  siteDescription: 'أفضل الشقق للإيجار في جيبوتي',
  heroTitle: 'اعثر على منزلك في جيبوتي',
  heroSubtitle: 'نوفر لك أفضل الشقق والمنازل للإيجار في أجمل مناطق جيبوتي بأسعار مناسبة وخدمة متميزة',
  heroImage: '/placeholder.svg?height=1080&width=1920&text=منزل+في+جيبوتي',
  contactInfo: {
    phone: '+253-77-77-77-77',
    whatsapp: '+253-77-77-77-77',
    email: 'medalmqaleh@gmail.com',
    address: 'شارع الاستقلال، جيبوتي سيتي، جيبوتي',
    googleMapsUrl: 'https://www.google.com/maps/search/?api=1&query=جيبوتي+سيتي'
  },
  socialMedia: {
    facebook: 'https://facebook.com/MusafireenDj',
    instagram: 'https://instagram.com/MusafireenDj',
    twitter: 'https://twitter.com/MusafireenDj'
  },
  businessHours: {
    weekdays: 'السبت - الخميس: 8:00 ص - 6:00 م',
    weekend: 'الجمعة: مغلق'
  },
  features: {
    enableBooking: true,
    enableChat: true,
    enableReviews: true
  }
}

// حفظ الإعدادات في localStorage
export const saveSettings = (settings: SiteSettings): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('siteSettings', JSON.stringify(settings))
  }
}

// تحميل الإعدادات من localStorage
export const loadSettings = (): SiteSettings => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('siteSettings')
    if (saved) {
      try {
        return { ...defaultSettings, ...JSON.parse(saved) }
      } catch {
        return defaultSettings
      }
    }
  }
  return defaultSettings
}
