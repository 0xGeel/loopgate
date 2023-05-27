import { NextApiResponse } from "next";

import logger from "@/src/utils/logger";

import { Error } from "./loopgateError";

export const handleError = (res: NextApiResponse, error: Error) => {
  logger.error(error[1]);
  return res.status(error[0]).send({ message: error[1] });
};
