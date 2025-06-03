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
import React from "react";
import {NotificationsBell} from "@/components/notifications/NotificationsBell";

const navItems = [
    { label: 'Домой', icon: Home, href: '/dashboard' },
    { label: 'Пользователь', icon: User, href: '/profile' },
    { label: 'Меню', icon: List, href: '/menu' },
    { label: 'Заказы', icon: ShoppingCart, href: '/orders' },
]

export function Sidebar() {
    const router = useRouter()
    const pathname = usePathname()

    const handleLogout = () => {
        localStorage.removeItem('access')
        localStorage.removeItem('refresh')
        router.push('/login')
    }

    return (
        <aside className="fixed left-0 top-0 h-screen w-[240px] bg-white dark:bg-zinc-900 border-r border-zinc-200 dark:border-zinc-800 p-4 flex flex-col justify-between">
            <div className="space-y-2">
                {navItems.map(({ label, icon: Icon, href }) => (
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
                            <Icon className="h-4 w-4" />
                            {label}
                        </Button>
                    </Link>
                ))}

                <div className="pl-1">
                    <NotificationsBell />
                </div>
            </div>

            <div>
                <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 text-sm text-red-600 dark:text-red-500 hover:bg-red-100 dark:hover:bg-red-900"
                    onClick={handleLogout}
                >
                    <LogOut className="h-4 w-4" />
                    Выйти
                </Button>
            </div>
        </aside>
    )
}
