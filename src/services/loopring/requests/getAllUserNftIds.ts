import axios from "axios";

import { extractNfts, headerOpts, rateLimitedAxios } from "../";
import { LOOP_API_URL } from "../helpers/_constants";
import { NftBalanceResponse } from "../helpers/_types";

type AxiosNftBalanceResponse = { data: NftBalanceResponse };

// Gets all Loopring L2 NFTs for a specified Account ID
export const getAllUserNftIds = async (accountId: string | string[]) => {
  const LIMIT = 50; // API can handle up to 50 per call

  const firstReq: AxiosNftBalanceResponse = await axios.get(
    `${LOOP_API_URL}/user/nft/balances?accountId=${accountId}&limit=${LIMIT}`,
    headerOpts
  );

  if (firstReq.data.totalNum === 0) {
    return false;
  }

  // Determine if we need to do follow-up API calls
  if (firstReq.data.totalNum <= LIMIT) {
    return extractNfts(firstReq.data);
  }

  // Determine the amount of calls to be done, generate an array for follow-up requests
  const amountOfCalls = Array.from(
    Array(Math.ceil(firstReq.data.totalNum / LIMIT) - 1),
    (_, index) => index + 1
  );

  // Call the API for all of these ^
  const followUpReqs = await Promise.all(
    amountOfCalls.map(async index => {
      const followUpResponse: AxiosNftBalanceResponse =
        await rateLimitedAxios.get(
          `${LOOP_API_URL}/user/nft/balances?accountId=${accountId}&limit=${LIMIT}&offset=${
            LIMIT * index
          }`,
          headerOpts
        );

      return followUpResponse;
    })
  );

  // Parse the API response, merge with the first API Call and flatten the array
  const nftApiResFlattened = followUpReqs
    .map(item => item.data.data)
    .concat(firstReq.data.data)
    .flat();

  // Extract the NFT IDs and return them
  return extractNfts({
    totalNum: firstReq.data.totalNum,
    data: nftApiResFlattened,
  });
};
