import { ConfigError,Unlockable } from "../../../config/types";
import { findUnlockedCids } from "./findUnlockedCids";

const mockUnlockables: Unlockable[] = [
  {
    cid: "baf001",
    nftId: ["0x1"],
  },
  {
    cid: "baf002",
    nftId: ["0x1", "0x2"],
  },
];

describe("find unlocked cids based on NFTs owned", () => {
  it("should return one result if the user meets the criteria for it", () => {
    expect(findUnlockedCids(["0x1"], mockUnlockables)).toEqual(["baf001"]);
  });

  it("should return two results if the user meets the criteria for both", () => {
    expect(findUnlockedCids(["0x1", "0x2"], mockUnlockables)).toEqual([
      "baf001",
      "baf002",
    ]);
  });

  it("should return an empty array if the user does not meet any criteria", () => {
    expect(findUnlockedCids(["huts", "a", "niffo"], mockUnlockables)).toEqual(
      []
    );
  });

  it("should throw an error if the config file is empty", () => {
    expect(() => findUnlockedCids(["0x1", "0x2", "0x3"], [])).toThrowError(
      ConfigError
    );
  });
});
