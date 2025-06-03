'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { userService } from '@/lib/userService';
import { PasswordDialog } from './PasswordDialog';
import { ErrorAlert } from './ErrorAlert';
import {ShadcnAlert} from "@/components/profile/ShadcnAlert";

interface ProfileFormProps {
    userId: number;
    initialData: {
        email: string;
        name: string;
        surname: string;
        phone: string;
    };
}

const errorTranslations: Record<string, string> = {
    'email must be an email': 'Email должен быть валидным',
    'name should not be empty': 'Имя не должно быть пустым',
    'surname should not be empty': 'Фамилия не должна быть пустой',
    'phone should not be empty': 'Телефон не должен быть пустым',
};

export function ProfileForm({ userId, initialData }: ProfileFormProps) {
    const [form, setForm] = useState(initialData);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<string[]>([]);
    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async () => {
        setErrors([]);
        try {
            setLoading(true);
            await userService.updateUser(userId, form);
            setSuccessMessage('Профиль успешно обновлён');
        } catch (error: any) {
            if (error?.response?.data?.message && Array.isArray(error.response.data.message)) {
                const backendErrors = error.response.data.message as string[];
                setErrors(backendErrors.map((e) => errorTranslations[e] || e));
            } else {
                toast.error('Ошибка при обновлении профиля');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <ErrorAlert errors={errors} />
            <ShadcnAlert message={successMessage} onClose={() => setSuccessMessage('')} />
            <div className="space-y-6">
                <div>
                    <Label
                        htmlFor="email"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Email
                    </Label>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="Введите email"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="name"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Имя
                    </Label>
                    <Input
                        id="name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Введите имя"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="surname"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Фамилия
                    </Label>
                    <Input
                        id="surname"
                        name="surname"
                        value={form.surname}
                        onChange={handleChange}
                        placeholder="Введите фамилию"
                    />
                </div>

                <div>
                    <Label
                        htmlFor="phone"
                        className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Телефон
                    </Label>
                    <Input
                        id="phone"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+7 (999) 999-99-99"
                    />
                </div>

                <div className="flex justify-between items-center mt-8">
                    <PasswordDialog />
                    <Button onClick={handleSubmit} disabled={loading}>
                        {loading ? 'Сохранение...' : 'Сохранить изменения'}
                    </Button>
                </div>
            </div>
        </>
    );
}
