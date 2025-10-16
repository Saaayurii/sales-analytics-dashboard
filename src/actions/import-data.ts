'use server';

import { parseCSV } from '@/lib/csv/parser';
import { validateSalesCSV, validateManagersCSV, validatePricesCSV } from '@/lib/csv/validator';
import { normalizeSalesData, normalizeManagersData, normalizePricesData } from '@/lib/csv/normalizer';
import { createManager, createPrice, createSale, getManagerByName } from '@/lib/db/queries';
import { invalidateAnalyticsCache } from '@/lib/redis/cache';
import { transaction } from '@/lib/db/postgres';
import type { ImportResult } from '@/types';

export const importCSVData = (formData: FormData): Promise<ImportResult> => {
  const salesFile = formData.get('sales') as File | null;
  const managersFile = formData.get('managers') as File | null;
  const pricesFile = formData.get('prices') as File | null;

  return (!salesFile || !managersFile || !pricesFile)
    ? Promise.resolve({
        success: false,
        imported_sales: 0,
        imported_managers: 0,
        imported_prices: 0,
        errors: ['All three CSV files are required'],
      })
    : Promise.all([
        parseCSV(salesFile),
        parseCSV(managersFile),
        parseCSV(pricesFile),
      ])
        .then(([salesData, managersData, pricesData]) =>
          Promise.all([
            validateSalesCSV(salesData),
            validateManagersCSV(managersData),
            validatePricesCSV(pricesData),
          ])
        )
        .then(([validatedSales, validatedManagers, validatedPrices]) =>
          Promise.all([
            normalizeSalesData(validatedSales),
            normalizeManagersData(validatedManagers),
            normalizePricesData(validatedPrices),
          ])
        )
        .then(([normalizedSales, normalizedManagers, normalizedPrices]) => {
          const managerMap = new Map<string, number>();
          
          return transaction((pool) =>
            Promise.all(normalizedPrices.map((price) => createPrice(price.product, price.price)))
              .then(() =>
                Promise.all(
                  normalizedManagers.map((manager) =>
                    createManager(manager.name, manager.city).then((result) => {
                      managerMap.set(manager.order_id, result[0].id);
                      return result;
                    })
                  )
                )
              )
              .then(() =>
                Promise.all(
                  normalizedSales.map((sale) => {
                    const managerId = managerMap.get(sale.order_id);
                    return managerId
                      ? createSale({
                          order_id: sale.order_id,
                          date: sale.date,
                          product: sale.product,
                          quantity: sale.quantity,
                          purchase_type: sale.purchase_type,
                          payment_method: sale.payment_method,
                          manager_id: managerId,
                          city: normalizedManagers.find((m) => m.order_id === sale.order_id)?.city || '',
                        })
                      : Promise.resolve([]);
                  })
                )
              )
              .then(() => ({
                sales: normalizedSales.length,
                managers: normalizedManagers.length,
                prices: normalizedPrices.length,
              }))
          );
        })
        .then((counts) =>
          invalidateAnalyticsCache().then(() => ({
            success: true,
            imported_sales: counts.sales,
            imported_managers: counts.managers,
            imported_prices: counts.prices,
          }))
        )
        .catch((error) => ({
          success: false,
          imported_sales: 0,
          imported_managers: 0,
          imported_prices: 0,
          errors: [error.message || 'Import failed'],
        }));
};
