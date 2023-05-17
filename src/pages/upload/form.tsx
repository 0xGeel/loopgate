import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { cn } from "@/src/utils/generic";
import Spinner from "@/src/components/Spinner";

// Important: POST header: `Content-Type: multipart/form-data`.

interface FileUploadState {
  files: FileList | null;
}

export default function FileUploadForm() {
  const [file, setFile] = useState<FileUploadState>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    setFile({ files });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      if (file?.files) {
        const formData = new FormData();
        formData.append("file", file.files[0]);

        const { data } = await axios.post("/api/submarine", formData);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="m-8 inline-flex flex-col gap-4">
      <input type="file" onChange={handleFileChange} />
      <button
        type="submit"
        className={cn(
          "border rounded-sm border-white/10 py-3 duration-150",
          file ? "text-white bg-white/5" : "text-white/40 cursor-not-allowed"
        )}
      >
        Upload
      </button>
      {isLoading && <Spinner />}
    </form>
  );
}
