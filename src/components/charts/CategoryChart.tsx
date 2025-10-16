"use client";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import type { CategorySalesData } from "@/types";

type CategoryChartProps = {
  data: CategorySalesData[];
};

const COLORS = [
  "#3b82f6", // blue-500
  "#10b981", // green-500
  "#f59e0b", // amber-500
  "#ef4444", // red-500
  "#8b5cf6", // violet-500
  "#ec4899", // pink-500
  "#06b6d4", // cyan-500
  "#f97316", // orange-500
  "#6366f1", // indigo-500
  "#14b8a6", // teal-500
];

const CustomTooltip = ({ active, payload }: any) => {
  return active && payload && payload.length ? (
    <div className="bg-background border border-border rounded-lg shadow-lg p-3">
      <p className="text-sm font-semibold mb-1">{payload[0].name}</p>
      <p className="text-sm text-muted-foreground">
        Revenue: {new Intl.NumberFormat("ru-RU", {
          style: "currency",
          currency: "RUB",
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        }).format(payload[0].value)}
      </p>
      <p className="text-sm font-medium" style={{ color: payload[0].payload.fill }}>
        {payload[0].payload.percentage.toFixed(1)}%
      </p>
    </div>
  ) : null;
};

const renderCustomLabel = (entry: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percentage } = entry;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return percentage > 5 ? (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      className="text-xs font-semibold"
    >
      {`${percentage.toFixed(1)}%`}
    </text>
  ) : null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-col gap-2 mt-4">
      {payload.map((entry: any, index: number) => (
        <div key={`legend-${index}`} className="flex items-center gap-2 text-sm">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="flex-1 truncate">{entry.value}</span>
          <span className="font-medium text-muted-foreground">
            {entry.payload.percentage.toFixed(1)}%
          </span>
        </div>
      ))}
    </div>
  );
};

export const CategoryChart = ({ data }: CategoryChartProps) => {
  const chartData = data.length > 0 ? data : [];

  return (
    <div className="w-full h-full">
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-full text-muted-foreground">
          <p>No category data available for the selected period</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomLabel}
              outerRadius={120}
              fill="#8884d8"
              dataKey="revenue"
              nameKey="product"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend content={<CustomLegend />} />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
