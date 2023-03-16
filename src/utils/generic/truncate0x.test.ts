import { truncate0x } from "./";

describe("make a eth 0x address more readable by truncating it", () => {
  it("should truncate a valid eth address", () => {
    expect(truncate0x("0x1337cc354aeaf15b0e98a609cd348df171174e14")).toEqual(
      "0x1337…4e14"
    );
  });

  it("should return the input string if it does not start with 0x", () => {
    expect(truncate0x("some random content")).toEqual("some random content");
  });

  it("should return the input string if it is not a valid 0x address", () => {
    expect(truncate0x("0xbruh")).toEqual("0xbruh");
  });
});
