'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { validateSessionServer } from '@/lib/auth';
import { ADMIN_LOGIN_PATH } from '@/lib/settings';
import { Loader2 } from 'lucide-react';

interface AdminGuardProps {
  children: React.ReactNode;
}

export default function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const session = await validateSessionServer();
      if (session?.role === 'admin') {
        setIsAuthorized(true);
      } else {
        router.replace(ADMIN_LOGIN_PATH);
      }
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthorized) {
    return null; // Or a message indicating redirection
  }

  return <>{children}</>;
}
