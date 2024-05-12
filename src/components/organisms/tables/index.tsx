"use client";
import { DataTable } from "./data-table";
import inventoryColumnDef from "./columnDefs/inventoryColumnDef";
import { _data } from "./data";
// Here's a demonstration table for all the features accessible in the DataTable

export function DemonstrationDataTable() {
  return (
    <div>
      <DataTable data={_data} columns={inventoryColumnDef} />
    </div>
  );
}
