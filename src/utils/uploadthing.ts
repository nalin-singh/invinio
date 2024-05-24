import { generateReactHelpers } from "@uploadthing/react";
import { OurFileRouter } from "../app/api/uploadthing";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
