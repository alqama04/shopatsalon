"use client";
import {
  MultiFileDropzone,
  type FileState,
} from "@/components/Multi-file-dropzone";
import { useEdgeStore } from "@/lib/edgestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

interface setFilesProps {
  setFiles: Dispatch<SetStateAction<string[]>>;
  clearFileState?:Boolean,
}
export default function UploadFile({ setFiles,clearFileState }: setFilesProps) {
  const [fileStates, setFileStates] = useState<FileState[]>([]);

  useEffect(()=>{
    setFileStates([])
  },[clearFileState])
  
  const { edgestore } = useEdgeStore();
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
  return (
    <div>
      <MultiFileDropzone
        value={fileStates}
        onChange={(files) => {
          setFileStates(files);
        }}
        onFilesAdded={async (addedFiles) => {
          setFileStates([...fileStates, ...addedFiles]);
          await Promise.all(
            addedFiles.map(async (addedFileState) => {
              try {
                const res = await edgestore.publicFiles.upload({
                  file: addedFileState.file,
                  options: {
                    temporary: true,
                    
                  },
                  input: { type: "purchases" },
                  onProgressChange: async (progress) => {
                    updateFileProgress(addedFileState.key, progress);
                    if (progress === 100) {
                      await new Promise((resolve) => setTimeout(resolve, 1000));
                      updateFileProgress(addedFileState.key, "COMPLETE");
                    }
                  },
                });

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
