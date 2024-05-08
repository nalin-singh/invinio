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
      createdAt: new Date(),
      updatedAt: new Date(),
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

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddInventoryForm;
