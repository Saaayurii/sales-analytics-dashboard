"use client";

import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload } from "lucide-react";
import { toast } from "sonner";
import { importCSVData } from "@/actions/import-data";

type FileState = {
  sales: File | null;
  managers: File | null;
  prices: File | null;
};

export const ImportButton = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [files, setFiles] = useState<FileState>({
    sales: null,
    managers: null,
    prices: null,
  });

  const salesInputRef = useRef<HTMLInputElement>(null);
  const managersInputRef = useRef<HTMLInputElement>(null);
  const pricesInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (type: keyof FileState) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files ? event.target.files[0] : null;
      setFiles((prev) => ({ ...prev, [type]: file }));
    };
  };

  const clearForm = () => {
    setFiles({
      sales: null,
      managers: null,
      prices: null,
    });

    salesInputRef.current ? (salesInputRef.current.value = "") : null;
    managersInputRef.current ? (managersInputRef.current.value = "") : null;
    pricesInputRef.current ? (pricesInputRef.current.value = "") : null;
  };

  const handleSubmit = () => {
    const allFilesSelected = files.sales && files.managers && files.prices;

    return !allFilesSelected
      ? (() => {
          toast.error("Пожалуйста, выберите все три CSV файла");
          return Promise.resolve();
        })()
      : (() => {
          setLoading(true);

          const formData = new FormData();
          files.sales ? formData.append("sales", files.sales) : null;
          files.managers ? formData.append("managers", files.managers) : null;
          files.prices ? formData.append("prices", files.prices) : null;

          return importCSVData(formData)
            .then((result) => {
              return result.success
                ? (() => {
                    toast.success(
                      `Успешно импортировано: ${result.imported_sales} продаж, ${result.imported_managers} менеджеров, ${result.imported_prices} цен`
                    );
                    clearForm();
                    setOpen(false);
                    window.location.reload();
                  })()
                : (() => {
                    const errorMessage =
                      result.errors && result.errors.length > 0
                        ? result.errors.join(", ")
                        : "Ошибка импорта";
                    toast.error(errorMessage);
                  })();
            })
            .catch((error) => {
              toast.error(error.message || "Произошла ошибка при импорте");
            })
            .finally(() => {
              setLoading(false);
            });
        })();
  };

  const allFilesSelected = files.sales && files.managers && files.prices;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="h-4 w-4" />
          Импорт CSV данных
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Импорт CSV данных</DialogTitle>
          <DialogDescription>
            Загрузите CSV файлы с продажами, менеджерами и ценами для импорта данных в систему.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sales-file">CSV продаж</Label>
            <Input
              id="sales-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange("sales")}
              ref={salesInputRef}
              disabled={loading}
            />
            {files.sales ? (
              <p className="text-xs text-muted-foreground">{files.sales.name}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="managers-file">CSV менеджеров</Label>
            <Input
              id="managers-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange("managers")}
              ref={managersInputRef}
              disabled={loading}
            />
            {files.managers ? (
              <p className="text-xs text-muted-foreground">{files.managers.name}</p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="prices-file">CSV цен</Label>
            <Input
              id="prices-file"
              type="file"
              accept=".csv"
              onChange={handleFileChange("prices")}
              ref={pricesInputRef}
              disabled={loading}
            />
            {files.prices ? (
              <p className="text-xs text-muted-foreground">{files.prices.name}</p>
            ) : null}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={loading}
          >
            Отмена
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!allFilesSelected || loading}
          >
            {loading ? "Импортируем..." : "Импорт"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
