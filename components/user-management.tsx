"use client"

import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { UserManager, User, PERMISSIONS, sanitizeInput } from '@/lib/auth'
import { Edit, Trash2, UserPlus, KeyRound, CheckCircle2, XCircle } from 'lucide-react'

interface UserManagementProps {
  currentUser: User;
}

export default function UserManagement({ currentUser }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>([]);
  const [newUser, setNewUser] = useState({ username: '', password: '', role: 'viewer' as User['role'] });
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editPassword, setEditPassword] = useState('');
  const [confirmEditPassword, setConfirmEditPassword] = useState('');
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    // UserManager.getAllUsers() is async, so await it
    const allUsers = await UserManager.getAllUsers();
    setUsers(allUsers);
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS)) {
      setMessage({ type: 'error', text: 'ليس لديك صلاحية لإضافة مستخدمين.' });
      return;
    }

    if (!newUser.username || !newUser.password) {
      setMessage({ type: 'error', text: 'الرجاء إدخال اسم المستخدم وكلمة المرور.' });
      return;
    }

    const addedUser = await UserManager.addUser(
      sanitizeInput(newUser.username),
      newUser.password,
      newUser.role
    );

    if (addedUser) {
      setMessage({ type: 'success', text: `تم إضافة المستخدم ${addedUser.username} بنجاح.` });
      setNewUser({ username: '', password: '', role: 'viewer' });
      loadUsers();
    } else {
      setMessage({ type: 'error', text: 'فشل إضافة المستخدم. قد يكون اسم المستخدم موجوداً بالفعل.' });
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser(user);
    setEditPassword('');
    setConfirmEditPassword('');
    setMessage(null);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);

    if (!editingUser) return;

    if (!UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS)) {
      setMessage({ type: 'error', text: 'ليس لديك صلاحية لتعديل المستخدمين.' });
      return;
    }

    if (editPassword && editPassword !== confirmEditPassword) {
      setMessage({ type: 'error', text: 'كلمتا المرور الجديدتان غير متطابقتين.' });
      return;
    }

    const updates: Partial<Omit<User, 'passwordHash'>> & { newPassword?: string } = {
      role: editingUser.role,
    };

    if (editPassword) {
      updates.newPassword = editPassword;
    }

    const updatedUser = await UserManager.updateUser(editingUser.id, updates);

    if (updatedUser) {
      setMessage({ type: 'success', text: `تم تحديث المستخدم ${updatedUser.username} بنجاح.` });
      setEditingUser(null);
      setEditPassword('');
      setConfirmEditPassword('');
      loadUsers();
    } else {
      setMessage({ type: 'error', text: 'فشل تحديث المستخدم.' });
    }
  };

  const handleDeleteUser = async (userId: string) => {
    setMessage(null);

    if (!UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS)) {
      setMessage({ type: 'error', text: 'ليس لديك صلاحية لحذف المستخدمين.' });
      return;
    }

    if (confirm('هل أنت متأكد أنك تريد حذف هذا المستخدم؟')) {
      const success = await UserManager.deleteUser(userId);
      if (success) {
        setMessage({ type: 'success', text: 'تم حذف المستخدم بنجاح.' });
        loadUsers();
      } else {
        setMessage({ type: 'error', text: 'فشل حذف المستخدم.' });
      }
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-2">إدارة المستخدمين</h2>
        <p className="text-gray-300">إضافة، تعديل، وحذف المستخدمين وأدوارهم</p>
      </div>

      {message && (
        <Alert className={`border-${message.type === 'success' ? 'green' : 'red'}-500 bg-${message.type === 'success' ? 'green' : 'red'}-500/10`}>
          {message.type === 'success' ? <CheckCircle2 className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
          <AlertDescription className={`text-${message.type === 'success' ? 'green' : 'red'}-200`}>
            {message.text}
          </AlertDescription>
        </Alert>
      )}

      {/* Add New User */}
      {UserManager.hasPermission(currentUser, PERMISSIONS.MANAGE_USERS) && (
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-white">إضافة مستخدم جديد</CardTitle>
            <CardDescription className="text-gray-300">قم بإنشاء حساب مستخدم جديد وتعيين دوره</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddUser} className="grid md:grid-cols-3 gap-4 items-end">
              <div>
                <Label htmlFor="new-username" className="text-white">اسم المستخدم</Label>
                <Input
                  id="new-username"
                  value={newUser.username}
                  onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="new-password" className="text-white">كلمة المرور</Label>
                <Input
                  id="new-password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  className="bg-gray-700 border-gray-600 text-white focus:border-orange-500 focus:ring-orange-500"
                  required
                />
              </div>
              <div>
                <Label htmlFor="new-role" className="text-white">الدور</Label>
                <Select value={newUser.role} onValueChange={(value) => setNewUser({ ...newUser, role: value as User['role'] })}>
                  <SelectTrigger className="bg-gray-700 border-gray-600 text-white">
                    <SelectValue placeholder="اختر دوراً" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-700 border-
