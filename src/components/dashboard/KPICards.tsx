"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DollarSign, Package, Receipt, Users } from "lucide-react";
import type { KPIMetrics } from "@/types";

type KPICardsProps = {
  kpi: KPIMetrics;
};

type KPICardData = {
  title: string;
  value: string;
  icon: React.ReactNode;
  color: string;
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const KPICards = ({ kpi }: KPICardsProps) => {
  const cards: KPICardData[] = [
    {
      title: "Total Revenue",
      value: formatCurrency(kpi.total_revenue),
      icon: <DollarSign className="h-5 w-5" />,
      color: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Total Quantity",
      value: formatNumber(kpi.total_quantity),
      icon: <Package className="h-5 w-5" />,
      color: "text-green-600 dark:text-green-400",
    },
    {
      title: "Average Check",
      value: formatCurrency(kpi.average_check),
      icon: <Receipt className="h-5 w-5" />,
      color: "text-amber-600 dark:text-amber-400",
    },
    {
      title: "Active Managers",
      value: formatNumber(kpi.active_managers),
      icon: <Users className="h-5 w-5" />,
      color: "text-violet-600 dark:text-violet-400",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => (
        <Card key={`kpi-card-${index}`} className="overflow-hidden">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {card.title}
            </CardTitle>
            <div className={card.color}>{card.icon}</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{card.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
