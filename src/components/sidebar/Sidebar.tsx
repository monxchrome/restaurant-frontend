'use client'

import { useRouter, usePathname } from 'next/navigation'
import {
    Home,
    User,
    List,
    ShoppingCart,
    LogOut,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import React, {useEffect, useState} from "react";
import {NotificationsBell} from "@/components/notifications/NotificationsBell";
import {authService} from "@/lib/authService";
import {Switch} from "@/components/ui/switch";

const navItems = [
    { label: 'Домой', icon: Home, href: '/dashboard', roles: ['ADMIN'] },
    { label: 'Пользователь', icon: User, href: '/profile', roles: ['ADMIN', 'WAITER'] },
    { label: 'Меню', icon: List, href: '/menu', roles: ['ADMIN', 'WAITER'] },
    { label: 'Заказы', icon: ShoppingCart, href: '/orders', roles: ['ADMIN', 'WAITER'] },
]

export function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()
    const [role, setRole] = useState<string | null>(null)
    const [soundEnabled, setSoundEnabled] = useState<boolean>(true)

    useEffect(() => {
        const saved = localStorage.getItem('notifications-sound')
        if (saved !== null) setSoundEnabled(saved === 'true')
    }, [])

    useEffect(() => {
        localStorage.setItem('notifications-sound', soundEnabled.toString())
    }, [soundEnabled])

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser()
                setRole(user.role)
            } catch (e) {
                console.error('Ошибка при получении пользователя', e)
                router.push('/login')
            }
        }

        fetchUser()
    }, [router])

    const handleLogout = async () => {
        await authService.logout();
        router.push('/login')
    }

    if (!role) return null

    return (
        <aside
            className="fixed left-0 top-0 h-screen w-[240px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between">
            <div className="space-y-2">
                {navItems
                    .filter((item) => item.roles.includes(role))
                    .map(({label, icon: Icon, href}) => (
                        <Link href={href} key={href}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    'w-full justify-start gap-2',
                                    pathname === href
                                        ? 'bg-zinc-100 dark:bg-zinc-800'
                                        : 'hover:bg-zinc-100 dark:hover:bg-zinc-800'
                                )}
                            >
                                <Icon className="h-4 w-4"/>
                                {label}
                            </Button>
                        </Link>
                    ))}

                <div className="pl-1">
                    <NotificationsBell soundEnabled={soundEnabled}/>
                    <div className="flex items-center justify-start gap-2 mt-2">
                        <Switch
                            id="sound-switch"
                            checked={soundEnabled}
                            onCheckedChange={setSoundEnabled}
                        />
                        <label
                            htmlFor="sound-switch"
                            className="text-xs select-none cursor-pointer text-muted-foreground"
                        >
                            Звук уведомлений
                        </label>
                    </div>
                </div>
            </div>

            <div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                    onClick={handleLogout}
                >
                <LogOut className="h-4 w-4"/>
                    Выйти
                </Button>
            </div>
        </aside>
    )
}
