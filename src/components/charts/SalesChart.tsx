"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { MonthlySalesData } from "@/types";

type SalesChartProps = {
  data: MonthlySalesData[];
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
      {payload.map((entry: any, index: number) => (
        <p key={`item-${index}`} className="text-sm" style={{ color: entry.color }}>
          {entry.name}: {new Intl.NumberFormat("ru-RU", {
            style: "currency",
            currency: "RUB",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(entry.value)}
        </p>
      ))}
    </div>
  ) : null;
};

export const SalesChart = ({ data }: SalesChartProps) => {
  const chartData = data.length > 0 ? data : [];

  const maxRevenue = chartData.reduce(
    (max, item) => (item.revenue > max ? item.revenue : max),
    0
  );

  const yAxisDomain = [
    0,
    maxRevenue > 0 ? Math.ceil(maxRevenue * 1.1) : 100000
  ];

  return (
    <div className="w-full h-full">
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No sales data available for the selected period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="month"
              className="text-xs"
              tick={{ fill: "currentColor" }}
              tickLine={{ stroke: "currentColor" }}
            />
            <YAxis
              className="text-xs"
              tick={{ fill: "currentColor" }}
              tickLine={{ stroke: "currentColor" }}
              tickFormatter={formatRevenue}
              domain={yAxisDomain}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              iconType="line"
            />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              name="Revenue"
              dot={{ fill: "#3b82f6", r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
