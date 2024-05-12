"use client";
import { DataTable } from "./data-table";
import inventoryColumnDef from "./columnDefs/inventoryColumnDef";
import { _data } from "./data";
// Here's a demonstration table for all the features accessible in the DataTable

export function DemonstrationDataTable() {
  return (
    <div>
      <DataTable
        title="Demonstration Catalog"
        description="This is a demonstration of all the features available in the DataTable component."
        data={_data}
        columns={inventoryColumnDef}
        config={{ viewOptions: true }}
      />
    </div>
  );
}
