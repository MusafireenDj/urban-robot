"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { MapPin, Phone, Mail, MessageCircle, Clock, Send } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // هنا يمكنك إضافة منطق إرسال النموذج
    console.log("Form submitted:", formData)
    // إعادة توجيه إلى واتساب مع الرسالة
    const whatsappMessage = `مرحباً، اسمي ${formData.name}
الموضوع: ${formData.subject}
الرسالة: ${formData.message}
رقم الهاتف: ${formData.phone}
البريد الإلكتروني: ${formData.email}`

    window.open(`https://wa.me/+25377777777?text=${encodeURIComponent(whatsappMessage)}`, "_blank")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
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
              <Link href="/contact" className="text-blue-600 font-semibold">
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
          <h2 className="text-5xl font-bold text-gray-800 mb-6">تواصل معنا</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            نحن هنا لمساعدتك في العثور على المنزل المثالي. تواصل معنا عبر أي من الطرق التالية
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Phone className="h-8 w-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold mb-2">اتصل بنا</h4>
                  <p className="text-gray-600 mb-2">+253 77777777</p>
                  <p className="text-gray-600">+253 77777777</p>
                  <Button
                    className="mt-3 w-full bg-transparent"
                    variant="outline"
                    onClick={() => (window.location.href = "tel:+25377777777")}
                  >
                    اتصال الآن
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold mb-2">واتساب</h4>
                  <p className="text-gray-600 mb-4">تواصل فوري ومباشر</p>
                  <Button
                    className="bg-green-600 hover:bg-green-700 text-white w-full"
                    onClick={() =>
                      window.open("https://wa.me/+25377777777?text=مرحباً، أريد الاستفسار عن العقارات المتاحة", "_blank")
                    }
                  >
                    تواصل الآن
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="h-8 w-8 text-purple-600" />
                  </div>
                  <h4 className="font-semibold mb-2">البريد الإلكتروني</h4>
                  <p className="text-gray-600 mb-2">medalmqaleh@gmail.com</p>
                  <p className="text-gray-600 mb-3">medalmqaleh@gmail.com</p>
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => (window.location.href = "mailto:medalmqaleh@gmail.com")}
                  >
                    إرسال إيميل
                  </Button>
                </CardContent>
              </Card>

              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-8 w-8 text-orange-600" />
                  </div>
                  <h4 className="font-semibold mb-2">ساعات العمل</h4>
                  <p className="text-gray-600 mb-1">السبت - الخميس</p>
                  <p className="text-gray-600 mb-1">8:00 ص - 6:00 م</p>
                  <p className="text-gray-600">الجمعة: مغلق</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl text-gray-800">أرسل لنا رسالة</CardTitle>
                  <CardDescription>املأ النموذج أدناه وسنتواصل معك في أقرب وقت ممكن</CardDescription>
                </CardHeader>

                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">الاسم الكامل *</Label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="phone">رقم الهاتف *</Label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+253 XX XX XX XX"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">البريد الإلكتروني *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="example@email.com"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">الموضوع *</Label>
                      <Input
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        placeholder="موضوع الرسالة"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">الرسالة *</Label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="اكتب رسالتك هنا..."
                        rows={5}
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                    >
                      <Send className="h-4 w-4 ml-2" />
                      إرسال الرسالة
                    </Button>
                  </form>
                </CardContent>
              </Card>

              {/* Map and Office Info */}
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">موقع المكتب</CardTitle>
                    <CardDescription>زورنا في مكتبنا الرئيسي في جيبوتي سيتي</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center text-gray-600">
                        <MapPin className="h-12 w-12 mx-auto mb-2" />
                        <p>خريطة الموقع</p>
                        <p className="text-sm">جيبوتي سيتي، شارع الاستقلال</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center">
                        <MapPin className="h-5 w-5 text-blue-600 ml-3" />
                        <div>
                          <p className="font-semibold">العنوان</p>
                          <p className="text-gray-600">شارع الاستقلال، جيبوتي سيتي، جيبوتي</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Phone className="h-5 w-5 text-blue-600 ml-3" />
                        <div>
                          <p className="font-semibold">الهاتف</p>
                          <p className="text-gray-600">+253 77777777</p>
                        </div>
                      </div>

                      <div className="flex items-center">
                        <Mail className="h-5 w-5 text-blue-600 ml-3" />
                        <div>
                          <p className="font-semibold">البريد الإلكتروني</p>
                          <p className="text-gray-600">medalmqaleh@gmail.com</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-800">معلومات إضافية</CardTitle>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">خدمة العملاء</h4>
                      <p className="text-gray-600 text-sm">
                        فريق خدمة العملاء متاح للرد على استفساراتكم من السبت إلى الخميس من الساعة 8:00 صباحاً حتى 6:00
                        مساءً
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">الاستشارات المجانية</h4>
                      <p className="text-gray-600 text-sm">
                        نقدم استشارات مجانية لمساعدتك في اختيار العقار المناسب لاحتياجاتك
                      </p>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">زيارات ميدانية</h4>
                      <p className="text-gray-600 text-sm">
                        يمكننا ترتيب زيارات ميدانية للعقارات المختارة في الوقت المناسب لك
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">الأسئلة الشائعة</h3>
              <p className="text-gray-600">إجابات على أكثر الأسئلة شيوعاً</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">كيف يمكنني حجز شقة؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    يمكنك حجز الشقة عبر التواصل معنا مباشرة عبر واتساب أو الهاتف، وسنقوم بترتيب زيارة ميدانية واستكمال
                    إجراءات الحجز.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">ما هي المستندات المطلوبة؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    نحتاج إلى صورة من الهوية الشخصية، إثبات الدخل، وتأمين يعادل شهر واحد من الإيجار كحد أدنى.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">هل تقدمون خدمة الصيانة؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    نعم، نقدم خدمة صيانة شاملة لجميع العقارات المؤجرة من خلالنا مع فريق صيانة متخصص ومتاح على مدار
                    الساعة.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">كم تستغرق عملية الموافقة؟</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">
                    عادة ما تستغرق عملية الموافقة من 24 إلى 48 ساعة بعد تقديم جميع المستندات المطلوبة واستكمال
                    الإجراءات.
                  </p>
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
                  +253 77777777
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
            <p>&copy; 2024 عقارات جيبوتي. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
