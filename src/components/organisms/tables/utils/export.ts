// skipcq: JS-C1003
import * as XLSX from "xlsx";

// TData is an array of objects, use of Generic type is required
type TExportTableDataProps<TData> = {
  data: TData[];
  fileName: string;
  fileType: "CSV" | "XLSX";
};

// Export Data in CSV format using the built-in Blob API
const exportToCSV = <TData>({
  data,
  fileName,
}: Omit<TExportTableDataProps<TData>, "fileType">) => {
  if (!data[0]) {
    throw new Error("Export to CSV : Data Object is at index 0 is empty.");
  }

  const csvHeaders = `${Object.keys(data[0]).join(",")}\n`;
  const csvData = data.map((row: TData, index: number) => {
    if (!row) {
      throw new Error(
        `Export to CSV : Data Object at index ${index} is empty.`,
      );
    }
    return `${Object.values(row)
      .map((value) => {
        if (typeof value === "string") {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      })
      .join(",")}\n`;
  });
  const csvContent = csvHeaders + csvData.join("");

  const blob = new Blob([csvContent], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  // Wait for download to initiate then remove the link after 200 milliseconds
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
};

// Export Data in XLSX format using the XLSX library from the vendor https://docs.sheetjs.com/docs/getting-started/installation/frameworks#vendoring
const exportToXLSX = <TData>({
  data,
  fileName,
}: Omit<TExportTableDataProps<TData>, "fileType">) => {
  if (!data[0]) {
    throw new Error("Export to XLSX: Data Object is at index 0 is empty.");
  }
  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
  const buf = XLSX.write(workbook, { type: "buffer", bookType: "xlsx" });
  // Download Buf
  const blob = new Blob([buf], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();

  // Wait for download to initiate then remove the link after 200 milliseconds
  setTimeout(() => {
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, 200);
};

export const exportTableData = <TData>({
  data,
  fileName,
  fileType,
}: TExportTableDataProps<TData>) => {
  if (fileType === "CSV") {
    exportToCSV({ data, fileName });
  }
  if (fileType === "XLSX") {
    exportToXLSX({ data, fileName });
  }
};
