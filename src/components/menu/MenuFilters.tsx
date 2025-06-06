"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, PackageCheck, PackageX, HelpCircle } from "lucide-react";

const categories = {
    SALADS_AND_SNACKS: "Салаты и закуски",
    SOUPS: "Супы",
    GRILL_DISHES: "Блюда на гриле",
    MAIN_HOT_DISHES: "Основные горячие блюда",
    PIZZA_AND_PIES: "Пицца и пироги",
    DESSERTS: "Десерты",
    DRINKS: "Напитки",
    EXTRAS: "Дополнительно",
} as const;

interface FiltersProps {
    onChange: (filters: Record<string, any>) => void;
}

export function MenuFilters({ onChange }: FiltersProps) {
    const [filters, setFilters] = useState({
        category: "",
        visible: undefined as boolean | undefined,
        inStock: undefined as boolean | undefined,
        sortBy: "createdAt",
        sortOrder: "desc",
    });

    useEffect(() => {
        onChange(filters);
    }, [filters]);

    const cycleValue = (value: boolean | undefined): boolean | undefined => {
        if (value === undefined) return true;
        if (value === true) return false;
        return undefined;
    };

    const renderStatusIcon = (
        value: boolean | undefined,
        type: "visible" | "inStock"
    ) => {
        const base = "h-4 w-4";
        if (value === true)
            return type === "visible" ? (
                <Eye className={`${base} text-green-600`} />
            ) : (
                <PackageCheck className={`${base} text-green-600`} />
            );
        if (value === false)
            return type === "visible" ? (
                <EyeOff className={`${base} text-red-500`} />
            ) : (
                <PackageX className={`${base} text-red-500`} />
            );
        return <HelpCircle className={`${base} text-muted-foreground`} />;
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-4"
        >
            <Select
                value={filters.category}
                onValueChange={(value) =>
                    setFilters((f) => ({ ...f, category: value }))
                }
            >
                <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Категория" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Все категории</SelectItem>
                    {Object.entries(categories).map(([key, label]) => (
                        <SelectItem key={key} value={key}>
                            {label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Button
                variant="outline"
                size="sm"
                className="h-9 text-sm"
                onClick={() =>
                    setFilters((prev) => ({
                        ...prev,
                        visible: cycleValue(prev.visible),
                    }))
                }
            >
                {renderStatusIcon(filters.visible, "visible")}
                {filters.visible === true
                    ? "Видимые"
                    : filters.visible === false
                        ? "Скрытые"
                        : "Все"}
            </Button>

            <Button
                variant="outline"
                size="sm"
                className="h-9 text-sm"
                onClick={() =>
                    setFilters((prev) => ({
                        ...prev,
                        inStock: cycleValue(prev.inStock),
                    }))
                }
            >
                {renderStatusIcon(filters.inStock, "inStock")}
                {filters.inStock === true
                    ? "В наличии"
                    : filters.inStock === false
                        ? "Нет в наличии"
                        : "Все"}
            </Button>

            <Select
                value={filters.sortBy}
                onValueChange={(value) =>
                    setFilters((f) => ({ ...f, sortBy: value }))
                }
            >
                <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="createdAt">По дате</SelectItem>
                    <SelectItem value="price">По цене</SelectItem>
                    <SelectItem value="name">По имени</SelectItem>
                </SelectContent>
            </Select>

            <Select
                value={filters.sortOrder}
                onValueChange={(value) =>
                    setFilters((f) => ({ ...f, sortOrder: value }))
                }
            >
                <SelectTrigger className="h-9 text-sm">
                    <SelectValue placeholder="Порядок" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="asc">↑ Возрастание</SelectItem>
                    <SelectItem value="desc">↓ Убывание</SelectItem>
                </SelectContent>
            </Select>
        </motion.div>
    );
}
