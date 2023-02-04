import type { NextApiRequest, NextApiResponse } from "next";
import { findUnlockedCids } from "../../utils/generic";
import { getAllUserNftIds, getUserAddress } from "../../utils/loopring";
import { getPinataIndexLink } from "../../utils/pinata";
import { withSessionRoute } from "@/src/utils/iron-session/withSession";

// Summary of what happens:
// 1️⃣ Call the Loopring API to find the User's Loopring Account ID
// 2️⃣ Call the Loopring API to find the NFTs held by the user
// 3️⃣ Check the user's NFT IDs against the config.ts to determine unlocks
// 4️⃣ Call the Pinata API for each CID the user should have access to
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { address } = query;

  if (!address || Array.isArray(address)) {
    return res.status(400).json({ error: "No 0x address specified." });
  }

  // Check if there is a session. Only connected users may call this endpoint.
  if (!req.session.address || req.session.address.id !== address) {
    return res.status(405).send({ message: "What are ye doin' in my swamp?!" });
  }

  // 1️⃣ Call the Loopring API to find the User's Loopring Account ID
  const accountId = await getUserAddress(address);

  if (!accountId) {
    return res.status(400).json({
      error: "Could not find Loopring Account for the specified 0x address",
    });
  }

  // 2️⃣ Call the Loopring API to find the NFTs held by the user
  const allNftIds = await getAllUserNftIds(accountId);

  if (!allNftIds) {
    return res
      .status(400)
      .json({ error: "Unable to find any NFTs for the specified 0x address" });
  }

  // 3️⃣ Check the user's NFT IDs against the config.ts to determine unlocks
  const cids = findUnlockedCids(allNftIds);

  // 4️⃣ Call the Pinata API for each CID the user should have access to
  const unlocks = await Promise.all(
    cids.map(async (item) => {
      return await getPinataIndexLink(item);
    })
  );

  if (!unlocks) {
    return res.status(200).json({ unlocks: [] }); // API calls succeeded, but there are no unlocks.
  }

  return res.status(200).json({ unlocks: unlocks }); // User has unlocks
};

export default withSessionRoute(handler);
