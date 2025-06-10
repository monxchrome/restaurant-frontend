'use client';

import React, {useEffect, useState} from "react";
import {SummaryCards} from "@/components/dashboard/SummaryCards";
import {statsService} from "@/lib/statsService";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {RevenueAreaChart} from "@/components/dashboard/RevenueAreaChart";
import {StatusRadialChart} from "@/components/dashboard/StatusRadialChart";
import {motion} from "framer-motion";
import {CountByDayLineChart} from "@/components/dashboard/CountByDayLineChart";
import {AverageCheckBarChart} from "@/components/dashboard/AverageCheckBarChart";
import {useRequireAuth} from "@/hooks/useRequireAuth";
import {ICountByDay, IOrderStatusCount, IRevenueByDay, ISummaryStats} from "@/types/dashboard.type";

export default function DashboardPage() {
    useRequireAuth(['ADMIN']);

    const [summary, setSummary] = useState<ISummaryStats | null>(null);
    const [statusStats, setStatusStats] = useState<IOrderStatusCount[]>([]);
    const [countByDay, setCountByDay] = useState<ICountByDay[]>([]);
    const [revenueByDay, setRevenueByDay] = useState<IRevenueByDay[]>([]);
    const [averageCheck, setAverageCheck] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchStats() {
            setLoading(true);
            try {
                const [summaryData, statusData, countData, revenueData, avgCheckData] = await Promise.all([
                    statsService.getSummary(),
                    statsService.getStatusStats(),
                    statsService.getCountByDay(),
                    statsService.getRevenueByDay(),
                    statsService.getAverageCheck(),
                ]);

                setSummary(summaryData);
                setStatusStats(statusData);
                setCountByDay(countData);
                setRevenueByDay(revenueData);
                setAverageCheck(avgCheckData.averageCheck);
            } catch (error) {
                console.error("Ошибка загрузки статистики", error);
            } finally {
                setLoading(false);
            }
        }
        fetchStats();
    }, []);

    if (loading) return <div className="text-center py-10">Загрузка...</div>;
    if (!summary) return <div className="text-center py-10">Нет данных</div>;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-[1200px] mx-auto p-4 space-y-6"
        >
            <SummaryCards
                totalOrders={summary.totalOrders}
                totalRevenue={summary.totalRevenue}
                averageCheck={summary.averageCheck}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="min-h-[300px]">
                    <CardHeader>
                        <CardTitle>Статусы заказов</CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center items-center">
                        <StatusRadialChart data={statusStats} />
                    </CardContent>
                </Card>

                <Card className="min-h-[300px]">
                    <CardHeader>
                        <CardTitle>Заказы по дням</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <CountByDayLineChart data={countByDay} />
                    </CardContent>
                </Card>

                <Card className="min-h-[300px] h-10">
                    <CardHeader>
                        <CardTitle>Средний чек (₽)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {averageCheck !== null ? <AverageCheckBarChart data={{ averageCheck: summary.averageCheck }} /> : <p>Нет данных</p>}
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Выручка по дням (₽)</CardTitle>
                </CardHeader>
                <CardContent>
                    <RevenueAreaChart data={revenueByDay} />
                </CardContent>
            </Card>
        </motion.div>
    );
}
