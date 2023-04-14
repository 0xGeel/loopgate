import axios from "axios";
import rateLimit from "axios-rate-limit";
import { API } from "./_constants";
import { headerOpts, extractNfts } from "./index";

// Loopring API accepts 5 requests per second, max.
// Although this seems to fluctuate. 20 / sec
const rateLimitedAxios = rateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 1000,
});

const getAllUserNftIds = async (accountId: string | string[]) => {
  // Gets all Loopring L2 NFTs for a specified Account ID
  const LIMIT = 50; // API can handle up to 50 per call
  const firstReq = await axios.get(
    `${API.USER_NFT_BALANCE}?accountId=${accountId}&limit=${LIMIT}`,
    headerOpts
  );

  // Early exit if the initial request failed
  if (firstReq.data.totalNum === 0) return false;

  // Store how many NFTs the user has
  const amountOfNfts = firstReq.data.totalNum;

  // Determine if we need to do follow-up API calls
  if (amountOfNfts <= LIMIT) {
    // No need to. Parse the nft IDs from the response and early return
    return extractNfts(firstReq.data.data);
  }

  // Determine the amount of calls to be done, generate an array for follow-up requests
  // Create and return an array of the amount of calls. I.e. => [1, 2, ..., n]
  const amountOfCalls = Array.from(
    Array(Math.ceil(amountOfNfts / LIMIT) - 1),
    (_, index) => index + 1
  );

  // Call the API for all of these ^
  const followUpReqs = await Promise.all(
    amountOfCalls.map(async (index) => {
      return await rateLimitedAxios.get(
        `${API.USER_NFT_BALANCE}?accountId=${accountId}&limit=${LIMIT}&offset=${
          LIMIT * index
        }`,
        headerOpts
      );
    })
  );

  // Parse the API response, merge with the first API Call and flatten the array
  const nftApiResFlattened = followUpReqs
    .map((item) => item.data.data)
    .concat(firstReq.data.data)
    .flat();

  // Extract the NFT IDs and return them
  return extractNfts(nftApiResFlattened);
};

export default getAllUserNftIds;
