import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "../app/api/uploadthing";

export const { useUploadThing, uploadFiles } =
  generateReactHelpers<OurFileRouter>();
