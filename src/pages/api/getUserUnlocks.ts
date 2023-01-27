import type { NextApiRequest, NextApiResponse } from "next";
import { findUnlocks } from "../../utils/generic";
import { extractNfts } from "../../utils/loopring";
import axios from "axios";
import {
  USER_ACCOUNT_INFO_URL,
  USER_NFT_BALANCE_URL,
} from "../../utils/loopring/_routes";

// TODO: Refactor with typing
// type Data = {
//   name: string;
// };
// const handler = async (req: NextApiRequest, res: NextApiResponse<Data>) => {

/*  1. Call the Loopring API to find user's Loopring Account ID ✅
    2. Call the Loopring API to find the NFTs held by the user  ✅
    3. Call the Pinata API to unlock the IPFS files             ⏳
*/

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { address } = query;

  if (address) {
    axios
      .get(`${USER_ACCOUNT_INFO_URL}?owner=${address}`)
      .then((response) => {
        return axios.get(
          `${USER_NFT_BALANCE_URL}?accountId=${response.data.accountId}&limit=100`, //&metadata=true
          {
            headers: {
              "X-API-KEY": `${process.env.LOOPRING_API_KEY}`,
            },
          }
        );
      })
      .then((response) => {
        const nfts = extractNfts(response.data.data);
        const unlocks = findUnlocks(nfts);
        res.status(200).json({ unlocks: unlocks });
      })
      .catch((error) => {
        res.status(400).json({ unlocks: [] });
      });
  } else {
    res.status(400).json({ unlocks: [] });
  }
};

export default handler;
