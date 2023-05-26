import type { NextApiRequest, NextApiResponse } from "next";
import {
  getMinterAndToken,
  getNftData,
  getNftHolders,
} from "@/src/utils/loopring";
import { handleError, LoopgateError } from "@/src/middleware";

// Request holders for a NFT held on Loopring by querying NFT ID
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { nftId } = req.query;

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

  const holders = await getNftHolders(nftDataRes.nftData);

  if (!holders) {
    return handleError(res, LoopgateError.noHoldersFound);
  }

  return res.status(200).json(holders);
};

export default handler;
