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
          toast.error("Please select all three CSV files");
          return Promise.resolve();
        })()
      : (() => {
          setLoading(true);

          const formData = new FormData();
          formData.append("sales", files.sales);
          formData.append("managers", files.managers);
          formData.append("prices", files.prices);

          return importCSVData(formData)
            .then((result) => {
              return result.success
                ? (() => {
                    toast.success(
                      `Successfully imported ${result.imported_sales} sales, ${result.imported_managers} managers, and ${result.imported_prices} prices`
                    );
                    clearForm();
                    setOpen(false);
                    window.location.reload();
                  })()
                : (() => {
                    const errorMessage =
                      result.errors && result.errors.length > 0
                        ? result.errors.join(", ")
                        : "Import failed";
                    toast.error(errorMessage);
                  })();
            })
            .catch((error) => {
              toast.error(error.message || "An error occurred during import");
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
          Import CSV Data
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Import CSV Data</DialogTitle>
          <DialogDescription>
            Upload sales, managers, and prices CSV files to import data into the system.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="sales-file">Sales CSV</Label>
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
            <Label htmlFor="managers-file">Managers CSV</Label>
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
            <Label htmlFor="prices-file">Prices CSV</Label>
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
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!allFilesSelected || loading}
          >
            {loading ? "Importing..." : "Import"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
