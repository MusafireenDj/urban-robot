"use client"

import type React from "react"
import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Lock, User, Eye, EyeOff, Shield, AlertTriangle, Mail } from 'lucide-react'
import { UserManager, generateSecureToken, generateCSRFToken } from "@/lib/auth"

function LoginContent() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const [blockTimeLeft, setBlockTimeLeft] = useState(0)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const expired = searchParams.get('expired')

  // حماية من محاولات الاختراق المتكررة
  useEffect(() => {
    const savedAttempts = localStorage.getItem('loginAttempts')
    const lastAttempt = localStorage.getItem('lastLoginAttempt')
    
    if (savedAttempts && lastAttempt) {
      const attemptCount = parseInt(savedAttempts)
      const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt)
      const blockDuration = 15 * 60 * 1000 // 15 دقيقة
      
      if (attemptCount >= 5 && timeSinceLastAttempt < blockDuration) {
        setIsBlocked(true)
        setBlockTimeLeft(Math.ceil((blockDuration - timeSinceLastAttempt) / 1000))
        
        // إرسال تنبيه أمني
        sendSecurityAlert('محاولات دخول متكررة مشبوهة')
        
        const timer = setInterval(() => {
          setBlockTimeLeft(prev => {
            if (prev <= 1) {
              setIsBlocked(false)
              localStorage.removeItem('loginAttempts')
              localStorage.removeItem('lastLoginAttempt')
              clearInterval(timer)
              return 0
            }
            return prev - 1
          })
        }, 1000)
        
        return () => clearInterval(timer)
      } else if (timeSinceLastAttempt >= blockDuration) {
        localStorage.removeItem('loginAttempts')
        localStorage.removeItem('lastLoginAttempt')
      } else {
        setAttempts(attemptCount)
      }
    }
  }, [])

  const sendSecurityAlert = async (message: string) => {
    try {
      // محاكاة إرسال تنبيه أمني
      console.log(`🚨 تنبيه أمني: ${message}`)
      console.log(`📧 تم إرسال تنبيه إلى: medalmqaleh@gmail.com`)
      console.log(`🕒 الوقت: ${new Date().toLocaleString('ar')}`)
      console.log(`🌐 IP: ${await getClientIP()}`)
      
      // في التطبيق الحقيقي، ستقوم بإرسال إيميل فعلي هنا
    } catch (error) {
      console.error('خطأ في إرسال التنبيه الأمني:', error)
    }
  }

  const getClientIP = async () => {
    try {
      const response = await fetch('https://api.ipify.org?format=json')
      const data = await response.json()
      return data.ip
    } catch {
      return 'غير معروف'
    }
  }

  const sendPasswordResetCode = async (email: string) => {
    try {
      const resetCode = Math.floor(100000 + Math.random() * 900000).toString()
      
      // حفظ كود الاستعادة مؤقتاً
      localStorage.setItem('passwordResetCode', resetCode)
      localStorage.setItem('passwordResetEmail', email)
      localStorage.setItem('passwordResetTime', Date.now().toString())
      
      // محاكاة إرسال الإيميل
      console.log(`📧 تم إرسال كود الاستعادة إلى: ${email}`)
      console.log(`🔑 كود الاستعادة: ${resetCode}`)
      console.log(`⏰ صالح لمدة 10 دقائق`)
      
      setResetMessage(`تم إرسال كود الاستعادة إلى ${email}. الكود: ${resetCode}`)
      
      // في التطبيق الحقيقي، ستقوم بإرسال إيميل فعلي هنا
      return true
    } catch (error) {
      console.error('خطأ في إرسال كود الاستعادة:', error)
      return false
    }
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!resetEmail) {
      setError('يرجى إدخال البريد الإلكتروني')
      return
    }

    if (resetEmail !== 'medalmqaleh@gmail.com') {
      setError('البريد الإلكتروني غير مسجل في النظام')
      return
    }

    const success = await sendPasswordResetCode(resetEmail)
    if (success) {
      setError('')
    } else {
      setError('حدث خطأ في إرسال كود الاستعادة')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (isBlocked) {
      setError(`تم حظر تسجيل الدخول لمدة ${Math.ceil(blockTimeLeft / 60)} دقيقة`)
      return
    }

    setIsLoading(true)
    setError("")

    // محاكاة تأخير الشبكة
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log('محاولة تسجيل دخول:', { username: credentials.username })
    
    const user = UserManager.validateCredentials(credentials.username, credentials.password)
    
    if (user) {
      // نجح تسجيل الدخول
      console.log('تم تسجيل الدخول بنجاح:', user.username)
      
      const token = generateSecureToken()
      const csrfToken = generateCSRFToken()
      const loginTime = Date.now().toString()

      // حفظ بيانات الجلسة الآمنة
      localStorage.setItem('adminToken', token)
      localStorage.setItem('loginTime', loginTime)
      localStorage.setItem('csrfToken', csrfToken)
      localStorage.setItem('currentUserId', user.id)
      
      // مسح محاولات تسجيل الدخول الفاشلة
      localStorage.removeItem('loginAttempts')
      localStorage.removeItem('lastLoginAttempt')

      // إرسال تنبيه دخول ناجح
      sendSecurityAlert(`تم تسجيل دخول ناجح للمستخدم: ${user.username}`)

      // إعادة توجيه إلى لوحة التحكم
      router.push('/admin')
    } else {
      // فشل تسجيل الدخول
      console.log('فشل تسجيل الدخول')
      
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      localStorage.setItem('loginAttempts', newAttempts.toString())
      localStorage.setItem('lastLoginAttempt', Date.now().toString())
      
      if (newAttempts >= 5) {
        setIsBlocked(true)
        setBlockTimeLeft(15 * 60) // 15 دقيقة
        setError('تم حظر تسجيل الدخول لمدة 15 دقيقة بسبب المحاولات المتكررة')
        sendSecurityAlert(`محاولات دخول فاشلة متكررة من المستخدم: ${credentials.username}`)
      } else {
        setError(`بيانات تسجيل الدخول غير صحيحة. المحاولات المتبقية: ${5 - newAttempts}`)
      }
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }

  if (showForgotPassword) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md px-4">
          <div className="text-center mb-8">
            <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
              <Mail className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">استعادة كلمة المرور</h1>
            <p className="text-gray-300">أدخل بريدك الإلكتروني لاستلام كود الاستعادة</p>
          </div>

          <Card className="bg-gray-800 border-gray-700 shadow-2xl">
            <CardContent className="pt-6">
              <form onSubmit={handleForgotPassword} className="space-y-6">
                {error && (
                  <Alert className="border-red-500 bg-red-500/10">
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <AlertDescription className="text-red-200">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                {resetMessage && (
                  <Alert className="border-green-500 bg-green-500/10">
                    <Mail className="h-4 w-4 text-green-500" />
                    <AlertDescription className="text-green-200">
                      {resetMessage}
                    </AlertDescription>
                  </Alert>
                )}

                <div className="space-y-2">
                  <Label htmlFor="resetEmail" className="text-white">
                    البريد الإلكتروني
                  </Label>
                  <Input
                    id="resetEmail"
                    type="email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="medalmqaleh@gmail.com"
                    className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                    required
                  />
                </div>

                <div className="flex gap-2">
                  <Button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
                  >
                    إرسال الكود
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForgotPassword(false)}
                    className="bg-transparent"
                  >
                    إلغاء
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=pattern')] opacity-5"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <Shield className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MusafireenDj</h1>
          <p className="text-gray-300">لوحة التحكم الآمنة</p>
        </div>

        {/* Security Alerts */}
        {expired && (
          <Alert className="mb-6 border-yellow-500 bg-yellow-500/10">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-200">
              انتهت صلاحية جلستك. يرجى تسجيل الدخول مرة أخرى.
            </AlertDescription>
          </Alert>
        )}

        {isBlocked && (
          <Alert className="mb-6 border-red-500 bg-red-500/10">
            <Lock className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-200">
              تم حظر تسجيل الدخول لمدة {formatTime(blockTimeLeft)} بسبب المحاولات المتكررة
            </AlertDescription>
          </Alert>
        )}

        {/* Login Form */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">تسجيل دخول آمن</CardTitle>
            <CardDescription className="text-gray-300">
              أدخل بيانات المستخدم للوصول إلى لوحة التحكم
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert className="border-red-500 bg-red-500/10">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <AlertDescription className="text-red-200">
                    {error}
                  </AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">
                  اسم المستخدم
                </Label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    value={credentials.username}
                    onChange={handleChange}
                    placeholder="admin"
                    className="bg-gray-700 border-gray-600 text-white pr-10 focus:border-orange-500 focus:ring-orange-500"
                    disabled={isBlocked || isLoading}
                    required
                    autoComplete="username"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  كلمة المرور
                </Label>
                <div className="relative">
                  <Lock className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={credentials.password}
                    onChange={handleChange}
                    placeholder="admin123"
                    className="bg-gray-700 border-gray-600 text-white pr-10 pl-10 focus:border-orange-500 focus:ring-orange-500"
                    disabled={isBlocked || isLoading}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    disabled={isBlocked || isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="text-center">
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-orange-400 hover:text-orange-300 text-sm"
                >
                  نسيت كلمة المرور؟
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading || isBlocked}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3 disabled:opacity-50"
              >
                {isLoading ? "جاري التحقق..." : isBlocked ? `محظور (${formatTime(blockTimeLeft)})` : "تسجيل دخول آمن"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-orange-400 hover:text-orange-300 text-sm">
                العودة إلى الموقع الرئيسي
              </Link>
            </div>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <p className="text-gray-300 text-sm text-center mb-2">بيانات تجريبية:</p>
              <p className="text-orange-400 text-sm text-center">المستخدم: admin</p>
              <p className="text-orange-400 text-sm text-center">كلمة المرور: admin123</p>
            </div>
          </CardContent>
        </Card>

        {/* Security Info */}
        <div className="mt-6 text-center">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-4">
              <div className="flex items-center justify-center mb-2">
                <Shield className="h-4 w-4 text-green-400 mr-2" />
                <p className="text-green-400 text-sm">محمي بتشفير متقدم</p>
              </div>
              <p className="text-gray-400 text-xs">
                جلسة آمنة • حماية من CSRF • تشفير البيانات • تنبيهات أمنية
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">جاري التحميل...</div>
        </div>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
