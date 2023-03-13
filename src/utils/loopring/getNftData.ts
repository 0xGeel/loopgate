import { LOOP_API } from "./_constants";
import axios from "axios";
import headerOpts from "./headerOpts";

const getNftData = async (
  minter: string,
  tokenAddress: string,
  nftId: string
) => {
  // Queries the Loopring API to find the NFT Datas
  // Example input: `minter: "0x94743548ba8d82a4ee8ea3dfad589ea501ad2738", tokenAddress: "0xc76eca2937b006606ebe717621409e4c2df906f1", nftId: 0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0`
  // Example output: `...`

  try {
    const response = await axios.get(
      `${LOOP_API.NFT_DATA}?minter=${minter}&tokenAddress=${tokenAddress}&nftId=${nftId}`,
      headerOpts
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export default getNftData;
