"use client";

import { auth } from "@clerk/nextjs/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { Button } from "~/components/atoms/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/atoms/form";
import { Input } from "~/components/atoms/input";
import { InventoryItemSchema, type TInventoryItem } from "~/types";

const AddInventoryForm = () => {
  const user = auth();
  if (!user.userId) throw new Error("You must be logged in to add an item");

  const form = useForm<TInventoryItem>({
    resolver: zodResolver(InventoryItemSchema),
    defaultValues: {
      id: uuid(),
      name: "",
      description: "",
      userId: user?.userId,
      price: 0,
      quantity: 0,
      unit: "",
      image: "",
      category: "",
      sellingPrice: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  });

  const onSubmit = (values: TInventoryItem) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="name"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="eg. White Tile, Marble, etc" {...field} />
              </FormControl>
              <FormDescription>
                This will be used to display the product in the store.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                {/* @ts-expect-error Never Nullable */}
                <Input
                  type="text"
                  placeholder="Describe the product"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Helps customers understand what the product is.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="category"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Product Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="eg. Clothing, Electronics, etc"
                  {...field}
                />
              </FormControl>
              <FormDescription>The category of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type={"number"} {...field} />
              </FormControl>
              <FormDescription>
                Cost of the product when purchased.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="unit"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Unit</FormLabel>
              <FormControl>
                <Input placeholder="eg. KG, LB, LTR, etc" {...field} />
              </FormControl>
              <FormDescription>The unit of the measurement.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input type={"number"} {...field} />
              </FormControl>
              <FormDescription>Price of the product.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sellingPrice"
          // skipcq: JS-0417
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selling Price</FormLabel>
              <FormControl>
                <Input type={"number"} {...field} />
              </FormControl>
              <FormDescription>
                Cost of the product for the customer.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddInventoryForm;
