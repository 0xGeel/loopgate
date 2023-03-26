import parseNftIdString from "./parseNftIdString";

describe("parseNftIdString", () => {
  it("should parse a single NFT ID", () => {
    const input =
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee";
    const expectedOutput = [input];
    const actualOutput = parseNftIdString(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it("should parse multiple NFT IDs separated by commas", () => {
    const input =
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee, 0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c";
    const expectedOutput = [
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
    ];
    const actualOutput = parseNftIdString(input);
    expect(actualOutput).toEqual(expectedOutput);
  });

  it("should remove spaces between NFT IDs before parsing", () => {
    const input =
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee , 0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c";
    const expectedOutput = [
      "0x3d483f631a391a3706446613929d253cfddcb47900a07593c5004c5e3827d9ee",
      "0x8aa9d39f44b4b8488d0bbf04ea12bec99ddbe676a1b9a38d853701327437e78c",
    ];
    const actualOutput = parseNftIdString(input);
    expect(actualOutput).toEqual(expectedOutput);
  });
});
