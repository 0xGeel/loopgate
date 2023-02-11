import { Submarine } from "pinata-submarine";
const PINATA_GATEWAY_URL = process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL;

const sub = new Submarine(
  process.env.PINATA_SUBMARINE_KEY as String,
  PINATA_GATEWAY_URL
);

export default sub;
