import { NftBalanceResponse } from "./_types";

// Parses a Loopring API response to extract the NFT IDs
const extractNfts = (apiRes: any) => {
  let nfts: string[] = [];
  apiRes.forEach((item: any) => {
    nfts.push(item.nftId);
  });

  return nfts;
};

export default extractNfts;
