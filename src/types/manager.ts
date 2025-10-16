// Manager data types

export type Manager = {
  id: number;
  name: string;
  city: string | null;
  created_at: Date;
  updated_at: Date;
};

export type ManagerRow = {
  id: number;
  name: string;
  city: string | null;
};

// CSV import types
export type RawManagerCSV = {
  'ID заказа': string;
  'Менеджер': string;
  'Город': string;
};

export type NormalizedManagerData = {
  order_id: string;
  name: string;
  city: string;
};

export type ManagerPerformance = {
  manager_id: number;
  manager_name: string;
  total_sales: number;
  total_revenue: number;
  orders_count: number;
};
