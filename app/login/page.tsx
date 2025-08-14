"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Lock, User, Eye, EyeOff } from "lucide-react"

export default function LoginPage() {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // بيانات تسجيل الدخول الثابتة (يمكنك تغييرها)
    const validCredentials = {
      username: "admin",
      password: "MusafireenDj2024",
    }

    // محاكاة تأخير الشبكة
    await new Promise((resolve) => setTimeout(resolve, 1000))

    if (credentials.username === validCredentials.username && credentials.password === validCredentials.password) {
      // حفظ حالة تسجيل الدخول
      localStorage.setItem("isLoggedIn", "true")
      localStorage.setItem("loginTime", Date.now().toString())

      // إعادة توجيه إلى لوحة التحكم
      router.push("/admin")
    } else {
      setError("اسم المستخدم أو كلمة المرور غير صحيحة")
    }

    setIsLoading(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100&text=pattern')] opacity-5"></div>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
            <MapPin className="h-10 w-10" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">MusafireenDj</h1>
          <p className="text-gray-300">تسجيل دخول المالك</p>
        </div>

        {/* Login Form */}
        <Card className="bg-gray-800 border-gray-700 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">تسجيل الدخول</CardTitle>
            <CardDescription className="text-gray-300">أدخل بيانات تسجيل الدخول للوصول إلى لوحة التحكم</CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-red-400 text-sm text-center">
                  {error}
                </div>
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
                    required
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
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-semibold py-3"
              >
                {isLoading ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Link href="/" className="text-orange-400 hover:text-orange-300 text-sm">
                العودة إلى الموقع الرئيسي
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Login Info */}
        <div className="mt-6 text-center">
          <Card className="bg-gray-800/50 border-gray-700">
            <CardContent className="pt-4">
              <p className="text-gray-300 text-sm mb-2">بيانات تسجيل الدخول التجريبية:</p>
              <p className="text-orange-400 text-sm">اسم المستخدم: admin</p>
              <p className="text-orange-400 text-sm">كلمة المرور: MusafireenDj2024</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
