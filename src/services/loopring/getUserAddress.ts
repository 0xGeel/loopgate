import { LOOP_API } from "./_constants";
import axios from "axios";
import logger from "@/src/utils/logger";

const getUserAddress = async (address: string | string[]) => {
  try {
    const response = await axios.get(
      `${LOOP_API.USER_ACCOUNT}?owner=${address}`
    );
    return response.data.accountId;
  } catch (error) {
    logger.error(error);
    return false;
  }
};

export default getUserAddress;
