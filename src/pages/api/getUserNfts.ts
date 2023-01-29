import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { USER_NFT_BALANCE_URL } from "../../utils/loopring/_routes";
import { headerOpts, extractNfts } from "../../utils/loopring";

const findAmountOfCalls = (totalNfts: number, LIMIT: number) => {
  // We need to do some more API calls.
  const amountOfCalls = Math.ceil(totalNfts / LIMIT) - 1;

  // Create and return an array of the amount of calls. I.e. => [1, 2, ..., n]
  return Array.from(Array(amountOfCalls), (_, index) => index + 1);
};

// Request NFTs on Loopring held by a user
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const { accountId } = query;
  const LIMIT = 50; // The Loopring API can handle up to 50 NFTs per API request

  // Check if an Account ID is specified
  if (!accountId) {
    return res.status(400).json({ error: "No Loopring Account ID specified." });
  }

  const initialReq = await axios.get(
    `${USER_NFT_BALANCE_URL}?accountId=${accountId}&limit=${LIMIT}`,
    headerOpts
  );

  // Check if the initial request succeeded.
  if (initialReq.data.totalNum === 0) {
    return res
      .status(400)
      .json({ error: "Unable to find NFTs for the Loopring Account ID." });
  }

  // Constant that stores how many NFTs the user has.
  const totalNfts = initialReq.data.totalNum;

  if (totalNfts > LIMIT) {
    // We need to do some more API calls.
    const amountOfCalls = findAmountOfCalls(totalNfts, LIMIT);

    // Call the API for each of these ^
    const allNfts = await Promise.all(
      amountOfCalls.map(async (index) => {
        return await axios.get(
          `${USER_NFT_BALANCE_URL}?accountId=${accountId}&limit=${LIMIT}&offset=${
            LIMIT * index
          }`,
          headerOpts
        );
      })
    );

    // Parse the API response, merge with the first API Call and flatten the array
    const nftApiResFlattened = allNfts
      .map((item) => {
        return item.data.data;
      })
      .concat(initialReq.data.data)
      .flat();

    // Extract the NFT IDs from these ^
    const nftIds = extractNfts(nftApiResFlattened);

    // Finally, return all NFT IDs
    return res.status(200).json(nftIds);
  } else {
    // No need for additional API calls.
    return res.status(200).json(initialReq.data);
  }
};

export default handler;
