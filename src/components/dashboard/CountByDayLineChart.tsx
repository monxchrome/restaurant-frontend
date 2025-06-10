'use client';

import React from "react";
import {CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis,} from "recharts";
import {ICountByDay} from "@/types/dashboard.type";

interface Props {
    data: ICountByDay[];
}

export const CountByDayLineChart = ({ data }: Props) => {
    return (
        <ResponsiveContainer width="100%" height={250} minWidth={350}>
            <LineChart
                data={data}
                margin={{ top: 10, right: 30, left: -40, bottom: 0 }}
            >
                <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.2} />
                <XAxis
                    dataKey="day"
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#d1d5db" }}
                />
                <YAxis
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickLine={false}
                    axisLine={{ stroke: "#d1d5db" }}
                />
                <Tooltip
                    contentStyle={{ fontSize: 12, padding: "6px 8px" }}
                    labelStyle={{ fontSize: 12 }}
                    itemStyle={{ fontSize: 12 }}
                    formatter={(value: number, name: string) => [value, "Количество"]}
                />
                <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    activeDot={{ r: 6 }}
                />
            </LineChart>
        </ResponsiveContainer>
    );
};
