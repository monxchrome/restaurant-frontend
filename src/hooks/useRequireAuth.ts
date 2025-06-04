"use client";

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { authService } from '@/lib/authService';

export function useRequireAuth() {
    const router = useRouter();

    useEffect(() => {
        if (!authService.isAuth()) {
            router.push('/login');
        }
    }, [router]);
}
