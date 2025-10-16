// Central export for all types
export * from './sales';
export * from './manager';
export * from './analytics';

// Common types
export type ActionResult<T = unknown> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type ImportResult = {
  success: boolean;
  imported_sales: number;
  imported_managers: number;
  imported_prices: number;
  errors?: string[];
};
