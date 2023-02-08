import { fancyLog, styling } from "./fancyLog";

const input = "huts a niffo";

describe("checking fancy log output", () => {
  it("should return the input alongside a 'DEBUG: ' notifier and styling", () => {
    const consoleSpy = jest.spyOn(console, "log");
    fancyLog(input);

    expect(consoleSpy).toHaveBeenCalledWith(`%cDEBUG: ${input}`, styling);
  });
});
