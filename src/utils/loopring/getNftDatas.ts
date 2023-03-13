import axios from "axios";

const gatewayUrl = `https://api.thegraph.com/subgraphs/name/loopring/loopring`;

const getNftDatas = async (nftId: string) => {
  // Gets the NFT datas for a Loopring NFT by querying TheGraph with a nftId
  // Example input: `0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0`
  // Example output: `0x94743548ba8d82a4ee8ea3dfad589ea501ad2738-0-0xc76eca2937b006606ebe717621409e4c2df906f1-0x271d3a38c3572ab21225fbb7f97468051ca9c631f002bf2dde82aee9b8511ac0-5`

  const query = `{
          nonFungibleTokens( 
            where: {nftID: "${nftId}"} 
          ) {
            id,
          }
        }`;

  try {
    const response = await axios.post(gatewayUrl, { query });
    return { nftDatas: response.data.data.nonFungibleTokens[0].id };
  } catch (error) {
    return false;
  }
};

export default getNftDatas;
