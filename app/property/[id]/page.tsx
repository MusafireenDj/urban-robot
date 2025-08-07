"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Bed,
  Bath,
  Square,
  Star,
  ArrowLeft,
  Play,
  Wifi,
  Car,
  Shield,
  Utensils,
  Tv,
  Wind,
} from "lucide-react"
import { Label } from "@/components/ui/label"

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Mock property data - في التطبيق الحقيقي، ستحصل على البيانات من قاعدة البيانات
  const property = {
    id: Number.parseInt(params.id),
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
      phone: "+253 XX XX XX XX",
      email: "ahmed@example.com",
      whatsapp: "+253XXXXXXXX",
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">عقارات جيبوتي</h1>
                <p className="text-sm text-gray-600">أفضل الشقق للإيجار</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                الرئيسية
              </Link>
              <Link href="/properties" className="text-gray-600 hover:text-blue-600 transition-colors">
                العقارات
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                اتصل بنا
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="bg-white py-4 border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 rtl:space-x-reverse text-sm text-gray-600">
            <Link href="/" className="hover:text-blue-600">
              الرئيسية
            </Link>
            <span>/</span>
            <Link href="/properties" className="hover:text-blue-600">
              العقارات
            </Link>
            <span>/</span>
            <span className="text-gray-800">{property.title}</span>
          </div>
        </div>
      </div>

      {/* Property Details */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button variant="outline" className="mb-6 bg-transparent" asChild>
            <Link href="/properties">
              <ArrowLeft className="h-4 w-4 ml-2" />
              العودة للعقارات
            </Link>
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Images and Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Image Gallery */}
              <Card className="overflow-hidden">
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
                          currentImageIndex === index ? "border-blue-500" : "border-gray-200"
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
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">{property.title}</CardTitle>
                  <CardDescription className="flex items-center text-gray-600 text-lg">
                    <MapPin className="h-5 w-5 ml-1" />
                    {property.location}
                  </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Price and Basic Info */}
                  <div className="flex items-center justify-between">
                    <div className="text-3xl font-bold text-blue-600">
                      ${property.price} <span className="text-lg text-gray-500">{property.period}</span>
                    </div>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse text-gray-600">
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

                  <Separator />

                  {/* Description */}
                  <div>
                    <h3 className="text-xl font-semibold mb-3">وصف العقار</h3>
                    <p className="text-gray-600 leading-relaxed">{property.description}</p>
                  </div>

                  <Separator />

                  {/* Amenities */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">المرافق والخدمات</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {property.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center space-x-3 rtl:space-x-reverse">
                          <div className="bg-blue-100 p-2 rounded-lg">
                            <amenity.icon className="h-5 w-5 text-blue-600" />
                          </div>
                          <span className="text-gray-700">{amenity.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Nearby Places */}
                  <div>
                    <h3 className="text-xl font-semibold mb-4">الأماكن القريبة</h3>
                    <div className="space-y-3">
                      {property.nearbyPlaces.map((place, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-gray-700">{place.name}</span>
                          <span className="text-blue-600 font-semibold">{place.distance}</span>
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
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle className="text-xl">تواصل مع المالك</CardTitle>
                  <CardDescription>للاستفسار والحجز</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                      <span className="text-2xl font-bold text-gray-600">{property.landlord.name.charAt(0)}</span>
                    </div>
                    <h4 className="font-semibold text-lg">{property.landlord.name}</h4>
                    <p className="text-gray-600 text-sm">مالك العقار</p>
                  </div>

                  <Separator />

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
                      className="w-full border-blue-600 text-blue-600 hover:bg-blue-50 bg-transparent"
                      onClick={() => (window.location.href = `tel:${property.landlord.phone}`)}
                    >
                      <Phone className="h-4 w-4 ml-2" />
                      اتصال هاتفي
                    </Button>

                    <Button
                      variant="outline"
                      className="w-full bg-transparent"
                      onClick={() =>
                        (window.location.href = `mailto:${property.landlord.email}?subject=استفسار عن ${property.title}`)
                      }
                    >
                      <Mail className="h-4 w-4 ml-2" />
                      إرسال إيميل
                    </Button>
                  </div>

                  <Separator />

                  <div className="text-center text-sm text-gray-600">
                    <p>أو اتصل مباشرة على:</p>
                    <p className="font-semibold text-gray-800">{property.landlord.phone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Info Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">معلومات سريعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">نوع العقار:</span>
                    <span className="font-semibold">شقة</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">حالة الأثاث:</span>
                    <span className="font-semibold">مفروش</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">الطابق:</span>
                    <span className="font-semibold">الثالث</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">سنة البناء:</span>
                    <span className="font-semibold">2020</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">متاح من:</span>
                    <span className="font-semibold">فوراً</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Media Upload Section - للمالك */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-white">إضافة صور وفيديوهات</CardTitle>
                <CardDescription className="text-gray-300">
                  يمكن لمالك العقار إضافة المزيد من الصور والفيديوهات
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-white">رفع الصور</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                    <div className="text-gray-400">
                      <svg className="mx-auto h-12 w-12 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                        />
                      </svg>
                      <p className="text-lg">اسحب الصور هنا أو انقر للاختيار</p>
                      <p className="text-sm">PNG, JPG, GIF حتى 10MB</p>
                    </div>
                  </div>
                </div>

                <div>
                  <Label className="text-white">رفع الفيديوهات</Label>
                  <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center hover:border-orange-400 transition-colors">
                    <div className="text-gray-400">
                      <Play className="mx-auto h-12 w-12 mb-4" />
                      <p className="text-lg">اسحب الفيديوهات هنا أو انقر للاختيار</p>
                      <p className="text-sm">MP4, MOV, AVI حتى 100MB</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 rtl:space-x-reverse mb-4">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>
                <h4 className="text-xl font-bold">عقارات جيبوتي</h4>
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
                  +253 XX XX XX XX
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 ml-2" />
                  info@djibouti-rentals.com
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 ml-2" />
                  جيبوتي سيتي، جيبوتي
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 عقارات جيبوتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
