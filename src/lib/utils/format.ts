import { parse, format } from 'date-fns';

// Format utilities for data normalization

export const normalizeDate = (dateStr: string): string => {
  const cleanDate = dateStr.trim();
  const parsedDate = cleanDate.includes('-')
    ? parse(cleanDate, 'dd-MM-yyyy', new Date())
    : cleanDate.includes('.')
    ? parse(cleanDate, 'dd.MM.yyyy', new Date())
    : parse(cleanDate, 'dd/MM/yyyy', new Date());
  return format(parsedDate, 'dd.MM.yyyy');
};

export const cleanNumber = (numStr: string): number => {
  const cleaned = numStr.trim().replace(/[^\d.,]/g, '').replace(',', '.');
  const num = parseFloat(cleaned);
  return isNaN(num) ? 0 : num;
};

export const normalizeManagerName = (name: string): string => {
  const trimmed = name.trim();
  const parts = trimmed.split(/\s+/);
  return parts.length >= 2
    ? parts[0] + ' ' + parts[1].charAt(0).toUpperCase() + '.'
    : trimmed;
};
