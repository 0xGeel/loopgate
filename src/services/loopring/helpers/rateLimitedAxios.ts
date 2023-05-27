import axios from "axios";
import rateLimit from "axios-rate-limit";

export const rateLimitedAxios = rateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 1000,
});
