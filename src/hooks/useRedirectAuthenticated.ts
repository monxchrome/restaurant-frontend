"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authService } from '@/lib/authService';

export function useRedirectIfAuthenticated() {
    const router = useRouter();

    useEffect(() => {
        if (authService.isAuth()) {
            router.push('/dashboard');
        }
    }, [router]);
}
