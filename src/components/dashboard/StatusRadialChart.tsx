'use client';

import React from "react";
import {Legend, RadialBar, RadialBarChart, ResponsiveContainer, Tooltip,} from "recharts";
import {IOrderStatusCount} from "@/types/dashboard.type";

interface Props {
    data?: IOrderStatusCount[];
}

interface TooltipProps {
    payload: {
        name: string;
        value: number;
        fill: string;
    };
}

const COLORS = ["#3b82f6", "#10b981", "#f97316", "#ef4444", "#8b5cf6"];

const translateStatus = (status: string) => {
    switch (status) {
        case "PENDING":
            return "Ожидает";
        case "PREPARING":
            return "Готовится";
        case "DELIVERED":
            return "Доставлен";
        case "CANCELLED":
            return "Отменён";
        default:
            return status;
    }
};

export const StatusRadialChart = ({ data }: Props) => {
    const chartData = data?.map((item, index) => ({
        name: translateStatus(item.status),
        value: item._count.id,
        fill: COLORS[index % COLORS.length],
    }));

    return (
        <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
                cx="50%"
                cy="40%"
                innerRadius="20%"
                outerRadius="90%"
                barSize={15}
                data={chartData}
                startAngle={90}
                endAngle={-270}
            >
                <RadialBar
                    background
                    dataKey="value"
                    cornerRadius={5}
                />
                <Legend
                    content={({ payload }) => (
                        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", fontSize: 14 }}>
                            {payload?.map((entry, index) => (
                                <div
                                    key={`item-${index}`}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        marginRight: 12,
                                        marginBottom: 4,
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 12,
                                            height: 12,
                                            backgroundColor: entry.color,
                                            borderRadius: "50%",
                                            marginRight: 6,
                                        }}
                                    />
                                    <span>{entry.value}</span>
                                </div>
                            ))}
                        </div>
                    )}
                />
                <Tooltip
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-expect-error
                    formatter={(value: number, name: string, props: TooltipProps) => [`${value}`, props.payload.name]}
                    labelFormatter={() => ""}
                />
            </RadialBarChart>
        </ResponsiveContainer>
    );
};
