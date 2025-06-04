'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { authService } from '@/lib/authService';
import { userService } from '@/lib/userService';
import { ProfileForm } from '@/components/profile/ProfileForm';
import {useRequireAuth} from "@/hooks/useRequireAuth";

function parseJwt(token: string) {
    try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join(''),
        );
        return JSON.parse(jsonPayload);
    } catch {
        return null;
    }
}

export default function ProfilePage() {
    useRequireAuth();

    const [userId, setUserId] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        name: '',
        surname: '',
        phone: '',
    });

    useEffect(() => {
        const token = authService.getAccessToken();
        if (!token) {
            setLoading(false);
            return;
        }
        const payload = parseJwt(token);
        if (payload?.id) {
            setUserId(payload.id);
            userService
                .getById(payload.id)
                .then((res) => {
                    const user = res.data;
                    setFormData({
                        email: user.email || '',
                        name: user.name || '',
                        surname: user.surname || '',
                        phone: user.phone || '',
                    });
                })
                .catch(() => {
                    toast.error('Ошибка загрузки данных пользователя');
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, []);

    if (loading) {
        return (
            <div className="max-w-3xl mx-auto mt-16 p-6 text-center text-gray-500 dark:text-gray-400">
                Загрузка...
            </div>
        );
    }

    if (!userId) {
        return (
            <div className="max-w-3xl mx-auto mt-16 p-6 text-center text-red-500">
                Пользователь не найден. Пожалуйста, войдите снова.
            </div>
        );
    }

    return (
        <motion.div
            className="max-w-3xl mx-auto mt-16 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
            style={{marginLeft: "450px"}}
        >
            <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-gray-100">
                Профиль пользователя
            </h1>

            <ProfileForm userId={userId} initialData={formData} />
        </motion.div>
    );
}
