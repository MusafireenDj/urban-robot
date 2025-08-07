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
import { MapPin, Lock, User, Eye, EyeOff, Shield, AlertTriangle } from 'lucide-react'
import { UserManager, generateSecureToken, generateCSRFToken } from "@/lib/auth"

export default function LoginPage() {
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

    const user = UserManager.validateCredentials(credentials.username, credentials.password)
    
    if (user) {
      // نجح تسجيل الدخول
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

      // إعادة توجيه إلى لوحة التحكم
      router.push('/admin')
    } else {
      // فشل تسجيل الدخول
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      
      localStorage.setItem('loginAttempts', newAttempts.toString())
      localStorage.setItem('lastLoginAttempt', Date.now().toString())
      
      if (newAttempts >= 5) {
        setIsBlocked(true)
        setBlockTimeLeft(15 * 60) // 15 دقيقة
        setError('تم حظر تسجيل الدخول لمدة 15 دقيقة بسبب المحاولات المتكررة')
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
                    placeholder="أدخل اسم المستخدم"
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
                    placeholder="أدخل كلمة المرور"
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
                جلسة آمنة • حماية من CSRF • تشفير البيانات
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
