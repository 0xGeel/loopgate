import type { NextApiRequest, NextApiResponse } from "next";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { accountId } = query;

  // Check if an Account ID is specified
  if (!accountId) {
    return res.status(400).json({ error: "No Loopring Account ID specified." });
  }

  //@ts-ignore
  const allNftIds = await getAllNftIds(accountId);

  if (!allNftIds)
    return res.status(400).json({
      error: "Unable to find any NFTs for the supplied Loopring Account ID",
    });

  return res.status(200).json(allNftIds);
};

export default handler;
