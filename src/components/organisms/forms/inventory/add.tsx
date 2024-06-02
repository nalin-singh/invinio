"use client";

import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageIcon, PlusCircleIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
// import { toast } from "sonner";
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
import { Skeleton } from "~/components/atoms/skeleton";
import { Textarea } from "~/components/atoms/textarea";
import { units } from "~/lib/units";
import { InventoryItemSchema, type TInventoryItem } from "~/types";
// import { useUploadThing } from "~/utils/uploadthing";

const AddInventoryForm = () => {
  const { isSignedIn, user } = useUser();
  if (isSignedIn && !user?.id)
    throw new Error("You must be logged in to add an inventory item");

  const [files, uploadFiles] = useState<File[]>([]);
  const [previewURL, setPreviewURL] = useState<string>("");

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

  // const { startUpload } = useUploadThing("fileUploader", {
  //   onClientUploadComplete: () => {
  //     toast.success("Uploaded Successfully!");
  //   },
  //   onUploadError: () => {
  //     toast.error("Error Occurred while uploading");
  //   },
  // });

  const onFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (!event.target.files) return;
      const extractedFiles = Object.values(event.target.files);
      // @ts-expect-error Already Checked that File Exists
      const preview = URL.createObjectURL(extractedFiles[0]);
      setPreviewURL(preview);
      uploadFiles(extractedFiles);
    },
    [],
  );

  return (
    // skipcq: JS-0415
    <>
      <div>
        <div className="flex items-center gap-2">
          <PlusCircleIcon className="h-5 w-5" />
          <p className="text-lg font-bold">Inventory Item</p>
        </div>
        <p className="text-sm text-muted-foreground">
          Add an inventory item to the store.
        </p>
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="name"
              // skipcq: JS-0417
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. White Tile, Marble, etc"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    This will be used to display the product in the store.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className=" row-span-2 flex flex-col gap-2">
              <div className="relative grow">
                {files.length > 0 ? (
                  <Image
                    src={previewURL}
                    alt="Product Image"
                    fill
                    className="rounded-lg contain-layout"
                  />
                ) : (
                  <Skeleton className="flex grow animate-none">
                    <ImageIcon className="m-auto h-1/2 w-1/2 text-gray-300" />
                  </Skeleton>
                )}
              </div>
              <p className="text-sm font-semibold">Product Image</p>
              <Input type={"file"} onChange={onFileChange} accept="image/*" />
              <p className="text-[0.8rem] text-muted-foreground">
                Upload a product image
              </p>
            </div>
            <FormField
              control={form.control}
              name="category"
              // skipcq: JS-0417
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Category</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="eg. Clothing, Electronics, etc"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    The category of the product.
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
                  <FormDescription>
                    The unit of the measurement.
                  </FormDescription>
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
          </div>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default AddInventoryForm;
