import { NextApiRequest, NextApiResponse } from "next";
import { siwe } from "@/src/utils/siwe";
import { getUserAddress, getAllUserNftIds } from "@/src/utils/loopring";
import { findUnlockableByUuid } from "@/src/utils/generic";
import { getPinataIndexLink } from "@/src/utils/pinata";
import { withSessionRoute } from "@/src/utils/iron-session/withSession";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { address, unlockableId } = query;
  const siweSesh = await siwe.getSession(req, res);

  // Check validity of request
  if (
    !address ||
    Array.isArray(address) ||
    !unlockableId ||
    Array.isArray(unlockableId)
  ) {
    return res
      .status(400)
      .json({ error: "No 0x address or unlockable specified." });
  }

  //   Check if there is a session. Only connected users may call this endpoint.
  //   if (!siweSesh.address || siweSesh.address !== address) {
  //     return res.status(405).send({ message: "What are ye doin' in my swamp?!" });
  //   }

  // 1️⃣ Call the Loopring API to find the User's Loopring Account ID
  const accountId = await getUserAddress(address);

  if (!accountId) {
    return res.status(400).json({
      error: "Could not find Loopring Account for the specified 0x address",
    });
  }

  const unlockable = findUnlockableByUuid(unlockableId);
  if (!unlockable) {
    return res.status(400).json({
      error: "Could not find the Unlockable for the specified UUID.",
    });
  }

  // 2️⃣ Call the Loopring API to find the NFTs held by the user
  const userNftIds = await getAllUserNftIds(accountId);

  if (!userNftIds) {
    return res
      .status(400)
      .json({ error: "Unable to find any NFTs for the specified 0x address" });
  }

  // 3️⃣ Check if the user meets the unlock criteria
  const intersection = unlockable.unlockCriteria.nftId.filter((value) =>
    userNftIds.includes(value)
  );

  if (intersection.length < unlockable.unlockCriteria.unlockAmount) {
    return res.status(400).json({
      error: "The specified 0x address does not meet the unlock criteria.",
    });
  }

  // 4️⃣ Get access link for the unlockable
  const unlock = await getPinataIndexLink(unlockable.content.url);

  if (!unlock) {
    return res.status(400).json({
      error: "Submarined content on Pinata could not be found.",
    });
  }

  return res.status(200).json({
    unlock: unlock,
  });
};

export default withSessionRoute(handler);
