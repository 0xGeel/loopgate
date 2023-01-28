import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { USER_NFT_BALANCE_URL } from "../../utils/loopring/_routes";
import { headerOpts } from "../../utils/loopring";

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { accountId } = query;

  if (accountId) {
    axios
      .get(
        `${USER_NFT_BALANCE_URL}?accountId=${accountId}&limit=50&metadata=true`,
        headerOpts
      )
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(400).json({ unlocks: [] });
      });
  } else {
    res.status(400).json({ unlocks: [] });
  }
};

export default handler;
