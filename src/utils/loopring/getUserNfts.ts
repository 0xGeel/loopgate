import headerOpts from "./headerOpts";
import { API } from "./_constants";
import axios from "axios";

const getUserNfts = async (accountId: string) => {
  try {
    const response = await axios.get(
      `${API.USER_NFT_BALANCE}?accountId=${accountId}&limit=50`,
      headerOpts
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default getUserNfts;
