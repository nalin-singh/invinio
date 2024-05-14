"use client";

import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { v4 as uuid } from "uuid";
import { Button } from "~/components/atoms/button";
import FileUploader from "~/components/atoms/file-uploader";
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
  const { isSignedIn, user } = useUser();
  if (isSignedIn && !user?.id)
    throw new Error("You must be logged in to add an inventory item");

  const form = useForm<TInventoryItem>({
    resolver: zodResolver(InventoryItemSchema),
    defaultValues: {
      id: uuid(),
      name: "",
      description: "",
      userId: user?.id,
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
      <form
        className="grid grid-cols-2 gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
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
        <FormField
          control={form.control}
          name="description"
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
        <FileUploader />
        <Button className="col-span-2" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default AddInventoryForm;
