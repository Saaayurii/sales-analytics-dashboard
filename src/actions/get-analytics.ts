'use server';

import {
  getKPIMetrics,
  getMonthlySales,
  getCategorySales,
  getTopManagers,
  getDetailedSales,
} from '@/lib/db/queries';
import { getCachedAnalytics, cacheAnalytics } from '@/lib/redis/cache';
import type { DashboardFilters, AnalyticsData } from '@/types';

// Server Action требует async, но используем Promise-based подход внутри
export const getAnalyticsData = async (filters: DashboardFilters): Promise<AnalyticsData> => {
  return getCachedAnalytics(filters)
    .then((cached) =>
      cached
        ? Promise.resolve(cached)
        : Promise.all([
            getKPIMetrics(filters),
            getMonthlySales(filters),
            getCategorySales(filters),
            getTopManagers(filters),
            getDetailedSales(filters),
          ])
            .then(([kpiData, monthlyData, categoryData, managersData, detailedData]) => {
              const analytics: AnalyticsData = {
                kpi: kpiData[0] || {
                  total_revenue: 0,
                  total_quantity: 0,
                  average_check: 0,
                  active_managers: 0,
                },
                monthly_sales: monthlyData,
                category_sales: categoryData,
                top_managers: managersData,
                detailed_sales: detailedData,
              };

              return cacheAnalytics(filters, analytics).then(() => analytics);
            })
    )
    .catch((error) => {
      console.error('Get analytics error:', error);
      return {
        kpi: {
          total_revenue: 0,
          total_quantity: 0,
          average_check: 0,
          active_managers: 0,
        },
        monthly_sales: [],
        category_sales: [],
        top_managers: [],
        detailed_sales: [],
      };
    });
};
