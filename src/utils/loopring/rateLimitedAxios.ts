import axios from "axios";
import rateLimit from "axios-rate-limit";

const rateLimitedAxios = rateLimit(axios.create(), {
  maxRequests: 10,
  perMilliseconds: 1000,
});

export default rateLimitedAxios;
