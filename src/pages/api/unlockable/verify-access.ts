import { NextApiRequest, NextApiResponse } from "next";
import { siwe } from "@/src/middleware/siwe";
import { getUserAddress, getAllUserNftIds } from "@/src/services/loopring";
import { handleError, LoopgateError } from "@/src/middleware";
import {
  findUnlockableByUuid,
  fetchUnlockableByUuid,
} from "@/src/services/loopgate/unlockable";
import { getPinataIndexLink } from "@/src/services/pinata";
import { withSessionRoute } from "@/src/middleware/ironSession/withSession";

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
    return handleError(res, LoopgateError.noAddressProvided);
  }

  //   Check if there is a session. Only connected users may call this endpoint.
  if (!siweSesh.address || siweSesh.address !== address) {
    return handleError(res, LoopgateError.unauthorized);
  }

  // 1️⃣ Call the Loopring API to find the User's Loopring Account ID
  const accountId = await getUserAddress(address);

  if (!accountId) {
    return handleError(res, LoopgateError.noLoopringAccount);
  }

  const unlockable =
    process.env.LOOPGATE_MODE === "supabase"
      ? await fetchUnlockableByUuid(unlockableId)
      : findUnlockableByUuid(unlockableId);

  if (!unlockable) {
    return handleError(res, LoopgateError.noUnlockableFound);
  }

  // 2️⃣ Call the Loopring API to find the NFTs held by the user
  const userNftIds = await getAllUserNftIds(accountId);

  if (!userNftIds) {
    return handleError(res, LoopgateError.noNftsFound);
  }

  // 3️⃣ Check if the user meets the unlock criteria
  const intersection = unlockable.unlockCriteria.nftId.filter((value) =>
    userNftIds.includes(value)
  );

  if (intersection.length < unlockable.unlockCriteria.unlockAmount) {
    return handleError(res, LoopgateError.unlockReqNotMet);
  }

  // 4️⃣ Get access link for the unlockable
  const unlock = await getPinataIndexLink(unlockable.content.url);

  if (!unlock) {
    return handleError(res, LoopgateError.noPinataContentFound);
  }

  return res.status(200).json({
    unlock: unlock,
  });
};

export default withSessionRoute(handler);
