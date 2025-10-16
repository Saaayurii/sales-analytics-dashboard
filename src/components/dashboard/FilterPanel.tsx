"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Filter } from "lucide-react";
import type { Manager, DashboardFilters } from "@/types";

type FilterPanelProps = {
  managers: Manager[];
  onFilterChange: (filters: DashboardFilters) => void;
};

const generateMonthOptions = (): { label: string; value: string }[] => {
  const months: { label: string; value: string }[] = [];
  const currentDate = new Date();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  Array.from({ length: 12 }).forEach((_, i) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const monthName = monthNames[date.getMonth()];

    months.push({
      label: `${monthName} ${year}`,
      value: `${year}-${month}`,
    });
  });

  return months;
};

export const FilterPanel = ({ managers, onFilterChange }: FilterPanelProps) => {
  const [selectedManager, setSelectedManager] = useState<string>("all");
  const [selectedPeriod, setSelectedPeriod] = useState<string>("all");

  const monthOptions = generateMonthOptions();

  const handleManagerChange = (value: string) => {
    setSelectedManager(value);

    const managerId = value === "all" ? null : parseInt(value, 10);
    const period = selectedPeriod === "all" ? null : selectedPeriod;

    onFilterChange({
      manager_id: managerId,
      period: period,
    });
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value);

    const managerId = selectedManager === "all" ? null : parseInt(selectedManager, 10);
    const period = value === "all" ? null : value;

    onFilterChange({
      manager_id: managerId,
      period: period,
    });
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Filters:</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Manager:</span>
            <Select value={selectedManager} onValueChange={handleManagerChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select manager" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Managers</SelectItem>
                {managers.map((manager) => (
                  <SelectItem key={`manager-${manager.id}`} value={String(manager.id)}>
                    {manager.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Period:</span>
            <Select value={selectedPeriod} onValueChange={handlePeriodChange}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                {monthOptions.map((option) => (
                  <SelectItem key={`period-${option.value}`} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
