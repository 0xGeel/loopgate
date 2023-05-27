import type { NextApiRequest, NextApiResponse } from "next";
import { getNftHolders } from "@/src/services/loopring/requests/getNftHolders";
import { handleError, LoopgateError } from "@/src/middleware";

// Request NFTs on Loopring held by a user by querying NFT Data
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftData } = query;

  if (!nftData || Array.isArray(nftData)) {
    return handleError(res, LoopgateError.badRequest);
  }

  // Call TheGraph API to find NFT Data for a NFT ID
  const holders = await getNftHolders(nftData);

  if (!holders) {
    return handleError(res, LoopgateError.noHoldersFound);
  }

  return res.status(200).json(holders);
};

export default handler;
