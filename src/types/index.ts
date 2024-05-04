import { z } from "zod";

export const InventoryItemSchema = z.object({
  ID: z.string().uuid(),
  name: z.string(),
  description: z.string().optional(),
  price: z.number().optional(),
  quantity: z.number().optional(),
  unit: z.number().or(z.string()).optional(),
  image: z.string().url(),
  category: z.string().optional(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
  lastPurchasedAt: z.date().optional(),
});

export const InvoiceSchema = z.object({
  ID: z.string().uuid(),
  userID: z.string().uuid(),
  paymentID: z.string().uuid(),
  cart: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      price: z.number().optional(),
      quantity: z.number().optional(),
      unit: z.number().or(z.string()).optional(),
      image: z.string().optional(),
    }),
  ),
  taxes: z.record(z.string(), z.number()),
  mrp: z.number(),
  createdAt: z.date(),
});

export const PaymentSchema = z.object({
  ID: z.string().uuid(),
  userID: z.string().uuid(),
  invoiceID: z.string().uuid(),
  amount: z.number(),
  createdAt: z.date(),
  method: z.enum(["Cedit Card", "Cash", "UPI", "Bank Transfer"]),
  transaction: z.record(z.string(), z.string()),
});

export const CustomerSchema = z.object({
  ID: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  createdAt: z.date(),
});

export const VendorSchema = z.object({
  ID: z.string().uuid(),
  contractLink: z.string().url(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  gstNo: z.string().optional(),
  address: z.string(),
  createdAt: z.date(),
});

export type TInventoryItem = z.infer<typeof InventoryItemSchema>;
export type TInvoice = z.infer<typeof InvoiceSchema>;
export type TPayment = z.infer<typeof PaymentSchema>;
export type TCustomer = z.infer<typeof CustomerSchema>;
export type TVendor = z.infer<typeof VendorSchema>;
