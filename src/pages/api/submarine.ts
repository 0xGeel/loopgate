import type { NextApiRequest, NextApiResponse } from "next";
import { withSessionRoute } from "@/src/utils/iron-session/withSession";
import { siwe } from "@/src/utils/siwe";
import logger from "@/src/utils/logger";
import axios from "axios";

const LOOPGATE_NODE_URL = {
  LOCAL: "http://localhost:1337",
  PROD: "https://loopgate.up.railway.app",
};

const error = {
  methodNotAllowed: "Method not allowed, please use a POST request.",
  unauthorized:
    "You are not authorized to access this resource. Sign In With Ethereum, and try again.",
  noBody:
    "Your request does not contain a file body. Please add one, and try again.",
  unableToUpload: "Unable to upload the file.",
  generic: "Internal Server Error",
};

type HttpErrorCode = 400 | 401 | 403 | 404 | 405 | 500;

const handleError = (
  res: NextApiResponse,
  httpErrorCode: HttpErrorCode,
  message: string
) => {
  logger.error(message);
  return res.status(httpErrorCode).end(message);
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    handleError(res, 405, error.methodNotAllowed);
  }

  const siweSesh = await siwe.getSession(req, res);

  if (!siweSesh.address) {
    handleError(res, 401, error.unauthorized);
  }

  try {
  } catch (err) {
    handleError(res, 500, error.generic);
  }

  // Call LoopGate Node Backend to handle FileUpload
  const result = await axios.post(
    `${LOOPGATE_NODE_URL.LOCAL}/api/pinata/submarine/upload`,
    req,
    {
      headers: {
        "Content-Type": req.headers["content-type"],
        "x-api-key": process.env.LOOPGATE_API_KEY,
      },
    }
  );

  if (!result) {
    handleError(res, 500, error.unableToUpload);
  }

  return res.status(200).json(result.data.items);
};

export default withSessionRoute(handler);

export const config = {
  api: {
    bodyParser: false,
  },
};
