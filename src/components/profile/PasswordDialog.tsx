'use client';

import React, {useState} from 'react';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {toast} from 'sonner';
import {userService} from '@/lib/userService';

import {SuccessAlert} from './SuccessAlert';

export function PasswordDialog() {
    const [passwordForm, setPasswordForm] = useState({
        oldPassword: '',
        newPassword: '',
    });
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [successVisible, setSuccessVisible] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
        setErrorMessage(null);
    };

    const handleSubmit = async () => {
        if (!passwordForm.oldPassword || !passwordForm.newPassword) {
            toast.error('Пожалуйста, заполните все поля');
            return;
        }
        try {
            setLoading(true);
            setErrorMessage(null);
            await userService.changePassword(passwordForm);
            setSuccessVisible(true);
            setPasswordForm({ oldPassword: '', newPassword: '' });
            setTimeout(() => setSuccessVisible(false), 4000);
        } catch (error: any) {
            if (error?.response?.data?.message) {
                setErrorMessage(error.response.data.message);
            } else {
                toast.error('Ошибка при смене пароля');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" size="sm">
                        Изменить пароль
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Смена пароля</DialogTitle>
                        <DialogDescription>Введите текущий и новый пароль</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 mt-4">
                        <div>
                            <Label
                                htmlFor="oldPassword"
                                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Текущий пароль
                            </Label>
                            <Input
                                id="oldPassword"
                                name="oldPassword"
                                type="password"
                                value={passwordForm.oldPassword}
                                onChange={handleChange}
                                placeholder="Введите текущий пароль"
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="newPassword"
                                className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Новый пароль
                            </Label>
                            <Input
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                value={passwordForm.newPassword}
                                onChange={handleChange}
                                placeholder="Введите новый пароль"
                            />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="mt-4 rounded-md bg-red-100 dark:bg-red-900 px-4 py-3 text-red-700 dark:text-red-300">
                            {errorMessage}
                        </div>
                    )}

                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="ghost" disabled={loading}>
                                Отмена
                            </Button>
                        </DialogClose>
                        <Button onClick={handleSubmit} disabled={loading}>
                            {loading ? 'Сохранение...' : 'Сменить пароль'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <SuccessAlert
                message="Пароль успешно изменён!"
                visible={successVisible}
                onClose={() => setSuccessVisible(false)}
            />
        </>
    );
}
