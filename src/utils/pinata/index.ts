import { Submarine } from "pinata-submarine";
import { PINATA_GATEWAY_URL } from "../../config/config";

const sub = new Submarine(
  // @ts-ignore
  process.env.PINATA_SUBMARINE_KEY,
  PINATA_GATEWAY_URL
);

export { sub };
