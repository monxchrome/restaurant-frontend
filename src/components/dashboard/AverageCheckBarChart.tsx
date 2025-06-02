'use client';

import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

interface AverageCheck {
    averageCheck: number;
}

interface Props {
    data: AverageCheck;
}

export const AverageCheckBarChart = ({ data }: Props) => {
    const chartData = [
        {
            name: "Средний чек",
            value: data.averageCheck,
        },
    ];

    return (
        <ResponsiveContainer width="100%" height={150}>
            <BarChart
                layout="vertical"
                data={chartData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis type="category" dataKey="name" tick={{ fontSize: 12 }} />
                <Tooltip
                    formatter={(value: number, name: string) => [`${value} ₽`, "Чек"]}
                    contentStyle={{ fontSize: 12 }}
                />
                <Bar dataKey="value" fill="#f97316" />
            </BarChart>
        </ResponsiveContainer>
    );
};
