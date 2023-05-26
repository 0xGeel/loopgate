import uuidToNumber from "./uuidToNumber";

describe("uuidToNumber", () => {
  it("should generate a number between 0 and 133742069", () => {
    const uuid = "123e4567-e89b-12d3-a456-426655440000";
    const randomNumber = uuidToNumber(uuid);
    expect(randomNumber).toBeGreaterThanOrEqual(0);
    expect(randomNumber).toBeLessThanOrEqual(133742069);
  });

  it("should generate different numbers for different UUIDs", () => {
    const uuid1 = "123e4567-e89b-12d3-a456-426655440000";
    const uuid2 = "123e4567-e89b-12d3-a456-426655440001";
    const randomNumber1 = uuidToNumber(uuid1);
    const randomNumber2 = uuidToNumber(uuid2);
    expect(randomNumber1).not.toBe(randomNumber2);
  });
});
