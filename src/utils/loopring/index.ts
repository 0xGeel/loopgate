// Parses a Loopring API response to extract the NFT IDs
const extractNfts = (res: any) => {
  let nfts: string[] = [];
  res.forEach((item: any) => {
    nfts.push(item.nftId);
  });

  return nfts;
};

export { extractNfts };
