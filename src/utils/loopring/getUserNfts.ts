import headerOpts from "./headerOpts";
import { LOOP_API } from "./_constants";
import axios from "axios";

const getUserNfts = async (accountId: string) => {
  try {
    const response = await axios.get(
      `${LOOP_API.USER_NFT_BALANCE}?accountId=${accountId}&limit=50`,
      headerOpts
    );
    return response.data;
  } catch (error) {
    console.error(error);
    return false;
  }
};

export default getUserNfts;
