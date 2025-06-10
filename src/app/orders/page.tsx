'use client'

import {useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import React, {useCallback, useEffect, useState} from 'react'
import {orderService} from "@/lib/orderService"
import {OrderStatus} from "@/types/dashboard.type"
import {OrdersTable} from "@/components/orders/OrdersTable"
import {EditOrderDialog} from "@/components/orders/EditOrderDialog"
import {ConfirmDialog} from "@/components/orders/ConfirmDialog"
import {OrdersPagination} from "@/components/orders/OrdersPagination"
import {OrdersFilters} from "@/components/orders/OrdersFilters"
import {authService} from "@/lib/authService";
import {useRequireAuth} from "@/hooks/useRequireAuth";
import {IOrder} from "@/types/order.type";

const PAGE_SIZE = 10

export default function OrdersPage() {
    useRequireAuth(['ADMIN', 'WAITER']);

    const [page, setPage] = useState(1)
    const [filters, setFilters] = useState<{
        status?: string;
        sortBy: string;
        sortOrder: "asc" | "desc";
    }>({
        status: undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    const [editingOrder, setEditingOrder] = useState<IOrder | null>(null)
    const [deletingOrder, setDeletingOrder] = useState<IOrder | null>(null)
    const [serverErrors, setServerErrors] = useState<string[]>([])
    const [currentUserRole, setCurrentUserRole] = useState<string | null>(null)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await authService.getCurrentUser()
                setCurrentUserRole(user.role)
            } catch (e) {
                console.error('Ошибка при получении пользователя', e)
            }
        }

        fetchUser()
    }, [])

    const queryClient = useQueryClient()

    const fetchOrders = useCallback(() => {
        return orderService.getAll(page, PAGE_SIZE, filters.status, filters.sortBy, filters.sortOrder)
    }, [page, filters])

    const { data, isLoading } = useQuery({
        queryKey: ['orders', page, filters],
        queryFn: fetchOrders,
    })

    const updateStatusMutation = useMutation({
        mutationFn: ({ orderId, status }: { orderId: number; status: OrderStatus }) =>
            orderService.updateOrderStatus(orderId, { status }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', page, filters] })
        },
    })

    const updateOrderMutation = useMutation({
        mutationFn: ({ orderId, data }: { orderId: number; data: Partial<IOrder> }) =>
            orderService.updateOrder(orderId, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['orders', page, filters] })
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
            queryClient.invalidateQueries({ queryKey: ['orders', page, filters] })
            setDeletingOrder(null)
        },
    })

    if (isLoading) return <div>Загрузка заказов...</div>

    const handleStatusChange = (order: IOrder, status: OrderStatus) => {
        updateStatusMutation.mutate({ orderId: order.id, status })
    }

    const handleEditSubmit = async (data: Partial<IOrder>): Promise<void> => {
        if (!editingOrder) return;
        setServerErrors([]);
        await updateOrderMutation.mutateAsync({ orderId: editingOrder.id, data });
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

            <OrdersFilters filters={filters} onChange={setFilters} />

            <OrdersTable
                orders={orders}
                onStatusChange={handleStatusChange}
                onEditClick={setEditingOrder}
                onDeleteClick={setDeletingOrder}
                userRole={currentUserRole}
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
