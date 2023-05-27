import axios from "axios";

import logger from "@/src/utils/logger";

import { LOOP_API_URL } from "../helpers/_constants";
import { NftDataResponse } from "../helpers/_types";
import { headerOpts } from "../helpers/headerOpts";

// Queries the Loopring API to find the NFT Datas
// Example input: `minter: "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738", tokenAddress: "0xc76eca2937b006606ebe717621409e4c2df906f1", nftId: 0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0`
export const getNftData = async (
  minter: string,
  tokenAddress: string,
  nftId: string
) => {
  try {
    const response: { data?: NftDataResponse } = await axios.get(
      `${LOOP_API_URL}/nft/info/nftData?minter=${minter}&tokenAddress=${tokenAddress}&nftId=${nftId}`,
      headerOpts
    );

    if (!response.data) {
      return false;
    }

    return response.data;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
