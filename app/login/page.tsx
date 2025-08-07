"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { MapPin, Lock, User, Eye, EyeOff, Shield, AlertTriangle, Mail } from 'lucide-react'
import { UserManager, generateSecureToken, generateCSRFToken } from "@/lib/auth"
import { supabase } from '@/lib/auth' // Client-side Supabase client
import { useToast } from "@/hooks/use-toast"
import { login } from '@/lib/auth'; // Assuming lib/auth.ts has login
import { ADMIN_LOGIN_PATH } from '@/lib/settings'; // Assuming lib/settings.ts

function LoginContent() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  // تم تعطيل آلية الحظر مؤقتًا لأغراض الاختبار
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false) // تم تعيينها دائمًا إلى false لأغراض الاختبار
  const [blockTimeLeft, setBlockTimeLeft] = useState(0)
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetMessage, setResetMessage] = useState("")
  
  const router = useRouter()
  const searchParams = useSearchParams()
  const expired = searchParams.get('expired')

  // تم تعطيل حماية من محاولات الاختراق المتكررة مؤقتًا لأغراض الاختبار
  useEffect(() => {
    // const savedAttempts = localStorage.getItem('loginAttempts')
    // const lastAttempt = localStorage.getItem('lastLoginAttempt')
    
    // if (savedAttempts && lastAttempt) {
    //   const attemptCount = parseInt(savedAttempts)
    //   const timeSinceLastAttempt = Date.now() - parseInt(lastAttempt)
    //   const blockDuration = 15 * 60 * 1000 // 15 دقيقة
      
    //   if (attemptCount >= 5 && timeSinceLastAttempt < blockDuration) {
    //     setIsBlocked(true)
    //     setBlockTimeLeft(Math.ceil((blockDuration - timeSinceLastAttempt) / 1000))
        
    //     // إرسال تنبيه أمني
    //     sendSecurityAlert('محاولات دخول متكررة مشبوهة')
        
    //     const timer = setInterval(() => {
    //       setBlockTimeLeft(prev => {
    //         if (prev <= 1) {
    //           setIsBlocked(false)
    //           localStorage.removeItem('loginAttempts')
    //           localStorage.removeItem('lastLoginAttempt')
    //           clearInterval(timer)
    //           return 0
    //         }
    //         return prev - 1
    //       })
    //     }, 1000)
        
    //     return () => clearInterval(timer)
    //   } else if (timeSinceLastAttempt >= blockDuration) {
    //     localStorage.removeItem('loginAttempts')
    //     localStorage.removeItem('lastLoginAttempt')
    //   } else {
    //     setAttempts(attemptCount)
    //   }
    // }
    setIsBlocked(false); // تأكد من عدم الحظر
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
    
    // تم تعطيل هذا الشرط مؤقتًا لأغراض الاختبار
    // if (isBlocked) {
    //   setError(`تم حظر تسجيل الدخول لمدة ${Math.ceil(blockTimeLeft / 60)} دقيقة`)
    //   return
    // }

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
      const loginTime = Date.now().toString()

      // حفظ بيانات الجلسة الآمنة
      localStorage.setItem('adminToken', token)
      localStorage.setItem('loginTime', loginTime)
      localStorage.setItem('csrfToken', generateCSRFToken())
      localStorage.setItem('currentUserId', user.id)
      localStorage.setItem('isAdmin', user.role === 'admin' ? 'true' : 'false')
      
      // مسح محاولات تسجيل الدخول الفاشلة
      localStorage.removeItem('loginAttempts')
      localStorage.removeItem('lastLoginAttempt')

      // إرسال تنبيه دخول ناجح
      sendSecurityAlert(`تم تسجيل دخول ناجح للمستخدم: ${user.username}`)

      // إعادة توجيه إلى لوحة التحكم
      router.push('/admin-dashboard')
    } else {
      // فشل تسجيل الدخول
      console.log('فشل تسجيل الدخول')
      
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      localStorage.setItem('loginAttempts', newAttempts.toString())
      localStorage.setItem('lastLoginAttempt', Date.now().toString())
      
      // تم تعطيل هذا الشرط مؤقتًا لأغراض الاختبار
      // if (newAttempts >= 5) {
      //   setIsBlocked(true)
      //   setBlockTimeLeft(15 * 60) // 15 دقيقة
      //   setError('تم حظر تسجيل الدخول لمدة 15 دقيقة بسبب المحاولات المتكررة')
      //   sendSecurityAlert(`محاولات دخول فاشلة متكررة من المستخدم: ${credentials.username}`)
      // } else {
        setError(`بيانات تسجيل الدخول غير صحيحة. المحاولات المتبقية: ${5 - newAttempts}`)
      // }
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
    <div className="flex items-center justify-center min-h-[100dvh] bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="username"
                type="email"
                placeholder="m@example.com"
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                disabled={isLoading}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Login"}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            Are you an admin?{' '}
            <Link href={ADMIN_LOGIN_PATH} className="underline" prefetch={false}>
              Admin Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast()
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Temporarily disable login blocking for testing
    // if (email === 'blocked@example.com') {
    //   toast({
    //     title: 'Login Failed',
    //     description: 'This account is temporarily blocked. Please try again later.',
    //     variant: 'destructive',
    //   });
    //   setIsLoading(false);
    //   return;
    // }

    const result = await login(email, password)

    if (result.success) {
      toast({
        title: 'Login Successful',
        description: 'Welcome back!',
      })
      router.push('/properties'); // Redirect to a user dashboard or properties page
    } else {
      toast({
        title: 'Login Failed',
        description: result.message || 'Invalid email or password.',
        variant: 'destructive',
      })
    }
    setIsLoading(false)
  }

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>Enter your email and password to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Logging in...' : 'Login'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="#" className="underline" prefetch={false}>
              Sign up
            </Link>
          </div>
          <div className="mt-2 text-center text-sm">
            Are you an admin?{' '}
            <Link href={ADMIN_LOGIN_PATH} className="underline" prefetch={false}>
              Admin Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
