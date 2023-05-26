import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/src/middleware/ironSession/withSession";
import {
  checkAuthentication,
  handleError,
  LoopgateError,
} from "@/src/middleware";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

export interface UploadResponse {
  data: {
    uuid: string;
    cid: string;
  };
}

interface NodeUploadResponse {
  data: {
    status: 200;
    items: {
      id: string;
      createdAt: string;
      cid: string;
      name: string;
      originalname: string;
      metadata: {};
      type: "F";
      pinToIPFS: false;
      uri: string;
      isDuplicate: boolean;
    }[];
  };
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    return handleError(res, LoopgateError.methodNotAllowed);
  }

  const isAuthenticated = await checkAuthentication(req, res);
  if (!isAuthenticated) {
    return handleError(res, LoopgateError.unauthorized);
  }

  // Call LoopGate Node Backend to handle FileUpload
  const result: NodeUploadResponse | undefined = await axios.post(
    `${process.env.LOOPGATE_API_URL}/api/pinata/submarine/upload`,
    req,
    {
      headers: {
        "Content-Type": req.headers["content-type"],
        "x-api-key": process.env.LOOPGATE_API_KEY,
      },
    }
  );

  if (!result) {
    return handleError(res, LoopgateError.unableToUpload);
  }

  return res.status(200).json({
    uuid: uuidv4(),
    cid: result.data.items[0].cid,
  });
};

export default withSessionRoute(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
