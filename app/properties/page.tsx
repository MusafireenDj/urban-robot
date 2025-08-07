"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Mail, MessageCircle, Bed, Bath, Square, Star, Search, Filter } from "lucide-react"

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState("all")
  const [propertyType, setPropertyType] = useState("all")
  const [location, setLocation] = useState("all")

  const properties = [
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
      type: "apartment",
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
      type: "apartment",
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
      featured: false,
      type: "studio",
    },
    {
      id: 4,
      title: "فيلا مع حديقة خاصة",
      location: "حي السلام",
      price: "2000",
      currency: "USD",
      period: "شهرياً",
      bedrooms: 5,
      bathrooms: 4,
      area: 300,
      image: "/placeholder.svg?height=300&width=400&text=فيلا+حديقة",
      rating: 4.7,
      featured: true,
      type: "villa",
    },
    {
      id: 5,
      title: "شقة مفروشة قريبة من المطار",
      location: "حي المطار",
      price: "600",
      currency: "USD",
      period: "شهرياً",
      bedrooms: 2,
      bathrooms: 1,
      area: 80,
      image: "/placeholder.svg?height=300&width=400&text=شقة+مطار",
      rating: 4.4,
      featured: false,
      type: "apartment",
    },
    {
      id: 6,
      title: "بنتهاوس مع تراس كبير",
      location: "حي الهضبة",
      price: "1800",
      currency: "USD",
      period: "شهرياً",
      bedrooms: 4,
      bathrooms: 3,
      area: 220,
      image: "/placeholder.svg?height=300&width=400&text=بنتهاوس+تراس",
      rating: 4.8,
      featured: true,
      type: "penthouse",
    },
  ]

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.location.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPrice =
      priceRange === "all" ||
      (priceRange === "low" && Number.parseInt(property.price) < 600) ||
      (priceRange === "medium" && Number.parseInt(property.price) >= 600 && Number.parseInt(property.price) <= 1200) ||
      (priceRange === "high" && Number.parseInt(property.price) > 1200)

    const matchesType = propertyType === "all" || property.type === propertyType

    const matchesLocation = location === "all" || property.location.includes(location)

    return matchesSearch && matchesPrice && matchesType && matchesLocation
  })

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
                <h1 className="text-2xl font-bold text-white">منازل جيبوتي</h1>
                <p className="text-sm text-gray-400">أفضل الشقق للإيجار</p>
              </div>
            </div>
            <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse">
              <Link href="/" className="text-gray-400 hover:text-orange-400 transition-colors">
                الرئيسية
              </Link>
              <Link href="/properties" className="text-orange-400 font-semibold">
                العقارات
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">
                اتصل بنا
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-orange-400 transition-colors">
                تسجيل الدخول
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Search and Filter Section */}
      <section className="py-8 bg-gray-800 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6 text-center">جميع العقارات المتاحة</h2>

            <div className="grid md:grid-cols-5 gap-4 mb-8">
              <div className="relative">
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="ابحث عن عقار..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pr-10 bg-gray-700 text-white border-gray-600 focus:border-orange-500 focus:ring-orange-500"
                />
              </div>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="نطاق السعر" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-white border-gray-600">
                  <SelectItem value="all">جميع الأسعار</SelectItem>
                  <SelectItem value="low">أقل من $600</SelectItem>
                  <SelectItem value="medium">$600 - $1200</SelectItem>
                  <SelectItem value="high">أكثر من $1200</SelectItem>
                </SelectContent>
              </Select>

              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="نوع العقار" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-white border-gray-600">
                  <SelectItem value="all">جميع الأنواع</SelectItem>
                  <SelectItem value="apartment">شقة</SelectItem>
                  <SelectItem value="studio">استوديو</SelectItem>
                  <SelectItem value="villa">فيلا</SelectItem>
                  <SelectItem value="penthouse">بنتهاوس</SelectItem>
                </SelectContent>
              </Select>

              <Select value={location} onValueChange={setLocation}>
                <SelectTrigger className="bg-gray-700 text-white border-gray-600">
                  <SelectValue placeholder="الموقع" />
                </SelectTrigger>
                <SelectContent className="bg-gray-700 text-white border-gray-600">
                  <SelectItem value="all">جميع المواقع</SelectItem>
                  <SelectItem value="جيبوتي سيتي">جيبوتي سيتي</SelectItem>
                  <SelectItem value="الأوروبي">حي الأوروبي</SelectItem>
                  <SelectItem value="النجمة">حي النجمة</SelectItem>
                  <SelectItem value="السلام">حي السلام</SelectItem>
                  <SelectItem value="المطار">حي المطار</SelectItem>
                  <SelectItem value="الهضبة">حي الهضبة</SelectItem>
                </SelectContent>
              </Select>

              <Button className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600">
                <Filter className="h-4 w-4 ml-2" />
                تطبيق الفلتر
              </Button>
            </div>

            <div className="text-center text-gray-400 mb-6">تم العثور على {filteredProperties.length} عقار</div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {filteredProperties.map((property) => (
              <Card
                key={property.id}
                className="overflow-hidden hover:shadow-xl transition-shadow duration-300 group bg-gray-800"
              >
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
                  <CardDescription className="flex items-center text-gray-400">
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

                  <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
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
                          `https://wa.me/+25377777777?text=مرحباً، أريد الاستفسار عن ${property.title}`,
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

          {filteredProperties.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Search className="h-16 w-16 mx-auto mb-4" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">لم يتم العثور على عقارات</h3>
              <p className="text-gray-500">جرب تغيير معايير البحث أو الفلتر</p>
            </div>
          )}
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
                <h4 className="text-xl font-bold">منازل جيبوتي</h4>
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
                  +253 77 77 77 77
                </p>
                <p className="flex items-center">
                  <Mail className="h-4 w-4 ml-2" />
                  info@djiboutihomes.com
                </p>
                <p className="flex items-center">
                  <MapPin className="h-4 w-4 ml-2" />
                  جيبوتي سيتي، جيبوتي
                </p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 منازل جيبوتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
