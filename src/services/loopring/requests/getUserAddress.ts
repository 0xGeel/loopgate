import axios from "axios";

import logger from "@/src/utils/logger";

import { LOOP_API_URL } from "../helpers/_constants";
import { AccountResponse } from "../helpers/_types";

export const getUserAddress = async (address: string | string[]) => {
  try {
    const response: { data: AccountResponse } = await axios.get(
      `${LOOP_API_URL}/account?owner=${address}`
    );

    if (!response.data) {
      return false;
    }

    return response.data.accountId;
  } catch (error) {
    logger.error(error);
    return false;
  }
};
