// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  bigserial,
  integer,
  pgTableCreator,
  json,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `invinio_${name}`);

export const inventory = createTable("inventory", {
  id: uuid("id").primaryKey(),
  userId: uuid("userId").notNull(),
  name: varchar("name", { length: 256 }).notNull(),
  description: varchar("description", { length: 1024 }).default(sql`NULL`),
  price: integer("price").notNull(),
  quantity: integer("quantity").notNull(),
  unit: varchar("unit", { length: 256 }).notNull(),
  sellingPrice: integer("sellingPrice").notNull(),
  image: varchar("image", { length: 1024 }).default(sql`NULL`),
  category: varchar("category", { length: 256 }).notNull(),
  createdAt: varchar("createdAt", { length: 32 })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: varchar("createdAt", { length: 32 })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  lastPurchasedAt: varchar("lastPurchasedAt", { length: 32 }),
});

export const invoice = createTable("invoice", {
  id: bigserial("id", { mode: "number" }).primaryKey(),
  customerId: uuid("customerId").notNull(),
  mrp: integer("mrp").notNull(),
  tax: integer("tax").notNull(),
  paymentId: uuid("paymentId").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  cart: json("cart"),
});

export const customer = createTable("customer", {
  id: uuid("id").primaryKey(),
  name: varchar("name", { length: 256 }).notNull(),
  email: varchar("email", { length: 256 }).notNull(),
  phone: varchar("phone", { length: 64 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  address: varchar("address", { length: 256 }),
});
