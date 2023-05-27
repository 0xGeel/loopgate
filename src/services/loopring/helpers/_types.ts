/**
 * Generic Types ⬜️
 */
export type UnixDate = number;
export type HexString = `0x${string}`;

/**
 * Loopring Primitives 🔥
 */
export type NftType = "ERC1155" | "ERC721";
export type NftData = HexString;
interface CollectionInfo {
  id: number;
  owner: HexString;
  name: string;
  contractAddress: HexString;
  collectionAddress: HexString;
  baseUri: string;
  nftFactory: HexString;
  description: string;
  avatar: string;
  banner: string;
  thumbnail: string;
  tileUri: string;
  cached: {
    avatar: string;
    banner: string;
    tileUri: string;
    thumbnail: string;
  };
  deploymentStatus: string;
  nftType: NftType;
  times: {
    createdAt: UnixDate;
    updatedAt: UnixDate;
  };
  extra: {
    properties: {
      isLegacy: boolean;
      isPublic: boolean;
      isCounterFactualNFT: boolean;
      isMintable: boolean;
      isEditable: boolean;
      isDeletable: boolean;
    };
    mintChannel: string;
  };
}

/**
 * Loopring API Requests 📞
 */

/* /api/v3/nft/balances 👉 https://docs-protocol.loopring.io/counterfactual-nft/api-references/get-nft-assets */
export interface NftBalanceResponse {
  totalNum: number;
  data: {
    id: number;
    accountId: number;
    nftData: HexString;
    tokenAddress: HexString;
    nftId: HexString;
    nftType: NftType;
    total: string;
    locked: string;
    pending: {
      withdraw: string;
      deposit: string;
    };
    deploymentStatus: string;
    isCounterfactualNFT: boolean;
    minter: HexString;
    royaltyPercentage: number;
    preference: {
      favourite: boolean;
      hide: boolean;
    };
    collectionInfo: CollectionInfo;
    updatedAt: UnixDate;
  }[];
}

/* /api/v3/nft/info/nftData 👉 https://docs-protocol.loopring.io/counterfactual-nft/api-references/get-nft-data */
export interface NftDataResponse {
  nftData: HexString;
  minter: HexString;
  nftType: NftType;
  tokenAddress: HexString;
  nftId: HexString;
  royaltyPercentage: number;
  status: string;
  nftFactory: HexString;
  nftOwner: HexString;
  nftBaseUri: HexString;
  royaltyAddress: HexString;
  originalMinter: HexString;
}

/* /api/v3/account 👉 https://docs-protocol.loopring.io/loopring-account/api-references/get-account-info */
export interface AccountResponse {
  accountId: number;
  owner: HexString;
  frozen: boolean;
  publicKey: {
    x: HexString;
    y: HexString;
  };
  tags: string | "vip_0" | "vip_1";
  nonce: number;
  keyNonce: number;
  keySeed: string;
}

export interface NftHoldersResponse {
  totalNum: number;
  nftHolders: {
    accountId: number;
    tokenId: number;
    amount: string;
  }[];
}
