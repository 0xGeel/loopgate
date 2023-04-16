import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUserNftIds } from "../../utils/loopring";
import logger from "@/src/utils/logger";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { accountId } = query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!accountId || Array.isArray(accountId)) {
    const errorMsg =
      "Invalid Request: 0x address not provided. Please provide a valid 0x address and try again.";
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  // Call Loopring API to find- and extract all user NFT IDs
  const allNftIds = await getAllUserNftIds(accountId);

  if (!allNftIds) {
    const errorMsg = `Unable to find any NFTs for Loopring accountId '${accountId}'`;
    logger.error(errorMsg);
    return res.status(404).send(errorMsg);
  }

  return res.status(200).json(allNftIds);
};

export default handler;
