import { generateReactHelpers } from "@uploadthing/react";
import type { OurFileRouter } from "@/src/utils/uploadthing/uploadthing";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useRef } from "react";

const { useUploadThing } = generateReactHelpers<OurFileRouter>();

const MultiUploader = () => {
  const { getRootProps, getInputProps, isDragActive, files, startUpload } =
    useUploadThing("imageUploader");

  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div id="layout" className="max-w-4xl mx-auto">
      <div className="flex flex-col gap-4">
        <h2 className="font-bold">Content</h2>

        <div className="flex flex-col border overflow-hidden items-center justify-center border-white/20 divide-y divide-white/20 rounded-md">
          <div className="w-full" {...getRootProps()}>
            <input {...getInputProps({})} ref={inputRef} />

            <button
              className="flex gap-2 items-center hover:bg-white/10 duration-150 cursor-pointer px-4 py-3 group w-full justify-center"
              onClick={handleClick}
            >
              {files.length === 0 ? (
                <>
                  <PlusIcon className="w-6 h-6" />
                  <span className="font-medium">Upload a file or a folder</span>
                </>
              ) : (
                <button onClick={() => startUpload()}>
                  Upload {files.length} files
                </button>
              )}
            </button>
          </div>
        </div>
        {files.length === 0 ? (
          <></>
        ) : (
          <button onClick={() => startUpload()}>
            Upload {files.length} files
          </button>
        )}
      </div>
    </div>
  );
};

export default MultiUploader;
