import axios from "axios";
import { USER_NFT_BALANCE_URL } from "./_routes";
import { headerOpts, extractNfts } from "./index";

const findAmountOfCalls = (totalNfts: number, LIMIT: number) => {
  // Find the amount of calls required to retrieve all user NFTs
  const amountOfCalls = Math.ceil(totalNfts / LIMIT) - 1;
  // Create and return an array of the amount of calls. I.e. => [1, 2, ..., n]
  return Array.from(Array(amountOfCalls), (_, index) => index + 1);
};

const getAllUserNftIds = async (accountId: string) => {
  // Gets all Loopring L2 NFTs for a specified Account ID
  const LIMIT = 50; // The Loopring API can handle up to 50 NFTs per API call
  const firstReq = await axios.get(
    `${USER_NFT_BALANCE_URL}?accountId=${accountId}&limit=${LIMIT}`,
    headerOpts
  );

  // Early exit if the initial request failed
  if (firstReq.data.totalNum === 0) return false;

  // Store how many NFTs the user has
  const amountOfNfts = firstReq.data.totalNum;

  // Determine if we need to do follow-up API calls
  if (amountOfNfts <= LIMIT) {
    // No need to. Parse the nft IDs from the response and return
    const nftIds = extractNfts(firstReq.data.data);
    return nftIds;
  } else {
    // Determine the amount of calls to be done, generate an array for follow-up requests
    const amountOfCalls = findAmountOfCalls(amountOfNfts, LIMIT);

    // Call the API for all of these ^
    const followUpReqs = await Promise.all(
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
    const nftApiResFlattened = followUpReqs
      .map((item) => {
        return item.data.data;
      })
      .concat(firstReq.data.data)
      .flat();

    // Extract the NFT IDs from these ^
    const nftIds = extractNfts(nftApiResFlattened);

    // Finally, return all NFT IDs
    return nftIds;
  }
};

export default getAllUserNftIds;
