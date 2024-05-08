import { z } from "zod";

export const InventoryItemSchema = z.object({
  id: z.string().uuid(),
  name: z.string(),
  userId: z.string().uuid(),
  description: z
    .string()
    .min(30, { message: "Description must be at least 30 characters" })
    .nullable(),
  price: z
    .number()
    .refine((price) => price > 0, { message: "Price must be greater than 0" }),
  quantity: z.number(),
  unit: z.string(),
  sellingPrice: z.number().refine((price) => price > 0, {
    message: "Selling Price must be greater than 0",
  }),
  image: z.string().url().nullable(),
  category: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  lastPurchasedAt: z.date().nullable(),
});

export const InvoiceSchema = z.object({
  id: z.string().uuid(),
  customerId: z.string().uuid(),
  paymentId: z.string().uuid(),
  cart: z.array(
    z.object({
      id: z.string().uuid(),
      name: z.string(),
      price: z.number().optional(),
      quantity: z.number().optional(),
      unit: z.string(),
      image: z.string().optional(),
    }),
  ),
  taxes: z.record(z.string(), z.number()),
  mrp: z.number(),
  createdAt: z.date(),
});

export const PaymentSchema = z.object({
  ID: z.string().uuid(),
  customerId: z.string().uuid(),
  invoiceId: z.string().uuid(),
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
  address: z.string().optional(),
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
