import { createNextPageApiHandler } from "uploadthing/server";
import fileRouter from "@/src/utils/uploadthing";

const handler = createNextPageApiHandler({
  router: fileRouter,
});

export default handler;
