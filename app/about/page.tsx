"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, MessageCircle, Users, Award, Clock, Shield } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "أحمد محمد علي",
      position: "المدير العام",
      image: "/placeholder.svg?height=200&width=200&text=أحمد",
      description: "خبرة 15 سنة في مجال العقارات",
    },
    {
      name: "فاطمة حسن",
      position: "مديرة المبيعات",
      image: "/placeholder.svg?height=200&width=200&text=فاطمة",
      description: "متخصصة في العقارات السكنية",
    },
    {
      name: "عمر إبراهيم",
      position: "مستشار عقاري",
      image: "/placeholder.svg?height=200&width=200&text=عمر",
      description: "خبير في تقييم العقارات",
    },
  ]

  const stats = [
    { icon: Users, number: "500+", label: "عميل راضي" },
    { icon: Award, number: "200+", label: "عقار مؤجر" },
    { icon: Clock, number: "5+", label: "سنوات خبرة" },
    { icon: Shield, number: "100%", label: "ضمان الجودة" },
  ]

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
                <h1 className="text-2xl font-bold text-gray-800">MusafireenDj</h1>
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
              <Link href="/about" className="text-blue-600 font-semibold">
                من نحن
              </Link>
              <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">
                اتصل بنا
              </Link>
              <Link href="/login" className="text-gray-400 hover:text-orange-400 transition-colors">
                تسجيل الدخول
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-gray-800 mb-6">من نحن</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            نحن شركة رائدة في مجال العقارات في جيبوتي، نقدم خدمات متميزة في تأجير الشقق والمنازل مع التزام كامل بالجودة
            والمصداقية والشفافية في جميع تعاملاتنا
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4">قصتنا</h3>
              <p className="text-blue-100 text-lg">رحلة نجاح بدأت من حلم بسيط لتصبح واقعاً يخدم المجتمع</p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <Image
                  src="/placeholder.svg?height=400&width=500&text=مكتبنا+في+جيبوتي"
                  alt="مكتب عقارات جيبوتي"
                  width={500}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              <div className="space-y-6">
                <p className="text-blue-100 leading-relaxed">
                  تأسست شركة MusafireenDj في عام 2019 برؤية واضحة: تقديم خدمات عقارية متميزة تلبي احتياجات العملاء
                  وتتجاوز توقعاتهم. بدأنا كفريق صغير من المتخصصين المتحمسين وتطورنا لنصبح واحدة من أبرز الشركات العقارية
                  في جيبوتي.
                </p>

                <p className="text-blue-100 leading-relaxed">
                  نؤمن بأن العثور على المنزل المناسب ليس مجرد صفقة تجارية، بل هو استثمار في مستقبل أفضل. لذلك نحرص على
                  تقديم خدمة شخصية ومتميزة لكل عميل، مع الحفاظ على أعلى معايير الجودة والمصداقية.
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                  >
                    <Link href="/properties">تصفح العقارات</Link>
                  </Button>
                  <Button
                    size="lg"
                    className="bg-white text-blue-600 hover:bg-blue-50"
                    onClick={() =>
                      window.open("https://wa.me/+253XXXXXXXX?text=مرحباً، أريد معرفة المزيد عن خدماتكم", "_blank")
                    }
                  >
                    <MessageCircle className="ml-2 h-5 w-5" />
                    تواصل معنا
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-blue-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">رؤيتنا</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    أن نكون الشركة الرائدة في مجال العقارات في جيبوتي، ونساهم في تطوير القطاع العقاري من خلال تقديم
                    خدمات مبتكرة وحلول عقارية متطورة تلبي احتياجات جميع شرائح المجتمع.
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="text-center">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl text-gray-800">مهمتنا</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center leading-relaxed">
                    تقديم خدمات عقارية متميزة وموثوقة، ومساعدة عملائنا في العثور على المنازل المثالية التي تناسب
                    احتياجاتهم وميزانياتهم، مع ضمان تجربة سلسة ومريحة في جميع مراحل التعامل.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">فريق العمل</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                فريق من المتخصصين ذوي الخبرة والكفاءة العالية، ملتزمون بتقديم أفضل الخدمات لعملائنا
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={200}
                      height={200}
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">{member.name}</h4>
                    <p className="text-blue-600 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">قيمنا</h3>
              <p className="text-gray-600 max-w-2xl mx-auto">المبادئ والقيم التي نؤمن بها وتوجه عملنا اليومي</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">المصداقية</h4>
                <p className="text-gray-600 text-sm">نلتزم بالصدق والشفافية في جميع تعاملاتنا</p>
              </div>

              <div className="text-center">
                <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-green-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">الجودة</h4>
                <p className="text-gray-600 text-sm">نسعى دائماً لتقديم أعلى مستويات الجودة</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">خدمة العملاء</h4>
                <p className="text-gray-600 text-sm">عملاؤنا هم محور اهتمامنا وأولويتنا الأولى</p>
              </div>

              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
                <h4 className="text-lg font-semibold text-gray-800 mb-2">الالتزام</h4>
                <p className="text-gray-600 text-sm">نلتزم بمواعيدنا ووعودنا مع عملائنا</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl font-bold mb-4">هل أنت مستعد للعثور على منزل أحلامك؟</h3>
            <p className="text-blue-100 text-lg mb-8">انضم إلى مئات العملاء الراضين واكتشف أفضل العقارات في جيبوتي</p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3">
                <Link href="/properties">تصفح العقارات</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3 bg-transparent"
                onClick={() =>
                  window.open("https://wa.me/+253XXXXXXXX?text=مرحباً، أريد الاستفسار عن خدماتكم", "_blank")
                }
              >
                <MessageCircle className="ml-2 h-5 w-5" />
                تواصل معنا
              </Button>
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
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-2 rounded-lg">
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
                  +253 XX XX XX XX
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
