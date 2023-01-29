import { USER_ACCOUNT_INFO_URL } from "./_routes";
import axios from "axios";

const getUserAddress = async (address: string | string[]) => {
  try {
    const response = await axios.get(
      `${USER_ACCOUNT_INFO_URL}?owner=${address}`
    );
    return response.data.accountId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default getUserAddress;
