import { inventory } from "~/server/db/schema";

export const GET = async () => {
  console.log(inventory);
  return "Hello World";
};
