"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { validateSession } from '@/lib/auth'

interface AdminGuardProps {
  children: React.ReactNode
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('adminToken')
        const timestamp = localStorage.getItem('loginTime')
        const userId = localStorage.getItem('currentUserId')

        console.log('Checking auth:', { token: !!token, timestamp: !!timestamp, userId: !!userId })

        if (!token || !timestamp || !userId) {
          console.log('Missing auth data, redirecting to login')
          router.push('/login')
          return
        }

        if (!validateSession(token, timestamp)) {
          console.log('Session expired, redirecting to login')
          localStorage.removeItem('adminToken')
          localStorage.removeItem('loginTime')
          localStorage.removeItem('csrfToken')
          localStorage.removeItem('currentUserId')
          router.push('/login?expired=true')
          return
        }

        console.log('Auth successful')
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Authentication error:', error)
        router.push('/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()

    // فحص دوري كل 5 دقائق
    const interval = setInterval(checkAuth, 5 * 60 * 1000)
    return () => clearInterval(interval)
  }, [router])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <div className="text-white text-xl">جاري التحقق من الصلاحيات...</div>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <>{children}</>
}
