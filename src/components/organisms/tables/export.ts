type TExportTableDataProps<TData> = {
  data: TData[];
  fileName: string;
  fileType: "CSV" | "XLSX";
};

export const exportTableData = <TData>({
  data,
  fileName,
  fileType,
}: TExportTableDataProps<TData>) => {
  const blob = new Blob([JSON.stringify(data)], {
    type: `application/${fileType}`,
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement(`a`);
  link.href = url;
  link.download = fileName;
  link.click();
  URL.revokeObjectURL(url);

  // Wait for download to initiate then remove the link after 200 milliseconds
  setTimeout(() => {
    URL.revokeObjectURL(url);
    link.remove();
  }, 200);
};
