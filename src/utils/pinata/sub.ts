import { Submarine } from "pinata-submarine";

const sub = new Submarine(
  process.env.PINATA_SUBMARINE_KEY || "Undefined Pinata Submarine Key",
  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || "Undefined Pinata Gateway Url"
);

export default sub;
