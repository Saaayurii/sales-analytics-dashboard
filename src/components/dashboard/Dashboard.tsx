"use client";

import { useState, useTransition } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { FilterPanel } from "./FilterPanel";
import { KPICards } from "./KPICards";
import { SalesChart } from "@/components/charts/SalesChart";
import { CategoryChart } from "@/components/charts/CategoryChart";
import { ManagersChart } from "@/components/charts/ManagersChart";
import { DetailedTable } from "@/components/charts/DetailedTable";
import { getAnalyticsData } from "@/actions/get-analytics";
import type { AnalyticsData, Manager, DashboardFilters } from "@/types";

type DashboardProps = {
  initialData: AnalyticsData;
  managers: Manager[];
};

export const Dashboard = ({ initialData, managers }: DashboardProps) => {
  const [data, setData] = useState<AnalyticsData>(initialData);
  const [isPending, startTransition] = useTransition();

  const handleFilterChange = (filters: DashboardFilters) => {
    startTransition(() => {
      getAnalyticsData(filters)
        .then((newData) => {
          setData(newData);
        })
        .catch((error) => {
          console.error("Error fetching analytics data:", error);
        });
    });
  };

  return (
    <div className="space-y-6">
      <FilterPanel managers={managers} onFilterChange={handleFilterChange} />

      <div className={isPending ? "opacity-50 pointer-events-none" : ""}>
        <KPICards kpi={data.kpi} />
      </div>

      <div className={`grid grid-cols-1 gap-6 lg:grid-cols-2 ${isPending ? "opacity-50 pointer-events-none" : ""}`}>
        <Card>
          <CardHeader>
            <CardTitle>Динамика продаж по месяцам</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <SalesChart data={data.monthly_sales} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Продажи по категориям</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <CategoryChart data={data.category_sales} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Топ менеджеров по продажам</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px]">
            <ManagersChart data={data.top_managers} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Детализированные продажи</CardTitle>
          </CardHeader>
          <CardContent className="h-[400px] overflow-auto">
            <DetailedTable data={data.detailed_sales} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
