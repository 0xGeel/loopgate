import type { NextApiRequest, NextApiResponse } from "next";
import { getMinterAndToken, getNftData } from "@/src/utils/loopring";

// Request NFTs Data for a Loopring NFT ID
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftId } = query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!nftId || Array.isArray(nftId)) {
    return res
      .status(400)
      .send(
        "Invalid request. Please provide a valid Loopring NFT ID, and try again."
      );
  }

  // Call TheGraph API to find NFT Datas for a NFT ID
  const theGraphRes = await getMinterAndToken(nftId);

  if (!theGraphRes) {
    return res
      .status(400)
      .send(
        "Invalid request. Please provide a valid Loopring NFT ID, and try again."
      );
  }

  const nftDataRes = await getNftData(
    theGraphRes.minter,
    theGraphRes.tokenAddress,
    nftId
  );

  if (!nftDataRes) {
    return res
      .status(400)
      .send(
        "Invalid request. Please provide a valid Loopring NFT ID, and try again."
      );
  }

  return res.status(200).json({ nftData: nftDataRes.nftData });
};

export default handler;
