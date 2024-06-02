import { DemonstrationDataTable } from "~/components/organisms/tables";
import { inventoryColumnDef } from "~/components/organisms/tables/columnDefs/inventoryColumnDef";
import { DataTable } from "~/components/organisms/tables/data-table";
import { getInventory } from "~/server/queries/inventory";

const Inventory = async () => {
  const inventory = await getInventory();

  return (
    <div className={`flex w-full flex-col gap-4`}>
      <p className="text-2xl font-bold">Inventory</p>
      <section className="flex w-full flex-col gap-4">
        <DataTable
          title={"Item Catalog"}
          data={inventory}
          columns={inventoryColumnDef}
        />
      </section>
      <section className="flex w-full flex-col gap-4">
        <p className="text-xl font-bold"></p>
        <DemonstrationDataTable />
      </section>
    </div>
  );
};

export default Inventory;
