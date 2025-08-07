"use client"

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
import { Badge } from "@/components/ui/badge"
import { MapPin, Save, Eye, LogOut, Plus, Edit, Settings, Shield, CheckCircle, Users, ImageIcon, Palette, Upload, X, Play, Download, Key, Trash2, Phone, Mail, MessageCircle, AlertTriangle } from 'lucide-react'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("add-property")
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // بيانات العقار الجديد
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

  // إدارة المستخدمين
  const [users, setUsers] = useState([
    { id: 1, username: "admin", email: "medalmqaleh@gmail.com", role: "مدير", lastLogin: "2024-01-15" },
  ])
  const [showAddUser, setShowAddUser] = useState(false)
  const [newUser, setNewUser] = useState({ username: "", email: "", role: "محرر", password: "" })
  const [showChangePassword, setShowChangePassword] = useState(null)
  const [passwordData, setPasswordData] = useState({ newPassword: "", confirmPassword: "" })

  // إعدادات الموقع
  const [siteSettings, setSiteSettings] = useState({
    siteName: "MusafireenDj",
    siteDescription: "أفضل الشقق للإيجار في جيبوتي",
    heroTitle: "اعثر على منزلك في جيبوتي",
    heroSubtitle: "نوفر لك أفضل الشقق والمنازل للإيجار في أجمل مناطق جيبوتي بأسعار مناسبة وخدمة متميزة",
    phone: "+253-77-77-77-77",
    whatsapp: "+253-77-77-77-77",
    email: "medalmqaleh@gmail.com",
    address: "جيبوتي سيتي، جيبوتي",
    primaryColor: "#f97316",
    secondaryColor: "#eab308",
  })

  // الملفات المرفوعة
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [isUploading, setIsUploading] = useState(false)

  const [message, setMessage] = useState(null)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = () => {
    const token = localStorage.getItem('adminToken')
    const loginTime = localStorage.getItem('loginTime')
    const isAdmin = localStorage.getItem('isAdmin')

    if (!token || !loginTime || !isAdmin) {
      router.push('/admin-login')
      return
    }

    const sessionAge = Date.now() - parseInt(loginTime)
    const maxAge = 24 * 60 * 60 * 1000 // 24 ساعة

    if (sessionAge > maxAge) {
      localStorage.removeItem('adminToken')
      localStorage.removeItem('loginTime')
      localStorage.removeItem('isAdmin')
      router.push('/admin-login')
      return
    }

    setIsAuthenticated(true)
    setIsLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('adminToken')
    localStorage.removeItem('loginTime')
    localStorage.removeItem('isAdmin')
    router.push('/')
  }

  const handlePropertySubmit = (e) => {
    e.preventDefault()
    console.log("بيانات العقار:", propertyData)
    setMessage({ type: 'success', text: 'تم حفظ العقار بنجاح!' })
    
    // إعادة تعيين النموذج
    setPropertyData({
      title: "", location: "", price: "", bedrooms: "", bathrooms: "", 
      area: "", description: "", type: "", furnished: "", ownerName: "", 
      ownerPhone: "", ownerEmail: ""
    })
    
    setTimeout(() => setMessage(null), 3000)
  }

  const handlePropertyChange = (field, value) => {
    setPropertyData(prev => ({ ...prev, [field]: value }))
  }

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      setMessage({ type: 'error', text: 'يرجى ملء جميع الحقول المطلوبة' })
      return
    }

    const user = {
      id: users.length + 1,
      ...newUser,
      lastLogin: new Date().toISOString().split('T')[0]
    }
    
    setUsers([...users, user])
    setNewUser({ username: "", email: "", role: "محرر", password: "" })
    setShowAddUser(false)
    setMessage({ type: 'success', text: 'تم إضافة المستخدم بنجاح' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleDeleteUser = (userId) => {
    if (userId === 1) {
      setMessage({ type: 'error', text: 'لا يمكن حذف المدير الرئيسي' })
      return
    }
    
    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      setUsers(users.filter(user => user.id !== userId))
      setMessage({ type: 'success', text: 'تم حذف المستخدم بنجاح' })
      setTimeout(() => setMessage(null), 3000)
    }
  }

  const handleChangePassword = (userId) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'كلمات المرور غير متطابقة' })
      return
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
      return
    }

    setPasswordData({ newPassword: "", confirmPassword: "" })
    setShowChangePassword(null)
    setMessage({ type: 'success', text: 'تم تغيير كلمة المرور بنجاح' })
    setTimeout(() => setMessage(null), 3000)
  }

  const handleFileUpload = async (files, type) => {
    if (!files) return

    setIsUploading(true)

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const newFile = {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type,
        url: URL.createObjectURL(file),
        size: (file.size / 1024 / 1024).toFixed(2) + " MB",
      }

      setUploadedFiles(prev => [...prev, newFile])
    }

    setIsUploading(false)
  }

  const removeFile = (id) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== id))
  }

  const handleSettingsChange = (field, value) => {
    setSiteSettings(prev => ({ ...prev, [field]: value }))
  }

  const handleSaveSettings = () => {
    console.log("إعدادات الموقع:", siteSettings)
    setMessage({ type: 'success', text: 'تم حفظ الإعدادات بنجاح!' })
    setTimeout(() => setMessage(null), 3000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">جاري التحميل...</div>
        </div>
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
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">MusafireenDj</h1>
                <p className="text-sm text-gray-300">لوحة التحكم الآمنة</p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <div className="text-right">
                <p className="text-gray-300 text-sm">مرحباً، المدير</p>
                <p className="text-gray-400 text-xs">الدور: مدير النظام</p>
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
          {/* Messages */}
          {message && (
            <Alert className={`mb-6 border-${message.type === 'success' ? 'green' : 'red'}-500 bg-${message.type === 'success' ? 'green' : 'red'}-500/10`}>
              {message.type === 'success' ? 
                <CheckCircle className="h-4 w-4 text-green-500" /> : 
                <AlertTriangle className="h-4 w-4 text-red-500" />
              }
              <AlertDescription className={`text-${message.type === 'success' ? 'green' : 'red'}-200`}>
                {message.text}
              </AlertDescription>
            </Alert>
          )}

          {/* Navigation Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            <TabsList className="grid w-full grid-cols-5 bg-gray-800">
              <TabsTrigger value="add-property" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                <Plus className="h-4 w-4 ml-2" />
                إضافة عقار
              </TabsTrigger>
              <TabsTrigger value="media-gallery" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                <ImageIcon className="h-4 w-4 ml-2" />
                معرض الوسائط
              </TabsTrigger>
              <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                <Users className="h-4 w-4 ml-2" />
                إدارة المستخدمين
              </TabsTrigger>
              <TabsTrigger value="theme" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                <Palette className="h-4 w-4 ml-2" />
                الألوان والمظهر
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-yellow-500">
                <Settings className="h-4 w-4 ml-2" />
                إعدادات الموقع
              </TabsTrigger>
            </TabsList>

            {/* Add Property Tab */}
            <TabsContent value="add-property">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">إضافة عقار جديد</h2>
                  <p className="text-gray-300">املأ جميع البيانات المطلوبة لإضافة عقار جديد</p>
                </div>

                <form onSubmit={handlePropertySubmit} className="space-y-8">
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">المعلومات الأساسية</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="title" className="text-white">عنوان العقار *</Label>
                          <Input
                            id="title"
                            value={propertyData.title}
                            onChange={(e) => handlePropertyChange("title", e.target.value)}
                            placeholder="مثال: شقة فاخرة في وسط المدينة"
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="location" className="text-white">الموقع *</Label>
                          <Input
                            id="location"
                            value={propertyData.location}
                            onChange={(e) => handlePropertyChange("location", e.target.value)}
                            placeholder="مثال: جيبوتي سيتي، حي الأوروبي"
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-4 gap-4">
                        <div>
                          <Label htmlFor="price" className="text-white">السعر (USD) *</Label>
                          <Input
                            id="price"
                            type="number"
                            value={propertyData.price}
                            onChange={(e) => handlePropertyChange("price", e.target.value)}
                            placeholder="800"
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                        <div>
                          <Label className="text-white">غرف النوم *</Label>
                          <Select onValueChange={(value) => handlePropertyChange("bedrooms", value)}>
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
                          <Label className="text-white">الحمامات *</Label>
                          <Select onValueChange={(value) => handlePropertyChange("bathrooms", value)}>
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
                          <Label htmlFor="area" className="text-white">المساحة (م²) *</Label>
                          <Input
                            id="area"
                            type="number"
                            value={propertyData.area}
                            onChange={(e) => handlePropertyChange("area", e.target.value)}
                            placeholder="120"
                            className="bg-gray-700 border-gray-600 text-white"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-white">وصف العقار *</Label>
                        <Textarea
                          id="description"
                          value={propertyData.description}
                          onChange={(e) => handlePropertyChange("description", e.target.value)}
                          placeholder="اكتب وصفاً مفصلاً للعقار..."
                          rows={4}
                          className="bg-gray-700 border-gray-600 text-white"
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <div className="flex gap-4 justify-end">
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

            {/* Media Gallery Tab */}
            <TabsContent value="media-gallery">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">معرض الوسائط</h2>
                  <p className="text-gray-300">إدارة جميع الصور والفيديوهات</p>
                </div>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white">رفع وسائط جديدة</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Button
                        onClick={() => document.getElementById('imageInput').click()}
                        disabled={isUploading}
                        className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white h-12"
                      >
                        <ImageIcon className="h-5 w-5 ml-2" />
                        اختيار صور
                      </Button>

                      <Button
                        onClick={() => document.getElementById('videoInput').click()}
                        disabled={isUploading}
                        className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white h-12"
                      >
                        <Play className="h-5 w-5 ml-2" />
                        اختيار فيديوهات
                      </Button>
                    </div>

                    <input
                      id="imageInput"
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e.target.files, "image")}
                      className="hidden"
                    />
                    <input
                      id="videoInput"
                      type="file"
                      multiple
                      accept="video/*"
                      onChange={(e) => handleFileUpload(e.target.files, "video")}
                      className="hidden"
                    />

                    {uploadedFiles.length > 0 && (
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {uploadedFiles.map((file) => (
                          <div key={file.id} className="relative bg-gray-700 rounded-lg overflow-hidden group">
                            <div className="relative">
                              {file.type === "image" ? (
                                <img src={file.url || "/placeholder.svg"} alt={file.name} className="w-full h-32 object-cover" />
                              ) : (
                                <div className="w-full h-32 bg-gray-600 flex items-center justify-center">
                                  <Play className="h-8 w-8 text-gray-400" />
                                </div>
                              )}
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Button
                                  size="sm"
                                  onClick={() => removeFile(file.id)}
                                  className="bg-red-500 hover:bg-red-600"
                                >
                                  <X className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                            <div className="p-3">
                              <p className="text-white text-sm font-medium truncate">{file.name}</p>
                              <p className="text-gray-400 text-xs">{file.size}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Users Management Tab */}
            <TabsContent value="users">
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-2">إدارة المستخدمين</h2>
                    <p className="text-gray-300">إضافة وإدارة المستخدمين والصلاحيات</p>
                  </div>
                  <Button
                    onClick={() => setShowAddUser(true)}
                    className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  >
                    <Plus className="h-4 w-4 ml-2" />
                    إضافة مستخدم
                  </Button>
                </div>

                {showAddUser && (
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">إضافة مستخدم جديد</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">اسم المستخدم</Label>
                          <Input
                            value={newUser.username}
                            onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="أدخل اسم المستخدم"
                          />
                        </div>
                        <div>
                          <Label className="text-white">البريد الإلكتروني</Label>
                          <Input
                            type="email"
                            value={newUser.email}
                            onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="أدخل البريد الإلكتروني"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">الدور</Label>
                          <Select onValueChange={(value) => setNewUser({...newUser, role: value})}>
                            <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                              <SelectValue placeholder="اختر الدور" />
                            </SelectTrigger>
                            <SelectContent className="bg-gray-700 border-gray-600">
                              <SelectItem value="مشاهد">مشاهد</SelectItem>
                              <SelectItem value="محرر">محرر</SelectItem>
                              <SelectItem value="مدير">مدير</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label className="text-white">كلمة المرور</Label>
                          <Input
                            type="password"
                            value={newUser.password}
                            onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="أدخل كلمة المرور"
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddUser} className="bg-green-600 hover:bg-green-700">
                          إضافة المستخدم
                        </Button>
                        <Button onClick={() => setShowAddUser(false)} variant="outline" className="bg-transparent">
                          إلغاء
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}

                <div className="grid gap-4">
                  {users.map((user) => (
                    <Card key={user.id} className="bg-gray-800 border-gray-700">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 rtl:space-x-reverse">
                            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-2 rounded-full">
                              <Shield className="h-5 w-5" />
                            </div>
                            <div>
                              <h4 className="text-white font-semibold">{user.username}</h4>
                              <p className="text-gray-400 text-sm">{user.email}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge className="bg-blue-500 text-white">{user.role}</Badge>
                                <span className="text-xs text-gray-500">
                                  آخر دخول: {user.lastLogin}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              onClick={() => setShowChangePassword(user.id)}
                              className="bg-yellow-600 hover:bg-yellow-700"
                            >
                              <Key className="h-4 w-4" />
                            </Button>
                            {user.id !== 1 && (
                              <Button
                                size="sm"
                                onClick={() => handleDeleteUser(user.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        </div>

                        {showChangePassword === user.id && (
                          <div className="mt-4 pt-4 border-t border-gray-600 space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                              <div>
                                <Label className="text-white">كلمة المرور الجديدة</Label>
                                <Input
                                  type="password"
                                  value={passwordData.newPassword}
                                  onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-white"
                                  placeholder="أدخل كلمة المرور الجديدة"
                                />
                              </div>
                              <div>
                                <Label className="text-white">تأكيد كلمة المرور</Label>
                                <Input
                                  type="password"
                                  value={passwordData.confirmPassword}
                                  onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                                  className="bg-gray-700 border-gray-600 text-white"
                                  placeholder="أعد إدخال كلمة المرور"
                                />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button onClick={() => handleChangePassword(user.id)} className="bg-green-600 hover:bg-green-700">
                                تغيير كلمة المرور
                              </Button>
                              <Button onClick={() => setShowChangePassword(null)} variant="outline" className="bg-transparent">
                                إلغاء
                              </Button>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Theme Customizer Tab */}
            <TabsContent value="theme">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">تخصيص الألوان والمظهر</h2>
                  <p className="text-gray-300">قم بتخصيص ألوان الموقع والمظهر العام</p>
                </div>

                <Card className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Palette className="h-5 w-5 ml-2" />
                      تخصيص الألوان
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-white">اللون الأساسي</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={siteSettings.primaryColor}
                            onChange={(e) => handleSettingsChange('primaryColor', e.target.value)}
                            className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                          />
                          <Input
                            type="text"
                            value={siteSettings.primaryColor}
                            onChange={(e) => handleSettingsChange('primaryColor', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="#f97316"
                          />
                        </div>
                      </div>

                      <div>
                        <Label className="text-white">اللون الثانوي</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="color"
                            value={siteSettings.secondaryColor}
                            onChange={(e) => handleSettingsChange('secondaryColor', e.target.value)}
                            className="w-16 h-10 p-1 bg-gray-700 border-gray-600"
                          />
                          <Input
                            type="text"
                            value={siteSettings.secondaryColor}
                            onChange={(e) => handleSettingsChange('secondaryColor', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                            placeholder="#eab308"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="p-4 rounded-lg border-2 border-dashed border-gray-600">
                      <h4 className="text-white mb-3">معاينة الألوان:</h4>
                      <div className="space-y-2">
                        <div 
                          className="p-3 rounded text-center font-semibold text-white"
                          style={{ backgroundColor: siteSettings.primaryColor }}
                        >
                          اللون الأساسي
                        </div>
                        <div 
                          className="p-3 rounded text-center font-semibold text-white"
                          style={{ backgroundColor: siteSettings.secondaryColor }}
                        >
                          اللون الثانوي
                        </div>
                      </div>
                    </div>

                    <Button
                      onClick={handleSaveSettings}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                    >
                      <Save className="h-4 w-4 ml-2" />
                      حفظ الألوان
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings">
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-bold text-white mb-2">إعدادات الموقع</h2>
                  <p className="text-gray-300">تحكم في جميع إعدادات الموقع والمعلومات</p>
                </div>

                <div className="grid gap-8">
                  {/* Site Information */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">معلومات الموقع</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label className="text-white">اسم الموقع</Label>
                        <Input
                          value={siteSettings.siteName}
                          onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">وصف الموقع</Label>
                        <Textarea
                          value={siteSettings.siteDescription}
                          onChange={(e) => handleSettingsChange('siteDescription', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label className="text-white">العنوان الرئيسي</Label>
                        <Input
                          value={siteSettings.heroTitle}
                          onChange={(e) => handleSettingsChange('heroTitle', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">النص الفرعي</Label>
                        <Textarea
                          value={siteSettings.heroSubtitle}
                          onChange={(e) => handleSettingsChange('heroSubtitle', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Contact Information */}
                  <Card className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <CardTitle className="text-white">معلومات الاتصال</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label className="text-white">رقم الهاتف</Label>
                          <Input
                            value={siteSettings.phone}
                            onChange={(e) => handleSettingsChange('phone', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                        <div>
                          <Label className="text-white">رقم واتساب</Label>
                          <Input
                            value={siteSettings.whatsapp}
                            onChange={(e) => handleSettingsChange('whatsapp', e.target.value)}
                            className="bg-gray-700 border-gray-600 text-white"
                          />
                        </div>
                      </div>
                      <div>
                        <Label className="text-white">البريد الإلكتروني</Label>
                        <Input
                          type="email"
                          value={siteSettings.email}
                          onChange={(e) => handleSettingsChange('email', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                      <div>
                        <Label className="text-white">العنوان</Label>
                        <Input
                          value={siteSettings.address}
                          onChange={(e) => handleSettingsChange('address', e.target.value)}
                          className="bg-gray-700 border-gray-600 text-white"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Save Button */}
                  <div className="flex justify-end">
                    <Button
                      onClick={handleSaveSettings}
                      className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white"
                    >
                      <Save className="h-4 w-4 ml-2" />
                      حفظ الإعدادات
                    </Button>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
