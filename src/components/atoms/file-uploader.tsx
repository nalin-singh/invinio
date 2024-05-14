import { useDropzone } from "@uploadthing/react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { useUploadThing } from "~/utils/uploadthing";
import { Button } from "./button";
import { Input } from "./input";

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
    <div {...getRootProps()}>
      <Input {...getInputProps()} />
      <div>
        {files.length > 0 && (
          <Button onClick={uploadFile}>Upload {files.length} files</Button>
        )}
      </div>
      Drop files here!
    </div>
  );
};

export default FileUploader;
