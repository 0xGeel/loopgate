import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import Spinner from "@/src/components/Spinner";
import { PlusIcon } from "@heroicons/react/20/solid";
import { ArrowUpTrayIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { cn } from "@/src/utils/generic";
import { toast } from "react-hot-toast";
import JSZip from "jszip";
import { ArrowDownOnSquareIcon } from "@heroicons/react/24/outline";
import { NoSymbolIcon } from "@heroicons/react/24/solid";
import axios from "axios";

// 1. Upload file to Zupload bucket
// 2. Get bucket download link from Zupload
// 3. Pass bucket download link to Pinata Submarine API
// 4. onSuccess => delete file from Zupload bucket

const UploadContainer = ({
  children,
  className,
}: {
  children: React.ReactElement | React.ReactElement[];
  className?: string;
}) => (
  <div className={cn("flex items-center justify-center gap-2 h-24", className)}>
    {children}
  </div>
);

const processFiles = async (files: File[]) => {
  if (files.length === 1) {
    return files[0];
  } else {
    const zip = new JSZip();

    for (const file of files) {
      const fileData = await file.arrayBuffer();
      zip.file(file.name, fileData);
    }

    const timestamp = new Date().toISOString().slice(0, 10);
    const blob = await zip.generateAsync({ type: "blob" });
    const file = new File([blob], `loopgate-unlockable@${timestamp}.zip`, {
      type: "application/zip",
    });

    return file;
  }
};

const UploadPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState<string | undefined>();

  const onDrop = async (acceptedFiles: File[]) => {
    console.log("onDrop");
    setIsLoading(true);
    try {
      const file = acceptedFiles[0];
      const response = await axios.post("/api/submarine", file);
      if (response) {
        console.log("SUCCESS");
      }
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // const onDrop = useCallback(
  //   async (acceptedFiles: File[]) => {
  //     setIsLoading(true);
  //     setFileUrl(undefined);

  //     if (acceptedFiles.length === 0) {
  //       setIsLoading(false);
  //       toast.error("The file or files you tried to upload are not supported.");
  //       return;
  //     }

  //     const processedFile = await processFiles(acceptedFiles);

  //     await upload({ file: processedFile, key: processedFile.name });

  //     const { error: downloadError, url: downloadUrl } = await download(
  //       processedFile.name
  //     );

  //     if (!downloadUrl || downloadError) {
  //       setIsLoading(false);
  //       console.error(downloadError);
  //       toast.error("Unable to retrieve bucket download link");
  //       return;
  //     }

  //     if (downloadUrl) {
  //       setFileUrl(downloadUrl);
  //       setIsLoading(false);
  //       toast.success("Upload succeeded!");
  //     }
  //   },
  //   [download, upload]
  // );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject,
    acceptedFiles,
  } = useDropzone({
    onDrop,
    accept: {
      "image/png": [".jpg", ".jpeg", ".png"],
      "text/html": [".html", ".txt"],
    },
  });

  return (
    <div className="max-w-2xl mx-auto p-8">
      <div className="gap-2 flex flex-col">
        <h2 className="font-medium">Content</h2>
        <div className="rounded-md border border-white/20">
          {isLoading ? (
            <UploadContainer className="cursor-wait">
              <Spinner />
              <p className="text-sm text-white/70">Uploading your file(s)...</p>
              {/* <p className="text-sm text-white/70">
                Submarining your file(s)... (2/2)
              </p> */}
            </UploadContainer>
          ) : (
            <div {...getRootProps({ className: "dropzone" })}>
              <input {...getInputProps()} />
              <>
                {isDragAccept && (
                  <UploadContainer className="duration-150 bg-white/10 cursor-pointer">
                    <p className="font-medium text-sm">
                      Drop it like it&apos; hot
                    </p>
                    <ArrowUpTrayIcon className="w-5 h-5" />
                  </UploadContainer>
                )}
                {isDragReject && (
                  <UploadContainer className="duration-150 cursor-blocked">
                    <NoSymbolIcon className="w-5 h-5" />
                    <p className="font-medium text-sm">
                      File format not supported
                    </p>
                  </UploadContainer>
                )}
                {!isDragActive && (
                  <UploadContainer className="duration-150 hover:bg-white/10 cursor-pointer active:bg-white/0">
                    <PlusIcon className="w-5 h-5" />
                    <p className="font-medium text-sm">
                      Click or drag to upload a file
                    </p>
                  </UploadContainer>
                )}
              </>
            </div>
          )}
          {/* <div className="border-t p-2 border-white/20 flex gap-2 justify-between">
            <div className="flex gap-1 items-center">
              <CheckCircleIcon className="text-sky-500 w-4 h-4" />
              <p className="text-xs text-white/70">File(s) hosted on IPFS.</p>
            </div>
            <p className="text-xs text-white/70 w-40 truncate">
              bafybeiehgpaip4f7jafzf7imgannx3nnv3ubaiwp6ph56mlyzijpqxi45m
            </p>
          </div> */}
        </div>
      </div>
      <div>
        {fileUrl && (
          <a
            className="px-3 py-2 rounded-md bg-white/10 border border-white/10 mt-4 inline-flex items-center gap-2 text-sm"
            href={fileUrl}
          >
            <span>Public Bucket Download</span>
            <ArrowDownOnSquareIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
};

export default UploadPage;
