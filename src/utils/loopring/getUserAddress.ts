import { API } from "./_constants";
import axios from "axios";

const getUserAddress = async (address: string | string[]) => {
  try {
    const response = await axios.get(`${API.USER_ACCOUNT}?owner=${address}`);
    return response.data.accountId;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default getUserAddress;
