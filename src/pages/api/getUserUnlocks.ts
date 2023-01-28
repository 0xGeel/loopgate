import type { NextApiRequest, NextApiResponse } from "next";
import { findUnlocks } from "../../utils/generic";
import { extractNfts, getUserAddress, getUserNfts } from "../../utils/loopring";

/*  1. Call the Loopring API to find user's Loopring Account ID ✅
    2. Call the Loopring API to find the NFTs held by the user  ✅
    3. Call the Pinata API to unlock the IPFS files             ⏳
*/

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { address } = query;

  if (address) {
    const accountId = await getUserAddress(address); // User's 0x address -> Loopring Account ID
    const userNfts = await getUserNfts(accountId); // Get the NFTs the user holds
    const nfts = extractNfts(userNfts.data); // Extract NFTs from Loopring API response
    const unlocks = findUnlocks(nfts); // Check user's NFTs against config to determine unlocks

    // Todo: generate access links on Pinata

    res.status(200).json({ unlocks: unlocks });
  } else {
    res.status(400).json({ unlocks: [] });
  }
};

export default handler;

// TODO: Refactor with typing
// type Data = {
//   name: string;
// };
// const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
