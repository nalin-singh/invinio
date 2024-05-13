"use client";

import React, { useState } from "react";
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
import { DownloadIcon } from "lucide-react";

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

/**
 * Represents the properties for a data table component.
 * @template TData - The type of data in the table.
 * @template TValue - The type of values in the table.
 */
interface DataTableProps<TData, TValue> {
  /** The title of the data table. */
  title: string;
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
}: DataTableProps<TData, TValue>) {
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

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-xl font-bold">{title}</p>
          {description ? (
            <p className="text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          {configuration?.viewOptions ? (
            <DataTableViewOptions table={table} />
          ) : null}
          {configuration?.export ? (
            <Button
              className="ml-auto hidden h-8 gap-2 lg:flex"
              size="sm"
              onClick={() =>
                exportTableData<TData>({
                  data,
                  fileName: "Demonstration Data",
                  fileType: "CSV",
                })
              }
            >
              <DownloadIcon className="h-4 w-4" />
              Export
            </Button>
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
