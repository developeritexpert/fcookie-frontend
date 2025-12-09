'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/components/store/useAuthStore';
import Loading from '@/components/ui/Loading';

interface AuthGuardProps {
  children: ReactNode;
  allowedRoles?: string[];
}

export default function AuthGuard({ children, allowedRoles = [] }: AuthGuardProps) {
  const router = useRouter();
  const pathname = usePathname();

  const isAuth = useAuthStore((s) => s.isAuth);
  const checkExpiry = useAuthStore((s) => s.checkExpiry);
  const hasAnyRole = useAuthStore((s) => s.hasAnyRole);
  const hasHydrated = useAuthStore((s) => s.hasHydrated);

  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const validateAuth = () => {
      // Wait for hydration before checking anything
      if (!hasHydrated) return;

      const valid = checkExpiry();

      if (!valid || !isAuth()) {
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return;
      }

      if (allowedRoles.length > 0 && !hasAnyRole(allowedRoles)) {
        router.push('/unauthorized');
        return;
      }

      setChecking(false);
    };

    validateAuth();
  }, [pathname, allowedRoles, router, isAuth, hasAnyRole, checkExpiry, hasHydrated]);

  if (checking) {
    return <Loading fullScreen />;
  }

  return <>{children}</>;
}
