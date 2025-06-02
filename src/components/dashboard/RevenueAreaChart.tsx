"use client";

import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

interface RevenueChartProps {
    data: {
        day: string;
        revenue: number;
    }[];
}

export function RevenueAreaChart({ data }: RevenueChartProps) {
    return (
        <div className="rounded-xl border p-4 shadow-sm bg-white dark:bg-gray-950">
            <h3 className="text-base font-semibold mb-2">Выручка по дням</h3> {/* уменьшен размер */}
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={data} margin={{ top: 10, right: 20, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.6} />
                            <stop offset="95%" stopColor="#4f46e5" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                    <XAxis
                        dataKey="day"
                        tick={{ fontSize: 12, fill: "#6b7280" }} // меньше и серый текст
                        tickLine={false}
                        axisLine={{ stroke: "#d1d5db" }}
                    />
                    <YAxis
                        tickFormatter={(value) => `${value.toLocaleString("ru-RU")} ₽`}
                        tick={{ fontSize: 12, fill: "#6b7280" }}
                        tickLine={false}
                        axisLine={{ stroke: "#d1d5db" }}
                    />
                    <Tooltip
                        formatter={(value: number, name: string) => [`${value.toLocaleString("ru-RU")} ₽`, "Выручка"]}
                        labelFormatter={(label) => `Дата: ${label}`}
                        contentStyle={{ fontSize: 12, padding: "6px 8px" }}
                    />
                    <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#4f46e5"
                        fillOpacity={1}
                        fill="url(#colorRevenue)"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    );
}
