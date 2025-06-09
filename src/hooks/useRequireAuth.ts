'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/authService';

export function useRequireAuth(allowedRoles?: string[]) {
    const router = useRouter();

    useEffect(() => {
        const check = async () => {
            try {
                const user = await authService.getCurrentUser();

                if (!user) {
                    router.replace('/login');
                    return;
                }

                if (allowedRoles && !allowedRoles.includes(user.role)) {
                    router.replace('/unauthorized');
                    return;
                }
            } catch (err) {
                console.error('Ошибка проверки авторизации:', err);
                router.replace('/login');
            }
        };

        check();
    }, [router, allowedRoles]);
}
