"use client";

import { useUser } from "@clerk/nextjs";
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
import {
  SelectContent,
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "~/components/atoms/select";
import { Separator } from "~/components/atoms/separator";
import { Textarea } from "~/components/atoms/textarea";
import { units } from "~/lib/units";
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
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="grid grid-cols-2 gap-4">
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
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Category</FormLabel>
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
            name="description"
            render={({ field }) => (
              <FormItem className="col-span-2">
                <FormLabel>Product Description</FormLabel>
                <FormControl>
                  {/* @ts-expect-error Never Nullable */}
                  <Textarea placeholder="Describe the product" {...field} />
                </FormControl>
                <FormDescription>
                  Helps customers understand what the product is.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Separator />
        <div className="grid grid-cols-2 gap-4">
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
              // skipcq: JS-0415
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="eg. KG, LB, LTR, Items etc" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectGroup key={unit.category}>
                        <SelectLabel>{unit.category}</SelectLabel>
                        {unit.units.map((unit) => (
                          <SelectItem
                            key={unit}
                            value={unit}
                            className="cursor-pointer"
                          >
                            {unit}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    ))}
                  </SelectContent>
                </Select>
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
        </div>
        {/*
          <FileUploader />
          // TODO: Uncomment when we have a file uploader
        */}
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddInventoryForm;
