import type { NextApiRequest, NextApiResponse } from "next";
import getNftHolders from "@/src/utils/loopring/getNftHolders";
import logger from "@/src/utils/logger";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftData } = query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!nftData || Array.isArray(nftData)) {
    const errorMsg =
      "Invalid request. Please provide a valid Loopring 'NFT Data', and try again.";
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  // Call TheGraph API to find NFT Data for a NFT ID
  const holders = await getNftHolders(nftData);

  if (!holders) {
    const errorMsg = `Unable to find holders for NFT Data '${nftData}'`;
    logger.error(errorMsg);
    return res.status(404).send(errorMsg);
  }

  return res.status(200).json(holders);
};

export default handler;
