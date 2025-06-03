'use client'

import { Bell } from 'lucide-react'
import { useNotifications } from '@/hooks/useNotifications'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

export const NotificationsBell = () => {
    const { notifications, markAsRead, unreadCount } = useNotifications()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger className="relative flex items-center gap-2 px-2 py-2 w-full rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition">
                <div className="relative">
                    <Bell className={cn('h-4 w-4', unreadCount > 0 && 'animate-pulse text-red-500')} />
                    {unreadCount > 0 && (
                        <Badge className="absolute -top-2 text-[12px] bg-red-600 text-white px-1 h-4">
                            {unreadCount}
                        </Badge>
                    )}
                </div>
                <span className="text-sm font-medium">Уведомления</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-80 max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                    <DropdownMenuItem disabled>Нет уведомлений</DropdownMenuItem>
                ) : (
                    notifications.map((n) => (
                        <DropdownMenuItem
                            key={n.id}
                            className={cn('flex flex-col gap-0.5', !n.read && 'bg-zinc-100 dark:bg-zinc-800')}
                            onClick={() => markAsRead(n.id)}
                        >
                            <p className="text-sm font-semibold">{n.title}</p>
                            <p className="text-xs text-muted-foreground">{n.body}</p>
                            <p className="text-[10px] text-muted-foreground">
                                {new Date(n.createdAt).toLocaleString()}
                            </p>
                        </DropdownMenuItem>
                    ))
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}