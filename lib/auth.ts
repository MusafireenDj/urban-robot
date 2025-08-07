import { NextRequest } from 'next/server'

// أنواع المستخدمين
export type UserRole = 'admin' | 'editor' | 'viewer'

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  passwordHash: string
  createdAt: string
  lastLogin?: string
  permissions: string[]
}

// الصلاحيات المتاحة
export const PERMISSIONS = {
  MANAGE_PROPERTIES: 'manage_properties',
  MANAGE_USERS: 'manage_users',
  MANAGE_SETTINGS: 'manage_settings',
  MANAGE_MEDIA: 'manage_media',
  VIEW_ANALYTICS: 'view_analytics',
  CHANGE_PASSWORD: 'change_password'
}

// الصلاحيات حسب الدور
export const ROLE_PERMISSIONS: Record<UserRole, string[]> = {
  admin: Object.values(PERMISSIONS),
  editor: [
    PERMISSIONS.MANAGE_PROPERTIES,
    PERMISSIONS.MANAGE_MEDIA,
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.CHANGE_PASSWORD
  ],
  viewer: [
    PERMISSIONS.VIEW_ANALYTICS,
    PERMISSIONS.CHANGE_PASSWORD
  ]
}

// تشفير كلمة المرور
const hashPassword = (password: string): string => {
  return btoa(password + 'MusafireenDj_Salt_2024')
}

// التحقق من كلمة المرور
const verifyPassword = (password: string, hashedPassword: string): boolean => {
  return hashPassword(password) === hashedPassword
}

// المستخدمين الافتراضيين
const DEFAULT_USERS: User[] = [
  {
    id: 'admin-001',
    username: 'admin_musafireendj',
    email: 'medalmqaleh@gmail.com',
    role: 'admin',
    passwordHash: hashPassword('MusafireenDj@2024!Secure'),
    createdAt: new Date().toISOString(),
    permissions: ROLE_PERMISSIONS.admin
  }
]

// إدارة المستخدمين
export class UserManager {
  private static getUsers(): User[] {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('users')
      if (saved) {
        try {
          return JSON.parse(saved)
        } catch {
          return DEFAULT_USERS
        }
      }
    }
    return DEFAULT_USERS
  }

  private static saveUsers(users: User[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('users', JSON.stringify(users))
    }
  }

  static validateCredentials(username: string, password: string): User | null {
    const users = this.getUsers()
    const user = users.find(u => u.username === username)
    
    if (user && verifyPassword(password, user.passwordHash)) {
      // تحديث آخر تسجيل دخول
      user.lastLogin = new Date().toISOString()
      this.saveUsers(users)
      return user
    }
    
    return null
  }

  static createUser(userData: Omit<User, 'id' | 'passwordHash' | 'createdAt' | 'permissions'> & { password: string }): User {
    const users = this.getUsers()
    
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}`,
      passwordHash: hashPassword(userData.password),
      createdAt: new Date().toISOString(),
      permissions: ROLE_PERMISSIONS[userData.role]
    }
    
    users.push(newUser)
    this.saveUsers(users)
    
    return newUser
  }

  static updateUser(userId: string, updates: Partial<User>): boolean {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex !== -1) {
      users[userIndex] = { ...users[userIndex], ...updates }
      
      // تحديث الصلاحيات حسب الدور
      if (updates.role) {
        users[userIndex].permissions = ROLE_PERMISSIONS[updates.role]
      }
      
      this.saveUsers(users)
      return true
    }
    
    return false
  }

  static deleteUser(userId: string): boolean {
    const users = this.getUsers()
    const filteredUsers = users.filter(u => u.id !== userId)
    
    if (filteredUsers.length < users.length) {
      this.saveUsers(filteredUsers)
      return true
    }
    
    return false
  }

  static getAllUsers(): User[] {
    return this.getUsers()
  }

  static getUserById(userId: string): User | null {
    const users = this.getUsers()
    return users.find(u => u.id === userId) || null
  }

  static changePassword(userId: string, newPassword: string): boolean {
    const users = this.getUsers()
    const userIndex = users.findIndex(u => u.id === userId)
    
    if (userIndex !== -1) {
      users[userIndex].passwordHash = hashPassword(newPassword)
      this.saveUsers(users)
      return true
    }
    
    return false
  }

  static hasPermission(user: User, permission: string): boolean {
    return user.permissions.includes(permission)
  }
}

// إنشاء رمز الجلسة الآمن
export const generateSecureToken = (): string => {
  const timestamp = Date.now().toString()
  const random = Math.random().toString(36).substring(2)
  const signature = btoa(`${timestamp}_${random}_MusafireenDj_Secret`)
  return signature
}

// التحقق من صحة رمز الجلسة
export const validateSession = (token: string, timestamp: string): boolean => {
  try {
    const sessionAge = Date.now() - parseInt(timestamp)
    const maxAge = 24 * 60 * 60 * 1000 // 24 ساعة
    
    if (sessionAge > maxAge) {
      return false
    }
    
    const decoded = atob(token)
    return decoded.includes('MusafireenDj_Secret')
  } catch {
    return false
  }
}

// حماية من CSRF
export const generateCSRFToken = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// تنظيف البيانات المدخلة
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim()
}

// التحقق من قوة كلمة المرور
export const validatePasswordStrength = (password: string): boolean => {
  const minLength = 8
  const hasUpperCase = /[A-Z]/.test(password)
  const hasLowerCase = /[a-z]/.test(password)
  const hasNumbers = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)
  
  return password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
}
