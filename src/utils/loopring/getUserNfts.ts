import headerOpts from "./headerOpts";
import { LOOP_API } from "./_constants";
import axios from "axios";
import logger from "@/src/utils/logger";

const getUserNfts = async (accountId: string) => {
  try {
    const response = await axios.get(
      `${LOOP_API.USER_NFT_BALANCE}?accountId=${accountId}&limit=50`,
      headerOpts
    );
    return response.data;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export default getUserNfts;
