import type { NextApiRequest, NextApiResponse } from "next";
import getNftHolders from "@/src/utils/loopring/getNftHolders";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftData } = query;

  if (!nftData || Array.isArray(nftData)) {
    // Check if multiple or no Account IDs are specified. If so: early return.
    return res.status(400).json({ error: "Incorrect NFT Data supplied." });
  }

  // Call TheGraph API to find NFT Data for a NFT ID
  const holders = await getNftHolders(nftData);

  return holders
    ? res.status(200).json(holders)
    : res.status(400).json({
        error: "Unable to find holders for the NFT Datas.",
        log: holders,
      });
};

export default handler;
