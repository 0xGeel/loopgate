import { API } from "./_constants";
import axios from "axios";
import headerOpts from "./headerOpts";

const getNftHolders = async (nftData: string) => {
  try {
    const response = await axios.get(
      `${API.NFT_HOLDERS}?nftData=${nftData}`,
      headerOpts
    );
    return response.data;
  } catch (error) {
    return false;
  }
};

export default getNftHolders;
