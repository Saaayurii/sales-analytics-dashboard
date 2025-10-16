import { normalizeDate, cleanNumber, normalizeManagerName } from '../utils/format';
import type {
  RawSaleCSV,
  RawManagerCSV,
  RawPriceCSV,
  NormalizedSaleData,
  NormalizedManagerData,
  NormalizedPriceData,
} from '@/types';

export const normalizeSalesData = (
  rawData: RawSaleCSV[]
): Promise<NormalizedSaleData[]> => {
  return Promise.resolve(
    rawData.map((row) => ({
      order_id: row['ID заказа'].trim(),
      date: normalizeDate(row['Дата']),
      product: row['Продукт'].trim(),
      quantity: Math.floor(cleanNumber(row['Количество'])),
      purchase_type: row['Тип покупки']?.trim() || '',
      payment_method: row['Способ оплаты']?.trim() || '',
    }))
  );
};

export const normalizeManagersData = (
  rawData: RawManagerCSV[]
): Promise<NormalizedManagerData[]> => {
  return Promise.resolve(
    rawData.map((row) => ({
      order_id: row['ID заказа'].trim(),
      name: normalizeManagerName(row['Менеджер']),
      city: row['Город']?.trim() || '',
    }))
  );
};

export const normalizePricesData = (
  rawData: RawPriceCSV[]
): Promise<NormalizedPriceData[]> => {
  return Promise.resolve(
    rawData.map((row) => ({
      product: row['Продукт'].trim(),
      price: cleanNumber(row['Цена']),
    }))
  );
};
