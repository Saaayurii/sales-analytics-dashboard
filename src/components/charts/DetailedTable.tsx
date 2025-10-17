"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { DetailedSaleRow } from "@/types";

type DetailedTableProps = {
  data: DetailedSaleRow[];
};

const formatNumber = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("ru-RU", {
    style: "currency",
    currency: "RUB",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}.${month}.${year}`;
};

const truncateText = (text: string, maxLength: number): string => {
  return text.length > maxLength
    ? `${text.substring(0, maxLength)}...`
    : text;
};

export const DetailedTable = ({ data }: DetailedTableProps) => {
  const tableData = data.length > 0 ? data.slice(0, 100) : [];
  const hasData = tableData.length > 0;

  return (
    <div className="w-full">
      {!hasData ? (
        <div className="flex items-center justify-center h-40 text-muted-foreground">
          <p>Нет данных о продажах за выбранный период</p>
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px]">Дата</TableHead>
                <TableHead className="w-[180px]">Менеджер</TableHead>
                <TableHead className="min-w-[200px]">Товар</TableHead>
                <TableHead className="text-right w-[100px]">Количество</TableHead>
                <TableHead className="text-right w-[140px]">Сумма</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tableData.map((row, index) => (
                <TableRow key={`row-${index}`}>
                  <TableCell className="font-medium">
                    {formatDate(row.date)}
                  </TableCell>
                  <TableCell>
                    {truncateText(row.manager_name || "Неизвестно", 25)}
                  </TableCell>
                  <TableCell>
                    {truncateText(row.product, 40)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(row.quantity)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(row.total)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {data.length > 100 ? (
            <div className="px-4 py-3 text-sm text-muted-foreground border-t bg-muted/30">
              Показаны первые 100 из {formatNumber(data.length)} записей
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
};
