// Sales data types

export type Sale = {
  id: number;
  order_id: string;
  date: Date;
  product: string;
  quantity: number;
  purchase_type: string | null;
  payment_method: string | null;
  manager_id: number | null;
  city: string | null;
  created_at: Date;
  updated_at: Date;
};

export type SaleWithPrice = Sale & {
  price: number;
  total: number;
};

export type SaleRow = {
  id: number;
  order_id: string;
  date: string;
  product: string;
  quantity: number;
  purchase_type: string | null;
  payment_method: string | null;
  manager_id: number | null;
  manager_name: string | null;
  city: string | null;
  price: number;
  total: number;
};

// CSV import types
export type RawSaleCSV = {
  'ID заказа': string;
  'Дата': string;
  'Продукт': string;
  'Количество': string;
  'Тип покупки': string;
  'Способ оплаты': string;
};

export type NormalizedSaleData = {
  order_id: string;
  date: string;
  product: string;
  quantity: number;
  purchase_type: string;
  payment_method: string;
};

