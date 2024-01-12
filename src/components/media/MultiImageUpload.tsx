"use client";

import {
  MultiImageDropzone,
  type FileState,
} from "@/components/media/MultiImageDropzone";
import { useEdgeStore } from "@/lib/edgestore";
import imageCompression from "browser-image-compression";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface setFilesProps {
  setFiles: Dispatch<SetStateAction<string[]>>;
  clearFileState?: Boolean;
}
export default function MultiImageUpload({
  setFiles,
  clearFileState,
}: setFilesProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);
  const { edgestore } = useEdgeStore();

  useEffect(() => {
    setFileStates([]);
  }, [clearFileState]);

  function updateFileProgress(key: string, progress: FileState["progress"]) {
    setFileStates((fileStates) => {
      const newFileStates = structuredClone(fileStates);
      const fileState = newFileStates.find(
        (fileState) => fileState.key === key
      );
      if (fileState) {
        fileState.progress = progress;
      }
      return newFileStates;
    });
  }

  const compressImage = async (file: any) => {
    console.log(typeof file);
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1080,
      useWebWorker: true,
      alwaysKeepResolution: true,
      initialQuality: 0.8,
    };

    try {
      const compressedFile = await imageCompression(file, options);

      return compressedFile;
    } catch (error) {
      console.error(error);
      window.location.reload();
      throw error;
    }
  };

  return (
    <div>
      <MultiImageDropzone
        value={fileStates}
        dropzoneOptions={{
          maxFiles: 4,
          maxSize: 1024 * 1024 * 10,
        }}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: await compressImage(addedFileState.file),
                  input: { type: "orders" },
                  options: {
                    temporary: true,
                  },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });
                console.log(res);
                setFiles((prevFiles) => [...prevFiles, res.url]);
              } catch (err) {
                updateFileProgress(addedFileState.key, "ERROR");
              }
            })
          );
        }}
      />
    </div>
  );
}
