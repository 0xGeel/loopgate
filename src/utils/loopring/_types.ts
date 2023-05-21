export type UnixDate = number;

export type NftType = "ERC1155" | "ERC721";

interface CollectionInfo {
  id: number;
  owner: `0x${string}`;
  name: string;
  contractAddress: `0x${string}`;
  collectionAddress: `0x${string}`;
  baseUri: string;
  nftFactory: `0x${string}`;
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
  deploymentStatus: "NOT_DEPLOYED";
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

export interface NftBalanceResponse {
  totalNum: number;
  data: {
    id: number;
    accountId: number;
    nftData: `0x${string}`;
    tokenAddress: `0x${string}`;
    nftId: `0x${string}`;
    nftType: NftType;
    total: string;
    locked: string;
    pending: {
      withdraw: string;
      deposit: string;
    };
    deploymentStatus: string;
    isCounterfactualNFT: boolean;
    minter: `0x${string}`;
    royaltyPercentage: number;
    preference: {
      favourite: boolean;
      hide: boolean;
    };
    collectionInfo: CollectionInfo;
    updatedAt: UnixDate;
  }[];
}
