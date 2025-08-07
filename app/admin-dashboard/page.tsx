'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { HomeIcon, Users, DollarSign, LayoutDashboard } from 'lucide-react';
import { validateSessionServer } from '@/lib/auth';
import { ADMIN_LOGIN_PATH, SITE_NAME } from '@/lib/settings';

export default async function AdminDashboard() {
  const session = await validateSessionServer();

  if (!session?.role === 'admin') {
    redirect(ADMIN_LOGIN_PATH);
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      <header className="px-4 lg:px-6 h-14 flex items-center justify-between bg-card border-b">
        <Link href="/" className="flex items-center justify-center font-bold" prefetch={false}>
          <LayoutDashboard className="h-6 w-6 mr-2" />
          <span>{SITE_NAME} Admin</span>
        </Link>
        <nav className="flex gap-4 sm:gap-6">
          <Button variant="outline" size="sm">
            Logout
          </Button>
        </nav>
      </header>
      <main className="flex-1 container mx-auto px-4 py-8 md:py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2 max-w-[600px] mx-auto">
            Manage your website content, users, and settings from one central location.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2,350</div>
              <p className="text-muted-foreground text-sm mt-1">+20.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">1,234</div>
              <p className="text-muted-foreground text-sm mt-1">+180.1% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">$45,231.89</div>
              <p className="text-muted-foreground text-sm mt-1">+12% from last month</p>
            </CardContent>
          </Card>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t bg-card text-card-foreground">
        <p className="text-xs text-muted-foreground">&copy; 2024 {SITE_NAME}. All rights reserved.</p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link href="/" className="text-xs hover:underline underline-offset-4" prefetch={false}>
            Back to Site
          </Link>
        </nav>
      </footer>
    </div>
  );
}
