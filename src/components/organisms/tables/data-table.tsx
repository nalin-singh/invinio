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
  Row,
} from "@tanstack/react-table";
import { DownloadIcon, FileJson, FileSpreadsheet } from "lucide-react";
import { Table, DropdownMenu, Button, Checkbox, Text } from "@radix-ui/themes";
import { DataTablePagination } from "./data-table-pagination";
import { exportTableData } from "./utils/export";

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
  /** The columns configuration of the data table, if not provided, it will be generated based on the data. */
  columns?: ColumnDef<TData, TValue>[];
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

const defaultColumnConfiguration = <TData,>(
  data: TData[],
): ColumnDef<TData>[] => {
  if (!data[0]) return [];

  const columns = Object.keys(data[0]);
  console.log(columns);
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    ...columns.map((column) => ({
      accessorKey: column,
      header: () => <Text>{column}</Text>,
      cell: ({ row }: { row: Row<TData> }) => <div>{row.getValue(column)}</div>,
      enableSorting: true,
    })),
  ];
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
    columns: columns?.length ? columns : defaultColumnConfiguration(data),
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
    [data, title],
  );

  const exportXLSXData = useCallback(
    () =>
      exportTableData<TData>({
        data,
        fileName: title ?? "Data Table",
        fileType: "XLSX",
      }),
    [data, title],
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
          {configuration?.export ? (
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="ml-auto hidden h-8 gap-2 lg:flex" size="2">
                  <DownloadIcon className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenu.Trigger>
              <DropdownMenu.Content>
                <DropdownMenu.Item>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1"
                    size="2"
                    onClick={exportCSVData}
                  >
                    <FileJson className="h-4 w-4" /> CSV
                  </Button>
                </DropdownMenu.Item>
                <DropdownMenu.Item>
                  <Button
                    variant="ghost"
                    className="w-full justify-start gap-2 px-2 py-1"
                    size="2"
                    onClick={exportXLSXData}
                  >
                    <FileSpreadsheet className="h-4 w-4" /> XLSX
                  </Button>
                </DropdownMenu.Item>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          ) : null}
        </div>
      </div>
      <div className="rounded-md border">
        <Table.Root>
          <Table.Header>
            {table.getHeaderGroups().map((headerGroup) => (
              <Table.Row key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <Table.ColumnHeaderCell key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </Table.ColumnHeaderCell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Header>
          <Table.Body>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <Table.Row
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Table.Cell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </Table.Cell>
                  ))}
                </Table.Row>
              ))
            ) : (
              <Table.Row>
                <Table.Cell className="h-24 text-center">
                  No results.
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Root>
      </div>
      {configuration?.pagination ? <DataTablePagination table={table} /> : null}
    </div>
  );
}
