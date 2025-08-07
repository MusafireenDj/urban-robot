'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/lib/auth'; // Assuming lib/auth.ts has login
import { ADMIN_LOGIN_PATH } from '@/lib/settings'; // Assuming lib/settings.ts

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Temporarily disable login blocking for testing
    // if (email === 'blocked-admin@example.com') {
    //   toast({
    //     title: 'Login Failed',
    //     description: 'This admin account is temporarily blocked. Please try again later.',
    //     variant: 'destructive',
    //   });
    //   setIsLoading(false);
    //   return;
    // }

    const result = await login(email, password);

    if (result.success && result.session?.role === 'admin') {
      toast({
        title: 'Admin Login Successful',
        description: 'Welcome to the admin dashboard!',
      });
      router.push(ADMIN_DASHBOARD_PATH);
    } else {
      toast({
        title: 'Login Failed',
        description: result.message || 'Invalid admin credentials.',
        variant: 'destructive',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center min-h-[100dvh] bg-muted">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl">Admin Login</CardTitle>
          <CardDescription>Enter your admin credentials to access the dashboard.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
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
            <Link href="/login" className="underline" prefetch={false}>
              Back to User Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
