import React, { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { cn } from "@/src/utils/generic";
import { GetServerSideProps } from "next";
import Spinner from "@/src/components/Spinner";
import { checkAuthentication, redirectTo } from "@/src/middleware";
import { UploadResponse } from "@/src/pages/api/upload/submarine";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface FileUploadState {
  files: FileList | null;
}

export const getServerSideProps: GetServerSideProps = async (context) =>
  (await checkAuthentication(context))
    ? { props: { isAuthenticated: true } }
    : redirectTo("/");

const FormPage = ({ isAuthenticated }: { isAuthenticated: true }) => {
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

        const submarineRes: UploadResponse | undefined = await axios.post(
          "/api/upload/submarine",
          formData
        );

        if (!submarineRes) {
          console.error("Unable to submarine your file in Pinata.");
          toast.error("Unable to submarine your file in Pinata.");
          return;
        }

        toast.success(
          "Successfully submarined your file! Now let's create an entry in the DB..."
        );

        const createUnlockableRes = await axios.post(
          "/api/upload/createUnlockable",
          {
            uuid: submarineRes.data.uuid,
            cid: submarineRes.data.cid,
          }
        );

        if (!createUnlockableRes) {
          console.error("Unable to add the Unlockable to the DB...");
          toast.error("Unable to add the Unlockable to the DB...");
          return;
        }

        toast.success("Yay! You've just created an Unlockable!");
        console.log(createUnlockableRes);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreateUnlockable = async () => {
    setIsLoading(true);
    const uuid = uuidv4();

    try {
      const createUnlockableRes = await axios.post(
        "/api/upload/createUnlockable",
        {
          uuid: uuid,
          cid: "Qme9fWgyjjUMsWfVotwjzYM3SyMzuPc99ScztnUV4vMrEd",
        }
      );

      if (!createUnlockableRes) {
        console.error("Unable to add the Unlockable to the DB...");
        toast.error("Unable to add the Unlockable to the DB...");
        return;
      }

      toast.success(`Yay! You've just created Unlockable '${uuid}'!`);
      console.log(createUnlockableRes);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="m-8 inline-flex flex-col gap-4">
        <input type="file" onChange={handleFileChange} />
        <button
          type="submit"
          className={cn(
            "border rounded-sm border-white/10 py-3 duration-150 flex items-center justify-center",
            file ? "text-white bg-white/5" : "text-white/40 cursor-not-allowed"
          )}
        >
          {isLoading ? <Spinner /> : "Upload"}
        </button>
      </form>

      <button onClick={onCreateUnlockable}>
        {isLoading ? <Spinner /> : "Test: Create Unlockable"}
      </button>
    </>
  );
};

export default FormPage;
