import { Submarine } from "pinata-submarine";

const sub = new Submarine(
  process.env.PINATA_SUBMARINE_KEY as String,
  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL
);

export default sub;
