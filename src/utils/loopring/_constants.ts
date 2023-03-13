const LOOP_BASE_URL = "https://api3.loopring.io/api/v3";

export const LOOP_API = {
  USER_ACCOUNT: `${LOOP_BASE_URL}/account`,
  USER_NFT_BALANCE: `${LOOP_BASE_URL}/user/nft/balances`,
  NFT_DATA: `${LOOP_BASE_URL}/nft/info/nftData`,
  NFT_HOLDERS: `${LOOP_BASE_URL}/nft/info/nftHolders`,
};

export const THE_GRAPH = {
  GATEWAY_URL: "https://api.thegraph.com/subgraphs/name/loopring/loopring",
};

export const CONTRACTS = {
  LOOPRING_EXCHANGE_V3: "0x0BABA1Ad5bE3a5C0a66E7ac838a129Bf948f1eA4",
  LRC_TOKEN: "0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD",
};
