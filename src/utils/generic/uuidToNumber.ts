import { createHash } from "crypto";

export const uuidToNumber = (uuid: string) => {
  const hash = createHash("sha256").update(uuid).digest("hex");
  const hexDigits = hash.slice(0, 4);
  const decimalValue = parseInt(hexDigits, 16);
  const percentage = decimalValue / 0xffff;
  const randomNumber = Math.floor(percentage * 133742069);
  return randomNumber;
};
