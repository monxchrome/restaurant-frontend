'use client'

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import React, { useState } from 'react'
import { Order, orderService } from "@/lib/orderService"
import { OrderStatus } from "@/types/dashboard.type"
import { OrdersTable } from "@/components/orders/OrdersTable"
import { EditOrderDialog } from "@/components/orders/EditOrderDialog"
import { ConfirmDialog } from "@/components/orders/ConfirmDialog"
import { OrdersPagination } from "@/components/orders/OrdersPagination"

const PAGE_SIZE = 10

export default function OrdersPage() {
    const [page, setPage] = useState(1)
    const [editingOrder, setEditingOrder] = useState<Order | null>(null)
    const [deletingOrder, setDeletingOrder] = useState<Order | null>(null)
    const [serverErrors, setServerErrors] = useState<string[]>([])

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['orders', page],
        queryFn: () => orderService.getAll(page, PAGE_SIZE),
    })

    const updateStatusMutation = useMutation({
        mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) =>
            orderService.updateOrderStatus(orderId, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', page] })
        },
    })

    const updateOrderMutation = useMutation({
        mutationFn: ({ orderId, data }: { orderId: number; data: Partial<Order> }) =>
            orderService.updateOrder(orderId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', page] })
            setEditingOrder(null)
            setServerErrors([])
        },
        onError: (error: any) => {
            if (error.response?.data?.message && Array.isArray(error.response.data.message)) {
                setServerErrors(error.response.data.message)
            } else {
                setServerErrors(['Произошла неизвестная ошибка'])
            }
        },
    })

    const deleteOrderMutation = useMutation({
        mutationFn: (orderId: number) => orderService.deleteOrder(orderId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', page] })
            setDeletingOrder(null)
        },
    })

    if (isLoading) return <div>Загрузка заказов...</div>

    const handleStatusChange = (order: Order, status: OrderStatus) => {
        updateStatusMutation.mutate({ orderId: order.id, status })
    }

    const handleEditSubmit = (data: Partial<Order>) => {
        if (!editingOrder) return
        setServerErrors([])
        updateOrderMutation.mutate({ orderId: editingOrder.id, data })
    }

    const handleDeleteConfirm = () => {
        if (!deletingOrder) return
        deleteOrderMutation.mutate(deletingOrder.id)
    }

    const orders = data?.orders || []
    const totalCount = data?.total || 0
    const totalPages = Math.ceil(totalCount / PAGE_SIZE)

    return (
        <div className="p-6">
            <h1 className="text-3xl font-bold mb-6">Заказы</h1>

            <OrdersTable
                orders={orders}
                onStatusChange={handleStatusChange}
                onEditClick={setEditingOrder}
                onDeleteClick={setDeletingOrder}
            />

            <div className="mt-6 flex justify-center">
                <OrdersPagination page={page} onPageChange={setPage} totalPages={totalPages} />
            </div>

            <EditOrderDialog
                order={editingOrder}
                isOpen={!!editingOrder}
                onClose={() => {
                    setEditingOrder(null)
                    setServerErrors([])
                }}
                onSubmit={handleEditSubmit}
                serverErrors={serverErrors}
            />

            <ConfirmDialog
                isOpen={!!deletingOrder}
                onClose={() => setDeletingOrder(null)}
                onConfirm={handleDeleteConfirm}
                title="Удалить заказ?"
                description={`Вы действительно хотите удалить заказ №${deletingOrder?.id}? Это действие нельзя отменить.`}
                confirmText="Удалить"
                cancelText="Отмена"
            />
        </div>
    )
}
