import { findUnlockableByUuid } from "./findUnlockableByUuid";
import { ConfigError } from "../../../config/types";

describe("find unlockables based on UUID", () => {
  it("should return one result if the user meets the criteria for it", () => {
    const result = findUnlockableByUuid("ee3fd6ff-4718-4949-b621-f35ccad89ee4");
    expect(result.metadata.name).toEqual(
      "Token Gating with NFTs: Unlocking New Ways to Bring Value"
    );
  });

  it("should return an empty array if the UUID is not found", () => {
    const result = findUnlockableByUuid("bruh-this-is-no-uuid");
    expect(result).toBeUndefined();
  });

  it("should throw an error if the config file is empty", () => {
    expect(() =>
      findUnlockableByUuid("ee3fd6ff-4718-4949-b621-f35ccad89ee4", [])
    ).toThrowError(ConfigError);
  });
});
