import type { NextApiRequest, NextApiResponse } from "next";
import { getAllUserNftIds } from "../../utils/loopring";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { accountId } = query;

  if (!accountId || Array.isArray(accountId[0])) {
    // Check if multiple or no Account IDs are specified. If so: early return.
    return res
      .status(400)
      .send(
        "Invalid Request: 0x address not provided. Please provide a valid 0x address and try again."
      );
  }

  // Call Loopring API to find- and extract all user NFT IDs
  const allNftIds = await getAllUserNftIds(accountId);

  return allNftIds
    ? res.status(200).json(allNftIds)
    : res
        .status(400)
        .send(
          "Invalid Request: Unable to find any NFTs for the specified 0x address."
        );
};

export default handler;
