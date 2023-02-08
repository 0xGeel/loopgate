import cn from "./cn";

const existingClass = "foo";

describe("utility function for merging Tailwind CSS classes", () => {
  it("should merge new classes with existing classes with spaces in between them", () => {
    expect(cn(existingClass, "bar baz")).toEqual("foo bar baz");
  });

  it("should work without any input too", () => {
    expect(cn(existingClass)).toEqual("foo");
  });
});
