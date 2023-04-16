import type { NextApiRequest, NextApiResponse } from "next";
import { getMinterAndToken, getNftData } from "@/src/utils/loopring";
import logger from "@/src/utils/logger";

// Request NFTs Data for a Loopring NFT ID
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftId } = query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!nftId || Array.isArray(nftId)) {
    const errorMsg =
      "Invalid request. Please provide a valid Loopring NFT ID, and try again.";
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  // Call TheGraph API to find NFT Datas for a NFT ID
  const theGraphRes = await getMinterAndToken(nftId);

  if (!theGraphRes) {
    const errorMsg =
      "Unable to retrieve data from TheGraph with this NFT ID. Please provide a valid Loopring NFT ID, and try again.";
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  const nftDataRes = await getNftData(
    theGraphRes.minter,
    theGraphRes.tokenAddress,
    nftId
  );

  if (!nftDataRes) {
    const errorMsg =
      "Unable to retrieve data from the Loopring API with this NFT ID. Please provide a valid Loopring NFT ID, and try again.";
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  return res.status(200).json({ nftData: nftDataRes.nftData });
};

export default handler;
