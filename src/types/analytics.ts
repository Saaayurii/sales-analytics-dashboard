// Analytics and dashboard types

export type KPIMetrics = {
  total_revenue: number;
  total_quantity: number;
  average_check: number;
  active_managers: number;
};

export type MonthlySalesData = {
  month: string;
  revenue: number;
  quantity: number;
};

export type CategorySalesData = {
  product: string;
  revenue: number;
  percentage: number;
};

export type ManagerSalesData = {
  manager_name: string;
  revenue: number;
  orders_count: number;
};

export type DetailedSaleRow = {
  date: string;
  manager_name: string;
  product: string;
  quantity: number;
  total: number;
};

export type DashboardFilters = {
  manager_id?: number | null;
  period?: string | null;
  category?: string | null;
};

export type AnalyticsData = {
  kpi: KPIMetrics;
  monthly_sales: MonthlySalesData[];
  category_sales: CategorySalesData[];
  top_managers: ManagerSalesData[];
  detailed_sales: DetailedSaleRow[];
};

// Price/Product types
export type Price = {
  id: number;
  product: string;
  price: number;
  created_at: Date;
  updated_at: Date;
};

export type RawPriceCSV = {
  'Продукт': string;
  'Цена': string;
};

export type NormalizedPriceData = {
  product: string;
  price: number;
};
