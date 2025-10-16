import { z } from 'zod';

// Zod schemas for CSV validation
export const saleCSVSchema = z.object({
  'ID заказа': z.string().min(1),
  'Дата': z.string().min(1),
  'Продукт': z.string().min(1),
  'Количество': z.string().min(1),
  'Тип покупки': z.string(),
  'Способ оплаты': z.string(),
});

export const managerCSVSchema = z.object({
  'ID заказа': z.string().min(1),
  'Менеджер': z.string().min(1),
  'Город': z.string(),
});

export const priceCSVSchema = z.object({
  'Продукт': z.string().min(1),
  'Цена': z.string().min(1),
});

// Validate array of CSV rows
export const validateSalesCSV = (data: unknown[]): Promise<z.infer<typeof saleCSVSchema>[]> => {
  return Promise.all(
    data.map((row, index) =>
      saleCSVSchema
        .parseAsync(row)
        .catch((error) => {
          throw new Error(`Validation error at row ${index + 1}: ${error.message}`);
        })
    )
  );
};

export const validateManagersCSV = (data: unknown[]): Promise<z.infer<typeof managerCSVSchema>[]> => {
  return Promise.all(
    data.map((row, index) =>
      managerCSVSchema
        .parseAsync(row)
        .catch((error) => {
          throw new Error(`Validation error at row ${index + 1}: ${error.message}`);
        })
    )
  );
};

export const validatePricesCSV = (data: unknown[]): Promise<z.infer<typeof priceCSVSchema>[]> => {
  return Promise.all(
    data.map((row, index) =>
      priceCSVSchema
        .parseAsync(row)
        .catch((error) => {
          throw new Error(`Validation error at row ${index + 1}: ${error.message}`);
        })
    )
  );
};
