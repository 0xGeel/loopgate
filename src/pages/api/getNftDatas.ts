import type { NextApiRequest, NextApiResponse } from "next";
import getNftDatas from "@/src/utils/loopring/getNftDatas";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftId } = query;

  if (!nftId || Array.isArray(nftId)) {
    // Check if multiple or no Account IDs are specified. If so: early return.
    return res.status(400).json({ error: "Incorrect NFT ID supplied." });
  }

  // Call TheGraph API to find NFT Datas for a NFT ID
  const nftDatas = await getNftDatas(nftId);

  return nftDatas
    ? res.status(200).json(nftDatas)
    : res.status(400).json({
        error: "Unable to find the NFT ID you supplied.",
      });
};

export default handler;
