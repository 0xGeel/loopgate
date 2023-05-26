import { isUuid } from "./isUuid";

describe("isUuid", () => {
  it("returns true for valid UUIDs", () => {
    expect(isUuid("f5b6e5d6-8a32-4ebf-991c-0e19d018f7b1")).toBe(true);
    expect(isUuid("DF11D6C5-CB8B-44A5-87AE-6407A90902C8")).toBe(true);
    expect(isUuid("f5b6e5d68a324ebf991c0e19d018f7b1")).toBe(false); // Without dashes
  });

  it("returns false for invalid UUIDs", () => {
    expect(isUuid("not-a-uuid")).toBe(false);
    expect(isUuid("f5b6e5d6-8a32-4ebf-991c")).toBe(false); // Too short
    expect(isUuid("f5b6e5d6-8a32-4ebf-991c-0e19d018f7b1-extra")).toBe(false); // Too long
  });
});
