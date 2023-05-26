import { Submarine as SubmarineSDK } from "pinata-submarine";

const Submarine = new SubmarineSDK(
  process.env.PINATA_SUBMARINE_KEY || "Undefined Pinata Submarine Key",
  process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL || "Undefined Pinata Gateway Url"
);

export default Submarine;
