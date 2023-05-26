import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUserNftIds } from "../../../utils/loopring";
import { handleError, LoopgateError } from "@/src/middleware";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { accountId } = req.query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!accountId || Array.isArray(accountId)) {
    return handleError(res, LoopgateError.noAddressProvided);
  }

  // Call Loopring API to find- and extract all user NFT IDs
  const allNftIds = await getAllUserNftIds(accountId);

  if (!allNftIds) {
    return handleError(res, LoopgateError.noNftsFound);
  }

  return res.status(200).json(allNftIds);
};

export default handler;
