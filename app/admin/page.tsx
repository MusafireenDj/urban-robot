"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import MediaUpload from "@/components/media-upload"
import { MapPin, Save, Eye, LogOut, Plus, Edit } from "lucide-react"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("add-property")
  const router = useRouter()

  const [propertyData, setPropertyData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    type: "",
    furnished: "",
    ownerName: "",
    ownerPhone: "",
    ownerEmail: "medalmqaleh@gmail.com",
  })

  // فحص تسجيل الدخول
  useEffect(() => {
    const checkAuth = () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn")
      const loginTime = localStorage.getItem("loginTime")

      if (isLoggedIn === "true" && loginTime) {
        // فحص انتهاء صلاحية الجلسة (24 ساعة)
        const currentTime = Date.now()
        const sessionDuration = 24 * 60 * 60 * 1000 // 24 ساعة

        if (currentTime - Number.parseInt(loginTime) < sessionDuration) {
          setIsAuthenticated(true)
        } else {
          // انتهت صلاحية الجلسة
          localStorage.removeItem("isLoggedIn")
          localStorage.removeItem("loginTime")
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
      setIsLoading(false)
    }

    checkAuth()
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("loginTime")
    router.push("/")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Property data:", propertyData)

    // محاكاة حفظ البيانات
    alert("تم حفظ العقار بنجاح!")

    // إعادة تعيين النموذج
    setPropertyData({
      title: "",
      location: "",
      price: "",
      bedrooms: "",
      bathrooms: "",
      area: "",
      description: "",
      type: "",
      furnished: "",
      ownerName: "",
      ownerPhone: "",
      ownerEmail: "medalmqaleh@gmail.com",
    })
  }

  const handleChange = (field: string, value: string) => {
    setPropertyData((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-xl">جاري التحميل...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 rounded-lg">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MusafireenDj</h1>
                <p className="text-sm text-gray-300">لوحة التحكم الإدارية</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <span className="text-gray-300 text-sm">مرحباً، المالك</span>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <LogOut className="h-4 w-4 ml-2" />
                تسجيل الخروج
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <div className="mb-8">
            <div className="flex space-x-1 rtl:space-x-reverse bg-gray-800 p-1 rounded-lg">
              <button
                onClick={() => setActiveTab("add-property")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "add-property"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Plus className="h-4 w-4 inline ml-2" />
                إضافة عقار جديد
              </button>
              <button
                onClick={() => setActiveTab("manage-properties")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "manage-properties"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                <Edit className="h-4 w-4 inline ml-2" />
                إدارة العقارات
              </button>
              <button
                onClick={() => setActiveTab("media-gallery")}
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                  activeTab === "media-gallery"
                    ? "bg-gradient-to-r from-orange-500 to-yellow-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                معرض الوسائط
              </button>
            </div>
          </div>

          {/* Add Property Tab */}
          {activeTab === "add-property" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">إضافة عقار جديد</h2>
                <p className="text-gray-300">املأ جميع البيانات المطلوبة لإضافة عقار جديد</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Information */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">المعلومات الأساسية</CardTitle>
                    <CardDescription className="text-gray-300">أدخل المعلومات الأساسية للعقار</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="title" className="text-white">
                          عنوان العقار *
                        </Label>
                        <Input
                          id="title"
                          value={propertyData.title}
                          onChange={(e) => handleChange("title", e.target.value)}
                          placeholder="مثال: شقة فاخرة في وسط المدينة"
                          className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="location" className="text-white">
                          الموقع *
                        </Label>
                        <Input
                          id="location"
                          value={propertyData.location}
                          onChange={(e) => handleChange("location", e.target.value)}
                          placeholder="مثال: جيبوتي سيتي، حي الأوروبي"
                          className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-4 gap-4">
                      <div>
                        <Label htmlFor="price" className="text-white">
                          السعر (USD) *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={propertyData.price}
                          onChange={(e) => handleChange("price", e.target.value)}
                          placeholder="800"
                          className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          required
                        />
                      </div>

                      <div>
                        <Label htmlFor="bedrooms" className="text-white">
                          غرف النوم *
                        </Label>
                        <Select onValueChange={(value) => handleChange("bedrooms", value)}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="اختر" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="1">1 غرفة</SelectItem>
                            <SelectItem value="2">2 غرفة</SelectItem>
                            <SelectItem value="3">3 غرف</SelectItem>
                            <SelectItem value="4">4 غرف</SelectItem>
                            <SelectItem value="5">5+ غرف</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="bathrooms" className="text-white">
                          الحمامات *
                        </Label>
                        <Select onValueChange={(value) => handleChange("bathrooms", value)}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="اختر" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="1">1 حمام</SelectItem>
                            <SelectItem value="2">2 حمام</SelectItem>
                            <SelectItem value="3">3 حمامات</SelectItem>
                            <SelectItem value="4">4+ حمامات</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="area" className="text-white">
                          المساحة (م²) *
                        </Label>
                        <Input
                          id="area"
                          type="number"
                          value={propertyData.area}
                          onChange={(e) => handleChange("area", e.target.value)}
                          placeholder="120"
                          className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="type" className="text-white">
                          نوع العقار *
                        </Label>
                        <Select onValueChange={(value) => handleChange("type", value)}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="اختر نوع العقار" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="apartment">شقة</SelectItem>
                            <SelectItem value="studio">استوديو</SelectItem>
                            <SelectItem value="villa">فيلا</SelectItem>
                            <SelectItem value="penthouse">بنتهاوس</SelectItem>
                            <SelectItem value="house">منزل</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="furnished" className="text-white">
                          حالة الأثاث *
                        </Label>
                        <Select onValueChange={(value) => handleChange("furnished", value)}>
                          <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                            <SelectValue placeholder="اختر حالة الأثاث" />
                          </SelectTrigger>
                          <SelectContent className="bg-gray-700 border-gray-600">
                            <SelectItem value="furnished">مفروش</SelectItem>
                            <SelectItem value="semi-furnished">مفروش جزئياً</SelectItem>
                            <SelectItem value="unfurnished">غير مفروش</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description" className="text-white">
                        وصف العقار *
                      </Label>
                      <Textarea
                        id="description"
                        value={propertyData.description}
                        onChange={(e) => handleChange("description", e.target.value)}
                        placeholder="اكتب وصفاً مفصلاً للعقار..."
                        rows={4}
                        className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                        required
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Media Upload */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">الصور والفيديوهات</CardTitle>
                    <CardDescription className="text-gray-300">أضف صور وفيديوهات عالية الجودة للعقار</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MediaUpload />
                  </CardContent>
                </Card>

                {/* Contact Information */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">معلومات الاتصال</CardTitle>
                    <CardDescription className="text-gray-300">معلومات التواصل مع مالك العقار</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="owner-name" className="text-white">
                          اسم المالك
                        </Label>
                        <Input
                          id="owner-name"
                          value={propertyData.ownerName}
                          onChange={(e) => handleChange("ownerName", e.target.value)}
                          placeholder="اسم مالك العقار"
                          className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <Label htmlFor="owner-phone" className="text-white">
                          رقم الهاتف
                        </Label>
                        <Input
                          id="owner-phone"
                          value={propertyData.ownerPhone}
                          onChange={(e) => handleChange("ownerPhone", e.target.value)}
                          placeholder="+253 XX XX XX XX"
                          className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="owner-email" className="text-white">
                        البريد الإلكتروني
                      </Label>
                      <Input
                        id="owner-email"
                        type="email"
                        value={propertyData.ownerEmail}
                        onChange={(e) => handleChange("ownerEmail", e.target.value)}
                        className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Action Buttons */}
                <div className="flex gap-4 justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
                  >
                    <Eye className="h-4 w-4 ml-2" />
                    معاينة
                  </Button>

                  <Button
                    type="submit"
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                  >
                    <Save className="h-4 w-4 ml-2" />
                    حفظ العقار
                  </Button>
                </div>
              </form>
            </div>
          )}

          {/* Manage Properties Tab */}
          {activeTab === "manage-properties" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">إدارة العقارات</h2>
                <p className="text-gray-300">عرض وتعديل العقارات الموجودة</p>
              </div>

              <div className="grid gap-6">
                {/* Property List */}
                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">العقارات المضافة</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-gray-400">
                      <p>لا توجد عقارات مضافة بعد</p>
                      <p className="text-sm mt-2">ابدأ بإضافة عقار جديد من التبويب الأول</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Media Gallery Tab */}
          {activeTab === "media-gallery" && (
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">معرض الوسائط</h2>
                <p className="text-gray-300">إدارة جميع الصور والفيديوهات</p>
              </div>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle className="text-white">رفع وسائط جديدة</CardTitle>
                  <CardDescription className="text-gray-300">أضف صور وفيديوهات لاستخدامها في العقارات</CardDescription>
                </CardHeader>
                <CardContent>
                  <MediaUpload />
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
