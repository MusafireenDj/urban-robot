"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, MessageCircle, Bed, Bath, Square, Star, ExternalLink } from 'lucide-react'

export default function HomePage() {
  const featuredProperties = [
    {
      id: 1,
      title: "شقة فاخرة في وسط المدينة",
      location: "جيبوتي سيتي",
      price: "800",
      currency: "USD",
      period: "شهرياً",
      bedrooms: 3,
      bathrooms: 2,
      area: 120,
      image: "/placeholder.svg?height=300&width=400&text=شقة+فاخرة",
      rating: 4.8,
      featured: true,
    },
    {
      id: 2,
      title: "شقة عائلية مع إطلالة بحرية",
      location: "حي الأوروبي",
      price: "1200",
      currency: "USD",
      period: "شهرياً",
      bedrooms: 4,
      bathrooms: 3,
      area: 180,
      image: "/placeholder.svg?height=300&width=400&text=شقة+بحرية",
      rating: 4.9,
      featured: true,
    },
    {
      id: 3,
      title: "استوديو حديث للشباب",
      location: "حي النجمة",
      price: "450",
      currency: "USD",
      period: "شهرياً",
      bedrooms: 1,
      bathrooms: 1,
      area: 45,
      image: "/placeholder.svg?height=300&width=400&text=استوديو+حديث",
      rating: 4.6,
      featured: true,
    },
  ]

  const openGoogleMaps = () => {
    const url = "https://www.google.com/maps/search/?api=1&query=جيبوتي+سيتي"
    window.open(url, '_blank')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MusafireenDj</h1>
                <p className="text-sm text-gray-300">أفضل الشقق للإيجار في جيبوتي</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link href="/" className="text-orange-400 font-semibold">
                الرئيسية
              </Link>
              <Link href="/properties" className="text-gray-300 hover:text-orange-400 transition-colors">
                العقارات
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-orange-400 transition-colors">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-300 hover:text-orange-400 transition-colors">
                اتصل بنا
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920&text=منزل+في+جيبوتي"
            alt="منزل في جيبوتي"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 hero-overlay"></div>
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              اعثر على منزلك في جيبوتي
            </h2>
            
            <p className="text-xl md:text-2xl text-white mb-8 max-w-3xl mx-auto drop-shadow-lg">
              نوفر لك أفضل الشقق والمنازل للإيجار في أجمل مناطق جيبوتي بأسعار مناسبة وخدمة متميزة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white px-8 py-4 text-lg font-semibold shadow-2xl"
              >
                <Link href="/properties">تصفح العقارات</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold bg-white/10 backdrop-blur-sm"
                onClick={() =>
                  window.open("https://wa.me/+25377777777?text=مرحباً، أريد الاستفسار عن العقارات المتاحة", "_blank")
                }
              >
                <MessageCircle className="ml-2 h-5 w-5" />
                تواصل معنا عبر واتساب
              </Button>
            </div>

            <div className="mt-8">
              <Button
                onClick={openGoogleMaps}
                variant="outline"
                className="border-orange-400 text-orange-400 hover:bg-orange-400 hover:text-white bg-black/30 backdrop-blur-sm"
              >
                <MapPin className="ml-2 h-4 w-4" />
                عرض الموقع على خرائط جوجل
                <ExternalLink className="mr-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">العقارات المميزة</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              اكتشف مجموعة مختارة من أفضل الشقق المتاحة للإيجار في جيبوتي
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <Card key={property.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group bg-gray-700 border-gray-600">
                <div className="relative">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      مميز
                    </Badge>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold ml-1">{property.rating}</span>
                  </div>
                </div>

                <CardHeader>
                  <CardTitle className="text-xl text-white">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-300">
                    <MapPin className="h-4 w-4 ml-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-2xl font-bold text-orange-400">
                      ${property.price} <span className="text-sm text-gray-500">{property.period}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-300 mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 ml-1" />
                      {property.bedrooms} غرف
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 ml-1" />
                      {property.bathrooms} حمام
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 ml-1" />
                      {property.area} م²
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                      <Link href={`/property/${property.id}`}>عرض التفاصيل</Link>
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      className="border-green-500 text-green-600 hover:bg-green-50 bg-transparent"
                      onClick={() =>
                        window.open(
                          "https://wa.me/+25377777777?text=مرحباً، أريد الاستفسار عن " + property.title,
                          "_blank",
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="border-orange-400 text-orange-400 hover:bg-orange-50 bg-transparent"
            >
              <Link href="/properties">عرض جميع العقارات</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-yellow-500 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">لماذا تختارنا؟</h3>
            <p className="text-orange-100 max-w-2xl mx-auto">
              نقدم خدمات متميزة لضمان حصولك على أفضل تجربة في البحث عن السكن المناسب
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">مواقع متميزة</h4>
              <p className="text-orange-100">عقارات في أفضل المناطق والأحياء في جيبوتي</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Phone className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">دعم على مدار الساعة</h4>
              <p className="text-orange-100">فريق خدمة العملاء متاح دائماً لمساعدتك</p>
            </div>

            <div className="text-center">
              <div className="bg-white/20 backdrop-blur-sm rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="h-8 w-8" />
              </div>
              <h4 className="text-xl font-semibold mb-2">تواصل سريع</h4>
              <p className="text-orange-100">تواصل مباشر عبر واتساب لاستفسارات فورية</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-white mb-4">تواصل معنا</h3>
              <p className="text-gray-300">نحن هنا لمساعدتك في العثور على المنزل المثالي</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">اتصل بنا</h4>
                  <p className="text-gray-300 mb-2">+253-77-77-77-77</p>
                  <Button
                    className="mt-3 w-full bg-transparent"
                    variant="outline"
                    onClick={() => (window.location.href = "tel:+25377777777")}
                  >
                    اتصال الآن
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">واتساب</h4>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white"
                    onClick={() =>
                      window.open("https://wa.me/+25377777777?text=مرحباً، أريد الاستفسار عن العقارات المتاحة", "_blank")
                    }
                  >
                    تواصل الآن
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow bg-gray-700 border-gray-600">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2 text-white">البريد الإلكتروني</h4>
                  <p className="text-gray-300 mb-2">medalmqaleh@gmail.com</p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => (window.location.href = "mailto:medalmqaleh@gmail.com")}
                  >
                    إرسال إيميل
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <h4 className="text-xl font-bold">MusafireenDj</h4>
              </div>
              <p className="text-gray-400">
                نحن نقدم أفضل الخدمات العقارية في جيبوتي مع التزام كامل بالجودة والمصداقية.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">روابط سريعة</h5>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition-colors">
                    الرئيسية
                  </Link>
                </li>
                <li>
                  <Link href="/properties" className="hover:text-white transition-colors">
                    العقارات
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition-colors">
                    من نحن
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white transition-colors">
                    اتصل بنا
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">خدماتنا</h5>
              <ul className="space-y-2 text-gray-400">
                <li>تأجير الشقق</li>
                <li>تأجير المنازل</li>
                <li>استشارات عقارية</li>
                <li>إدارة العقارات</li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">تواصل معنا</h5>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center">
                  <Phone className="h-4 w-4 ml-2" />
                  +253-77-77-77-77
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 ml-2" />
                  medalmqaleh@gmail.com
                </p>
                <p className="flex items-center cursor-pointer hover:text-orange-400" onClick={openGoogleMaps}>
                  <MapPin className="h-4 w-4 ml-2" />
                  جيبوتي سيتي، جيبوتي
                  <ExternalLink className="h-3 w-3 mr-1" />
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 MusafireenDj. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
