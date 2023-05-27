import { NftBalanceResponse } from "./_types";

// Parses a Loopring API response to extract the NFT IDs
export const extractNfts = (apiRes: NftBalanceResponse) => {
  const nfts: string[] = [];
  apiRes.data.forEach((item) => {
    nfts.push(item.nftId);
  });

  return nfts;
};
