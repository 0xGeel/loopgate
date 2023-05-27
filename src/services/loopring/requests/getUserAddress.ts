import { LOOP_API_URL } from "../helpers/_constants";
import axios from "axios";
import logger from "@/src/utils/logger";

export const getUserAddress = async (
  address: string | string[]
): Promise<string | false> => {
  try {
    const response = await axios.get(
      `${LOOP_API_URL}/account?owner=${address}`
    );
    return response.data.accountId;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
