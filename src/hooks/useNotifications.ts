'use client'

import {useEffect, useState} from 'react'
import {io, Socket} from 'socket.io-client'
import {baseURL} from "@/lib/config";
import {INotification} from "@/types/notification.type";

let socket: Socket

export const useNotifications = () => {
    const [notifications, setNotifications] = useState<INotification[]>([])

    useEffect(() => {
        socket = io(baseURL)

        socket.on('connect', () => {
            console.log('Socket connected')
        })

        socket.on('orderUpdate', (data) => {
            const newNotification: INotification = {
                id: String(Date.now()),
                title: data.type === 'CREATED' ? 'Новый заказ' : 'Обновление заказа',
                body: `Заказ: ${data.order.clientName} ${data.order.clientSurname}`,
                read: false,
                createdAt: new Date().toISOString(),
            }

            setNotifications((prev) => [newNotification, ...prev])
        })

        return () => {
            socket.disconnect()
        }
    }, [])

    const markAsRead = (id: string) => {
        setNotifications((prev) =>
            prev.map((n) => (n.id === id ? { ...n, read: true } : n))
        )
    }

    const unreadCount = notifications.filter((n) => !n.read).length

    return { notifications, markAsRead, unreadCount }
}
