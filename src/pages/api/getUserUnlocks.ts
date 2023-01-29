import type { NextApiRequest, NextApiResponse } from "next";
import { findUnlockedCids } from "../../utils/generic";
import { extractNfts, getUserAddress, getUserNfts } from "../../utils/loopring";
import { getPinataIndexLink } from "../../utils/pinata";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { address } = query;

  if (address) {
    // 1. Call the Loopring API to find the User's Loopring Account ID
    const accountId = await getUserAddress(address);

    // 2. Call the Loopring API to find the NFTs held by the User
    const userNfts = await getUserNfts(accountId);
    const nftIds = extractNfts(userNfts.data); // Extract NFT IDs from Loopring API response
    const cids = findUnlockedCids(nftIds); // Check user's NFT IDs against config to determine unlocks

    // 3. Call the Pinata API for each CID the user should have access too
    const unlocks = await Promise.all(
      cids.map(async (item) => {
        return await getPinataIndexLink(item);
      })
    );

    res.status(200).json({ unlocks: unlocks });
  } else {
    res.status(400).json({ unlocks: [] });
  }
};

export default handler;
