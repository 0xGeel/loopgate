import headerOpts from "./headerOpts";
import { USER_NFT_BALANCE_URL } from "./_routes";
import axios from "axios";

const getUserNfts = async (accountId: string) => {
  try {
    const response = await axios.get(
      `${USER_NFT_BALANCE_URL}?accountId=${accountId}&limit=50`,
      headerOpts
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export default getUserNfts;
