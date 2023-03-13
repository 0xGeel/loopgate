import { LOOP_API } from "./_constants";
import axios from "axios";

const getUserAddress = async (address: string | string[]) => {
  try {
    const response = await axios.get(
      `${LOOP_API.USER_ACCOUNT}?owner=${address}`
    );
    return response.data.accountId;
  } catch (error) {
    return false;
  }
};

export default getUserAddress;
