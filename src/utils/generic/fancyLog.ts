// A fancy way to add debug statements ✨

export const styling =
  "background-color: #bada55; padding: 3px 6px; border-radius: 4px; font-family: fira code, sans-serif";

export const fancyLog = (text: string) => {
  const isProd = process.env.NODE_ENV === "production";

  if (!isProd) {
    console.log(`%cDEBUG: ${text}`, styling);
  }
};
