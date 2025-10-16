
import Papa from 'papaparse';

// Parse CSV file with Promise-based approach
export const parseCSV = <T>(file: File): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      encoding: 'UTF-8',
      complete: (results) => {
        results.errors.length > 0
          ? reject(new Error(`CSV Parse Error: ${results.errors[0].message}`))
          : resolve(results.data as T[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};

// Parse CSV from string
export const parseCSVString = <T>(csvString: string): Promise<T[]> => {
  return new Promise((resolve, reject) => {
    Papa.parse(csvString, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        results.errors.length > 0
          ? reject(new Error(`CSV Parse Error: ${results.errors[0].message}`))
          : resolve(results.data as T[]);
      },
      error: (error) => {
        reject(error);
      },
    });
  });
};
