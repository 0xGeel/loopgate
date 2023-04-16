import type { NextApiRequest, NextApiResponse } from "next";
import { findUnlockedCids } from "../../utils/generic";
import { getAllUserNftIds, getUserAddress } from "../../utils/loopring";
import { getPinataIndexLink } from "../../utils/pinata";
import { withSessionRoute } from "@/src/utils/iron-session/withSession";
import { siwe } from "@/src/utils/siwe";
import logger from "@/src/utils/logger";

// Summary of what happens:
// 1️⃣ Call the Loopring API to find the User's Loopring Account ID
// 2️⃣ Call the Loopring API to find the NFTs held by the user
// 3️⃣ Check the user's NFT IDs against the config.ts to determine unlocks
// 4️⃣ Call the Pinata API for each CID the user should have access to
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { address } = query;
  const siweSesh = await siwe.getSession(req, res);

  // Check if multiple or no Account IDs are specified. If so: early return.
  if (!address || Array.isArray(address)) {
    const errorMsg =
      "0x address not provided. Please provide a valid 0x address and try again.";
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  // Check if there is a session. Only connected users may call this endpoint.
  if (!siweSesh.address || siweSesh.address !== address) {
    const errorMsg =
      "You are not authorized to access this resource. Sign In With Ethereum, and try again.";
    logger.error(errorMsg);
    return res.status(401).send(errorMsg);
  }

  // 1️⃣ Call the Loopring API to find the User's Loopring Account ID
  const accountId = await getUserAddress(address);

  if (!accountId) {
    const errorMsg = `No Loopring Account could be found for ${address}. Is your L2 account activated?`;
    logger.error(errorMsg);
    return res.status(400).send(errorMsg);
  }

  // 2️⃣ Call the Loopring API to find the NFTs held by the user
  const allNftIds = await getAllUserNftIds(accountId);

  if (!allNftIds) {
    const errorMsg = `Unable to find any NFTs for ${address}.`;
    logger.error(errorMsg);
    return res.status(404).send(errorMsg);
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
