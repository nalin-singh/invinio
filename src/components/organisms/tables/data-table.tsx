"use client";

import { useCallback, useState } from "react";
import {
  type ColumnDef,
  type ColumnFiltersState,
  type RowSelectionState,
  type SortingState,
  type VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  CirclePlus,
  DownloadIcon,
  FileJson,
  FileSpreadsheet,
} from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../atoms/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableViewOptions } from "./data-table-view-options";
import { exportTableData } from "./utils/export";
import { Button } from "~/components/atoms/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "~/components/atoms/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "~/components/atoms/dialog";
import AddInventoryForm from "../forms/inventory/add";

/**
 * Represents the properties for a data table component.
 * @template TData - The type of data in the table.
 * @template TValue - The type of values in the table.
 */
interface DataTableProps<TData, TValue> {
  /** The title of the data table. */
  title?: string;
  /** Optional description of the data table. */
  description?: string;
  /** The columns configuration of the data table. */
  columns: ColumnDef<TData, TValue>[];
  /** The data to be displayed in the table. */
  data: TData[];
  /** Additional configuration options for the data table. */
  config?: {
    /** Whether to enable pagination, defaults to true. */
    pagination?: boolean;
    /** Whether to show view options, defaults to false. */
    viewOptions?: boolean;
    /** Whether to show export, defaults to false. */
    export?: boolean;
  };
}

const defaultConfiguration = {
  pagination: true,
  viewOptions: false,
  export: false,
};

export function DataTable<TData, TValue>({
  title,
  description,
  columns,
  data,
  config,
}: Readonly<DataTableProps<TData, TValue>>) {
  const configuration = { ...defaultConfiguration, ...config };

  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  const exportCSVData = useCallback(
    () =>
      exportTableData<TData>({
        data,
        fileName: title ?? "Data Table",
        fileType: "CSV",
      }),
    [data],
  );

  const exportXLSXData = useCallback(
    () =>
      exportTableData<TData>({
        data,
        fileName: title ?? "Data Table",
        fileType: "XLSX",
      }),
    [data],
  );

  return (
    // skipcq: JS-0415
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          {title ? <p className="text-xl font-bold">{title}</p> : null}
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml-auto hidden h-8 gap-2 lg:flex" size="sm">
                <CirclePlus className="h-4 w-4" />
                Add Item
              </Button>
            </DialogTrigger>
            <DialogContent className="w-full p-8">
              <AddInventoryForm />
            </DialogContent>
          </Dialog>
          {configuration?.viewOptions ? (
            <DataTableViewOptions table={table} />
          ) : null}
          {configuration?.export ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="ml-auto hidden h-8 gap-2 lg:flex" size="sm">
                  <DownloadIcon className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1"
                    size="sm"
                    onClick={exportCSVData}
                  >
                    <FileJson className="h-4 w-4" /> CSV
                  </Button>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1"
                    size="sm"
                    onClick={exportXLSXData}
                  >
                    <FileSpreadsheet className="h-4 w-4" /> XLSX
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : null}
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {configuration?.pagination ? <DataTablePagination table={table} /> : null}
    </div>
  );
}
