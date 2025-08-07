"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import MediaUpload from "@/components/media-upload"
import ImageUpload from "@/components/image-upload"
import UserManagement from "@/components/user-management"
import ThemeCustomizer from "@/components/theme-customizer"
import AdminGuard from "@/components/admin-guard"
import { MapPin, Save, Eye, LogOut, Plus, Edit, Settings, Shield, CheckCircle, Users, ImageIcon, Palette } from 'lucide-react'
import { SiteSettings, defaultSettings, saveSettings, loadSettings, applyTheme } from "@/lib/settings"
import { sanitizeInput } from "@/lib/auth"
import { UserManager, User, PERMISSIONS } from "@/lib/auth"

function AdminContent() {
  const [activeTab, setActiveTab] = useState("add-property")
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings)
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [currentUser, setCurrentUser] = useState<User | null>(null)
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
    ownerEmail: "",
  })

  useEffect(() => {
    const loadedSettings = loadSettings()
    setSettings(loadedSettings)
    applyTheme(loadedSettings.theme)
    
    // تحميل بيانات المستخدم الحالي
    const userId = localStorage.getItem('currentUserId')
    if (userId) {
      const user = UserManager.getUserById(userId)
      setCurrentUser(user)
      console.log('👤 المستخدم الحالي:', user?.username)
    }
  }, [])

  const handleLogout = () => {
    console.log('🚪 تسجيل خروج المستخدم')
    localStorage.removeItem('adminToken')
    localStorage.removeItem('loginTime')
    localStorage.removeItem('csrfToken')
    localStorage.removeItem('currentUserId')
    router.push('/')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // تنظيف البيانات المدخلة
    const cleanedData = {
      ...propertyData,
      title: sanitizeInput(propertyData.title),
      location: sanitizeInput(propertyData.location),
      description: sanitizeInput(propertyData.description),
      ownerName: sanitizeInput(propertyData.ownerName),
    }

    console.log("✅ بيانات العقار:", cleanedData)
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
      ownerEmail: "",
    })
  }

  const handleChange = (field: string, value: string) => {
    setPropertyData((prev) => ({
      ...prev,
      [field]: sanitizeInput(value),
    }))
  }

  const handleSettingsChange = (field: keyof SiteSettings | string, value: any) => {
    setSettings(prev => {
      const newSettings = { ...prev }
      
      if (field.includes('.')) {
        const [parent, child] = field.split('.')
        ;(newSettings as any)[parent] = {
          ...(newSettings as any)[parent],
          [child]: typeof value === 'string' ? sanitizeInput(value) : value
        }
      } else {
        ;(newSettings as any)[field] = typeof value === 'string' ? sanitizeInput(value) : value
      }
      
      return newSettings
    })
  }

  const handleSaveSettings = () => {
    setSaveStatus('saving')
    
    setTimeout(() => {
      try {
        saveSettings(settings)
        applyTheme(settings.theme)
        setSaveStatus('saved')
        console.log('💾 تم حفظ الإعدادات بنجاح')
        setTimeout(() => setSaveStatus('idle'), 2000)
      } catch (error) {
        console.error('❌ خطأ في حفظ الإعدادات:', error)
        setSaveStatus('error')
        setTimeout(() => setSaveStatus('idle'), 2000)
      }
    }, 1000)
  }

  const handleHeroImageChange = (imageUrl: string) => {
    setSettings(prev => ({
      ...prev,
      heroImage: imageUrl
    }))
  }

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">جاري تحميل البيانات...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-3 rounded-lg">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MusafireenDj</h1>
                <p className="text-sm text-gray-300">لوحة التحكم الآمنة</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-right">
                <p className="text-gray-300 text-sm">مرحباً، {currentUser.username}</p>
                <p className="text-gray-400 text-xs">الدور: {currentUser.role === 'admin' ? 'مدير' : currentUser.role === 'editor' ? 'محرر' : 'مشاهد'}</p>
              </div>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
              >
                <LogOut className="h-4 w-4 ml-2" />
                خروج آمن
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-6 bg-gray-800">
              {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_PROPERTIES) && (
                <TabsTrigger value="add-property" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                  <Plus className="h-4 w-4 ml-2" />
                  إضافة عقار
                </TabsTrigger>
              )}
              {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_PROPERTIES) && (
                <TabsTrigger value="manage-properties" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                  <Edit className="h-4 w-4 ml-2" />
                  إدارة العقارات
                </TabsTrigger>
              )}
              {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_MEDIA) && (
                <TabsTrigger value="media-gallery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                  <ImageIcon className="h-4 w-4 ml-2" />
                  معرض الوسائط
                </TabsTrigger>
              )}
              {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS) && (
                <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                  <Users className="h-4 w-4 ml-2" />
                  إدارة المستخدمين
                </TabsTrigger>
              )}
              {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_SETTINGS) && (
                <TabsTrigger value="theme" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                  <Palette className="h-4 w-4 ml-2" />
                  الألوان والمظهر
                </TabsTrigger>
              )}
              {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_SETTINGS) && (
                <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                  <Settings className="h-4 w-4 ml-2" />
                  إعدادات الموقع
                </TabsTrigger>
              )}
            </TabsList>

            {/* Add Property Tab */}
            {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_PROPERTIES) && (
              <TabsContent value="add-property">
                <div className="space-y-8">
                  <div>
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
                              maxLength={100}
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
                              maxLength={100}
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
                              min="0"
                              max="10000"
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
                              min="20"
                              max="1000"
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
                            maxLength={1000}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            required
                          />
                          <p className="text-gray-400 text-sm mt-1">
                            {propertyData.description.length}/1000 حرف
                          </p>
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
                              maxLength={50}
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
                              placeholder="+253-XX-XX-XX-XX"
                              className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                              pattern="^\+253-\d{2}-\d{2}-\d{2}-\d{2}$"
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
                            placeholder="owner@example.com"
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
              </TabsContent>
            )}

            {/* Manage Properties Tab */}
            {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_PROPERTIES) && (
              <TabsContent value="manage-properties">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">إدارة العقارات</h2>
                    <p className="text-gray-300">عرض وتعديل العقارات الموجودة</p>
                  </div>

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
              </TabsContent>
            )}

            {/* Media Gallery Tab */}
            {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_MEDIA) && (
              <TabsContent value="media-gallery">
                <div className="space-y-8">
                  <div>
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
              </TabsContent>
            )}

            {/* Users Management Tab */}
            {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS) && (
              <TabsContent value="users">
                <UserManagement currentUser={currentUser} />
              </TabsContent>
            )}

            {/* Theme Customizer Tab */}
            {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_SETTINGS) && (
              <TabsContent value="theme">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">تخصيص الألوان والمظهر</h2>
                    <p className="text-gray-300">قم بتخصيص ألوان الموقع والمظهر العام</p>
                  </div>

                  <ThemeCustomizer
                    settings={settings}
                    onSettingsChange={handleSettingsChange}
                    onSave={handleSaveSettings}
                  />
                </div>
              </TabsContent>
            )}

            {/* Settings Tab */}
            {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_SETTINGS) && (
              <TabsContent value="settings">
                <div className="space-y-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">إعدادات الموقع</h2>
                    <p className="text-gray-300">تحكم في جميع إعدادات الموقع والمعلومات</p>
                  </div>

                  <div className="grid gap-8">
                    {/* Hero Section Settings */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">إعدادات الصفحة الرئيسية</CardTitle>
                        <CardDescription className="text-gray-300">تخصيص العنوان والصورة الرئيسية</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div>
                          <Label htmlFor="heroTitle" className="text-white">العنوان الرئيسي</Label>
                          <Input
                            id="heroTitle"
                            value={settings.heroTitle}
                            onChange={(e) => handleSettingsChange('heroTitle', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            placeholder="اعثر على منزلك في جيبوتي"
                          />
                        </div>
                        <div>
                          <Label htmlFor="heroSubtitle" className="text-white">النص الفرعي</Label>
                          <Textarea
                            id="heroSubtitle"
                            value={settings.heroSubtitle}
                            onChange={(e) => handleSettingsChange('heroSubtitle', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            rows={3}
                            placeholder="نوفر لك أفضل الشقق والمنازل للإيجار..."
                          />
                        </div>
                        <ImageUpload
                          currentImage={settings.heroImage}
                          onImageChange={handleHeroImageChange}
                          title="صورة الخلفية الرئيسية"
                          description="اختر صورة عالية الجودة لتظهر خلف النص في الصفحة الرئيسية"
                        />
                      </CardContent>
                    </Card>

                    {/* Site Information */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">معلومات الموقع</CardTitle>
                        <CardDescription className="text-gray-300">تعديل اسم الموقع والوصف</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="siteName" className="text-white">اسم الموقع</Label>
                          <Input
                            id="siteName"
                            value={settings.siteName}
                            onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="siteDescription" className="text-white">وصف الموقع</Label>
                          <Textarea
                            id="siteDescription"
                            value={settings.siteDescription}
                            onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            rows={3}
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Contact Information */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">معلومات الاتصال</CardTitle>
                        <CardDescription className="text-gray-300">تحديث أرقام الهاتف والبريد الإلكتروني</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="phone" className="text-white">رقم الهاتف</Label>
                            <Input
                              id="phone"
                              value={settings.contactInfo.phone}
                              onChange={(e) => handleSettingsChange('contactInfo.phone', e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                              placeholder="+253-XX-XX-XX-XX"
                            />
                          </div>
                          <div>
                            <Label htmlFor="whatsapp" className="text-white">رقم واتساب</Label>
                            <Input
                              id="whatsapp"
                              value={settings.contactInfo.whatsapp}
                              onChange={(e) => handleSettingsChange('contactInfo.whatsapp', e.target.value)}
                              className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                              placeholder="+253-XX-XX-XX-XX"
                            />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                          <Input
                            id="email"
                            type="email"
                            value={settings.contactInfo.email}
                            onChange={(e) => handleSettingsChange('contactInfo.email', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address" className="text-white">العنوان</Label>
                          <Input
                            id="address"
                            value={settings.contactInfo.address}
                            onChange={(e) => handleSettingsChange('contactInfo.address', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="googleMapsUrl" className="text-white">رابط خرائط جوجل</Label>
                          <Input
                            id="googleMapsUrl"
                            value={settings.contactInfo.googleMapsUrl}
                            onChange={(e) => handleSettingsChange('contactInfo.googleMapsUrl', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            placeholder="https://www.google.com/maps/search/?api=1&query=..."
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Social Media */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">وسائل التواصل الاجتماعي</CardTitle>
                        <CardDescription className="text-gray-300">روابط حسابات التواصل الاجتماعي</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="facebook" className="text-white">فيسبوك</Label>
                          <Input
                            id="facebook"
                            value={settings.socialMedia.facebook || ''}
                            onChange={(e) => handleSettingsChange('socialMedia.facebook', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            placeholder="https://facebook.com/MusafireenDj"
                          />
                        </div>
                        <div>
                          <Label htmlFor="instagram" className="text-white">إنستغرام</Label>
                          <Input
                            id="instagram"
                            value={settings.socialMedia.instagram || ''}
                            onChange={(e) => handleSettingsChange('socialMedia.instagram', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            placeholder="https://instagram.com/MusafireenDj"
                          />
                        </div>
                        <div>
                          <Label htmlFor="twitter" className="text-white">تويتر</Label>
                          <Input
                            id="twitter"
                            value={settings.socialMedia.twitter || ''}
                            onChange={(e) => handleSettingsChange('socialMedia.twitter', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                            placeholder="https://twitter.com/MusafireenDj"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Business Hours */}
                    <Card className="bg-gray-800 border-gray-700">
                      <CardHeader>
                        <CardTitle className="text-white">ساعات العمل</CardTitle>
                        <CardDescription className="text-gray-300">تحديد أوقات العمل</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <Label htmlFor="weekdays" className="text-white">أيام الأسبوع</Label>
                          <Input
                            id="weekdays"
                            value={settings.businessHours.weekdays}
                            onChange={(e) => handleSettingsChange('businessHours.weekdays', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                        <div>
                          <Label htmlFor="weekend" className="text-white">نهاية الأسبوع</Label>
                          <Input
                            id="weekend"
                            value={settings.businessHours.weekend}
                            onChange={(e) => handleSettingsChange('businessHours.weekend', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                          />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Save Button */}
                    <div className="flex justify-end">
                      <Button
                        onClick={handleSaveSettings}
                        disabled={saveStatus === 'saving'}
                        className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                      >
                        {saveStatus === 'saving' && <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />}
                        {saveStatus === 'saved' && <CheckCircle className="h-4 w-4 ml-2" />}
                        <Save className="h-4 w-4 ml-2" />
                        {saveStatus === 'saving' ? 'جاري الحفظ...' : saveStatus === 'saved' ? 'تم الحفظ!' : 'حفظ الإعدادات'}
                      </Button>
                    </div>

                    {saveStatus === 'saved' && (
                      <Alert className="border-green-500 bg-green-500/10">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <AlertDescription className="text-green-200">
                          تم حفظ الإعدادات بنجاح!
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </div>
              </TabsContent>
            )}
          </Tabs>
        </div>
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <AdminGuard>
      <AdminContent />
    </AdminGuard>
  )
}
