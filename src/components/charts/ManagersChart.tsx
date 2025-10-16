"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ManagerSalesData } from "@/types";

type ManagersChartProps = {
  data: ManagerSalesData[];
};

const formatRevenue = (value: number): string => {
  return value >= 1000000
    ? `${(value / 1000000).toFixed(1)}M`
    : value >= 1000
    ? `${(value / 1000).toFixed(0)}K`
    : `${value}`;
};

const CustomTooltip = ({ active, payload, label }: any) => {
  return active && payload && payload.length ? (
    <div className="bg-background border border-border rounded-lg shadow-lg p-3">
      <p className="text-sm font-semibold mb-2">{label}</p>
      <p className="text-sm" style={{ color: payload[0].color }}>
        Revenue: {new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(payload[0].value)}
      </p>
      <p className="text-sm text-muted-foreground">
        Orders: {payload[0].payload.orders_count}
      </p>
    </div>
  ) : null;
};

const CustomYAxisTick = ({ x, y, payload }: any) => {
  const maxLength = 20;
  const text = payload.value;
  const truncatedText = text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;

  return (
    <g transform={`translate(${x},${y})`}>
      <text
        x={0}
        y={0}
        dy={4}
        textAnchor="end"
        fill="currentColor"
        className="text-xs"
      >
        {truncatedText}
      </text>
    </g>
  );
};

export const ManagersChart = ({ data }: ManagersChartProps) => {
  const chartData = data.length > 0
    ? data.slice(0, 3).map((item) => ({
        ...item,
        name: item.manager_name,
      }))
    : [];

  const maxRevenue = chartData.reduce(
    (max, item) => (item.revenue > max ? item.revenue : max),
    0
  );

  const xAxisDomain = [
    0,
    maxRevenue > 0 ? Math.ceil(maxRevenue * 1.1) : 100000
  ];

  return (
    <div className="w-full h-full">
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No manager data available for the selected period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 100, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              type="number"
              className="text-xs"
              tick={{ fill: "currentColor" }}
              tickLine={{ stroke: "currentColor" }}
              tickFormatter={formatRevenue}
              domain={xAxisDomain}
            />
            <YAxis
              type="category"
              dataKey="name"
              className="text-xs"
              tick={<CustomYAxisTick />}
              tickLine={{ stroke: "currentColor" }}
              width={90}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="revenue"
              fill="#10b981"
              radius={[0, 4, 4, 0]}
              name="Revenue"
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
