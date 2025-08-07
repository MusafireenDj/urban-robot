"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { MapPin, Phone, Mail, MessageCircle, Bed, Bath, Square, Star, ArrowLeft, Play, Wifi, Car, Shield, Utensils, Tv, Wind } from 'lucide-react'

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock property data
  const property = {
    id: parseInt(params.id),
    title: "شقة فاخرة في وسط المدينة",
    location: "جيبوتي سيتي، شارع الاستقلال",
    price: "800",
    currency: "USD",
    period: "شهرياً",
    bedrooms: 3,
    bathrooms: 2,
    area: 120,
    rating: 4.8,
    reviews: 24,
    featured: true,
    description:
      "شقة فاخرة ومجهزة بالكامل في قلب جيبوتي سيتي. تتميز بموقع استراتيجي قريب من جميع الخدمات والمرافق الأساسية. الشقة مؤثثة بأثاث عصري وتحتوي على جميع الأجهزة الكهربائية اللازمة. إطلالة رائعة على المدينة من النوافذ الكبيرة. مناسبة للعائلات والمهنيين.",
    images: [
      "/placeholder.svg?height=400&width=600&text=غرفة+المعيشة",
      "/placeholder.svg?height=400&width=600&text=غرفة+النوم+الرئيسية",
      "/placeholder.svg?height=400&width=600&text=المطبخ",
      "/placeholder.svg?height=400&width=600&text=الحمام",
      "/placeholder.svg?height=400&width=600&text=الشرفة",
    ],
    video: "/placeholder-video.mp4",
    amenities: [
      { icon: Wifi, name: "إنترنت عالي السرعة" },
      { icon: Car, name: "موقف سيارة" },
      { icon: Shield, name: "أمان 24/7" },
      { icon: Utensils, name: "مطبخ مجهز" },
      { icon: Tv, name: "تلفزيون ذكي" },
      { icon: Wind, name: "تكييف مركزي" },
    ],
    nearbyPlaces: [
      { name: "مطار جيبوتي الدولي", distance: "15 دقيقة" },
      { name: "مركز التسوق", distance: "5 دقائق" },
      { name: "المستشفى المركزي", distance: "10 دقائق" },
      { name: "الجامعة", distance: "20 دقيقة" },
      { name: "الشاطئ", distance: "25 دقيقة" },
    ],
    landlord: {
      name: "أحمد محمد",
      phone: "+253-77-77-77-77",
      email: "ahmed@example.com",
      whatsapp: "+25377777777",
    },
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
                <p className="text-sm text-gray-300">أفضل الشقق للإيجار</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link href="/" className="text-gray-300 hover:text-orange-400 transition-colors">
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

      {/* Breadcrumb */}
      <div className="bg-gray-800 py-4 border-b border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-400">
            <Link href="/" className="hover:text-orange-400">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-orange-400">
              العقارات
            </Link>
            <span>/</span>
            <span className="text-white">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="outline" className="mb-6 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة للعقارات
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden bg-gray-800 border-gray-700">
                <div className="relative">
                  <Image
                    src={property.images[currentImageIndex] || "/placeholder.svg"}
                    alt={property.title}
                    width={600}
                    height={400}
                    className="w-full h-96 object-cover"
                  />
                  {property.featured && (
                    <Badge className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                      مميز
                    </Badge>
                  )}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-semibold ml-1">{property.rating}</span>
                    <span className="text-xs text-gray-500 mr-1">({property.reviews} تقييم)</span>
                  </div>

                  {/* Video Play Button */}
                  <Button className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/70 text-white" size="sm">
                    <Play className="h-4 w-4 ml-1" />
                    مشاهدة الفيديو
                  </Button>
                </div>

                {/* Thumbnail Gallery */}
                <div className="p-4">
                  <div className="flex space-x-2 rtl:space-x-reverse overflow-x-auto">
                    {property.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 ${
                          currentImageIndex === index ? "border-orange-500" : "border-gray-600"
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`صورة ${index + 1}`}
                          width={80}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Property Info */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-300 text-lg">
                    <MapPin className="h-5 w-5 ml-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price and Basic Info */}
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-orange-400">
                      ${property.price} <span className="text-lg text-gray-500">{property.period}</span>
                    </div>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-gray-300">
                      <div className="flex items-center">
                        <Bed className="h-5 w-5 ml-1" />
                        <span className="font-semibold">{property.bedrooms}</span> غرف نوم
                      </div>
                      <div className="flex items-center">
                        <Bath className="h-5 w-5 ml-1" />
                        <span className="font-semibold">{property.bathrooms}</span> حمام
                      </div>
                      <div className="flex items-center">
                        <Square className="h-5 w-5 ml-1" />
                        <span className="font-semibold">{property.area}</span> م²
                      </div>
                    </div>
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3 text-white">وصف العقار</h3>
                    <p className="text-gray-300 leading-relaxed">{property.description}</p>
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Amenities */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">المرافق والخدمات</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="bg-orange-100 p-2 rounded-lg">
                            <amenity.icon className="h-5 w-5 text-orange-600" />
                          </div>
                          <span className="text-gray-300">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator className="bg-gray-600" />

                  {/* Nearby Places */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4 text-white">الأماكن القريبة</h3>
                    <div className="space-y-3">
                      {property.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-300">{place.name}</span>
                          <span className="text-orange-400 font-semibold">{place.distance}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Contact and Actions */}
            <div className="space-y-6">
              {/* Contact Card */}
              <Card className="sticky top-24 bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-xl text-white">تواصل مع المالك</CardTitle>
                  <CardDescription className="text-gray-300">للاستفسار والحجز</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="bg-gray-700 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-orange-400">{property.landlord.name.charAt(0)}</span>
                    </div>
                    <h4 className="font-semibold text-lg text-white">{property.landlord.name}</h4>
                    <p className="text-gray-400 text-sm">مالك العقار</p>
                  </div>

                  <Separator className="bg-gray-600" />

                  <div className="space-y-3">
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 text-white"
                      onClick={() =>
                        window.open(
                          `https://wa.me/${property.landlord.whatsapp}?text=مرحباً، أريد الاستفسار عن ${property.title}`,
                          "_blank",
                        )
                      }
                    >
                      <MessageCircle className="h-4 w-4 ml-2" />
                      تواصل عبر واتساب
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full border-orange-500 text-orange-400 hover:bg-orange-50 bg-transparent"
                      onClick={() => (window.location.href = `tel:${property.landlord.phone}`)}
                    >
                      <Phone className="h-4 w-4 ml-2" />
                      اتصال هاتفي
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700"
                      onClick={() =>
                        (window.location.href = `mailto:${property.landlord.email}?subject=استفسار عن ${property.title}`)
                      }
                    >
                      <Mail className="h-4 w-4 ml-2" />
                      إرسال إيميل
                    </Button>
                  </div>

                  <Separator className="bg-gray-600" />

                  <div className="text-center text-sm text-gray-400">
                    <p>أو اتصل مباشرة على:</p>
                    <p className="font-semibold text-white">{property.landlord.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-lg text-white">معلومات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">نوع العقار:</span>
                    <span className="font-semibold text-white">شقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">حالة الأثاث:</span>
                    <span className="font-semibold text-white">مفروش</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">الطابق:</span>
                    <span className="font-semibold text-white">الثالث</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">سنة البناء:</span>
                    <span className="font-semibold text-white">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">متاح من:</span>
                    <span className="font-semibold text-white">فوراً</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

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
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 ml-2" />
                  جيبوتي سيتي، جيبوتي
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
