'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Props {
    totalOrders: number;
    totalRevenue: number;
    averageCheck: number;
}

export const SummaryCards = ({ totalOrders, totalRevenue, averageCheck }: Props) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Card>
                <CardHeader>
                    <CardTitle>Всего заказов</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{totalOrders}</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Общая выручка</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{totalRevenue}₽</CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <CardTitle>Средний чек</CardTitle>
                </CardHeader>
                <CardContent className="text-2xl font-bold">{averageCheck}₽</CardContent>
            </Card>
        </div>
    );
};
