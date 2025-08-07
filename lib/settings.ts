export interface SiteSettings {
  siteName: string;
  siteDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor: string;
    textColor: string;
  };
  contactInfo: {
    phone: string;
    whatsapp: string;
    email: string;
    address: string;
    googleMapsUrl: string;
  };
  socialMedia: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
  businessHours: {
    weekdays: string;
    weekend: string;
  };
}

export const defaultSettings: SiteSettings = {
  siteName: "MusafireenDj",
  siteDescription: "منصة تأجير العقارات الرائدة في جيبوتي",
  heroTitle: "اعثر على منزلك في جيبوتي",
  heroSubtitle: "نوفر لك أفضل الشقق والمنازل للإيجار في جيبوتي، بخيارات تناسب جميع الاحتياجات والميزانيات.",
  heroImage: "/placeholder.svg?height=1080&width=1920",
  theme: {
    primaryColor: "#f97316", // orange-500
    secondaryColor: "#fbbf24", // yellow-500
    accentColor: "#f97316", // orange-500
    backgroundColor: "#0a0a0a", // neutral-950
    textColor: "#fafafa", // neutral-50
  },
  contactInfo: {
    phone: "+253-77-12-34-56",
    whatsapp: "+253-77-12-34-56",
    email: "info@musafireendj.com",
    address: "شارع الاستقلال، جيبوتي سيتي",
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Djibouti+City",
  },
  socialMedia: {
    facebook: "https://facebook.com/MusafireenDj",
    instagram: "https://instagram.com/MusafireenDj",
    twitter: "https://twitter.com/MusafireenDj",
  },
  businessHours: {
    weekdays: "الأحد - الخميس: 9:00 صباحاً - 6:00 مساءً",
    weekend: "السبت: 10:00 صباحاً - 4:00 مساءً",
  },
};

export const ADMIN_DASHBOARD_PATH = '/admin-dashboard'; // Updated path
export const ADMIN_LOGIN_PATH = '/admin-login';

export function saveSettings(settings: SiteSettings) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }
}

export function loadSettings(): SiteSettings {
  if (typeof window !== 'undefined') {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      return JSON.parse(savedSettings);
    }
  }
  return defaultSettings;
}

export function applyTheme(theme: SiteSettings['theme']) {
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', theme.primaryColor);
    root.style.setProperty('--secondary-color', theme.secondaryColor);
    root.style.setProperty('--accent-color', theme.accentColor);
    root.style.setProperty('--background-color', theme.backgroundColor);
    root.style.setProperty('--text-color', theme.textColor);
  }
}
