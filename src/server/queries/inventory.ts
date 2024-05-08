import "server-only";
import { db } from "../db";
import { auth } from "@clerk/nextjs/server";

export const getInventory = async () => {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized User Access");

  const inventory = await db.query.inventory.findMany({
    // where: (item, { eq }) => eq(item.userId, user.userId),
    orderBy: (item, { desc }) => desc(item.updatedAt),
  });

  return inventory;
};
