import type { NextApiRequest, NextApiResponse } from "next";
import { getMinterAndToken, getNftData } from "@/src/services/loopring";
import logger from "@/src/utils/logger";
import { handleError, LoopgateError } from "@/src/middleware";

// Request NFTs Data for a Loopring NFT ID
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftId } = query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!nftId || Array.isArray(nftId)) {
    return handleError(res, LoopgateError.badRequest);
  }

  // Call TheGraph API to find NFT Datas for a NFT ID
  const theGraphRes = await getMinterAndToken(nftId);

  if (!theGraphRes) {
    return handleError(res, LoopgateError.noTheGraphData);
  }

  const nftDataRes = await getNftData(
    theGraphRes.minter,
    theGraphRes.tokenAddress,
    nftId
  );

  if (!nftDataRes) {
    return handleError(res, LoopgateError.noLoopringDataFound);
  }

  return res.status(200).json({ nftData: nftDataRes.nftData });
};

export default handler;
