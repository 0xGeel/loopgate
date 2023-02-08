import getCurrentYear from "./getCurrentYear";

beforeEach(() => {
  jest.spyOn(Date.prototype, "getFullYear").mockReturnValue(2023);
});

describe("what year is it?!", () => {
  it("should return 2023 if it's 2023", () => {
    expect(getCurrentYear()).toBe(2023);
  });
});
