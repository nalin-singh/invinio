"use client";

import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "~/utils/uploadthing";
import { Button } from "./button";
import { Input } from "./input";
import { Upload } from "lucide-react";

// Uses UploadThing API to Upload Files and returns a promise and the stored url
const FileUploader = () => {
  const [files, setFiles] = useState<File[]>([]);
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  }, []);

  const { startUpload, permittedFileInfo } = useUploadThing("fileUploader", {
    onClientUploadComplete: () => {
      toast.success("Uploaded Successfully!");
    },
    onUploadError: () => {
      toast.error("Error Occurred while uploading");
    },
  });

  const fileTypes = permittedFileInfo?.config
    ? Object.keys(permittedFileInfo?.config)
    : [];

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: fileTypes ? generateClientDropzoneAccept(fileTypes) : undefined,
  });

  const uploadFile = useCallback(() => {
    return startUpload(files);
  }, [files, startUpload]);

  return (
    <div
      className="flex cursor-pointer flex-col  rounded-md border-2 border-dotted"
      {...getRootProps()}
    >
      <Input {...getInputProps()} />
      {files.length > 0 && (
        <Button className="m-auto" onClick={uploadFile}>
          Upload {files.length} files
        </Button>
      )}
      {files.length === 0 && (
        <div className="m-auto flex items-center gap-1">
          <Upload className="h-4 w-4" />
          <p className=" w-32 px-2 py-1 text-center text-xs text-muted-foreground">
            Drop files here or <br />
            Click to Upload
          </p>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
