import type { NextApiRequest, NextApiResponse } from "next";
import getNftHolders from "@/src/utils/loopring/getNftHolders";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { nftData } = query;

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!nftData || Array.isArray(nftData)) {
    return res
      .status(400)
      .send(
        "Invalid request. Please provide a valid Loopring 'NFT Data', and try again."
      );
  }

  // Call TheGraph API to find NFT Data for a NFT ID
  const holders = await getNftHolders(nftData);

  return holders
    ? res.status(200).json(holders)
    : res.status(404).send(`Unable to find holders for NFT Data '${nftData}'`);
};

export default handler;
