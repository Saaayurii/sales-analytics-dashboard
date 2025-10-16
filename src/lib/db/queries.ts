import { query } from './postgres';
import type {
  Sale,
  Manager,
  Price,
  KPIMetrics,
  MonthlySalesData,
  CategorySalesData,
  ManagerSalesData,
  DetailedSaleRow,
  DashboardFilters,
} from '@/types';

// Manager queries
export const createManager = (name: string, city: string): Promise<Manager[]> =>
  query<Manager>(
    'INSERT INTO managers (name, city) VALUES ($1, $2) ON CONFLICT (name) DO UPDATE SET city = $2 RETURNING *',
    [name, city]
  );

export const getManagerByName = (name: string): Promise<Manager[]> =>
  query<Manager>('SELECT * FROM managers WHERE name = $1', [name]);

export const getAllManagers = (): Promise<Manager[]> =>
  query<Manager>('SELECT * FROM managers ORDER BY name');

// Price queries
export const createPrice = (product: string, price: number): Promise<Price[]> =>
  query<Price>(
    'INSERT INTO prices (product, price) VALUES ($1, $2) ON CONFLICT (product) DO UPDATE SET price = $2 RETURNING *',
    [product, price]
  );

export const getAllPrices = (): Promise<Price[]> =>
  query<Price>('SELECT * FROM prices ORDER BY product');

// Sale queries
export const createSale = (saleData: {
  order_id: string;
  date: string;
  product: string;
  quantity: number;
  purchase_type: string;
  payment_method: string;
  manager_id: number;
  city: string;
}): Promise<Sale[]> =>
  query<Sale>(
    `INSERT INTO sales (order_id, date, product, quantity, purchase_type, payment_method, manager_id, city)
     VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      saleData.order_id,
      saleData.date,
      saleData.product,
      saleData.quantity,
      saleData.purchase_type,
      saleData.payment_method,
      saleData.manager_id,
      saleData.city,
    ]
  );

// Analytics queries
export const getKPIMetrics = (filters: DashboardFilters): Promise<KPIMetrics[]> => {
  const whereClauses: string[] = [];
  const params: (number | string)[] = [];
  let paramIndex = 1;

  filters.manager_id
    ? (() => {
        whereClauses.push(`s.manager_id = $${paramIndex}`);
        params.push(filters.manager_id);
        paramIndex++;
      })()
    : null;

  filters.period
    ? (() => {
        whereClauses.push(`TO_CHAR(s.date, 'YYYY-MM') = $${paramIndex}`);
        params.push(filters.period);
        paramIndex++;
      })()
    : null;

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  return query<KPIMetrics>(
    `SELECT 
      COALESCE(SUM(s.quantity * p.price), 0) as total_revenue,
      COALESCE(SUM(s.quantity), 0) as total_quantity,
      COALESCE(AVG(s.quantity * p.price), 0) as average_check,
      COUNT(DISTINCT s.manager_id) as active_managers
    FROM sales s
    JOIN prices p ON s.product = p.product
    ${whereClause}`,
    params
  );
};

export const getMonthlySales = (filters: DashboardFilters): Promise<MonthlySalesData[]> => {
  const whereClauses: string[] = [];
  const params: (number | string)[] = [];
  let paramIndex = 1;

  filters.manager_id
    ? (() => {
        whereClauses.push(`s.manager_id = $${paramIndex}`);
        params.push(filters.manager_id);
        paramIndex++;
      })()
    : null;

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  return query<MonthlySalesData>(
    `SELECT 
      TO_CHAR(s.date, 'YYYY-MM') as month,
      SUM(s.quantity * p.price) as revenue,
      SUM(s.quantity) as quantity
    FROM sales s
    JOIN prices p ON s.product = p.product
    ${whereClause}
    GROUP BY TO_CHAR(s.date, 'YYYY-MM')
    ORDER BY month`,
    params
  );
};

export const getCategorySales = (filters: DashboardFilters): Promise<CategorySalesData[]> => {
  const whereClauses: string[] = [];
  const params: (number | string)[] = [];
  let paramIndex = 1;

  filters.manager_id
    ? (() => {
        whereClauses.push(`s.manager_id = $${paramIndex}`);
        params.push(filters.manager_id);
        paramIndex++;
      })()
    : null;

  filters.period
    ? (() => {
        whereClauses.push(`TO_CHAR(s.date, 'YYYY-MM') = $${paramIndex}`);
        params.push(filters.period);
        paramIndex++;
      })()
    : null;

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  return query<CategorySalesData>(
    `SELECT 
      s.product,
      SUM(s.quantity * p.price) as revenue,
      ROUND(SUM(s.quantity * p.price) * 100.0 / NULLIF(SUM(SUM(s.quantity * p.price)) OVER (), 0), 2) as percentage
    FROM sales s
    JOIN prices p ON s.product = p.product
    ${whereClause}
    GROUP BY s.product
    ORDER BY revenue DESC`,
    params
  );
};

export const getTopManagers = (filters: DashboardFilters, limit = 3): Promise<ManagerSalesData[]> => {
  const whereClauses: string[] = [];
  const params: (number | string)[] = [];
  let paramIndex = 1;

  filters.period
    ? (() => {
        whereClauses.push(`TO_CHAR(s.date, 'YYYY-MM') = $${paramIndex}`);
        params.push(filters.period);
        paramIndex++;
      })()
    : null;

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  params.push(limit);

  return query<ManagerSalesData>(
    `SELECT 
      m.name as manager_name,
      SUM(s.quantity * p.price) as revenue,
      COUNT(DISTINCT s.order_id) as orders_count
    FROM sales s
    JOIN managers m ON s.manager_id = m.id
    JOIN prices p ON s.product = p.product
    ${whereClause}
    GROUP BY m.id, m.name
    ORDER BY revenue DESC
    LIMIT $${paramIndex}`,
    params
  );
};

export const getDetailedSales = (filters: DashboardFilters): Promise<DetailedSaleRow[]> => {
  const whereClauses: string[] = [];
  const params: (number | string)[] = [];
  let paramIndex = 1;

  filters.manager_id
    ? (() => {
        whereClauses.push(`s.manager_id = $${paramIndex}`);
        params.push(filters.manager_id);
        paramIndex++;
      })()
    : null;

  filters.period
    ? (() => {
        whereClauses.push(`TO_CHAR(s.date, 'YYYY-MM') = $${paramIndex}`);
        params.push(filters.period);
        paramIndex++;
      })()
    : null;

  const whereClause = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

  return query<DetailedSaleRow>(
    `SELECT 
      TO_CHAR(s.date, 'DD.MM.YYYY') as date,
      m.name as manager_name,
      s.product,
      s.quantity,
      (s.quantity * p.price) as total
    FROM sales s
    JOIN managers m ON s.manager_id = m.id
    JOIN prices p ON s.product = p.product
    ${whereClause}
    ORDER BY s.date DESC
    LIMIT 100`,
    params
  );
};
