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
      .send(
        "Invalid Request: 0x address not provided. Please provide a valid 0x address and try again."
      );
  }

  //   Check if there is a session. Only connected users may call this endpoint.
  if (!siweSesh.address || siweSesh.address !== address) {
    return res
      .status(401)
      .send(
        "You are not authorized to access this resource. Sign In With Ethereum, and try again."
      );
  }

  // 1️⃣ Call the Loopring API to find the User's Loopring Account ID
  const accountId = await getUserAddress(address);

  if (!accountId) {
    return res
      .status(400)
      .send(
        "No Loopring Account could be found for the connected 0x address. Is your L2 account activated?"
      );
  }

  const unlockable = findUnlockableByUuid(unlockableId);
  if (!unlockable) {
    return res
      .status(404)
      .send("Unable to find the Unlockable for the specified UUID.");
  }

  // 2️⃣ Call the Loopring API to find the NFTs held by the user
  const userNftIds = await getAllUserNftIds(accountId);

  if (!userNftIds) {
    return res
      .status(400)
      .send("Unable to find any NFTs for the specified 0x address.");
  }

  // 3️⃣ Check if the user meets the unlock criteria
  const intersection = unlockable.unlockCriteria.nftId.filter((value) =>
    userNftIds.includes(value)
  );

  if (intersection.length < unlockable.unlockCriteria.unlockAmount) {
    return res
      .status(405)
      .send("Your connected wallet does not meet the unlock requirements.");
  }

  // 4️⃣ Get access link for the unlockable
  const unlock = await getPinataIndexLink(unlockable.content.url);

  if (!unlock) {
    return res
      .status(404)
      .send(
        "Unable to find the submarined content on Pinata. It may be deleted."
      );
  }

  return res.status(200).json({
    unlock: unlock,
  });
};

export default withSessionRoute(handler);
