import React from 'react'
import {OrderStatus} from "@/types/dashboard.type";
import {Order} from "@/lib/orderService";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";

interface OrdersTableProps {
    orders: Order[]
    onStatusChange: (order: Order, status: OrderStatus) => void
    onEditClick: (order: Order) => void
    onDeleteClick: (order: Order) => void
}

const statusClasses: Record<OrderStatus, string> = {
    PENDING: "text-gray-700 bg-gray-200",
    PREPARING: "text-blue-700 bg-blue-200",
    READY: "text-yellow-700 bg-yellow-200",
    DELIVERING: "text-purple-700 bg-purple-200",
    DELIVERED: "text-green-700 bg-green-200",
    CANCELLED: "text-red-700 bg-red-200",
}

const statusLabels: Record<string, string> = {
    PENDING: 'В ожидании',
    PREPARING: 'Готовится',
    READY: 'Готов',
    DELIVERING: 'Доставляется',
    DELIVERED: 'Доставлен',
    CANCELLED: 'Отменён',
}

export function OrdersTable({ orders, onStatusChange, onEditClick, onDeleteClick }: OrdersTableProps) {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>№</TableHead>
                    <TableHead>Клиент</TableHead>
                    <TableHead>Телефон</TableHead>
                    <TableHead>Адрес</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Итог</TableHead>
                    <TableHead className="text-center">Действия</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {orders.map(order => (
                    <TableRow key={order.id}>
                        <TableCell>{order.id}</TableCell>
                        <TableCell>{order.clientName} {order.clientSurname}</TableCell>
                        <TableCell>{order.clientPhone}</TableCell>
                        <TableCell>{order.deliveryAddress || '-'}</TableCell>
                        <TableCell>
                            <Select
                                value={order.status}
                                onValueChange={val => onStatusChange(order, val as OrderStatus)}
                            >
                                <SelectTrigger className="w-[150px]">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.values(OrderStatus).map(status => (
                                        <SelectItem key={status} value={status}>
                                            <Badge className={statusClasses[status]}>
                                                {statusLabels[status] || status}
                                            </Badge>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </TableCell>
                        <TableCell>{order.totalPrice.toFixed(2)} ₽</TableCell>
                        <TableCell className="space-x-2 flex justify-center">
                            <Button size="sm" variant="outline" onClick={() => onEditClick(order)}>
                                Изменить
                            </Button>
                            <Button size="sm" variant="destructive" onClick={() => onDeleteClick(order)}>
                                Удалить
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
