"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { motion } from "framer-motion";

const orderStatuses = {
    PENDING: "В ожидании",
    PREPARING: "Готовится",
    READY: "Готов",
    DELIVERING: "Доставляется",
    DELIVERED: "Доставлен",
    CANCELLED: "Отменён",
};

interface OrdersFiltersProps {
    filters: {
        status?: string;
        sortBy: string;
        sortOrder: "asc" | "desc";
    };
    onChange: (filters: {
        status?: string;
        sortBy: string;
        sortOrder: "asc" | "desc";
    }) => void;
}

export function OrdersFilters({ filters, onChange }: OrdersFiltersProps) {
    const handleChange = (updated: Partial<typeof filters>) => {
        const newFilters = { ...filters, ...updated };
        onChange({
            ...newFilters,
            status: newFilters.status === "all" ? undefined : newFilters.status,
        });
    };

    const getStatusLabel = (value: string | undefined) =>
        !value || value === "all"
            ? "Все статусы"
            : orderStatuses[value as keyof typeof orderStatuses];

    const getSortByLabel = (value: string) => {
        switch (value) {
            case "createdAt":
                return "По дате";
            case "totalPrice":
                return "По цене";
            case "clientName":
                return "По имени клиента";
            default:
                return value;
        }
    };

    const getSortOrderLabel = (value: string) =>
        value === "asc" ? "По возрастанию" : "По убыванию";

    return (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap gap-2 mb-6"
        >
            <Select
                value={filters.status ?? "all"}
                onValueChange={(value) => handleChange({ status: value })}
            >
                <SelectTrigger className="min-w-[150px]">
                    <SelectValue>{getStatusLabel(filters.status)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все статусы</SelectItem>
                    {Object.entries(orderStatuses).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                value={filters.sortBy}
                onValueChange={(value) => handleChange({ sortBy: value })}
            >
                <SelectTrigger className="min-w-[150px]">
                    <SelectValue>{getSortByLabel(filters.sortBy)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="createdAt">По дате</SelectItem>
                    <SelectItem value="totalPrice">По цене</SelectItem>
                    <SelectItem value="clientName">По имени клиента</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.sortOrder}
                onValueChange={(value) =>
                    handleChange({ sortOrder: value as "asc" | "desc" })
                }
            >
                <SelectTrigger className="min-w-[150px]">
                    <SelectValue>{getSortOrderLabel(filters.sortOrder)}</SelectValue>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">По возрастанию</SelectItem>
                    <SelectItem value="desc">По убыванию</SelectItem>
                </SelectContent>
            </Select>
        </motion.div>
    );
}
