import type { NextApiRequest, NextApiResponse } from "next";
import getNftHolders from "@/src/utils/loopring/getNftHolders";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftDatas } = query;

  if (!nftDatas || Array.isArray(nftDatas)) {
    // Check if multiple or no Account IDs are specified. If so: early return.
    return res.status(400).json({ error: "Incorrect NFT Datas supplied." });
  }

  // Call TheGraph API to find NFT Datas for a NFT ID
  const holders = await getNftHolders(nftDatas);

  return holders
    ? res.status(200).json(holders)
    : res.status(400).json({
        error: "Unable to find holders for the NFT Datas.",
      });
};

export default handler;
