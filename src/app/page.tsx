'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/authService';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    const redirectByRole = async () => {
      try {
        const user = await authService.getCurrentUser();

        if (!user) {
          router.replace('/login');
          return;
        }

        switch (user.role) {
          case 'ADMIN':
            router.replace('/dashboard');
            break;
          case 'WAITER':
            router.replace('/orders');
            break;
          default:
            router.replace('/unauthorized');
            break;
        }
      } catch (err) {
        console.error('Ошибка получения пользователя:', err);
        router.replace('/login');
      }
    };

    redirectByRole();
  }, [router]);

  return null;
}
