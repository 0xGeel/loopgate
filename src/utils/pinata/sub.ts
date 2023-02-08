import { Submarine } from "pinata-submarine";
import { PINATA_GATEWAY_URL } from "../../config/config";

const sub = new Submarine(
  process.env.PINATA_SUBMARINE_KEY as String,
  PINATA_GATEWAY_URL
);

export default sub;
