"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { UserManager, User, UserRole, PERMISSIONS } from "@/lib/auth"
import { Plus, Edit, Trash2, Key, Shield, CheckCircle, AlertTriangle } from 'lucide-react'

interface UserManagementProps {
  currentUser: User
}

export default function UserManagement({ currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([])
  const [showAddUser, setShowAddUser] = useState(false)
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [showChangePassword, setShowChangePassword] = useState<string | null>(null)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  const [newUser, setNewUser] = useState({
    username: '',
    email: '',
    role: 'viewer' as UserRole,
    password: ''
  })

  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: ''
  })

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = () => {
    setUsers(UserManager.getAllUsers())
  }

  const handleAddUser = () => {
    if (!newUser.username || !newUser.email || !newUser.password) {
      setMessage({ type: 'error', text: 'يرجى ملء جميع الحقول المطلوبة' })
      return
    }

    try {
      UserManager.createUser(newUser)
      loadUsers()
      setNewUser({ username: '', email: '', role: 'viewer', password: '' })
      setShowAddUser(false)
      setMessage({ type: 'success', text: 'تم إضافة المستخدم بنجاح' })
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ في إضافة المستخدم' })
    }
  }

  const handleUpdateUser = (user: User) => {
    if (!editingUser) return

    try {
      UserManager.updateUser(editingUser.id, {
        username: editingUser.username,
        email: editingUser.email,
        role: editingUser.role
      })
      loadUsers()
      setEditingUser(null)
      setMessage({ type: 'success', text: 'تم تحديث المستخدم بنجاح' })
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ في تحديث المستخدم' })
    }
  }

  const handleDeleteUser = (userId: string) => {
    if (userId === currentUser.id) {
      setMessage({ type: 'error', text: 'لا يمكنك حذف حسابك الخاص' })
      return
    }

    if (confirm('هل أنت متأكد من حذف هذا المستخدم؟')) {
      try {
        UserManager.deleteUser(userId)
        loadUsers()
        setMessage({ type: 'success', text: 'تم حذف المستخدم بنجاح' })
      } catch (error) {
        setMessage({ type: 'error', text: 'حدث خطأ في حذف المستخدم' })
      }
    }
  }

  const handleChangePassword = (userId: string) => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'كلمات المرور غير متطابقة' })
      return
    }

    if (passwordData.newPassword.length < 8) {
      setMessage({ type: 'error', text: 'كلمة المرور يجب أن تكون 8 أحرف على الأقل' })
      return
    }

    try {
      UserManager.changePassword(userId, passwordData.newPassword)
      setPasswordData({ newPassword: '', confirmPassword: '' })
      setShowChangePassword(null)
      setMessage({ type: 'success', text: 'تم تغيير كلمة المرور بنجاح' })
    } catch (error) {
      setMessage({ type: 'error', text: 'حدث خطأ في تغيير كلمة المرور' })
    }
  }

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-red-500'
      case 'editor': return 'bg-blue-500'
      case 'viewer': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'مدير'
      case 'editor': return 'محرر'
      case 'viewer': return 'مشاهد'
      default: return role
    }
  }

  // التحقق من الصلاحيات
  const canManageUsers = UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS)

  if (!canManageUsers) {
    return (
      <Alert className="border-red-500 bg-red-500/10">
        <Shield className="h-4 w-4 text-red-500" />
        <AlertDescription className="text-red-200">
          ليس لديك صلاحية لإدارة المستخدمين
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Messages */}
      {message && (
        <Alert className={`border-${message.type === 'success' ? 'green' : 'red'}-500 bg-${message.type === 'success' ? 'green' : 'red'}-500/10`}>
          {message.type === 'success' ? 
            <CheckCircle className="h-4 w-4 text-green-500" /> : 
            <AlertTriangle className="h-4 w-4 text-red-500" />
          }
          <AlertDescription className={`text-${message.type === 'success' ? 'green' : 'red'}-200`}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Add User Button */}
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">إدارة المستخدمين</h3>
        <Button
          onClick={() => setShowAddUser(true)}
          className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600"
        >
          <Plus className="h-4 w-4 ml-2" />
          إضافة مستخدم
        </Button>
      </div>

      {/* Add User Form */}
      {showAddUser && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">إضافة مستخدم جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="username" className="text-white">اسم المستخدم</Label>
                <Input
                  id="username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                  className="bg-gray-700 border-gray-600 text-white"
                  placeholder="أدخل اسم المستخدم"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-white">البريد الإلكتروني</Label>
                <Input
                  id="email"
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
                <Label htmlFor="role" className="text-white">الدور</Label>
                <Select onValueChange={(value: UserRole) => setNewUser({...newUser, role: value})}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="اختر الدور" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-gray-600">
                    <SelectItem value="viewer">مشاهد</SelectItem>
                    <SelectItem value="editor">محرر</SelectItem>
                    {currentUser.role === 'admin' && <SelectItem value="admin">مدير</SelectItem>}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="password" className="text-white">كلمة المرور</Label>
                <Input
                  id="password"
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

      {/* Users List */}
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
                      <Badge className={`${getRoleBadgeColor(user.role)} text-white`}>
                        {getRoleLabel(user.role)}
                      </Badge>
                      {user.lastLogin && (
                        <span className="text-xs text-gray-500">
                          آخر دخول: {new Date(user.lastLogin).toLocaleDateString('ar')}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setEditingUser(user)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setShowChangePassword(user.id)}
                    className="bg-yellow-600 hover:bg-yellow-700"
                  >
                    <Key className="h-4 w-4" />
                  </Button>
                  {user.id !== currentUser.id && (
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

              {/* Edit User Form */}
              {editingUser?.id === user.id && (
                <div className="mt-4 pt-4 border-t border-gray-600 space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-white">اسم المستخدم</Label>
                      <Input
                        value={editingUser.username}
                        onChange={(e) => setEditingUser({...editingUser, username: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                    <div>
                      <Label className="text-white">البريد الإلكتروني</Label>
                      <Input
                        value={editingUser.email}
                        onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                        className="bg-gray-700 border-gray-600 text-white"
                      />
                    </div>
                  </div>
                  <div>
                    <Label className="text-white">الدور</Label>
                    <Select onValueChange={(value: UserRole) => setEditingUser({...editingUser, role: value})}>
                      <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                        <SelectValue placeholder={getRoleLabel(editingUser.role)} />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="viewer">مشاهد</SelectItem>
                        <SelectItem value="editor">محرر</SelectItem>
                        {currentUser.role === 'admin' && <SelectItem value="admin">مدير</SelectItem>}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => handleUpdateUser(editingUser)} className="bg-green-600 hover:bg-green-700">
                      حفظ التغييرات
                    </Button>
                    <Button onClick={() => setEditingUser(null)} variant="outline" className="bg-transparent">
                      إلغاء
                    </Button>
                  </div>
                </div>
              )}

              {/* Change Password Form */}
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
  )
}
